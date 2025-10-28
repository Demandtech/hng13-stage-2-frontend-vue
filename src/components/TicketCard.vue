<script setup>
import {  ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import DeleteDialog from "./DeleteDialog.vue";

const props = defineProps({
  ticket: {
    type: Object,
    required: true,
  },
});

const isOpen = ref(false);

const router = useRouter();
const route = useRoute();
const emit = defineEmits(["open"])
const getStatusColor = (status) => {
  const colors = {
    open: "text-status-open bg-status-open-bg border-status-open-border",
    in_progress:
      "text-status-progress bg-status-progress-bg border-status-progress-border",
    closed:
      "text-status-closed bg-status-closed-bg border-status-closed-border",
  };
  return colors[status];
};

const getStatusLabel = (status) => {
  const labels = {
    open: "Open",
    in_progress: "In Progress",
    closed: "Closed",
  };
  return labels[status];
};

const getPriorityColor = (priority) => {
  const colors = {
    low: "text-muted-foreground",
    medium: "text-status-progress",
    high: "text-destructive",
  };
  return colors[priority] || colors.medium;
};

const createQuery = (ticket_id) => {
  const query = { ...route.query, ticket_id };
  router.replace({ query });
};

const handleEdit = (ticket_id) => {
  createQuery(ticket_id);
  emit("open");
};

const handleDelete = (ticket_id) => {
  isOpen.value = true;
  createQuery(ticket_id);
};

</script>

<template>
  <div class="shadow-lg border-2 flex flex-col border-border rounded-xl">
    <div class="flex justify-between items-center p-3 pb-0">
      <div
        :class="`${getStatusColor(
          ticket.status
        )} py-1 px-3 text-xs border rounded-xl`"
      >
        {{ getStatusLabel(ticket.status) }}
      </div>

      <span
        v-if="ticket.priority"
        :class="`text-xs font-medium uppercase ${getPriorityColor(
          ticket.priority
        )}`"
      >
        {{ ticket.priority }}
      </span>
    </div>

    <div class="flex-1 flex flex-col justify-between p-3">
      <h3 class="line-clamp-2 font-bold text-2xl">{{ ticket.title }}</h3>
      <p class="line-clamp-3 text-muted-foreground pb-2">
        {{ ticket.description || "No description provided" }}
      </p>

      <div class="flex items-center gap-2 text-xs text-muted-foreground mb-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="lucide lucide-calendar1-icon lucide-calendar-1"
        >
          <path d="M11 14h1v4" />
          <path d="M16 2v4" />
          <path d="M3 10h18" />
          <path d="M8 2v4" />
          <rect x="3" y="4" width="18" height="18" rx="2" />
        </svg>
        <span>{{ new Date(ticket?.created_at).toLocaleDateString() }}</span>
      </div>

      <div class="flex gap-2">
        <button
          class="flex-1 border-2 text-muted-foreground border-border rounded-md py-1 text-sm flex items-center justify-center gap-2 cursor-pointer hover:opacity-80 transition-opacity duration-300"
          @click="handleEdit(ticket.id)"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-square-pen-icon lucide-square-pen"
          >
            <path
              d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"
            />
            <path
              d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z"
            />
          </svg>
          Edit
        </button>

        <button
          class="bg-red-500 text-white rounded-md px-3 py-1 text-sm flex items-center justify-center gap-2 cursor-pointer hover:opacity-80 transition-opacity duration-300"
          @click="handleDelete(ticket.id)"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            class="lucide lucide-trash2-icon lucide-trash-2"
          >
            <path d="M10 11v6" />
            <path d="M14 11v6" />
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
            <path d="M3 6h18" />
            <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
          </svg>
          Delete
        </button>
      </div>
    </div>

    <DeleteDialog :isOpen="isOpen" @closeDeleteDialog="isOpen = false" />
  </div>
</template>
