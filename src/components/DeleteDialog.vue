<script setup>
import { useRouter, useRoute } from "vue-router";
import { useMutation, useQueryClient } from "@tanstack/vue-query";
import axios from "@/axiosClient";
import { Loader } from "./icons";
import { onBeforeUnmount, onMounted } from "vue";

const props = defineProps({
  isOpen: { type: Boolean, required: true },
});

const emit = defineEmits(["closeDeleteDialog"]);

const queryClient = useQueryClient();
const router = useRouter();
const route = useRoute();

const handleClose = async () => {
  const query = { ...route.query };
  delete query.ticket_id;
  await router.replace({ query });
  emit("closeDeleteDialog");
};

const deleteMutation = useMutation({
  mutationFn: async ({ id }) => {
    if (!id) throw new Error("Ticket ID is required");
    const { data } = await axios.delete(`/tickets/${id}`);
    return data;
  },
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["tickets"] });
    handleClose();
  },
});

const handleDeleteTicket = () => {
  const id = route.query.ticket_id;
  if (!id) return;
  deleteMutation.mutate({ id });
};

const handleEsc = (e) => {
  if (e.key === "Escape") {
    handleClose();
  }
};

onMounted(() => {
  window.addEventListener("keydown", handleEsc);
});

onBeforeUnmount(() => {
  window.removeEventListener("keydown", handleEsc);
});
</script>

<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
  >
    <div
      class="bg-white dark:bg-neutral-900 rounded-xl shadow-lg w-[90%] max-w-md relative"
    >
      <button
        @click="handleClose"
        class="absolute right-4 top-4 hover:text-red-500 cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="lucide lucide-x-icon lucide-x"
        >
          <path d="M18 6 6 18" />
          <path d="m6 6 12 12" />
        </svg>
      </button>
      <header class="p-4 border-b border-border">
        <h2 class="text-lg font-semibold">Are you sure?</h2>
      </header>

      <main class="p-4">
        <p class="text-muted-foreground">
          This action cannot be undone. This will permanently delete the ticket.
        </p>
      </main>

      <footer class="flex justify-end gap-3 p-4 border-t border-border">
        <button
          class="border rounded-md px-3 py-1 text-sm hover:bg-gray-50 dark:hover:bg-neutral-800"
          @click="handleClose"
        >
          Cancel
        </button>
        <button
          class="bg-red-500 text-white rounded-md px-3 py-1 text-sm flex items-center justify-center gap-2"
          :disabled="deleteMutation.isPending.value"
          @click="handleDeleteTicket"
        >
          <Loader
            v-if="deleteMutation.isPending.value"
            class="w-4 h-4 animate-spin"
          />
          Delete
        </button>
      </footer>
    </div>
  </div>
</template>
