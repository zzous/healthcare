const withPrefix = (prefix, routes) => routes.map(route => {
    route.path = prefix + route.path;
    return route;
});
const monthSingleRouter = {
    path: '/singletable',
    component: () => import('@/layouts/Single.vue'),
    children: [
        ...withPrefix('/singletable', [
            {
                path: '/',
                name: 'monthtablesingle',
                component: () => import('@/components/statistics/MontableCard.vue')
            },
            {
                name: 'monthtablesingle_sub',
                path: '/:tableId',
                component: () => import('@/components/statistics/MontableCard.vue'),
                meta: {splitview: false, depthmenu: 'KB통계', subdepth: '주월간 주택동향' }
            }
        ])
    ]
};

export default monthSingleRouter;
