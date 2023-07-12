<template>
    <div class="mapContainer" :style="'height:'+ winheight+'px'">
        <div class="map people">
            <button type="button" class="btn bntmapall">전국</button>
            가구 맵차트 영역
            <div class="chartlegend type4">
                <span class="legend lgpeople1">5천 가구 미만</span>
                <span class="legend lgpeople2">5천~15만 가구</span>
                <span class="legend lgpeople3">15만~27.5만 가구</span>
                <span class="legend lgpeople4">27.5만 가구 초과</span>
            </div>

            <div class="chartlegend type4" style="margin-top:100px;position:static"> <!-- style은 개발시 삭제-->
                <span class="legend lgoneman1">5천 가구 미만</span>
                <span class="legend lgoneman2">5천~5만 가구</span>
                <span class="legend lgoneman3">5만~10만 가구명</span>
                <span class="legend lgoneman4">10만 가구 초과</span>
            </div>

            <div class="chartlegend type4" style="position:static"><!-- style은 개발시 삭제-->
                <span class="legend lgoldman1">1천 가구 미만</span>
                <span class="legend lgoldman2">1천~2.5만 가구</span>
                <span class="legend lgoldman3">2.5만~5만 가구</span>
                <span class="legend lgoldman4">5만 가구 초과</span>
            </div>


            <div class="areatooltip" style="top:calc(50% + 50px); left:200px;">
                <div class="toolbox">
                    <span class="arrow"></span>
                    <div class="txt">구리시</div>
                </div>
                <div class="numbox">1,234,765</div>
            </div>
        
            <div class="areatooltip type2" style="top:calc(50% + 130px); left:200px;">
                <div class="toolbox">
                    <span class="arrow"></span>
                    <div class="txt">구리시</div>
                </div>
                <div class="numbox">1,234,765</div>
            </div>

            <div class="areatooltip type3" style="top:calc(50% + 210px); left:200px;">
                <div class="toolbox">
                    <span class="arrow"></span>
                    <div class="txt">구리시</div>
                </div>
                <div class="numbox">1,234,765</div>
            </div>
        


            <div class="dateSelect household">
                <div class="selectbox type4">
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
                <div class="selectbox type4">
                    <span class="value txt arw" :class="{up:!selectYear, down:selectYear}" @click="DayLayerOpen('selectYear')" v-html="year"></span>
                    <div role="listbox" class="selectlist" v-if="selectYear">
                        <jQueryScrollbar :maxHeight="'141px'"> <!-- 2022.03.10 조회년도 높이 수정-->
                            <div
                                role="list"
                                :class="['item txt', {active:item.active}]"
                                v-for="(item, index) in daysType"
                                :key="index"
                                v-html="item.text"
                                @click="Dayselect(index,'daysType','selectYear')"
                            >
                            </div>
                        </jQueryScrollbar>
                    </div>
                </div>
                <div class="selectbox type4">
                    <span class="value txt arw" :class="{up:!houselayer, down:houselayer}" @click="DayLayerOpen('houselayer')" v-html="house"></span>
                    <div role="listbox" class="selectlist" v-if="houselayer">
                        <jQueryScrollbar :maxHeight="'141px'"> <!-- 2022.03.10 조회년도 높이 수정-->
                            <div
                                role="list"
                                :class="['item txt', {active:item.active}]"
                                v-for="(item, index) in houeType"
                                :key="index"
                                v-html="item.text"
                                @click="houseSelect(index,'houeType','houselayer')"
                            >
                            </div>
                        </jQueryScrollbar>
                    </div>
                </div>


                <!-- <div class="selectbox type4 ">
                    <span class="value txt check" v-html="house"  @click="DayLayerOpen('houselayer')"></span>
                    <div role="listbox" class="selectlist downlist" v-if="houselayer">
                        <template  v-for="(item, index) in houeType" >
                            <div class="item txt" role="list" :key="index" v-html="item.text" v-if="!(item.active)" @click="houseSelect(index,'houeType','houselayer')"></div>
                        </template>
                    </div>
                </div> -->
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
                {text: '2045년', active: false},
                {text: '2040년', active: false},
                {text: '2035년', active: false},
                {text: '2030년', active: true},
                {text: '2025년', active: false},
                {text: '2020년', active: false}
            ],
            houeType: [
                {text: '총 가구', active: true},
                {text: '1인가구', active: false},
                {text: '고령자 가구', active: false}
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
            house: '총 가구',
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