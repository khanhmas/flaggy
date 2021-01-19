import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import FlagGallery from '../views/FlagGallery.vue';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Gallery',
        component: FlagGallery,
    },
    {
        path: '/detail/:alpha3Code',
        props: true,
        name: 'Detail',
        // beforeEnter: (to, from, next) => {
        //   console.log(to, from, next);
        //   next();
        // },
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import(/* webpackChunkName: "detail" */ '../views/FlagDetail.vue'),
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
