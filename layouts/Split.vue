<template>
    <div id="wrap" >
        <Header />
        <div id="container" :class="[changeclass, mapmode]">
                <div :class="['splitview' , splitView]" >
                    <jQueryScrollbar class="mainScroll" :class="hidden">
                        <router-view :scrollH="scrollH" name="content" class="pagelayout" />
                        <Footer/>
                        <div class="floating">
                            <button type="button" class="btn-widget btn-pcver" title="PC버전"></button>
                            <button type="button" class="btn-widget btn-gotop" title="상단으로가기" @click="gotoTop()" v-if="scroll"></button>
                        </div>
                     </jQueryScrollbar>
                </div>
            <div class="content">
                <router-view  />
            </div>
            <div class="changebtn"  @click="changeMode">
                <span>화면전환</span>
            </div>
        </div>
    </div>
</template>
<script>
import Header from '@/components/layouts/Header.vue';
import Footer from '@/components/layouts/Footer.vue';
export default {
    components: {
        Header,
        Footer
    },
    data() {
        return {
            changeclass: '',
            splitView: '',
            mapmode: '',
            scrollH: null,
            scroll: false,
            hidden: null
            
        };
    },
    watch: {
        // 화면분할인지 아닌지
        $route(to, from) {
            if (to.path !== from.path) {
                if (to.meta.splitview === true) {
                    this.splitView = 'active';
                } else {
                    this.splitView = '';
                }
            }
        }
    },
    destroyed() {
        window.removeEventListener('scroll', this.handleScroll);
        window.$eventBus.$off('scrollMove', this.scrollMove);
        window.$eventBus.$off('scrollStop', this.scrollStop);
    },
    created() {
        this.RoadpageCheck();
        this.handleResize();
    },
    mounted() {
        this.RoadpageCheck();
        window.addEventListener('resize', this.handleResize);
        window.addEventListener('scroll', this.handleScroll);
        window.$eventBus.$on('scrollMove', this.scrollMove);
        window.$eventBus.$on('scrollStop', this.scrollStop);
        $(this.$el).find('.mainScroll .scroll-content').on('scroll', this.handleScroll);
    },
    methods: {
        scrollStop(type) {
            console.log(type);
            type === 'open' ? this.hidden = 'hidden' : this.hidden = null;
        },
        changeMode() {
            if (this.changeclass === '') {
                this.changeclass = 'changeContent';
            } else {
                this.changeclass = '';
            }
        },
        // 화면분할인지 아닌지
        RoadpageCheck() {
            if (this.$router.currentRoute.meta.splitview === true)
            {
                this.splitView = 'active';
                this.mapmode = 'mapmode';
                
            } else {
                this.splitView = '';
                this.mapmode = '';
            }
        },
        handleResize(event) {
            this.winwidth = window.innerWidth;
            if (767 < this.winwidth) {
                this.changeclass = '';
            }
        },
        //페이지 탑 버튼 show/hide
        handleScroll() {
            this.scrollH = document.querySelector('.mainScroll .scroll-content').scrollTop;
            this.scrollH > 50 ? this.scroll = true : this.scroll = false;
        },
        //페이지 탑 이동
        gotoTop() {
            $(this.$el).find('.mainScroll .scroll-content').animate({scrollTop: '0'}, 300);
        },
        //eventbus
        scrollMove(cardH) {
            console.log('11');
            $(this.$el).find('.mainScroll .scroll-content').animate({scrollTop: cardH}, 300);
        }
    }

};
</script>
