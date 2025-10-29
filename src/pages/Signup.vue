<script setup>
import { ref } from "vue";
import { Ticket } from "@/components/icons";
import { useAuthStore } from "@/stores/authStore";
import DecorativeCircle from "@/components/DecorativeCircle.vue";
import { useMutation, useQueryClient } from "@tanstack/vue-query";

const { setAuth, loading } = useAuthStore();
const formData = ref({
  email: "",
  password: "",
  confirm_password: "",
});

const queryClient = useQueryClient();

const signupMutation = useMutation({
  mutationFn: async (formData) => {
    const res = await axios.post("/auth/signup", formData);
    return res.data;
  },

  onSuccess: (data) => {
    setAuth(data);
    queryClient.invalidateQueries(["user"]);
    setTimeout(() => {
      router.push("/dashboard");
    }, 500);
  },
});

const handleSubmit = (e) => {
  e.preventDefault();

  signupMutation.mutate({
    email: formData.value.email,
    password: formData.value.password,
    confirm_password: formData.value.confirm_password,
  });
};
</script>

<template>
  <div className="flex flex-col bg-background h-full flex-1">
    <div
      className="flex-1 flex items-center justify-center p-4 relative overflow-hidden"
    >
      <DecorativeCircle
        size="lg"
        position="top-right"
        color="primary"
        :opacity="0.08"
      />
      <DecorativeCircle
        size="md"
        position="bottom-left"
        color="accent"
        :opacity="0.08"
      />

      <div
        className="w-full max-w-md shadow-xl border-2 border-border relative z-10 py-10 bg-white  rounded-2xl"
      >
        <div className="text-center space-y-2 flex-col">
          <div
            className="mx-auto w-16 h-16 rounded-2xl bg-linear-to-r from-primary to-blue-600 flex items-center justify-center mb-4 shadow-glow"
          >
            <Ticket class="w-8 h-8 text-primary-foreground" />
          </div>
          <div>
            <h3 className="text-3xl font-bold">Create Account</h3>
            <p className="text-base">
              Get started with your free account today
            </p>
          </div>
        </div>
        <div
          v-if="signupMutation.isError.value"
          class="text-center py-2 mt-2 bg-red-100"
        >
          <p class="text-red-500">
            {{
              signupMutation.error.value?.response?.data?.message ||
              "Registration failed, please try again later!"
            }}
          </p>
        </div>
        <div
          v-else-if="signupMutation.isSuccess.value"
          class="text-center py-2 mt-2 bg-green-100"
        >
          <p class="text-green-500">Welcome, Registration successful!</p>
        </div>
        <form @submit="handleSubmit" action="" class="space-y-4 mt-6 px-6">
          <div class="flex flex-col space-y-2">
            <label for="email" class="text-sm font-medium text-foreground"
              >Email</label
            >
            <input
              id="email"
              type="email"
              placeholder="name@example.com"
              v-model="formData.email"
              :disabled="loading"
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
              placeholder="Enter new password"
              v-model="formData.password"
              :disabled="loading"
              class="w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-primary disabled:opacity-50 placeholder:text-muted-foreground"
            />
          </div>
          <div class="flex flex-col space-y-2">
            <label
              for="confirm_password"
              class="text-sm font-medium text-foreground"
              >Confirm Password</label
            >
            <input
              id="confirm_password"
              type="password"
              placeholder="Confirm new password"
              v-model="formData.confirm_password"
              :disabled="loading"
              class="w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-primary disabled:opacity-50 placeholder:text-muted-foreground"
            />
          </div>

          <button
            type="submit"
            class="w-full bg-primary text-white py-2 rounded-lg hover:opacity-90 transition disabled:opacity-60 flex justify-center items-center cursor-pointer"
            :disabled="
              loading ||
              !formData.email ||
              !formData.password ||
              !formData.confirm_password
            "
          >
            <svg
              v-if="loading"
              class="animate-spin h-5 w-5 text-white mr-2"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
              ></path>
            </svg>
            {{ loading ? "Signing in..." : "Sign In" }}
          </button>
        </form>
        <div class="mt-6 text-center text-sm">
          <span class="text-muted-foreground"> Already have an account? </span>
          <router-link
            to="/auth/login"
            class="text-primary font-medium hover:underline"
          >
            Sign in
          </router-link>
        </div>

        <div class="mt-4 text-center">
          <router-link
            to="/"
            class="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            ← Back to home
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
