import * as mutations from './mutations';
export default {
    // ...Actions
    ['changeAreaUnit']: ({ state, commit }, mode) => {
        // MO (반응형 버전) <meta name='viewport' content='width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no'></meta>
        // PC (PC 버전) <meta name='viewport' content='width=1440'>
        const _mobile = 'width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no';
        const _pc = 'width=1190';
        
        let viewport = document.querySelector('meta[name=viewport]');
        viewport.setAttribute('content', `${state.viewMode === 'PC' ? _mobile : _pc}`);
        const changeMode = mode ? mode : state.viewMode === 'PC' ? 'MO' : 'PC';
        commit(mutations.UPDATE_VIEW_MODE, changeMode);
    }
};
