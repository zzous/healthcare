<template>
    <div class="pageTabs">
        <div :class="['labelTabs', {active:item.isActive}]" v-for="(item, index ) in state.pageTabs" :key="index">
            <span @click="isActiveTab(index)">{{item.label}}</span>
            <button class="btn-pageClose" @click="closeTabPage(index)">X</button>
        </div>
    </div>
</template>
<script>
import { reactive, getCurrentInstance, computed } from 'vue';
export default {
    props: ['pageTabs'],
    emits: ['closeTabPage', 'isActiveTab'],
    setup(props) {
        const { emit } = getCurrentInstance();
        const state = reactive({
            pageTabs: computed(() => props.pageTabs)
        });
        const closeTabPage = (index) => {
            emit('closeTabPage', index);
        };
        const isActiveTab = (index) => {
            emit('isActiveTab', index);
        };
        return {
            state,
            closeTabPage,
            isActiveTab
        };
    }
};
</script>