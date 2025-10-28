<template>
  <div
    class="relative overflow-hidden border-2 rounded-xl p-6 transition-all duration-300 border-gray-200 bg-white"
  >
    <div class="flex flex-col items-start mb-4">
      <div
        class="w-12 h-12 rounded-lg flex items-center justify-center mb-4 border-2"
        :class="iconBg"
      >
        <slot name="icon"></slot>
      </div>
      <h3 class="font-semibold text-lg">{{ title }}</h3>
      <p class="text-muted-foreground">{{ description }}</p>
    </div>

    <DecorativeCircle
      size="sm"
      position="center"
      color="accent"
      :opacity="0.1"
    />

    <ul class="space-y-2 text-sm">
      <li v-for="(item, i) in items" :key="i" class="flex items-start gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          class="lucide lucide-circle-check-icon lucide-circle-check"
          :class="iconStyle"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="m9 12 2 2 4-4" />
        </svg>
        <span>{{ item }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup>
import DecorativeCircle from "./DecorativeCircle.vue";

const props = defineProps({
  title: String,
  description: String,
  items: Array,
  iconBg: String,
  iconStyle: String,
});
</script>
