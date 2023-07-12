<template>
    <div class="admin_menu">
        <div class="menu">
            <ul>
                <!-- 1depth -->
                <li :class="[{ 'depth': item.depth }, { 'isActive': item.isActive }]" v-for="(item, index) in state.menu"
                    :key="index">
                    <span @click="gnbOpen(index)">{{ item.label }}</span>
                    <!-- 2depth -->
                    <ul v-if="item.depth">
                        <li v-for="(sub, i) in item.depth_sub" :key="i" :class="[{ 'isActive': sub.isActive }]">
                            <span @click="gnbOpen(index, i)">{{ sub.label }}</span>
                            <!-- 3depth -->
                            <ul>
                                <li v-for="(depth, idx) in sub.menuitems" :key="idx"
                                    :class="[{ 'isActive': depth.isActive }]">
                                    <span @click="gnbOpen(index, i, idx)">{{ depth.label }}</span>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import { reactive, getCurrentInstance, computed } from 'vue';

export default {
    props: ['menuList'],
    emits: ['gnbOpen'],
    setup(props) {
        const { emit } = getCurrentInstance();
        const state = reactive({
            menu: computed(() => props.menuList)
        });
        
        
        const gnbOpen = (depth1, depth2, depth3) => {
            emit('gnbOpen', depth1, depth2, depth3);
        };
        return {
            state,
            gnbOpen
        };
    }
};
</script>