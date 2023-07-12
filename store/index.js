import Vue from 'vue';
import Vuex from 'vuex';

// Modules
import example from './modules/example';
import common from './modules/common';

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        example,
        common
    }
});

export default store;
