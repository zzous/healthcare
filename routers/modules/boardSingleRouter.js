
const boardSingleRouter = {
    path: '/singleboard',
    component: () => import('@/layouts/Single.vue'),
    children: [
        {
            path: '/',
            name: 'singleboard',
            component: () => import('@/views/statistics/kbBoard.vue')
        }
    ]
};

export default boardSingleRouter;
