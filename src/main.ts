import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';

import { createRouter, createWebHistory } from 'vue-router/auto';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

import { setupLayouts } from 'virtual:generated-layouts';
import { createHead } from '@vueuse/head';
import { VueQueryPlugin } from '@tanstack/vue-query';

// Import one of the available themes
//import 'vue-toast-notification/dist/theme-default.css';
import 'vue-toast-notification/dist/theme-sugar.css';
import './assets/main.css';
const router = createRouter({
    extendRoutes(routes) {
        return setupLayouts(routes);
    },
    history: createWebHistory(),
    // You don't need to pass the routes anymore,
    // the plugin writes it for you 🤖
});
const app = createApp(App);
const head = createHead();

app.use(head);
const pinia = createPinia();
pinia.use(({ store }) => {
    store.router = markRaw(router);
});
pinia.use(piniaPluginPersistedstate);
app.use(pinia);
app.use(router);
app.use(VueQueryPlugin);

app.mount('#app');
