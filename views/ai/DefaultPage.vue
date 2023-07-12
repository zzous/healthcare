<template>
    <div class="aifullMap">
        <div class="aimapcontainer">
            <div class="toparea" :class="{openSearch:layerOpen}">
                <SearchArea @locationSelect="openLayer('locationOpenLayer')" @isSearch="openLayer('searchOpenLayer')" />
                <div class="menubox" v-if="!analysisListLayer">
                    <button type="button" class="btn btn-type buildtype1 active" @click="activeToggle($event,'active')">아파트</button>
                    <button type="button" class="btn btn-type buildtype2" @click="activeToggle($event,'active')">오피스텔</button>
                    <button type="button" class="btn btn-type buildtype3" @click="activeToggle($event,'active')">빌라</button>
                    <button type="button" class="btn btn-type buildtype4" @click="activeToggle($event,'active')">단독</button>
                    <button type="button" class="btn btn-type buildtype5" @click="activeToggle($event,'active')">다가구</button>
                    <button type="button" class="btn btn-type buildtype6" @click="activeToggle($event,'active')">토지/건물</button>
                </div>
            </div>
            <FilterArea v-if="!analysisListLayer" />
            <ToolsArea
                :analysisList ="analysisListLayer"
                @analysisOpen="openLayer('analysisListLayer')"
            />
            <!-- 분석레이어 -->
            <ToolsList
                v-if="analysisListLayer"
                @analysisClose="openLayer('analysisListLayer')"
                @analysisDetail ="openLayer('analysisDetailLayer')"
                @tabCheck="openLayer"
            />
            <!-- 가격대별 재고수 범례 추가 필요할 때 prop으로 제어하기 :analysisDetail ="analysisDetailLayer" -->
            <!-- 분석상세 -->
            <ToolsDetail
                v-if="analysisDetailLayer"
                @analysisClose="openLayer('analysisDetailLayer')"
            />
            <!-- 리스트 버튼 -->
            <button type="button" class="btn-ailist"  @click="state" v-if="!analysisListLayer || this.layerOpen === '변동'"><span>5,240</span>개의 AI 추정가</button>
            
            <!-- 네이버지도 -->
            <NaverMaps style="width:100%; height:100%;" />
            <!-- 도구 하단 마커 -->
            
             <!--AI 추정가 안내 -->
            <modal name="Aiinfo"
                class="Aiinfo"
                :clickToClose="false"
                width="100%"
                height="auto"
            >
                <div class="layer-popup">
                    <div class="layercon">
                        <button type="button" class="btn btn-popclose" title="닫기" @click="closeModal('Aiinfo')">닫기</button> <!-- 'type1'클래스 삭제 22.03.04 -->
                        <div class="inner type1">
                            <strong class="tit type2">AI 추정가 안내</strong>
                            <div class="aiinfocon">
                                <ul class="dotlist"> <!-- 클래스변경 / 텍스트수정 22.04.18 --> <!-- 태그 변경 22.03.04 -->
                                    <li>KB부동산 데이터 허브에서 제공하는 모든 정보의 무단 복제'배포는 원칙적으로 금합니다. 무단 복제 배포하는 경우에는 저작권법에 의거 <strong>법적 조치에 처해질 수 있습니다.</strong></li>
                                    <li>KB부동산 데이터 허브에서 제공하는 추정 가격은 각 제공업체에 따라 부동산 데이터를 기초로 알고리즘을 바탕으로 산출된 가격이므로 감정평가로 활용될 수 없으며, 본 추정가 정보의 활용에 따른 책임은 전적으로 이용자에게 있으며, <strong>당행은 이에 대하여 아무런 책임을 부담하지 않습니다.</strong></li>
                                </ul>
                                <div class="agreebox">
                                    <label for="agree" class="custom-checkbox custom-control">
                                        <input type="checkbox" id="agree" v-model="aicheck" @change="state">
                                        <span>동의합니다.</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </modal>

             <button @click="goToPage('/ai/detail')" style="position:absolute; right:40px; top:0; border:solid 1px #6fa3f6; background:#6fa3f6; color:#fff; padding:0">상세</button>
            <!-- 토스트 팝업 -->
            <!-- <div class="toastmsg " style="z-index: 1000; opacity: 1;">모든 필터가 초기화 되었습니다.</div>
            <div class="guidemsg">시, 군, 구 단위에서 제공하지 않는 서비스 입니다.</div> -->
            
        </div>
    </div>
</template>
<script>
import NaverMaps from '@/views/example/samples/NaverMaps1.vue';
import SearchArea from '@/components/ai/maps/SearchArea.vue';
import FilterArea from '@/components/ai/maps/FilterArea.vue';
import ToolsArea from '@/components/ai/maps/ToolsArea.vue';
import ToolsList from '@/components/ai/maps/ToolsList.vue';
import ToolsDetail from '@/components/ai/maps/ToolsDetail.vue';
export default {
    components: {
        NaverMaps,
        SearchArea,
        FilterArea,
        ToolsArea,
        ToolsList,
        ToolsDetail
    },
    data() {
        return {
            aicheck: false,
            analysisListLayer: false,
            analysisDetailLayer: false,
            locationOpenLayer: false,
            searchOpenLayer: false,
            //openSearch 클래스 변수
            layerOpen: false
        };
    },
    methods: {
        //공통 == 버튼클래스 처리 active
        activeToggle(e, classname) {
            if (e.target.classList.contains(classname) === true) {
                e.target.classList.remove(classname);
            } else {
                e.target.classList.add(classname);
            }
        },
        state() {
            if (this.aicheck === true) {
                this.closeModal('Aiinfo');
                this.goToPage('/ai/list');
            } else if (this.aicheck === false) {
                this.openModal('Aiinfo');
            }
        },
        openLayer(type) {
            this[type] = !this[type];
            this.layerOpen = type;
            if (type === 'analysisListLayer' || type === '변동' || type === '노후도') {
                this.analysisDetailLayer = false;
            }
            // else if (!(type === '가격')) {
            //     this.analysisDetailLayer = false;
            // }
        },
        tabchecked() {
            
        }
       
    }
};
</script>