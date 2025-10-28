<script setup>
import { ref } from "vue";
import DecorativeCircle from "@/components/DecorativeCircle.vue";
import { Loader, Ticket } from "@/components/icons.js";
import { useAuthStore } from "@/stores/authStore";
import { useMutation, useQueryClient } from "@tanstack/vue-query";
import axios from "@/axiosClient";
import { useRouter } from "vue-router";

const queryClient = useQueryClient();
const { setAuth } = useAuthStore();
const router = useRouter();
const formData = ref({
  email: "",
  password: "",
});

const loginMutation = useMutation({
  mutationFn: async (formData) => {
    const res = await axios.post("/auth/signin", formData);

    return res.data;
  },

  onSuccess: (data) => {
    setAuth(data);
    queryClient.invalidateQueries(["user"]);
    setTimeout(() => {
      router.push("/dashboard");
    }, 500);
  },

  // onError: (err) => {
  //   console.log(err);
  // },
});

const handleSubmit = (e) => {
  e.preventDefault();
  loginMutation.mutate({
    email: formData.value.email,
    password: formData.value.password,
  });
};
</script>

<template>
  <div
    class="flex flex-col items-center justify-center p-4 relative overflow-hidden flex-1"
  >
    <DecorativeCircle
      size="lg"
      position="top-left"
      color="primary"
      :opacity="0.08"
    />
    <DecorativeCircle
      size="md"
      position="bottom-right"
      color="accent"
      :opacity="0.08"
    />

    <div
      class="w-full max-w-md shadow-xl border-2 border-border relative z-10 py-10 bg-white rounded-2xl"
    >
      <div class="text-center space-y-2 flex flex-col items-center">
        <router-link to="/">
          <div
            class="mx-auto w-16 h-16 rounded-2xl bg-linear-to-r from-primary to-blue-600 flex items-center justify-center mb-4 shadow-glow"
          >
            <Ticket class="w-8 h-8 text-primary-foreground" />
          </div>
        </router-link>

        <div>
          <h3 class="text-3xl font-bold">Welcome Back</h3>
          <p class="text-base">Sign in to your account to continue</p>
        </div>
      </div>
      <div
        v-if="loginMutation.isError.value"
        class="text-center py-2 mt-2 bg-red-100"
      >
        <p class="text-red-500">
          {{
            loginMutation.error.value?.response?.data?.message || "Login failed"
          }}
        </p>
      </div>
      <div
        v-else-if="loginMutation.isSuccess.value"
        class="text-center py-2 mt-2 bg-green-100"
      >
        <p class="text-green-500">Welcome back, Login successful!</p>
      </div>
      <form @submit="handleSubmit" class="space-y-4 mt-6 px-6">
        <div class="flex flex-col space-y-2">
          <label for="email" class="text-sm font-medium text-foreground"
            >Email</label
          >
          <input
            id="email"
            type="email"
            placeholder="name@example.com"
            v-model="formData.email"
            :disabled="loginMutation.isPending.value"
            class="w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
          />
        </div>

        <div class="flex flex-col space-y-2">
          <label for="password" class="text-sm font-medium text-foreground"
            >Password</label
          >
          <input
            id="password"
            type="password"
            placeholder="Enter password"
            v-model="formData.password"
            :disabled="loginMutation.isPending.value"
            class="w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
          />
        </div>

        <button
          type="submit"
          class="w-full bg-primary text-white py-2 rounded-lg hover:opacity-90 transition disabled:opacity-60 flex justify-center items-center gap-2"
          :disabled="loginMutation.isPending.value"
        >
          <Loader class="w-5 h-5" v-if="loginMutation.isPending.value" />
          {{ loginMutation.isPending.value ? "Signing in..." : "Sign In" }}
        </button>
      </form>

      <div class="mt-6 text-center text-sm">
        <span class="text-muted-foreground">Don't have an account? </span>
        <router-link
          to="/auth/signup"
          class="text-primary font-medium hover:underline"
        >
          Sign up
        </router-link>
      </div>

      <!-- <div class="mt-4 text-center">
        <router-link
          to="/"
          class="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          ← Back to home
        </router-link>
      </div> -->
    </div>
  </div>
</template>
