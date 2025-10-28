<template>
  <div
    :class="[
      'absolute rounded-full blur-3xl pointer-events-none',
      sizeClasses[size],
      positionClasses[position],
      colorClasses[color],
    ]"
    :style="{ opacity }"
  />
</template>

<script setup>
const props = defineProps({
  size: { type: String, default: "md" },
  position: { type: String, required: true },
  color: { type: String, default: "primary" },
  opacity: { type: Number, default: 0.1 },
});

const sizeClasses = {
  sm: "w-32 h-32",
  md: "w-48 h-48",
  lg: "w-64 h-64",
};

const positionClasses = {
  "top-left": "-top-16 -left-16",
  "top-right": "-top-16 -right-16",
  "bottom-left": "-bottom-16 -left-16",
  "bottom-right": "-bottom-16 -right-16",
  center: "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
};

const colorClasses = {
  primary: "bg-blue-500",
  accent: "bg-pink-500",
  secondary: "bg-purple-500",
};
</script>
