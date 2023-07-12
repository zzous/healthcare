const withPrefix = (prefix, routes) => routes.map(route => {
    route.path = prefix + route.path;
    return route;
});
const statisticsRouter = {
    path: '/comparison',
    component: () => import('@/layouts/Default.vue'),
    children: [
        {
            path: '/',
            name: 'comparison',
            component: () => import('@/views/statistics/Comparison.vue'),
            meta: {splitview: false, depthmenu: 'KB통계', subdepth: '통계비교' }
        },
        {
            path: '/comparison_mobile',
            name: 'comparison_mobile',
            component: () => import('@/views/statistics/ComparisonMobile.vue'),
            meta: {splitview: false, depthmenu: 'KB통계', subdepth: '통계비교' }
        },
        {
            path: '/pir',
            name: 'pir',
            component: () => import('@/views/statistics/PIR.vue'),
            meta: {splitview: false, depthmenu: 'KB통계', subdepth: '소득대비주택가격(PIR)' }
        },
        {
            path: '/psychological',
            name: 'psychological',
            component: () => import('@/views/statistics/Psychological.vue'),
            meta: {splitview: false, depthmenu: 'KB통계', subdepth: '부동산 시장심리' }
        },
        {
            path: '/sundoapt',
            name: 'sundoapt',
            component: () => import('@/views/statistics/SundoApt.vue'),
            meta: {splitview: false, depthmenu: 'KB통계', subdepth: '월간 선도아파트' }
        },
        {
            path: '/investtable',
            name: 'investtable',
            component: () => import('@/views/statistics/InvestTable.vue'),
            meta: {splitview: false, depthmenu: 'KB통계', subdepth: '투자테이블' }
        },
        {
            path: '/kbBoard',
            name: 'kbBoard',
            component: () => import('@/views/statistics/kbBoard.vue'),
            meta: {splitview: false, depthmenu: 'KB통계보드', subdepth: '' }
        },
        {
            path: '/main',
            name: 'main',
            component: () => import('@/views/main/Main.vue'),
            meta: {splitview: false, depthmenu: '', subdepth: '' }
        },
        ...withPrefix('/monthtable', [
            {
                path: '/',
                name: 'monthtable',
                component: () => import('@/views/statistics/MonthTable.vue'),
                meta: {splitview: false, depthmenu: 'KB통계', subdepth: '주월간 주택동향' }
            }, {
                name: 'monthtable_sub',
                path: '/:tableId',
                component: () => import('@/views/statistics/MonthTable.vue'),
                meta: {splitview: false, depthmenu: 'KB통계', subdepth: '주월간 주택동향' }
            }
        ])
        
    ],
    meta: {
        title: ''
    }
};

export default statisticsRouter;
