<template>
    <div class="guides">
        <div class="sample">
            <button @click="$Modal.simple('simple')">simple</button>
            <button @click="$Modal.alert('alert').catch(e => e)">alert</button>
            <button @click="$Modal.confirm('confirm').catch(e => e)">confirm</button>
        </div>

        <pre class="language-javasciprt">
            <code class="language-javasciprt" v-html="sampleCodeJS" />
        </pre>
    </div>
</template>

<script>
export default {
    data() {
        return {
            sampleCode: '',
            sampleCodeJS: `
$Modal method chaining = simple, alert, confirm

this.$Modal.'chaningType'({
    title: '',
    text: '',
    html: '',
    buttonText: {
        ok: ''
    }
})
.then(success => {
    ... codes
})
.catch(error => {
    ... codes
});
        `
        };
    },
    mounted() {
        this.sampleCode = Prism.highlight(this.sampleCode, Prism.languages.html, 'html');
        this.sampleCodeJS = Prism.highlight(this.sampleCodeJS, Prism.languages.javascript, 'javascript');
    },
    methods: {
        sampleAlert() {
            this.$Modal.alert({
                title: 'Alrt 창 타이틀',
                text: 'Alert 창\n두줄 내용',
                buttonText: {
                    ok: '확인 버튼 텍스트'
                }
            })
                .then(success => {
                    $toast(success);
                })
                .catch(error => {
                    $toast(error, null, 'error');
                });
        },
        sampleConfirm() {
            this.$Modal.confirm({
                title: '',
                text: 'Confirm 창\n두줄 내용',
                buttonText: {
                    confirm: '확인 버튼 텍스트',
                    cancel: '취소 버튼 텍스트'
                }
            })
                .then(success => {
                    $toast(success);
                })
                .catch(error => {
                    $toast(error, null, 'error');
                });
        }
    }
};
</script>

<style>

</style>