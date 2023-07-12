import {
    STATE
} from './defaults/state';

import actions from './actions';
import mutations from './mutations';
import getters from './getters';

export default {
    namespaced: true,
    state: STATE,
    actions,
    mutations,
    getters
};

/**
 * * Logger for Vuex
 *
 */
//  store
//  .subscribeAction(({ type, payload }, state) => {
//    console.log(
//      `%c 🎬 Action:     ${type} `,
//      'background: #333; color: #54afbd',
//      {
//        payload,
//        state
//      }
//    );
//  });

// store
//  .subscribe(({ type, payload }, state) => {
//    console.log(
//      `%c 🧟‍♀️ Mutation:   ${type} `,
//      'background: #333; color: #bada55',
//      {
//        payload,
//        state
//      }
//    );
//  });
