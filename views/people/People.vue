<template>
    <section class="people">
        <div class="mainTitle">
			<h1 class="titdepth1">인구</h1>
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
                                            <div role="button" class="row" @click="SearchSelect($event, '서울 강남구')">서울 <span>강</span>남구</div>
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
            <div class="topranking">
                <button type="button" class="btntoprank iconrecent arw" :class="{down:!recentView, up:recentView}" @click="SelectToggle('recentView')">최근 조회지역</button>
                <div class="toprankingbox">
                    <div class="titbox iconrecent">최근 조회지역</div>
                    <div class="btnstop5">
                        <button type="button">1.경기 화성시</button>
                        <button type="button">2.경기 평택시</button>
                        <button type="button">3.인천 남동구</button>
                        <button type="button">4.경기 파주시</button>
                        <button type="button">5.인천 서구</button>
                    </div>
                    <!-- 최근 조회된 지역이 없을 때
                    <div class="nodatabox">
                        최근 조회 지역이 없습니다.
                    </div> -->
                </div>
            </div>
        </div>
        <div class="cardCaptureBox">
            <ChartOption
                :optionList="optionList"
                @print="cardOption('print')"
                @capture="cardOption('capture')"
            />
            <div class="cardbox cardCapture">
                <div class="cardtit tradingtit">
                    <h1 class="titdepth2">인구 현황</h1>
                </div>
                <TabContent
                    :tabcontentname="'인구 현황'"
                    :tabsublist="'tabbox tabtype3 submenu'"
                    :tabtexts="tabtextsType1"
                    v-on:tabactive="tabClick"
                >
                    <template slot="tabsubtnArea">
                        <div class="listbtn type1">
                            <button class="btn textline" @click="subTabActive($event,'.type1','년별');">년별</button>
                            <button class="btn textline" @click="subTabActive($event,'.type1','분기별');">분기별</button>
                            <button class="btn textline" @click="subTabActive($event,'.type1','월별');">월별</button>
                            <div :class="['pickerarea', {active:monthAcitve1},{select:openPicker1}]">
                                <div class="pickerselect-text">
                                    <template v-if="starttime1.length > 0">
                                        {{starttime1[0]}}~{{starttime1[1]}}
                                    </template>
                                </div>
                                <button :class="['iconbtn btn-picker', {active:monthAcitve1}]" @click="togglePicker('type2')" />
                            </div>
                            <!-- 날짜선택 -->
                            <div class="pickerlayer lineLayer" v-if="openPicker1">
                                <div class="pickerTit">
                                    기간선택
                                    <div class="rangevalue">
                                        <span>{{starttime1[0]}}~{{starttime1[1]}}</span>
                                    </div>
                                    <button class="btn btn-popclose" @click="togglePicker('type2')"></button>
                                </div>
                                <div class="rangeTit">
                                    <div>시작</div>
                                    <div>종료</div>
                                </div>
                                <DatePicker
                                    inline
                                    range
                                    type="month"
                                    v-model="starttime1"
                                    format="YY/MM"
                                    value-type="format"
                                    :lang="customLang"
                                    @change="handleChange('type2')"
                                />
                                <div class="btmlocbtn">
                                        <button class="btn btn-reset">초기화</button>
                                    <button class="btn btn-round cancel" @click="togglePicker('type2')">취소</button>
                                    <button class="btn btn-round confirm" @click="togglePicker('type2')">확인</button>
                                </div>
                            </div>
                        </div>
                    </template>
                    <template slot="panel">
                        <div class="tabcon" role="tabpanel" v-if="tabnum===0">
                            <div class="holdcon">
                                <div class="chartlegend type2">
                                    <span class="legend stick-63e6be">인구</span>
                                    <span class="legend linedarkblue">변동률</span>
                                </div>
                                <div class="unittextbox between">
                                    <span>단위:명</span>
                                    <span>변동률(%)</span>
                                </div>
                                <!-- 차트영역 -->
                                <div class="chartbox" style="height:370px;">
                                    <!-- 모바일의 경우 (해상도 1189이하 부터) 해당 툴팁 표기 -->
                                    <div class="chartTip tradingtip mobile" style="top:-140px;">
                                        <p class="tx1">2021년 3월 인구</p>
                                        <p class="tx2">1,234만명</p>
                                        <div class="linebox botnoline">
                                            <p class="txbar">전원대비:<span class="ico numdown"></span>12.3%(<span class="ico numdown"></span>1,23만명)</p>
                                        </div>
                                    </div>
                                    <!--웹의 경우 (해상도 1190이상 부터) 해당 차트 내 툴팁 표기 -->
                                    <div class="chartTip tradingtip " style="top:30px;left:50px">
                                        <p class="tx1">2021년 3월 인구</p>
                                        <p class="tx2">1,234만명</p>
                                        <div class="linebox botnoline">
                                            <p class="txbar">전원대비:<span class="ico numdown"></span>12.3%(<span class="ico numdown"></span>1,23만명)</p>
                                        </div>
                                    </div>
                                    <div class="nodata"></div>
                                    <span class="watermark horizongray"></span>
                                </div>
                                <!-- 테이블 -->
                                <div class="tradingtable people">
                                    <div class="tablelabel">
                                        <span>구분</span>
                                        <span>인구</span><!-- 2022.03.14 퍼블수정 / 텍스트 수정 -->
                                        <span>변동률(%)</span>
                                    </div>
                                    <jQueryScrollbar  style="width:100%;" :useCtrl="{direction: 'x' }">
                                        <div class="scrollin-pir">
                                            <div class="tablelbody">
                                                <div class="tablelow">
                                                    <span class="day" v-for="(day, index) in tradingdays" :key="index"  v-html="day.day" :class="{selected:index == 3}"></span>
                                                </div>
                                                <div class="tablelow"  v-for="(item, index) in tradingdatas" :key="index">
                                                    <span class="datavalue" v-for="(data, index) in item.data" :key="index" v-html="data.value"  :class="{selected:index == 3}"></span>
                                                </div>
                                            </div>
                                        </div>
                                    </jQueryScrollbar>
                                </div>
                                <div class="textbox">
                                    <span role="button" class="btn-statistics iconsource" @click="openPublicPopup('open',$event,'peopleType1')">출처 : 국가통계 포털</span>
                                </div>
                            </div>
                            
                        </div>
                        <div class="tabcon" role="tabpanel" v-if="tabnum===1">
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
                                                <input type="checkbox" id="changeRatio1">
                                                <label for="changeRatio1" class="switch"><span class="txt">증감률</span></label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="unittextbox right">
                                    <span>단위: 만명</span>
                                </div>
                                <!-- 차트영역 -->
                                <div class="barchertArea" style="height:348px;position:relative">
                                    <!-- 모바일의 경우 (해상도 1189이하 부터) 해당 툴팁 표기 -->
                                    <div class="chartTip tradingtip mobile" style="top:-140px; ">
                                        <p class="tx1">2025년 가구 수(추계)</p>
                                        <p class="tx2">1,234만명</p>
                                        <div class="linebox botnoline">
                                            <span class="legendlist householdtype7">70세 이상:123만명(12.3%)</span>
                                            <span class="legendlist householdtype6">60대:123만명(12.3%)</span>
                                            <span class="legendlist householdtype5">50대:123만명(12.3%)</span>
                                            <span class="legendlist householdtype4">40대:123만명(12.3%)</span>
                                            <span class="legendlist householdtype3">30대:123만명(12.3%)</span>
                                            <span class="legendlist householdtype2">20대:123만명(12.3%)</span>
                                            <span class="legendlist householdtype1">19세 이하:123만명(12.3%)</span>
                                        </div>
                                    </div>
                                    <!--웹의 경우 (해상도 1190이상 부터) 해당 차트 내 툴팁 표기 -->
                                    <div class="chartTip tradingtip" style="top:0; left:50px;">
                                        <p class="tx1">2025년 가구 수(추계)</p>
                                        <p class="tx2">1,234만명</p>
                                        <div class="linebox botnoline">
                                            <span class="legendlist householdtype7">70세 이상:123만명(12.3%)</span>
                                            <span class="legendlist householdtype6">60대:123만명(12.3%)</span>
                                            <span class="legendlist householdtype5">50대:123만명(12.3%)</span>
                                            <span class="legendlist householdtype4">40대:123만명(12.3%)</span>
                                            <span class="legendlist householdtype3">30대:123만명(12.3%)</span>
                                            <span class="legendlist householdtype2">20대:123만명(12.3%)</span>
                                            <span class="legendlist householdtype1">19세 이하:123만명(12.3%)</span>
                                        </div>
                                    </div>
                                    <!-- svg차트 -->
                                    <div class="barchertbox">
                                        <span title="워터마크" class="watermark horizongray"></span>
                                    </div>
                                </div>

                                <div class="textbox">
                                    <span role="button" class="btn-statistics iconsource" @click="openPublicPopup('open',$event,'peopleType1')">출처 : 국가통계 포털</span>
                                </div>
                            </div>
                        </div>
                    </template>
                </TabContent>
            </div>
        </div>
        <div class="cardCaptureBox">
            <ChartOption
                :optionList="optionList"
                @print="cardOption('print')"
                @capture="cardOption('capture')"
            />
            <div class="cardbox cardCaptur">
                <div class="cardtit tradingtit">
                    <h1 class="titdepth2">미래 인구 전망(추계)</h1>
                    <!-- 지역명이 표기되는 경우 -->
                    <!-- <h1 class="titdepth2"><span class="colortype-4281ff">서울</span>미래 인구 전망(추계)</h1> -->
                </div>
                <TabContent
                    :tabcontentname="'인구 전망(추계)'"
                    :tabsublist="'tabbox tabtype4 small'"
                    :tabtexts="tabtextsType2"
                    v-on:tabactive="tabClick"
                >
                    
                    <template slot="panel">
                        <div class="tabcon" role="tabpanel" v-if="tabnum1===0">
                            <div class="holdcon">
                                <div class="chartlegend type2"> <!-- 2022.03.14 퍼블수정 / 총인구 범례추가-->
                                    <span class="legend stick-63e6be">인구</span>
                                    <span class="legend line-f06595">성장률</span> <!-- 클래스명 변경 22.04.13 -->
                                </div>
                                <div class="unittextbox between">
                                    <span>단위:만명</span>
                                    <span>인구성장률 (%)</span>
                                </div>
                                <!-- 차트영역 -->
                                <div class="chartbox" style="height:370px;">
                                    <!-- 모바일의 경우 (해상도 767이하 부터) 해당 툴팁 표기 -->
                                    <div class="chartTip tradingtip mobile" style="top:-52px;">
                                        <p class="tx1">2032년 인구(추계)</p>
                                        <p class="tx2">1,234만명</p>
                                    </div>
                                    <div class="nodata"></div>
                                    <span class="watermark horizongray"></span>
                                    <!--웹의 경우 (해상도 768이상 부터) 해당 차트 내 툴팁 표기 -->
                                    <div class="chartTip tradingtip " style="top:30px;left:50px">
                                        <p class="tx1">2032년 인구(추계)</p>
                                        <p class="tx2">1,234만명</p>
                                    </div>
                                </div>
                                <!-- 테이블 -->
                                <div class="tradingtable people">
                                    <div class="tablelabel">
                                        <span>구분</span>
                                        <span>인구(만명)</span>
                                        <span>변동률(%)</span>
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
                                            </div>
                                        </div>
                                    </jQueryScrollbar>
                                </div>
                                <div class="textbox between type1">
                                    <span class="iconinfo3">1970~2017년의 값은 과거 실제 통계를 기반한 수치입니다.</span>
                                    <span role="button" class="btn-statistics iconsource" @click="openPublicPopup('open',$event, 'peopleType2')">출처 : 국가통계 포털</span>
                                </div>
                            </div>
                        </div>
                        <div class="tabcon" role="tabpanel" v-if="tabnum1===1">
                            <div class="holdcon">
                                <div class="checkedlegend">
                                    <button class="btn-check householdtype1 active">19세 이하</button>
                                    <button class="btn-check householdtype2 active">20대</button>
                                    <button class="btn-check householdtype3 active">30대</button>
                                    <button class="btn-check householdtype4 active">40대</button>
                                    <button class="btn-check householdtype5 active">50대</button>
                                    <button class="btn-check householdtype6 active">60대</button>
                                    <button class="btn-check householdtype7 active">70세 이상</button>
                                    <div class="unittextbox fr">
                                    <span class="iconinfo3">인구 전망은 시/도 단위까지 조회가 가능합니다.</span>
                                </div>
                                </div>
                                <div class="unittextbox right">
                                    <span>단위: 만명</span>
                                </div>
                                <!-- 차트영역 -->
                                <div class="barchertArea" style="height:348px;position:relative">
                                    <!-- 모바일의 경우 (해상도 767이하 부터) 해당 툴팁 표기 -->
                                    <div class="chartTip tradingtip mobile" style="top:-115px;">
                                        <p class="tx1">2025년 가구 수(추계)</p>
                                        <p class="tx2">1,234만명</p>
                                        <div class="linebox botnoline">
                                            <span class="legendlist householdtype7">70세 이상:123만명(12.3%)</span>
                                            <span class="legendlist householdtype6">60대:123만명(12.3%)</span>
                                            <span class="legendlist householdtype5">50대:123만명(12.3%)</span>
                                            <span class="legendlist householdtype4">40대:123만명(12.3%)</span>
                                            <span class="legendlist householdtype3">30대:123만명(12.3%)</span>
                                            <span class="legendlist householdtype2">20대:123만명(12.3%)</span>
                                            <span class="legendlist householdtype1">19세 이하:123만명(12.3%)</span>
                                        </div>
                                    </div>
                                    <!--웹의 경우 (해상도 768이상 부터) 해당 차트 내 툴팁 표기 -->
                                    <div class="chartTip tradingtip" style="top:0; left:50px;">
                                        <p class="tx1">2025년 가구 수(추계)</p>
                                        <p class="tx2">1,234만명</p>
                                        <div class="linebox botnoline">
                                            <span class="legendlist householdtype7">70세 이상:123만명(12.3%)</span>
                                            <span class="legendlist householdtype6">60대:123만명(12.3%)</span>
                                            <span class="legendlist householdtype5">50대:123만명(12.3%)</span>
                                            <span class="legendlist householdtype4">40대:123만명(12.3%)</span>
                                            <span class="legendlist householdtype3">30대:123만명(12.3%)</span>
                                            <span class="legendlist householdtype2">20대:123만명(12.3%)</span>
                                            <span class="legendlist householdtype1">19세 이하:123만명(12.3%)</span>
                                        </div>
                                    </div>
                                    <!-- svg차트 -->
                                    <div class="barchertbox">
                                        <span title="워터마크" class="watermark horizongray"></span>
                                    </div>
                                </div>

                                <div class="textbox between type1">
                                    <span class="iconinfo3">1970~2017년의 값은 과거 실제 통계를 기반한 수치입니다.</span>
                                    <span role="button" class="btn-statistics iconsource" @click="openPublicPopup('open',$event, 'peopleType2')">출처 : 국가통계 포털</span>
                                </div>
                            </div>
                        </div>
                        <div class="tabcon" role="tabpanel" v-if="tabnum1===2">
                            <div class="holdcon">
                                <div class="chartlegend type2">
                                    <span class="legend stick-8ce99a">유소년 인구(14세 이하)</span>
                                    <span class="legend stick-66d9e8">생산연령 인구(15세~64세)</span>
                                    <span class="legend stick-c9b89b">고령인구(65세 이상)</span>
                                    <span class="legend line-f06595">노령화 지수</span> <!-- 클래스명 변경 22.04.13 -->
                                    <!--  해당 텍스트는 지역선택에 시군구 선택시 보여지는 텍스트-->
                                    <div class="unittextbox fr">
                                        <span class="iconinfo3">인구 전망은 시/도 단위까지 조회가 가능합니다.</span>
                                    </div>
                                </div>
                                <div class="unittextbox between">
                                    <span>인구 비율(%)</span>
                                    <span>노령화 지수</span>
                                </div>
                                <!-- 차트영역 -->
                                <div class="chartbox" style="height:370px;">
                                    <div class="nodata"></div>
                                    <span class="watermark horizongray"></span>
                                    <!-- 모바일의 경우 (해상도 767이하 부터) 해당 툴팁 표기 -->
                                    <div class="chartTip tradingtip mobile" style="top:-101px;">
                                        <p class="tx1">2030년 인구 (추계)</p>
                                        <p class="tx2">123만명</p>
                                        <div class="linebox botnoline">
                                            <p class="txbar">유소년 인구  : 12.3% (1,234만명)</p>
                                            <p class="txbar">생산연령인구 : 12.3% (1,234만명)</p>
                                            <p class="txbar">고령인구 : 12.3% (1,234만명)</p>
                                        </div>
                                    </div>
                                    <!--웹의 경우 (해상도 768이상 부터) 해당 차트 내 툴팁 표기 -->
                                    <div class="chartTip tradingtip " style="top:30px;left:50px">
                                        <p class="tx1">2030년 인구 (추계)</p>
                                        <p class="tx2">123만명</p>
                                        <div class="linebox botnoline">
                                            <p class="txbar">유소년 인구  : 12.3% (1,234만명)</p>
                                            <p class="txbar">생산연령인구 : 12.3% (1,234만명)</p>
                                            <p class="txbar">고령인구 : 12.3% (1,234만명)</p>
                                        </div>
                                    </div>
                                </div>

                                <!-- <div class="textbox between type1">
                                    <span class="tablebottex iconinfo3">1970~2017년의 값은 과거 실제 통계를 기반한 수치입니다.</span>
                                    <span role="button" class="btn-statistics iconsource">출처 : 국가통계 포털</span>
                                </div> -->

                                <!-- 테이블 -->
                                <div class="tradingtable people">
                                    <div class="tablelabel">
                                        <span>구분</span>
                                        <span>유소년</span>
                                        <span>생산연령</span>
                                        <span>노인</span>
                                        <span class="bgclass">노령화지수</span>
                                    </div>
                                    <jQueryScrollbar  style="width:100%;">
                                        <div class="scrollin-pir">
                                            <div class="tablelbody">
                                                <div class="tablelow">
                                                    <span class="day" v-for="(day, index) in tradingdays" :key="index"  v-html="day.day" :class="{selected:index == 3}"></span>
                                                </div>
                                                <div class="tablelow"  :class="{bgclass:item.location==='노령화지수'}"  v-for="(item, index) in tradingdatas2" :key="index">
                                                    <span class="datavalue" v-for="(data, index) in item.data" :key="index" v-html="data.value"  :class="{selected:index == 3}"></span>
                                                </div>
                                            </div>
                                        </div>
                                    </jQueryScrollbar>
                                </div>

                                <div class="textbox between type1">
                                    <div class="iconinfo3">
                                        <ul class="dotlist">
                                            <li>노령화 지수 : 고령인구 (65세 이상) ÷ 유소년 인구 (14세 이하) × 100</li>
                                            <li>1970년 ~2067년의 값은 과거 실제 통계에 기반한 수치입니다.</li>
                                        </ul>
                                    </div>
                                    <span role="button" class="btn-statistics iconsource" @click="openPublicPopup('open',$event, 'peopleType2')">출처 : 국가통계 포털</span>
                                </div>
                            </div>
                        </div>
                    </template>
                </TabContent>
            </div>
        </div>
        <div class="cardCaptureBox">
            <ChartOption
                :optionList="optionList"
                @print="cardOption('print')"
                @capture="cardOption('capture')"
            />
            <div class="cardbox cardCapture">
                <div class="cardtit tradingtit">
                    <h1 class="titdepth2">인구 이동</h1>
                </div>
                <TabContent
                    :tabcontentname="'인구 이동'"
                    :tabsublist="'tabbox tabtype3 submenu'"
                    :tabtexts="tabtextsType3"
                    v-on:tabactive="tabClick"
                >
                    <template slot="tabsubtnArea">
                        <div class="listbtn type2">
                            <button class="btn textline" @click="subTabActive($event,'.type2','년별');">년별</button>
                            <button class="btn textline" @click="subTabActive($event,'.type2','분기별');">분기별</button>
                            <button class="btn textline" @click="subTabActive($event,'.type2','월별');">월별</button>
                            <div :class="['pickerarea', {active:monthAcitve},{select:openPicker}]">
                                <div class="pickerselect-text">
                                    <template v-if="starttime2.length > 0">
                                        {{starttime2[0]}}~{{starttime2[1]}}
                                    </template>
                                </div>
                                <button :class="['iconbtn btn-picker', {active:monthAcitve}]" @click="togglePicker('type1')" />
                            </div>
                            <!-- 날짜선택 -->
                            <div class="pickerlayer lineLayer" v-if="openPicker">
                                <div class="pickerTit">
                                    기간선택
                                    <div class="rangevalue">
                                        <span>{{starttime2[0]}}~{{starttime2[1]}}</span>
                                    </div>
                                    <button class="btn btn-popclose" @click="togglePicker('type1')"></button>
                                </div>
                                <div class="rangeTit">
                                    <div>시작</div>
                                    <div>종료</div>
                                </div>
                                <DatePicker
                                    inline
                                    range
                                    type="month"
                                    v-model="starttime2"
                                    format="YY/MM"
                                    value-type="format"
                                    :lang="customLang"
                                    @change="handleChange('type1')"
                                />
                                <div class="btmlocbtn">
                                    <button class="btn btn-reset">초기화</button>
                                    <button class="btn btn-round cancel" @click="togglePicker('type1')">취소</button>
                                    <button class="btn btn-round confirm" @click="togglePicker('type1')">확인</button>
                                </div>
                            </div>
                        </div>
                    </template>
                    <template slot="panel">
                        <div class="tabcon" role="tabpanel" v-if="tabnum2===0">
                            <div class="holdcon">
                                <div class="listradiogroup">
                                    <label for="all" class="custom-radio custom-control"><input type="radio" name="time" id="all"><span>전체</span></label>
                                    <label for="sido1" class="custom-radio custom-control"><input type="radio" name="time" id="sido1"><span>시도내</span></label>
                                    <label for="sido2" class="custom-radio custom-control"><input type="radio" name="time" id="sido2"><span>시도간</span></label>
                                </div>
                                <div class="chartlegend type2">
                                    <span class="legend stick-ff8787">전입</span>
                                    <span class="legend stickblue">전출</span>
                                    <span class="legend line-ffca28">순 인구이동</span>
                                </div>
                                <div class="unittextbox between">
                                    <span>전/출입(만명)</span>
                                    <span>순 인구이동(만명)</span>
                                </div>
                                <!-- 차트영역 -->
                                <div class="chartbox" style="height:370px;">
                                    <div class="nodata"></div>
                                    <span class="watermark horizongray"></span>
                                    <!-- 모바일의 경우 (해상도 767이하 부터) 해당 툴팁 표기 -->
                                    <div class="chartTip tradingtip mobile" style="top:-199px;">
                                        <p class="tx1">2021년 1월 순이동</p>
                                        <p class="tx2">123만명</p>
                                        <div class="linebox botnoline">
                                            <p class="txbar">전입  : 123만명</p>
                                            <p class="txbar">전출 : 123만명 </p>
                                        </div>
                                    </div>
                                    <div class="chartTip tradingtip " style="top:30px;left:50px">
                                        <p class="tx1">2021년 1월 순이동</p>
                                        <p class="tx2">123만명</p>
                                        <div class="linebox botnoline">
                                            <p class="txbar">전입  : 123만명</p>
                                            <p class="txbar">전출 : 123만명 </p>
                                        </div>
                                    </div>
                                </div>
                                <!-- 테이블 -->
                                <div class="tradingtable people move">
                                    <div class="tablelabel">
                                        <span class="labelH">구분</span>
                                        <span>전체</span>
                                        <span>시도내</span>
                                        <span>시도간</span>
                                    </div>
                                    <jQueryScrollbar  style="width:100%;">
                                        <div class="scrollin-pir">
                                            <div class="tablelbody">
                                                <div class="tablelow">
                                                    <span class="daygroup" v-for="(day, index) in movemonthdatas" :key="index" >
                                                        <span class="yearmonth" v-html="day.day"></span>
                                                        <span class="typegroup">
                                                            <span>전입</span>
                                                            <span>전출</span>
                                                            <span>순이동</span>
                                                        </span>
                                                    </span>
                                                </div>
                                                <div class="tablelow"  v-for="(item, index) in movedatas" :key="index">
                                                    <span class="valuegroup" v-for="(data, index) in item.daylists" :key="index">
                                                        <span class="datavalue" v-for="(value, idx) in data.data"  v-html="value.value" :key="idx"></span>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </jQueryScrollbar>
                                </div>
                                <div class="textbox">
                                   <span role="button" class="btn-statistics iconsource" @click="openPublicPopup('open',$event, 'peopleType3')">출처 : 국가통계 포털</span>
                                </div>
                            </div>
                            
                        </div>
                        <div class="tabcon" role="tabpanel" v-if="tabnum2===1">
                            <div class="holdcon">
                                <div class="checkedlegend">
                                    <button class="btn-check active" @click="activeToggle($event, 'active')">19세 이하</button>
                                    <button class="btn-check active" @click="activeToggle($event, 'active')">20대</button>
                                    <button class="btn-check active" @click="activeToggle($event, 'active')">30대</button>
                                    <button class="btn-check active" @click="activeToggle($event, 'active')">40대</button>
                                    <button class="btn-check active" @click="activeToggle($event, 'active')">50대</button>
                                    <button class="btn-check active" @click="activeToggle($event, 'active')">60대</button>
                                    <button class="btn-check active" @click="activeToggle($event, 'active')">70세 이상</button>
                                    <div class="rangelegend">
                                        <div class="switchwrap">
                                            하나씩 보기
                                            <div class="switch-button custom-control sm">
                                                <input type="checkbox" id="changeRatio1">
                                                <label for="changeRatio1" class="switch"><span class="txt">증감률</span></label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="chartlegend type2">
                                    <span class="legend stick-ff8787">전입</span>
                                    <span class="legend stickblue">전출</span>
                                    <span class="legend line-ffca28">순 인구이동</span>
                                </div>
                                <div class="unittextbox between">
                                    <span>전/출입(만명)</span>
                                    <span>순 인구이동(만명)</span>
                                </div>
                                <!-- 차트영역 -->
                                <div class="chartbox" style="height:376px;">
                                    <div class="nodata"></div>
                                    <span class="watermark horizongray"></span>
                                    <!-- 모바일의 경우 (해상도 767이하 부터) 해당 툴팁 표기 -->
                                    <div class="chartTip tradingtip mobile" style="top:-199px">
                                        <p class="tx1">2021년 1월 순이동</p>
                                        <p class="tx2">123만명</p>
                                        <div class="linebox botnoline">
                                            <p class="txbar">전입  : 123만명</p>
                                            <p class="txbar">전출 : 123만명 </p>
                                        </div>
                                    </div>
                                    <div class="chartTip tradingtip " style="top:30px;left:50px">
                                        <p class="tx1">2021년 1월 순이동</p>
                                        <p class="tx2">123만명</p>
                                        <div class="linebox botnoline">
                                            <p class="txbar">전입  : 123만명</p>
                                            <p class="txbar">전출 : 123만명 </p>
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="textbox"><span role="button" class="btn-statistics iconsource" @click="openPublicPopup('open',$event, 'peopleType3')">출처 : 국가통계 포털</span></div>
                            </div>
                        </div>
                    </template>
                </TabContent>
            </div>
        </div>
        <div class="cardCaptureBox">
            <ChartOption
                :optionList="optionList"
                @print="cardOption('print')"
                @capture="cardOption('capture')"
            />
            <div class="cardbox cardCapture">
                <div class="cardtit tradingtit">
                    <h1 class="titdepth2">전입사유별 현황</h1>
                </div>
                <TabContent
                    :tabcontentname="'전입사유별 현황'"
                    :tabsublist="'tabbox tabtype4'"
                    :tabtexts="tabtextsType4"
                    v-on:tabactive="tabClick"
                >
                    
                    <template slot="panel">
                        <div class="tabcon" role="tabpanel" v-if="tabnum3===0">
                            <div class="holdcon">
                                <div class="checkedlegend">
                                    <button class="btn-check movetype1 active" @click="activeToggle($event, 'active')">직업</button>
                                    <button class="btn-check movetype2 active" @click="activeToggle($event, 'active')">가족</button>
                                    <button class="btn-check movetype3 active" @click="activeToggle($event, 'active')">주택</button>
                                    <button class="btn-check movetype4 active" @click="activeToggle($event, 'active')">교육</button>
                                    <button class="btn-check movetype5 active" @click="activeToggle($event, 'active')">주거환경</button>
                                    <button class="btn-check movetype6 active" @click="activeToggle($event, 'active')">자연환경</button>
                                    <button class="btn-check movetype7 active" @click="activeToggle($event, 'active')">기타</button>
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
                                    <span>단위: 만명</span>
                                </div>
                                <!-- 차트영역 -->
                                <div class="chartbox" style="height:370px;">
                                    <!-- 모바일의 경우 (해상도 1189이하 부터) 해당 툴팁 표기 -->
                                    <div class="chartTip tradingtip mobile" style="top:-140px; ">
                                        <p class="tx1">2020년 전입자 수</p>
                                        <p class="tx2">1,234만명</p>
                                        <div class="linebox botnoline">
                                            <span class="legendlist housemovetype7">직업:123만명(12.3%)</span>
                                            <span class="legendlist housemovetype6">가족:123만명(12.3%)</span>
                                            <span class="legendlist housemovetype5">주택:123만명(12.3%)</span>
                                            <span class="legendlist housemovetype4">교육:123만명(12.3%)</span>
                                            <span class="legendlist housemovetype3">주거환경:123만명(12.3%)</span>
                                            <span class="legendlist housemovetype2">자연환경:123만명(12.3%)</span>
                                            <span class="legendlist housemovetype1">기타:123만명(12.3%)</span>
                                        </div>
                                    </div>
                                    <!--웹의 경우 (해상도 1190이상 부터) 해당 차트 내 툴팁 표기 -->
                                    <div class="chartTip tradingtip" style="top:0; left:50px;">
                                        <p class="tx1">2020년 전입자 수</p>
                                        <p class="tx2">1,234만명</p>
                                        <div class="linebox botnoline">
                                            <span class="legendlist housemovetype7">직업:123만명(12.3%)</span>
                                            <span class="legendlist housemovetype6">가족:123만명(12.3%)</span>
                                            <span class="legendlist housemovetype5">주택:123만명(12.3%)</span>
                                            <span class="legendlist housemovetype4">교육:123만명(12.3%)</span>
                                            <span class="legendlist housemovetype3">주거환경:123만명(12.3%)</span>
                                            <span class="legendlist housemovetype2">자연환경:123만명(12.3%)</span>
                                            <span class="legendlist housemovetype1">기타:123만명(12.3%)</span>
                                        </div>
                                    </div>
                                    <div class="nodata"></div>
                                    <span class="watermark horizongray"></span>
                                </div>
                                <!-- 테이블 -->
                                <div class="tradingtable house">
                                    <div class="tablelabel">
                                        <span>구분</span>
                                        <span>직업</span>
                                        <span>가족</span>
                                        <span>주택</span>
                                        <span>교육</span>
                                        <span>주거환경</span>
                                        <span>자연환경</span>
                                        <span>기타</span>
                                        <span>합계</span>
                                    </div>
                                    <jQueryScrollbar  style="width:100%;">
                                        <div class="scrollin-pir">
                                            <div class="tablelbody">
                                                <div class="tablelow">
                                                    <span class="day" v-for="(day, index) in tradingdays" :key="index"  v-html="day.day" :class="{selected:index == 3}"></span>
                                                </div>
                                                <div class="tablelow"  v-for="(item, index) in tradingdatas1" :key="index">
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
                                    <span role="button" class="btn-statistics iconsource"  @click="openPublicPopup('open',$event, 'peopleType4')">출처 : 국가통계 포털</span>
                                </div>
                            </div>
                            
                        </div>
                        <div class="tabcon" role="tabpanel" v-if="tabnum3===1">
                            <div class="holdcon">
                                <div class="listradiogroup">
                                    <label for="job" class="custom-radio custom-control"><input type="radio" name="time1" id="job"><span>직업</span></label>
                                    <label for="family" class="custom-radio custom-control"><input type="radio" name="time1" id="family"><span>가족</span></label>
                                    <label for="edu" class="custom-radio custom-control"><input type="radio" name="time1" id="edu"><span>교육</span></label>
                                    <label for="living" class="custom-radio custom-control"><input type="radio" name="time1" id="living"><span>주거환경</span></label>
                                    <label for="natural" class="custom-radio custom-control"><input type="radio" name="time1" id="natural"><span>자연환경</span></label>
                                    <label for="etc" class="custom-radio custom-control"><input type="radio" name="time1" id="etc"><span>기타</span></label>
                                </div>
                                <div class="chartlegend type2">
                                    <span class="legend stick-00d0e1">종로구</span>
                                    <span class="legend stick-b2ebf2">서울</span>
                                </div>
                                <div class="unittextbox right"><span>단위: %</span></div>
                                <!-- 차트영역 -->
                                <div class="chartbox" style="height:370px;">
                                    <div class="nodata"></div>
                                    <span class="watermark horizongray"></span>
                                    <!-- 모바일의 경우 (해상도 767이하 부터) 해당 툴팁 표기 -->
                                    <div class="chartTip tradingtip mobile" style="top:-148px">
                                        <p class="tx1">2015년 “직업” 사유 전입자 비율</p>
                                        <div class="linebox botnoline">
                                            <p class="txbar">서울 종로구 : 12.3%</p>
                                            <p class="txbar">서울 : 11.2%</p>
                                        </div>
                                    </div>
                                    <div class="chartTip tradingtip " style="top:30px;left:50px">
                                        <p class="tx1">2015년 “직업” 사유 전입자 비율</p>
                                        <div class="linebox botnoline">
                                            <p class="txbar">서울 종로구 : 12.3%</p>
                                            <p class="txbar">서울 : 11.2%</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="unittextbox right"><span>※차이 (%p) = 서울 종로구 - 서울</span></div>
                                <div class="textbox"><span role="button" class="btn-statistics iconsource"  @click="openPublicPopup('open',$event, 'peopleType4')">출처 :국가통계 포털</span></div>
                            </div>
                        </div>
                    </template>
                </TabContent>
            </div>
        </div>
        <div class="cardCaptureBox">
            <ChartOption
                :optionList="optionList"
                @print="cardOption('print')"
                @capture="cardOption('capture')"
            />
            <div class="cardbox cardCapture">
                <div class="cardtit tradingtit">
                    <h1 class="titdepth2">
                        <span class="colortype-4281ff">종로구</span> 전출입 순위
                        <button type="button" class="btn-tooltip" @click="TipToggle('guidetip1',guidetip1 )">툴팁보기</button>
                        <div role="tooltip" class="tooltip bottom ranktooltip"  v-if="guidetip1"> <!-- 2022.03.14 퍼블수정 / style="width:322px" 삭제-->
                            <div class="flexbox">
                                <p>해당 지역에서(으로) 전출(전입)한 지역별 인구 수 순위입니다.</p>
                                <button type="button" title="툴팁닫기" class="tipclose" @click="TipToggle('guidetip1',guidetip1 )"></button>
                            </div>
                        </div>
                    </h1>
                </div>
                <TabContent
                    :tabcontentname="'전출입 순위'"
                    :tabsublist="'tabbox tabtype4'"
                    :tabtexts="tabtextsType5"
                    v-on:tabactive="tabClick"
                >
                    
                    <template slot="panel">
                        <div class="tabcon" role="tabpanel" v-if="tabnum4===0">
                            <div class="holdcon">
                                <div class="unittextbox right">
                                    <span>단위: 만명</span>
                                </div>
                                <!-- 차트영역 -->
                                <div class="chartbox" style="height:370px;">
                                    <div class="nodata"></div>
                                    <span class="watermark horizongray"></span>
                                </div>
                                <div class="rangecontent trading-range">
                                    <div class="rangebtns">
                                        <!-- 재생 클릭시 / 일지정지로 변경 (stop 클래스 추가)-->
                                        <button type="button" class="btn btn-play">재생</button>
                                    </div>
                                    <RangeSlider
                                        v-model="datevalue"
                                        :marks="true"
                                        :data="rangelists"
                                    />
                                </div>
                                <!-- 2022.02.09 출처버튼 삭제-->
                            </div>
                            
                        </div>
                        <div class="tabcon" role="tabpanel" v-if="tabnum4===1">
                            전출Top 영역
                        </div>
                    </template>
                </TabContent>
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
import ChartOption from '@/components/elements/ChartOption.vue';
import Location from '@/components/elements/Location.vue';
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
            //picker  데이터
            monthAcitve1: false,
            monthAcitve: false,
            openPicker1: false,
            openPicker: false,
            starttime1: ['21/05', '21/12'],
            starttime2: ['21/05', '21/12'],
            //range 데이터
            datevalue: ['10월'],
            rangelists: ['8월', '9월', '10월', '11월', '12월', '1월', '2월', '3월', '4월', '5월', '6월', '7월'],
            //picker 데이터 포맷
            customLang: {
                months: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
            },
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
            //  탭데이터
            tabnum: 0,
            tabtextsType1: ['전체인구', '연령별 인구'],
            tabnum1: 0,
            tabtextsType2: ['총 인구(전국)', '연령별', '연령계층별 비율'],
            tabnum2: 0,
            tabtextsType3: ['전출입', '연령별 전출입'],
            tabnum3: 0,
            tabtextsType4: ['전입사유별', '상위 지역 비교'],
            tabtextsType5: ['전입Top', '전출Top'],
            tabnum4: 0,
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
            //테이블 데이터
            tradingdatas: [
                {
                    location: '인구',
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
                    location: '변동률',
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
            //테이블 데이터
            tradingdatas2: [
                {
                    location: '유소년',
                    data: [
                        {day: '20.07', value: '12.3%'},
                        {day: '20.08', value: '12.3%'},
                        {day: '20.09', value: '12.3%'},
                        {day: '20.10', value: '12.3%'},
                        {day: '20.11', value: '12.3%'},
                        {day: '20.12', value: '12.3%'},
                        {day: '21.01', value: '12.3%'},
                        {day: '21.02', value: '12.3%'},
                        {day: '21.03', value: '12.3%'},
                        {day: '21.04', value: '12.3%'},
                        {day: '21.05', value: '12.3%'},
                        {day: '21.06', value: '12.3%'},
                        {day: '21.07', value: '12.3%'},
                        {day: '21.08', value: '12.3%'},
                        {day: '21.09', value: '12.3%'},
                        {day: '21.10', value: '12.3%'}
                        
                    ]
                },
                {
                    location: '생산연령',
                    data: [
                        {day: '20.07', value: '12.3%'},
                        {day: '20.08', value: '12.3%'},
                        {day: '20.09', value: '12.3%'},
                        {day: '20.10', value: '12.3%'},
                        {day: '20.11', value: '12.3%'},
                        {day: '20.12', value: '12.3%'},
                        {day: '21.01', value: '12.3%'},
                        {day: '21.02', value: '12.3%'},
                        {day: '21.03', value: '12.3%'},
                        {day: '21.04', value: '12.3%'},
                        {day: '21.05', value: '12.3%'},
                        {day: '21.06', value: '12.3%'},
                        {day: '21.07', value: '12.3%'},
                        {day: '21.08', value: '12.3%'},
                        {day: '21.09', value: '12.3%'},
                        {day: '21.10', value: '12.3%'}
                        
                    ]
                },
                {
                    location: '노인',
                    data: [
                        {day: '20.07', value: '12.3%'},
                        {day: '20.08', value: '12.3%'},
                        {day: '20.09', value: '12.3%'},
                        {day: '20.10', value: '12.3%'},
                        {day: '20.11', value: '12.3%'},
                        {day: '20.12', value: '12.3%'},
                        {day: '21.01', value: '12.3%'},
                        {day: '21.02', value: '12.3%'},
                        {day: '21.03', value: '12.3%'},
                        {day: '21.04', value: '12.3%'},
                        {day: '21.05', value: '12.3%'},
                        {day: '21.06', value: '12.3%'},
                        {day: '21.07', value: '12.3%'},
                        {day: '21.08', value: '12.3%'},
                        {day: '21.09', value: '12.3%'},
                        {day: '21.10', value: '12.3%'}
                        
                    ]
                },
                {
                    location: '노령화지수',
                    data: [
                        {day: '20.07', value: '12.3%'},
                        {day: '20.08', value: '12.3%'},
                        {day: '20.09', value: '12.3%'},
                        {day: '20.10', value: '12.3%'},
                        {day: '20.11', value: '12.3%'},
                        {day: '20.12', value: '12.3%'},
                        {day: '21.01', value: '12.3%'},
                        {day: '21.02', value: '12.3%'},
                        {day: '21.03', value: '12.3%'},
                        {day: '21.04', value: '12.3%'},
                        {day: '21.05', value: '12.3%'},
                        {day: '21.06', value: '12.3%'},
                        {day: '21.07', value: '12.3%'},
                        {day: '21.08', value: '12.3%'},
                        {day: '21.09', value: '12.3%'},
                        {day: '21.10', value: '12.3%'}
                        
                    ]
                }
            ],
            //인구 이동 테이블 데이터
            movemonthdatas: [
                {day: '21.03'},
                {day: '21.05'},
                {day: '21.06'},
                {day: '21.07'}
            ],
            movedatas: [
                {
                    type: '전체',
                    daylists:
                        [
                            {
                                day: '21.03',
                                data: [
                                    {type: '전입', value: '1,234'},
                                    {type: '전출', value: '1,234'},
                                    {type: '순인구이동', value: '1,234'}
                                ]
                            },
                            {
                                day: '21.05',
                                data: [
                                    {type: '전입', value: '1,234'},
                                    {type: '전출', value: '1,234'},
                                    {type: '순인구이동', value: '1,234'}
                                ]
                            },
                            {
                                day: '21.06',
                                data: [
                                    {type: '전입', value: '1,234'},
                                    {type: '전출', value: '1,234'},
                                    {type: '순인구이동', value: '1,234'}
                                ]
                            },
                            {
                                day: '21.07',
                                data: [
                                    {type: '전입', value: '1,234'},
                                    {type: '전출', value: '1,234'},
                                    {type: '순인구이동', value: '1,234'}
                                ]
                            }
                        ]
                    
                    
                },
                {
                    type: '시도내',
                    daylists:
                        [
                            {
                                day: '21.03',
                                data: [
                                    {type: '전입', value: '1,234'},
                                    {type: '전출', value: '1,234'},
                                    {type: '순인구이동', value: '1,234'}
                                ]
                            },
                            {
                                day: '21.05',
                                data: [
                                    {type: '전입', value: '1,234'},
                                    {type: '전출', value: '1,234'},
                                    {type: '순인구이동', value: '1,234'}
                                ]
                            },
                            {
                                day: '21.06',
                                data: [
                                    {type: '전입', value: '1,234'},
                                    {type: '전출', value: '1,234'},
                                    {type: '순인구이동', value: '1,234'}
                                ]
                            },
                            {
                                day: '21.07',
                                data: [
                                    {type: '전입', value: '1,234'},
                                    {type: '전출', value: '1,234'},
                                    {type: '순인구이동', value: '1,234'}
                                ]
                            }
                        ]
                    
                    
                },
                {
                    type: '시도간',
                    daylists:
                        [
                            {
                                day: '21.03',
                                data: [
                                    {type: '전입', value: '1,234'},
                                    {type: '전출', value: '1,234'},
                                    {type: '순인구이동', value: '1,234'}
                                ]
                            },
                            {
                                day: '21.05',
                                data: [
                                    {type: '전입', value: '1,234'},
                                    {type: '전출', value: '1,234'},
                                    {type: '순인구이동', value: '1,234'}
                                ]
                            },
                            {
                                day: '21.06',
                                data: [
                                    {type: '전입', value: '1,234'},
                                    {type: '전출', value: '1,234'},
                                    {type: '순인구이동', value: '1,234'}
                                ]
                            },
                            {
                                day: '21.07',
                                data: [
                                    {type: '전입', value: '1,234'},
                                    {type: '전출', value: '1,234'},
                                    {type: '순인구이동', value: '1,234'}
                                ]
                            }
                        ]
                    
                    
                }
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
            tradingdatas1: [
                
                {
                    location: '직업',
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
                    location: '가족',
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
                    location: '주택',
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
                    location: '교육',
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
                    location: '주거환경',
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
                    location: '자연환경',
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
                    location: '기타',
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
            //지역선택 직접입력 레이어
            locationSearch: false,
            // 지역검색
            srhtext: '',
            // 최근지역조회
            recentView: false,
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
        TipToggle(type, status)  {
            if (type === 'guidetip1') {
                this.guidetip1 = !status;
            } else if (type === 'guidetip2') {
                this.guidetip2 = !status;
            }
        },
        //공통 == 탭클래스 처리 active
        tabClick(parm, type) {
            console.log(type);
            if (type === '인구 현황') {
                this.tabnum = parm;
            } else if (type === '인구 전망(추계)') {
                this.tabnum1 = parm;
            } else if (type === '인구 이동') {
                this.tabnum2 = parm;
            } else if (type === '전입사유별 현황') {
                this.tabnum3 = parm;
            } else if (type === '전출입 순위') {
                this.tabnum4 = parm;
            }
        },
        //공통 == 서브탭클래스 처리 active
        subTabActive(e, classname, text) {
            console.log(text, classname);
            let tabbox = document.querySelectorAll(classname + ' .textline');
            tabbox.forEach(elem => {
                elem.classList.remove('active');
            });
            e.target.classList.add('active');
            if (classname === '.type1') {
                text === '월별' ? this.monthAcitve1 = true : this.monthAcitve1 = false;
            } else if (classname === '.type2') {
                text === '월별' ? this.monthAcitve = true : this.monthAcitve = false;
            }
            
        },
        //데이터피커 레이어 open/close
        togglePicker(type) {
            if (type === 'type1') {
                this.openPicker = !this.openPicker;
            } else if (type === 'type2') {
                this.openPicker1 = !this.openPicker1;
            }
        },
        //데이터피커 선택시
        handleChange(type) {
            if (type === 'type1') {
                this.openPicker = !this.openPicker;
            } else if (type === 'type2') {
                this.openPicker1 = !this.openPicker1;
            }
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
        },
        //버튼체크
        activeToggle(e, classname) {
            if (e.target.classList.contains(classname)) {
                e.target.classList.remove(classname);
            } else {
                e.target.classList.add(classname);
            }
            
        }
    }
};
</script>