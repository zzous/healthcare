import { createStore } from 'vuex';
import moduleA from './modules/moduleA';

const store = createStore({
    namespaced: true,
    modules: {
        moduleA
    }
});

export default store;
