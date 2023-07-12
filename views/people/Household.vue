<template>
    <section class="household">
        <div class="mainTitle">
			<h1 class="titdepth1">가구</h1>
            <ShareCommon
                :pageurl ="this.$router.currentRoute.path"
            />
        </div>
        <div class="Topselect">
            <div class="selectbox type2">
                <span class="value txt arw" :class="{down:!locationSelect, up:locationSelect}" @click="SelectToggle('locationSelect')">선택</span>
            </div>
            <!-- 지역선택 레이어 -->
            <div class="locationSelect" v-if="locationSelect">
                <button type="button" class="btn btn-popclose" title="닫기" @click="SelectToggle('locationSelect')">닫기</button>
                <strong class="tit">
                    지역선택
                    <button type="button" class="btn btn-search" title="검색" @click="SelectToggle('locationSearch')">검색</button>
                </strong>
                <Location
                    :locationArea="locationArea"
                    @seletlocation="seletlocation"
                >
                    <!-- 지역검색 레이어 -->
                    <div class="locationSelect search" v-if="locationSearch">
                        <button type="button" class="btn btn-popclose" title="닫기" @click="SelectToggle('locationSearch')">닫기</button>
                        <div class="tit">
                            <button type="button" title="뒤로가기" aria-label="뒤로가기" class="btn btn-back arw left" @click="SelectToggle('locationSearch')"></button>
                            <strong>지역검색</strong>
                        </div>
                        <div class="locsearchwrap">
                            <div class="locsearchbox">
                                <div class="searchinpbox">
                                    <input type="text" placeholder="지역을 검색해보세요" v-model="srhtext">
                                    <button type="button" class="btn btn-inpclear" title="검색어 삭제" v-if="srhtext.length > 0" @click="TxtDelete()"></button>
                                    <button type="button" class="btn btn-search" title="검색"></button>
                                </div>
                                <div class="schwordlistwrap" v-if="srhtext.length > 0">
                                    <jQueryScrollbar>
                                        <div role="list" class="schwordlist">
                                            <div role="button" class="row">서울 <span>강</span>남구</div>
                                            <div role="button" class="row">서울 <span>강</span>서구</div>
                                            <div role="button" class="row">서울 <span>강</span>남구</div>
                                            <div role="button" class="row">서울 <span>강</span>남구</div>
                                            <div role="button" class="row">서울 <span>강</span>남구</div>
                                            <div role="button" class="row">서울 <span>강</span>남구</div>
                                            <div role="button" class="row">서울 <span>강</span>남구</div>
                                            <div role="button" class="row">서울 <span>강</span>남구</div>
                                            <div role="button" class="row">서울 <span>강</span>남구</div>
                                        </div>
                                    </jQueryScrollbar>
                                    <!-- 검색어와 일치하는 검색결과가 존재하지 않을 때 -->
                                    <!-- <div class="nosearchresult">
                                        <p class="retit">검색결과가 없습니다</p>
                                        <p>
                                            띄어쓰기를 확인하고 다시 검색해보세요<br/>
                                            검색어의 절차가 정확한지 확인해주세요
                                        </p>
                                    </div> -->
                                </div>
                            </div>
                        </div>
                    </div>
                </Location>
                <div class="btmlocbtn">
                    <button class="btn btn-round cancel" @click="SelectToggle('locationSelect')">취소</button>
                    <button class="btn btn-round confirm">확인</button>
                </div>
            </div>
            <div class="txttop5 recent">
                <span class="txt">최근 조회지역</span>
            </div>
            <div class="btnstop5">
                <jQueryScrollbar style="width:100%;" :useCtrl="{direction: 'x',customClass:'typeSmall' }">
                    <div class="btnstop5_scroll">
                        <button type="button">1.경기 화성시</button>
                        <button type="button">2.경기 평택시</button>
                        <button type="button">3.인천 남동구</button>
                        <button type="button">4.경기 파주시</button>
                        <button type="button">5.인천 서구</button>
                    </div>
                </jQueryScrollbar>
            </div>
        </div>
        <!-- 가구 현황 -->
        <div class="cardCaptureBox">
            <ChartOption
                :optionList="optionList"
                @print="cardOption('print')"
                @capture="cardOption('capture')"
            />
            <div class="cardbox cardCapture">
                <div class="cardtit tradingtit">
                    <h1 class="titdepth2">가구 현황</h1>
                </div>
                <TabContent
                    :tabcontentname="'가구 현황'"
                    :tabsublist="'tabbox tabtype4'"
                    :tabtexts="tabtextsType1"
                    v-on:tabactive="tabClick"
                >
                    <template slot="panel">
                        <div class="tabcon" role="tabpanel" v-if="tabnum===0">
                            <div class="holdcon">
                                <div class="checkedlegend">
                                    <button class="btn-check yeartype1 active">19세 이하</button>
                                    <button class="btn-check yeartype2 active">20대</button>
                                    <button class="btn-check yeartype3 active">30대</button>
                                    <button class="btn-check yeartype4 active">40대</button>
                                    <button class="btn-check yeartype5 active">50대</button>
                                    <button class="btn-check yeartype6 active">60대</button>
                                    <button class="btn-check yeartype7 active">70세 이상</button>
                                    <button class="btn-check yeartype8 active">평균 가구원 수(전체)</button>
                                    <div class="rangelegend">
                                        <div class="switchwrap">
                                            하나씩 보기
                                            <div class="switch-button custom-control sm">
                                                <input type="checkbox" id="changeRatio2">
                                                <label for="changeRatio2" class="switch"><span class="txt">증감률</span></label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="unittextbox between">
                                    <span>가구 수(만)</span>
                                    <span>평균 가구원 수(명)</span>
                                </div>
                                <!-- 차트영역 -->
                                <div class="barchertArea" style="height:378px; position:relative">
                                    <!-- 모바일의 경우 (해상도 767이하 부터) 해당 툴팁 표기 -->
                                    <div class="chartTip tradingtip mobile" style="top:-140px;">
                                        <p class="tx1">2017년 가구 수</p>
                                        <p class="tx2">123만 가구</p>
                                        <div class="linebox botnoline">
                                            <span class="legendlist householdtype7">70세 이상:123만</span>
                                            <span class="legendlist householdtype11">60대:123만</span>
                                            <span class="legendlist householdtype10">50대:123만</span>
                                            <span class="legendlist householdtype8">40대:123만</span>
                                            <span class="legendlist householdtype3">30대:123만</span>
                                            <span class="legendlist householdtype9">20대:123만</span>
                                            <span class="legendlist householdtype1">19세 이하:123만</span>
                                        </div>
                                    </div>
                                    <div class="chartTip tradingtip" style="top:0; left:50px;">
                                        <p class="tx1">2017년 가구 수</p>
                                        <p class="tx2">123만 가구</p>
                                        <div class="linebox botnoline">
                                            <span class="legendlist householdtype7">70세 이상:123만</span>
                                            <span class="legendlist householdtype11">60대:123만</span>
                                            <span class="legendlist householdtype10">50대:123만</span>
                                            <span class="legendlist householdtype8">40대:123만</span>
                                            <span class="legendlist householdtype3">30대:123만</span>
                                            <span class="legendlist householdtype9">20대:123만</span>
                                            <span class="legendlist householdtype1">19세 이하:123만</span>
                                        </div>
                                    </div>
                                    <!-- svg차트 -->
                                    <div class="barchertbox">
                                        <span title="워터마크" class="watermark horizongray"></span>
                                    </div>
                                </div>
                                <div class="tradingtable house">
                                    <div class="tablelabel">
                                        <span>구분</span>
                                        <span>70세이상</span>
                                        <span>60대</span>
                                        <span>50대</span>
                                        <span>40대</span>
                                        <span>30대</span>
                                        <span>20대</span>
                                        <span>19세이하</span>
                                        <span>합계</span>
                                    </div>
                                    <jQueryScrollbar  style="width:100%;">
                                        <div class="scrollin-pir">
                                            <div class="tablelbody">
                                                <div class="tablelow">
                                                    <span class="day" v-for="(day, index) in tradingdays" :key="index"  v-html="day.day" :class="{selected:index == 3}"></span>
                                                </div>
                                                <div class="tablelow"  v-for="(item, index) in tradingdatas" :key="index">
                                                    <span class="datavalue" v-for="(data, index) in item.data" :key="index" v-html="data.value"  :class="{selected:index == 3}"></span>
                                                </div>
                                                <div class="tablelow total">
                                                    <span class="datavalue"  v-for="(item, index) in tradingtotal" :key="index"  v-html="item.total"  :class="{selected:index == 3}"></span>
                                                </div>
                                            </div>
                                        </div>
                                    </jQueryScrollbar>
                                    
                                </div>
                                <div class="textbox">
                                    <span role="button" class="btn-statistics iconsource" @click="openPublicPopup('open',$event, 'houseType1')">출처 : 국가통계 포털</span>
                                    
                                </div>
                            </div>
                            
                        </div>
                        <div class="tabcon" role="tabpanel" v-if="tabnum===1">
                            <div class="holdcon">
                                <div class="checkedlegend">
                                    <button class="btn-check housetype5 active">단독주택</button>
                                    <button class="btn-check housetype1 active">아파트</button>
                                    <button class="btn-check housetype2 active">연립주택</button>
                                    <button class="btn-check housetype3 active">다세대주택</button>
                                    <button class="btn-check housetype4 active">비거주용 건물 내 주택</button>
                                    <button class="btn-check housetype7  active">주택 이외</button>
                                    <button class="btn-check yeartype8 active">평균 가구원 수(전체)</button> <!-- 2022.04.14 퍼블수정-->
                                    <div class="rangelegend">
                                        <div class="switchwrap">
                                            하나씩 보기
                                            <div class="switch-button custom-control sm">
                                                <input type="checkbox" id="changeRatio2">
                                                <label for="changeRatio2" class="switch"><span class="txt">증감률</span></label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="unittextbox right">
                                    <span>가구 수(만)</span>
                                </div>
                                <!-- 차트영역 -->
                                <div class="barchertArea" style="height:378px; position:relative">
                                    <!-- 모바일의 경우 (해상도 767이하 부터) 해당 툴팁 표기 -->
                                    <div class="chartTip tradingtip mobile" style="top:-140px;">
                                        <p class="tx1">2017년 가구 수</p>
                                        <p class="tx2">123만 가구</p>
                                        <div class="linebox botnoline">
                                            <span class="legendlist householdtype5">단독주택:123만</span>
                                            <span class="legendlist householdtype2">아파트:123만</span>
                                            <span class="legendlist householdtype6">연립주택:123만</span>
                                            <span class="legendlist householdtype7">다세대주택:123만</span>
                                            <span class="legendlist householdtype4">비거주용 건물 내 주택:123만</span>
                                            <span class="legendlist householdtype8">주택 이외:123만</span>
                                        </div>
                                    </div>
                                    <div class="chartTip tradingtip" style="top:0; left:50px;">
                                        <p class="tx1">2017년 가구 수</p>
                                        <p class="tx2">123만 가구</p>
                                        <div class="linebox botnoline">
                                            <span class="legendlist householdtype5">단독주택:123만</span>
                                            <span class="legendlist householdtype2">아파트:123만</span>
                                            <span class="legendlist householdtype6">연립주택:123만</span>
                                            <span class="legendlist householdtype7">다세대주택:123만</span>
                                            <span class="legendlist householdtype4">비거주용 건물 내 주택:123만</span>
                                            <span class="legendlist householdtype8">주택 이외:123만</span>
                                        </div>
                                    </div>
                                    <!-- svg차트 -->
                                    <div class="barchertbox">
                                        <span title="워터마크" class="watermark horizongray"></span>
                                    </div>
                                </div>
                                <div class="tradingtable house">
                                    <div class="tablelabel">
                                        <span>구분</span>
                                        <span>70세이상</span>
                                        <span>60대</span>
                                        <span>50대</span>
                                        <span>40대</span>
                                        <span>30대</span>
                                        <span>20대</span>
                                        <span>19세이하</span>
                                        <span>합계</span>
                                    </div>
                                    <jQueryScrollbar  style="width:100%; height:auto;">
                                        <div class="scrollin-pir">
                                            <div class="tablelbody">
                                                <div class="tablelow">
                                                    <span class="day" v-for="(day, index) in tradingdays" :key="index"  v-html="day.day" :class="{selected:index == 3}"></span>
                                                </div>
                                                <div class="tablelow"  v-for="(item, index) in tradingdatas" :key="index">
                                                    <span class="datavalue" v-for="(data, index) in item.data" :key="index" v-html="data.value"  :class="{selected:index == 3}"></span>
                                                </div>
                                                <div class="tablelow total">
                                                    <span class="datavalue"  v-for="(item, index) in tradingtotal" :key="index"  v-html="item.total"  :class="{selected:index == 3}"></span>
                                                </div>
                                            </div>
                                        </div>
                                    </jQueryScrollbar>
                                    
                                </div>
                                <div class="textbox"><span role="button" class="btn-statistics iconsource">출처 : 국가통계 포털</span></div>
                            </div>
                        </div>
                    </template>
                </TabContent>
            </div>
        </div>
        <!-- 장래 가구 추계 -->
        <div class="cardCaptureBox">
            <ChartOption
                :optionList="optionList"
                @print="cardOption('print')"
                @capture="cardOption('capture')"
            />
            <div class="cardbox cardCapture">
                <div class="cardtit tradingtit">
                    <h1 class="titdepth2">장래 가구 추계</h1>
                </div>
                <TabContent
                    :tabcontentname="'장래 가구 추계'"
                    :tabsublist="'tabbox tabtype4'"
                    :tabtexts="tabtextsType2"
                    v-on:tabactive="tabClick"
                >
                    <template slot="panel">
                        <!-- 연령대 영역 -->
                        <div class="tabcon" role="tabpanel" v-if="tabnum1===0">
                            <div class="holdcon">
                                <div class="checkedlegend">
                                    <button class="btn-check householdtype1 active">19세 이하</button>
                                    <button class="btn-check householdtype2 active">20대</button>
                                    <button class="btn-check householdtype3 active">30대</button>
                                    <button class="btn-check householdtype4 active">40대</button>
                                    <button class="btn-check householdtype5 active">50대</button>
                                    <button class="btn-check householdtype6 active">60대</button>
                                    <button class="btn-check householdtype7 active">70세 이상</button>
                                
                                    <div class="rangelegend">
                                        <div class="switchwrap">
                                            하나씩 보기
                                            <div class="switch-button custom-control sm">
                                                <input type="checkbox" id="changeRatio2">
                                                <label for="changeRatio2" class="switch"><span class="txt">증감률</span></label>
                                            </div>
                                        </div>
                                        <div class="textbox right"><!-- 2022.02.11  사용자가 2뎁스 지역 (시/군/구) 조회 시 출력되는 내용 -->
                                            <span class="iconinfo3">가구 추계는 시/도 단위까지 조회가 가능합니다.</span>
                                        </div>
                                    </div>
                                </div>
                                <!-- 차트영역 -->
                                <div class="barchertArea" style="height:378px;position:relative">
                                    <!-- 모바일의 경우 (해상도 767이하 부터) 해당 툴팁 표기 -->
                                    <div class="chartTip tradingtip mobile" style="top:-65px;">
                                        <p class="tx1">2025년 가구 수(추계)</p>
                                        <p class="tx2">1,234만</p><!-- 2022.02.18 퍼블 변경 -->
                                        <div class="linebox botnoline">
                                            <span class="legendlist householdtype7">70세 이상:123만(12.3%)</span>
                                            <span class="legendlist householdtype6">60대:123만(12.3%)</span>
                                            <span class="legendlist householdtype5">50대:123만(12.3%)</span>
                                            <span class="legendlist householdtype4">40대:123만(12.3%)</span>
                                            <span class="legendlist householdtype3">30대:123만(12.3%)</span>
                                            <span class="legendlist householdtype2">20대:123만(12.3%)</span>
                                            <span class="legendlist householdtype1">19세 이하:123만(12.3%)</span>
                                        </div>
                                    </div>
                                    
                                    <div class="chartTip tradingtip" style="top:0; left:50px;">
                                        <p class="tx1">2025년 가구 수(추계)</p>
                                        <p class="tx2">1,234만</p><!-- 2022.02.18 퍼블 변경 -->
                                        <div class="linebox botnoline">
                                            <span class="legendlist householdtype7">70세 이상:123만(12.3%)</span>
                                            <span class="legendlist householdtype6">60대:123만(12.3%)</span>
                                            <span class="legendlist householdtype5">50대:123만(12.3%)</span>
                                            <span class="legendlist householdtype4">40대:123만(12.3%)</span>
                                            <span class="legendlist householdtype3">30대:123만(12.3%)</span>
                                            <span class="legendlist householdtype2">20대:123만(12.3%)</span>
                                            <span class="legendlist householdtype1">19세 이하:123만(12.3%)</span>
                                        </div>
                                    </div>
                                    
                                    <span class="textlegendlabel">단위: 가구 수(만)</span>
                                    <!-- svg차트 -->
                                    <div class="barchertbox">
                                        <span title="워터마크" class="watermark horizongray"></span>
                                    </div>
                                </div>
                                <div class="tradingtable house">
                                    <div class="tablelabel">
                                        <span>구분</span>
                                        <span class="overHeight">70세<br />이상</span>
                                        <span>60대</span>
                                        <span>50대</span>
                                        <span>40대</span>
                                        <span>30대</span>
                                        <span>20대</span>
                                        <span>19세이하</span>
                                        <span>합계</span>
                                    </div>
                                    <jQueryScrollbar  style="width:100%;">
                                        <div class="scrollin-pir">
                                            <div class="tablelbody">
                                                <div class="tablelow">
                                                    <span class="day" v-for="(day, index) in tradingdays" :key="index"  v-html="day.day" :class="{selected:index == 3}"></span>
                                                </div>
                                                <div class="tablelow"  v-for="(item, index) in tradingdatas" :key="index">
                                                    <span class="datavalue" v-for="(data, index) in item.data" :key="index" v-html="data.value"  :class="{selected:index == 3}"></span>
                                                </div>
                                                <div class="tablelow total">
                                                    <span class="datavalue"  v-for="(item, index) in tradingtotal" :key="index"  v-html="item.total"  :class="{selected:index == 3}"></span>
                                                </div>
                                            </div>
                                        </div>
                                    </jQueryScrollbar>
                                    
                                </div>
                                <div class="textbox between type1">
                                    <span class="tablebottex iconinfo3">2000~2020년의 값은 과거 실제 통계를 기반한 수치입니다.</span>
                                    <span role="button" class="btn-statistics iconsource" @click="openPublicPopup('open',$event, 'houseType2')">출처 : 국가통계 포털</span>
                                </div>
                            </div>
                        </div>
                        <!-- // 연령대 영역 -->

                        <!-- 가구 유형별 영역 -->
                        <div class="tabcon" role="tabpanel" v-if="tabnum1===1">
                            <div class="holdcon">
                                <div class="checkedlegend">
                                    <button class="btn-check householdtype1 active">1세대</button>
                                    <button class="btn-check householdtype2 active">2세대</button>
                                    <button class="btn-check householdtype3 active">3세대</button>
                                    <button class="btn-check householdtype4 active">1인가구</button>
                                    <button class="btn-check householdtype5 active">비친족가구</button>
                                
                                    <div class="rangelegend">
                                        <div class="switchwrap">
                                            하나씩 보기
                                            <div class="switch-button custom-control sm">
                                                <input type="checkbox" id="changeRatio2">
                                                <label for="changeRatio2" class="switch"><span class="txt">증감률</span></label>
                                            </div>
                                        </div>
                                        <div class="textbox right"><!-- 2022.02.11  사용자가 2뎁스 지역 (시/군/구) 조회 시 출력되는 내용 -->
                                            <span class="iconinfo3">가구 추계는 시/도 단위까지 조회가 가능합니다.</span>
                                        </div>
                                    </div>
                                </div>
                                <!-- 차트영역 -->
                                <div class="barchertArea" style="height:378px;position:relative">
                                    <!-- 모바일의 경우 (해상도 767이하 부터) 해당 툴팁 표기 -->
                                    <div class="chartTip tradingtip mobile" style="top:-65px;">
                                        <p class="tx1">2025년 가구 수(추계)</p>
                                        <p class="tx2">1,234만</p>
                                        <div class="linebox botnoline">
                                            <span class="legendlist householdtype5">비친족가구:123만(12.3%)</span>
                                            <span class="legendlist householdtype4">1인가구:123만(12.3%)</span>
                                            <span class="legendlist householdtype3">3세대:123만(12.3%)</span>
                                            <span class="legendlist householdtype2">2세대:123만(12.3%)</span>
                                            <span class="legendlist householdtype1">1세대:123만(12.3%)</span>
                                        </div>
                                    </div>
                                    <div class="chartTip tradingtip" style="top:0; left:50px;">
                                        <p class="tx1">2025년 가구 수(추계)</p>
                                        <p class="tx2">1,234만</p>
                                        <div class="linebox botnoline">
                                            <span class="legendlist householdtype5">비친족가구:123만(12.3%)</span>
                                            <span class="legendlist householdtype4">1인가구:123만(12.3%)</span>
                                            <span class="legendlist householdtype3">3세대:123만(12.3%)</span>
                                            <span class="legendlist householdtype2">2세대:123만(12.3%)</span>
                                            <span class="legendlist householdtype1">1세대:123만(12.3%)</span>
                                        </div>
                                    </div>
                                    
                                    <span class="textlegendlabel">단위: 가구 수(만)</span>
                                    <!-- svg차트 -->
                                    <div class="barchertbox">
                                        <span title="워터마크" class="watermark horizongray"></span>
                                    </div>
                                </div>
                                <div class="tradingtable house">
                                    <div class="tablelabel">
                                        <span>전체</span>
                                        <span>70세이상</span>
                                        <span>60대</span>
                                        <span>50대</span>
                                        <span>40대</span>
                                        <span>30대</span>
                                        <span>20대</span>
                                        <span>19세이하</span>
                                        <span>합계</span>
                                    </div>
                                    <jQueryScrollbar  style="width:100%;">
                                        <div class="scrollin-pir">
                                            <div class="tablelbody">
                                                <div class="tablelow">
                                                    <span class="day" v-for="(day, index) in tradingdays" :key="index"  v-html="day.day" :class="{selected:index == 3}"></span>
                                                </div>
                                                <div class="tablelow"  v-for="(item, index) in tradingdatas" :key="index">
                                                    <span class="datavalue" v-for="(data, index) in item.data" :key="index" v-html="data.value"  :class="{selected:index == 3}"></span>
                                                </div>
                                                <div class="tablelow total">
                                                    <span class="datavalue"  v-for="(item, index) in tradingtotal" :key="index"  v-html="item.total"  :class="{selected:index == 3}"></span>
                                                </div>
                                            </div>
                                        </div>
                                    </jQueryScrollbar>
                                    
                                </div>
                                <div class="textbox between type1">
                                    <span class="tablebottex iconinfo3">2000~2020년의 값은 과거 실제 통계를 기반한 수치입니다.</span>
                                    <span role="button" class="btn-statistics iconsource">출처 : 국가통계 포털</span>
                                </div>
                            </div>
                        </div>
                        <!-- // 가구 유형별 영역 -->

                        <!-- 가구 원수별 영역 -->
                        <div class="tabcon" role="tabpanel" v-if="tabnum1===2">
                            <div class="holdcon">
                                <div class="checkedlegend">
                                    <button class="btn-check householdtype1 active">1인</button>
                                    <button class="btn-check householdtype2 active">2인</button>
                                    <button class="btn-check householdtype3 active">3인</button>
                                    <button class="btn-check householdtype4 active">4인</button>
                                    <button class="btn-check householdtype5 active">5인</button>
                                    <button class="btn-check householdtype6 active">6인 이상</button>
                                
                                    <div class="rangelegend">
                                        <div class="switchwrap">
                                            하나씩 보기
                                            <div class="switch-button custom-control sm">
                                                <input type="checkbox" id="changeRatio2">
                                                <label for="changeRatio2" class="switch"><span class="txt">증감률</span></label>
                                            </div>
                                        </div>
                                        <div class="textbox right"><!-- 2022.02.11  사용자가 2뎁스 지역 (시/군/구) 조회 시 출력되는 내용 -->
                                            <span class="iconinfo3">가구 추계는 시/도 단위까지 조회가 가능합니다.</span>
                                        </div>
                                    </div>
                                </div>
                                <!-- 차트영역 -->
                                <div class="barchertArea" style="height:378px;position:relative">
                                    <!-- 모바일의 경우 (해상도 767이하 부터) 해당 툴팁 표기 -->
                                    <div class="chartTip tradingtip mobile" style="top:-65px;">
                                        <p class="tx1">2025년 가구 수(추계)</p>
                                        <p class="tx2">1,234만</p>
                                        <div class="linebox botnoline">
                                            <span class="legendlist householdtype6">6인 이상:123만(12.3%)</span>
                                            <span class="legendlist householdtype5">5인:123만(12.3%)</span>
                                            <span class="legendlist householdtype4">4인:123만(12.3%)</span>
                                            <span class="legendlist householdtype3">3인:123만(12.3%)</span>
                                            <span class="legendlist householdtype2">2인:123만(12.3%)</span>
                                            <span class="legendlist householdtype1">1인:123만(12.3%)</span>
                                        </div>
                                    </div>
                                    <div class="chartTip tradingtip" style="top:0; left:50px;">
                                        <p class="tx1">2025년 가구 수(추계)</p>
                                        <p class="tx2">1,234만</p>
                                        <div class="linebox botnoline">
                                            <span class="legendlist householdtype6">6인 이상:123만(12.3%)</span>
                                            <span class="legendlist householdtype5">5인:123만(12.3%)</span>
                                            <span class="legendlist householdtype4">4인:123만(12.3%)</span>
                                            <span class="legendlist householdtype3">3인:123만(12.3%)</span>
                                            <span class="legendlist householdtype2">2인:123만(12.3%)</span>
                                            <span class="legendlist householdtype1">1인:123만(12.3%)</span>
                                        </div>
                                    </div>
                                    
                                    <span class="textlegendlabel">단위: 가구 수(만)</span>
                                    <!-- svg차트 -->
                                    <div class="barchertbox">
                                        <span title="워터마크" class="watermark horizongray"></span>
                                    </div>
                                </div>
                                <div class="tradingtable house">
                                    <div class="tablelabel">
                                        <span>전체</span>
                                        <span>70세이상</span>
                                        <span>60대</span>
                                        <span>50대</span>
                                        <span>40대</span>
                                        <span>30대</span>
                                        <span>20대</span>
                                        <span>19세이하</span>
                                        <span>합계</span>
                                    </div>
                                    <jQueryScrollbar  style="width:100%;">
                                        <div class="scrollin-pir">
                                            <div class="tablelbody">
                                                <div class="tablelow">
                                                    <span class="day" v-for="(day, index) in tradingdays" :key="index"  v-html="day.day" :class="{selected:index == 3}"></span>
                                                </div>
                                                <div class="tablelow"  v-for="(item, index) in tradingdatas" :key="index">
                                                    <span class="datavalue" v-for="(data, index) in item.data" :key="index" v-html="data.value"  :class="{selected:index == 3}"></span>
                                                </div>
                                                <div class="tablelow total">
                                                    <span class="datavalue"  v-for="(item, index) in tradingtotal" :key="index"  v-html="item.total"  :class="{selected:index == 3}"></span>
                                                </div>
                                            </div>
                                        </div>
                                    </jQueryScrollbar>
                                    
                                </div>
                                <div class="textbox between type1">
                                    <span class="tablebottex iconinfo3">2000~2020년의 값은 과거 실제 통계를 기반한 수치입니다.</span>
                                    <span role="button" class="btn-statistics iconsource">출처 : 국가통계 포털</span>
                                </div>
                            </div>
                        </div>
                        <!-- // 가구 원수별 영역 -->
                    </template>
                </TabContent>
            </div>
        </div>
        <!-- 가구원수별 현황 -->
        <div class="cardCaptureBox">
            <ChartOption
                :optionList="optionList"
                @print="cardOption('print')"
                @capture="cardOption('capture')"
            />
            <div class="cardbox cardCapture">
                <div class="cardtit tradingtit">
                    <h1 class="titdepth2">가구원수별 현황</h1>
                </div>
                <TabContent
                    :tabcontentname="'가구원수별 현황'"
                    :tabsublist="'tabbox tabtype4 agetab'"
                    :tabtexts="tabtextsType3"
                    v-on:tabactive="tabClick"
                >
                    <template slot="panel">
                        <!-- 1인가구 -->
                        <div class="tabcon" role="tabpanel" v-if="tabnum2===0">
                            <div class="holdcon">
                                <div class="checkedlegend">
                                    <button class="btn-check householdtype1 active">19세 이하</button>
                                    <button class="btn-check householdtype9 active">20대</button>
                                    <button class="btn-check householdtype3 active">30대</button>
                                    <button class="btn-check householdtype8 active">40대</button>
                                    <button class="btn-check householdtype10 active">50대</button>
                                    <button class="btn-check householdtype11 active">60대</button>
                                    <button class="btn-check householdtype7 active">70세 이상</button>
                                
                                    <div class="rangelegend">
                                        <div class="switchwrap">
                                            하나씩 보기
                                            <div class="switch-button custom-control sm">
                                                <input type="checkbox" id="changeRatio2">
                                                <label for="changeRatio2" class="switch"><span class="txt">증감률</span></label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <!-- 차트영역 -->
                                <div class="barchertArea" style="height:378px;position:relative">
                                     <!-- 모바일의 경우 (해상도 767이하 부터) 해당 툴팁 표기 -->
                                    <div class="chartTip tradingtip mobile" style="top:-65px;">
                                        <p class="tx1">2017년 가구 수</p>
                                        <p class="tx2">1,234만</p>
                                        <div class="linebox botnoline">
                                            <span class="legendlist householdtype7">70세 이상:123만(12.3%)</span>
                                            <span class="legendlist householdtype11">60대:123만(12.3%)</span>
                                            <span class="legendlist householdtype10">50대:123만(12.3%)</span>
                                            <span class="legendlist householdtype8">40대:123만(12.3%)</span>
                                            <span class="legendlist householdtype3">30대:123만(12.3%)</span>
                                            <span class="legendlist householdtype9">20대:123만(12.3%)</span>
                                            <span class="legendlist householdtype1">19세 이하:123만(12.3%)</span>
                                        </div>
                                    </div>
                                    <div class="chartTip tradingtip" style="top:0; left:50px;">
                                        <p class="tx1">2025년 가구 수</p>
                                        <p class="tx2">1,234만</p>
                                        <div class="linebox botnoline">
                                            <span class="legendlist householdtype7">70세 이상:123만(12.3%)</span>
                                            <span class="legendlist householdtype11">60대:123만(12.3%)</span>
                                            <span class="legendlist householdtype10">50대:123만(12.3%)</span>
                                            <span class="legendlist householdtype8">40대:123만(12.3%)</span>
                                            <span class="legendlist householdtype3">30대:123만(12.3%)</span>
                                            <span class="legendlist householdtype9">20대:123만(12.3%)</span>
                                            <span class="legendlist householdtype1">19세 이하:123만(12.3%)</span>
                                        </div>
                                    </div>
                                    
                                    <span class="textlegendlabel">단위: 가구 수(만)</span>
                                    <!-- svg차트 -->
                                    <div class="barchertbox">
                                        <span title="워터마크" class="watermark horizongray"></span>
                                    </div>
                                </div>
                                <div class="tradingtable house">
                                    <div class="tablelabel">
                                        <span>구분</span>
                                        <span>70세이상</span>
                                        <span>60대</span>
                                        <span>50대</span>
                                        <span>40대</span>
                                        <span>30대</span>
                                        <span>20대</span>
                                        <span>19세이하</span>
                                        <span>합계</span>
                                    </div>
                                    <jQueryScrollbar  style="width:100%;">
                                        <div class="scrollin-pir">
                                            <div class="tablelbody">
                                                <div class="tablelow">
                                                    <span class="day" v-for="(day, index) in tradingdays" :key="index"  v-html="day.day" :class="{selected:index == 3}"></span>
                                                </div>
                                                <div class="tablelow"  v-for="(item, index) in tradingdatas" :key="index">
                                                    <span class="datavalue" v-for="(data, index) in item.data" :key="index" v-html="data.value"  :class="{selected:index == 3}"></span>
                                                </div>
                                                <div class="tablelow total">
                                                    <span class="datavalue"  v-for="(item, index) in tradingtotal" :key="index"  v-html="item.total"  :class="{selected:index == 3}"></span>
                                                </div>
                                            </div>
                                        </div>
                                    </jQueryScrollbar>
                                    
                                </div>
                                <div class="textbox">
                                    <span role="button" class="btn-statistics iconsource" @click="openPublicPopup('open',$event, 'houseType3')">출처 : 국가통계 포털</span>
                                </div>
                            </div>
                            
                        </div>
                        <!-- // 1인가구 -->

                        <!-- 2인가구 -->
                        <div class="tabcon" role="tabpanel" v-if="tabnum2===1">
                            <div class="holdcon">
                                <div class="checkedlegend">
                                    <button class="btn-check householdtype1 active">19세 이하</button>
                                    <button class="btn-check householdtype9 active">20대</button>
                                    <button class="btn-check householdtype3 active">30대</button>
                                    <button class="btn-check householdtype8 active">40대</button>
                                    <button class="btn-check householdtype10 active">50대</button>
                                    <button class="btn-check householdtype11 active">60대</button>
                                    <button class="btn-check householdtype7 active">70세 이상</button>
                                
                                    <div class="rangelegend">
                                        <div class="switchwrap">
                                            하나씩 보기
                                            <div class="switch-button custom-control sm">
                                                <input type="checkbox" id="changeRatio2">
                                                <label for="changeRatio2" class="switch"><span class="txt">증감률</span></label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <!-- 차트영역 -->
                                <div class="barchertArea" style="height:378px;position:relative">
                                     <!-- 모바일의 경우 (해상도 767이하 부터) 해당 툴팁 표기 -->
                                    <div class="chartTip tradingtip mobile" style="top:-65px;">
                                        <p class="tx1">2017년 가구 수</p>
                                        <p class="tx2">1,234만</p>
                                        <div class="linebox botnoline">
                                            <span class="legendlist householdtype7">70세 이상:123만(12.3%)</span>
                                            <span class="legendlist householdtype11">60대:123만(12.3%)</span>
                                            <span class="legendlist householdtype10">50대:123만(12.3%)</span>
                                            <span class="legendlist householdtype8">40대:123만(12.3%)</span>
                                            <span class="legendlist householdtype3">30대:123만(12.3%)</span>
                                            <span class="legendlist householdtype9">20대:123만(12.3%)</span>
                                            <span class="legendlist householdtype1">19세 이하:123만(12.3%)</span>
                                        </div>
                                    </div>
                                    <div class="chartTip tradingtip" style="top:0; left:50px;">
                                        <p class="tx1">2025년 가구 수</p>
                                        <p class="tx2">1,234만</p>
                                        <div class="linebox botnoline">
                                            <span class="legendlist householdtype7">70세 이상:123만(12.3%)</span>
                                            <span class="legendlist householdtype11">60대:123만(12.3%)</span>
                                            <span class="legendlist householdtype10">50대:123만(12.3%)</span>
                                            <span class="legendlist householdtype8">40대:123만(12.3%)</span>
                                            <span class="legendlist householdtype3">30대:123만(12.3%)</span>
                                            <span class="legendlist householdtype9">20대:123만(12.3%)</span>
                                            <span class="legendlist householdtype1">19세 이하:123만(12.3%)</span>
                                        </div>
                                    </div>
                                    
                                    <span class="textlegendlabel">단위: 가구 수(만)</span>
                                    <!-- svg차트 -->
                                    <div class="barchertbox">
                                        <span title="워터마크" class="watermark horizongray"></span>
                                    </div>
                                </div>
                                <div class="tradingtable house">
                                    <div class="tablelabel">
                                        <span>구분</span>
                                        <span>70세이상</span>
                                        <span>60대</span>
                                        <span>50대</span>
                                        <span>40대</span>
                                        <span>30대</span>
                                        <span>20대</span>
                                        <span>19세이하</span>
                                        <span>합계</span>
                                    </div>
                                    <jQueryScrollbar  style="width:100%;">
                                        <div class="scrollin-pir">
                                            <div class="tablelbody">
                                                <div class="tablelow">
                                                    <span class="day" v-for="(day, index) in tradingdays" :key="index"  v-html="day.day" :class="{selected:index == 3}"></span>
                                                </div>
                                                <div class="tablelow"  v-for="(item, index) in tradingdatas" :key="index">
                                                    <span class="datavalue" v-for="(data, index) in item.data" :key="index" v-html="data.value"  :class="{selected:index == 3}"></span>
                                                </div>
                                                <div class="tablelow total">
                                                    <span class="datavalue"  v-for="(item, index) in tradingtotal" :key="index"  v-html="item.total"  :class="{selected:index == 3}"></span>
                                                </div>
                                            </div>
                                        </div>
                                    </jQueryScrollbar>
                                    
                                </div>
                                <div class="textbox">
                                    <span role="button" class="btn-statistics iconsource">출처 : 국가통계 포털</span>
                                </div>
                            </div>
                            
                        </div>
                        <!-- // 2인가구 -->

                        <!-- 3인가구 -->
                        <div class="tabcon" role="tabpanel" v-if="tabnum2===2">
                            <div class="holdcon">
                                <div class="checkedlegend">
                                    <button class="btn-check householdtype1 active">19세 이하</button>
                                    <button class="btn-check householdtype9 active">20대</button>
                                    <button class="btn-check householdtype3 active">30대</button>
                                    <button class="btn-check householdtype8 active">40대</button>
                                    <button class="btn-check householdtype10 active">50대</button>
                                    <button class="btn-check householdtype11 active">60대</button>
                                    <button class="btn-check householdtype7 active">70세 이상</button>
                                
                                    <div class="rangelegend">
                                        <div class="switchwrap">
                                            하나씩 보기
                                            <div class="switch-button custom-control sm">
                                                <input type="checkbox" id="changeRatio2">
                                                <label for="changeRatio2" class="switch"><span class="txt">증감률</span></label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <!-- 차트영역 -->
                                <div class="barchertArea" style="height:378px;position:relative">
                                     <!-- 모바일의 경우 (해상도 767이하 부터) 해당 툴팁 표기 -->
                                    <div class="chartTip tradingtip mobile" style="top:-65px;">
                                        <p class="tx1">2017년 가구 수</p>
                                        <p class="tx2">1,234만</p>
                                        <div class="linebox botnoline">
                                            <span class="legendlist householdtype7">70세 이상:123만(12.3%)</span>
                                            <span class="legendlist householdtype11">60대:123만(12.3%)</span>
                                            <span class="legendlist householdtype10">50대:123만(12.3%)</span>
                                            <span class="legendlist householdtype8">40대:123만(12.3%)</span>
                                            <span class="legendlist householdtype3">30대:123만(12.3%)</span>
                                            <span class="legendlist householdtype9">20대:123만(12.3%)</span>
                                            <span class="legendlist householdtype1">19세 이하:123만(12.3%)</span>
                                        </div>
                                    </div>
                                    <div class="chartTip tradingtip" style="top:0; left:50px;">
                                        <p class="tx1">2025년 가구 수</p>
                                        <p class="tx2">1,234만</p>
                                        <div class="linebox botnoline">
                                            <span class="legendlist householdtype7">70세 이상:123만(12.3%)</span>
                                            <span class="legendlist householdtype11">60대:123만(12.3%)</span>
                                            <span class="legendlist householdtype10">50대:123만(12.3%)</span>
                                            <span class="legendlist householdtype8">40대:123만(12.3%)</span>
                                            <span class="legendlist householdtype3">30대:123만(12.3%)</span>
                                            <span class="legendlist householdtype9">20대:123만(12.3%)</span>
                                            <span class="legendlist householdtype1">19세 이하:123만(12.3%)</span>
                                        </div>
                                    </div>
                                    
                                    <span class="textlegendlabel">단위: 가구 수(만)</span>
                                    <!-- svg차트 -->
                                    <div class="barchertbox">
                                        <span title="워터마크" class="watermark horizongray"></span>
                                    </div>
                                </div>
                                <div class="tradingtable house">
                                    <div class="tablelabel">
                                        <span>구분</span>
                                        <span>70세이상</span>
                                        <span>60대</span>
                                        <span>50대</span>
                                        <span>40대</span>
                                        <span>30대</span>
                                        <span>20대</span>
                                        <span>19세이하</span>
                                        <span>합계</span>
                                    </div>
                                    <jQueryScrollbar  style="width:100%;">
                                        <div class="scrollin-pir">
                                            <div class="tablelbody">
                                                <div class="tablelow">
                                                    <span class="day" v-for="(day, index) in tradingdays" :key="index"  v-html="day.day" :class="{selected:index == 3}"></span>
                                                </div>
                                                <div class="tablelow"  v-for="(item, index) in tradingdatas" :key="index">
                                                    <span class="datavalue" v-for="(data, index) in item.data" :key="index" v-html="data.value"  :class="{selected:index == 3}"></span>
                                                </div>
                                                <div class="tablelow total">
                                                    <span class="datavalue"  v-for="(item, index) in tradingtotal" :key="index"  v-html="item.total"  :class="{selected:index == 3}"></span>
                                                </div>
                                            </div>
                                        </div>
                                    </jQueryScrollbar>
                                    
                                </div>
                                <div class="textbox">
                                    <span role="button" class="btn-statistics iconsource">출처 : 국가통계 포털</span>
                                </div>
                            </div>
                            
                        </div>
                        <!-- // 3인가구 -->

                        <!-- 4인가구 -->
                        <div class="tabcon" role="tabpanel" v-if="tabnum2===3">
                            <div class="holdcon">
                                <div class="checkedlegend">
                                    <button class="btn-check householdtype1 active">19세 이하</button>
                                    <button class="btn-check householdtype9 active">20대</button>
                                    <button class="btn-check householdtype3 active">30대</button>
                                    <button class="btn-check householdtype8 active">40대</button>
                                    <button class="btn-check householdtype10 active">50대</button>
                                    <button class="btn-check householdtype11 active">60대</button>
                                    <button class="btn-check householdtype7 active">70세 이상</button>
                                
                                    <div class="rangelegend">
                                        <div class="switchwrap">
                                            하나씩 보기
                                            <div class="switch-button custom-control sm">
                                                <input type="checkbox" id="changeRatio2">
                                                <label for="changeRatio2" class="switch"><span class="txt">증감률</span></label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <!-- 차트영역 -->
                                <div class="barchertArea" style="height:378px;position:relative">
                                     <!-- 모바일의 경우 (해상도 767이하 부터) 해당 툴팁 표기 -->
                                    <div class="chartTip tradingtip mobile" style="top:-65px;">
                                        <p class="tx1">2017년 가구 수</p>
                                        <p class="tx2">1,234만</p>
                                        <div class="linebox botnoline">
                                            <span class="legendlist householdtype7">70세 이상:123만(12.3%)</span>
                                            <span class="legendlist householdtype11">60대:123만(12.3%)</span>
                                            <span class="legendlist householdtype10">50대:123만(12.3%)</span>
                                            <span class="legendlist householdtype8">40대:123만(12.3%)</span>
                                            <span class="legendlist householdtype3">30대:123만(12.3%)</span>
                                            <span class="legendlist householdtype9">20대:123만(12.3%)</span>
                                            <span class="legendlist householdtype1">19세 이하:123만(12.3%)</span>
                                        </div>
                                    </div>
                                    <div class="chartTip tradingtip" style="top:0; left:50px;">
                                        <p class="tx1">2025년 가구 수</p>
                                        <p class="tx2">1,234만</p>
                                        <div class="linebox botnoline">
                                            <span class="legendlist householdtype7">70세 이상:123만(12.3%)</span>
                                            <span class="legendlist householdtype11">60대:123만(12.3%)</span>
                                            <span class="legendlist householdtype10">50대:123만(12.3%)</span>
                                            <span class="legendlist householdtype8">40대:123만(12.3%)</span>
                                            <span class="legendlist householdtype3">30대:123만(12.3%)</span>
                                            <span class="legendlist householdtype9">20대:123만(12.3%)</span>
                                            <span class="legendlist householdtype1">19세 이하:123만(12.3%)</span>
                                        </div>
                                    </div>
                                    
                                    <span class="textlegendlabel">단위: 가구 수(만)</span>
                                    <!-- svg차트 -->
                                    <div class="barchertbox">
                                        <span title="워터마크" class="watermark horizongray"></span>
                                    </div>
                                </div>
                                <div class="tradingtable house">
                                    <div class="tablelabel">
                                        <span>구분</span>
                                        <span>70세이상</span>
                                        <span>60대</span>
                                        <span>50대</span>
                                        <span>40대</span>
                                        <span>30대</span>
                                        <span>20대</span>
                                        <span>19세이하</span>
                                        <span>합계</span>
                                    </div>
                                    <jQueryScrollbar  style="width:100%;">
                                        <div class="scrollin-pir">
                                            <div class="tablelbody">
                                                <div class="tablelow">
                                                    <span class="day" v-for="(day, index) in tradingdays" :key="index"  v-html="day.day" :class="{selected:index == 3}"></span>
                                                </div>
                                                <div class="tablelow"  v-for="(item, index) in tradingdatas" :key="index">
                                                    <span class="datavalue" v-for="(data, index) in item.data" :key="index" v-html="data.value"  :class="{selected:index == 3}"></span>
                                                </div>
                                                <div class="tablelow total">
                                                    <span class="datavalue"  v-for="(item, index) in tradingtotal" :key="index"  v-html="item.total"  :class="{selected:index == 3}"></span>
                                                </div>
                                            </div>
                                        </div>
                                    </jQueryScrollbar>
                                    
                                </div>
                                <div class="textbox">
                                    <span role="button" class="btn-statistics iconsource">출처 : 국가통계 포털</span>
                                </div>
                            </div>
                            
                        </div>
                        <!-- // 4인가구 -->

                        <!-- 5인가구 -->
                        <div class="tabcon" role="tabpanel" v-if="tabnum2===4">
                            <div class="holdcon">
                                <div class="checkedlegend">
                                    <button class="btn-check householdtype1 active">19세 이하</button>
                                    <button class="btn-check householdtype9 active">20대</button>
                                    <button class="btn-check householdtype3 active">30대</button>
                                    <button class="btn-check householdtype8 active">40대</button>
                                    <button class="btn-check householdtype10 active">50대</button>
                                    <button class="btn-check householdtype11 active">60대</button>
                                    <button class="btn-check householdtype7 active">70세 이상</button>
                                
                                    <div class="rangelegend">
                                        <div class="switchwrap">
                                            하나씩 보기
                                            <div class="switch-button custom-control sm">
                                                <input type="checkbox" id="changeRatio2">
                                                <label for="changeRatio2" class="switch"><span class="txt">증감률</span></label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <!-- 차트영역 -->
                                <div class="barchertArea" style="height:378px;position:relative">
                                     <!-- 모바일의 경우 (해상도 767이하 부터) 해당 툴팁 표기 -->
                                    <div class="chartTip tradingtip mobile" style="top:-65px;">
                                        <p class="tx1">2017년 가구 수</p>
                                        <p class="tx2">1,234만</p>
                                        <div class="linebox botnoline">
                                            <span class="legendlist householdtype7">70세 이상:123만(12.3%)</span>
                                            <span class="legendlist householdtype11">60대:123만(12.3%)</span>
                                            <span class="legendlist householdtype10">50대:123만(12.3%)</span>
                                            <span class="legendlist householdtype8">40대:123만(12.3%)</span>
                                            <span class="legendlist householdtype3">30대:123만(12.3%)</span>
                                            <span class="legendlist householdtype9">20대:123만(12.3%)</span>
                                            <span class="legendlist householdtype1">19세 이하:123만(12.3%)</span>
                                        </div>
                                    </div>
                                    <div class="chartTip tradingtip" style="top:0; left:50px;">
                                        <p class="tx1">2025년 가구 수</p>
                                        <p class="tx2">1,234만</p>
                                        <div class="linebox botnoline">
                                            <span class="legendlist householdtype7">70세 이상:123만(12.3%)</span>
                                            <span class="legendlist householdtype11">60대:123만(12.3%)</span>
                                            <span class="legendlist householdtype10">50대:123만(12.3%)</span>
                                            <span class="legendlist householdtype8">40대:123만(12.3%)</span>
                                            <span class="legendlist householdtype3">30대:123만(12.3%)</span>
                                            <span class="legendlist householdtype9">20대:123만(12.3%)</span>
                                            <span class="legendlist householdtype1">19세 이하:123만(12.3%)</span>
                                        </div>
                                    </div>
                                    
                                    <span class="textlegendlabel">단위: 가구 수(만)</span>
                                    <!-- svg차트 -->
                                    <div class="barchertbox">
                                        <span title="워터마크" class="watermark horizongray"></span>
                                    </div>
                                </div>
                                <div class="tradingtable house">
                                    <div class="tablelabel">
                                        <span>구분</span>
                                        <span>70세이상</span>
                                        <span>60대</span>
                                        <span>50대</span>
                                        <span>40대</span>
                                        <span>30대</span>
                                        <span>20대</span>
                                        <span>19세이하</span>
                                        <span>합계</span>
                                    </div>
                                    <jQueryScrollbar  style="width:100%;">
                                        <div class="scrollin-pir">
                                            <div class="tablelbody">
                                                <div class="tablelow">
                                                    <span class="day" v-for="(day, index) in tradingdays" :key="index"  v-html="day.day" :class="{selected:index == 3}"></span>
                                                </div>
                                                <div class="tablelow"  v-for="(item, index) in tradingdatas" :key="index">
                                                    <span class="datavalue" v-for="(data, index) in item.data" :key="index" v-html="data.value"  :class="{selected:index == 3}"></span>
                                                </div>
                                                <div class="tablelow total">
                                                    <span class="datavalue"  v-for="(item, index) in tradingtotal" :key="index"  v-html="item.total"  :class="{selected:index == 3}"></span>
                                                </div>
                                            </div>
                                        </div>
                                    </jQueryScrollbar>
                                    
                                </div>
                                <div class="textbox">
                                    <span role="button" class="btn-statistics iconsource">출처 : 국가통계 포털</span>
                                </div>
                            </div>
                            
                        </div>
                        <!-- // 5인가구 -->

                        <!-- 6인가구 -->
                        <div class="tabcon" role="tabpanel" v-if="tabnum2===5">
                            <div class="holdcon">
                                <div class="checkedlegend">
                                    <button class="btn-check householdtype1 active">19세 이하</button>
                                    <button class="btn-check householdtype9 active">20대</button>
                                    <button class="btn-check householdtype3 active">30대</button>
                                    <button class="btn-check householdtype8 active">40대</button>
                                    <button class="btn-check householdtype10 active">50대</button>
                                    <button class="btn-check householdtype11 active">60대</button>
                                    <button class="btn-check householdtype7 active">70세 이상</button>
                                
                                    <div class="rangelegend">
                                        <div class="switchwrap">
                                            하나씩 보기
                                            <div class="switch-button custom-control sm">
                                                <input type="checkbox" id="changeRatio2">
                                                <label for="changeRatio2" class="switch"><span class="txt">증감률</span></label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <!-- 차트영역 -->
                                <div class="barchertArea" style="height:378px;position:relative">
                                     <!-- 모바일의 경우 (해상도 767이하 부터) 해당 툴팁 표기 -->
                                    <div class="chartTip tradingtip mobile" style="top:-65px;">
                                        <p class="tx1">2017년 가구 수</p>
                                        <p class="tx2">1,234만</p>
                                        <div class="linebox botnoline">
                                            <span class="legendlist householdtype7">70세 이상:123만(12.3%)</span>
                                            <span class="legendlist householdtype11">60대:123만(12.3%)</span>
                                            <span class="legendlist householdtype10">50대:123만(12.3%)</span>
                                            <span class="legendlist householdtype8">40대:123만(12.3%)</span>
                                            <span class="legendlist householdtype3">30대:123만(12.3%)</span>
                                            <span class="legendlist householdtype9">20대:123만(12.3%)</span>
                                            <span class="legendlist householdtype1">19세 이하:123만(12.3%)</span>
                                        </div>
                                    </div>
                                    <div class="chartTip tradingtip" style="top:0; left:50px;">
                                        <p class="tx1">2025년 가구 수</p>
                                        <p class="tx2">1,234만</p>
                                        <div class="linebox botnoline">
                                            <span class="legendlist householdtype7">70세 이상:123만(12.3%)</span>
                                            <span class="legendlist householdtype11">60대:123만(12.3%)</span>
                                            <span class="legendlist householdtype10">50대:123만(12.3%)</span>
                                            <span class="legendlist householdtype8">40대:123만(12.3%)</span>
                                            <span class="legendlist householdtype3">30대:123만(12.3%)</span>
                                            <span class="legendlist householdtype9">20대:123만(12.3%)</span>
                                            <span class="legendlist householdtype1">19세 이하:123만(12.3%)</span>
                                        </div>
                                    </div>
                                    
                                    <span class="textlegendlabel">단위: 가구 수(만)</span>
                                    <!-- svg차트 -->
                                    <div class="barchertbox">
                                        <span title="워터마크" class="watermark horizongray"></span>
                                    </div>
                                </div>
                                <div class="tradingtable house">
                                    <div class="tablelabel">
                                        <span>구분</span>
                                        <span>70세이상</span>
                                        <span>60대</span>
                                        <span>50대</span>
                                        <span>40대</span>
                                        <span>30대</span>
                                        <span>20대</span>
                                        <span>19세이하</span>
                                        <span>합계</span>
                                    </div>
                                    <jQueryScrollbar  style="width:100%;">
                                        <div class="scrollin-pir">
                                            <div class="tablelbody">
                                                <div class="tablelow">
                                                    <span class="day" v-for="(day, index) in tradingdays" :key="index"  v-html="day.day" :class="{selected:index == 3}"></span>
                                                </div>
                                                <div class="tablelow"  v-for="(item, index) in tradingdatas" :key="index">
                                                    <span class="datavalue" v-for="(data, index) in item.data" :key="index" v-html="data.value"  :class="{selected:index == 3}"></span>
                                                </div>
                                                <div class="tablelow total">
                                                    <span class="datavalue"  v-for="(item, index) in tradingtotal" :key="index"  v-html="item.total"  :class="{selected:index == 3}"></span>
                                                </div>
                                            </div>
                                        </div>
                                    </jQueryScrollbar>
                                    
                                </div>
                                <div class="textbox">
                                    <span role="button" class="btn-statistics iconsource">출처 : 국가통계 포털</span>
                                </div>
                            </div>
                            
                        </div>
                        <!-- // 6인가구 -->

                        <!-- 7인가구 -->
                        <div class="tabcon" role="tabpanel" v-if="tabnum2===6">
                            <div class="holdcon">
                                <div class="checkedlegend">
                                    <button class="btn-check householdtype1 active">19세 이하</button>
                                    <button class="btn-check householdtype9 active">20대</button>
                                    <button class="btn-check householdtype3 active">30대</button>
                                    <button class="btn-check householdtype8 active">40대</button>
                                    <button class="btn-check householdtype10 active">50대</button>
                                    <button class="btn-check householdtype11 active">60대</button>
                                    <button class="btn-check householdtype7 active">70세 이상</button>
                                
                                    <div class="rangelegend">
                                        <div class="switchwrap">
                                            하나씩 보기
                                            <div class="switch-button custom-control sm">
                                                <input type="checkbox" id="changeRatio2">
                                                <label for="changeRatio2" class="switch"><span class="txt">증감률</span></label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <!-- 차트영역 -->
                                <div class="barchertArea" style="height:378px;position:relative">
                                     <!-- 모바일의 경우 (해상도 767이하 부터) 해당 툴팁 표기 -->
                                    <div class="chartTip tradingtip mobile" style="top:-65px;">
                                        <p class="tx1">2017년 가구 수</p>
                                        <p class="tx2">1,234만</p>
                                        <div class="linebox botnoline">
                                            <span class="legendlist householdtype7">70세 이상:123만(12.3%)</span>
                                            <span class="legendlist householdtype11">60대:123만(12.3%)</span>
                                            <span class="legendlist householdtype10">50대:123만(12.3%)</span>
                                            <span class="legendlist householdtype8">40대:123만(12.3%)</span>
                                            <span class="legendlist householdtype3">30대:123만(12.3%)</span>
                                            <span class="legendlist householdtype9">20대:123만(12.3%)</span>
                                            <span class="legendlist householdtype1">19세 이하:123만(12.3%)</span>
                                        </div>
                                    </div>
                                    <div class="chartTip tradingtip" style="top:0; left:50px;">
                                        <p class="tx1">2025년 가구 수</p>
                                        <p class="tx2">1,234만</p>
                                        <div class="linebox botnoline">
                                            <span class="legendlist householdtype7">70세 이상:123만(12.3%)</span>
                                            <span class="legendlist householdtype11">60대:123만(12.3%)</span>
                                            <span class="legendlist householdtype10">50대:123만(12.3%)</span>
                                            <span class="legendlist householdtype8">40대:123만(12.3%)</span>
                                            <span class="legendlist householdtype3">30대:123만(12.3%)</span>
                                            <span class="legendlist householdtype9">20대:123만(12.3%)</span>
                                            <span class="legendlist householdtype1">19세 이하:123만(12.3%)</span>
                                        </div>
                                    </div>
                                    
                                    <span class="textlegendlabel">단위: 가구 수(만)</span>
                                    <!-- svg차트 -->
                                    <div class="barchertbox">
                                        <span title="워터마크" class="watermark horizongray"></span>
                                    </div>
                                </div>
                                <div class="tradingtable house">
                                    <div class="tablelabel">
                                        <span>구분</span>
                                        <span>70세이상</span>
                                        <span>60대</span>
                                        <span>50대</span>
                                        <span>40대</span>
                                        <span>30대</span>
                                        <span>20대</span>
                                        <span>19세이하</span>
                                        <span>합계</span>
                                    </div>
                                    <jQueryScrollbar  style="width:100%;">
                                        <div class="scrollin-pir">
                                            <div class="tablelbody">
                                                <div class="tablelow">
                                                    <span class="day" v-for="(day, index) in tradingdays" :key="index"  v-html="day.day" :class="{selected:index == 3}"></span>
                                                </div>
                                                <div class="tablelow"  v-for="(item, index) in tradingdatas" :key="index">
                                                    <span class="datavalue" v-for="(data, index) in item.data" :key="index" v-html="data.value"  :class="{selected:index == 3}"></span>
                                                </div>
                                                <div class="tablelow total">
                                                    <span class="datavalue"  v-for="(item, index) in tradingtotal" :key="index"  v-html="item.total"  :class="{selected:index == 3}"></span>
                                                </div>
                                            </div>
                                        </div>
                                    </jQueryScrollbar>
                                    
                                </div>
                                <div class="textbox">
                                    <span role="button" class="btn-statistics iconsource">출처 : 국가통계 포털</span>
                                </div>
                            </div>
                            
                        </div>
                        <!-- // 7인가구 -->
                        
                    </template>
                </TabContent>
            </div>
        </div>
        <!-- 고령자 가구 비율 -->
        <div class="cardCaptureBox">
            <ChartOption
                :optionList="optionList"
                @print="cardOption('print')"
                @capture="cardOption('capture')"
            />
            <div class="cardbox cardCapture">
                <div class="cardtit householdtit">
                    <h1 class="titdepth2">고령자 가구 비율</h1>
                </div>
                <div class="listradiogroup">
                    <label for="y2017" class="custom-radio custom-control"><input type="radio" name="time" id="y2017"><span>2017</span></label>
                    <label for="y2018" class="custom-radio custom-control"><input type="radio" name="time" id="y2018"><span>2018</span></label>
                    <label for="y2019" class="custom-radio custom-control"><input type="radio" name="time" id="y2019"><span>2019</span></label>
                    <label for="y2020" class="custom-radio custom-control"><input type="radio" name="time" id="y2020" checked="checked"><span>2020 </span></label>
                </div>
                <div class="roundchart">
                    <div class="chartlegend type3">
                        <span class="legend circle-d7d4cf ">모두 64세 이하<span class="iconpeople ip03"></span><span class="iconpeople ip04"></span></span>
                        <span class="legend circle-968f84 ">모두 65세 이상<span class="iconpeople ip01"></span><span class="iconpeople ip02"></span></span>
                        <span class="legend circle-d8cab3 ">65세 이상 있음<span class="iconpeople ip01"></span><span class="iconpeople ip05"></span></span>
                    </div>
                    <div class="textbox">단위 : %</div>
                    <!-- 원형그래프 -->
                    <div class="chartbox">
                        <!-- 모두 64세 이하 -->
                        <div class="icontip right">
                            <strong>12.3%</strong>
                            <span>(123,456)</span>
                            <span class="circletext type1">모두 64세 이하</span>
                            <span class="iconbox">
                                <span class="iconpeople ip03"></span>
                                <span class="iconpeople ip04"></span>
                            </span>
                        </div>
                        <!-- 모두 65세 이상 -->
                        <div class="icontip" style="left:110px">
                            <strong>12.3%</strong>
                            <span>(123,456)</span>
                            <span class="circletext type2">모두 65세 이상</span>
                            <span class="iconbox">
                                <span class="iconpeople ip01"></span>
                                <span class="iconpeople ip02"></span>
                            </span>
                        </div>
                        <!--65세 이상 있음 -->
                        <div class="icontip" style="left:220px">
                            <strong>12.3%</strong>
                            <span>(123,456)</span>
                            <span class="circletext type3">65세 이상 있음</span>
                            <span class="iconbox">
                                <span class="iconpeople ip01"></span>
                                <span class="iconpeople ip05"></span>
                            </span>
                        </div>
                        <br />
                        <br />
                        <br />
                        <br />
                        <span title="워터마크" class="watermark horizongray"></span>
                    </div>
                </div>
                <div class="tradingtable age">
                    <div class="tablelabel">
                        <span>구분</span>
                        <span>모두 64세 이하</span>
                        <span>모두 65세 이상</span>
                        <span>65세 이상 있음</span>
                    </div>
                    <jQueryScrollbar  style="width:100%;">
                        <div class="scrollin-pir">
                            <div class="tablelbody">
                                <div class="tablelow">
                                    <span class="day" v-for="(day, index) in tradingdays1" :key="index"  v-html="day.day" :class="{selected:index == 3}"></span>
                                </div>
                                <div class="tablelow"  v-for="(item, index) in tradingdatas1" :key="index">
                                    <span class="datavalue" v-for="(data, index) in item.data" :key="index" v-html="data.value"  :class="{selected:index == 3}"></span>
                                </div>
                            </div>
                        </div>
                    </jQueryScrollbar>
                </div>
                <div class="textbox between">
                    <span class="tablebottex iconinfo3">고령자=65세 이상</span>
                    <span role="button" class="btn-statistics iconsource" @click="openPublicPopup('open',$event, 'houseType4')">출처 : 국가통계 포털</span>
                </div>
            </div>
        </div>
        <!-- 공통 포털팝업 -->
        <PublicPopup
            ref="layercon"
            :style=" 'top:'+publicTop+'px;'" v-show="publicLayer"
            :publicLayer="publicLayer"
            :popData="popData"
            @close="openPublicPopup('close')"
            @outlink="excuteOutLink"
        />
        <!-- 공통 포털팝업 -->
    </section>
