<template>
    <div class="mapContainer" :style="'height:'+ winheight+'px'">
        <div class="map policy">
            <NaverMaps />
            <button :class="['btn blueline btn-policy', {active:policyLayer}]" @click="DayLayerOpen('policyLayer')">정책 연혁</button>
            <div class="maptools">
                <div class="groups">
                    <button type="button" class="btn btn-zoom-up">확대</button>
                    <button type="button" class="btn btn-zoom-down">축소</button>
                </div>
                <button type="button" class="btn btn-location">위치</button>
            </div>

            <!-- 지역규제 버튼 -->
            <div class="viewchangebox">
                <button type="button" class="btn active">규제</button>
                <button type="button" class="btn">신도시</button>
            </div>
            <!-- //  지역규제 버튼 -->

            <!-- 지도 툴팁 -->
            <div role="tooltip" class="tooltip top mptype" style="left:400px;top:200px;">
                <span aria-hidden="true" class="arrow" style="margin-left:-6px;left:50%;"></span>
                <p>고양 창릉</p>
            </div>
            <div role="tooltip" class="tooltip top mptype scaleY" style="left:320px;top:200px;">
                <span aria-hidden="true" class="arrow" style="margin-left:-6px;left:50%;"></span>
                <p>고양 창릉</p>
            </div>
            <!-- // 지도 툴팁 -->

            <!-- 지도 범례 -->
            <div class="changeRateLayer">
                <div class="changeRatetit">
                    <span>규제 구역 범례</span>
                </div>
                <div class="changeRatecon">
                    <div class="prcidxlegend">
                        <span class="rulelegendtype1"></span>
                        <span class="rulelegendtype2"></span>
                        <span class="rulelegendtype3"></span>
                    </div>
                    <div class="numrate full">
                        <span>조정대상지역</span>
                        <span>투기과열지구</span>
                        <span>투기지역</span>
                    </div>
                </div>
            </div>
            <!-- // 지도 범례 -->

            <!-- 정책 연혁 레이어 -->
            <!-- <div  class="policyLayer" v-if="policyLayer"> -->
            <div  :class="['policyLayer', {active:policyLayer}]">
                <div class="layercon layeremo">
                    <button type="button" class="btn btn-popclose" title="닫기" @click="DayLayerOpen('policyLayer')">닫기</button>
                    <div class="inner type1">
                        <div class="tit type1 ">정책 연혁</div>
                        <!-- 정책 내용 -->
                        <div class="selectbox type3">
                            <span class="value txt  arw" :class="{up:selectMonth, down:!selectMonth}" @click="DayLayerOpen('selectMonth')" v-html="year"></span>
                            <div role="listbox" class="selectlist" v-if="selectMonth">
                                <jQueryScrollbar :maxHeight="'60px'">
                                    <div
                                        role="list"
                                        :class="['item txt', {active:item.year === year}]"
                                        v-for="(item, index) in policyList"
                                        :key="index"
                                        v-html="item.year"
                                        @click="Dayselect(index, item.year,'selectMonth')"
                                    >
                                    </div>
                                </jQueryScrollbar>
                            </div>
                        </div>
                        <jQueryScrollbar class="timelineScroll" :maxHeight="'calc(100% - 30px)'">
                            <div class="timelinebox">
                                <div class="timeline" v-for="(item, index) in policyList" :key="index" :ref="'timeline'+ item.year">
                                    <span class="year" v-html="item.year"></span>
                                    <div class="group" v-for="(list, idx) in item.daylists" :key="idx">
                                        <span class="date" v-html="list.day"></span>
                                        <div class="txt">
                                            <p v-html="list.text"></p>
                                            <button type="button" class="iconbtn iconyoutube" title="유튜브" aria-lable="유튜브" v-if="!(list.youtubelink===null)" @click="excuteOutLink(list.youtubelink)"></button>
                                            <button type="button" class="iconbtn iconpost" title="리브콘" aria-lable="리브콘" v-if="!(list.postlink===null)" @click="excuteOutLink(list.postlink)"></button>
                                            <button type="button" class="iconbtn icongov" title="국토부" aria-lable="국토부" v-if="!(list.govlink===null)" @click="excuteOutLink(list.govlink)"></button>
                                        </div>
                                    </div>
                                    
                                </div>
                            </div>
                        </jQueryScrollbar>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import NaverMaps from '@/views/example/samples/NaverMaps.vue';
import { policyList } from '@/data/policyList.js';
export default {
    components: {
        NaverMaps
    },
    data() {
        return {
            polyCount: null,
            svgCount: null,
            //리사이징 데이터
            winwidth: null,
            winheight: null,
            year: '2021',
            selectMonth: false,
            policyLayer: true,
            policyList
        };
    },
    created() {
        this.winwidth = window.innerWidth;
        this.winheight = window.innerHeight;
    },
    mounted() {
        window.addEventListener('resize', this.handleResize);
        this.handleResize();
        this.fadeInOut();
    },
    beforeDestory() {
        window.removeEventListener('resize', this.handleResize);
    },
    methods: {
        
        //레이어 팝업 스크롤 처리 
        handleResize(event) {
            this.winwidth = window.innerWidth;
        //지도 컨테이너 높이 처리 
            this.winwidth > 1024 ? this.winheight = window.innerHeight - 32 : this.winheight = window.innerHeight;
        },
        //년월선택
        Dayselect(idx, year, parms) {
            this.year = year;
            const scrTop = this.$refs['timeline' + year][0].offsetTop;
            $(this.$el).find('.timelineScroll .scroll-content').animate({scrollTop: scrTop}, 400);
            this.DayLayerOpen(parms);
        },
        //월 셀렉, 레이어 오픈
        DayLayerOpen(parms) {
            this[parms] === true ? this[parms] = false : this[parms] = true;
        },
        //외부링크
        excuteOutLink(link) {
            window.open(link);
        },
        //타임라인 레이어 모션
        fadeInOut() {
            this.policyLayer === true ? document.querySelector('.policyLayer').classList.add('active') : document.querySelector('.policyLayer').classList.remove('active');
        }
    }
};
</script>