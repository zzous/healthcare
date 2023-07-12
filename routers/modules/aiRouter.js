
const aiRouter = [
    {
    // AI - 주거 가격
        path: '/ai',
        component: () => import('@/layouts/Ai.vue'),
        children: [
            {
                path: '',
                component: () => import('@/views/ai/DefaultPage.vue'),
                meta: {splitview: false, depthmenu: '부동산지도', subdepth: '' }
            },
            {
                path: 'list',
                name: 'list',
                components: {
                    list: () => import('@/views/ai/ListPage.vue'),
                    default: () => import('@/views/ai/DefaultPage.vue')
                },
                meta: {splitview: false, depthmenu: '부동산지도', subdepth: '' }
            },
            {
                path: 'list/detail',
                name: 'listDetail',
                components: {
                    list: () => import('@/views/ai/ListPage.vue'),
                    detail: () => import('@/views/ai/Aihouse.vue'),
                    default: () => import('@/views/ai/DefaultPage.vue')
                },
                meta: {splitview: false, depthmenu: '부동산지도', subdepth: '' }
            },
            {
                path: 'detail',
                name: 'detail',
                components: {
                    detail: () => import('@/views/ai/AihouseType1.vue'),
                    default: () => import('@/views/ai/DefaultPage.vue')
                },
                meta: {splitview: false, depthmenu: '부동산지도', subdepth: '' }
            }
        ]
    
    // AI - ...
    },
    {
        path: '/ai/single',
        component: () => import('@/layouts/Single.vue'),
        children: [
            {
                path: '',
                name: 'Aihouse',
                component: () => import('@/views/ai/AihouseType1.vue')
            }
        ]
    }
];

export default aiRouter;

