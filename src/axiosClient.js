import axiosClient from "axios";
import Cookies from "js-cookie";

const axios = axiosClient.create({
  baseURL: import.meta.env.VITE_API_URL + "/api",
});

axios.interceptors.request.use(
  (config) => {
    // config.headers["x-source"] = "vue";
    const token = Cookies.get("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    console.error(error);
    Promise.reject(error);
  }
);

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  });
  failedQueue = [];
};

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (!error.response) {
      console.error("Network error:", error);
      return Promise.reject(error);
    }

    if (error.response.status === 401 && !originalRequest._retry) {
      const refresh_token = Cookies.get("refresh_token");

      if (!refresh_token) {
        Cookies.remove("access_token");
        if (typeof window !== "undefined") {
          window.location.href = `/auth/login`;
        }
        return Promise.reject(error);
      }

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            if (token) {
              originalRequest.headers.Authorization = `Bearer ${token}`;
            }
            return axios(originalRequest);
          })
          .catch(Promise.reject);
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refresh_token = Cookies.get("refresh_token");
        const { data } = await axios.post("/auth/refresh", {
          refresh_token,
        });

        const newAccess = data.tokens.access_token;
        const newRefresh = data.tokens.refresh_token;

        Cookies.set("access_token", newAccess, {
          sameSite: "strict",
          secure: true,
        });
        Cookies.set("refresh_token", newRefresh, {
          sameSite: "strict",
          secure: true,
        });

        processQueue(null, newAccess);

        originalRequest.headers.Authorization = `Bearer ${newAccess}`;
        return axios(originalRequest);
      } catch (err) {
        processQueue(err, null);
        Cookies.remove("access_token");
        Cookies.remove("refresh_token");

        if (typeof window !== "undefined") {
          window.location.href = `/auth/login?from=${encodeURIComponent(
            window.location.pathname
          )}`;
        }

        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default axios;
