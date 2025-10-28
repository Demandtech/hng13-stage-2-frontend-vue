<script setup>
import axios from "@/axiosClient";
import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";
import { computed, onBeforeUnmount, onMounted, ref, toRaw, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { Loader } from "./icons";

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
});

const route = useRoute();
const router = useRouter();
const mode = ref("create");
const queryClient = useQueryClient();
const formData = ref({
  title: "",
  description: "",
  status: "open",
  priority: "low",
});

const formDataMessage = ref({
  error: "",
  success: "",
});

const emit = defineEmits(["close", "open"]);

const modalRef = ref(null);

const handleBackdropClick = (e) => {
  if (e.target === modalRef.value) {
    handleClose();
  }
};

const handleEsc = (e) => {
  if (e.key === "Escape") {
    handleClose();
  }
};

const handleClose = () => {
  const query = { ...route.query };
  delete query.ticket_id;
  router.replace({ query });
  emit("close");
};

const ticketId = computed(() => route.query.ticket_id);

const createTicketMutation = useMutation({
  mutationFn: async () => {
    const res = await axios.post("tickets", toRaw(formData.value));
    return res.data;
  },

  onSuccess: () => {
    queryClient.invalidateQueries({
      queryKey: ["tickets"],
    });

    formDataMessage.value = {
      ...formDataMessage.value,
      success: "Ticket successfully created!",
    };

    setTimeout(() => {
      emit("close");
      formDataMessage.value = {
        success: "",
        error: "",
      };
      formData.value = {
        title: "",
        description: "",
        status: "open",
        priority: "low",
      };
    }, 1000);
  },

  onError: (err) => {
    const message =
      err?.response?.data?.message ||
      err?.message ||
      "An error occurred creating ticket!";
    formDataMessage.value = { ...formDataMessage.value, error: message };
  },
});

const editTicketMutation = useMutation({
  mutationFn: async () => {
    const res = await axios.put(
      "tickets/" + toRaw(ticketId.value),
      toRaw(formData.value)
    );
    return res.data;
  },

  onSuccess: () => {
    queryClient.invalidateQueries({
      queryKey: ["tickets"],
    });
    formDataMessage.value = {
      ...formDataMessage.value,
      success: "Ticket successfully updated!",
    };

    setTimeout(() => {
      emit("close");
      formDataMessage.value = {
        success: "",
        error: "",
      };
      formData.value = {
        title: "",
        description: "",
        status: "open",
        priority: "low",
      };
    }, 1000);
  },

  onError: (err) => {
    const message =
      err?.response?.data?.message ||
      err?.message ||
      "An error occurred updating ticket!";
    formDataMessage.value = { ...formDataMessage.value, error: message };
  },
});

const handleSubmit = (e) => {
  e.preventDefault();
  if (mode.value === "create") {
    createTicketMutation.mutate(formData.value);
  } else {
    editTicketMutation.mutate(formData.value);
  }
};

const { data, isLoading } = useQuery({
  queryKey: ["ticket"],
  queryFn: async () => {
    const res = await axios.get("/tickets/" + ticketId.value);

    return res.data;
  },
  enabled: computed(() => !!ticketId.value && props.isOpen),
});

// watch(
//   () => props.isOpen,
//   (open) => {
//     if (open && ticketId.value) {
//       refetch();
//     }
//   }
// );

// watch(
//   () => data.value,
//   (newData) => {
//     if (!newData?.ticket) return;

//     mode.value = "edit";
//     formData.value = {
//       title: newData.ticket.title,
//       description: newData.ticket.description,
//       status: newData.ticket.status,
//       priority: newData.ticket.priority,
//     };
//   }
// );
watch(
  [() => props.isOpen, () => data.value, () => ticketId.value],
  ([isOpen, newData, id]) => {
    if (!isOpen) return;

    if (id && newData?.ticket) {
      mode.value = "edit";
      formData.value = {
        title: newData.ticket.title,
        description: newData.ticket.description,
        status: newData.ticket.status,
        priority: newData.ticket.priority,
      };
    } else {
      mode.value = "create";
      formData.value = {
        title: "",
        description: "",
        status: "open",
        priority: "low",
      };
      formDataMessage.value = { success: "", error: "" };
    }
  }
);

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
    class="fixed top-0 left-0 h-full w-full bg-black/10 z-50 flex justify-center items-end pb-5 px-4 md:items-center"
    @click="handleBackdropClick"
  >
    <div
      class="bg-white rounded xl p-5 shadow-lg min-w-[300px] min-h-[300px] relative max-w-md w-full"
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
      <div v-if="isLoading" class="flex justify-center pt-10 h-full">
        <Loader class="animate-spin" />
      </div>
      <form v-else @submit="handleSubmit">
        <div className="flex-col items-start mb-5 pt-8">
          <h4>{{ mode === "edit" ? "Edit Ticket" : "Create New Ticket" }}</h4>

          <p className="text-sm font-normal text-muted-foreground">
            {{
              mode === "edit"
                ? "Update the ticket details below."
                : "Fill in the details to create a new ticket."
            }}
          </p>
        </div>
        <div
          v-if="formDataMessage.error"
          class="text-center py-2 mt-2 bg-red-100"
        >
          <p class="text-red-500">
            {{ formDataMessage.error }}
          </p>
        </div>
        <div
          v-else-if="formDataMessage.success"
          class="text-center py-2 mt-2 bg-green-100"
        >
          <p class="text-green-500">{{ formDataMessage.success }}</p>
        </div>
        <article class="space-y-4 mb-8">
          <div>
            <label class="block mb-0.5" for="title">Title</label>
            <input
              id="title"
              placeholder="Enter ticket title"
              v-model="formData.title"
              class="border-2 border-border placeholder:text-muted-foreground w-full rounded-md py-1 px-2"
            />
          </div>
          <div>
            <label class="block mb-0.5" for="description">Description</label>
            <textarea
              id="description"
              placeholder="Enter ticket description"
              v-model="formData.description"
              class="border-2 border-border placeholder:text-muted-foreground w-full rounded-md py-1 px-2 resize-none"
              rows="3"
            />
          </div>

          <div className="flex gap-4 w-full">
            <div class="flex-1">
              <label class="block" for="status">Status</label>
              <select
                id="status"
                v-model="formData.status"
                placeholder="Select status"
                class="border-2 border-border placeholder:text-muted-foreground w-full rounded-md py-1 px-2"
              >
                <option value="open">Open</option>
                <option value="in_progress">In Progress</option>
                <option value="closed">Closed</option>
              </select>
            </div>
            <div class="flex-1">
              <label class="block" for="priority">Priority</label>
              <select
                id="Priority"
                v-model="formData.priority"
                placeholder="Select priority"
                class="border-2 border-border placeholder:text-muted-foreground w-full rounded-md py-1 px-2"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>
        </article>

        <div className="w-full mt-auto flex justify-end gap-4">
          <button
            type="button"
            @click="handleClose"
            class="border-2 border-border rounded-md px-2 py-1 text-muted-foreground cursor-pointer hover:opacity-80 duration-300 transition-opacity"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="flex items-center gap-2 bg-primary text-white rounded-md px-2 py-1 cursor-pointer hover:opacity-80 duration-300 transition-opacity"
          >
            <Loader
              v-if="
                editTicketMutation.isPending.value ||
                createTicketMutation.isPending.value
              "
              class="animate-spin h-4 w-4"
            />
            {{ mode === "edit" ? "Save Changes" : "Create Ticket" }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
