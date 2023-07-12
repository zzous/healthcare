<template>
    <div class="mapContainer" :style="'height:'+ winheight+'px'">
        <div class="map household">
            <!-- 지도 상단  -->
            <div class="circlebx lightblue" style="width:90px;height:90px;top:30%;left:10%;"> <!-- 2022.03.14 퍼블 수정 / width, height 수정-->
                <strong>서울</strong>
                <span>-123만명</span>
            </div>
            <div class="circlebx red" style="width:90px;height:90px;top:30%;left:calc(10% + 100px);"><!-- 2022.03.14 퍼블 수정 / width, height 수정-->
                <strong>충북</strong>
                <span>+123만명</span>
            </div>
            <div class="circlebx red" style="width:90px;height:90px;top:calc(30% + 110px);left:calc(10% + 100px);"><!-- 2022.03.14 퍼블 수정 / 2줄처리-->
                <strong>창원시</strong>
                <strong>마산합포구</strong>
                <span>+123만명</span>
            </div>
            <!-- 지도 지역 선택 -->
            <div style="position:absolute; top:50px; left:150px; z-index:1000;">
                <div class="selectpin">
                    <div class="top">경기</div>
                    <div class="btm">
                        <span class="in">23,456명<img src="/images/common/icon_arrowin.svg"></span>
                        <span class="out">12,789명<img src="/images/common/icon_arrowout.svg"></span>
                    </div>
                </div>
                <div class="selectpin">
                    <div class="top"><span>경상북도</span>경기</div>
                    <div class="btm">
                        <span class="in">23,456명<img src="/images/common/icon_arrowin.svg"></span>
                        <span class="out">12,789명<img src="/images/common/icon_arrowout.svg"></span>
                    </div>
                </div>
                <div class="selectpin">
                    <div class="top"><span>창원시</span>마산합포구</div>
                    <div class="btm">
                        <span class="in">23,456명<img src="/images/common/icon_arrowin.svg"></span>
                        <span class="out">12,789명<img src="/images/common/icon_arrowout.svg"></span>
                    </div>
                </div>
                <div class="selectpin">
                    <div class="top sm"><span>경상북도</span>창원시 마산합포구</div>
                    <div class="btm">
                        <span class="in">23,456명<img src="/images/common/icon_arrowin.svg"></span>
                        <span class="out">12,789명<img src="/images/common/icon_arrowout.svg"></span>
                    </div>
                </div>

                <div class="areapin left">
                    <strong class="locate">서울 종로구</strong>
                    <div class="inout">
                        <span class="area in">1,123,456명</span>
                        <span class="area out">1,123,456명</span>
                    </div>
                </div>

                <div class="areapin right">
                    <div class="inout">
                        <span class="area in">1,123,456명</span>
                        <span class="area out">1,123,456명</span>
                    </div>
                    <strong class="locate">경상북도 창원시 마산합포구</strong>
                </div>

                <div class="areapin right">
                    <div class="inout">
                        <span class="area in">1,123,456명</span>
                        <span class="area out">1,123,456명</span>
                    </div>
                    <strong class="locate">강원</strong>
                </div>

                <div class="areapin right">
                    <div class="inout">
                        <span class="area out">1,123,456명</span>
                    </div>
                    <strong class="locate">충북</strong>
                </div>
                <div class="areapin right">
                    <div class="inout">
                        <span class="area in">1,123,456명</span>
                    </div>
                    <strong class="locate">충북</strong>
                </div>

                <div class="areapin left">
                    <strong class="locate">충북</strong>
                    <div class="inout">
                        <span class="area in">1,123,456명</span>
                    </div>
                </div>
                <div class="areapin left">
                    <strong class="locate">경상북도 창원시 마산합포구</strong>
                    <div class="inout">
                        <span class="area out">1,123,456명</span>
                    </div>
                </div>
                
                
                
                <br><br><br><br><br><br>


                <div class="areapin left">
                    <strong class="locate">경상북도</strong>
                    <div class="inout">
                        <span class="area in">6명</span>
                        <span class="area out">6명</span>
                    </div>
                </div>



                <div class="areapin right">
                    <div class="inout">
                        <span class="area in">6명</span>
                        <span class="area out">6명</span>
                    </div>
                    <strong class="locate">경상북도</strong>
                </div>

             
                

            </div>
            <!-- 범례보이기 -->
            <div class="legendLayer" :class="{active:openlegend}">
                <button class="btn btn-legend" @click="openLayer"><span>범례 보이기</span></button>
                <div class="legendLayercon" v-if="openlegend">
                    <div>
                       <div class="circlebx red">
                            <strong>지역</strong>
                            <span>+순 인구 이동</span>
                        </div>
                        <div class="circlebx_guide">인구 전입이 <br />많은 지역</div>
                    </div>
                    <div>
                       <div class="circlebx lightblue">
                            <strong>지역</strong>
                            <span>-순 인구 이동</span>
                        </div>
                        <div class="circlebx_guide">인구 전출이 <br />많은 지역</div>
                    </div>

                </div>
            </div>
            <div class="maptools">
                <button type="button" class="btn btn-shar">공유</button>
                <div class="groups">
                    <button type="button" class="btn btn-zoom-up">확대</button>
                    <button type="button" class="btn btn-zoom-down">축소</button>
                </div>
                <button type="button" class="btn btn-location">위치</button>
            </div>
            <NaverMaps :polyCount="polyCount" :svgCount="svgCount" :zoomLevel="7" style="width:100%; height:100%;" />
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
            openlegend: false,
            //팝업 스크롤리사이징 처리 데이터
            winwidth: null,
            winheight: null
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
        openLayer() {
            this.openlegend = !this.openlegend;
        },
        //레이어 팝업 스크롤 처리 
        handleResize(event) {
            this.winwidth = window.innerWidth;
        //지도 컨테이너 높이 처리 
            this.winwidth > 1024 ? this.winheight = window.innerHeight - 32 : this.winheight = window.innerHeight;
        }
    }
};
</script>