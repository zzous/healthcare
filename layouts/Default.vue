<template>

    <div id="wrap">
        <Header  />
        <div id="container">
            
            <jQueryScrollbar :maxHeight="'100%'" class="mainScroll" :class="hidden" >
                <router-view  :scrollH="scrollH" class="pagelayout" />
                <Footer/>
                <div class="floating" >
                    <button type="button" class="btn-widget btn-pcver" title="PC버전" @click="changeViewMode"></button>
                    <button type="button" class="btn-widget btn-gotop" title="상단으로가기" @click="gotoTop()" v-if="scroll"></button>
                </div>
            </jQueryScrollbar>
        </div>
    </div>
</template>

<script>
import Header from '@/components/layouts/Header.vue';
import Footer from '@/components/layouts/Footer.vue';

// store
import { mapState } from 'vuex';
export default {
    components: {
        Header,
        Footer
    },
    data() {
        return {
            scroll: false,
            modal: null,
            psyScroll: 0,
            scrollH: null,
            cardH: null,
            hidden: null,
            bgwhite: null
        };
    },
    computed: {
        ...mapState({
            viewMode: (state) => state.common.viewMode
        })
    },
    mounted() {
        window.addEventListener('scroll', this.handleScroll);
        window.$eventBus.$on('scrollMove', this.scrollMove);
        window.$eventBus.$on('scrollStop', this.scrollStop);
        $(this.$el).find('.mainScroll .scroll-content').on('scroll', this.handleScroll);
    },
    destroyed() {
        window.removeEventListener('scroll', this.handleScroll);
        window.$eventBus.$off('scrollMove', this.scrollMove);
        window.$eventBus.$off('scrollStop', this.scrollStop);
    },
    methods: {
        scrollStop(type) {
            //console.log(type);
            type === 'open' ? this.hidden = 'hidden' : this.hidden = null;
        },
        handleScroll() {
            this.scrollH = document.querySelector('.mainScroll .scroll-content').scrollTop;
            this.scrollH > 50 ? this.scroll = true : this.scroll = false;
        },
        //페이지 탑 이동
        gotoTop() {
            $(this.$el).find('.mainScroll .scroll-content').animate({scrollTop: '0'}, 300);
        },
        // 심리지수 이벤트 버스(스크롤 이동)
        scrollMove(cardH) {
            //console.log('scrollMove');
            $(this.$el).find('.mainScroll .scroll-content').animate({scrollTop: cardH}, 300);
        },
        changeViewMode() {
            console.log('## PC버전', this.viewMode);
            const version = (this.viewMode === 'PC') ? 'MO' : 'PC';
            this.$store.dispatch('common/changeAreaUnit', version);
        }
    }
};
</script>