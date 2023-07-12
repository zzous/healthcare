const errorRouter = {
    path: '/error',
    component: () => import('@/layouts/Error.vue'),
    children: [
        {
            path: '404',
            name: '404',
            component: () => import('@/views/errors/Error404Page.vue'),
            meta: {
                title: '404'
            }
        },
        {
            path: '500',
            name: '500',
            component: () => import('@/views/errors/Error500Page.vue'),
            meta: {
                title: '500'
            }
        }
        // ! ... Errors
    ]
};

export default errorRouter;
