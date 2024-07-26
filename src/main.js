import { createApp } from 'vue';
import './index.css';
import App from './App.vue';
import '@fortawesome/fontawesome-free/css/all.min.css';
import router from './router';

const app = createApp(App);

app.use(router);

app.mount('#app');
