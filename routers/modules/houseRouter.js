const houseRouter = {
    path: '/house',
    redirect: '/trading',
    component: () => import('@/layouts/Split.vue'),
    children: [
        {
            path: '/',
            name: 'trading',
            components: {
                content: () => import('@/views/house/Trading.vue'),
                default: () => import('@/views/maps/TradingMap.vue')
            },
            meta: {splitview: true, depthmenu: '공공통계', subdepth: '주택거래량' }
        },
        {
            path: '/unsold',
            name: 'unsold',
            components: {
                content: () => import('@/views/house/Unsold.vue'),
                default: () => import('@/views/maps/UnsoldMap.vue')
            },
            meta: {splitview: true, depthmenu: '공공통계', subdepth: '미분양' }
        }
    ],
    meta: {
        title: ''
    }
};

export default houseRouter;