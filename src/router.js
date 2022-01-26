import { createRouter, createWebHashHistory } from 'vue-router';
import Home from './pages/Home.vue';
import About from './pages/About.vue';

const routes = [
    { path: '/about', component: About },
    { path: '/', component: Home },
];

const router = createRouter({    
    history: createWebHashHistory(),
    routes,
});

export default router;
