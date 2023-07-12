<template>
    <div class="guides">
        <pre class="language-js">
            <code class="language-js" v-html="sampleCodeHL"></code>
        </pre>
    </div>
</template>

<script>
export default {
    data() {
        return {
            sampleCode: `
<EnvFrame
    #default="{
        isEnv // 환경 변수값 확인용 미사용시 #defaut 삭제
    }"
    limit="local" // 노출 범위 설정 - 설정가능 범위 [local, dev, stg, prod]
    onlyView="prod" // 노출 환경 고정시 사용
>
    ...
</EnvFrame>
            `,
            sampleCodeHL: ''
        };
    },
    mounted() {
        this.sampleCodeHL = Prism.highlight(this.sampleCode, Prism.languages.js, 'js');
    }
};
</script>

<style>

</style>
