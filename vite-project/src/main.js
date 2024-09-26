import './assets/main.css';

import { createPinia } from 'pinia';
import { createApp } from 'vue';

import axios from 'axios';
import VueAxios from 'vue-axios';
import App from './App.vue';
import "./index.css";
import router from './router';
const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(VueAxios, axios);
app.mount('#app');
