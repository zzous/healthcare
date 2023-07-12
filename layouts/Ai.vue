<template>
    <div id="wrap" >
        <Header />
        <div id="container" :class="[changeclass]">
            <div class="list" :class="[{active: activePath && activePath.indexOf('list') > -1}]">
                <router-view :scrollH="scrollH" name="list" class="pagelayout" />
            </div>
            <div class="detail" :class="[{active: activePath && activePath.indexOf('detail') > -1}, detailMain]">
                <jQueryScrollbar class="mainScroll scrollheight">
                    <router-view :scrollH="scrollH" name="detail" class="pagelayout" />
                    <Footer/>
                    <div class="floating">
                        <button type="button" class="btn-widget btn-gotop" title="상단으로가기" @click="gotoTop()" v-if="scroll"></button>
                    </div>
                </jQueryScrollbar>
            </div>
            <div class="content aicontent">
                <router-view />
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
            detailMain: null,
            scrollH: null,
            scroll: false,
            activePath: this.$router.currentRoute.path.split('/')
        };
    },
    watch: {
        // 화면분할인지 아닌지
        $route() {
            this.activePath = this.$router.currentRoute.path.split('/');
            this.$router.currentRoute.path === '/ai/detail' ? this.detailMain = 'detailMain' : this.detailMain = null;
        }
    },
    destroyed() {
        window.removeEventListener('scroll', this.handleScroll);
    },
    created() {
        this.handleResize();
        this.$router.currentRoute.path === '/ai/detail' ? this.detailMain = 'detailMain' : this.detailMain = null;

    },
    mounted() {
        console.log(this.$router.currentRoute.path);
        
        window.addEventListener('resize', this.handleResize);
        window.addEventListener('scroll', this.handleScroll);
        $(this.$el).find('.mainScroll .scroll-content').on('scroll', this.handleScroll);
    },
    methods: {
        changeMode() {
            if (this.changeclass === '') {
                this.changeclass = 'changeContent';
            } else {
                this.changeclass = '';
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
        }
    }

};
</script>