const peopleRouter = {
    path: '/people',
    component: () => import('@/layouts/Split.vue'),
    children: [
        {
            path: '/',
            name: 'people',
            components: {
                content: () => import('@/views/people/People.vue'),
                default: () => import('@/views/maps/HousePeopleMap.vue')
            },
            meta: {splitview: true, depthmenu: '공공통계', subdepth: '인구' }
        },
        {
            path: '/household',
            name: 'household',
            components: {
                content: () => import('@/views/people/Household.vue'),
                default: () => import('@/views/maps/houseHoldMap.vue')
            },
            meta: {splitview: true, depthmenu: '공공통계', subdepth: '가구' }
        },
        {
            path: '/policy',
            name: 'policy',
            components: {
                content: () => import('@/views/public/Policy.vue'),
                default: () => import('@/views/maps/PolicyMap.vue')
            },
            meta: {splitview: true, depthmenu: '공공통계', subdepth: '정부정책' }
        }
    ]
};

export default peopleRouter;