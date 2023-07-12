const statsRouter = {
    path: '/stats',
    component: () => import('@/layouts/Split.vue'),
    children: [
        {
            path: 'region',
            name: '',
            component: () => import('@/views/stats/RegionPage.vue')
        }
    ],
    meta: {
        title: ''
    }
};

export default statsRouter;
