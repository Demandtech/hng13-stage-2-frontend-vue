<template>
  <footer class="border-t border-border bg-card mt-auto">
    <div class="mx-auto max-w-[1440px] px-4 py-8 md:px-8">
      <div class="flex flex-col md:flex-row justify-between items-center gap-4">
        <div class="text-center md:text-left">
          <h3 class="font-bold text-lg text-foreground">Ticket Manager</h3>
          <p class="text-sm text-muted-foreground mt-1">
            Manage your tickets efficiently
          </p>
        </div>

        <div
          class="flex flex-col md:flex-row gap-6 text-sm text-muted-foreground"
        >
          <a href="#" class="hover:text-foreground transition-colors">
            Privacy Policy
          </a>
          <a href="#" class="hover:text-foreground transition-colors">
            Terms of Service
          </a>
          <a href="#" class="hover:text-foreground transition-colors">
            Contact
          </a>
        </div>
      </div>

      <div
        class="mt-6 pt-6 border-t border-border text-center text-sm text-muted-foreground"
      >
        <p>
          © {{ new Date().getFullYear() }} Ticket Manager. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
</template>
