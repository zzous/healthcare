<template>
<div class="guides">
    <div class="sample">
        <ApiFrame
            #default="{
                data,
                status: {
                    fetching,
                    resolved,
                    error
                }
            }"
            :promise="samplePromise"
        >
            <div>
                <template v-if="!error">
                    <template v-for="item in data">
                        <div :key="item">
                            {{ item }}
                        </div>
                    </template>
                </template>
                <template v-else>
                    isResolved : {{ resolved }}
                    error: {{ error }}
                </template>
            </div>
            <!--
                // # Overlay 생성 예시
                 <overlay :show="fetching" :opacity=".9"> ... </overlay>
             -->
        </ApiFrame>

        <button @click="callSamplePromise()">Reload</button>
        <button @click="callSamplePromise(true)">Reload Error</button>
    </div>

    <pre class="language-js">
        <code class="language-js" v-html="sampleCodeHL"></code>
    </pre>
</div>
</template>

<script>
export default {
    data() {
        return {
            samplePromise: () => {},
            sampleData: null,
            sampleCodeHL: '',
            sampleCode: `
<ApiFrame
    #default="{
        data, // {Object | Array} Promise response 결과값
        status: {
            error, // {Object} Promise reject 결과값
            fetching, // {Boolean} : Promise 진행 상태값
            resolved // {Boolean} : Promise 응답 상태값
        }
    }"
    :promise="samplePromise" // Promise 전달 (필수값)
>
    <div>
        ... codes
    </div>
    |
    <Component>
        ... codes
    </Component>
</ApiFrame>
            `
        };
    },
    created() {
        this.callSamplePromise();
    },
    mounted() {
        this.sampleCodeHL = Prism.highlight(this.sampleCode, Prism.languages.js, 'js');
    },
    methods: {
        callSamplePromise(isError) {
            this.samplePromise = new Promise((resolve, reject) => { // inside call Promise ? Async/Await : null
                try {
                    if (!isError) {
                        setTimeout(() => {
                            resolve(['Sample', 'Data', 'Resolved']);
                        }, 2000);
                    } else {
                        throw new Error();
                    }
                } catch (error) {
                    reject(error);
                }
            });
        }
    }
};
</script>

<style>

</style>
