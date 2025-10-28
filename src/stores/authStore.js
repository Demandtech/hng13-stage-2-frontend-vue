import Cookies from "js-cookie";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useAuthStore = defineStore("auth", () => {
  const user = ref(null);
  const token = ref(Cookies.get("access_token") || null);

  function setUser(data) {
    user.value = data?.user;
  }

  function setAuth(data) {
    user.value = data.user;
    token.value = data.tokens.access_token;
    Cookies.set("access_token", data.tokens.access_token, {
      sameSite: "strict",
      secure: true,
    });
    Cookies.set("refresh_token", data.tokens.refresh_token, {
      sameSite: "strict",
      secure: true,
    });
  }

  function resetAuth() {
    token.value = null;
    user.value = null;
    Cookies.remove("access_token");
    Cookies.remove("refresh_token");
  }

  return { user, token, setUser, setAuth, resetAuth };
});
