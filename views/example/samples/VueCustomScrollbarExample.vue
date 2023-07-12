<template>
    <div>
        <a href="https://binaryify.github.io/vue-custom-scrollbar/en/#ps-y-reach-end" target="_blank">Document</a>
        <div>
            <VueCustomScrollbar
                style=" width: 500px; height: 500px;"
                :settings="scrollbarSettings"
                @ps-scroll-y="scrollHandler"
            >
                <div style="width: 1152px; height: 768px;">
                    <img src="/images/samples/moon_1920_1280.jpg" alt="" style="width:100%; height: auto;">
                </div>
            </VueCustomScrollbar>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            scrollbarSettings: {
                suppressScrollY: false,
                suppressScrollX: false,
                wheelPropagation: false
            }
        };
    },
    methods: {
        scrollHandler(e) {
            // console.log('%c <=== : e : ===> \n', 'color: #fdd835', e);
        }
    }
};
</script>
