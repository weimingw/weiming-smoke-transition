import 'normalize.css';
import './global/index.scss';
import { createApp } from 'vue';
import router from './router';
import App from './App.vue';

const app = createApp(App);
app.use(router);
app.mount('.app');

export default app;

module.hot.accept();
