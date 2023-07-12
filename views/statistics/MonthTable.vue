<template>
    <section class="monthtable">
        <div class="mainTitle">
			<h1 class="titdepth1">주택가격동향조사</h1>
			<div class="titRighttext">
                <button type="button" class="btn-kblibrary">KB통계 자료실</button>
                <button type="button" class="btn-overview">조사개요 및 FAQ</button>
                <button type="button" class="btn-fullscreen"  @click="goToPage('/singletable?tableId=주간%20아파트%20매매가격지수')">전체화면</button>
            </div>
            <ShareCommon
                :pageurl ="this.$router.currentRoute.path"
            />
		</div>
        <!-- @click="goToPage('/singletable?tableId=주간%20아파트%20매매가격지수')" -->
        <!-- excuteOutLink('/singletable?tableId='+tableName) -->
       
        <div class="cardwrap monthtableH"
            :style="!(winheight===null) ? 'height:'+ winheight + 'px': 'height:auto'">
             <div class="mobileLocation" :class="{active:openClass}"> <!-- 22.04.12 moblieSnb -> openClass로 변경 -->
                <button type="button" class="presentActive"  @click="ToggleM_Snb('open')">{{tableName}}</button>
                <button class="btn btn btn-popclose" @click="ToggleM_Snb('close')"></button>
            </div>
            <div class="subNav"> <!-- 22.04.12 moblieSnb 삭제 -->
                <jQueryScrollbar>
                    <ul class="navList">
                        <li v-for="(item, index) in subNavData" :key="index" >
                            <div role="button" :class="['navbtn', {active:item.active}]" @click="ToggleSubmenu(index)">{{item.depth1}}</div>
                            <ul class="subList">
                                <li :class="{active:tableName === subitem.name}" v-for="(subitem, idx) in item.subdepth" :key="idx" @click="subLink(subitem.name)">
                                    {{subitem.name}}
                                </li>
                            </ul>
                        </li>
                    </ul>
                </jQueryScrollbar>
            </div>
            <MontableCard
                :tableName="tableName"
                :winheight="winheight"
                @helpcon="reSetConH"
            />
        </div>
    </section>
