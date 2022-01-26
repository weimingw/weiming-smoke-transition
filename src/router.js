import { createRouter, createWebHashHistory } from 'vue-router';
import Home from './pages/Home.vue';
import How from './pages/How.vue';

const routes = [
    { path: '/how', component: How },
    { path: '/', component: Home },
];

const router = createRouter({    
    history: createWebHashHistory(),
    routes,
});

export default router;
