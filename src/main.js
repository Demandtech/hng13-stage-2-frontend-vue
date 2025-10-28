import { createApp } from "vue";
import { createPinia } from "pinia";
import { VueQueryPlugin, QueryClient } from "@tanstack/vue-query";
import App from "./App.vue";
import router from "./router";
import "./index.css";

const queryClient = new QueryClient();

createApp(App)
  .use(router)
  .use(createPinia())
  .use(VueQueryPlugin, { queryClient })
  .mount("#app");
