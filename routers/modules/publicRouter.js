
const publicRouter = {
    path: '/land',
    component: () => import('@/layouts/Default.vue'),
    children: [
        {
            path: '/',
            name: 'land',
            component: () => import('@/views/public/Land.vue'),
            meta: {splitview: false, depthmenu: '공공통계', subdepth: '토지' }
        },
        {
            path: '/SupplyHouse',
            name: 'SupplyHouse',
            component: () => import('@/views/public/SupplyHouse.vue'),
            meta: {splitview: false, depthmenu: '공공통계', subdepth: '주택공급' }
        }
        
    ],
    meta: {
        title: ''
    }
};

export default publicRouter;
