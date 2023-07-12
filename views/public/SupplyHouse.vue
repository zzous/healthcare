<template>
    <section class="supplyhouse">
        <div class="mainTitle">
			<h1 class="titdepth1">주택공급</h1>
        </div>
        <div class="Topselect">
            <div class="selectbox type2">
                <span class="value txt arw" :class="{down:!locationSelect, up:locationSelect}" @click="SelectToggle('locationSelect')">전국</span>
            </div>
            <!-- 지역선택 레이어 -->
            <div class="locationSelect" v-if="locationSelect">
                <button type="button" class="btn btn-popclose" title="닫기" @click="SelectToggle('locationSelect')">닫기</button>
                <div class="tit">
                    <strong>지역선택</strong>
                    <button type="button" class="btn btn-search" title="검색" @click="SelectToggle('locationSearch')">검색</button>
                </div>
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
                                    <button type="button" class="btn btn-inpclear" title="검색어 삭제" v-if="srhtext.length > 0" @click="TxtDelete('srhtext')"></button>
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
            <div class="flexbox">
                <div class="txttop5 recent">
                <span class="txt">최근 조회지역</span>
                </div>
                <div class="btnstop5">
                    <jQueryScrollbar style="width:100%;" :useCtrl="{direction: 'x',customClass:'typeSmall' }">
                        <div class="btnstop5_scroll">
                            <button type="button">1.경기</button>
                            <button type="button">2.서울</button>
                            <button type="button">3.강원</button>
                            <button type="button">4.대구</button>
                            <button type="button">5.인천</button>
                        </div>
                    </jQueryScrollbar>
                </div>
            </div>
            <div class="topranking">
                <button type="button" :class="['btntoprank iconrecent arw',{down:!topView, up:topView}]" @click="SelectToggle('topView')">최근 조회지역</button>
                <div class="toprankingbox">
                    <div class="titbox iconrecent">최근 조회지역</div>
                    <div class="btnstop5">
                        <button type="button">1.경기</button>
                        <button type="button">2.서울</button>
                        <button type="button">3.강원</button>
                        <button type="button">4.대구</button>
                        <button type="button">5.인천</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="cardwrap">
            <!-- 아파트 분양 물량 -->
            <div class="cardCaptureBox">
                <ChartOption
                    :optionList="optionList"
                    @print="cardOption('print')"
                    @capture="cardOption('capture')"
                />
                <div class="cardbox cardCapture">
                    <div class="cardtit tradingtit">
                        <h1 class="titdepth2"><span class="colortype-4281ff">전국</span> 아파트 분양 물량</h1>
                    </div>
                    <div class="textbox">
                        <div class="listbtn type1">
                            <button class="btn textline" @click="subTabActive($event,'.type1');">년별</button>
                            <button class="btn textline active" @click="subTabActive($event,'.type1');">월별</button>
                        </div>
                    </div>
                    <div class="chartlegend">
                        <span class="legend stick-38d9a9">분양 완료</span> <!-- 클래스명 변경 22.04.13 -->
                        <span class="legend stick-96f2d7">분양 예정</span>
                        <span class="legend line-e74980">수도권</span>
                        <span class="legend dotted-d6336c">비수도권</span>
                    </div>
                    <div class="unittextbox right"><span>단위: 세대수</span></div>
                    <!-- 차트 영역 -->
                    <div class="chartbox" style="height:380px; position:relative;">
                        <!-- 모바일의 경우 (해상도 1189이하 부터) 해당 툴팁 표기 -->
                        <div class="chartTip tradingtip mobile" style="top:-140px;">
                            <p class="tx1">2022년 6월 분양 예정 물량</p>
                            <p class="tx2">123,456세대</p>
                            <div class="linebox botnoline">
                                <p class="txbar">수도권 : 123,456 세대</p>
                                <p class="txbar">비수도권 : 123,456 세대</p>
                            </div>
                        </div>
                        <!--웹의 경우 (해상도 1190이상 부터) 해당 차트 내 툴팁 표기 -->
                        <div class="chartTip tradingtip" style="top: 30px; left: 50px;">
                            <p class="tx1">2022년 6월 분양 예정 물량</p>
                            <p class="tx2">123,456세대</p>
                            <div class="linebox botnoline">
                                <p class="txbar">수도권 : 123,456 세대</p>
                                <p class="txbar">비수도권 : 123,456 세대</p>
                            </div>
                        </div>

                        <!-- 모바일의 경우 (해상도 1189이하 부터) 해당 툴팁 표기 -->
                        <div class="chartTip tradingtip mobile" style="top:-140px;">
                            <p class="tx1">2022년 분양물량</p>
                            <div class="linebox botnoline">
                                <p class="tx2 txblack">분양 완료</p>
                                <p class="txblack">123,456세대</p>
                                <p class="txbar">수도권 : 123,456 세대</p>
                                <p class="txbar">비수도권 : 123,456 세대</p>
                            </div>
                            <div class="linebox botnoline">
                                <p class="tx2 txblack">분양 예정</p>
                                <p class="txblack">123,456세대 </p>
                                <p class="txbar">수도권 : 123,456 세대</p>
                                <p class="txbar">비수도권 : 123,456 세대</p>
                            </div>
                        </div>
                        <!--웹의 경우 (해상도 1190이상 부터) 해당 차트 내 툴팁 표기 -->
                        <div class="chartTip tradingtip" style="top: 30px; left: 250px;">
                            <p class="tx1">2022년 분양물량</p>
                            <div class="linebox botnoline">
                                <p class="tx2 txblack">분양 완료</p>
                                <p class="txblack">123,456세대</p>
                                <p class="txbar">수도권 : 123,456 세대</p>
                                <p class="txbar">비수도권 : 123,456 세대</p>
                            </div>
                            <div class="linebox botnoline">
                                <p class="tx2 txblack">분양 예정</p>
                                <p class="txblack">123,456세대 </p>
                                <p class="txbar">수도권 : 123,456 세대</p>
                                <p class="txbar">비수도권 : 123,456 세대</p>
                            </div>
                        </div>

                        <div class="nodata"></div>
                        <span class="watermark horizongray"></span>
                    </div>
                    <div class="textbox"><span role="button" class="btn-statistics iconsource" @click="openPublicPopup('open',$event,'supplyHouseType1')">출처: 한국거래소시스템즈</span></div>
                </div>
            </div>
            <!-- 분양단지 -->
            <div>
                <div class="cardbox">
                    <div class="cardtit">
                        <h1 class="titdepth2"><span class="colortype-4281ff">전국</span> 분양단지</h1>
                        <span class="btnarea">
                            <button type="button" class="btn btndistsch">분양 일정</button>
                            <button type="button" class="btn btndistnews">분양 소식</button>
                        </span>
                    </div>
                    <div class="textbox between"> <!-- 클래스명 변경 22.04.13 -->
                        <div class="listbtn type2">
                            <button type="button" class="btn textline active" @click="subTabActive($event,'.type2', 'except');">청약일임박순</button> <!-- 스위치 버튼 제어 추가 22.04.20 -->
                            <button type="button" class="btn textline" @click="subTabActive($event,'.type2');">세대수순</button>
                            <button type="button" class="btn textline" @click="subTabActive($event,'.type2');">분양가순</button>
                        </div>
                        <!-- rangelegend 태그 삭제 22.04.13 -->
                        <div class="switchwrap" v-if="switchView">분양완료 단지 제외 <!-- 스위치 버튼 제어 추가 22.04.20 -->
                            <div class="switch-button custom-control sm">
                                <input type="checkbox" id="except" checked>
                                <label for="except" class="switch">
                                    <span class="txt">분양완료 단지 제외</span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <jQueryScrollbar class="supplyScr">
                        <div class="housinglistarea">
                            <div class="listtblarea">
                                <div class="rowlistbody">
                                    <div class="toprow" v-for="(item, index) in distribute" :key="index">
                                        <div class="cell">
                                            <div class="tit">
                                                <span class="badgetxt col1">당첨자 발표 D-3</span>
                                                <!-- 분양 뱃지 스타일 리스트 -->
                                                <!--
                                                <span class="badgetxt col2">오늘 발표</span>
                                                <span class="badgetxt col2">오늘 청약 접수</span>
                                                <span class="badgetxt col2">오늘 입주자 모집 공고</span>
                                                -->
                                                <span v-html="item.aptname"></span>
                                            </div>
                                            <div class="tagbox">
                                                <span class="tagtxt">입주자모집공고일 <span class="ptxt" v-html="item.date"></span></span>
                                                <span class="tagtxt">세대수  <span class="ptxt" v-html="item.numberhouse"></span></span>
                                                <span class="tagtxt">분양가 <span class="ptxt" v-html="item.saleprice"></span></span>
                                                <span class="tagtxt">공급방식 <span class="ptxt" v-html="item.way"></span></span>
                                            </div>
                                            <div v-html="item.address"></div>
                                        </div>
                                        <div class="cell">
                                            <button type="button" class="btn btnkbsale" title="KB 부동산 분양" @click="gotoPage(item.url)"></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="rankmorebox">
                                <button type="button" class="btn btnrankmore arw" :class="{down:!dataMore1, up:dataMore1}" @click="SelectToggle('dataMore1')">
                                    <span v-if="dataMore1">숨기기</span>
                                    <span v-else>더보기</span>
                                </button>
                            </div>
                        </div>
                    </jQueryScrollbar>
                </div>
            </div>
            <!-- 아파트 입주물량 -->
            <div class="cardCaptureBox">
                <ChartOption
                    :optionList="optionList"
                    @print="cardOption('print')"
                    @capture="cardOption('capture')"
                />
                <div class="cardbox cardCapture">
                    <div class="cardtit tradingtit">
                        <h1 class="titdepth2"><span class="colortype-4281ff">전국</span> 아파트 입주물량</h1>
                    </div>
                    <div class="textbox">
                        <div class="listbtn type3">
                            <button class="btn textline" @click="subTabActive($event,'.type3');">년별</button>
                            <button class="btn textline active" @click="subTabActive($event,'.type3');">반기별</button>
                        </div>
                    </div>
                    <div class="chartlegend">
                        <span class="legend stick-00d0e1">입주 완료</span>
                        <span class="legend stick-b2ebf2">입주 예정</span>
                        <span class="legend line-e74980">수도권</span>
                        <span class="legend dotted-d6336c">비수도권</span>
                    </div>
                    <div class="unittextbox right"><span>단위: 세대수</span></div>
                    <!-- 차트 영역 -->
                    <div class="chartbox" style="height:380px; position:relative;">
                        <!-- 모바일의 경우 (해상도 1189이하 부터) 해당 툴팁 표기 -->
                        <div class="chartTip tradingtip mobile" style="top:-140px;">
                            <p class="tx1">2019년 상반기 입주 완료 물량</p>
                            <p class="tx2">123,456세대</p>
                            <div class="linebox botnoline">
                                <p class="txbar">수도권 : 123,456 세대</p>
                                <p class="txbar">비수도권 : 123,456 세대</p>
                            </div>
                        </div>
                        <!--웹의 경우 (해상도 1190이상 부터) 해당 차트 내 툴팁 표기 -->
                        <div class="chartTip tradingtip" style="top: 30px; left: 50px;">
                            <p class="tx1">2019년 상반기 입주 완료 물량</p>
                            <p class="tx2">123,456세대</p>
                            <div class="linebox botnoline">
                                <p class="txbar">수도권 : 123,456 세대</p>
                                <p class="txbar">비수도권 : 123,456 세대</p>
                            </div>
                        </div>

                        <!-- 모바일의 경우 (해상도 1189이하 부터) 해당 툴팁 표기 -->
                        <div class="chartTip tradingtip mobile" style="top:-140px;">
                            <p class="tx1">2022년 상반기 입주 예정 물량</p>
                            <p class="tx2">123,456세대</p>
                            <div class="linebox botnoline">
                                <p class="txbar">수도권 : 123,456 세대</p>
                                <p class="txbar">비수도권 : 123,456 세대</p>
                            </div>
                        </div>
                        <!--웹의 경우 (해상도 1190이상 부터) 해당 차트 내 툴팁 표기 -->
                        <div class="chartTip tradingtip" style="top: 30px; left: 250px;">
                            <p class="tx1">2022년 상반기 입주 예정 물량</p>
                            <p class="tx2">123,456세대</p>
                            <div class="linebox botnoline">
                                <p class="txbar">수도권 : 123,456 세대</p>
                                <p class="txbar">비수도권 : 123,456 세대</p>
                            </div>
                        </div>

                        <div class="nodata"></div>
                        <span class="watermark horizongray"></span>
                    </div>
                    <div class="textbox"><span role="button" class="btn-statistics iconsource" @click="openPublicPopup('open',$event,'supplyHouseType2')">출처: 한국거래소시스템즈</span></div>
                </div>
            </div>
            <!-- 입주예정단지 -->
            <div>
                <div class="cardbox">
                    <div class="cardtit tradingtit">
                        <h1 class="titdepth2"><span class="colortype-4281ff">전국</span> 입주예정단지</h1>
                    </div>
                    <div class="textbox between">
                        <div class="listbtn type4">
                            <button type="button" class="btn textline active" @click="subTabActive($event,'.type4');">입주예정일순</button>
                            <button type="button" class="btn textline" @click="subTabActive($event,'.type4');">세대수순</button>
                        </div>
                        <div class="switchwrap">입주완료 단지 제외
                            <div class="switch-button custom-control sm">
                                <input type="checkbox" id="moving">
                                <label for="moving" class="switch">
                                    <span class="txt">입주완료 단지 제외</span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <jQueryScrollbar class="supplyScr">
                        <div class="housinglistarea">
                            <div class="listtblarea">
                                <div class="rowlistbody">
                                    <div class="toprow" v-for="(item, index) in movinginto" :key="index">
                                        <div class="cell">
                                            <div class="tit"><span v-html="item.aptname"></span></div>
                                            <div class="tagbox type2">
                                                <span class="tagtxt">입주예정일 <span class="ptxt" v-html="item.date"></span></span>
                                                <span class="tagtxt">세대수 <span class="ptxt" v-html="item.numberhouse">1,107</span></span>
                                                <span v-html="item.address">경기도 수원시 권선구 세류동</span>
                                            </div>
                                        </div>
                                        <div class="cell">
                                            <button type="button" class="btn btnkbsale" title="KB 부동산 분양" @click="gotoPage(item.url)"></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="rankmorebox">
                                <button type="button" class="btn btnrankmore arw" :class="{down:!dataMore2, up:dataMore2}" @click="SelectToggle('dataMore2')">
                                    <span v-if="dataMore2">숨기기</span>
                                    <span v-else>더보기</span>
                                </button>
                            </div>
                        </div>
                    </jQueryScrollbar>
                </div>
            </div>
            <!-- 주택공급실적 -->
            <div class="cardCaptureBox">
                <ChartOption
                    :optionList="optionList"
                    @print="cardOption('print')"
                    @capture="cardOption('capture')"
                />
                <div class="cardbox cardCapture">
                    <div class="cardtit tradingtit">
                        <h1 class="titdepth2"><span class="colortype-4281ff">전국</span> 주택공급실적</h1>
                    </div>
                    <TabContent
                        :tabcontentname="'주택공급실적'"
                        :tabsublist="'tabbox tabtype4'"
                        :tabtexts="tabtextsType1"
                        v-on:tabactive="tabClick"
                    >
                        <template slot="panel">
                            <div class="tabcon" role="tabpanel" v-if="tabnum===0">
                                <div class="checkedlegend">
                                    <button class="btn-check supplytype1 active">인허가</button>
                                    <button class="btn-check supplytype2 active">착공</button>
                                    <button class="btn-check supplytype3 active">분양</button>
                                    <button class="btn-check supplytype4 active">준공</button>
                                </div>
                                <div class="unittextbox right">
                                    <span>단위: 세대수</span>
                                </div>
                                <!-- 차트영역 -->
                                <div class="chartbox" style="height:376px;position:relative">
                                    <!-- 모바일의 경우 (해상도 1189이하 부터) 해당 툴팁 표기 -->
                                    <div class="chartTip tradingtip mobile" style="top:-140px; ">
                                        <p class="tx1 txblack">2014년 공급실적</p> <!-- txblack 클래스 추가 22.04.13 -->
                                        <div class="linebox botnoline">
                                            <p class="legendlist supplytype1">인허가 : 123,456호</p>
                                            <p class="legendlist supplytype2">착공 : 123,456호</p>
                                            <p class="legendlist supplytype3">분양 : 123,456호</p>
                                            <p class="legendlist supplytype4">준공 : 123,456호</p>
                                        </div>
                                    </div>
                                    <!--웹의 경우 (해상도 1190이상 부터) 해당 차트 내 툴팁 표기 -->
                                    <div class="chartTip tradingtip " style="top:30px;left:50px">
                                        <p class="tx1 txblack">2014년 공급실적</p> <!-- txblack 클래스 추가 22.04.13 -->
                                        <div class="linebox botnoline">
                                            <p class="legendlist supplytype1">인허가 : 123,456호</p>
                                            <p class="legendlist supplytype2">착공 : 123,456호</p>
                                            <p class="legendlist supplytype3">분양 : 123,456호</p>
                                            <p class="legendlist supplytype4">준공 : 123,456호</p>
                                        </div>
                                    </div>
                                    <div class="nodata"></div>
                                    <span class="watermark horizongray"></span>
                                </div>
                                <!-- 테이블 영역 -->
                                <div class="tradingtable people">
                                    <div class="tablelabel">
                                        <span>구분</span>
                                        <span>준공</span>
                                        <span>분양</span>
                                        <span>착공</span>
                                        <span>인허가</span>
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
                                    <span role="button" class="btn-statistics iconsource" @click="openPublicPopup('open',$event,'supplyHouseType3')">출처 : 국가통계 포털</span>
                                </div>
                            </div>
                            <div class="tabcon" role="tabpanel" v-if="tabnum===1">
                                <TabContent
                                    :tabcontentname="'공급단계별'"
                                    :tabsublist="'tabbox tabtype5 submenu'"
                                    :tabtexts="tabtextsType2"
                                    v-on:tabactive="tabClick"
                                >
                                    <template slot="panel">
                                        <div class="tabcon" role="tabpanel" v-if="tabnum1===0">
                                            <div class="chartlegend">
                                                <span class="legend line-339af0">아파트</span>
                                                <span class="legend line-9d8f78">비아파트</span>
                                            </div>
                                            <div class="unittextbox right">
                                                <span>단위: 세대수</span>
                                            </div>
                                            <!-- 차트영역 -->
                                            <div class="chartbox" style="height:376px;position:relative">
                                                <!-- 모바일의 경우 (해상도 1189이하 부터) 해당 툴팁 표기 -->
                                                <div class="chartTip tradingtip mobile" style="top:-140px; ">
                                                    <p class="tx1 txblack">2014년 공급실적</p> <!-- txblack 클래스 추가 22.04.13 -->
                                                    <div class="linebox botnoline">
                                                        <p class="txbar">아파트 : 123,456호</p>
                                                        <p class="txbar">비아파트 : 123,456호</p>
                                                    </div>
                                                </div>
                                                <!--웹의 경우 (해상도 1190이상 부터) 해당 차트 내 툴팁 표기 -->
                                                <div class="chartTip tradingtip " style="top:30px;left:50px">
                                                    <p class="tx1 txblack">2014년 공급실적</p> <!-- txblack 클래스 추가 22.04.13 -->
                                                    <div class="linebox botnoline">
                                                        <p class="txbar">아파트 : 123,456호</p>
                                                        <p class="txbar">비아파트 : 123,456호</p>
                                                    </div>
                                                </div>
                                                <div class="nodata"></div>
                                                <span class="watermark horizongray"></span>
                                            </div>
                                            <!-- 테이블 영역 -->
                                            <div class="tradingtable people">
                                                <div class="tablelabel">
                                                    <span>구분</span>
                                                    <span>전체</span>
                                                    <span>아파트</span>
                                                    <span>비아파트</span>
                                                </div>
                                                <jQueryScrollbar  style="width:100%;" :useCtrl="{direction: 'x' }">
                                                    <div class="scrollin-pir">
                                                        <div class="tablelbody">
                                                            <div class="tablelow">
                                                                <span class="day" v-for="(day, index) in tradingdays" :key="index"  v-html="day.day" :class="{selected:index == 3}"></span>
                                                            </div>
                                                            <div class="tablelow"  v-for="(item, index) in tradingdatas1" :key="index">
                                                                <span class="datavalue" v-for="(data, index) in item.data" :key="index" v-html="data.value"  :class="{selected:index == 3}"></span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </jQueryScrollbar>
                                            </div>
                                            <div class="textbox">
                                                <span role="button" class="btn-statistics iconsource" @click="openPublicPopup('open',$event,'supplyHouseType3')">출처 : 국가통계 포털</span>
                                            </div>
                                        </div>
                                        <div class="tabcon" role="tabpanel" v-if="tabnum1===1">
                                            <div class="chartlegend">
                                                <span class="legend line-339af0">아파트</span>
                                                <span class="legend line-9d8f78">비아파트</span>
                                            </div>
                                            <div class="unittextbox right">
                                                <span>단위: 세대수</span>
                                            </div>
                                            <!-- 차트영역 -->
                                            <div class="chartbox" style="height:376px;position:relative">
                                                <!-- 모바일의 경우 (해상도 1189이하 부터) 해당 툴팁 표기 -->
                                                <div class="chartTip tradingtip mobile" style="top:-140px; ">
                                                    <p class="tx1 txblack">2014년 공급실적</p> <!-- txblack 클래스 추가 22.04.13 -->
                                                    <div class="linebox botnoline">
                                                        <p class="txbar">아파트 : 123,456호</p>
                                                        <p class="txbar">비아파트 : 123,456호</p>
                                                    </div>
                                                </div>
                                                <!--웹의 경우 (해상도 1190이상 부터) 해당 차트 내 툴팁 표기 -->
                                                <div class="chartTip tradingtip " style="top:30px;left:50px">
                                                    <p class="tx1 txblack">2014년 공급실적</p> <!-- txblack 클래스 추가 22.04.13 -->
                                                    <div class="linebox botnoline">
                                                        <p class="txbar">아파트 : 123,456호</p>
                                                        <p class="txbar">비아파트 : 123,456호</p>
                                                    </div>
                                                </div>
                                                <div class="nodata"></div>
                                                <span class="watermark horizongray"></span>
                                            </div>
                                            <!-- 테이블 영역 -->
                                            <div class="tradingtable people">
                                                <div class="tablelabel">
                                                    <span>구분</span>
                                                    <span>전체</span>
                                                    <span>아파트</span>
                                                    <span>비아파트</span>
                                                </div>
                                                <jQueryScrollbar  style="width:100%;" :useCtrl="{direction: 'x' }">
                                                    <div class="scrollin-pir">
                                                        <div class="tablelbody">
                                                            <div class="tablelow">
                                                                <span class="day" v-for="(day, index) in tradingdays" :key="index"  v-html="day.day" :class="{selected:index == 3}"></span>
                                                            </div>
                                                            <div class="tablelow"  v-for="(item, index) in tradingdatas1" :key="index">
                                                                <span class="datavalue" v-for="(data, index) in item.data" :key="index" v-html="data.value"  :class="{selected:index == 3}"></span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </jQueryScrollbar>
                                            </div>
                                            <div class="textbox">
                                                <span role="button" class="btn-statistics iconsource" @click="openPublicPopup('open',$event,'supplyHouseType3')">출처 : 국가통계 포털</span>
                                            </div>
                                        </div>
                                        <div class="tabcon" role="tabpanel" v-if="tabnum1===2">
                                            <div class="chartlegend">
                                                <span class="legend line-339af0">일반분양</span>
                                                <span class="legend line-9d8f78">임대주택</span>
                                                <span class="legend line-22b8cf">조합원분</span>
                                            </div>
                                            <div class="unittextbox right">
                                                <span>단위: 세대수</span>
                                            </div>
                                            <!-- 차트영역 -->
                                            <div class="chartbox" style="height:376px;position:relative">
                                                <!-- 모바일의 경우 (해상도 1189이하 부터) 해당 툴팁 표기 -->
                                                <div class="chartTip tradingtip mobile" style="top:-140px; ">
                                                    <p class="tx1 txblack">2014년 공급실적</p> <!-- txblack 클래스 추가 22.04.13 -->
                                                    <div class="linebox botnoline">
                                                        <p class="txbar">일반분양 : 123,456호</p>
                                                        <p class="txbar">임대주택 : 123,456호</p>
                                                        <p class="txbar">조합원분 : 123,456호</p>
                                                    </div>
                                                </div>
                                                <!--웹의 경우 (해상도 1190이상 부터) 해당 차트 내 툴팁 표기 -->
                                                <div class="chartTip tradingtip " style="top:30px;left:50px">
                                                    <p class="tx1 txblack">2014년 공급실적</p> <!-- txblack 클래스 추가 22.04.13 -->
                                                    <div class="linebox botnoline">
                                                        <p class="txbar">일반분양 : 123,456호</p>
                                                        <p class="txbar">임대주택 : 123,456호</p>
                                                        <p class="txbar">조합원분 : 123,456호</p>
                                                    </div>
                                                </div>
                                                <div class="nodata"></div>
                                                <span class="watermark horizongray"></span>
                                            </div>
                                            <!-- 테이블 영역 -->
                                            <div class="tradingtable people">
                                                <div class="tablelabel">
                                                    <span>구분</span>
                                                    <span>전체</span>
                                                    <span>일반분양</span>
                                                    <span>임대주택</span>
                                                    <span>조합원분</span>
                                                </div>
                                                <jQueryScrollbar  style="width:100%;" :useCtrl="{direction: 'x' }">
                                                    <div class="scrollin-pir">
                                                        <div class="tablelbody">
                                                            <div class="tablelow">
                                                                <span class="day" v-for="(day, index) in tradingdays" :key="index"  v-html="day.day" :class="{selected:index == 3}"></span>
                                                            </div>
                                                            <div class="tablelow"  v-for="(item, index) in tradingdatas4" :key="index">
                                                                <span class="datavalue" v-for="(data, index) in item.data" :key="index" v-html="data.value"  :class="{selected:index == 3}"></span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </jQueryScrollbar>
                                            </div>
                                            <div class="textbox">
                                                <span role="button" class="btn-statistics iconsource" @click="openPublicPopup('open',$event,'supplyHouseType3')">출처 : 국가통계 포털</span>
                                            </div>
                                        </div>
                                        <div class="tabcon" role="tabpanel" v-if="tabnum1===3">
                                            <div class="chartlegend">
                                                <span class="legend line-339af0">아파트</span>
                                                <span class="legend line-9d8f78">비아파트</span>
                                            </div>
                                            <div class="unittextbox right">
                                                <span>단위: 세대수</span>
                                            </div>
                                            <!-- 차트영역 -->
                                            <div class="chartbox" style="height:376px;position:relative">
                                                <!-- 모바일의 경우 (해상도 1189이하 부터) 해당 툴팁 표기 -->
                                                <div class="chartTip tradingtip mobile" style="top:-140px; ">
                                                    <p class="tx1 txblack">2014년 공급실적</p> <!-- txblack 클래스 추가 22.04.13 -->
                                                    <div class="linebox botnoline">
                                                        <p class="txbar">아파트 : 123,456호</p>
                                                        <p class="txbar">비아파트 : 123,456호</p>
                                                    </div>
                                                </div>
                                                <!--웹의 경우 (해상도 1190이상 부터) 해당 차트 내 툴팁 표기 -->
                                                <div class="chartTip tradingtip " style="top:30px;left:50px">
                                                    <p class="tx1 txblack">2014년 공급실적</p> <!-- txblack 클래스 추가 22.04.13 -->
                                                    <div class="linebox botnoline">
                                                        <p class="txbar">아파트 : 123,456호</p>
                                                        <p class="txbar">비아파트 : 123,456호</p>
                                                    </div>
                                                </div>
                                                <div class="nodata"></div>
                                                <span class="watermark horizongray"></span>
                                            </div>
                                            <!-- 테이블 영역 -->
                                            <div class="tradingtable people">
                                                <div class="tablelabel">
                                                    <span>구분</span>
                                                    <span>전체</span>
                                                    <span>아파트</span>
                                                    <span>비아파트</span>
                                                </div>
                                                <jQueryScrollbar  style="width:100%;" :useCtrl="{direction: 'x' }">
                                                    <div class="scrollin-pir">
                                                        <div class="tablelbody">
                                                            <div class="tablelow">
                                                                <span class="day" v-for="(day, index) in tradingdays" :key="index"  v-html="day.day" :class="{selected:index == 3}"></span>
                                                            </div>
                                                            <div class="tablelow"  v-for="(item, index) in tradingdatas1" :key="index">
                                                                <span class="datavalue" v-for="(data, index) in item.data" :key="index" v-html="data.value"  :class="{selected:index == 3}"></span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </jQueryScrollbar>
                                            </div>
                                            <div class="textbox">
                                                <span role="button" class="btn-statistics iconsource" @click="openPublicPopup('open',$event,'supplyHouseType3')">출처 : 국가통계 포털</span>
                                            </div>
                                        </div>
                                    </template>
                                </TabContent>
                            </div>
                            <div class="tabcon" role="tabpanel" v-if="tabnum===2">
                                <TabContent
                                    :tabcontentname="'주택유형별'"
                                    :tabsublist="'tabbox tabtype5 submenu'"
                                    :tabtexts="tabtextsType3"
                                    v-on:tabactive="tabClick"
                                >
                                    <template slot="panel">
                                        <div class="tabcon" role="tabpanel" v-if="tabnum2===0">
                                            <div class="checkedlegend">
                                                <button class="btn-check suphousetype1 active">인허가</button>
                                                <button class="btn-check suphousetype2 active">착공</button>
                                                <button class="btn-check suphousetype3 active">준공</button>
                                            </div>
                                            <div class="unittextbox right">
                                                <span>단위: 세대수</span>
                                            </div>
                                            <!-- 차트영역 -->
                                            <div class="chartbox" style="height:376px;position:relative">
                                                <!-- 모바일의 경우 (해상도 1189이하 부터) 해당 툴팁 표기 -->
                                                <div class="chartTip tradingtip mobile" style="top:-140px; ">
                                                    <p class="tx1 txblack">2014년 공급실적</p> <!-- txblack 클래스 추가 22.04.13 -->
                                                    <div class="linebox botnoline">
                                                        <p class="legendlist supplytype1">인허가 : 123,456호</p>
                                                        <p class="legendlist supplytype2">착공 : 123,456호</p>
                                                        <p class="legendlist supplytype4">준공 : 123,456호</p>
                                                    </div>
                                                </div>
                                                <!--웹의 경우 (해상도 1190이상 부터) 해당 차트 내 툴팁 표기 -->
                                                <div class="chartTip tradingtip " style="top:30px;left:50px">
                                                    <p class="tx1 txblack">2014년 공급실적</p> <!-- txblack 클래스 추가 22.04.13 -->
                                                    <div class="linebox botnoline">
                                                        <p class="legendlist supplytype1">인허가 : 123,456호</p>
                                                        <p class="legendlist supplytype2">착공 : 123,456호</p>
                                                        <p class="legendlist supplytype4">준공 : 123,456호</p>
                                                    </div>
                                                </div>
                                                <div class="nodata"></div>
                                                <span class="watermark horizongray"></span>
                                            </div>
                                            <!-- 테이블 영역 -->
                                            <div class="tradingtable people">
                                                <div class="tablelabel">
                                                    <span>구분</span>
                                                    <span>준공</span>
                                                    <span>착공</span>
                                                    <span>인허가</span>
                                                </div>
                                                <jQueryScrollbar  style="width:100%;" :useCtrl="{direction: 'x' }">
                                                    <div class="scrollin-pir">
                                                        <div class="tablelbody">
                                                            <div class="tablelow">
                                                                <span class="day" v-for="(day, index) in tradingdays" :key="index"  v-html="day.day" :class="{selected:index == 3}"></span>
                                                            </div>
                                                            <div class="tablelow"  v-for="(item, index) in tradingdatas2" :key="index">
                                                                <span class="datavalue" v-for="(data, index) in item.data" :key="index" v-html="data.value"  :class="{selected:index == 3}"></span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </jQueryScrollbar>
                                            </div>
                                            <div class="textbox">
                                                <span role="button" class="btn-statistics iconsource" @click="openPublicPopup('open',$event,'supplyHouseType3')">출처 : 국가통계 포털</span>
                                            </div>
                                        </div>
                                        <div class="tabcon" role="tabpanel" v-if="tabnum2===1">
                                            <div class="checkedlegend">
                                                <button class="btn-check suphousetype1 active">인허가</button>
                                                <button class="btn-check suphousetype2 active">착공</button>
                                                <button class="btn-check suphousetype3 active">준공</button>
                                            </div>
                                            <div class="unittextbox right">
                                                <span>단위: 세대수</span>
                                            </div>
                                            <!-- 차트영역 -->
                                            <div class="chartbox" style="height:376px;position:relative">
                                                <!-- 모바일의 경우 (해상도 1189이하 부터) 해당 툴팁 표기 -->
                                                <div class="chartTip tradingtip mobile" style="top:-140px; ">
                                                    <p class="tx1 txblack">2014년 공급실적</p> <!-- txblack 클래스 추가 22.04.13 -->
                                                    <div class="linebox botnoline">
                                                        <p class="legendlist supplytype1">인허가 : 123,456호</p>
                                                        <p class="legendlist supplytype2">착공 : 123,456호</p>
                                                        <p class="legendlist supplytype4">준공 : 123,456호</p>
                                                    </div>
                                                </div>
                                                <!--웹의 경우 (해상도 1190이상 부터) 해당 차트 내 툴팁 표기 -->
                                                <div class="chartTip tradingtip " style="top:30px;left:50px">
                                                    <p class="tx1 txblack">2014년 공급실적</p> <!-- txblack 클래스 추가 22.04.13 -->
                                                    <div class="linebox botnoline">
                                                        <p class="legendlist supplytype1">인허가 : 123,456호</p>
                                                        <p class="legendlist supplytype2">착공 : 123,456호</p>
                                                        <p class="legendlist supplytype4">준공 : 123,456호</p>
                                                    </div>
                                                </div>
                                                <div class="nodata"></div>
                                                <span class="watermark horizongray"></span>
                                            </div>
                                            <!-- 테이블 영역 -->
                                            <div class="tradingtable people">
                                                <div class="tablelabel">
                                                    <span>구분</span>
                                                    <span>준공</span>
                                                    <span>착공</span>
                                                    <span>인허가</span>
                                                </div>
                                                <jQueryScrollbar  style="width:100%;" :useCtrl="{direction: 'x' }">
                                                    <div class="scrollin-pir">
                                                        <div class="tablelbody">
                                                            <div class="tablelow">
                                                                <span class="day" v-for="(day, index) in tradingdays" :key="index"  v-html="day.day" :class="{selected:index == 3}"></span>
                                                            </div>
                                                            <div class="tablelow"  v-for="(item, index) in tradingdatas2" :key="index">
                                                                <span class="datavalue" v-for="(data, index) in item.data" :key="index" v-html="data.value"  :class="{selected:index == 3}"></span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </jQueryScrollbar>
                                            </div>
                                            <div class="textbox">
                                                <span role="button" class="btn-statistics iconsource" @click="openPublicPopup('open',$event,'supplyHouseType3')">출처 : 국가통계 포털</span>
                                            </div>
                                        </div>
                                    </template>
                                </TabContent>
                            </div>
                        </template>
                    </TabContent>
                </div>
            </div>
            <!-- 청약통장가입현황 -->
            <div class="cardCaptureBox">
                <ChartOption
                    :optionList="optionList"
                    @print="cardOption('print')"
                    @capture="cardOption('capture')"
                />
                <div class="cardbox cardCapture">
                    <div class="cardtit tradingtit">
                        <h1 class="titdepth2"><span class="colortype-4281ff">전국</span> 청약통장가입현황</h1>
                    </div>
                    <TabContent
                        :tabcontentname="'청약통장가입현황'"
                        :tabsublist="'tabbox tabtype3 submenu group2'"
                        :tabtexts="tabtextsType4"
                        v-on:tabactive="tabClick"
                    >
                        <template slot="tabsubtnArea">
                            <div class="listbtn type5">
                                <div :class="['pickerarea ', {active:monthAcitve},{select:openPicker}]">
                                    <div class="pickerselect-text">
                                        <template v-if="starttime.length > 0">
                                            {{starttime[0]}}~{{starttime[1]}}
                                        </template>
                                    </div>
                                    <button :class="['iconbtn btn-picker', {active:monthAcitve}]" @click="togglePicker('type5')" />
                                </div>
                                <!-- 날짜선택 -->
                                <div class="pickerlayer lineLayer" v-if="openPicker">
                                    <div class="pickerTit">
                                        기간선택
                                        <div class="rangevalue">
                                            <span>{{starttime[0]}}~{{starttime[1]}}</span>
                                        </div>
                                        <button class="btn btn-popclose" @click="togglePicker('type5')"></button>
                                    </div>
                                    <div class="rangeTit">
                                        <div>시작</div>
                                        <div>종료</div>
                                    </div>
                                    <DatePicker
                                        inline
                                        range
                                        type="month"
                                        v-model="starttime"
                                        format="YY.MM"
                                        value-type="format"
                                        :lang="customLang"
                                        @change="handleChange('type5')"
                                    />
                                    <div class="btmlocbtn">
                                        <button class="btn btn-reset">초기화</button>
                                        <button class="btn btn-round cancel" @click="togglePicker('type5')">취소</button>
                                        <button class="btn btn-round confirm" @click="togglePicker('type5')">확인</button>
                                    </div>
                                </div>
                            </div>
                        </template>
                        
                        <template slot="panel">
                            <div class="tabcon" role="tabpanel" v-if="tabnum3===0">
                                <div class="chartlegend">
                                    <span class="legend accountype1">청약종합저축</span>
                                    <span class="legend accountype2">청약부금</span>
                                    <span class="legend accountype3">청약예금</span>
                                </div>
                                <div class="unittextbox right"><span>단위: 통장수 (만좌)</span></div>
                                <!-- 차트영역 -->
                                <div class="chartbox" style="height:376px;">
                                    <!-- 모바일의 경우 (해상도 1189이하 부터) 해당 툴팁 표기 -->
                                    <div class="chartTip tradingtip mobile" style="top:-140px;">
                                        <p class="tx1 txblack">2021년 1월 가입현황</p> <!-- txblack 클래스 추가 22.04.13 -->
                                        <div class="linebox botnoline">
                                            <p class="txbar">청약예금 : 123,456좌</p>
                                            <p class="txbar">청약부금 : 123,456좌</p>
                                            <p class="txbar">청약종합저축 : 123,456</p>
                                        </div>
                                    </div>
                                    <!--웹의 경우 (해상도 1190이상 부터) 해당 차트 내 툴팁 표기 -->
                                    <div class="chartTip tradingtip " style="top:30px;left:50px">
                                        <p class="tx1 txblack">2021년 1월 가입현황</p> <!-- txblack 클래스 추가 22.04.13 -->
                                        <div class="linebox botnoline">
                                            <p class="txbar">청약예금 : 123,456좌</p>
                                            <p class="txbar">청약부금 : 123,456좌</p>
                                            <p class="txbar">청약종합저축 : 123,456</p>
                                        </div>
                                    </div>
                                    <div class="nodata"></div>
                                    <span class="watermark horizongray"></span>
                                </div>
                                <!-- 테이블 영역 -->
                                <div class="tradingtable">
                                    <div class="tablelabel" style="width:100px">
                                        <span>구분</span>
                                        <span>청약종합저축</span>
                                        <span>청약부금</span>
                                        <span>청약예금</span>
                                    </div>
                                    <jQueryScrollbar  style="width:100%;" :useCtrl="{direction: 'x' }">
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
                                <div class="textbox">
                                    <!-- 출처명 수정 22.04.27 -->
                                    <span role="button" class="btn-statistics iconsource" @click="openPublicPopup('open',$event,'supplyHouseType4')">출처 : 공공데이터포털</span>
                                </div>
                            </div>
                            <div class="tabcon" role="tabpanel" v-if="tabnum3===1">
                                <div class="chartlegend">
                                    <span class="legend ranktype1">1순위</span>
                                    <span class="legend ranktype2">2순위</span>
                                </div>
                                <div class="unittextbox right"><span>단위: 통장수 (만좌)</span></div>
                                <!-- 차트영역 -->
                                <div class="chartbox" style="height:376px;">
                                    <!-- 모바일의 경우 (해상도 1189이하 부터) 해당 툴팁 표기 -->
                                    <div class="chartTip tradingtip mobile" style="top:-140px;">
                                        <p class="tx1">2021년 1월 청약종합저축</p>
                                        <div class="linebox botnoline">
                                            <p class="txbar">2순위 : 123,456좌</p>
                                            <p class="txbar">1순위 : 123,456좌</p>
                                        </div>
                                    </div>
                                    <!--웹의 경우 (해상도 1190이상 부터) 해당 차트 내 툴팁 표기 -->
                                    <div class="chartTip tradingtip " style="top:30px;left:50px">
                                        <p class="tx1">2021년 1월 청약종합저축</p>
                                        <div class="linebox botnoline">
                                            <p class="txbar">2순위 : 123,456좌</p>
                                            <p class="txbar">1순위 : 123,456좌</p>
                                        </div>
                                    </div>
                                    <div class="nodata"></div>
                                    <span class="watermark horizongray"></span>
                                </div>
                                <!-- 테이블 영역 -->
                                <div class="tradingtable">
                                    <div class="tablelabel" style="width:100px">
                                        <span>구분</span>
                                        <span>전체</span>
                                        <span>1순위</span>
                                        <span>2순위</span>
                                    </div>
                                    <jQueryScrollbar  style="width:100%;" :useCtrl="{direction: 'x' }">
                                        <div class="scrollin-pir">
                                            <div class="tablelbody">
                                                <div class="tablelow">
                                                    <span class="day" v-for="(day, index) in tradingdays1" :key="index"  v-html="day.day" :class="{selected:index == 3}"></span>
                                                </div>
                                                <div class="tablelow"  v-for="(item, index) in tradingdatas5" :key="index">
                                                    <span class="datavalue" v-for="(data, index) in item.data" :key="index" v-html="data.value"  :class="{selected:index == 3}"></span>
                                                </div>
                                            </div>
                                        </div>
                                    </jQueryScrollbar>
                                </div>
                                <div class="textbox">
                                    <span role="button" class="btn-statistics iconsource" @click="openPublicPopup('open',$event,'supplyHouseType4')">출처 : 공공데이터포털</span>
                                </div>
                            </div>
                            <div class="tabcon" role="tabpanel" v-if="tabnum3===2">
                                <div class="chartlegend">
                                    <span class="legend ranktype1">1순위</span>
                                    <span class="legend ranktype2">2순위</span>
                                </div>
                                <div class="unittextbox right"><span>단위: 통장수 (만좌)</span></div>
                                <!-- 차트영역 -->
                                <div class="chartbox" style="height:376px;">
                                    <!-- 모바일의 경우 (해상도 1189이하 부터) 해당 툴팁 표기 -->
                                    <div class="chartTip tradingtip mobile" style="top:-140px;">
                                        <p class="tx1">22021년 1월 청약부금</p>
                                        <div class="linebox botnoline">
                                            <p class="txbar">2순위 : 123,456좌</p>
                                            <p class="txbar">1순위 : 123,456좌</p>
                                        </div>
                                    </div>
                                    <!--웹의 경우 (해상도 1190이상 부터) 해당 차트 내 툴팁 표기 -->
                                    <div class="chartTip tradingtip " style="top:30px;left:50px">
                                        <p class="tx1">2021년 1월 청약부금</p>
                                        <div class="linebox botnoline">
                                            <p class="txbar">2순위 : 123,456좌</p>
                                            <p class="txbar">1순위 : 123,456좌</p>
                                        </div>
                                    </div>
                                    <div class="nodata"></div>
                                    <span class="watermark horizongray"></span>
                                </div>
                                <!-- 테이블 영역 -->
                                <div class="tradingtable">
                                    <div class="tablelabel" style="width:100px">
                                        <span>구분</span>
                                        <span>전체</span>
                                        <span>1순위</span>
                                        <span>2순위</span>
                                    </div>
                                    <jQueryScrollbar  style="width:100%;" :useCtrl="{direction: 'x' }">
                                        <div class="scrollin-pir">
                                            <div class="tablelbody">
                                                <div class="tablelow">
                                                    <span class="day" v-for="(day, index) in tradingdays1" :key="index"  v-html="day.day" :class="{selected:index == 3}"></span>
                                                </div>
                                                <div class="tablelow"  v-for="(item, index) in tradingdatas5" :key="index">
                                                    <span class="datavalue" v-for="(data, index) in item.data" :key="index" v-html="data.value"  :class="{selected:index == 3}"></span>
                                                </div>
                                            </div>
                                        </div>
                                    </jQueryScrollbar>
                                </div>
                                <div class="textbox">
                                    <span role="button" class="btn-statistics iconsource" @click="openPublicPopup('open',$event,'supplyHouseType4')">출처 : 공공데이터포털</span>
                                </div>
                            </div>
                            <div class="tabcon" role="tabpanel" v-if="tabnum3===3">
                                <div class="chartlegend">
                                    <span class="legend ranktype1">1순위</span>
                                    <span class="legend ranktype2">2순위</span>
                                </div>
                                <div class="unittextbox right"><span>단위: 통장수 (만좌)</span></div>
                                <!-- 차트영역 -->
                                <div class="chartbox" style="height:376px;">
                                    <!-- 모바일의 경우 (해상도 1189이하 부터) 해당 툴팁 표기 -->
                                    <div class="chartTip tradingtip mobile" style="top:-140px;">
                                        <p class="tx1">2021년 1월 청약예금</p>
                                        <div class="linebox botnoline">
                                            <p class="txbar">2순위 : 123,456좌</p>
                                            <p class="txbar">1순위 : 123,456좌</p>
                                        </div>
                                    </div>
                                    <!--웹의 경우 (해상도 1190이상 부터) 해당 차트 내 툴팁 표기 -->
                                    <div class="chartTip tradingtip " style="top:30px;left:50px">
                                        <p class="tx1">2021년 1월 청약예금</p>
                                        <div class="linebox botnoline">
                                            <p class="txbar">2순위 : 123,456좌</p>
                                            <p class="txbar">1순위 : 123,456좌</p>
                                        </div>
                                    </div>
                                    <div class="nodata"></div>
                                    <span class="watermark horizongray"></span>
                                </div>
                                <!-- 테이블 영역 -->
                                <div class="tradingtable">
                                    <div class="tablelabel" style="width:100px">
                                        <span>구분</span>
                                        <span>전체</span>
                                        <span>1순위</span>
                                        <span>2순위</span>
                                    </div>
                                    <jQueryScrollbar  style="width:100%;" :useCtrl="{direction: 'x' }">
                                        <div class="scrollin-pir">
                                            <div class="tablelbody">
                                                <div class="tablelow">
                                                    <span class="day" v-for="(day, index) in tradingdays1" :key="index"  v-html="day.day" :class="{selected:index == 3}"></span>
                                                </div>
                                                <div class="tablelow"  v-for="(item, index) in tradingdatas5" :key="index">
                                                    <span class="datavalue" v-for="(data, index) in item.data" :key="index" v-html="data.value"  :class="{selected:index == 3}"></span>
                                                </div>
                                            </div>
                                        </div>
                                    </jQueryScrollbar>
                                </div>
                                <div class="textbox">
                                    <span role="button" class="btn-statistics iconsource" @click="openPublicPopup('open',$event,'supplyHouseType4')">출처 : 공공데이터포털</span>
                                </div>
                            </div>
                        </template>
                    </TabContent>
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
            :class="{leftLayer:supplyHouseType}"
        />
        <!-- 공통 포털팝업 -->
    </section>
