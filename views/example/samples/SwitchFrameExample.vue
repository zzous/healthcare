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
            sampleCodeHL: '',
            sampleCode: `
<SwitchFrame condition="CONDITION">
    <template #CONDITION_VALUE1>
        <div>C - 1</div>
    </template>
    <template #CONDITION_VALUE2>
        <div>C - 2</div>
    </template>
    <template #default> // !CONDITION_VALUE1 && !CONDITION_VALUE2
        <div>
            Default
        </div>
    </template>
</SwitchFrame>
            `
        };
    },
    mounted() {
        this.sampleCodeHL = Prism.highlight(this.sampleCode, Prism.languages.js, 'js');
    },
    methods: {
    }
};
</script>

<style>

</style>
