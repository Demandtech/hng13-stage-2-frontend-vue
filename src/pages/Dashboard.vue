<script setup>
import axios from "@/axiosClient";
import Header from "@/components/Header.vue";
import { Ticket, CheckCircle, Clock, XCircle } from "@/components/icons";
import TicketCard from "@/components/TicketCard.vue";
import TicketModal from "@/components/TicketModal.vue";

import { useQuery } from "@tanstack/vue-query";
import { ref } from "vue";

const { data, isLoading, isError, error } = useQuery({
  queryKey: ["tickets"],
  queryFn: async () => {
    const response = await axios.get("/tickets");

    return response.data;
  },
});

const showModal = ref(false);

const handleCreateTicket = () => {
  showModal.value = true;
};
</script>
<template>
  <Header />
  <main class="flex-1 flex flex-col bg-background">
    <div class="flex-1 py-8 md:py-12">
      <div class="mx-auto max-w-[1440px] px-4 md:px-8">
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-2">Dashboard</h2>
          <p className="text-muted-foreground">
            Overview of your ticket management system
          </p>
        </div>
        <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div
            v-for="(item, index) in [
              {
                label: 'Total Tickets',
                value: data?.stats?.total || 0,
                color: 'accent',
                icon: Ticket,
                desc: 'Total Tickets',
              },
              {
                label: 'Open Tickets',
                value: data?.stats?.open || 0,
                color: 'status-open',
                icon: CheckCircle,
                desc: 'Open Tickets',
              },
              {
                label: 'In Progress',
                value: data?.value?.in_progress || 0,
                color: 'status-progress',
                icon: Clock,
                desc: 'In Progress',
              },
              {
                label: 'Closed',
                value: data?.stats?.closed || 0,
                color: 'status-closed',
                icon: XCircle,
                desc: 'Awaiting Attention',
              },
            ]"
            :key="index"
            class="shadow-md border-2 border-border p-4 rounded-lg space-y-3"
          >
            <div class="flex flex-row items-center gap-2">
              <div
                :class="{
                  'bg-accent border-accent': item.color == 'accent',
                  'bg-status-open-bg border-status-open':
                    item.color === 'status-open',
                  'bg-status-closed-bg border-status-closed-border':
                    item.color === 'status-closed',
                  'bg-status-progress-bg border-status-progress-border':
                    item.color === 'status-progress',
                }"
                class="w-8 h-8 rounded-md border-2 border-accent-foreground/20 flex items-center justify-center"
              >
                <component
                  :is="item.icon"
                  class="w-4 h-4"
                  :class="{
                    'text-accent-foreground': item.color == 'accent',
                    'text-status-open': item.color === 'status-open',
                    'text-status-closed': item.color === 'status-closed',
                    'text-status-progress': item.color === 'status-progress',
                  }"
                />
              </div>
              <h3 class="text-sm font-medium text-muted-foreground">
                {{ item.label }}
              </h3>
            </div>
            <div class="space-y-3">
              <div :class="`text-3xl font-bold text-${item.color}`">
                {{ item.value }}
              </div>
              <p className="text-xs text-muted-foreground mt-1 font-normal">
                {{ item.desc }}
              </p>
            </div>
          </div>
        </div>
        <div>
          <div
            className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8"
          >
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-2">Tickets</h2>
              <p className="text-muted-foreground">
                Manage all your tickets in one place
              </p>
            </div>
            <button
              class="ml-auto flex items-center bg-primary text-white px-3 py-1 rounded-md gap-2 hover:opacity-80 transition-opacity duration-300 cursor-pointer"
              @click="handleCreateTicket"
            >
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
                class="lucide lucide-plus-icon lucide-plus w-4 h-4"
              >
                <path d="M5 12h14" />
                <path d="M12 5v14" />
              </svg>
              Create Ticket
            </button>
          </div>

          <div v-if="isLoading" class="text-center text-muted-foreground py-16">
            Loading tickets...
          </div>
          <div v-else-if="isError" class="text-center text-red-500 py-16">
            {{
              error?.response?.data?.message ||
              "Something went wrong loading tickets."
            }}
          </div>
          <div
            v-else-if="data?.tickets.length === 0"
            class="shadow-md border-2 border-border rounded-xl"
          >
            <div class="flex flex-col items-center justify-center py-16">
              <Ticket class="w-16 h-16 text-muted-foreground mb-4" />
              <h3 class="text-xl font-semibold mb-2">No tickets yet</h3>
              <p class="text-muted-foreground mb-6 text-center max-w-md">
                Get started by creating your first ticket
              </p>
              <button
                class="flex items-center bg-primary text-white px-3 py-1 rounded-md gap-2 hover:opacity-80 transition-opacity duration-300 cursor-pointer"
                @click="handleCreateTicket"
              >
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
                  class="lucide lucide-plus-icon lucide-plus w-4 h-4"
                >
                  <path d="M5 12h14" />
                  <path d="M12 5v14" />
                </svg>
                Create Your First Ticket
              </button>
            </div>
          </div>
          <div v-else class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <TicketCard
              v-for="ticket in data?.tickets"
              :key="ticket.id"
              :ticket="ticket"
              @open="showModal = true"
            />
          </div>
        </div>
      </div>
    </div>
  </main>
  <TicketModal :isOpen="showModal" @close="showModal = false" />
</template>
