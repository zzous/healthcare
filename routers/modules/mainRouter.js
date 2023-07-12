
const mainRouter = {
    path: '/comparison',
    component: () => import('@/layouts/Default.vue'),
    children: [
        {
            path: '/',
            name: 'comparison',
            
            component: () => import('@/views/statistics/StatisticsPage.vue'),
            meta: {  depthmenu: 'KB통계', subdepth: '통계비교' }
        }
    ]
};

export default mainRouter;
