<script setup>
import { useAuthStore } from "@/stores/authStore";
import { Ticket, LogOut } from "./icons";
import { useMutation } from "@tanstack/vue-query";
import { useRouter } from "vue-router";
import axios from "@/axiosClient";
import Cookies from "js-cookie";

const auth = useAuthStore();

const router = useRouter();

const logoutMutation = useMutation({
  mutationFn: async () => {
    const refresh_token = Cookies.get("refresh_token");
    await axios.post("/auth/logout", { refresh_token });
  },

  onSuccess: () => {
    auth.resetAuth();
    router.push("/auth/login");
  },
});
</script>
<template>
  <header
    className="border-b border-border bg-card shadow-sm sticky top-0 z-50"
  >
    <div className="mx-auto max-w-[1440px] px-4 py-4 md:px-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-lg bg-linear-to-r from-primary to-blue-600 flex items-center justify-center shadow-md"
          >
            <Ticket class="w-7 h-7 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-base sm:text-xl font-bold">Ticket Manager</h1>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Welcome back,
              {{ auth?.user?.email ? auth.user.email.split("@")[0] : "Guest" }}!
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            class="flex items-center gap-2 text-red-500 border-2 border-red-500 rounded-md px-2 py-1 cursor-pointer hover:opacity-80 transition-opacity duration-300"
            @click="logoutMutation.mutate"
          >
            <LogOut className="w-4 h-4 mr-2" />
            <span className="hidden sm:block"> Logout</span>
          </button>
        </div>
      </div>
    </div>
  </header>
</template>