</template>
<script>
import ChartOption from '@/components/elements/ChartOption.vue';
import MontableCard from '@/components/statistics/MontableCard.vue';
import ShareCommon from '@/components/elements/ShareCommon.vue';
export default {
    components: {
        ChartOption,
        MontableCard,
        ShareCommon
    },
    data() {
        return {
            winheight: null,
            subNavData: [
                {
                    depth1: '가격지수',
                    active: true,
                    subdepth: [
                        {name: '주간 아파트 매매가격지수', link: null, active: true },
                        {name: '주간 아파트 전세가격지수', link: null, active: false },
                        {name: '월간 아파트 매매가격지수', link: null, active: false },
                        {name: '월간 아파트 전세가격지수', link: null, active: false },
                        {name: '단독 매매가격지수', link: null, active: false },
                        {name: '단독 전세가격지수', link: null, active: false },
                        {name: '연립 매매가격지수', link: null, active: false },
                        {name: '연립 전세가격지수', link: null, active: false },
                        {name: '주택종합 매매가격지수', link: null, active: false },
                        {name: '주택종합 전세가격지수', link: null, active: false },
                        {name: '아파트 월세가격지수', link: null, active: false },
                        {name: 'KB선도아파트 50 지수', link: null, active: false }
                    ]
                },
                {
                    depth1: '가격지수증감률',
                    active: false,
                    subdepth: [
                        {name: '주간 아파트 매매가격지수증감률', link: null, active: true },
                        {name: '주간 아파트 전세가격지수 증감률', link: null, active: false },
                        {name: '월간 아파트 매매가격지수 증감률', link: null, active: false },
                        {name: '월간 아파트 전세가격지수 증감률', link: null, active: false },
                        {name: '단독 매매가격지수 증감률', link: null, active: false },
                        {name: '단독 전세가격지수 증감률', link: null, active: false },
                        {name: '연립 매매가격지수 증감률', link: null, active: false },
                        {name: '연립 전세가격지수 증감률', link: null, active: false },
                        {name: '주택종합 전세가격지수 증감률', link: null, active: false }
                    ]
                },
                {
                    depth1: '전세가격비율',
                    active: false,
                    subdepth: [
                        {name: '아파트 매매가격대비 전세가격비율', link: null, active: true },
                        {name: '단독 매매가격대비 전세가격비율', link: null, active: false },
                        {name: '연립 매매가격대비 전세가격비율', link: null, active: false },
                        {name: '주택종합 매매가격대비 전세가격비율', link: null, active: false }
                    ]
                },
                {
                    depth1: '시장동향/설문조사',
                    active: false,
                    subdepth: [
                        {name: '주간 매수우위지수', link: null, active: true },
                        {name: '주간 매매거래활발지수', link: null, active: false },
                        {name: '주간 전세수급지수', link: null, active: false },
                        {name: '주간 전세거래활발지수', link: null, active: false },
                        {name: '월간 매매거래활발지수', link: null, active: false },
                        {name: '월간 전세거래활발지수', link: null, active: false },
                        {name: '월간 매매가격전망지수', link: null, active: false },
                        {name: '월간 전세가격전망지수', link: null, active: false }
                    ]
                },
                {
                    depth1: '면적별 가격지수',
                    active: false,
                    subdepth: [
                        {name: '주간 아파트 전용면적별 매매가격지수', link: null, active: true },
                        {name: '주간 아파트 전용면적별 전세가격지수', link: null, active: false },
                        {name: '월간 아파트 전용면적별 매매가격지수', link: null, active: false },
                        {name: '월간 아파트 전용면적별 전세가격지수', link: null, active: false },
                        {name: '월간 아파트 전용면적별(구) 매매가격지수', link: null, active: false },
                        {name: '월간 아파트 전용면적별(구) 전세가격지수', link: null, active: false },
                        {name: '단독 면적별 매매가격지수', link: null, active: false },
                        {name: '단독 면적별 전세가격지수', link: null, active: false },
                        {name: '연립 면적별 매매가격지수', link: null, active: false },
                        {name: '연립 면적별 전세가격지수', link: null, active: false },
                        {name: '주택종합 면적별 매매가격지수', link: null, active: false },
                        {name: '주택종합 면적별 전세가격지수', link: null, active: false }
                    ]
                },
                {
                    depth1: '평균가격',
                    active: false,
                    subdepth: [
                        {name: '아파트 매매평균가격', link: null, active: true },
                        {name: '아파트 전세평균가격', link: null, active: false },
                        {name: '단독 매매평균가격', link: null, active: false },
                        {name: '단독 전세평균가격', link: null, active: false },
                        {name: '연립 매매평균가격', link: null, active: false },
                        {name: '연립 전세평균가격', link: null, active: false },
                        {name: '주택종합 매매평균가격', link: null, active: false },
                        {name: '주택종합 전세평균가격', link: null, active: false }
                    ]
                },
                {
                    depth1: '㎡당 평균가격',
                    active: false,
                    subdepth: [
                        {name: '아파트 ㎡당 매매평균가격', link: null, active: true },
                        {name: '아파트 ㎡당 전세평균가격', link: null, active: false },
                        {name: '단독 ㎡당 매매평균가격', link: null, active: false },
                        {name: '단독 ㎡당 전세평균가격', link: null, active: false },
                        {name: '연립 ㎡당 매매평균가격', link: null, active: false },
                        {name: '연립 ㎡당 전세평균가격', link: null, active: false },
                        {name: '주택종합 ㎡당 매매평균가격', link: null, active: false },
                        {name: '주택종합 ㎡당 전세평균가격', link: null, active: false }
                    ]
                },
                {
                    depth1: '5분위 평균가격',
                    active: false,
                    subdepth: [
                        {name: '아파트 5분위 매매평균가격', link: null, active: false },
                        {name: '아파트 5분위 전세평균가격', link: null, active: false },
                        {name: '주택종합 5분위 매매평균가격', link: null, active: false },
                        {name: '주택종합 5분위 전세평균가격', link: null, active: false },
                        {name: '아파트 ㎡당 5분위 매매평균가격', link: null, active: false },
                        {name: '아파트 ㎡당 5분위 전세평균가격', link: null, active: false }
                    ]
                },
                {
                    depth1: '면적별 평균가격',
                    active: false,
                    subdepth: [
                        {name: '아파트 전용면적별 매매평균가격', link: null, active: true },
                        {name: '아파트 전용면적별 전세평균가격', link: null, active: false },
                        {name: '아파트 전용면적별(구) 매매평균가격', link: null, active: false },
                        {name: '아파트 전용면적별(구) 전세평균가격', link: null, active: false }
                    ]
                },
                {
                    depth1: '중위가격',
                    active: false,
                    subdepth: [
                        {name: '아파트 매매중위가격', link: null, active: true },
                        {name: '아파트 전세중위가격', link: null, active: false },
                        {name: '단독 매매중위가격', link: null, active: false },
                        {name: '단독 전세중위가격', link: null, active: false },
                        {name: '연립 매매중위가격', link: null, active: false },
                        {name: '연립 전세중위가격', link: null, active: false },
                        {name: '주택종합 매매중위가격', link: null, active: false },
                        {name: '주택종합 전세중위가격', link: null, active: false }
                    ]
                },
                {
                    depth1: '소득연계',
                    active: false,
                    subdepth: [
                        {name: 'PIR (통계청 소득대비 주택매매가격비)', link: null, active: true },
                        {name: 'J-PIR (통계청 소득대비 주택전세가격비)', link: null, active: false },
                        {name: 'KB아파트주택담보대출 PIR', link: null, active: false },
                        {name: '주택구매력지수', link: null, active: false },
                        {name: '주택잠재력지수', link: null, active: false }
                    ]
                }
            ],
            tableName: '주간 아파트 매매가격지수',
            // moblieSnb: true, 22.04.12 삭제
            openClass: false,
            linktableName: null,
            topH: null,
            footerH: null

        };
    },
    watch: {
        '$route': {
            deep: true,
            immediate: true,
            handler: function(path) {
                return this.tableName = this.$route.query.tableId;
            }
        }
    },
    created() {
        this.tableName = this.$route.query.tableId;
        
    },
    mounted() {
        window.addEventListener('resize', this.handleResize);
        this.handleResize();
    },
    beforeDestory() {
        window.removeEventListener('resize', this.handleResize);
    },
    methods: {
        //차트 옵션 버튼 
        cardOption(type) {
            if (type === 'print') {
                console.log('프린트 옵션실행');
            } else if (type === 'capture') {
                console.log('캡쳐 옵션실행');
            }
        },
        //도움말에따른 테이블 높이 처리
        reSetConH(height, type) {
            if (window.innerHeight > 777) {
                type === 'open' ? this.winheight = this.winheight + height : this.winheight = this.winheight - height;
            } else {
                type === 'open' ? this.winheight = 635 + height : this.winheight = 635;
            }
        },
        //서브메뉴
        subLink(tableName) {
            this.tableName = tableName;
            this.linktableName = tableName;
            // if (window.innerWidth < 1190) { 22.04.12 moblieSnb 삭제
            //     this.moblieSnb = false;
            // }
            return  this.$router.push('/monthtable?tableId=' + tableName);
        },
        // 메뉴 토글
        ToggleSubmenu(idx) {
            this.subNavData.forEach((item, index) => {
                if (index === idx) {
                    item.active === true ? item.active = false : item.active = true;
                }
                return item;
            });
        },
        //모바일 메뉴 
        ToggleM_Snb(type) { //22.04.12 moblieSnb -> openClass로 변경 
            type === 'open' ? this.openClass = true : this.openClass = false;
           
        },
        // 테이블높이값 22.04.12 moblieSnb 삭제
        handleResize(event) {
            if (document.querySelector('.monthtableH')) {
                this.topH = document.querySelector('.monthtableH').offsetTop ;
                this.footerH = document.querySelector('#footer').clientHeight;
            }
             //화면 높이 처리
            if (window.innerWidth > 1189) {
                if (window.innerHeight > 777) {
                    this.winheight = window.innerHeight ;
                    // this.moblieSnb = true;
                    if (document.querySelector('.monthtableH')) {
                        this.winheight = window.innerHeight  - this.topH - this.footerH ;
                    }
                } else {
                    this.winheight = 635;
                }
                
            } else if (window.innerWidth < 1190) {
                this.winheight = null;
                // this.moblieSnb = false;
            }
        },
        //전체화면 보기
        excuteOutLink(link) {
            window.open(link);
        }
    }
};
</script>