<script setup>
import DecorativeCircle from "../components/DecorativeCircle.vue";
import WaveBackground from "../components/WaveBackground.vue";
import FeatureCard from "../components/FeatureCard.vue";
import { useRouter } from "vue-router";

const router = useRouter();

function goTo(page) {
  router.push(page);
}
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <section
      class="relative overflow-hidden bg-linear-to-r from-primary to-blue-600 text-primary-foreground"
    >
      <DecorativeCircle
        size="lg"
        position="top-right"
        color="secondary"
        :opacity="1"
      />
      <DecorativeCircle
        size="md"
        position="bottom-left"
        color="secondary"
        :opacity="1"
      />

      <div
        class="mx-auto max-w-[1440px] px-4 py-24 md:py-32 md:px-8 relative z-10"
      >
        <div class="text-center max-w-3xl mx-auto">
          <h1 class="text-4xl md:text-6xl font-bold mb-6">
            Manage Your Tickets Like a Pro
          </h1>

          <p class="text-lg md:text-xl mb-8 opacity-90">
            Simple, powerful, and efficient ticket management system. Create,
            track, and resolve tickets with ease.
          </p>

          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              @click="goTo('/auth/signup')"
              class="px-6 py-3 bg-primary text-white font-semibold rounded-lg cursor-pointer hover:opacity-80 transition-opacity duration-300"
            >
              Get Started
            </button>
            <button
              @click="goTo('/auth/login')"
              class="px-6 py-3 border-2 border-border text-primary rounded-lg bg-muted cursor-pointer hover:opacity-80 transition-opacity duration-300"
            >
              Login
            </button>
          </div>
        </div>
      </div>

      <WaveBackground />
    </section>

    <!-- Features -->
    <section class="py-16 md:py-24">
      <div class="max-w-6xl mx-auto px-4 text-center mb-12">
        <h2 class="text-3xl md:text-4xl font-bold mb-4">
          Why Choose Ticket Manager?
        </h2>
        <p class="text-lg text-gray-600">
          Everything you need to manage tickets efficiently in one place
        </p>
      </div>

      <div class="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
        <FeatureCard
          title="Real-Time Tracking"
          description="Track ticket status and progress in real-time with live updates."
          :items="[
            'Live status updates',
            'Progress indicators',
            'Activity timeline',
          ]"
          iconBg="w-12 h-12 rounded-lg bg-status-open-bg border-2 border-status-open-border flex items-center justify-center mb-4"
          iconStyle="w-4 h-4 text-status-open mt-0.5 flex-shrink-0"
        >
          <template #icon
            ><svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              class="lucide lucide-ticket-icon lucide-ticket w-6 h-6 text-status-open"
            >
              <path
                d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"
              />
              <path d="M13 5v2" />
              <path d="M13 17v2" />
              <path d="M13 11v2" /></svg
          ></template>
        </FeatureCard>
        <FeatureCard
          title="Easy Ticket Creation"
          description="Create and organize tickets in seconds with our intuitive interface."
          :items="[
            'Quick ticket creation',
            'Custom fields and priorities',
            'Rich text descriptions',
          ]"
          iconBg="w-12 h-12 rounded-lg bg-status-progress-bg border-2 border-status-progress-border flex items-center justify-center mb-4"
          iconStyle="w-4 h-4 text-status-progress mt-0.5 flex-shrink-0"
        >
          <template #icon>
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
              class="lucide lucide-circle-alert-icon lucide-circle-alert w-6 h-6 text-status-progress"
            >
              <path d="M12 6v6l4 2" />
              <circle cx="12" cy="12" r="10" />
            </svg>
          </template>
        </FeatureCard>

        <FeatureCard
          title="Smart Analytics"
          description="Get insights with comprehensive dashboards and reports."
          :items="[
            'Visual dashboards',
            'Performance metrics',
            'Custom reports',
          ]"
          iconBg="w-12 h-12 rounded-lg bg-accent border-2 border-accent-foreground/20 flex items-center justify-center mb-4"
          iconStyle="w-4 h-4 text-accent-foreground mt-0.5 flex-shrink-0"
        >
          <template #icon>
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
              class="lucide lucide-circle-alert-icon lucide-circle-alert w-6 h-6 text-accent-foreground"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" x2="12" y1="8" y2="12" />
              <line x1="12" x2="12.01" y1="16" y2="16" />
            </svg>
          </template>
        </FeatureCard>
      </div>
    </section>

    <section class="py-16 md:py-24 bg-accent/30 w-full">
      <div class="max-w-6xl mx-auto px-4">
        <div
          class="border-2 border-border rounded-xl p-8 md:p-12 text-center bg-white relative overflow-hidden"
        >
          <DecorativeCircle
            size="sm"
            position="top-left"
            color="primary"
            :opacity="0.2"
          />
          <DecorativeCircle
            size="sm"
            position="bottom-right"
            color="accent"
            :opacity="0.2"
          />

          <h2 class="text-3xl md:text-4xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p class="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of teams already using Ticket Manager to streamline
            their workflow.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              @click="goTo('/auth/signup')"
              class="px-6 py-3 bg-primary text-white rounded-lg cursor-pointer hover:opacity-80 transition-opacity duration-300"
            >
              Create Free Account
            </button>
            <button
              @click="goTo('/auth/login')"
              class="px-6 py-3 border-2 border-border bg-muted text-primary rounded-lg cursor-pointer hover:opacity-80 transition-opacity duration-300"
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
