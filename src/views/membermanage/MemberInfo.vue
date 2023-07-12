<template>
    <div class="memberinfo">
        회원정보관리
        <div>
            <!-- {{ moment().format('YYYY-MM-DD HH') }}
            {{ $t('validation.msgRequiredInput') }} -->
        </div>
        api불러오기
        {{ state.testapi }}
        스토어 사용 샘플

        <span>가져오기{{ counter }}</span>
        <div>test가져오기{{ test }}</div>
        <button @click="inc">inc</button>


        <div class="sample">
            <button @click="$toast('Success', 0)">Success</button>
            <button @click="$toast('Error', 0, 'error')">Error</button>
            <button @click="asyncCall()">Async CAll</button>
            <button @click="$toastClearAll()">Clear All</button>
        </div>
    </div>
</template>
<script>
import { getCurrentInstance, computed, reactive, onMounted } from 'vue';
import { useStore } from 'vuex';
import { _getCategoryList } from '@/api/dashboard';


export default {
    setup() {
        const internalInstance = getCurrentInstance();
        const store = useStore();
        const counter = computed(() => store.state.moduleA.counter);
        const test = computed(() => store.getters['moduleA/time2']);
        const inc = () => store.commit('moduleA/setCounter', counter.value + 1);
        const state = reactive({

            array: ['a', 'b', 'c'],
            testapi: ''
        });
        onMounted(() => {
            testApi();
        });
        const testApi = async () => {
            try {
                const response = await _getCategoryList();
                console.log('test api', response);
                state.testapi = response;
            } catch (error) {
                console.log(error);
            }

        };
        const asyncCall = () => {
            const _Promise = (data, delay) => new Promise(resolve => setTimeout(() => resolve(data), delay));

            _Promise(Math.floor(Math.random() * 2), 1000)
                .then(res => {
                    $toast(res + ' Success');
                })
                .catch(err => {
                    $toast(err, 0, 'error');
                });
        };
        return {
            state,
            counter,
            test,
            
            inc,
            asyncCall
        };
    }
};
</script>