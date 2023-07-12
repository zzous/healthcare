<template>
    <div class="mapContainer" :style="'height:'+ winheight+'px'">
        <div class="map">
            <!-- 지도 상단  -->
            <div class="circlebx" style="width:100px;height:100px;top:10%;left:10%" @click="openDetailLayer('open')">
                인천<br>00,000 호
            </div>
            <!-- 월간선택시 -->
            <div class="dateSelect tradingSelect"> <!-- 2022.03.10 퍼블 수정 / 클래스 추가-->
                 <div class="selectbox type4">
                    <span class="value txt  arw" :class="{up:!selectMonth, down:selectMonth}" @click="DayLayerOpen('selectMonth')" v-html="month">10월</span> <!--2022.03.10 퍼블수정 -->
                    <div role="listbox" class="selectlist" v-if="selectMonth">
                        <jQueryScrollbar :maxHeight="'141px'">
                            <div
                                role="list"
                                :class="['item txt', {active:item.active}]"
                                v-for="(item, index) in daysType2"
                                :key="index"
                                v-html="item.text"
                                @click="Dayselect(index,'daysType2','selectMonth')"
                            >
                            </div>
                        </jQueryScrollbar>
                    </div>
                </div>
                <div class="selectbox type4">
                    <span class="value txt arw" :class="{up:!selectYear, down:selectYear}" @click="DayLayerOpen('selectYear')" v-html="year"></span><!--2022.03.10 퍼블수정 -->
                    <div role="listbox" class="selectlist" v-if="selectYear">
                        <!--2022.03.10 퍼블수정  / 스크롤 제거-->
                        <div
                            role="list"
                            :class="['item txt', {active:item.active}]"
                            v-for="(item, index) in daysType1"
                            :key="index"
                            v-html="item.text"
                            @click="Dayselect(index,'daysType1', 'selectYear')"
                        >
                        </div>
                    </div>
                </div>
               
            </div>
            <div class="maptools">
                <!--2022.02.07 공유버튼 삭제 -->
                <div class="groups">
                    <button type="button" class="btn btn-zoom-up">확대</button>
                    <button type="button" class="btn btn-zoom-down">축소</button>
                </div>
                <button type="button" class="btn btn-location">위치</button>
            </div>
            <NaverMaps :polyCount="polyCount" :svgCount="svgCount" :zoomLevel="7" style="width:100%; height:100%;" />
            <!-- 상세 데이터 보기 -->
            <div class="mapLayercon" v-if="OpenDetail">
                <button class="btn btn-popclose gray" title="닫기" @click="openDetailLayer('close')">닫기</button>
                <div class="detaildataCon">
                    <h1>
                        <strong class="tit">경북</strong>
                        <button type="button" class="btn btn-dataview arw right" title="상세 데이터 보기">상세 데이터 보기</button>
                    </h1>
                    <TabContent
                        :tabcontentname="'상세데이터보기'"
                        :tabsublist="'tabbox tabtype5'"
                        :tabtexts="tabtextsType1"
                        v-on:tabactive="tabClick"
                    >
                        <template slot="panel">
                            <div class="tabcon" role="tabpanel" v-if="tabnum===0">
                                <div class="layerbarchart">
                                    <Barline
                                        :barchartdata="barchartdata"
                                    />
                                </div>
                            </div>
                            <div class="tabcon" role="tabpanel" v-if="tabnum===1">
                                <div class="pi">
                                    <img src="/images/common/chart.png" alt="확인을위한 썸네일">
                                    <div class="text" style="top:19px;left:21px; position:absolute">단독주택<br>123,456호</div>
                                </div>
                            </div>
                            <div class="tabcon" role="tabpanel" v-if="tabnum===2">
                                <div class="layerbarchart">
                                    <jQueryScrollbar :maxHeight="scrollMaxH" class="layerScroll">
                                    <Barline
                                        :customerClass="'saleTypebar'"
                                        :barchartdata="barchartdata1"
                                    />
                                    </jQueryScrollbar>
                                </div>
                            </div>
                            <div class="layerbtn">
                                <button type="button" class="btn btn_location">경북 내 지역 보기</button>
                            </div>
                        </template>
                    </TabContent>
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
            tabtextsType1: ['년도별', '주택유형별', '거래규모별'],
            tabnum: 0,
            barchartdata: [
                {label: '2021', value: '123,536', bgcolor: '#339af0', data: 30},
                {label: '2020', value: '123,536', bgcolor: '#51b4ff', data: 30},
                {label: '2019', value: '123,536', bgcolor: '#74c0fc', data: 30},
                {label: '2018', value: '123,536', bgcolor: '#a5d8ff', data: 30},
                {label: '2017', value: '123,536', bgcolor: '#d0ebff', data: 30}
            ],
            barchartdata1: [
                {label: '20㎡ 이하', value: '123,536', bgcolor: '#51b4ff', data: 30},
                {label: '21~40㎡', value: '123,536', bgcolor: '#339af0', data: 30},
                {label: '41~60㎡', value: '123,536', bgcolor: '#a5d8ff', data: 30},
                {label: '61~85㎡', value: '123,536', bgcolor: '#00d0e1', data: 30},
                {label: '85~100㎡', value: '123,536', bgcolor: '#22b8cf', data: 30},
                {label: '101~135㎡ ', value: '123,536', bgcolor: '#d1afff', data: 30},
                {label: '136~165㎡', value: '123,536', bgcolor: '#9a5eee', data: 30},
                {label: '166~198㎡', value: '123,536', bgcolor: '#fcc2d7', data: 30},
                {label: '198㎡ 초과', value: '123,536', bgcolor: '#f06595', data: 30}
            ],
            // 달력
            starttime1: '2021/07',
            openPicker: false,
            toggleClass: 'down',
            num: 5,
            pickerData: [
                {year: '2020',
                    month: [
                        {text: '01',  active: false, disable: false},
                        {text: '02',  active: false, disable: false},
                        {text: '03',  active: false, disable: false},
                        {text: '04',  active: false, disable: false},
                        {text: '05',  active: false, disable: false},
                        {text: '06',  active: false, disable: false},
                        {text: '07',  active: false, disable: false},
                        {text: '08',  active: false, disable: false},
                        {text: '09',  active: false, disable: false},
                        {text: '10',  active: false, disable: false},
                        {text: '11',  active: false, disable: false},
                        {text: '12',  active: false, disable: false}
                    ]
                },
                {year: '2021',
                    month: [
                        {text: '01',  active: false, disable: false},
                        {text: '02',  active: false, disable: false},
                        {text: '03',  active: false, disable: false},
                        {text: '04',  active: false, disable: false},
                        {text: '05',  active: false, disable: false},
                        {text: '06',  active: true, disable: false},
                        {text: '07',  active: false, disable: false},
                        {text: '08',  active: false, disable: false},
                        {text: '09',  active: false, disable: false},
                        {text: '10',  active: false, disable: true},
                        {text: '11',  active: false, disable: true},
                        {text: '12',  active: false, disable: true}
                    ]
                }
            ],
            // 지도팝업 처리 데이터
            OpenDetail: false,

            //팝업 스크롤리사이징 처리 데이터
            winwidth: null,
            winheight: null,
            scrollMaxH: null,

            //월선택 셀렉트
            daysType1: [
                {text: '2021년', active: true},
                {text: '2022년', active: false}
            ],
            daysType2: [
                {text: '1월', active: false},
                {text: '2월', active: false},
                {text: '3월', active: false},
                {text: '4월', active: true},
                {text: '5월', active: false},
                {text: '6월', active: false},
                {text: '7월', active: false},
                {text: '8월', active: false}
            ],
            selectYear: false,
            selectYear1: false,
            selectMonth: false,
            year: '2021년',
            year1: '2016년',
            month: '3월'
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
        tabClick(parm, type) {
            if (type === '상세데이터보기') {
                this.tabnum = parm;
                if (parm === 2)
                    this.$nextTick(function() {
                        this.handleResize();
                    });
            }
        },
        OpenPickerLayer() {
            if (this.openPicker === true) {
                this.openPicker = false;
                this.toggleClass = 'down';
            } else {
                this.openPicker = true;
                this.toggleClass = 'up';
            }
        },
        //지도 팝업 호출
        openDetailLayer(status) {
            status === 'open' ? this.OpenDetail = true : this.OpenDetail = false;
        },
        //년월 셀렉 오픈
        DayLayerOpen(parms) {
            this[parms] === true ? this[parms] = false : this[parms] = true;
        },
        //년월선택
        Dayselect(idx, arr, parms) {
            this[arr].forEach((item, index) => {
                if (index === idx && arr === 'daysType1') {
                    item.active = true;
                    this.year = item.text;
                    this.year1 = item.text;
                } else if (index === idx && arr === 'daysType2') {
                    item.active = true;
                    this.month = item.text;
                } else {
                    item.active = false;
                }
                return item;
            });
            this.DayLayerOpen(parms);
        },
        //레이어 팝업 스크롤 처리 
        handleResize(event) {
            this.winwidth = window.innerWidth;
            //지도 컨테이너 높이 처리 
            this.winwidth > 1024 ? this.winheight = window.innerHeight - 32 : this.winheight = window.innerHeight;
            // 상세데이터 - 거래규모별  스크롤 처리 
            if (this.tabnum === 2) {
                if (this.winwidth < 768) {
                    this.scrollMaxH = 172 + 'px';
                    document.querySelector('.layerScroll .scroll-content').style.maxHeight = '172px';
                } else {
                    this.scrollMaxH = 100 + '%';
                    document.querySelector('.layerScroll .scroll-content').style.maxHeight = '100%';
                }
            }
            
            
        }
    }
};
</script>