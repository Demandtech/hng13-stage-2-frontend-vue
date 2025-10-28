import { createRouter, createWebHistory } from "vue-router";
import Home from "@/pages/Home.vue";
import Signup from "@/pages/Signup.vue";
import Login from "@/pages/Login.vue";
import Dashboard from "@/pages/Dashboard.vue";
import { useAuthStore } from "@/stores/authStore";

const routes = [
  { path: "/", component: Home },
  { path: "/auth/signup", component: Signup },
  { path: "/auth/login", component: Login },
  { path: "/dashboard", component: Dashboard, meta: { requiresAuth: true } },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const auth = useAuthStore();
  const isAuthenticated = !!auth.token;

  if (to.meta.requiresAuth && !isAuthenticated) {
    auth.resetAuth();
    next("/auth/login");
  } else {
    next();
  }
});

export default router;
