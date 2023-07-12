import router from './index';

router.onError(error => {
    // ... Error
});

router.beforeEach(async (to, from, next) => {
    // To, From
    next();
});
