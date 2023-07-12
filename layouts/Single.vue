<template>
    <div id="wrap">
        <div
            :class="[
                {aiSingle:this.$router.currentRoute.path==='/ai/single'},
                {monthTableSingle:this.$router.currentRoute.path==='/singletable'},
                {boardSingle:this.$router.currentRoute.path==='/singleboard'},
            ]"
        >
            <jQueryScrollbar :maxHeight="'100%'" class="mainScroll">
                <router-view  :scrollH="scrollH" class="pagelayout" />
                <Footer v-if="this.$router.currentRoute.path==='/singleboard'" />
                <div class="floating">
                    <button type="button" class="btn-widget btn-gotop" title="상단으로가기" @click="gotoTop()" v-if="scroll"></button>
                </div>
            </jQueryScrollbar>
            
        </div>
    </div>
</template>
<style>
.monthTableSingle, .boardSingle{overflow: hidden;width:100%; height: inherit;}
.monthTableSingle .floating, .boardSingle .floating{right:10px;min-width:60px}
.aiSingle{height:100%;}
</style>
<script>
import Footer from '@/components/layouts/Footer.vue';
export default {
    components: {
        Footer
    },
    data() {
        return {
            scroll: false,
            scrollH: null
        };
    },
    mounted() {
        window.addEventListener('scroll', this.handleScroll);
        window.$eventBus.$on('scrollMove', this.scrollMove);
        $(this.$el).find('.mainScroll .scroll-content').on('scroll', this.handleScroll);
        
    },
    destroyed() {
        window.removeEventListener('scroll', this.handleScroll);
        window.$eventBus.$off('scrollMove', this.scrollMove);
    },
    methods: {
        handleScroll() {
            this.scrollH = document.querySelector('.mainScroll .scroll-content').scrollTop;
            this.scrollH > 50 ? this.scroll = true : this.scroll = false;
        },
        //페이지 탑 이동
        gotoTop() {
            $(this.$el).find('.mainScroll .scroll-content').animate({scrollTop: '0'}, 300);
        },
        scrollMove() {
            
        }
    }
};
</script>