</template>
<script>
import Location from '@/components/elements/Location.vue';
import ChartOption from '@/components/elements/ChartOption.vue';
import PublicPopup from '@/components/elements/PublicPopup.vue';
import ShareCommon from '@/components/elements/ShareCommon.vue';
import { publicPopup } from '@/data/publicPopup.js';
export default {
    components: {
        Location,
        ChartOption,
        PublicPopup,
        ShareCommon
    },
    props: {
        scrollH: [Number]
    },
    data() {
        return {
            // 카드레이어 옵션
            optionList: [
                {text: '인쇄', type: 'print'},
                {text: '화면 캡쳐', type: 'capture'},
                {text: '엑셀 저장', type: 'excel'},
                {text: '공유', type: 'share'}
            ],
            // 지역선택 데이터
            locationSelect: false,
            // 지역선택 데이터
            locationArea: [
                {
                    name: '서울',
                    sub: [
                        {
                            guLabel: '강남구',
                            dongLabel: [
                                {name: '역삼동'},
                                {name: '역삼동'},
                                {name: '역삼동'}
                            ]
                        },
                        {
                            guLabel: '서초구',
                            dongLabel: [
                                {name: '역삼동'},
                                {name: '역삼동'},
                                {name: '역삼동'},
                                {name: '역삼동'}
                            ]
                        },
                        {
                            guLabel: '강남구',
                            dongLabel: [
                                {name: '역삼동'},
                                {name: '역삼동'},
                                {name: '역삼동'}
                            ]
                        },
                        {
                            guLabel: '서초구',
                            dongLabel: [
                                {name: '역삼동'},
                                {name: '역삼동'},
                                {name: '역삼동'},
                                {name: '역삼동'}
                            ]
                        },
                        {
                            guLabel: '강남구',
                            dongLabel: [
                                {name: '역삼동'},
                                {name: '역삼동'},
                                {name: '역삼동'}
                            ]
                        },
                        {
                            guLabel: '서초구',
                            dongLabel: [
                                {name: '역삼동'},
                                {name: '역삼동'},
                                {name: '역삼동'},
                                {name: '역삼동'}
                            ]
                        },
                        {
                            guLabel: '강남구',
                            dongLabel: [
                                {name: '역삼동'},
                                {name: '역삼동'},
                                {name: '역삼동'}
                            ]
                        },
                        {
                            guLabel: '서초구',
                            dongLabel: [
                                {name: '역삼동'},
                                {name: '역삼동'},
                                {name: '역삼동'},
                                {name: '역삼동'}
                            ]
                        },
                        {
                            guLabel: '강남구',
                            dongLabel: [
                                {name: '역삼동'},
                                {name: '역삼동'},
                                {name: '역삼동'}
                            ]
                        },
                        {
                            guLabel: '서초구',
                            dongLabel: [
                                {name: '역삼동'},
                                {name: '역삼동'},
                                {name: '역삼동'},
                                {name: '역삼동'}
                            ]
                        },
                        {
                            guLabel: '강남구',
                            dongLabel: [
                                {name: '역삼동'},
                                {name: '역삼동'},
                                {name: '역삼동'}
                            ]
                        },
                        {
                            guLabel: '서초구',
                            dongLabel: [
                                {name: '역삼동'},
                                {name: '역삼동'},
                                {name: '역삼동'},
                                {name: '역삼동'}
                            ]
                        },
                        {
                            guLabel: '강남구',
                            dongLabel: [
                                {name: '역삼동'},
                                {name: '역삼동'},
                                {name: '역삼동'}
                            ]
                        },
                        {
                            guLabel: '서초구',
                            dongLabel: [
                                {name: '역삼동'},
                                {name: '역삼동'},
                                {name: '역삼동'},
                                {name: '역삼동'}
                            ]
                        },
                        {
                            guLabel: '강남구',
                            dongLabel: [
                                {name: '역삼동'},
                                {name: '역삼동'},
                                {name: '역삼동'}
                            ]
                        },
                        {
                            guLabel: '서초구',
                            dongLabel: [
                                {name: '역삼동'},
                                {name: '역삼동'},
                                {name: '역삼동'},
                                {name: '역삼동'}
                            ]
                        }
                    ]
                },
                {
                    name: '부산',
                    sub: [
                        {guLabel: '강남구',
                            dongLabel: [
                                // {name: '역삼동'},
                                // {name: '역삼동'},
                                // {name: '역삼동'}
                            ]
                        },
                        {guLabel: '서초구',
                            dongLabel: [
                                {name: '역삼동'},
                                {name: '역삼동'},
                                {name: '역삼동'},
                                {name: '역삼동'}
                            ]
                        },
                        {guLabel: '서초구',
                            dongLabel: [
                                {name: '역삼동'},
                                {name: '역삼동'},
                                {name: '역삼동'},
                                {name: '역삼동'}
                            ]
                        }
                    ]
                },
                {
                    name: '대구',
                    sub: [
                        {guLabel: '강남구',
                            dongLabel: [
                                {name: '역삼동'},
                                {name: '역삼동'},
                                {name: '역삼동'}
                            ]
                        },
                        {guLabel: '서초구',
                            dongLabel: [
                                {name: '역삼동'},
                                {name: '역삼동'},
                                {name: '역삼동'},
                                {name: '역삼동'}
                            ]
                        },
                        {guLabel: '강남구',
                            dongLabel: [
                                {name: '역삼동'},
                                {name: '역삼동'},
                                {name: '역삼동'}
                            ]
                        },
                        {guLabel: '서초구',
                            dongLabel: [
                                {name: '역삼동'},
                                {name: '역삼동'},
                                {name: '역삼동'},
                                {name: '역삼동'}
                            ]
                        }
                    ]
                },
                {
                    name: '광주',
                    sub: [
                        {guLabel: '강남구',
                            dongLabel: [
                                {name: '역삼동'},
                                {name: '역삼동'},
                                {name: '역삼동'}
                            ]
                        },
                        {guLabel: '서초구',
                            dongLabel: [
                                {name: '역삼동'},
                                {name: '역삼동'},
                                {name: '역삼동'},
                                {name: '역삼동'}
                            ]
                        },
                        {guLabel: '강남구',
                            dongLabel: [
                                {name: '역삼동'},
                                {name: '역삼동'},
                                {name: '역삼동'}
                            ]
                        },
                        {guLabel: '서초구',
                            dongLabel: [
                                {name: '역삼동'},
                                {name: '역삼동'},
                                {name: '역삼동'},
                                {name: '역삼동'}
                            ]
                        },
                        {guLabel: '서초구',
                            dongLabel: [
                                {name: '역삼동'},
                                {name: '역삼동'},
                                {name: '역삼동'},
                                {name: '역삼동'}
                            ]
                        }
                    ]
                },
                {
                    name: '대전',
                    sub: [
                        {guLabel: '강남구',
                            dongLabel: [
                                {name: '역삼동'},
                                {name: '역삼동'},
                                {name: '역삼동'}
                            ]
                        },
                        {guLabel: '서초구',
                            dongLabel: [
                                {name: '역삼동'},
                                {name: '역삼동'},
                                {name: '역삼동'},
                                {name: '역삼동'}
                            ]
                        }
                    ]
                },
                {
                    name: '울산',
                    sub: [
                        {guLabel: '강남구',
                            dongLabel: [
                                {name: '역삼동'},
                                {name: '역삼동'},
                                {name: '역삼동'}
                            ]
                        },
                        {guLabel: '서초구',
                            dongLabel: [
                                {name: '역삼동'},
                                {name: '역삼동'},
                                {name: '역삼동'},
                                {name: '역삼동'}
                            ]
                        }, {guLabel: '강남구',
                            dongLabel: [
                                {name: '역삼동'},
                                {name: '역삼동'},
                                {name: '역삼동'}
                            ]
                        },
                        {guLabel: '서초구',
                            dongLabel: [
                                {name: '역삼동'},
                                {name: '역삼동'},
                                {name: '역삼동'},
                                {name: '역삼동'}
                            ]
                        },
                        {guLabel: '강남구',
                            dongLabel: [
                                {name: '역삼동'},
                                {name: '역삼동'},
                                {name: '역삼동'}
                            ]
                        },
                        {guLabel: '서초구',
                            dongLabel: [
                                {name: '역삼동'},
                                {name: '역삼동'},
                                {name: '역삼동'},
                                {name: '역삼동'}
                            ]
                        }
                    ]
                },
                {
                    name: '세종',
                    sub: [
                        {guLabel: '강남구',
                            dongLabel: [
                                {name: '역삼동'},
                                {name: '역삼동'},
                                {name: '역삼동'}
                            ]
                        },
                        {guLabel: '서초구',
                            dongLabel: [
                                {name: '역삼동'},
                                {name: '역삼동'},
                                {name: '역삼동'},
                                {name: '역삼동'}
                            ]
                        }
                    ]
                },
                {
                    name: '경기',
                    sub: [
                        {guLabel: '강남구',
                            dongLabel: [
                                {name: '역삼동'},
                                {name: '역삼동'},
                                {name: '역삼동'}
                            ]
                        },
                        {guLabel: '서초구',
                            dongLabel: [
                                {name: '역삼동'},
                                {name: '역삼동'},
                                {name: '역삼동'},
                                {name: '역삼동'}
                            ]
                        }
                    ]
                },
                {
                    name: '강원',
                    sub: [
                        {guLabel: '강남구',
                            dongLabel: [
                                {name: '역삼동'},
                                {name: '역삼동'},
                                {name: '역삼동'}
                            ]
                        },
                        {guLabel: '서초구',
                            dongLabel: [
                                {name: '역삼동'},
                                {name: '역삼동'},
                                {name: '역삼동'},
                                {name: '역삼동'}
                            ]
                        }
                    ]
                },
                {
                    name: '충북',
                    sub: [
                        {guLabel: '강남구',
                            dongLabel: [
                                {name: '역삼동'},
                                {name: '역삼동'},
                                {name: '역삼동'}
                            ]
                        },
                        {guLabel: '서초구',
                            dongLabel: [
                                {name: '역삼동'},
                                {name: '역삼동'},
                                {name: '역삼동'},
                                {name: '역삼동'}
                            ]
                        }
                    ]
                },
                {
                    name: '충남',
                    sub: [
                        {guLabel: '강남구',
                            dongLabel: [
                                {name: '역삼동'},
                                {name: '역삼동'},
                                {name: '역삼동'}
                            ]
                        },
                        {guLabel: '서초구',
                            dongLabel: [
                                {name: '역삼동'},
                                {name: '역삼동'},
                                {name: '역삼동'},
                                {name: '역삼동'}
                            ]
                        }
                    ]
                },
                {
                    name: '전북',
                    sub: [
                        {guLabel: '강남구',
                            dongLabel: [
                                {name: '역삼동'},
                                {name: '역삼동'},
                                {name: '역삼동'}
                            ]
                        },
                        {guLabel: '서초구',
                            dongLabel: [
                                {name: '역삼동'},
                                {name: '역삼동'},
                                {name: '역삼동'},
                                {name: '역삼동'}
                            ]
                        }
                    ]
                },
                {
                    name: '제주',
                    sub: [
                        {guLabel: '강남구',
                            dongLabel: [
                                {name: '역삼동'},
                                {name: '역삼동'},
                                {name: '역삼동'}
                            ]
                        },
                        {guLabel: '서초구',
                            dongLabel: [
                                {name: '역삼동'},
                                {name: '역삼동'},
                                {name: '역삼동'},
                                {name: '역삼동'}
                            ]
                        }
                    ]
                }
            ],
            // 가구 현황 탭데이터
            tabnum: 0,
            tabtextsType1: ['가구주 연령대', '거주지 유형별'],
            tabnum1: 0,
            tabtextsType2: ['연령대', '가구 유형별', '가구 원수별'],
            tabnum2: 0,
            tabtextsType3: ['1인가구', '2인가구', '3인가구', '4인가구', '5인가구', '6인가구', '7인가구'],
            //팁 데이터
            guidetip1: true,
            guidetip2: true,
            //테이블 날짜
            tradingdays: [
                {day: '20.07'},
                {day: '20.08'},
                {day: '20.09'},
                {day: '20.10'},
                {day: '20.11'},
                {day: '20.12'},
                {day: '21.01'},
                {day: '21.02'},
                {day: '21.03'},
                {day: '21.04'},
                {day: '21.05'},
                {day: '21.06'},
                {day: '21.07'},
                {day: '21.08'},
                {day: '21.09'},
                {day: '21.10'}
            ],
            //테이블 합계 데이터
            tradingtotal: [
                {day: '20.07', total: '1,234'},
                {day: '20.08', total: '1,234'},
                {day: '20.09', total: '1,234'},
                {day: '20.10', total: '1,234'},
                {day: '20.11', total: '1,234'},
                {day: '20.12', total: '1,234'},
                {day: '21.01', total: '1,234'},
                {day: '21.02', total: '1,234'},
                {day: '21.03', total: '1,234'},
                {day: '21.04', total: '1,234'},
                {day: '21.05', total: '1,234'},
                {day: '21.06', total: '1,234'},
                {day: '21.07', total: '1,234'},
                {day: '21.08', total: '1,234'},
                {day: '21.09', total: '1,234'},
                {day: '21.10', total: '1,234'}
            ],
            //테이블 데이터
            tradingdatas: [
                
                {
                    location: '70세이상',
                    data: [
                        {day: '20.07', value: '805,271'},
                        {day: '20.08', value: '805,271'},
                        {day: '20.09', value: '805,271'},
                        {day: '20.10', value: '805,271'},
                        {day: '20.11', value: '805,271'},
                        {day: '20.12', value: '805,271'},
                        {day: '21.01', value: '805,271'},
                        {day: '21.02', value: '805,271'},
                        {day: '21.03', value: '805,271'},
                        {day: '21.04', value: '805,271'},
                        {day: '21.05', value: '805,271'},
                        {day: '21.06', value: '805,271'},
                        {day: '21.07', value: '805,271'},
                        {day: '21.08', value: '805,271'},
                        {day: '21.09', value: '805,271'},
                        {day: '21.10', value: '805,271'}
                        
                    ]
                },
                {
                    location: '60대',
                    data: [
                        {day: '20.07', value: '805,271'},
                        {day: '20.08', value: '805,271'},
                        {day: '20.09', value: '805,271'},
                        {day: '20.10', value: '805,271'},
                        {day: '20.11', value: '805,271'},
                        {day: '20.12', value: '805,271'},
                        {day: '21.01', value: '805,271'},
                        {day: '21.02', value: '805,271'},
                        {day: '21.03', value: '805,271'},
                        {day: '21.04', value: '805,271'},
                        {day: '21.05', value: '805,271'},
                        {day: '21.06', value: '805,271'},
                        {day: '21.07', value: '805,271'},
                        {day: '21.08', value: '805,271'},
                        {day: '21.09', value: '805,271'},
                        {day: '21.10', value: '805,271'}
                        
                    ]
                },
                {
                    location: '50대',
                    data: [
                        {day: '20.07', value: '805,271'},
                        {day: '20.08', value: '805,271'},
                        {day: '20.09', value: '805,271'},
                        {day: '20.10', value: '805,271'},
                        {day: '20.11', value: '805,271'},
                        {day: '20.12', value: '805,271'},
                        {day: '21.01', value: '805,271'},
                        {day: '21.02', value: '805,271'},
                        {day: '21.03', value: '805,271'},
                        {day: '21.04', value: '805,271'},
                        {day: '21.05', value: '805,271'},
                        {day: '21.06', value: '805,271'},
                        {day: '21.07', value: '805,271'},
                        {day: '21.08', value: '805,271'},
                        {day: '21.09', value: '805,271'},
                        {day: '21.10', value: '805,271'}
                        
                    ]
                },
                {
                    location: '40대',
                    data: [
                        {day: '20.07', value: '805,271'},
                        {day: '20.08', value: '805,271'},
                        {day: '20.09', value: '805,271'},
                        {day: '20.10', value: '805,271'},
                        {day: '20.11', value: '805,271'},
                        {day: '20.12', value: '805,271'},
                        {day: '21.01', value: '805,271'},
                        {day: '21.02', value: '805,271'},
                        {day: '21.03', value: '805,271'},
                        {day: '21.04', value: '805,271'},
                        {day: '21.05', value: '805,271'},
                        {day: '21.06', value: '805,271'},
                        {day: '21.07', value: '805,271'},
                        {day: '21.08', value: '805,271'},
                        {day: '21.09', value: '805,271'},
                        {day: '21.10', value: '805,271'}
                        
                    ]
                },
                {
                    location: '30대',
                    data: [
                        {day: '20.07', value: '805,271'},
                        {day: '20.08', value: '805,271'},
                        {day: '20.09', value: '805,271'},
                        {day: '20.10', value: '805,271'},
                        {day: '20.11', value: '805,271'},
                        {day: '20.12', value: '805,271'},
                        {day: '21.01', value: '805,271'},
                        {day: '21.02', value: '805,271'},
                        {day: '21.03', value: '805,271'},
                        {day: '21.04', value: '805,271'},
                        {day: '21.05', value: '805,271'},
                        {day: '21.06', value: '805,271'},
                        {day: '21.07', value: '805,271'},
                        {day: '21.08', value: '805,271'},
                        {day: '21.09', value: '805,271'},
                        {day: '21.10', value: '805,271'}
                        
                    ]
                },
                {
                    location: '20대',
                    data: [
                        {day: '20.07', value: '805,271'},
                        {day: '20.08', value: '805,271'},
                        {day: '20.09', value: '805,271'},
                        {day: '20.10', value: '805,271'},
                        {day: '20.11', value: '805,271'},
                        {day: '20.12', value: '805,271'},
                        {day: '21.01', value: '805,271'},
                        {day: '21.02', value: '805,271'},
                        {day: '21.03', value: '805,271'},
                        {day: '21.04', value: '805,271'},
                        {day: '21.05', value: '805,271'},
                        {day: '21.06', value: '805,271'},
                        {day: '21.07', value: '805,271'},
                        {day: '21.08', value: '805,271'},
                        {day: '21.09', value: '805,271'},
                        {day: '21.10', value: '805,271'}
                        
                    ]
                },
                {
                    location: '19세이하',
                    data: [
                        {day: '20.07', value: '805,271'},
                        {day: '20.08', value: '805,271'},
                        {day: '20.09', value: '805,271'},
                        {day: '20.10', value: '805,271'},
                        {day: '20.11', value: '805,271'},
                        {day: '20.12', value: '805,271'},
                        {day: '21.01', value: '805,271'},
                        {day: '21.02', value: '805,271'},
                        {day: '21.03', value: '805,271'},
                        {day: '21.04', value: '805,271'},
                        {day: '21.05', value: '805,271'},
                        {day: '21.06', value: '805,271'},
                        {day: '21.07', value: '805,271'},
                        {day: '21.08', value: '805,271'},
                        {day: '21.09', value: '805,271'},
                        {day: '21.10', value: '805,271'}
                        
                    ]
                }
                
            ],
            //고령자 가구 비율 테이블 날짜
            tradingdays1: [
                {day: '2017'},
                {day: '2018'},
                {day: '2019'},
                {day: '2020'}
            ],
            //고령자 가구 비율 테이블 데이터
            tradingdatas1: [
                
                {
                    location: '모두 64세 이하',
                    data: [
                        {day: '2017', value: '12.3%(123,456)'},
                        {day: '2018', value: '12.3%(123,456)'},
                        {day: '2019', value: '12.3%(123,456)'},
                        {day: '20120', value: '12.3%(123,456)'}
                        
                    ]
                },
                {
                    location: '모두 65세 이상',
                    data: [
                        {day: '2017', value: '12.3%(123,456)'},
                        {day: '2018', value: '12.3%(123,456)'},
                        {day: '2019', value: '12.3%(123,456)'},
                        {day: '20120', value: '12.3%(123,456)'}
                        
                    ]
                },
                {
                    location: '65세 이상 있음',
                    data: [
                        {day: '2017', value: '12.3%(123,456)'},
                        {day: '2018', value: '12.3%(123,456)'},
                        {day: '2019', value: '12.3%(123,456)'},
                        {day: '20120', value: '12.3%(123,456)'}
                        
                    ]
                }
                
            ],
            locationSearch: false,
            // 지역검색
            srhtext: '',
             //공공팝업 레이어
            publicPopup,
            publicLayer: false,
            popData: null,
            publicTop: null

        };
    },
    watch: {
        scrollH: {
            deep: true,
            handler() {
                this.stickyTop();
            }
        }
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
        // 지역선택 레이어 open/close
        SelectToggle(parms) {
            this[parms] = !this[parms];
        },
        //지역선택 emit
        seletlocation(num, type, text) {
            console.log(num, type, text);
        },
        // 지역검색 텍스트 삭제
        TxtDelete() {
            this.srhtext = '';
        },
        //지역선택 상단 고정
        stickyTop() {
            let ele = document.querySelector('.Topselect');
            let eleH = ele.offsetTop + ele.clientHeight;
            if (this.scrollH > eleH) {
                ele.classList.add('fixed');
            } else {
                ele.classList.remove('fixed');
            }
        },
        //퉅팁
        Tipclose(type)  {
            if (type === 'guidetip1') {
                this.guidetip1 = false;
            } else if (type === 'guidetip2') {
                this.guidetip2 = false;
            }
        },
        //공통 == 탭클래스 처리 active
        tabClick(parm, type) {
            console.log(type);
            if (type === '가구 현황') {
                this.tabnum = parm;
            } else if (type === '장래 가구 추계') {
                this.tabnum1 = parm;
            } else if (type === '가구원수별 현황') {
                this.tabnum2 = parm;
            }
        },
        // 고령자가구 비율 년 클릭
        typeSetting(e, classGroup) {
            let tabbox = document.querySelectorAll(classGroup);
            tabbox.forEach(elem => {
                elem.classList.remove('active');
            });
            e.target.classList.add('active');
        },
        //공공팝업 레이어
        openPublicPopup(type, e, data) {
            if (type === 'open') {
                this.publicLayer = true;
                this.popData = publicPopup[data];
                if (window.innerWidth > 1189) {
                    this.$nextTick(function() {
                        console.log(e.target.getBoundingClientRect().top, e.target.offsetTop);
                        this.publicTop = Math.abs(document.querySelector('.pagelayout').getBoundingClientRect().top + 10) + (e.target.getBoundingClientRect().top - this.$refs.layercon.$el.clientHeight) ;
                    });
                } else {
                    this.publicTop = 0;
                    document.querySelector('#wrap').classList.add('modalOpen');
                }
                
            } else if (type === 'close') {
                document.querySelector('#wrap').classList.remove('modalOpen');
                this.publicLayer = false;
                this.publicTop = 0;
            }
        },
        //외부링크
        excuteOutLink(link) {
            window.open(link);
        },
        //모바일 ==> 웹 리사이징 
        handleResize() {
            if (window.innerWidth > 1190) {
                if (this.publicLayer === true) {
                    this.publicLayer = false;
                    document.querySelector('#wrap').classList.remove('modalOpen');
                }
            }
        }
    }
};
</script>