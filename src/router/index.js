import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../stores/auth';



const routes = [
  
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('../views/Login.vue'),
        meta: { requiresAuth: false },
    },
    {
        path: '/contacts',
        name: 'Contacts',
        component: () => import('../components/contacts/ContactView.vue'),
        meta: { requiresAuth: true },
    },
    {
        path: '/analytics',
        name: 'Analytics',
        component: () => import('../views/Analytics.vue'),
        meta: { requiresAuth: true },
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior () {
        return { top: 0};
    }
});

//Protecting routes by auth
router.beforeEach((to, from, next) => {

    const authStore = useAuthStore();
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
    if (requiresAuth && !authStore.isAuthenticated) {
        next({name: 'Login', replace: true});
    } else if (to.name === 'Login' && authStore.isAuthenticated) {
        next({name: 'Contacts', replace: true})
    } else {
        next();
    }
});

export default router;