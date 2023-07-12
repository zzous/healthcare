<template>
    <div class="aihouse">
        <button type="button" title="닫기"  @click="goToPage('/ai')"  class="btn btn-popclose">닫기</button>
        <div class="aititbox">
            <button type="button" class="btn all-filter" @click="openFilter"></button>
            <strong class="tit"><span>5,240</span>개의 AI 추정가</strong>
        </div>
        <div class="ailistwrap">
            <div class="resultTap">
                <jQueryScrollbar  :useCtrl="{direction: 'x',customClass:'typeSmall' }">
                    <div role="tablist" class="tabbox tabtype3"> <!-- buildtype 관련 클래스명 삭제 22.02.04 -->
                        <span role="button" class="tab active">단지(1600)</span>
                        <span role="button" class="tab">주택(1600)</span>
                        <span role="button" class="tab">토지/건물(1600)</span>
                        <span role="button" class="tab">지역(1600)</span>
                        <span role="button" class="tab">지하철(1600)</span>
                        <span role="button" class="tab">지하철(1600)</span>
                    </div>
                </jQueryScrollbar>
            </div>
            <div class="listbtn"> <!-- 상단 스크롤 고정 영역으로 위치 변경 22.02.04 -->
                <!-- 건물유형별 리스트 소팅항목 내용 변경 22.03.08 -->
                <button class="btn textline active">넓은면적순</button>
                <button class="btn textline">준공순</button>
                <button class="btn textline">가격순</button>
                <button class="btn textline">인기순</button>
                <!-- 단위변경 버튼 추가 22.03.08 -->
                <button type="button" :class="['btn textbtn', {on:typechange}]" title="단위변경" @click="typechange = !typechange"></button>
            </div>
            <div class="ailistCon">
                <jQueryScrollbar class="ailistConH">
                    <div class="buildlists"> <!-- 클릭한 리스트에 active 클래스 추가 22.02.04 -->
                        <div role="button" class="buildlist" v-for="(item, index) in buildLists" :key="index">
							<div class="text">
                                <div class="textname" v-html="item.name" @click="goToPage('list/detail')"></div>
								<div class="info">
									<span>{{item.total}}세대</span>
									<span>{{item.year}}</span> <!-- 준공연월 데이터 표기 방식 변경 22.03.04 -->
									<span>조회 {{item. count}}</span>
								</div>
							</div>
							<div class="price">{{item.cost}}</div>
						</div>
                    </div>
                </jQueryScrollbar>
            </div>
        </div>
        
        <!-- <div><button @click="openFilter">open filter</button></div>
        <div><button @click="goToPage('list/detail')">상세 보기</button></div> -->

    </div>
</template>
<style>


</style>
<script>
// COMPONENTS
// API
// store
export default {
    components: {
    },
    
    data() {
        return {
            buildLists: [
                {name: '가람마을10단지동양엔파트월드메가람마을10단지동양엔파트월드메', cost: '1억 7,000만', total: '11,520', year: '2012.05', count: '1,200'},
                {name: '가람마을10단지동양엔파트월드메가', cost: '1억 7,000만', total: '11,520', year: '2012.05', count: '1,200'},
                {name: '가람마을10단지동양', cost: '1억 7,000만', total: '11,520', year: '2012.05', count: '1,200'},
                {name: '가람마을10단지동양', cost: '1억 7,000만', total: '11,520', year: '2012.05', count: '1,200'},
                {name: '가람마을10단지동양엔파트월드메가람마을10단지동양엔파트월드메', cost: '1억 7,000만', total: '11,520', year: '2012.05', count: '1,200'},
                {name: '가람마을10단지동양엔파트월드메가람마을10단지동양엔파트월드메', cost: '1억 7,000만', total: '11,520', year: '2012.05', count: '1,200'},
                {name: '가람마을10단지동양엔파트월드메파트월드메', cost: '1억 7,000만', total: '11,520', year: '2012.05', count: '1,200'},
                {name: '가람마을10단지동양엔파트월드메가람마', cost: '1억 7,000만', total: '11,520', year: '2012.05', count: '1,200'},
                {name: '가람마을10단지동양엔파트월드메가람마을10단지동양엔파트월드메', cost: '1억 7,000만', total: '11,520', year: '2012.05', count: '1,200'},
                {name: '가람마을10단지동양엔파트월드메가람마을10단지동양엔파트월드메', cost: '1억 7,000만', total: '11,520', year: '2012.05', count: '1,200'},
                {name: '가람마을10단지동양엔파트월드메가', cost: '1억 7,000만', total: '11,520', year: '2012.05', count: '1,200'},
                {name: '가람마을10단지동양', cost: '1억 7,000만', total: '11,520', year: '2012.05', count: '1,200'},
                {name: '가람마을10단지동양', cost: '1억 7,000만', total: '11,520', year: '2012.05', count: '1,200'},
                {name: '가람마을10단지동양엔파트월드메가람마을10단지동양엔파트월드메', cost: '1억 7,000만', total: '11,520', year: '2012.05', count: '1,200'},
                {name: '가람마을10단지동양엔파트월드메파트월드메', cost: '1억 7,000만', total: '11,520', year: '2012.05', count: '1,200'},
                {name: '가람마을10단지동양엔파트월드메가람마', cost: '1억 7,000만', total: '11,520', year: '2012.05', count: '1,200'},
                {name: '가람마을10단지동양엔파트월드메가람마을10단지동양엔파트월드메', cost: '1억 7,000만', total: '11,520', year: '2012.05', count: '1,200'},
                {name: '가람마을10단지동양엔파트월드메가람마을10단지동양엔파트월드메', cost: '1억 7,000만', total: '11,520', year: '2012.05', count: '1,200'},
                {name: '가람마을10단지동양엔파트월드메가', cost: '1억 7,000만', total: '11,520', year: '2012.05', count: '1,200'},
                {name: '가람마을10단지동양', cost: '1억 7,000만', total: '11,520', year: '2012.05', count: '1,200'},
                {name: '가람마을10단지동양', cost: '1억 7,000만', total: '11,520', year: '2012.05', count: '1,200'}
            ],
            typechange: false
        };
    },
    methods: {
        openFilter() {
            console.log('## open filter');
            window.$eventBus.$emit('openFilter');
        },
        goDetailPage() {
            this.$router.push({
                path: '/ai/list/detail'
            });
        }
    }
};
</script>
