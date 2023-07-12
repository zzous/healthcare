<template>
<div class="guides">
    <div class="sample">
        <button @click="$toast('Success', 0)">Success</button>
        <button @click="$toast('Error', 0, 'error')">Error</button>
        <button @click="asyncCall()">Async CAll</button>
        <button @click="$toastClearAll()">Clear All</button>
    </div>

    <pre class="language-js"><code class="language-js" v-html="sampleCode"></code></pre>
</div>
</template>

<script>
export default {
    data: () => ({
        sampleCode: `
<button @click="$toast('Success', 0)">Success</button>
<button @click="$toast('Error', 0, 'error')">Error</button>
<button @click="asyncCall()">Async CAll</button>
<button @click="$toastClearAll()">Clear All</button>
        `
    }),
    mounted() {
        this.sampleCode = Prism.highlight(this.sampleCode, Prism.languages.html, 'html');
    },
    methods: {
        asyncCall: () => {
            const _Promise = (data, delay) => new Promise(resolve => setTimeout(() => resolve(data), delay));

            _Promise(Math.floor(Math.random() * 2), 1000)
                .then(res => {
                    $toast(res + ' Success');
                })
                .catch(err => {
                    $toast(err, 0, 'error');
                });
        }
    }
};
</script>

<style>

</style>