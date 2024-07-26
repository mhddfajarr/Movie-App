import { createRouter, createWebHistory } from "vue-router";
import Home from '../views/home.vue'
import MovieDetail from '../views/movieDetail.vue';

const routes = [
    {
        path: '/',
        component: Home
    },
    {
        path: '/movie/:id',
        component: MovieDetail
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
        return savedPosition || { top: 0 };
    }
});

export default router;
