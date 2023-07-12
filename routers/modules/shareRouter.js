/**
 * * import { ... Charts } from './share/chart/...';
 *
 *
 */

const shareRouter = {
    path: '/share',
    component: () => import('@/layouts/Default.vue'),
    children: [
        {
            path: 'chart',
            name: '',
            component: () => import('@/views/share/ChartPage.vue'),
            meta: {
                title: ''
            }
        }
    ]
};

export default shareRouter;
