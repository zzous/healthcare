const exampleRouter = {
    path: '/example',
    component: () => import('@/layouts/Default.vue'),
    children: [
        {
            path: '',
            name: 'example',
            component: () => import('@/views/example/Example.vue'),
            meta: {
                title: '샘플'
            }
        }
    ]
};

export default exampleRouter;