</template>
<script>
import Location from '@/components/elements/Location.vue';
import ChartOption from '@/components/elements/ChartOption.vue';
import PublicPopup from '@/components/elements/PublicPopup.vue';
import { publicPopup } from '@/data/publicPopup.js';
export default {
    components: {
        Location,
        ChartOption,
        PublicPopup
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
            monthAcitve: true,
            openPicker: false,
            starttime: ['20/07', '21/07'],
            //range 데이터
            datevalue: ['6월'],
            datevalue1: ['6월'],
            datevalue2: ['6월'],
            datevalue3: ['6월'],
            rangelists: ['8월', '9월', '10월', '11월', '12월', '1월', '2월', '3월', '4월', '5월', '6월', '7월'],
            //picker 데이터 포맷
            customLang: {
                months: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
            },
            locationSelect: false,
            locationSearch: false,
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
            tabtextsType1: ['전체', '공급단계별', '주택유형별'],
            tabnum: 0,
            tabtextsType2: ['인허가', '착공', '분양', '준공'],
            tabnum1: 0,
            tabtextsType3: ['아파트', '비아파트'],
            tabnum2: 0,
            tabtextsType4: ['전체', '주택청약종합저축', '청약부금', '청약예금'],
            tabnum3: 0,
            // 분양단지 데이터
            distribute: [
                {aptname: '오산 세교2지구 A3블록 호반써밋그랜빌 2', date: '’25.12', numberhouse: '1,107', saleprice: '3.5억 ~ 9.2억', way: '분양', address: '경기도 수원시 권선구 세류동', url: null},
                {aptname: '오산 세교2지구 A3블록 호반써밋그랜빌 2', date: '’25.12', numberhouse: '1,107', saleprice: '3.5억 ~ 9.2억', way: '분양', address: '경기도 수원시 권선구 세류동', url: null},
                {aptname: '오산 세교2지구 A3블록 호반써밋그랜빌 2', date: '’25.12', numberhouse: '1,107', saleprice: '3.5억 ~ 9.2억', way: '분양', address: '경기도 수원시 권선구 세류동', url: null},
                {aptname: '오산 세교2지구 A3블록 호반써밋그랜빌 2', date: '’25.12', numberhouse: '1,107', saleprice: '3.5억 ~ 9.2억', way: '분양', address: '경기도 수원시 권선구 세류동', url: null},
                {aptname: '오산 세교2지구 A3블록 호반써밋그랜빌 2', date: '’25.12', numberhouse: '1,107', saleprice: '3.5억 ~ 9.2억', way: '분양', address: '경기도 수원시 권선구 세류동', url: null},
                {aptname: '오산 세교2지구 A3블록 호반써밋그랜빌 2', date: '’25.12', numberhouse: '1,107', saleprice: '3.5억 ~ 9.2억', way: '분양', address: '경기도 수원시 권선구 세류동', url: null}
            ],
            movinginto: [
                {aptname: '오산 세교2지구 A3블록 호반써밋그랜빌 2', date: '25년 하반기', numberhouse: '1,107', address: '경기도 수원시 권선구 세류동', url: null},
                {aptname: '오산 세교2지구 A3블록 호반써밋그랜빌 2', date: '25년 하반기', numberhouse: '1,107', address: '경기도 수원시 권선구 세류동', url: null},
                {aptname: '오산 세교2지구 A3블록 호반써밋그랜빌 2', date: '25년 하반기', numberhouse: '1,107', address: '경기도 수원시 권선구 세류동', url: null},
                {aptname: '오산 세교2지구 A3블록 호반써밋그랜빌 2', date: '25년 하반기', numberhouse: '1,107', address: '경기도 수원시 권선구 세류동', url: null},
                {aptname: '오산 세교2지구 A3블록 호반써밋그랜빌 2', date: '25년 하반기', numberhouse: '1,107', address: '경기도 수원시 권선구 세류동', url: null},
                {aptname: '오산 세교2지구 A3블록 호반써밋그랜빌 2', date: '25년 하반기', numberhouse: '1,107', address: '경기도 수원시 권선구 세류동', url: null},
                {aptname: '오산 세교2지구 A3블록 호반써밋그랜빌 2', date: '25년 하반기', numberhouse: '1,107', address: '경기도 수원시 권선구 세류동', url: null},
                {aptname: '오산 세교2지구 A3블록 호반써밋그랜빌 2', date: '25년 하반기', numberhouse: '1,107', address: '경기도 수원시 권선구 세류동', url: null},
                {aptname: '오산 세교2지구 A3블록 호반써밋그랜빌 2', date: '25년 하반기', numberhouse: '1,107', address: '경기도 수원시 권선구 세류동', url: null},
                {aptname: '오산 세교2지구 A3블록 호반써밋그랜빌 2', date: '25년 하반기', numberhouse: '1,107', address: '경기도 수원시 권선구 세류동', url: null}
            ],
            //테이블 날짜
            tradingdays: [
                {day: '2012'},
                {day: '2013'},
                {day: '2014'},
                {day: '2015'},
                {day: '2016'},
                {day: '2017'},
                {day: '2018'},
                {day: '2019'},
                {day: '2020'},
                {day: '21(~07)'}
            ],
            tradingdays1: [
                {day: '20.06'},
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
                {day: '21.07'}
            ],
            //테이블 데이터
            tradingdatas: [
                {
                    location: '준공',
                    data: [
                        {day: '2012', value: '805,271'},
                        {day: '2013', value: '805,271'},
                        {day: '2014', value: '805,271'},
                        {day: '2015', value: '805,271'},
                        {day: '2016', value: '805,271'},
                        {day: '2017', value: '805,271'},
                        {day: '2018', value: '805,271'},
                        {day: '2019', value: '805,271'},
                        {day: '2020', value: '805,271'},
                        {day: '21(~07)', value: '805,271'}
                    ]
                },
                {
                    location: '분양',
                    data: [
                        {day: '2012', value: '408,011'},
                        {day: '2013', value: '408,011'},
                        {day: '2014', value: '408,011'},
                        {day: '2015', value: '408,011'},
                        {day: '2016', value: '408,011'},
                        {day: '2017', value: '408,011'},
                        {day: '2018', value: '408,011'},
                        {day: '2019', value: '408,011'},
                        {day: '2020', value: '408,011'},
                        {day: '21(~07)', value: '408,011'}
                    ]
                },
                {
                    location: '착공',
                    data: [
                        {day: '2012', value: '408,011'},
                        {day: '2013', value: '408,011'},
                        {day: '2014', value: '408,011'},
                        {day: '2015', value: '408,011'},
                        {day: '2016', value: '408,011'},
                        {day: '2017', value: '408,011'},
                        {day: '2018', value: '408,011'},
                        {day: '2019', value: '408,011'},
                        {day: '2020', value: '408,011'},
                        {day: '21(~07)', value: '408,011'}
                    ]
                },
                {
                    location: '인허가',
                    data: [
                        {day: '2012', value: '408,011'},
                        {day: '2013', value: '408,011'},
                        {day: '2014', value: '408,011'},
                        {day: '2015', value: '408,011'},
                        {day: '2016', value: '408,011'},
                        {day: '2017', value: '408,011'},
                        {day: '2018', value: '408,011'},
                        {day: '2019', value: '408,011'},
                        {day: '2020', value: '408,011'},
                        {day: '21(~07)', value: '408,011'}
                    ]
                }
            ],
            tradingdatas1: [
                {
                    location: '전체',
                    data: [
                        {day: '2012', value: '805,271'},
                        {day: '2013', value: '805,271'},
                        {day: '2014', value: '805,271'},
                        {day: '2015', value: '805,271'},
                        {day: '2016', value: '805,271'},
                        {day: '2017', value: '805,271'},
                        {day: '2018', value: '805,271'},
                        {day: '2019', value: '805,271'},
                        {day: '2020', value: '805,271'},
                        {day: '21(~07)', value: '805,271'}
                    ]
                },
                {
                    location: '아파트',
                    data: [
                        {day: '2012', value: '805,271'},
                        {day: '2013', value: '805,271'},
                        {day: '2014', value: '805,271'},
                        {day: '2015', value: '805,271'},
                        {day: '2016', value: '805,271'},
                        {day: '2017', value: '805,271'},
                        {day: '2018', value: '805,271'},
                        {day: '2019', value: '805,271'},
                        {day: '2020', value: '805,271'},
                        {day: '21(~07)', value: '805,271'}
                    ]
                },
                {
                    location: '비아파트',
                    data: [
                        {day: '2012', value: '805,271'},
                        {day: '2013', value: '805,271'},
                        {day: '2014', value: '805,271'},
                        {day: '2015', value: '805,271'},
                        {day: '2016', value: '805,271'},
                        {day: '2017', value: '805,271'},
                        {day: '2018', value: '805,271'},
                        {day: '2019', value: '805,271'},
                        {day: '2020', value: '805,271'},
                        {day: '21(~07)', value: '805,271'}
                    ]
                }
            ],
            tradingdatas2: [
                {
                    location: '준공',
                    data: [
                        {day: '2012', value: '805,271'},
                        {day: '2013', value: '805,271'},
                        {day: '2014', value: '805,271'},
                        {day: '2015', value: '805,271'},
                        {day: '2016', value: '805,271'},
                        {day: '2017', value: '805,271'},
                        {day: '2018', value: '805,271'},
                        {day: '2019', value: '805,271'},
                        {day: '2020', value: '805,271'},
                        {day: '21(~07)', value: '805,271'}
                    ]
                },
                {
                    location: '착공',
                    data: [
                        {day: '2012', value: '805,271'},
                        {day: '2013', value: '805,271'},
                        {day: '2014', value: '805,271'},
                        {day: '2015', value: '805,271'},
                        {day: '2016', value: '805,271'},
                        {day: '2017', value: '805,271'},
                        {day: '2018', value: '805,271'},
                        {day: '2019', value: '805,271'},
                        {day: '2020', value: '805,271'},
                        {day: '21(~07)', value: '805,271'}
                    ]
                },
                {
                    location: '인허가',
                    data: [
                        {day: '2012', value: '805,271'},
                        {day: '2013', value: '805,271'},
                        {day: '2014', value: '805,271'},
                        {day: '2015', value: '805,271'},
                        {day: '2016', value: '805,271'},
                        {day: '2017', value: '805,271'},
                        {day: '2018', value: '805,271'},
                        {day: '2019', value: '805,271'},
                        {day: '2020', value: '805,271'},
                        {day: '21(~07)', value: '805,271'}
                    ]
                }
            ],
            tradingdatas3: [
                {
                    location: '청약종합저축',
                    data: [
                        {day: '20.06', value: '805,271'},
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
                        {day: '21.07', value: '805,271'}
                    ]
                },
                {
                    location: '청약부금',
                    data: [
                        {day: '20.06', value: '805,271'},
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
                        {day: '21.07', value: '805,271'}
                    ]
                },
                {
                    location: '청약예금',
                    data: [
                        {day: '20.06', value: '805,271'},
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
                        {day: '21.07', value: '805,271'}
                    ]
                }
            ],
            tradingdatas4: [
                {
                    location: '전체',
                    data: [
                        {day: '2012', value: '805,271'},
                        {day: '2013', value: '805,271'},
                        {day: '2014', value: '805,271'},
                        {day: '2015', value: '805,271'},
                        {day: '2016', value: '805,271'},
                        {day: '2017', value: '805,271'},
                        {day: '2018', value: '805,271'},
                        {day: '2019', value: '805,271'},
                        {day: '2020', value: '805,271'},
                        {day: '21(~07)', value: '805,271'}
                    ]
                },
                {
                    location: '일반분양',
                    data: [
                        {day: '2012', value: '805,271'},
                        {day: '2013', value: '805,271'},
                        {day: '2014', value: '805,271'},
                        {day: '2015', value: '805,271'},
                        {day: '2016', value: '805,271'},
                        {day: '2017', value: '805,271'},
                        {day: '2018', value: '805,271'},
                        {day: '2019', value: '805,271'},
                        {day: '2020', value: '805,271'},
                        {day: '21(~07)', value: '805,271'}
                    ]
                },
                {
                    location: '임대주택',
                    data: [
                        {day: '2012', value: '805,271'},
                        {day: '2013', value: '805,271'},
                        {day: '2014', value: '805,271'},
                        {day: '2015', value: '805,271'},
                        {day: '2016', value: '805,271'},
                        {day: '2017', value: '805,271'},
                        {day: '2018', value: '805,271'},
                        {day: '2019', value: '805,271'},
                        {day: '2020', value: '805,271'},
                        {day: '21(~07)', value: '805,271'}
                    ]
                },
                {
                    location: '조합원분',
                    data: [
                        {day: '2012', value: '805,271'},
                        {day: '2013', value: '805,271'},
                        {day: '2014', value: '805,271'},
                        {day: '2015', value: '805,271'},
                        {day: '2016', value: '805,271'},
                        {day: '2017', value: '805,271'},
                        {day: '2018', value: '805,271'},
                        {day: '2019', value: '805,271'},
                        {day: '2020', value: '805,271'},
                        {day: '21(~07)', value: '805,271'}
                    ]
                }
            ],
            tradingdatas5: [
                {
                    location: '전체',
                    data: [
                        {day: '20.06', value: '805,271'},
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
                        {day: '21.07', value: '805,271'}
                    ]
                },
                {
                    location: '1순위',
                    data: [
                        {day: '20.06', value: '805,271'},
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
                        {day: '21.07', value: '805,271'}
                    ]
                },
                {
                    location: '2순위',
                    data: [
                        {day: '20.06', value: '805,271'},
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
                        {day: '21.07', value: '805,271'}
                    ]
                }
                
            ],
            // 지역검색
            srhtext: '',
            // 최근조회지역
            topView: false,
            //분양단지 더보기
            dataMore1: false,
            dataMore2: false,
            //스위치 버튼 유무
            switchView: false,
            //공공팝업 레이어
            publicPopup,
            publicLayer: false,
            popData: null,
            publicTop: null,
            supplyHouseType: false
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
        //지역선택 emit
        seletlocation(num, type, text) {
            console.log(num, type, text);
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
        //공통 == 탭클래스 처리 active
        tabClick(parm, type) {
            if (type === '주택공급실적') {
                this.tabnum = parm;
            } else if (type === '공급단계별') {
                this.tabnum1 = parm;
            } else if (type === '주택유형별') {
                this.tabnum2 = parm;
            } else if (type === '청약통장가입현황') {
                this.tabnum3 = parm;
            }
        },
        //공통 == 서브탭클래스 처리 active
        subTabActive(e, classname, radio) {
            let tabbox = document.querySelectorAll(classname + ' .textline');
            tabbox.forEach(elem => {
                elem.classList.remove('active');
            });
            e.target.classList.add('active');
            //스위치 버튼 제어
            if (radio === 'except') {
                this.switchView = false;
            } else {
                this.switchView = true;
            }
        },
        //데이터피커 레이어 open/close
        togglePicker(type) {
            if (type === 'type5') {
                this.openPicker = !this.openPicker;
            }
        },
        //데이터피커 선택시
        handleChange(type) {
            if (type === 'type5') {
                this.openPicker = !this.openPicker;
            }
        },
        //토글
        SelectToggle(parms) {
            this[parms] = !this[parms];
        },
        // 지역검색 텍스트 삭제
        TxtDelete(parms) {
            this[parms] = '';
        },
        //공공팝업 레이어
        openPublicPopup(type, e, data) {
            if (type === 'open') {
                this.publicLayer = true;
                this.popData = publicPopup[data];
                if (window.innerWidth > 1189) {
                    this.$nextTick(function() {
                        this.publicTop = Math.abs(document.querySelector('.pagelayout').getBoundingClientRect().top + 10) + (e.target.getBoundingClientRect().top - this.$refs.layercon.$el.clientHeight) ;
                        !(data === 'supplyHouseType4') ? this.supplyHouseType = true : this.supplyHouseType = false;
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