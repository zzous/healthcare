const membermanage = [
    {
        path: '/',
        name: 'layout',
        component: () => import('@/layout/index.vue'),
        children: [
            {
                path: '/memberinfo',
                name: 'memberinfo',
                component: () => import('@/views/membermanage/MemberInfo.vue'),
                meta: {
                    unauthorized: true,
                    sublocation_depth: ['회원관리', '회원정보관리', '회원정보관리']
                }
            },
            {
                path: '/membershiplist',
                name: 'membershiplist',
                component: () => import('@/views/membermanage/MembershipList.vue'),
                meta: {
                    unauthorized: true,
                    sublocation_depth: ['회원관리', '회원정보관리', '자격상실명단관리']
                }
            },
            {
                path: '/membershiplist1',
                name: 'membershiplist1',
                component: () => import('@/views/membermanage/Memberdisable.vue'),
                meta: {
                    unauthorized: true,
                    sublocation_depth: ['회원관리', '휴먼회원관리', '자격상실명단관리1']
                }
            }
        ]
    }
];
export default membermanage;