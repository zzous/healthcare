export const UPDATE_VIEW_MODE = 'updateViewMode';
export default {
    // ... Mutaions
    [UPDATE_VIEW_MODE]: (state, payload) => {
        state.viewMode = payload;
    }
};
