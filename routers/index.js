import Vue from 'vue';
import VueRouter from 'vue-router';
import statisticsRouter from './modules/statisticsRouter';
import houseRouter from './modules/houseRouter';
import peopleRouter from './modules/peopleRouter';
import allMapRouter from './modules/allMapRouter';
import aiRouter from './modules/aiRouter';
import publicRouter from './modules/publicRouter';
import monthSingleRouter from './modules/monthSingleRouter';
import boardSingleRouter from './modules/boardSingleRouter';

Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'history',
    scrollBehavior() {
        return window.$eventBus.$emit('scrollMove', 0);
    },
    routes: [
        statisticsRouter,
        houseRouter,
        peopleRouter,
        allMapRouter,
        publicRouter,
        monthSingleRouter,
        boardSingleRouter,
        ...aiRouter,

        // * Redirect 404
        {
            path: '*',
            redirect: '/error/404'
        },
        {
            path: '/',
            name: 'home',
            redirect: '/filelist'
        },
        {
            path: '/filelist',
            name: 'filelist',
            component: () => import('@/views/fileList.vue')
        },
        {
            path: '/sample',
            name: 'sample',
            component: () => import('@/views/example/Example.vue')
        }
    ]
});

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err => err.name !== 'NavigationDuplicated' ? err : null);
};
export default router;
