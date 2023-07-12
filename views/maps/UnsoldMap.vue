<template>
    <div class="mapContainer" :style="'height:'+ winheight+'px'">
        <div class="map unsold"> <!-- 2022.03.31 퍼블 수정 / unsold 클래스 추가-->
            <div class="changeRateLayer type2">
                <div class="changeRatecon" style="width:200px">
                    <div class="prcidxlegend unsoldmap">
                        <span class="prclegendtype1"></span>
                        <span class="prclegendtype2"></span>
                        <span class="prclegendtype3"></span>
                        <span class="prclegendtype4"></span>
                    </div>
                    <div class="numrate type2" style="width:calc(100% + (100% / 4))">
                        <span class="ratetype1">0</span>
                        <span class="ratetype2">0.3만</span>
                        <span class="ratetype3">0.6만</span>
                        <span class="ratetype4">0.9만</span>
                        <span class="ratetype5">1.2만</span>
                    </div>
                </div>
            </div>

            <!-- 변동률 지도 범례
            <div class="changeRateLayer type2">
                <div class="changeRatecon" style="width:324px">
                    <div class="prcidxlegend changerate line">
                        <span class="prclegendtype1"></span>
                        <span class="prclegendtype2"></span>
                        <span class="prclegendtype3"></span>
                        <span class="prclegendtype4"></span>
                        <span class="prclegendtype5"></span>
                        <span class="prclegendtype6"></span>
                        <span class="prclegendtype7"></span>
                        <span class="prclegendtype8"></span>
                        <span class="prclegendtype9"></span>
                        <span class="prclegendtype10"></span>
                        <span class="prclegendtype11"></span>
                        <span class="prclegendtype12"></span>
                        <span class="prclegendtype13"></span>
                        <span class="prclegendtype14"></span>
                        <span class="prclegendtype15"></span>
                        <span class="prclegendtype16"></span>
                        <span class="prclegendtype17"></span>
                        <span class="prclegendtype18"></span>
                    </div>
                    <div class="numrate type2" style="width:calc(100% + (100% / 6))">
                        <span class="ratetype1 ico down">0.60%</span>
                        <span class="ratetype1 ico down">0.40%</span>
                        <span class="ratetype2 ico down">0.20%</span>
                        <span class="ratetype3">0</span>
                        <span class="ratetype4 ico up">0.20%</span>
                        <span class="ratetype5 ico up">0.40%</span>
                        <span class="ratetype5 ico up">0.60%</span>
                    </div>
                </div>
            </div>
            -->


            
            <div class="areatooltip type4" style="top:130px; left:200px;">
                <div class="toolbox">
                    <span class="arrow"></span>
                    <div class="txt">구리시</div>
                </div>
                <div class="numbox">1,234,765</div>
            </div>
        
            
            <div class="areatooltip type5" style="top:210px; left:200px;">
                <div class="toolbox">
                    <span class="arrow"></span>
                    <div class="txt">구리시</div>
                </div>
                <div class="numbox">1,234,765</div>
            </div>
        

            <div class="dateSelect household">
                <div class="selectbox type4"><!-- 2022.03.31 퍼블 수정 / 화살표 방향 변경-->
                    <span class="value txt arw" :class="{up:!selectmonth, down:selectmonth}" @click="DayLayerOpen('selectmonth')" v-html="month"></span>
                    <div role="listbox" class="selectlist" v-if="selectmonth">
                        <jQueryScrollbar :maxHeight="'141px'">
                            <div
                                role="list"
                                :class="['item txt', {active:item.active}]"
                                v-for="(item, index) in monthType"
                                :key="index"
                                v-html="item.text"
                                @click="Dayselect(index,'monthType','selectmonth')"
                            >
                            </div>
                        </jQueryScrollbar>
                    </div>
                </div>
                <div class="selectbox type4"><!-- 2022.03.31 퍼블 수정 / 화살표 방향 변경-->
                    <span class="value txt arw" :class="{up:!selectYear, down:selectYear}" @click="DayLayerOpen('selectYear')" v-html="year"></span>
                    <div role="listbox" class="selectlist" v-if="selectYear">
                        <!-- 2022.03.11 퍼블 삭제 /jQueryScrollbar 삭제 -->
                        <div
                            role="list"
                            :class="['item txt', {active:item.active}]"
                            v-for="(item, index) in daysType"
                            :key="index"
                            v-html="item.text"
                            @click="Dayselect(index,'daysType','selectYear')"
                        >
                        </div>
                    </div>
                </div>
                <div class="selectbox type4"> <!-- 2022.03.31 퍼블 수정 / 셀렉트 타입 변경,  화살표 방향 변경-->
                    <span class="value txt arw" :class="{up:!houselayer, down:houselayer}"  @click="DayLayerOpen('houselayer')" v-html="house"></span>
                    <div role="listbox" class="selectlist" v-if="houselayer">
                        <div
                            role="list"
                            :class="['item txt', {active:item.active}]"
                            v-for="(item, index) in houeType"
                            :key="index"
                            v-html="item.text"
                            @click="houseSelect(index,'houeType','houselayer')">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import NaverMaps from '@/views/example/samples/NaverMaps.vue';
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

            daysType: [
                {text: '2021년', active: false},
                {text: '2020년', active: false}
            ],
            houeType: [
                {text: '미분양 (호)', active: true},
                {text: '변동률', active: false}
            ],
            monthType: [
                {text: '1월', active: false},
                {text: '2월', active: false},
                {text: '3월', active: false},
                {text: '4월', active: false},
                {text: '5월', active: true},
                {text: '6월', active: false},
                {text: '7월', active: false},
                {text: '8월', active: false},
                {text: '9월', active: false},
                {text: '10월', active: false},
                {text: '11월', active: false},
                {text: '12월', active: false}
            ],
            selectYear: false,
            houselayer: false,
            selectmonth: false,
            year: '2020년',
            house: '미분양 (호)',
            month: '7월'
        };
    },
    created() {
        this.winwidth = window.innerWidth;
        this.winheight = window.innerHeight;
    },
    mounted() {
        window.addEventListener('resize', this.handleResize);
        this.handleResize();
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

        //년월 셀렉 오픈
        DayLayerOpen(parms) {
            this[parms] === true ? this[parms] = false : this[parms] = true;
        },
        //년월선택
        Dayselect(idx, arr, parms) {
            this[arr].forEach((item, index) => {
                if (index === idx && arr === 'daysType') {
                    item.active = true;
                    this.year = item.text;
                } else if (index === idx && arr === 'monthType') {
                    item.active = true;
                    this.month = item.text;
                }
                else {
                    item.active = false;
                }
                return item;
            });
            this.DayLayerOpen(parms);
        },
        //가구선택
        houseSelect(idx, arr, parms) {
            console.log(idx, arr, parms);
            this[arr].forEach((item, index) => {
                if (index === idx) {
                    item.active = true;
                    this.house = item.text;
                } else {
                    item.active = false;
                }
                return item;
            });
            this.DayLayerOpen(parms);
            
        }
    }
};
</script>