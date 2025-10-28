<script setup>
import { watch } from "vue";
import Footer from "./components/Footer.vue";
import { useAuthStore } from "./stores/authStore";
import { useQuery } from "@tanstack/vue-query";
import axios from "./axiosClient";

const auth = useAuthStore();

const { data, error } = useQuery({
  queryKey: ["user"],
  queryFn: async () => {
    if (!auth.token) throw new Error("No token");

    const res = await axios.get("/auth/me");
    return res.data;
  },
  enabled: !!auth.token,
});

watch(data, (newData) => {
  if (newData) {
    auth.setUser(newData);
  }
});
</script>
<template>
  <div class="min-h-screen flex flex-col h-full">
    <router-view />
    <Footer />
  </div>
</template>
