<template>
    <div class="aihouse"> <!-- 상단 고정 클래스명 fixed -->
        <div class="buttonWrap">
            <template  v-if="!(this.$router.currentRoute.path === '/ai/single')">
                <button class="btn arw right btn-bigview" @click="excuteOutLink('/ai/single')">큰화면 보기</button>
                <button type="button" title="닫기" class="btn btn-popclose" @click="goToPage('/ai')" v-if="pagelist">닫기</button>
                <button type="button" title="닫기1" class="btn btn-popclose" @click="goToPage('/ai/list')" v-else>닫기</button>
            </template>
             <button class="btn arw left btn-mapview" v-else>지도로 돌아가기</button><!-- 2022.03.03 텍스트 수정-->
        </div>
        <div class="infotop">
            <div class="buttonWrap">
                <button type="button" title="평전환" aria-label="평전환" class="btn-change iconbtn type2"></button> <!-- 건물없는토지 상단 부분에 평전환 버튼 추가 22.02.15 -->
                <button type="button" class="btn btn-shar" @click="ModalLayer($event,'open','sharelayer')">공유</button>
                <!-- 찜하기 버튼 클릭하면 하단에 토스트 팝업 노출 *문구: 관심 설정이 저장되었습니다. -->
                <button type="button" title="관심부동산으로 등록" aria-label="관심부동산으로 등록" class="iconbtn btn-like"></button>
            </div>
            <div class="infobadge">
                <span class="label round darkblueline">단독주택</span>
                <div class="rulebadge mobile" :class="{active:labelactive}">
                    <button type="button" class="btn-badgeview"><span role="button" class="label rule1 arw right" @click="labelClick">투기</span></button>
                    <span class="label rule1">투기</span>
                    <span class="label rule2">투기과열</span>
                    <span class="label rule3">조정</span>
                </div>
            </div>
            <div class="infonm">
                <button type="button" class="btn btn-back arw left" title="이전페이지 보기" aria-label="이전페이지 보기" @click="goBack()"></button>
                <h1>
                    <span>단독주택</span> <!-- 단지명 말줄임표 때문에 span 태그 추가 22.02.15 -->
                    <button type="button" class="btn round btn-roadview r30">로드뷰</button>
                </h1>
            </div>
            <div class="infotxt">
                <span class="addr">서울시 송파구 가락동 41-11</span>
                 <!-- 툴팁 위치 조정으로 태그 수정 -->
                <span style="position:relative;">
                    <span role="button" class="btn-infotoggle arw up" :class="[{up:allContent},{down:!allContent}]"  @click="toggleContent('allContent')">
                        <template v-if="allContent">건물정보 숨기기</template>
                        <template v-else>건물정보 보이기</template>
                        <!-- 건물 유형이 토지건물 중 건물이 없는 토지에 해당하는 경우 -->
                        <!--
                        <template v-if="allContent">토지정보 숨기기</template>
                        <template v-else>토지정보 보이기</template>
                        -->
                    </span>
                    <div role="tooltip" class="tooltip bottom" v-if="guidetip1">
                        <span aria-hidden="true" class="arrow" style="left:47.5%"></span>
                        <div class="flexbox">
                            <p>버튼을 눌러서 건물정보를 확인하세요!</p>
                            <!-- 건물 유형이 토지건물 중 건물이 없는 토지에 해당하는 경우 -->
                            <!--
                            <p>버튼을 눌러서 토지정보를 확인하세요!</p>
                            -->
                            <button type="button" title="툴팁닫기" class="tipclose"  @click="TipToggle('guidetip1', guidetip1)"></button>
                        </div>
                    </div>
                </span>
            </div>
        </div>
        <div class="infotoggle" v-if="allContent">
            <!-- 건물정보 (토지건물 중 건물이 없는 토지에는 미노출) -->
            <section class="accordionCon">
                <h2 class="toggletit" :class="{active:moreContent}">
                    <strong class="listtit">건물정보</strong>
                    <button type="button" class="btn sm round btn-golink r30" @click="executeOutLink('https://www.gov.kr/mw/AA020InfoCappView.do?CappBizCD=15000000098&amp;HighCtgCD=A02004002&amp;Mcode=10205')">건축물대장</button>
                    <button type="button" class="arw down" title="건물정보더보기" aria-label="건물정보더보기" @click="toggleContent('moreContent')"></button>
                </h2>
                <div class="togglecont" v-if="moreContent">
                    <div class="textlists">
                        <span class="bulletlist">2018.12(4년차)</span>
                        <span class="bulletlist">9,510세대</span>
                        <span class="bulletlist">총 84개동</span>
                        <span class="bulletlist">최고 10~35층 / 지하 3층</span>
                        <span class="bulletlist">면적 61.37~194.20㎡</span>
                        <span class="bulletlist">지역난방 열병합</span>
                        <span class="bulletlist">계단식(현관구조)</span>
                        <span class="bulletlist">주차 총 11,983대(세대당 1.3대)</span>
                        <span class="bulletlist full">현대산업개발, 현대건설, 삼성물산(건설사)</span>
                        <span  class="bulletlist">건폐율 19%</span>
                        <span class="bulletlist halflast">용적율 <button type="button" class="iconbtn icoinfo4" title="자세히보기" aria-label="자세히보기" @click="tooltipOpen($event, 'open','toolTip','용적율')"></button>285%</span>
                        <span class="bulletlist">건축면적 158.69㎡</span>
                        <span class="bulletlist halflast">건축면적 158.69㎡</span>
                        <span class="bulletlist">대지면적 269㎡</span>
                        <span class="bulletlist halflast">연면적<button type="button" class="iconbtn icoinfo4" title="자세히보기" aria-label="자세히보기" @click="tooltipOpen($event, 'open', 'toolTip','연면적')"></button>158.69㎡</span>
                        <span class="bulletlist full">용도지역 제2종일반주거지역</span>
                        <span class="bulletlist full">용도지구 과밀억제권역 등…</span>
                        <div role="tooltip" class="tooltip bottom" :style="'top:'+ toolTop+'px; left:'+ toolleft+'px;'" v-if="toolTip">
                            <span aria-hidden="true" class="arrow" style="left:calc(50% - 5px);"></span>
                            <div class="flexbox">
                                <p>{{tipcontent}}</p>
                                <button type="button" title="툴팁닫기" class="tipclose" @click="tooltipOpen($event,'close', 'toolTip')"></button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <!-- 층별정보 (토지건물 중 건물이 없는 토지에는 미노출) -->
            <section class="accordionCon">
                <h2 class="toggletit" :class="{active:moreContent1}">
                    <strong class="listtit">층별정보</strong>
                    <button type="button" class="arw down" title="건물정보더보기" aria-label="건물정보더보기" @click="toggleContent('moreContent1')"></button>
                </h2>
                <div class="togglecont" v-if="moreContent1">
                    <div class="tablegroup type2">
                        <div class="line header">
                            <div class="cell">층별</div>
                            <div class="cell">용도</div>
                            <div class="cell">면적</div>
                            <div class="cell">구조</div>
                        </div>
                        <div class="line">
                            <div class="cell">15층</div>
                            <div class="cell">오피스텔</div>
                            <div class="cell">191.73㎡</div>
                            <div class="cell">철근콘크리트구조</div>
                        </div>
                        <div class="line">
                            <div class="cell">14층</div>
                            <div class="cell">오피스텔</div>
                            <div class="cell">191.73㎡</div>
                            <div class="cell">철근콘크리트구조</div>
                        </div>
                        <div class="line">
                            <div class="cell">13층</div>
                            <div class="cell">오피스텔</div>
                            <div class="cell">191.73㎡</div>
                            <div class="cell">철근콘크리트구조</div>
                        </div>
                        <div class="line">
                            <div class="cell">12층</div>
                            <div class="cell">의원</div>
                            <div class="cell">191.73㎡</div>
                            <div class="cell">철근콘크리트구조</div>
                        </div>
                        <div class="line">
                            <div class="cell">1층</div>
                            <div class="cell">의원</div>
                            <div class="cell">191.73㎡</div>
                            <div class="cell">철근콘크리트구조</div>
                        </div>
                        <div class="line">
                            <div class="cell">지하 1층</div>
                            <div class="cell">기타일반업무시설</div>
                            <div class="cell">191.73㎡</div>
                            <div class="cell">철근콘크리트구조</div>
                        </div>
                        <div class="line">
                            <div class="cell">지하 1층</div>
                            <div class="cell">기타일반업무시설</div>
                            <div class="cell">191.73㎡</div>
                            <div class="cell">철근콘크리트구조</div>
                        </div>
                        <div class="line">
                            <div class="cell">지하 1층</div>
                            <div class="cell">기타일반업무시설</div>
                            <div class="cell">191.73㎡</div>
                            <div class="cell">철근콘크리트구조</div>
                        </div>
                    </div>
                </div>
            </section>
            <!-- 토지정보 (토지건물 중 건물이 없는 토지에 해당하는 정보는 토지정보만 노출 -->
            <section class="accordionCon">
                <h2 class="toggletit" :class="{active:moreContent2}">
                    <strong class="listtit">토지정보</strong>
                    <button type="button" class="btn sm round btn-golink r30" @click="executeOutLink('https://www.gov.kr/main?a=AA020InfoCappViewApp&amp;HighCtgCD=A09005&amp;CappBizCD=13100000026&amp;tp_seq=03')">토지대장</button>
                    <button type="button" class="btn sm round btn-golink r30">토지이용계획</button>
                    <button type="button" class="arw down" title="건물정보더보기" aria-label="건물정보더보기"  @click="toggleContent('moreContent2')"></button>
                </h2>
                <div class="togglecont" v-if="moreContent2">
                    <div class="textlists">
                        <span class="bulletlist">지목 대</span>
                        <span class="bulletlist">고저 평지</span>
                        <span class="bulletlist">형상 세로장방</span>
                        <span class="bulletlist">도로조건 광대소각</span>
                        <span class="bulletlist full">용도지역 2종일반주거지역</span>
                        <span class="bulletlist full">용도지구 과밀억제권역, 상대보호구역</span>
                    </div>
                </div>
            </section>
        </div>
        <!-- 건물이 없는 토지는 글로벌 가격 탭 미노출 -->
        <TabContent
            :tabcontentname="'가격별'"
            :tabsublist="'tabbox tabtype6 submenu'"
            :tabtexts="tabtextsType"
            v-on:tabactive="tabClick"
        > <!-- 클래스명에 submenu 추가 22.02.04 -->

            <template slot="tabsubtnArea"> <!-- 평전환 버튼 추가 22.02.04 -->
                <button type="button" title="평전환" aria-label="평전환" class="btn-change iconbtn type2"></button>
            </template>

            <template slot="panel">
                <!-- 3.3㎡당가 || ㎡당가 -->
                <div class="tabcon"  role="tabpanel" v-if="tabnum===0||tabnum===1">
                    <!-- AI 추정가 -->
                    <div class="cardbox">
                        <div class="cardtit">
                            <h1 class="titdepth2">AI 추정가</h1>
                            <!-- AI 추정가 툴팁버튼, 툴팁내용 추가 22.04.07 -->
                            <button type="button" class="btn-tooltip type3" title="툴팁보기" aria-label="툴팁보기" @click="TipToggle('guidetip4',guidetip4)"></button>
                            <div role="tooltip" name="prevalueGuide" class="tooltip bottom" v-if="guidetip4">
                                <span aria-hidden="true" class="arrow"></span>
                                <div class="flexbox"> <!-- 텍스트 수정 22.04.18 -->
                                    <p>・총액 = 토지가격 + 건물가격<br>
                                    ・토지가격 = 건물을 제외한 가격<br>
                                    ・건물가격 = 토지를 제외한 가격<br>
                                    ・면적당토지가 = 총액 / 대지면적<br>
                                    ・면적당건물가 = 총액 / 연면적</p>
                                    <button type="button" title="툴팁닫기" class="tipclose"  @click="TipToggle('guidetip4', guidetip4)"></button>
                                </div>
                            </div>
                            <div class="titRighttext">기준일 2021.10.01</div>
                        </div>
                        <!-- 디자인 수정으로 마크업 변경 22.04.07 -->
                        <div class="colorbox type2">
                            <div class="box companytype3">
                                <div>
                                    <span class="company">밸류쇼핑</span>
                                    <button type="button" class="gradebtn" title="등급정보" @click="TipToggle('guidetip3',guidetip3)">1등급</button> <!-- 등급정보 버튼 추가 22.03.24 -->
                                    <div role="tooltip" name="gradeGuide" class="tooltip bottom" v-if="guidetip3">
                                        <span aria-hidden="true" class="arrow"></span>
                                        <div class="flexbox">
                                            <p>밸류쇼핑의 단독, 다가구, 토지, 일반건물
                                                추정가는 가격산정의 토대가 되는 유사사례의
                                                적합성에 따라 1등급(신뢰도 좋음),
                                                2등급(신뢰도 약함)으로 구분됩니다. </p>
                                            <button type="button" title="툴팁닫기" class="tipclose"  @click="TipToggle('guidetip3', guidetip3)"></button>
                                        </div>
                                    </div>
                                </div>
                                <div class="valuenum">
                                    <span class="txt">
                                        <span>면적당토지가</span><strong class="num">226.7억</strong><em>/3.3㎡</em>
                                    </span>
                                    <span class="txt">
                                        <span>면적당건물가</span><strong class="num">226.7억</strong><em>/3.3㎡</em>
                                    </span>
                                </div>
                            </div>
                            <!-- AI 추정가 데이터가 없을 때 -->
                            <!-- <div class="box none">AI 추정가를 제공하지 않습니다.</div> -->
                        </div>
                        <p class="guideinfo icoinfo1">
                            AI추정가는 부동산 빅데이터를 기초로 알고리즘 기반에 따른 산출된 가격이며 감정평가금액은 아닙니다.
                            <button type="button" class="txtview" @click="ModalLayer($event,'open','introlayer')">자세히</button>
                        </p>
                    </div>
                    <!-- AI 추정가 시계열 -->
                    <div class="cardbox">
                        <div class="cardtit">
							<h2 class="titdepth2">AI 추정가 시계열</h2>
							<div class="titRighttext"><button type="button" title="차트옵션메뉴" class="iconbtn btn-dotmore black"></button></div>
						</div>
                        <div class="aibtnbox">
							<span role="button" class="tab line active">라인</span>
							<span role="button" class="tab bar">막대</span>
						</div>
                        
                        <div class="sortbar">
                            <label for="halfyear" class="custom-radio custom-control">
                                <input type="radio" name="time" id="halfyear" checked="">
                                <span>6개월</span>
                            </label>
                            <label for="oneyear" class="custom-radio custom-control">
                                <input type="radio" name="time" id="oneyear">
                                <span>1년</span>
                            </label>
                            <label for="all" class="custom-radio custom-control">
                                <input type="radio" name="time" id="all">
                                <span>전체</span>
                            </label>
                        </div>
                        <!-- 건물유형이 건물이 없는 토지일 때  -->
                        <!-- <div class="roundbtnbox">
                            <span role="tab" class="tab active">총액</span>
                            <span role="tab" class="tab">3.3㎡당가</span>
                            <span role="tab" class="tab">㎡당가</span>
                        </div>
                        <div class="sortbar">
                            <label for="halfyear" class="custom-radio custom-control">
                                <input type="radio" name="time" id="halfyear" checked="">
                                <span>6개월</span>
                            </label>
                            <label for="oneyear" class="custom-radio custom-control">
                                <input type="radio" name="time" id="oneyear">
                                <span>1년</span>
                            </label>
                            <label for="all" class="custom-radio custom-control">
                                <input type="radio" name="time" id="all">
                                <span>전체</span>
                            </label>
                        </div> -->
                       
                        <!-- 시계열 차트 영역 -->
                        <div class="chartArea" >
                            <!-- 라인그래프일때 -->
                            <div class="checkedlegend">
                                <button class="btn-check timetype2 active">면적당토지가</button>
                                <button class="btn-check timetype3 active">면적당건물가</button>
                            </div>
                            <!-- 막대그래프일때 -->
                            <!--
                            <div class="chartlegend square">
                                <span class="legend timetype2">토지당가</span>
                                <span class="legend timetype3">건물당가</span>
                            </div>
                            -->
                            <span class="watermark horizongray"></span>
                            <!-- 시계열 차트 박스 -->
                            <div class="chartBox" style="height:274px;position:relative">
                                <div class="chartTip aitip" style="left:0; top:0">
                                    <div class="tiptit">
                                        <span>21.06</span>
                                        <span class="change dataend">
                                            <span>21.08 (3개월)</span>
                                        </span>
                                    </div>
                                    <div class="lineboxtable">
                                        <div class="linebox">
                                            <div class="now">
                                                <span class="legendlist timetype2">면적당토지가</span>
                                                <strong>25.6억</strong>
                                            </div>
                                        </div>
                                        <div class="linebox">
                                            <div class="now">
                                                <span class="legendlist timetype3">면적당건물가</span>
                                                <strong>25.6억</strong>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="chartTip aitip draggable" style="margin-left:150px;">
                                    <div class="tiptit">
                                        <span>21.06</span>
                                        <span class="change dataend">
                                            <span>21.08 (3개월)</span>
                                        </span>
                                    </div>
                                    <div class="lineboxtable">
                                        <div class="linebox">
                                            <div class="now">
                                                <span class="legendlist timetype2">면적당토지가</span>
                                                <strong>26.6억</strong>
                                            </div>
                                            <div class="change">
                                                <strong>20.2억</strong>
                                                <span class="numdown">- 4.4억(3.4%)</span>
                                            </div>
                                        </div>
                                        <div class="linebox">
                                            <div class="now">
                                                <span class="legendlist timetype3">면적당건물가</span>
                                                <strong>26.6억</strong>
                                            </div>
                                            <div class="change">
                                                <strong>20.2억</strong>
                                                <span class="numup">+ 4.4억(3.4%)</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <!-- 시계열 차트 데이터가 없을 때 -->
                                <div class="nodata aichart">AI 추정가를 제공하지 않습니다.</div>
                            </div>

                        </div>
                        <!-- 테이블 영역 -->
                        <div class="tradingtable aihouse type1">
                            <div class="tablelabel">
                                <span>구분</span>
                                <span>밸류쇼핑</span>
                            </div>
                            <div class="tablelabel">
                                <span>가격구분</span>
                                <span>면적당토지가</span>
                                <span>면적당건물가</span>
                            </div>
                            <jQueryScrollbar  style="width:100%;">
                                <div class="scrollin-pir">
                                    <div class="tablelbody">
                                        <div class="tablelow">
                                            <span class="day" v-for="(day, index) in tradingdays1" :key="index"  v-html="day.day" :class="{selected:index == 3}"></span>
                                        </div>
                                        <div class="tablelow"  v-for="(item, index) in tradingdatas3" :key="index">
                                            <span class="datavalue" v-for="(data, index) in item.data" :key="index" v-html="data.value"  :class="{selected:index == 3}"></span>
                                        </div>
                                    </div>
                                </div>
                            </jQueryScrollbar>
                        </div>
                        <p class="guideinfo icoinfo1">
							AI 추정가 및 미래 가격은 업체에서 제공하는 자료로 본 자료 활용에 대한 책임(투자판단 등)은 전적으로 이용자에게 있으며 당행은 이와 관련하여
							아무런 책임을 부담하지 않습니다.
						</p>
                    </div>
                    <!-- 실거래 매매 -->
                    <div class="cardbox">
                        <div class="cardtit">
                            <h1 class="titdepth2">실거래 지역 사례</h1>
                            <!-- 건물 유형이 토지건물 중 건물이 없는 토지에 해당하는 경우에는 툴팁 아이콘 노출 X -->
                            <button type="button" class="btn-tooltip type3" title="툴팁보기" aria-label="툴팁보기" @click="TipToggle('guidetip2',guidetip2)"></button>
                            <div role="tooltip" name="tradecase" class="tooltip bottom" v-if="guidetip2"> <!-- 22.03.23 name 속성 추가 -->
                                <span aria-hidden="true" class="arrow" style="left:47.5%"></span>
                                <div class="flexbox"><!-- 건물유형 단독주택 텍스트수정 22.04.18 -->
                                    <p>실거래량은 단독, 다가구를 합산한 것입니다.</p>
                                    <!-- 건물 유형이 토지건물 중 건물이 있는 토지에 해당하는 경우 -->
                                    <!-- <p>건물 실거래량은 상업, 업무용을 합산한 것입니다. </p> -->
                                    <button type="button" title="툴팁닫기" class="tipclose"  @click="TipToggle('guidetip2', guidetip2)"></button>
                                </div>
                            </div>

                            <div class="titRighttext center block"> <!-- 기간선택 라디오 버튼 추가 22.03.04 -->
                                <label for="halfyear3" class="custom-radio custom-control">
                                    <input type="radio" name="time3" id="halfyear3" checked="">
                                    <span>6개월</span>
                                </label>
                                <label for="oneyear3" class="custom-radio custom-control">
                                    <input type="radio" name="time3" id="oneyear3">
                                    <span>1년</span>
                                </label>
                                <label for="all3" class="custom-radio custom-control">
                                    <input type="radio" name="time3" id="all3">
                                    <span>전체</span>
                                </label>
                            </div>
                        </div>
                        <div class="salebox">
                            <!-- 차트 영역 삽입 -->
                            <div class="innerbox">
                                <div class="chartlegend square type2">
                                    <span class="legend dash">송파구 거래량</span>
                                    <span class="legend realtype1">가락동 거래량</span>
                                </div>
                                <!-- 그래프 삽입 -->
                                <div style="height:240px; background:#fafafa;">
                                    <span class="watermark horizongray"></span>
                                </div>
                            </div>
                            <!-- 테이블 영역 -->
                            <div class="innerbox">
                                <div class="textbox">
                                    <span>출처:국토교통부</span>
                                </div>
                                <jQueryScrollbar  style="width:100%;">
                                    <div class="tablegroup type1 landtrade">
                                        <div class="line header">
                                            <div class="cell">계약일</div>
                                            <div class="cell">도로명</div>
                                            <div class="cell">연면적<br>대지면적</div>
                                            <div class="cell">실거래가</div>
                                            <div class="cell">면적당토지가<br>면적당건물가</div>
                                        </div>
                                        <div class="line" v-for="(item, index) in tradingdatas5" :key="index">
                                            <div class="cell" v-html="item.days"></div>
                                            <div class="cell">
                                                <span class="ellipsis" v-html="item.road"></span>
                                            </div>
                                            <div class="cell">
                                                <span v-html="item.area.floor"></span>
                                                <span v-html="item.area.land"></span>
                                            </div>
                                            <div class="cell" v-html="item.trade"></div>
                                            <div class="cell">
                                                <span v-html="item.price.land"></span>
                                                <span v-html="item.price.build"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- 건물유형중 건물이 없는 토지인 경우 -->
                                    <!-- <div class="tablegroup type1 landtrade">
                                        <div class="line header">
                                            <div class="cell">계약일</div>
                                            <div class="cell">도로명</div>
                                            <div class="cell">연면적</div>
                                            <div class="cell">대지면적</div>
                                            <div class="cell">실거래가</div>
                                        </div>
                                        <div class="line" v-for="(item, index) in tradingdatas5" :key="index">
                                            <div class="cell" v-html="item.days"></div>
                                            <div class="cell">
                                                <span class="ellipsis" v-html="item.road"></span>
                                            </div>
                                            <div class="cell" v-html="item.area.floor"></div>
                                            <div class="cell" v-html="item.area.land"></div>
                                            <div class="cell" v-html="item.trade"></div>
                                        </div>
                                    </div> -->
                                </jQueryScrollbar>
                                <div class="paging type1">
                                    <span role="button" class="arw left" title="이전페이지" aria-label="이전페이지"></span>
                                    <span class="num now">1</span>
                                    <span class="num all">3</span>
                                    <span role="button" class="arw right" title="다음페이지" aria-label="다음페이지"></span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!--  인근 거래 사례 -->
                    <div class="cardbox">
                        <div class="cardtit">
                            <h1 class="titdepth2">인근 거래 사례</h1>
                        </div>
                        <div class="chartArea">
                            <div class="checkedlegend type2">
                                <button class="btn-check casetype1 active">헬리오시티</button>
                                <button class="btn-check casetype2 active">인근 거래 사례</button>
                                <div class="sortbar noline">
                                    <label for="threemonth" class="custom-radio custom-control">
                                        <input type="radio" name="time2" id="threemonth">
                                        <span>3개월</span>
                                    </label>
                                    <label for="halfyear2" class="custom-radio custom-control">
                                        <input type="radio" name="time2" id="halfyear2" checked="">
                                        <span>6개월</span>
                                    </label>
                                    <label for="oneyear2" class="custom-radio custom-control">
                                        <input type="radio" name="time2" id="oneyear2">
                                        <span>1년</span>
                                    </label>
                                </div>
                            </div>
                            <!-- 범위 슬라이더 영역-->
                            <div class="rangebox">
                                <RangeSlider
                                    v-model="datavalue"
                                    :marks="true"
                                    :data="rangedata"
                                />
                            </div>
                            <div class="unittextbox">
                                <span>단위: 만원/3.3㎡</span>
                            </div>
                            <!-- 차트 영역 -->
                            <div class="chartWrap">
                                <div class="chartTip aitip webmobile" style="left:50%; top:0">
                                    <div class="tiptit between">
                                        <span>21.06</span>
                                        <button type="button" class="btn-find" @click="toggleContent('tipinfoView')">위치</button>
                                    </div>
                                    <div class="linebox">
                                        <span class="legendlist nocolor ellipsis">한양아파트</span>
                                        <strong>6,514만</strong>
                                    </div>
                                    <div class="chartTipinfo location" v-if="tipinfoView" style="left:calc(50% - 164px); bottom:100%;">
                                        <button type="button" class="btn btn-popclose" title="닫기" @click="toggleContent('tipinfoView')">닫기</button>
                                        <img src="/images/samples/location_ex.png" alt="">
                                    </div>
                                </div>
                                <div class="chartview" style="height:280px; background:#fafafa;">
                                
                                </div>
                                <div class="ttb-rangebox">
                                    <div class="unittextbox">
                                        <span>(준공년도)</span>
                                    </div>
                                    <RangeSlider
                                        v-model="datavalue2"
                                        direction="ttb"
                                        :style="`height: 160px;`"
                                        :marks="true"
                                        :data="rangedata2"
                                    />
                                </div>
                            </div>
                            
                            <div class="aitableWrap">
                                <div class="listbtngroup">
                                    <span class="allnum">총 <em>120</em>건</span>
                                    <div class="listbtn type1">
                                        <button type="button" class="btn textline active">최신순</button>
                                        <button type="button" class="btn textline">가격높은순</button>
                                        <button type="button" class="btn textline">가격낮은순</button>
                                    </div>
                                </div>
                                <!-- 인근거래사례 차트 호버 클릭시 노출 -->
                                <div class="filterctrl">
                                    <button type="button" class="btn-all arw left">전체보기</button>
                                    <button type="button" class="btn btn-popclose" title="닫기">닫기</button>
                                </div>
                                <!-- 테이블 영역 -->
                                <jQueryScrollbar  style="width:100%;">
                                    <div class="tablegroup type1 realtrade2"> <!-- 인근거래사례 차트 호버 및 클릭시 active 클래스 추가 -->
                                        <div class="line header">
                                            <div class="cell">계약일</div>
                                            <div class="cell">단지명</div>
                                            <div class="cell">공급/전용</div>
                                            <div class="cell">실거래가/3.3㎡</div>
                                            <div class="cell">준공년도</div>
                                            <div class="cell">직선거리</div>
                                        </div>
                                        <div class="line" v-for="(item, index) in tradingdatas6" :key="index">
                                            <div class="cell" v-html="item.days"></div>
                                            <div class="cell">
                                                <span class="buildnm ellipsis" v-html="item.name"></span>
                                            </div>
                                            <div class="cell costcell">
                                                <span v-html="item.area.supply"></span>
                                                <span v-html="item.area.land"></span>
                                            </div>
                                            <div class="cell costcell">
                                                <span v-html="item.price.trade"></span>
                                                <span v-html="item.price.unit"></span>
                                            </div>
                                            <div class="cell" v-html="item.year"></div>
                                            <div class="cell" v-html="item.distance"></div>
                                        </div>
                                    </div>
                                </jQueryScrollbar>
                                <div class="paging type1">
                                    <span role="button" class="arw left" title="이전페이지" aria-label="이전페이지"></span>
                                    <span class="num now">1</span>
                                    <span class="num all">3</span>
                                    <span role="button" class="arw right" title="다음페이지" aria-label="다음페이지"></span>
                                </div>
                                <div class="unittextbox right">
                                    <span>출처:국토교통부</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- 지역별 AI 추정가 비교 -->
                    <div class="cardbox">
                        <div class="cardtit">
                            <h1 class="titdepth2">지역별 AI 추정가 비교</h1>
                        </div>
                        <div class="chartArea">
                            <div class="chartlegend region type2">
                                <span class="legend"><i>단</i>단독주택</span>
                                <span class="legend"><i>가</i>가락동</span>
                                <span class="legend"><i>송</i>송파구</span>
                                <div class="sortbar noline">
                                    <label for="landprice" class="custom-radio custom-control">
                                        <input type="radio" name="price" id="landprice" checked="">
                                        <span>면적당토지가</span>
                                    </label>
                                    <label for="buildprice" class="custom-radio custom-control">
                                        <input type="radio" name="price" id="buildprice">
                                        <span>면적당건물가</span>
                                    </label>
                                </div>
                                <span class="textlabel">단위: 만원/3.3㎡</span>
                            </div>
                            <div class="chartview" style="height:250px; background:#fafafa;">
                                <span class="watermark horizongray"></span>
                            </div>
                        </div>
                    </div>
                    <!-- 공시가격 및 보유세 -->
                    <div class="cardbox">
                        <div class="cardtit">
                            <h1 class="titdepth2">공시가격 및 보유세</h1>
                            <!-- 툴팁 버튼 추가 22.04.20 -->
                            <button type="button" class="btn-tooltip type3" title="툴팁보기" aria-label="툴팁보기" @click="tooltipOpen($event,'open','toolTip1')"></button>
                            <div class="cardbtnwrap"> <!-- 링크 버튼 추가 22.02.04 -->
                                <button type="button" class="btn btn-link arw right">공시가격</button>
                            </div>

                            <!-- 공시가격 및 보유세 툴팁 내용 추가 22.04.20 -->
                            <div role="tooltip" name="publicPrice" class="tooltip bottom" v-if="toolTip1">
                                <span aria-hidden="true" class="arrow"></span>
                                <div class="flexbox">
                                    <p>
                                        이 집 한 채만 보유 가정 시 <span class="colortype-ffec99">예상 세금</span>을 알려드려요!<br>
                                        1주택, 연령 60대 이하, 보유기간 4년, 소유지분 100%, 거주주택 가정<br>
                                        공시가격 정보가 없는 경우 보유세 예시정보 제공이 어렵습니다.<br>
                                        KB부동산 세금계산기에서 직접 계산해보세요.
                                    </p>
                                    <button type="button" title="툴팁닫기" class="tipclose" @click="tooltipOpen($event,'close','toolTip1')"></button>
                                </div>
                            </div>
                        </div>
                        <div class="unittextbox between">
                            <span>공시기준일: 2021.01.01</span>
                            <span>
                                <!-- 라벨명 KB부동산 세금계산기 변경 및 클릭 이벤트 모달 레이어 추가 22.04.20 -->
                                <button class="btn btn-dataguide arw right" @click="ModalLayer($event,'open','kblandApplayer')">KB부동산 세금계산기</button>
                            </span>
                        </div>
                        <div class="tablegroup type1 public">
                            <div class="line header">
                                <div class="cell">기준년도</div>
                                <div class="cell">개별 단독주택 공시가격</div>
                                <div class="cell">재산세
                                    <!-- 툴팁 삭제 22.04.20 -->
                                    <!-- <button type="button" class="btn-info icoinfo5" title="자세히보기" aria-label="자세히보기" @click="tooltipOpen($event,'open', 'toolTip4')" style="vertical-align:middle;"></button> -->
                                </div>
                                <div class="cell">종부세</div>
                            </div>
                            <div class="line">
                                <div class="cell">2021</div>
                                <div class="cell">11억 4,100만</div>
                                <div class="cell">349만</div>
                                <div class="cell">16만</div>
                            </div>
                            <div class="line">
                                <div class="cell">2020</div>
                                <div class="cell">10억 7,800만</div>
                                <div class="cell">305만</div>
                                <div class="cell">-</div>
                            </div>
                            <div class="line">
                                <div class="cell">2019</div>
                                <div class="cell">9억 5,200만</div>
                                <div class="cell">280만</div>
                                <div class="cell">-</div>
                            </div>
                            <div class="line">
                                <div class="cell">2018</div>
                                <div class="cell">8억 7,800만</div>
                                <div class="cell">251만</div>
                                <div class="cell">-</div>
                            </div>
                            <div class="line">
                                <div class="cell">2017</div>
                                <div class="cell">7억 5,200만</div>
                                <div class="cell">204만</div>
                                <div class="cell">-</div>
                            </div>
                            <button class="btn-viewmore arw down">더보기</button>
                            <!-- 재산세 툴팁 삭제 22.04.20 -->
                            <!-- <div role="tooltip" class="tooltip bottom" :style="'top:'+(toolTop-10)+'px; left:'+(toolleft-40)+'px;'" v-if="toolTip4">
                                <span aria-hidden="true" class="arrow" style="left:calc(50% - 5px);"></span>
                                <div class="flexbox">
                                    <p>
                                        동일면적 최대 공시가격,<br>
                                        1세대 주택, 보유자분 100%. 60세 이하, 거주주택.<br>
                                        보유기간 5년 미만 가정 (종합부동산세 상동)
                                    </p>
                                    <button type="button" title="툴팁닫기" class="tipclose" @click="tooltipOpen($event,'close','toolTip4')"></button>
                                </div>
                            </div> -->
                        </div>
                    </div>
                    <!-- 토지 가격 변동 -->
                    <div class="cardbox">
                        <div class="cardtit">
							<h2 class="titdepth2">토지 가격 변동</h2>
                            <!-- 하단 주석의 차트옵션 더보기 버튼 삭제 22.03.04 -->
							<!-- <div class="titRighttext"><button type="button" title="차트옵션메뉴" class="iconbtn btn-dotmore black"></button></div> -->
                            <!-- 하단 링크이동 버튼 추가 22.03.04 -->
                            <div class="titRighttext center"><button class="btn btn-dataguide arw right">토지 가격 변동과 거래량</button></div>
                        </div>
                        <div class="chartArea">
                            <div class="chartlegend type2">
                                <span class="legend line-e74980">송파구 전체</span> <!-- 범례명 변경 22.03.04 -->
                                <span class="legend linedarkblue">송파구 주거</span> <!-- 범례명 변경 22.03.04 -->
                            </div>
                            <div class="unittextbox between">
                                <span>지가지수</span> <!-- 범례명 변경 22.03.04 -->
                                <span>변동률(%, 전월대비)</span>
                            </div>
                            <div class="chartview" style="height: 200px; background: rgb(250, 250, 250);">
                                <span class="watermark horizongray"></span>
                            </div>
                        </div>
                        <div class="textbox">
                            <!-- <span role="button" class="btn-statistics">토지 가격 변동과 거래량 이동</span> 링크이동 버튼 삭제(상단 타이틀 영역으로 위치변경됨) 22.03.04 -->
                            <span role="button" class="btn-statistics">출처 : 국가통계 포털</span> <!-- 'iconsource' 클래스 삭제 22.03.04 -->
                        </div>
                    </div>
                    <!--  전출입 -->
                    <div class="cardbox">
                        <div class="cardtit">
                            <h1 class="titdepth2">{{movingTop5.location}} 전출입</h1>
                            <div class="titRighttext"><button class="btn btn-dataguide arw right">인구통계</button></div>
                        </div>
                        <div class="moveinChartBox">
                            <div class="unittextbox right">
                                <span>단위: 명</span>
                            </div>
                            <jQueryScrollbar :useCtrl="{direction: 'x',customClass:'typeBig'}" >
                                <div class="movingChart">
                                    <div class="centerBox">
                                        <strong class="tit">송파구</strong>
                                        <div class="center" v-for="(item, index) in movingTotal" :key="index">
                                            <div class="cell">
                                                <span v-html="item.label"></span>
                                                <strong v-html="item.count"></strong>
                                                <span class="percent" :class="{plus:item.rate.type}">(<em v-html="item.rate.num"></em>%)</span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div class="movingline" v-for="(item, index) in movingTop5[0].locationMoving" :key="index">
                                        <div class="movingin boxgroup">
                                            <strong class="tit" v-if="index===0">{{movingTop5[0].location}}로 이사 온 TOP5</strong>
                                            <div class="cell">
                                                <div class="cellbg"><em v-html="index+1"></em>위 <em v-html="item.movingin.loaction"></em></div>
                                                <strong class="num" v-html="item.movingin.num"></strong>
                                            </div>
                                        </div>
                                        <div class="movingout boxgroup">
                                            <strong class="tit" v-if="index===0">송파구에서 이사 간 TOP5</strong>
                                            <div class="cell">
                                                <div class="cellbg"><em v-html="index+1"></em>위 <em v-html="item.movingout.loaction"></em></div>
                                                <strong class="num" v-html="item.movingout.num"></strong>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </jQueryScrollbar>
                            <div class="unittextbox between">
                                <span>
                                    <em>기준: 2021년 8월</em>
                                    <em>(%): 전월 대비 증감률</em>
                                </span>
                                <span>출처: 통계청</span>
                            </div>
                        </div>
                    </div>
                    <!--  매물정보 -->
                    <div class="cardbox">
                        <div class="cardtit">
                            <h1 class="titdepth2">가락동 매물정보</h1>
                            <div class="titRighttext">
                                <button class="btn btn-dataguide arw right">KB부동산</button>
                            </div>
                        </div>
                        <div class="listgroup">
                            <div class="mainnum">
								<div class="item">
									<span>매매</span>
									<strong>133건</strong>
								</div>
								<div class="item">
									<span>전세</span>
									<strong>133건</strong>
								</div>
								<div class="item">
									<span>월세</span>
									<strong>71건</strong>
								</div>
							</div>
                        </div>
                    </div>
                </div>

                <!-- 총액 -->
                <div class="tabcon"  role="tabpanel" v-if="tabnum===2">
                    <!-- AI 추정가 -->
                    <div class="cardbox">
                        <div class="cardtit">
                            <h1 class="titdepth2">AI 추정가</h1>
                            <!-- AI 추정가 툴팁버튼, 툴팁내용 추가 22.04.07 -->
                            <button type="button" class="btn-tooltip type3" title="툴팁보기" aria-label="툴팁보기" @click="TipToggle('guidetip4',guidetip4)"></button>
                            <div role="tooltip" name="prevalueGuide" class="tooltip bottom" v-if="guidetip4">
                                <span aria-hidden="true" class="arrow"></span>
                                <div class="flexbox">
                                    <p>・총액 = 토지가격 + 건물가격<br>
                                    ・토지가격 = 건물을 제외한 가격<br>
                                    ・건물가격 = 토지를 제외한 가격<br>
                                    ・면적당토지가 = (토지가격 + 건물가격) / 대지면적<br>
                                    ・면적당건물가 = (토지가격 + 건물가격) / 연면적</p>
                                    <button type="button" title="툴팁닫기" class="tipclose"  @click="TipToggle('guidetip4', guidetip4)"></button>
                                </div>
                            </div>
                            <div class="titRighttext">기준일 2021.10.01</div>
                        </div>
                        <!-- 디자인 수정으로 마크업 변경 22.04.07 -->
                        <div class="colorbox type2">
                            <div class="box companytype3">
                                <div>
                                    <span class="company">밸류쇼핑</span>
                                    <button type="button" class="gradebtn" title="등급정보" @click="TipToggle('guidetip3',guidetip3)">1등급</button>
                                    <div role="tooltip" name="gradeGuide" class="tooltip bottom" v-if="guidetip3">
                                        <span aria-hidden="true" class="arrow"></span>
                                        <div class="flexbox">
                                            <p>밸류쇼핑의 단독, 다가구, 토지, 일반건물
                                                추정가는 가격산정의 토대가 되는 유사사례의
                                                적합성에 따라 1등급(신뢰도 좋음),
                                                2등급(신뢰도 약함)으로 구분됩니다. </p>
                                            <button type="button" title="툴팁닫기" class="tipclose"  @click="TipToggle('guidetip3', guidetip3)"></button>
                                        </div>
                                    </div>
                                </div>
                                <div class="valuenum">
                                    <span class="txt">총액 <strong class="num">6220.7억</strong></span>
                                    <div>
                                        <span class="txt">토지가격 4020.2억</span>
                                        <span class="txt">건물가격 2200.5억</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <p class="guideinfo icoinfo1">
                            AI추정가는 부동산 빅데이터를 기초로 알고리즘 기반에 따른 산출된 가격이며 감정평가금액은 아닙니다.
                            <button type="button" class="txtview">자세히</button>
                        </p>
                    </div>
                    <!-- AI 추정가 시계열 -->
                    <div class="cardbox">
                        <div class="cardtit">
							<h2 class="titdepth2">AI 추정가 시계열</h2>
							<div class="titRighttext"><button type="button" title="차트옵션메뉴" class="iconbtn btn-dotmore black"></button></div>
						</div>
                        <div class="aibtnbox">
							<span role="button" class="tab line active">라인</span>
							<span role="button" class="tab bar">막대</span>
						</div>
                        <div class="sortbar">
							<label for="halfyear1" class="custom-radio custom-control">
								<input type="radio" name="time1" id="halfyear1" checked="">
								<span>6개월</span>
							</label>
							<label for="oneyear1" class="custom-radio custom-control">
								<input type="radio" name="time1" id="oneyear1">
								<span>1년</span>
							</label>
							<label for="all1" class="custom-radio custom-control">
								<input type="radio" name="time1" id="all1">
								<span>전체</span>
							</label>
						</div>
                        <!-- 시계열 차트 영역 -->
                        <div class="chartArea" >
                            <!-- 라인그래프일때 -->
                            <div class="checkedlegend">
                                <button class="btn-check timetype1 active">총액</button>
                                <button class="btn-check timetype2 active">토지가격</button>
                                <button class="btn-check timetype3 active">건물가격</button>
                            </div>
                            <!-- 막대그래프일때 -->
                            <!--
                            <div class="chartlegend square">
                                <span class="legend timetype2">토지가격</span>
                                <span class="legend timetype3">건물가격</span>
                            </div>
                            -->
                            <span class="watermark horizongray"></span>
                            <!-- 시계열 차트 박스 -->
                            <div class="chartBox" style="height:274px;position:relative">

                                <div class="chartTip aitip" style="left:0; top:0">
                                    <div class="tiptit">
                                        <span>21.06</span>
                                        <span class="change dataend">
                                            <span>21.08 (3개월)</span>
                                        </span>
                                    </div>
                                    <div class="lineboxtable">
                                        <div class="linebox">
                                            <div class="now">
                                                <span class="legendlist timetype1">총액</span>
                                                <strong>7,226.6억</strong>
                                            </div>
                                            <!-- 막대그래프일때 총액 컬러 없음 -->
                                            <!--
                                            <div class="now">
                                                <span class="legendlist nocolor">총액</span>
                                                <strong>7,226.6억</strong>
                                            </div>
                                            -->
                                            <div class="change">
                                                <strong>6,820.2억</strong>
                                                <span class="numdown">- 406.4억(3.4%)</span>
                                            </div>
                                        </div>
                                        <div class="linebox">
                                            <div class="now">
                                                <span class="legendlist timetype2">토지가격</span>
                                                <strong>7,226.6억</strong>
                                            </div>
                                            <div class="change">
                                                <strong>6,820.2억</strong>
                                                <span class="numup">+ 406.4억(3.4%)</span>
                                            </div>
                                        </div>
                                        <div class="linebox">
                                            <div class="now">
                                                <span class="legendlist timetype3">건물가격</span>
                                                <strong>7,226.6억</strong>
                                            </div>
                                            <div class="change">
                                                <strong>6,820.2억</strong>
                                                <span class="numdown">- 406.4억(3.4%)</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="chartTip aitip draggable" style="margin-left:150px;">
                                    <div class="tiptit">
                                        <span>21.06</span>
                                        <span class="change dataend">
                                            <span>21.08 (3개월)</span>
                                        </span>
                                    </div>
                                    <div class="lineboxtable">
                                        <div class="linebox">
                                            <div class="now">
                                                <span class="legendlist timetype1">총액</span>
                                                <strong>7,226.6억</strong>
                                            </div>
                                            <!-- 막대그래프일때 총액 컬러 없음 -->
                                            <!--
                                            <div class="now">
                                                <span class="legendlist nocolor">총액</span>
                                                <strong>7,226.6억</strong>
                                            </div>
                                            -->
                                            <div class="change">
                                                <strong>6,820.2억</strong>
                                                <span class="numdown">- 406.4억(3.4%)</span>
                                            </div>
                                        </div>
                                        <div class="linebox">
                                            <div class="now">
                                                <span class="legendlist timetype2">토지가격</span>
                                                <strong>7,226.6억</strong>
                                            </div>
                                            <div class="change">
                                                <strong>6,820.2억</strong>
                                                <span class="numup">+ 406.4억(3.4%)</span>
                                            </div>
                                        </div>
                                        <div class="linebox">
                                            <div class="now">
                                                <span class="legendlist timetype3">건물가격</span>
                                                <strong>7,226.6억</strong>
                                            </div>
                                            <div class="change">
                                                <strong>6,820.2억</strong>
                                                <span class="numdown">- 406.4억(3.4%)</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <!-- 테이블 영역 -->
                        <div class="tradingtable aihouse type1">
                            <div class="tablelabel">
                                <span>구분</span>
                                <span>밸류쇼핑</span>
                            </div>
                            <div class="tablelabel" style="width:60px">
                                <span>가격구분</span>
                                <span>총액</span>
                                <span>토지가격</span>
                                <span>건물가격</span>
                            </div>
                            <jQueryScrollbar  style="width:100%;">
                                <div class="scrollin-pir">
                                    <div class="tablelbody">
                                        <div class="tablelow">
                                            <span class="day" v-for="(day, index) in tradingdays1" :key="index"  v-html="day.day" :class="{selected:index == 3}"></span>
                                        </div>
                                        <div class="tablelow"  v-for="(item, index) in tradingdatas4" :key="index">
                                            <span class="datavalue" v-for="(data, index) in item.data" :key="index" v-html="data.value"  :class="{selected:index == 3}"></span>
                                        </div>
                                    </div>
                                </div>
                            </jQueryScrollbar>
                        </div>
                        <p class="guideinfo icoinfo1">
							AI 추정가 및 미래 가격은 업체에서 제공하는 자료로 본 자료 활용에 대한 책임(투자판단 등)은 전적으로 이용자에게 있으며 당행은 이와 관련하여
							아무런 책임을 부담하지 않습니다.
						</p>
                    </div>
                    <!-- 실거래 매매 -->
                    <div class="cardbox">
                        <div class="cardtit">
                            <h1 class="titdepth2">실거래 지역 사례</h1>
                            <!-- 건물 유형이 토지건물 중 건물이 없는 토지에 해당하는 경우에는 툴팁 아이콘 노출 X -->
                            <button type="button" class="btn-tooltip type3" title="툴팁보기" aria-label="툴팁보기" @click="TipToggle('guidetip2',guidetip2)"></button>
                            <div role="tooltip" class="tooltip bottom" v-if="guidetip2" style="top:42px; left:64px;">
                                <span aria-hidden="true" class="arrow" style="left:47.5%"></span>
                                <div class="flexbox">
                                    <p>실거래량은 단독/다가구를 집계한 것입니다.</p>
                                    <!-- 건물 유형이 토지건물 중 건물이 있는 토지에 해당하는 경우 -->
                                    <!-- <p>건물 실거래량은 상업/업무용을 집계한 것입니다.</p> -->
                                    <button type="button" title="툴팁닫기" class="tipclose"  @click="TipToggle('guidetip2', guidetip2)"></button>
                                </div>
                            </div>

                            <div class="titRighttext center block"> <!-- 기간선택 라디오 버튼 추가 22.03.04 -->
                                <label for="halfyear3" class="custom-radio custom-control">
                                    <input type="radio" name="time3" id="halfyear3" checked="">
                                    <span>6개월</span>
                                </label>
                                <label for="oneyear3" class="custom-radio custom-control">
                                    <input type="radio" name="time3" id="oneyear3">
                                    <span>1년</span>
                                </label>
                                <label for="all3" class="custom-radio custom-control">
                                    <input type="radio" name="time3" id="all3">
                                    <span>전체</span>
                                </label>
                            </div>
                        </div>
                        <!-- 차트 영역 삽입 -->
                            <div class="innerbox">
                                <div class="chartlegend square type2">
                                    <span class="legend dash">송파구 거래량</span>
                                    <span class="legend realtype1">가락동 거래량</span>
                                </div>
                                <!-- 그래프 삽입 -->
                                <div style="height:240px; background:#fafafa;">
                                    <span class="watermark horizongray"></span>
                                </div>
                            </div>
                            <!-- 테이블 영역 -->
                            <div class="innerbox">
                                <div class="textbox">
                                    <span>출처:국토교통부</span>
                                </div>
                                <jQueryScrollbar  style="width:100%;">
                                    <div class="tablegroup type1 landtrade">
                                        <div class="line header">
                                            <div class="cell">계약일</div>
                                            <div class="cell">도로명</div>
                                            <div class="cell">연면적</div>
                                            <div class="cell">대지면적</div>
                                            <div class="cell">실거래가</div>
                                        </div>
                                        <div class="line" v-for="(item, index) in tradingdatas5" :key="index">
                                            <div class="cell" v-html="item.days"></div>
                                            <div class="cell">
                                                <span class="ellipsis" v-html="item.road"></span>
                                            </div>
                                            <div class="cell" v-html="item.area.floor"></div>
                                            <div class="cell" v-html="item.area.land"></div>
                                            <div class="cell" v-html="item.trade"></div>
                                        </div>
                                    </div>
                                </jQueryScrollbar>
                                <div class="paging type1">
                                    <span role="button" class="arw left" title="이전페이지" aria-label="이전페이지"></span>
                                    <span class="num now">1</span>
                                    <span class="num all">3</span>
                                    <span role="button" class="arw right" title="다음페이지" aria-label="다음페이지"></span>
                                </div>
                            </div>
                    </div>
                    <div class="cardbox">
                        <div class="cardtit">
                            <h1 class="titdepth2">인근 거래 사례</h1>
                        </div>
                        <div class="chartArea">
                            <div class="checkedlegend type2">
                                <button class="btn-check casetype1 active">헬리오시티</button>
                                <button class="btn-check casetype2 active">인근 거래 사례</button>
                                <div class="sortbar noline">
                                    <label for="threemonth" class="custom-radio custom-control">
                                        <input type="radio" name="time2" id="threemonth">
                                        <span>3개월</span>
                                    </label>
                                    <label for="halfyear2" class="custom-radio custom-control">
                                        <input type="radio" name="time2" id="halfyear2" checked="">
                                        <span>6개월</span>
                                    </label>
                                    <label for="oneyear2" class="custom-radio custom-control">
                                        <input type="radio" name="time2" id="oneyear2">
                                        <span>1년</span>
                                    </label>
                                </div>
                            </div>
                            <!-- 범위 슬라이더 영역-->
                            <div class="rangebox">
                                <RangeSlider
                                    v-model="datavalue"
                                    :marks="true"
                                    :data="rangedata"
                                />
                            </div>
                            <div class="unittextbox">
                                <span>단위: 만원/3.3㎡</span>
                            </div>
                            <!-- 차트 영역 -->
                            <div class="chartWrap">
                                <div class="chartTip aitip" style="left:50%; top:0">
                                    <div class="tiptit between">
                                        <span>21.06</span>
                                        <button type="button" class="btn-find" @click="toggleContent('tipinfoView')">위치</button>
                                    </div>
                                    <div class="linebox">
                                        <span class="legendlist nocolor ellipsis">한양아파트</span>
                                        <strong>6,514만</strong>
                                    </div>
                                    <div class="chartTipinfo location" v-if="tipinfoView" style="left:calc(50% - 164px); bottom:100%;">
                                        <button type="button" class="btn btn-popclose" title="닫기" @click="toggleContent('tipinfoView')">닫기</button>
                                        <img src="/images/samples/location_ex.png" alt="">
                                    </div>
                                </div>
                                <div class="chartview" style="height:280px; background:#fafafa;">
                                
                                </div>
                                <div class="ttb-rangebox">
                                    <div class="unittextbox">
                                        <span>(준공년도)</span>
                                    </div>
                                    <RangeSlider
                                        v-model="datavalue2"
                                        direction="ttb"
                                        :style="`height: 160px;`"
                                        :marks="true"
                                        :data="rangedata2"
                                    />
                                </div>
                            </div>
                            
                            <div class="aitableWrap">
                                <div class="listbtngroup">
                                    <span class="allnum">총 <em>120</em>건</span>
                                    <div class="listbtn type1">
                                        <button type="button" class="btn textline active">최신순</button>
                                        <button type="button" class="btn textline">가격높은순</button>
                                        <button type="button" class="btn textline">가격낮은순</button>
                                    </div>
                                </div>
                                <!-- 인근거래사례 차트 호버 클릭시 노출 -->
                                <div class="filterctrl">
                                    <button type="button" class="btn-all arw left">전체보기</button>
                                    <button type="button" class="btn btn-popclose" title="닫기">닫기</button>
                                </div>
                                <!-- 테이블 영역 -->
                                <jQueryScrollbar  style="width:100%;">
                                    <div class="tablegroup type1 realtrade2">
                                        <div class="line header">
                                            <div class="cell">계약일</div>
                                            <div class="cell">단지명</div>
                                            <div class="cell">공급/전용</div>
                                            <div class="cell">실거래가/3.3㎡</div>
                                            <div class="cell">준공년도</div>
                                            <div class="cell">직선거리</div>
                                        </div>
                                        <div class="line" v-for="(item, index) in tradingdatas6" :key="index">
                                            <div class="cell" v-html="item.days"></div>
                                            <div class="cell">
                                                <span class="buildnm ellipsis" v-html="item.name"></span>
                                            </div>
                                            <div class="cell costcell">
                                                <span v-html="item.area.supply"></span>
                                                <span v-html="item.area.land"></span>
                                            </div>
                                            <div class="cell costcell">
                                                <span v-html="item.price.trade"></span>
                                                <span v-html="item.price.unit"></span>
                                            </div>
                                            <div class="cell" v-html="item.year"></div>
                                            <div class="cell" v-html="item.distance"></div>
                                        </div>
                                    </div>
                                </jQueryScrollbar>
                                <div class="paging type1">
                                    <span role="button" class="arw left" title="이전페이지" aria-label="이전페이지"></span>
                                    <span class="num now">1</span>
                                    <span class="num all">3</span>
                                    <span role="button" class="arw right" title="다음페이지" aria-label="다음페이지"></span>
                                </div>
                                <div class="unittextbox right">
                                    <span>출처:국토교통부</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- 지역별 AI 추정가 비교 -->
                    <div class="cardbox">
                        <div class="cardtit">
                            <h1 class="titdepth2">지역별 AI 추정가 비교</h1>
                        </div>
                        <div class="chartArea">
                            <div class="chartlegend region type2">
                                <span class="legend"><i>단</i>단독주택</span>
                                <span class="legend"><i>가</i>가락동</span>
                                <span class="legend"><i>송</i>송파구</span>
                                <div class="sortbar noline">
                                    <label for="landprice" class="custom-radio custom-control">
                                        <input type="radio" name="price" id="landprice" checked="">
                                        <span>면적당 토지가</span> <!-- 텍스트 변경 22.03.04 -->
                                    </label>
                                    <label for="buildprice" class="custom-radio custom-control">
                                        <input type="radio" name="price" id="buildprice">
                                        <span>면적당 건물가</span> <!-- 텍스트 변경 22.03.04 -->
                                    </label>
                                </div>
                                <span class="textlabel">단위: 만원/3.3㎡</span>
                            </div>
                            <div class="chartview" style="height:250px; background:#fafafa;">
                                <span class="watermark horizongray"></span>
                            </div>
                        </div>
                    </div>
                    <!-- 공시가격 및 보유세 -->
                    <div class="cardbox">
                        <div class="cardtit">
                            <h1 class="titdepth2">공시가격 및 보유세</h1>
                             <!-- 툴팁 버튼 추가 22.04.20 -->
                            <button type="button" class="btn-tooltip type3" title="툴팁보기" aria-label="툴팁보기" @click="tooltipOpen($event,'open','toolTip1')"></button>
                            <!-- 공시가격 및 보유세 툴팁 내용 추가 22.04.20 -->
                            <div role="tooltip" name="publicPrice" class="tooltip bottom" v-if="toolTip1">
                                <span aria-hidden="true" class="arrow"></span>
                                <div class="flexbox">
                                    <p>
                                        이 집 한 채만 보유 가정 시 <span class="colortype-ffec99">예상 세금</span>을 알려드려요!<br>
                                        1주택, 연령 60대 이하, 보유기간 4년, 소유지분 100%, 거주주택 가정<br>
                                        공시가격 정보가 없는 경우 보유세 예시정보 제공이 어렵습니다.<br>
                                        KB부동산 세금계산기에서 직접 계산해보세요.
                                    </p>
                                    <button type="button" title="툴팁닫기" class="tipclose" @click="tooltipOpen($event,'close','toolTip1')"></button>
                                </div>
                            </div>
                        </div>
                        <div class="unittextbox between">
                            <span>공시기준일: 2021.01.01</span>
                            <span>
                                <!-- 라벨명 KB부동산 세금계산기 변경 및 클릭 이벤트 모달 레이어 추가 22.04.20 -->
                                <button class="btn btn-dataguide arw right" @click="ModalLayer($event,'open','kblandApplayer')">KB부동산 세금계산기</button>
                            </span>
                        </div>
                        <div class="tablegroup type1 public">
                            <div class="line header">
                                <div class="cell">기준년도</div>
                                <div class="cell">개별 단독주택 공시가격</div>
                                <div class="cell">재산세</div>
                                <div class="cell">종부세</div>
                            </div>
                            <div class="line">
                                <div class="cell">2021</div>
                                <div class="cell">11억 4,100만</div>
                                <div class="cell">349만</div>
                                <div class="cell">16만</div>
                            </div>
                            <div class="line">
                                <div class="cell">2020</div>
                                <div class="cell">10억 7,800만</div>
                                <div class="cell">305만</div>
                                <div class="cell">-</div>
                            </div>
                            <div class="line">
                                <div class="cell">2019</div>
                                <div class="cell">9억 5,200만</div>
                                <div class="cell">280만</div>
                                <div class="cell">-</div>
                            </div>
                            <div class="line">
                                <div class="cell">2018</div>
                                <div class="cell">8억 7,800만</div>
                                <div class="cell">251만</div>
                                <div class="cell">-</div>
                            </div>
                            <div class="line">
                                <div class="cell">2017</div>
                                <div class="cell">7억 5,200만</div>
                                <div class="cell">204만</div>
                                <div class="cell">-</div>
                            </div>
                            <button class="btn-viewmore arw down">더보기</button>
                        </div>
                    </div>
                    <!-- 토지 가격 변동 -->
                    <div class="cardbox">
                        <div class="cardtit">
							<h2 class="titdepth2">토지 가격 변동</h2>
                            <!-- 하단 주석의 차트옵션 더보기 버튼 삭제 22.03.04 -->
							<!-- <div class="titRighttext"><button type="button" title="차트옵션메뉴" class="iconbtn btn-dotmore black"></button></div> -->
                            <!-- 하단 링크이동 버튼 태그 추가 22.03.04 -->
                            <div class="titRighttext center"><button class="btn btn-dataguide arw right">토지 가격 변동과 거래량 이동</button></div>
                        </div>
                        <div class="chartArea">
                            <div class="chartlegend type2">
                                <span class="legend line-e74980">송파구 전체</span> <!-- 범례명 변경 22.03.04 -->
                                <span class="legend linedarkblue">송파구 주거</span> <!-- 범례명 변경 22.03.04 -->
                            </div>
                            <div class="unittextbox between">
                                <span>지가지수</span> <!-- 범례명 변경 22.03.04 -->
                                <span>변동률(%, 전월대비)</span>
                            </div>
                            <div class="chartview" style="height: 200px; background: rgb(250, 250, 250);">
                                <span class="watermark horizongray"></span>
                            </div>
                        </div>
                        <div class="textbox">
                            <!-- <span role="button" class="btn-statistics">토지 가격 변동과 거래량 이동</span> 링크이동 버튼 삭제(상단 타이틀 영역으로 위치변경됨) 22.03.04 -->
                            <span role="button" class="btn-statistics">출처 : 국가통계 포털</span> <!-- 'iconsource' 클래스 삭제 22.03.04 -->
                        </div>
                    </div>
                    <!--  전출입 -->
                    <div class="cardbox">
                        <div class="cardtit">
                            <h1 class="titdepth2">{{movingTop5.location}} 전출입</h1>
                            <div class="titRighttext"><button class="btn btn-dataguide arw right">인구통계 이동</button></div>
                        </div>
                        <div class="moveinChartBox">
                            <div class="unittextbox right">
                                <span>단위: 명</span>
                            </div>
                            <jQueryScrollbar :useCtrl="{direction: 'x',customClass:'typeBig'}" >
                                <div class="movingChart">
                                    <div class="centerBox">
                                        <strong class="tit">송파구</strong>
                                        <div class="center" v-for="(item, index) in movingTotal" :key="index">
                                            <div class="cell">
                                                <span v-html="item.label"></span>
                                                <strong v-html="item.count"></strong>
                                                <span class="percent" :class="{plus:item.rate.type}">(<em v-html="item.rate.num"></em>%)</span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div class="movingline" v-for="(item, index) in movingTop5[0].locationMoving" :key="index">
                                        <div class="movingin boxgroup">
                                            <strong class="tit" v-if="index===0">{{movingTop5[0].location}}로 이사 온 TOP5</strong>
                                            <div class="cell">
                                                <div class="cellbg"><em v-html="index+1"></em>위 <em v-html="item.movingin.loaction"></em></div>
                                                <strong class="num" v-html="item.movingin.num"></strong>
                                            </div>
                                        </div>
                                        <div class="movingout boxgroup">
                                            <strong class="tit" v-if="index===0">송파구에서 이사 간 TOP5</strong>
                                            <div class="cell">
                                                <div class="cellbg"><em v-html="index+1"></em>위 <em v-html="item.movingout.loaction"></em></div>
                                                <strong class="num" v-html="item.movingout.num"></strong>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </jQueryScrollbar>
                            <div class="unittextbox between">
                                <span>
                                    <em>기준: 2021년 8월</em>
                                    <em>(%): 전월 대비 증감률</em>
                                </span>
                                <span>출처: 통계청</span>
                            </div>
                        </div>
                    </div>
                    <!--  매물정보 -->
                    <div class="cardbox">
                        <div class="cardtit">
                            <h1 class="titdepth2">가락동 매물정보</h1>
                            <div class="titRighttext">
                                <button class="btn btn-dataguide arw right">KB부동산 이동</button>
                            </div>
                        </div>
                        <div class="listgroup">
                            <div class="mainnum">
								<div class="item">
									<span>매매</span>
									<strong>133건</strong>
								</div>
								<div class="item">
									<span>전세</span>
									<strong>133건</strong>
								</div>
								<div class="item">
									<span>월세</span>
									<strong>71건</strong>
								</div>
							</div>
                        </div>
                    </div>
                </div>
            </template>
        </TabContent>

        <!-- 공유하기 팝업 -->
        <modal name="sharelayer"
            class="sharelayer"
            :clickToClose="false"
            width="100%"
            height="auto"
        >
            <div class="layer-popup">
                <div class="layercon">
                    <button type="button" class="btn btn-popclose" title="닫기" @click="ModalLayer($event,'close','sharelayer')">닫기</button>
                    <div class="inner type1">
                        <strong class="tit type2">공유하기</strong>
                        <div class="maplayer">
                            <div class="linkbox col sns">
                                <button type="button" class="rowlistbtn kakaotalk" >카카오톡</button>
                                <button type="button" class="rowlistbtn facebook" >페이스북</button>
                                <button type="button" class="rowlistbtn twitter">트위터</button>
                                <button type="button" class="rowlistbtn linkcopy">링크 복사</button>
                            </div>
                            <p class="bgalert">URL이 자동으로 복사되었습니다.<br>원하시는 곳에 URL을 공유해보세요.</p>
                        </div>
                    </div>
                </div>
            </div>
        </modal>
        <!-- AI 추정가 소개하기 팝업 내용 추가 완료 22.02.18 -->
        <modal name="introlayer"
            class="introlayer"
            :clickToClose="false"
            width="100%"
            height="auto"
        >
            <div class="layer-popup">
                <div class="layercon">
                    <button type="button" class="btn btn-popclose" title="닫기" @click="ModalLayer($event,'close','introlayer')">닫기</button>
                    <div class="inner type1">
                        <strong class="tit type3">AI 추정가 소개</strong>
                        <jQueryScrollbar>
                            <div role="tablist" class="tabbox tabtype3">
                                <span role="button" class="tab"
                                    v-for="(tab, index) in tabtextsType1"
                                    :key="index"
                                    v-html="tab"
                                    :class="{active:index==activeNum}"
                                    :tabindex="!(index==activeNum) ? -1 : 1"
                                    @click="tabClick(index, 'AI 추정가 소개')"
                                />
                            </div>
                        </jQueryScrollbar>
                        <jQueryScrollbar>
                            <!-- KB AI 추정가 22.04.04 주석처리 -->
                            <!-- <div class="tabcon"  role="tabpanel" v-if="tabnum1===0">
                                <section class="accordionCon">
                                    <h2 class="toggletit arw down active">
                                        <strong class="listtit">Q1. AI추정가 및 회사소개</strong>
                                    </h2>
                                    <div class="togglecont">
                                        <p class="txtcon">
                                            KB AI 추정가는 KB금융그룹의 경영연구소와 국내유명 산학기관과의 협업을 통해
                                             아파트 실거래가와 가격에 영향을 줄 수 있는 여러 변수들을 고려하여 개발된
                                              자동가격산정시스템(AVM, Automated Valuation Model)모델입니다.
                                        </p>
                                    </div>
                                </section>
                                <section class="accordionCon">
                                    <h2 class="toggletit arw down">
                                        <strong class="listtit">Q2. 산출방식</strong>
                                    </h2>
                                    <div class="togglecont">
                                        <p class="txtcon">KB AI 추정가를 산출하는 모델의 변수는 크게 4가지로 구성되어 있습니다.</p>
                                        <ol class="txtlist">
                                            <li>1. 실거래가격 이력과 주변 단지들의 비교매매사례 정보</li>
                                            <li>2. 아파트 고유의 특성 변수</li>
                                            <li>3. 해당 아파트 단지로부터의 여러 주변 시설과의 거리 변수</li>
                                            <li>4. 각 시기별 부동산 거래량과 유동인구 변수</li>
                                        </ol>
                                        <p class="txtcon">실거래가격에는 대상물의 거래 간격과 층수, 계약일, 연식 등이 포함되어 있으며, 아파트 주변 시설은 전철역, 상권, 공원, 학교, 병원, 문화시설 등입니다.</p>
                                        <p class="txtcon">KB아파트 통계지수를 활용하여 유사 가격권의 현재 아파트 가격을 산정할 때 현재 시점으로 가격을 전환하는 Momentum(모멘텀)방식으로 정확도를 높이는 학습 방법을 이용하였습니다.</p>
                                    </div>
                                </section>
                                <section class="accordionCon">
                                    <h2 class="toggletit arw down">
                                        <strong class="listtit">Q3. 적용모델 및 신뢰도</strong>
                                    </h2>
                                    <div class="togglecont">
                                        <p class="txtcon">머신러닝 모델로는 LightGBM과 XGBoost모델을 사용하였으며, 딥러닝 모델로 CNN(Convolution Neural Network)를 활용하였습니다.</p>
                                        <p class="txtcon">
                                            추정된 결과에 대한 정확도 평가 결과는 MAPE(Mean Absolute Pecentage Error)상 지역과 모델에 따라서
                                             최소 4.98에서 최대 7.72로 준수한 정확도를 보이고 있습니다.
                                        </p>
                                    </div>
                                </section>
                                <section class="accordionCon">
                                    <h2 class="toggletit arw down">
                                        <strong class="listtit">Q4. 주의사항</strong>
                                    </h2>
                                    <div class="togglecont">
                                        <strong class="txtcon">법적한계안내</strong>
                                        <p class="txtcon">
                                            본 추정가는  "감정평가 및 감정평가사에관한법률"에 따른 <strong>감정평가가 아닙니다.</strong><br>
                                            따라서 추정가는 금융거래의 기초 자료(대출 및 신용평가 등) 및 감정평가로 활용할 수 없으며 참고 지표로만 활용하시길 권합니다.<br>
                                            참고 자료 이외 활용에 따른 이용자의 피해와 손실에 대해 <strong>당행은 아무런 책임을 지지 않습니다.</strong>
                                        </p>
                                        <strong class="txtcon">정보 정확성</strong>
                                        <p class="txtcon">
                                            기계학습으로 산출된 추정가이므로 현장의 실거래와 KB시세와 차이가 발행할 수 있습니다. <strong>공공데이터의 오류와 누락된
                                             정보는 실시간 반영되지 않습니다.</strong>
                                        </p>
                                        <strong class="txtcon">저작권</strong>
                                        <p class="txtcon">
                                            KB부동산 데이터 허브 홈페이지에서 사용되는 서비스표 등에 관한 모든 지식재산권은 KB국민은행에 있습니다.
                                             따라서 당행의 사전 허락 없이 KB부동산 데이터 허브 가격정보(추정가, KB시세)를 사용·복제·배포·방송 또는 전송하거나
                                              상업적 목적으로 활용하는 경우 <strong>저작권법, 콘텐츠산업진흥법 등 관련 법률에 의거하여 민·형사상의 책임을 부담할 수 있습니다.</strong>
                                        </p>
                                        <p class="txtcon sub">KB부동산 데이터허브 AI추정가 문의는 <span role="button" class="txtlink">네이버 포스트</span>에 댓글로 남겨주세요 </p>
                                    </div>
                                </section>
                            </div> -->
                            <!-- 하우스머치 -->
                            <div class="tabcon"  role="tabpanel" v-if="tabnum1===0">
                                <section class="accordionCon">
                                    <h2 class="toggletit arw down active">
                                        <strong class="listtit">Q1. AI추정가 및 회사소개</strong>
                                    </h2>
                                    <div class="togglecont">
                                        <p class="txtcon">
                                            하우스머치(HowsmucH)란 주택(House)의 가격(How Much)을 연상하게 하는 단어로서,
                                             (주)공감랩이 제공하는 자동가격산정시스템(AVM, Automated Valuation Model)의 상표명입니다.
                                        </p>
                                        <p class="txtcon">
                                            (주)공감랩은 KB부동산의 연립다세대주택 시세정보를 제공하는 기업이며, 금융위원회가 선정한 혁신금융서비스 및 지정대리인 서비스 기업입니다.
                                        </p>
                                        <p class="txtcon">
                                            하우스머치는 기계학습 기반의 빅데이터 처리 알고리즘을 활용하여
                                             그 동안 <strong>시세 제공이 어려웠던 전국의 주거용 집합건물 및 오피스텔을 대상으로 KB부동산데이터허브에 추정가를 제공합니다.</strong>
                                        </p>
                                    </div>
                                </section>
                                <section class="accordionCon">
                                    <h2 class="toggletit arw down">
                                        <strong class="listtit">Q2. 산출방식</strong>
                                    </h2>
                                    <div class="togglecont">
                                        <p class="txtcon">
                                            하우스머치 추정가는 건축물대장, 실거래가 등 정부에서 개방하는 다양한 부동산 빅데이터를 다층적으로 정제하고
                                             공간통계학적 머신러닝 알고리즘을 기반으로 가장 오차가 적은 값을 추정하여 가격을 제공합니다.
                                        </p>
                                        <p class="txtcon">
                                            실거래자료는 거래상황 및 신고 과정에서 다양한 이상치(Outlier)와 잡음(Noise)을 수반합니다.
                                             또한 거래가격은 단 하나의 숫자로 수렴하지 않고 높은 편차를 보이기 마련인데, 하우스머치는 인근의
                                              다양한 실거래 신고사례를 공인된 기계학습 알고리즘을 통하여 패턴분석을 수행하여 오차가 적은 가격을 산출합니다.
                                        </p>
                                        <p class="txtcon">
                                            따라서 실거래가 발생한 적이 없는 주택에 대해서도 인근의 실거래 신고 데이터를 기반으로 신뢰도 높은 추정가를 제공할 수 있습니다.
                                        </p>
                                        <p class="txtcon">KB부동산 데이터허브에 제공하는 추정가 기준은 해당 단지 내에서 각 호가 속하는 유사 면적-층 타입 별로 산출된 추정가입니다.</p>
                                    </div>
                                </section>
                                <section class="accordionCon">
                                    <h2 class="toggletit arw down">
                                        <strong class="listtit">Q3. 적용모델 및 신뢰도</strong>
                                    </h2>
                                    <div class="togglecont">
                                        <p class="txtcon">
                                            하우스머치 추정가는 사람의 주관이 배제된 공간통계학적 기계학습 연산을 바탕으로 산출되므로, 각 호마다 추정가의 신뢰도에는 차이가 존재합니다.
                                        </p>
                                        <p class="txtcon">
                                            하우스머치에서는 국내에서 유일하게 개별 호 마다 신뢰도를 4단계로 등급화하여 사용자가 직관적으로 이해하실 수 있는 별도의 심사 콘텐츠를 운영하고 있습니다.
                                        </p>
                                        <p class="txtcon">
                                            KB데이터허브에는 현재 매매 추정가 단일 정보만을 제공하고 있으며, 대상 단지의 타입별 평균 수준 등으로 제공될 수 있습니다.
                                            따라서 하우스머치에서 별도로 제공하는 호별 추정가와는 차이가 있을 수 있습니다.
                                        </p>
                                        <p class="txtcon">보다 자세한 서비스는 <span class="txtlink txtblue">하우스머치</span> 홈페이지 를 통하여 별도의 개별 호 단위의 추정가, 신뢰도, 산출근거 등 보다 다양한 콘텐츠를 확인할 수 있습니다.</p>
                                    </div>
                                </section>
                                <section class="accordionCon">
                                    <h2 class="toggletit arw down">
                                        <strong class="listtit">Q4. 주의사항</strong>
                                    </h2>
                                    <div class="togglecont">
                                        <strong class="txtcon">법적한계안내</strong>
                                        <p class="txtcon">
                                            하우스머치가 제공하는 추정가는 "감정평가 및 감정평가사에관한법률"에 따른 <strong>감정평가가 아닙니다.</strong>
                                        </p>
                                        <p class="txtcon">
                                            따라서 참고 자료의 하나로서만 활용하실 것으로 권장하며, 대출, 투자 등 다양한 이해관계를 가진 여러분의 개별적인 활용의 결과
                                             및 그에 따른 피해나 손실에 대해 <strong>일절 책임을 지지 않음을 고지</strong>합니다.
                                        </p>
                                        <strong class="txtcon">정보 정확성</strong>
                                        <p class="txtcon">
                                            정부에서 개방하는 건축물대장 전산데이터를 기반으로 작성되므로, 현황 복층, 개별 리모델링 등 공부에 반영되지 않는
                                             미신고 현황을 포함하지 않습니다. <strong>공공데이터의 오류 및 누락된 정보는 실시간 반영하지 않습니다.</strong>
                                        </p>
                                        <p class="txtcon">
                                            하우스머치 추정가는 알고리즘에 기반하여 산정되는 서비스로서, 기계가 시세를 산출하지 못하는
                                             다양한 사유(특이성이 높은 주택, 거래사례가 희소한 지역, 실거래사례의 가격편차가 큰 지역 등)로 인하여
                                              추정가를 제공하지 못하는 주택이 발생할 수 있습니다.
                                        </p>
                                        <strong class="txtcon">저작권</strong>
                                        <p class="txtcon">
                                            하우스머치가 제공하는 가격 데이터에 관한 모든 저작권, 지식재산권 등은 (주)공감랩에게 있습니다.
                                             따라서 당행과 (주)공감랩의 사전 허락 없이 데이터를 사용·복제·배포·방송 또는 전송하거나 상업적 목적으로
                                              활용하는 경우 <strong>저작권법, 콘텐츠산업진흥법 등 관련 법률에 의거하여 민·형사상의 책임을 부담할 수 있습니다.</strong>
                                        </p>
                                        <p class="txtcon">
                                            하우스머치  <span role="button" class="txtlink">www.howsmuch.com</span><br>
                                            대표전화  070-4464-8445
                                        </p>
                                    </div>
                                </section>
                            </div>
                            <!-- 밸류쇼핑 -->
                            <div class="tabcon"  role="tabpanel" v-if="tabnum1===1">
                                <section class="accordionCon">
                                    <h2 class="toggletit arw down active">
                                        <strong class="listtit">Q1. AI추정가 및 회사소개</strong>
                                    </h2>
                                    <div class="togglecont">
                                        <p class="txtcon">
                                            밸류쇼핑은 (주)감정평가법인 세종과 (주)4차혁명이 개발한 전국 부동산 자동가격산정시스템(AVM, Automated Valuation Model)입니다.
                                        </p>
                                        <p class="txtcon">(주)4차혁명은 2019년 금융위원회가 선정한 혁신금융서비스 및 지정대리인 서비스 기업입니다. </p>
                                        <p class="txtcon">
                                            밸류쇼핑은 부동산 Big Data를 부동산 가격형성요인별로 세분화 분석하여 부동산 종류에 관계없이 전국 약 5천만건의 부동산 가격을 자동으로 산정하는 AVM입니다.
                                        </p>
                                        <div class="textbox between txtcon">
                                            <strong>밸류쇼핑 부동산 가격 산정 범위</strong>
                                            <span>조사일: 2021.12</span>
                                        </div>
                                        <div class="tablegroup type3 outline">
                                            <div class="line header">
                                                <div class="cell">유형</div>
                                                <div class="cell">건수</div>
                                                <div class="cell">가격 산정 여부</div>
                                            </div>
                                            <div class="line">
                                                <div class="cell">아파트</div>
                                                <div class="cell">1,100만 호</div>
                                                <div class="cell">O</div>
                                            </div>
                                            <div class="line">
                                                <div class="cell">연립다세대</div>
                                                <div class="cell">270만 호</div>
                                                <div class="cell">O</div>
                                            </div>
                                            <div class="line">
                                                <div class="cell">단독다가구</div>
                                                <div class="cell">270만 호</div>
                                                <div class="cell">O</div>
                                            </div>
                                            <div class="line">
                                                <div class="cell">오피스텔</div>
                                                <div class="cell">100만 호</div>
                                                <div class="cell">O</div>
                                            </div>
                                            <div class="line">
                                                <div class="cell">구분상가</div>
                                                <div class="cell">160만 호</div>
                                                <div class="cell">△</div>
                                            </div>
                                            <div class="line">
                                                <div class="cell">토지건물</div>
                                                <div class="cell">3,400만 필지</div>
                                                <div class="cell">O</div>
                                            </div>
                                        </div>
                                        <p class="txtcon">
                                            부동산 빅데이터: 실거래 데이터, 경공매 사례, 밸류쇼핑 산정 약 5천만건의 매월의 시장가격, 공부정보(건축물대장, 토지대장, 공시가격 등)
                                        </p>
                                        <p class="txtcon">밸류쇼핑은 은행을 비롯한 다수의 기관에 부동산데이터 및 가격정보를 제공하고 있습니다.</p>
                                        <p class="txtcon">밸류쇼핑은 <strong>KB부동산 데이터 허브에 구분상가를 제외한 물건 유형에 대해서 추정가를 제공합니다.</strong></p>
                                    </div>
                                </section>
                                <section class="accordionCon">
                                    <h2 class="toggletit arw down">
                                        <strong class="listtit">Q2. 산출방식</strong>
                                    </h2>
                                    <div class="togglecont">
                                        <p class="txtcon">
                                            (주)4차혁명 내의 기업부설연구소(20.08.24 설립)에서 부동산 전문인력과 IT 인력이 부동산 가격산정 알고리즘을 지속적으로 개발, 검증하고 있습니다.
                                        </p>
                                        <p class="txtcon">다수의 특허를 출원하여 부동산 가격산정에 대한 2건의 특허가 등록되었으며 금융위에서 개발자금도 지원받고 있습니다.</p>
                                        <p class="txtcon">
                                            밸류쇼핑은 지번 입력만으로 부동산의 시장가격과 기본정보(면적, 용도지역, 이용상황, 사용승인일 등)와
                                             가격산정 근거를 한눈에 볼 수 있으며 지번 혹은 호별로 가격이 산정됩니다.
                                        </p>
                                        <p class="txtcon">부동산을 아래의 유형별로 산정하여 유형별 특성에 따른 자료수집 및 분석과 시장가격을 산정합니다.</p>
                                        <ul class="dashlist txtcon">
                                            <li>아파트, 연립다세대, 오피스텔, 구분상가, 토지건물(상업용, 주거용,  농업용, 기타), 단독다가구,  지식산업센터등</li>
                                            <li>(주)감정평가법인 세종이 부동산 가격 및 정보의 적정성을 지속적으로 검증하여 피드백을 반영합니다.</li>
                                        </ul>
                                    </div>
                                </section>
                                <section class="accordionCon">
                                    <h2 class="toggletit arw down">
                                        <strong class="listtit">Q3. 적용모델 및 신뢰도</strong>
                                    </h2>
                                    <div class="togglecont">
                                        <p class="txtcon">
                                            밸류쇼핑은 부동산 빅데이터인 실거래가, 경공매 사례, 밸류쇼핑이 산정한 매월의 5,000만 건의 시장가격 등을 부동산 유형별로
                                             가격형성요인(사회적, 경제적, 행정적)을 세분화하여 가격을 산정합니다.
                                        </p>
                                        <p class="txtcon">
                                            밸류쇼핑은 상기 부동산 빅데이터를 특허받은 "PNU를 활용한 부동산 유사사례 DB생성방법"과 다중회귀분석 등의
                                             통계기법을 활용하여 물적 유사성, 공간적 유사성, 시간적 유사성에 따라 분류하여 적정 사례를 적용합니다.
                                        </p>
                                        <p class="txtcon">
                                            아울러 특허등록된 "부동산 자동가격산정 방법"(등록번호: 10-22540**)에 따라 부동산 제 가격형성요인을 적용하여 시장가격을 산정합니다.
                                        </p>
                                        <p class="txtcon">
                                            매월 배치작업을 통해 산정된 약 5천만 건의 가격자료는 기존의 실거래 및 경공매 사례 등을 통해 산정된 시장가격을 검증하고
                                             가격 정밀도를 높이는데 피드백 되고 있습니다.
                                        </p>
                                        <p class="txtcon">
                                            기업부설연구소에서 개발한 부동산 유형별 가격산정 알고리즘을 기반으로 토지 및 건물과 집합건물의 호별 시장가격을 제공합니다.
                                        </p>
                                        <p class="txtcon">
                                            단독, 다가구, 토지, 일반건물 추정가는 가격산정의 토대가 되는 유사사례의 적합성(본건과의 거리 및 거래시점 등)에
                                             따라 1등급(신뢰도 좋음), 2등급(신뢰도 약함)으로 구분됩니다.
                                        </p>
                                        <p class="txtcon">
                                            밸류쇼핑의 시장가격은 시중은행권에서 사용하기 위해 6개월간 6,000건 이상 가격 신뢰도 테스트를 거쳤습니다.
                                        </p>
                                    </div>
                                </section>
                                <section class="accordionCon">
                                    <h2 class="toggletit arw down">
                                        <strong class="listtit">Q4. 주의사항</strong>
                                    </h2>
                                    <div class="togglecont">
                                        <strong class="txtcon">법적한계안내</strong>
                                        <p class="txtcon">
                                            밸류쇼핑이 제공하는 추정가는 실거래가 등으로 산정한 참고용 시장가격으로 "감정평가 및 감정평가사에관한법률"에 따른 <strong>감정평가가 아닙니다.</strong>
                                        </p>
                                        <p class="txtcon">
                                            따라서 보다 상세한 정보나 법적 의미를 갖는 감정평가를
                                             원하시는 경우 <span role="button" class="txtlink txtblue">밸류쇼핑 홈페이지</span>에 방문하셔서 정식 감정평가를 의뢰하여 주시기 바랍니다.
                                        </p>
                                        <strong class="txtcon">정보 정확성</strong>
                                        <p class="txtcon">
                                            반복적인 기계학습과정으로 산출된 추정가이므로 공부상의 상황과 실제 이용상황이 불일치하는 경우,
                                             가격 급등락 지역 등은 현장의 실거래와 밸류쇼핑의 시세와 차이가 발행할 수 있습니다.
                                              <strong>공공데이터의 오류와 누락된 정보는 실시간 반영되지 않습니다.</strong>
                                        </p>
                                        <strong class="txtcon">저작권</strong>
                                        <p class="txtcon">
                                            밸류쇼핑이 제공하는 데이터에 관한 지적재산권은 특허청에 등록된 자산으로 (주)감정평가법인 세종과
                                             (주)4차혁명에게 있습니다. 따라서 (주)감정평가법인 세종과 (주)4차혁명의 사전 허락 없이 데이터를 사용·복제·배포·방송
                                              또는 전송하거나 상업적 목적으로 활용하는 경우 <strong>저작권법, 콘텐츠산업진흥법 등 관련 법률에 의거하여 민·형사상의 책임을
                                               부담할 수 있습니다.</strong>
                                        </p>
                                        <strong class="txtcon">데이터 제공</strong>
                                        <p class="txtcon">밸류쇼핑이 산정하여 KB국민은행에 제공하는 매월 약 5,000만건의 시장가격자료 데이터를 희망하시는 경우 당사에 문의 주시기 바랍니다.</p>
                                        <p class="txtcon">
                                            밸류쇼핑 <span role="button" class="txtlink">valueshopping.land</span><br>
                                            대표전화 02-569-7373
                                        </p>
                                    </div>
                                </section>
                            </div>
                            <!-- 보스턴에임스 -->
                            <div class="tabcon"  role="tabpanel" v-if="tabnum1===2">
                                <section class="accordionCon">
                                    <h2 class="toggletit arw down active">
                                        <strong class="listtit">Q1. AI추정가 및 회사소개</strong>
                                    </h2>
                                    <div class="togglecont">
                                        <p class="txtcon">
                                            "보스턴에임스(Boston AI Management Services)는 AI 엔진 개발 전문회사로써 보스턴MIT와 샌프란시스코
                                             버클리대학의 AI Scientist들이 주축으로 설립되었습니다. 그동안 개발한 Savvystat(AI based Econometric Prediction Platform)
                                              플랫폼을 근간으로 게임, 참치수요/가격, 부동산가격예측모델을 전문적으로 개발, 현업에 적용하고 있습니다."
                                        </p>
                                        <p class="txtcon">
                                            AreaStat(증강 부동산 AI: Augmented Real Estate AI)은 시공간 모델형태의 부동산 특화 AI 솔루션으로써,
                                             머신러닝에 국가 경제 지표를 반영한 경제학적 모델링을 병합시켰습니다.
                                        </p>
                                        <p class="txtcon">
                                            한국 부동산 시장에서 중요한 상권, 역세권, 학군 등을 공간적으로 세밀하게 분석하고, 시/군/구/동 단위에서 생기는
                                             연관성 및 역학 패턴을 시간적으로 분석함으로써 파악한 부동산 실거래가 패턴을 바탕으로 부동산의 현재가치를 예측 및 평가합니다.
                                        </p>
                                    </div>
                                </section>
                                <section class="accordionCon">
                                    <h2 class="toggletit arw down">
                                        <strong class="listtit">Q2. 산출방식</strong>
                                    </h2>
                                    <div class="togglecont">
                                        <p class="txtcon">
                                            상권, 역세권, 학군 등을 시/군/구/동 단위로 시공간 분석하고 부동산의 현재 가치를 예측한 뒤,
                                             공시지가와 실거래 정보 등을 분석, 반영하여 부동산의 동, 층, 타입, 호 단위의 가격까지 평가합니다.
                                        </p>
                                        <p class="txtcon">
                                            앞서 모델 설명에 기재된 로직을 바탕으로, 거래가 뜸하게 이루어진 아파트, 거래가 아예 없는 신규 아파트,
                                             그리고 제작 예정인 아파트에 대해 가치를 측정할 수 있습니다.
                                        </p>
                                        <p class="txtcon">
                                            AreaStat에 사용되는 데이터는 크게 3가지 종류로 건축물 대장 데이터(연면적, 세대수 등),
                                             상권데이터(대중교통, 병원, 학교 등), 경제데이터(소득 및 소비수준, 물가지수 및 통화량 등)를 포함하여
                                              약 80여 가지의 변수를 활용합니다.
                                        </p>
                                        <p class="txtcon">AreaStat은 2006년부터 현재까지 약 15년간의 데이터를 학습하였습니다.</p>
                                    </div>
                                </section>
                                <section class="accordionCon">
                                    <h2 class="toggletit arw down">
                                        <strong class="listtit">Q3. 적용모델 및 신뢰도</strong>
                                    </h2>
                                    <div class="togglecont">
                                        <p class="txtcon">
                                            모델 형성에 사용된 ‘실거래가’는 국토교통부의 실거래가 데이터를 의미하며, ‘실거래 취소’가 발생한 거래들은 솔루션
                                             형성 전에 제거하였습니다. 또한 적중률 검증방법으로써 MAPE (Mean absolute percentage error) 평가 방법을 사용하여
                                              예측 정확도를 산출하였습니다. 전국적으로 평균 약 91.2%의 정확도를 보여주고 있습니다.
                                        </p>
                                        <p class="txtcon">단, 호재와 재개발 등 부동산 시장 특성상 발생하는 갑작스러운 변화의 경우 단기적(3~4주 이내)으로 반영되지 않을 수 있습니다.</p>
                                    </div>
                                </section>
                                <section class="accordionCon">
                                    <h2 class="toggletit arw down">
                                        <strong class="listtit">Q4. 주의사항</strong>
                                    </h2>
                                    <div class="togglecont">
                                        <strong class="txtcon">법적한계안내</strong>
                                        <p class="txtcon">
                                            보스턴에임스가 제공하는 추정가는 실거래가 등으로 산정한 참고용 시장가격으로
                                             "감정평가 및 감정평가사에 관한 법률"에 따른 <strong>감정평가가 아닙니다.</strong>
                                        </p>
                                        <p class="txtcon">
                                            따라서 추정가는 금융거래의 기초 자료(대출 및 신용평가 등) 및 감정평가로 활용할 수 없으며
                                             참고 지표로만 활용하시길 권합니다. <strong>참고 자료 이외 활용에 따른 이용자의 피해와 손실에 대해 당사는 아무런 책임을 지지 않습니다.</strong>
                                        </p>
                                        <strong class="txtcon">정보 정확성</strong>
                                        <p class="txtcon">
                                            인공지능으로 산출된 추정가이므로, 추정가에 대한 정확성이나 신뢰성에 대해 어떠한 보증도 하지 않습니다.
                                             현장의 실거래가와 추정가와 차이가 발생할 수 있으며 호재와 재개발 등 부동산 시장 특성상 발생하는
                                              갑작스러운 변화나 <strong>공공데이터의 오류 및 누락된 정보는 실시간 반영되지 않습니다.</strong>
                                        </p>
                                        <strong class="txtcon">저작권</strong>
                                        <p class="txtcon">
                                            KB부동산 데이터 허브 홈페이지에서 사용되는 보스턴에임스 추정가 등에 관한 모든 지식재산권은 보스턴에임스에 있습니다.
                                             따라서 당사의 사전 허락 없이 KB부동산 데이터 허브 가격정보(보스턴에임스 추정가)를
                                              사용·복제·배포·방송 또는 전송하거나 상업적 목적으로 활용하는 경우 <strong>저작권법, 콘텐츠산업진흥법 등 관련 법률에
                                               의거하여 민·형사상의 책임을 부담할 수 있습니다.</strong>
                                        </p>
                                        <p class="txtcon sub">KB부동산 데이터허브 AI추정가 문의는 <span role="button" class="txtlink">네이버 포스트</span>에 댓글로 남겨주세요</p>
                                    </div>
                                </section>
                            </div>
                        </jQueryScrollbar>
                    </div>
                </div>
            </div>
        </modal>
        <!-- KB부동산앱 유도 팝업 추가 22.04.20 -->
        <modal name="kblandApplayer"
            class="kblandApplayer"
            :clickToClose="false"
            width="100%"
            height="auto"
        >
            <div class="layer-popup">
                <div class="layercon">
                    <div class="inner">
                        <strong class="tit type4"><span>KB부동산 APP</span>에서만<br>제공하는 서비스에요!</strong>
                        <div class="appimg"></div>
                        <div class="flexbox">
                            <button type="button" class="btn-app iconplaystore" title="Play Store">Play Store</button>
                            <button type="button" class="btn-app iconappstore" title="App Store">App Store</button>
                        </div>
                        <div class="layerbtn">
                            <button type="button" class="btn md round blue" @click="ModalLayer($event,'close','kblandApplayer')">확인</button>
                        </div>
                    </div>
                </div>
            </div>
        </modal>
    </div>
</template>
<script>
import BarlineChart from '@/components/elements/BarlineChart.vue';
export default {
    components: {
        BarlineChart
    },
    data() {
        return {
            pagelist: null,
            winwidth: 0,
            // 상단영역 데이터 
            labelactive: false,
            allContent: false,
            moreContent: true,
            moreContent1: true,
            moreContent2: true,
            tipcontent: null,
            toolTip: false,
            toolTip1: false,
            toolTop: 0,
            toolleft: 0,
            guidetip1: true,
            guidetip2: false,
            guidetip3: false,
            guidetip4: false,
            //탭 콘텐츠 데이터
            tabnum: 0,
            tabtextsType: ['3.3㎡당가', '㎡당가', '총액'],
            tabnum1: 0,
            // tabtextsType1: ['KB AI 추정가', '하우스머치', '밸류쇼핑', '보스턴에임스'],
            tabtextsType1: ['하우스머치', '밸류쇼핑', '보스턴에임스'],
            //테이블 날짜
            tradingdays1: [
                {day: '21.04'},
                {day: '21.05'},
                {day: '21.06'},
                {day: '21.07'},
                {day: '21.08'},
                {day: '21.09'}
            ],
            //테이블 데이터
            tradingdatas3: [
                {
                    location: '면적당토지가',
                    data: [
                        {day: '21.04', value: '26억 6,514만'},
                        {day: '21.05', value: '26억 6,514만'},
                        {day: '21.06', value: '26억 6,514만'},
                        {day: '21.07', value: '26억 6,514만'},
                        {day: '21.08', value: '26억 6,514만'},
                        {day: '21.09', value: '26억 6,514만'}
                        
                    ]
                },
                {
                    location: '면적당건물가',
                    data: [
                        {day: '21.04', value: '26억 6,514만'},
                        {day: '21.05', value: '26억 6,514만'},
                        {day: '21.06', value: '26억 6,514만'},
                        {day: '21.07', value: '26억 6,514만'},
                        {day: '21.08', value: '26억 6,514만'},
                        {day: '21.09', value: '26억 6,514만'}
                        
                    ]
                }
            ],
            tradingdatas4: [
                {
                    location: '총액',
                    data: [
                        {day: '21.04', value: '7,226억 6,514만'},
                        {day: '21.05', value: '7,226억 6,514만'},
                        {day: '21.06', value: '7,226억 6,514만'},
                        {day: '21.07', value: '7,226억 6,514만'},
                        {day: '21.08', value: '7,226억 6,514만'},
                        {day: '21.09', value: '7,226억 6,514만'}
                        
                    ]
                },
                {
                    location: '토지가격',
                    data: [
                        {day: '21.04', value: '7,226억 6,514만'},
                        {day: '21.05', value: '7,226억 6,514만'},
                        {day: '21.06', value: '7,226억 6,514만'},
                        {day: '21.07', value: '7,226억 6,514만'},
                        {day: '21.08', value: '7,226억 6,514만'},
                        {day: '21.09', value: '7,226억 6,514만'}
                        
                    ]
                },
                {
                    location: '건물가격',
                    data: [
                        {day: '21.04', value: '7,226억 6,514만'},
                        {day: '21.05', value: '7,226억 6,514만'},
                        {day: '21.06', value: '7,226억 6,514만'},
                        {day: '21.07', value: '7,226억 6,514만'},
                        {day: '21.08', value: '7,226억 6,514만'},
                        {day: '21.09', value: '7,226억 6,514만'}
                        
                    ]
                }
            ],
            tradingdatas5: [
                {days: '21.07.01', road: '녹산산단382로14번가길 도로명주소 길때 길때!', area: {floor: '435432.12㎡', land: '181234.12㎡'}, trade: '1,480억 8,650만', price: {land: '10억 1,755만', build: '10억 1,755만'}},
                {days: '21.05.21', road: '문정로13길', area: {floor: '435432.12㎡', land: '181234.12㎡'}, trade: '1,480억 8,650만', price: {land: '10억 1,755만', build: '10억 1,755만'}},
                {days: '21.03.06', road: '오금로44가길', area: {floor: '435432.12㎡', land: '181234.12㎡'}, trade: '1,480억 8,650만', price: {land: '10억 1,755만', build: '10억 1,755만'}},
                {days: '21.03.06', road: '양재대로62길', area: {floor: '435432.12㎡', land: '181234.12㎡'}, trade: '1,480억 8,650만', price: {land: '10억 1,755만', build: '10억 1,755만'}},
                {days: '21.03.06', road: '오금로34길', area: {floor: '435432.12㎡', land: '181234.12㎡'}, trade: '1,480억 8,650만', price: {land: '10억 1,755만', build: '10억 1,755만'}}
            ],
            tradingdatas6: [
                {days: '21.07.01', name: '한양아파트', area: {supply: '61A', land: '39.10㎡'}, price: {trade: '16억 5,000만', unit: '1억 7,200만'}, year: '2020년', distance: '10m'},
                {days: '21.05.01', name: '래미안파크팰리스', area: {supply: '110D', land: '84.99㎡'}, price: {trade: '18억 2,000만', unit: '7,600만'}, year: '2019년', distance: '12m'},
                {days: '21.03.06', name: '가락쌍용(1차)', area: {supply: '110D', land: '84.99㎡'}, price: {trade: '18억 2,000만', unit: '7,600만'}, year: '2018년', distance: '20m'},
                {days: '21.12.16', name: '가람마을10단지동양엔파트월드메', area: {supply: '161A', land: '150.10㎡'}, price: {trade: '20억 4,000만', unit: '7,800만'}, year: '1992년', distance: '47m'},
                {days: '21.07.18', name: '가락우성(1차)', area: {supply: '161A', land: '150.10㎡'}, price: {trade: '20억 4,000만', unit: '7,800만'}, year: '1992년', distance: '80m'}
            ],
            //전출입데이터
            movingTotal: [
                {label: '전입', count: '7,534', rate: {type: true, num: '2.3'}},
                {label: '전출', count: '6,725', rate: {type: false, num: '2.5'}},
                {label: '순입', count: '809', rate: {type: true, num: '1.45'}}
            ],
            //전출입순위데이터
            movingTop5: [
                {
                    location: '송파구',
                    locationMoving: [
                        {
                            movingin: {loaction: '강남구', num: '2,672'},
                            movingout: {loaction: '강남구', num: '2,816'}
                        },
                        {
                            movingin: {loaction: '강동구', num: '626'},
                            movingout: {loaction: '강동구', num: '1,111'}
                        },
                        {
                            movingin: {loaction: '성남시', num: '389'},
                            movingout: {loaction: '성남시', num: '518'}
                        },
                        {
                            movingin: {loaction: '서초구', num: '337'},
                            movingout: {loaction: '서초구', num: '432'}
                        },
                        {
                            movingin: {loaction: '광진구', num: '311'},
                            movingout: {loaction: '광진구', num: '404'}
                        }
                    ]
                }
                
            ],
            //AI추정가소개팝업
            activeNum: 0,
            //인근거래사례
            rangedata: ['0', '250m', '500m', '750m', '1km(반경)'],
            datavalue: ['0', '500m'],
            rangedata2: ['2022', '2010', '2000', '1990', '1980'],
            datavalue2: ['2022', '2000'],
            tipinfoView: false
        };
    },
    created() {
        this.winwidth = window.innerWidth;
        this.handleResize();
        !(this.$router.currentRoute.path === '/ai/list/detail') || this.$router.currentRoute.path === '/ai/single' ? this.pagelist = true : this.pagelist = false;
    },
    destroyed() {
        window.removeEventListener('resize', this.handleResize);
    },
    mounted() {
        console.log(!(this.$router.currentRoute.path === '/ai/list/detail') || this.$router.currentRoute.path === '/ai/single');
        window.addEventListener('resize', this.handleResize);
        !(this.$router.currentRoute.path === '/ai/list/detail') || this.$router.currentRoute.path === '/ai/single' ? this.pagelist = true : this.pagelist = false;
    },
    methods: {
        handleResize(event) {
            this.winwidth = window.innerWidth;
        },
        executeOutLink(url) {
            window.open(url);
        },
        labelClick() {
            this.labelactive = !this.labelactive;
        },
        toggleContent(type) {
            console.log(type);
            this[type] = !this[type];
        },
        tooltipOpen(e, type, target, texttype) {
            if (type === 'open') {
                this[target] = true;
                this.toolTop = e.target.parentNode.offsetTop + 40;
                this.toolleft = e.target.parentNode.offsetLeft - 25;
                if (texttype === '용적율') {
                    this.tipcontent = '용적률 산정용 연면적';
                } else if (texttype === '연면적') {
                    this.tipcontent = '용적률 산정용 연면적1';
                }
                
            } else if (type === 'close') {
                this[target] = false;
            }
        },
        //공통 == 탭클래스 처리 active
        tabClick(parm, type) {
            console.log(type);
            this.activeNum = parm;
            if (type === '가격별') {
                this.tabnum = parm;
            } else if (type === 'AI 추정가 소개') {
                this.tabnum1 = parm;
            }
        },
        //퉅팁
        TipToggle(type, status)  {
            // this[type] = !status;
            if (type === 'guidetip1') {
                this.guidetip1 = !status;
            } else if (type === 'guidetip2') {
                this.guidetip2 = !status;
            } else if (type === 'guidetip3') {
                this.guidetip3 = !status;
            } else if (type === 'guidetip4') {
                this.guidetip4 = !status;
            }
        },
        //window open
        excuteOutLink(link) {
            window.open(link);
        },
        //레이어 팝업 열기 닫기
        ModalLayer(e, type, layername) {
            if (type === 'open') {
                this.openModal(layername);
            } else if (type === 'close') {
                this.closeModal(layername);
            }
        }
    }
};
</script>