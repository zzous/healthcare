
const allMapRouter = {
    path: '/weathermap',
    component: () => import('@/layouts/Map.vue'),
    children: [
        {
            path: '/',
            name: 'weathermap',
            component: () => import('@/views/statistics/WeatherMap.vue'),
            meta: {splitview: false, depthmenu: 'KB통계기상도', subdepth: '' }
        }
    ],
    meta: {
        title: ''
    }
};

export default allMapRouter;
