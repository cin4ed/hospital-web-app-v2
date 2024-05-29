import { createApp } from 'vue';
import App from './App.vue';
import './assets/index.css';
import { router } from './router';
import { Toaster } from '@/components/ui/sonner'

createApp(App).use(router).mount('#app');
