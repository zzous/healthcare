<template>
    <section class="unsold">
        <div class="mainTitle">
			<h1 class="titdepth1">미분양</h1>
            <ShareCommon
                :pageurl ="this.$router.currentRoute.path"
            />
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
        <!-- 미분양 현황 -->
        <div class="cardCaptureBox">
            <ChartOption
                :optionList="optionList"
                @print="cardOption('print')"
                @capture="cardOption('capture')"
            />
            <div class="cardbox cardCapture">
                <div class="cardtit tradingtit">
                    <h1 class="titdepth2">미분양 현황</h1>
                </div>
                <div class="holdcon">
                    <div class="textbox">
                        <div class="listbtn type1">
                        <button class="btn textline" @click="subTabActive($event,'.type1','년별');">년별</button>
                        <button class="btn textline" @click="subTabActive($event,'.type1','분기별');">분기별</button>
                        <button class="btn textline" @click="subTabActive($event,'.type1','월별');">월별</button>
                        <div :class="['pickerarea ', {active:monthAcitve1},{select:openPicker1}]">
                            <div class="pickerselect-text">
                                <template v-if="starttime1.length > 0">
                                    {{starttime1[0]}}~{{starttime1[1]}}
                                </template>
                            </div>
                            <button :class="['iconbtn btn-picker', {active:monthAcitve1}]" @click="togglePicker('type1')" />
                        </div>
                        <!-- 날짜선택 -->
                        <div class="pickerlayer lineLayer" v-if="openPicker1">
                            <div class="pickerTit">
                                기간선택
                                <div class="rangevalue">
                                    <span>{{starttime1[0]}}~{{starttime1[1]}}</span>
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
                                v-model="starttime1"
                                format="YY.MM"
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
                    </div>
                    <div class="chartlegend type2">
                        <span class="legend stick-63e6be">미분양</span>
                        <span class="legend linedarkblue">변동률</span>
                    </div>
                    <div class="unittextbox between">
                        <span>미분양: 호</span>
                        <span>변동률(%)</span>
                    </div>
                    <!-- 차트영역 -->
                    <div class="chartbox" style="height:370px;">
                        <!-- 모바일의 경우 (해상도 1189이하 부터) 해당 툴팁 표기 -->
                        <div class="chartTip tradingtip mobile" style="top:-140px;">
                            <p class="tx1">2021년 3월 미분양</p>
                            <p class="tx2">1,234호</p> <!-- 2022.03.08 퍼블 수정/ 텍스트 수정-->
                            <div class="linebox botnoline">
                                <p class="txbar">전월대비:<span class="ico numup"></span>12.3%</p>
                            </div>
                        </div>
                        <!--웹의 경우 (해상도 1190이상 부터) 해당 차트 내 툴팁 표기 -->
                        <div class="chartTip tradingtip " style="top:30px;left:50px">
                            <p class="tx1">2021년 3월 미분양</p>
                            <p class="tx2">1,234호</p>
                            <div class="linebox botnoline">
                                <p class="txbar">전월대비:<span class="ico numup"></span>12.3%</p>
                            </div>
                        </div>
                        <div class="nodata"></div>
                        <span class="watermark horizongray"></span>
                    </div>
                    <!-- 테이블 -->
                    <div class="tradingtable people">
                        <div class="tablelabel">
                            <span>구분</span>
                            <span>미분양</span>
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
                    <div class="textbox"><span role="button" class="btn-statistics iconsource" @click="openPublicPopup('open',$event,'unsoldType1')">출처 : 국가통계 포털</span></div>
                </div>

            </div>
        </div>
        <!-- 준공 후 미분양 현황 -->
        <div class="cardCaptureBox">
            <ChartOption
                :optionList="optionList"
                @print="cardOption('print')"
                @capture="cardOption('capture')"
            />
            <div class="cardbox cardCapture">
                <div class="cardtit tradingtit">
                    <h1 class="titdepth2">준공 후 미분양 현황</h1> <!-- 2022.03.31 퍼블 수정 / 타이틀 변경-->
                </div>
                <TabContent
                    :tabcontentname="'준공 후 미분양 현황'"
                    :tabsublist="'tabbox tabtype3 submenu'"
                    :tabtexts="tabtextsType1"
                    v-on:tabactive="tabClick"
                >
                    <template slot="tabsubtnArea">
                        <div class="listbtn type2">
                            <button class="btn textline" @click="subTabActive($event,'.type2','년별');">년별</button>
                            <button class="btn textline" @click="subTabActive($event,'.type2','분기별');">분기별</button>
                            <button class="btn textline" @click="subTabActive($event,'.type2','월별');">월별</button>
                            <div :class="['pickerarea', {active:monthAcitve2},{select:openPicker2}]">
                                <div class="pickerselect-text">
                                    <template v-if="starttime2.length > 0">
                                        {{starttime2[0]}}~{{starttime2[1]}}
                                    </template>
                                </div>
                                <button :class="['iconbtn btn-picker', {active:monthAcitve2}]" @click="togglePicker('type2')" />
                            </div>
                            <!-- 날짜선택 -->
                            <div class="pickerlayer lineLayer" v-if="openPicker2">
                                <div class="pickerTit">
                                    기간선택
                                    <div class="rangevalue">
                                        <span>{{starttime2[0]}}~{{starttime2[1]}}</span>
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
                                    v-model="starttime2"
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
                        <div class="tabcon" role="tabpanel" v-if="tabnum1===0">
                            <div class="holdcon">
                                <div class="listradiogroup">
                                    <label for="total" class="custom-radio custom-control"><input type="radio" name="scale" id="total"><span>소계</span></label>
                                    <label for="scale1" class="custom-radio custom-control"><input type="radio" name="scale" id="scale1"><span>60㎡ 이하</span></label>
                                    <label for="scale2" class="custom-radio custom-control"><input type="radio" name="scale" id="scale2"><span>60~85㎡</span></label>
                                    <label for="scale3" class="custom-radio custom-control"><input type="radio" name="scale" id="scale3"><span>85㎡ 초과</span></label>
                                    <!-- 2022.03.31 퍼블수정 / 스위치 버튼 삭제-->
                                </div>
                                <div class="chartlegend type2">
                                    <span class="legend stick-63e6be">미분양</span>
                                    <span class="legend linedarkblue">변동률</span>
                                </div>
                                <div class="unittextbox between">
                                    <span>미분양: 호</span>
                                    <span>변동률(%)</span>
                                </div>
                                <!-- 차트영역 -->
                                <div class="chartbox" style="height:370px;">
                                    <!-- 모바일의 경우 (해상도 1189이하 부터) 해당 툴팁 표기 -->
                                    <div class="chartTip tradingtip mobile" style="top:-140px;">
                                        <p class="tx1">2021년 3월 민간 준공 후 미분양<br>(소계, 공사 완료 후)</p><!--2022.03.31 퍼블수정 / 텍스트 변경 -->
                                        <p class="tx2">-</p>
                                        <div class="linebox botnoline">
                                            <p class="txbar">전월대비:-</p>
                                        </div>
                                    </div>
                                    <!--웹의 경우 (해상도 1190이상 부터) 해당 차트 내 툴팁 표기 -->
                                    <div class="chartTip tradingtip " style="top:30px;left:50px">
                                        <p class="tx1">2021년 3월 민간 준공 후 미분양<br>(소계, 공사 완료 후)</p><!--2022.03.31 퍼블수정 / 텍스트 변경 -->
                                        <p class="tx2">-</p>
                                        <div class="linebox botnoline">
                                            <p class="txbar">전월대비:-</p>
                                        </div>
                                    </div>
                                    <div class="nodata"></div>
                                    <span class="watermark horizongray"></span>
                                </div>
                                <!-- 테이블 -->
                                <div class="tradingtable people">
                                    <div class="tablelabel">
                                        <span>구분</span>
                                        <span>소계</span>
                                        <span>변동률(%)</span>
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
                                            </div>
                                        </div>
                                    </jQueryScrollbar>
                                </div>
                                <div class="textbox"><span role="button" class="btn-statistics iconsource" @click="openPublicPopup('open',$event,'unsoldType1')">출처 : 국가통계 포털</span></div>
                            </div>
                        </div>
                        <div class="tabcon" role="tabpanel" v-if="tabnum1===1">
                            <div class="holdcon">
                                 <!-- 2022.03.31 퍼블수정 / 라디오, 스위치 버튼 삭제-->
                                <div class="chartlegend type2">
                                    <span class="legend stick-63e6be">미분양</span>
                                    <span class="legend linedarkblue">변동률</span>
                                </div>
                                <div class="unittextbox between">
                                    <span>미분양: 호</span>
                                    <span>변동률(%)</span>
                                </div>
                                <!-- 차트영역 -->
                                <div class="chartbox" style="height:370px;">
                                    <!-- 모바일의 경우 (해상도 1189이하 부터) 해당 툴팁 표기 -->
                                    <div class="chartTip tradingtip mobile" style="top:-140px;">
                                        <p class="tx1">2021년 3월 준공 후 미분양<br>(공공, 소계)</p><!--2022.03.31 퍼블수정 / 텍스트 변경 -->
                                        <p class="tx2">1,234호</p>
                                        <div class="linebox botnoline">
                                            <p class="txbar">전월대비:<span class="ico numup"></span>12.3%</p>
                                        </div>
                                    </div>
                                    <!--웹의 경우 (해상도 1190이상 부터) 해당 차트 내 툴팁 표기 -->
                                    <div class="chartTip tradingtip " style="top:30px;left:50px">
                                        <p class="tx1">2021년 3월 준공 후 미분양<br>(공공, 소계)</p><!--2022.03.31 퍼블수정 / 텍스트 변경 -->
                                        <p class="tx2">1,234호</p>
                                        <div class="linebox botnoline">
                                            <p class="txbar">전월대비:<span class="ico numup"></span>12.3%</p>
                                        </div>
                                    </div>
                                    <div class="nodata"></div>
                                    <span class="watermark horizongray"></span>
                                </div>
                                <!-- 테이블 -->
                                <div class="tradingtable people">
                                    <div class="tablelabel">
                                        <span>구분</span>
                                        <span>소계</span>
                                        <span>변동률(%)</span>
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
                                            </div>
                                        </div>
                                    </jQueryScrollbar>
                                </div>
                                <div class="textbox"><span role="button" class="btn-statistics iconsource" @click="openPublicPopup('open',$event,'unsoldType1')">출처 : 국가통계 포털</span></div>
                            </div>
                        </div>
                    </template>
                </TabContent>
            </div>
        </div>
        <!-- 미분양과 거래량 비교 -->
        <div class="cardCaptureBox">
            <ChartOption
                :optionList="optionList"
                @print="cardOption('print')"
                @capture="cardOption('capture')"
            />
            <div class="cardbox cardCapture">
                <div class="cardtit tradingtit">
                    <h1 class="titdepth2">미분양과 거래량 비교</h1>
                </div>
                <div class="holdcon">
                    <div class="textbox">
                        <div class="listbtn type3">
                        <button class="btn textline" @click="subTabActive($event,'.type3','년별');">년별</button>
                        <button class="btn textline" @click="subTabActive($event,'.type3','분기별');">분기별</button>
                        <button class="btn textline" @click="subTabActive($event,'.type3','월별');">월별</button>
                        <div :class="['pickerarea ', {active:monthAcitve3},{select:openPicker3}]">
                            <div class="pickerselect-text">
                                <template v-if="starttime3.length > 0">
                                    {{starttime3[0]}}~{{starttime3[1]}}
                                </template>
                            </div>
                            <button :class="['iconbtn btn-picker', {active:monthAcitve3}]" @click="togglePicker('type3')" />
                        </div>
                        <!-- 날짜선택 -->
                        <div class="pickerlayer lineLayer" v-if="openPicker3">
                            <div class="pickerTit">
                                기간선택
                                <div class="rangevalue">
                                    <span>{{starttime3[0]}}~{{starttime3[1]}}</span>
                                </div>
                                <button class="btn btn-popclose" @click="togglePicker('type3')"></button>
                            </div>
                            <div class="rangeTit">
                                <div>시작</div>
                                <div>종료</div>
                            </div>
                            <DatePicker
                                inline
                                range
                                type="month"
                                v-model="starttime3"
                                format="YY.MM"
                                value-type="format"
                                :lang="customLang"
                                @change="handleChange('type3')"
                            />
                            <div class="btmlocbtn">
                                <button class="btn btn-reset">초기화</button>
                                <button class="btn btn-round cancel" @click="togglePicker('type3')">취소</button>
                                <button class="btn btn-round confirm" @click="togglePicker('type3')">확인</button>
                            </div>
                        </div>
                    </div>
                    </div>
                    <div class="chartlegend type2">
                        <span class="legend line-e74980">미분양</span>
                        <span class="legend linedarkblue">주택매매거래량</span>
                    </div>
                    <div class="unittextbox right">
                        <span>변동률(%)</span>
                    </div>
                    <!-- 차트영역 -->
                    <div class="chartbox" style="height:370px;">
                        <!-- 모바일의 경우 (해상도 1189이하 부터) 해당 툴팁 표기 -->
                        <div class="chartTip tradingtip mobile" style="top:-140px;">
                            <p class="tx1">2021년 1월 (변동률, 전월대비)</p>
                            <div class="linebox botnoline">
                                <p class="tx2 txblack">미분양</p>
                                <p class="txbar txblack"><span class="ico numup"></span>0.123%</p>
                            </div>
                            <div class="linebox botnoline">
                                <p class="tx2 txblack">거래량</p>
                                <p class="txbar txblack"><span class="ico numup"></span>0.123%</p>
                            </div>
                        </div>
                        <!--웹의 경우 (해상도 1190이상 부터) 해당 차트 내 툴팁 표기 -->
                        <div class="chartTip tradingtip " style="top:30px;left:50px">
                            <p class="tx1">2021년 1월 (변동률, 전월대비)</p>
                            <div class="linebox botnoline">
                                <p class="tx2 txblack">미분양</p>
                                <p class="txbar txblack"><span class="ico numup"></span>0.123%</p>
                            </div>
                            <div class="linebox botnoline">
                                <p class="tx2 txblack">거래량</p>
                                <p class="txbar txblack"><span class="ico numup"></span>0.123%</p>
                            </div>
                        </div>
                        <div class="nodata"></div>
                        <span class="watermark horizongray"></span>
                    </div>
                    <!-- 테이블 -->
                    <div class="tradingtable people">
                        <div class="tablelabel">
                            <span>구분</span>
                            <span>미분양</span>
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
                    <!-- 2022.02.09 출처버튼 삭제-->
                </div>

            </div>
        </div>
        <!-- 미분양 지역 순위 -->
        <div class="cardCaptureBox"> <!-- 리스트 모션 반영시 ListMotionBox 클래스 추가예정 -->
            <ChartOption
                :optionList="optionList"
                @print="cardOption('print')"
                @capture="cardOption('capture')"
            />
            <div class="cardbox cardCapture">
                <div class="cardtit type2">
                    <h1 class="titdepth2"><span class="colortype-4281ff">서울</span> 미분양 지역 순위</h1>
                    <div class="subtit">(2021년 7월 기준)</div>
                </div>
                <div class="locranklist">
                    <div class="rowlisthead">
                        <div class="toprow">
                            <div class="cell celltype2"><button type="button" class="btn btn-priceup">미분양<span>(호)</span></button></div><!-- 2022.03.03 퍼블 수정 / 오름차순 : up 클래스 추가 ex) btn-priceup up -->
                            <div class="cell"><button type="button" class="btn">변동량<span>(전월대비)</span></button></div>
                            <div class="cell celltypelast"><button type="button" class="btn">변동률<span>(전월대비)</span></button></div>
                        </div>
                    </div>
                    <div class="rowlistbody">
                        <div class="toprow" v-for="(item, index) in topUnsoldlists" :key="index">
                            <div class="cell ranktit">
                                <span class="num">{{index+1}}</span>
                                <span v-html="item.location"></span>
                            </div>
                            <div class="cell sortline" v-html="item.unsoldnum"></div>
                            <div class="cell">
                                <span class="numup"></span>
                                <span v-html="item.changeamount"></span>
                            </div>
                            <div class="cell">
                                <span class="numdown"></span>
                                <span v-html="item.changeratio"></span>
                            </div>
                            <div class="cell">
                                <button type="button" class="btn btnkbsale" title="KB 부동산 분양" @click="gotoPage(item.url)"></button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="rankmorebox">
                    <button type="button" class="btn btnrankmore arw" :class="{down:!dataMore, up:dataMore}" @click="SelectToggle('dataMore')">
                        <span v-if="dataMore">숨기기</span>
                        <span v-else>더보기</span>
                    </button>
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
                {day: '21.07'}
            ],
            locationSelect: false,
            locationSearch: false,
            tradingdatas: [
                
                {
                    location: '미분양',
                    data: [
                        {day: '20.07', value: '1,234'},
                        {day: '20.08', value: '1,234'},
                        {day: '20.09', value: '1,234'},
                        {day: '20.10', value: '1,234'},
                        {day: '20.11', value: '1,234'},
                        {day: '20.12', value: '1,234'},
                        {day: '21.01', value: '1,234'},
                        {day: '21.02', value: '1,234'},
                        {day: '21.03', value: '1,234'},
                        {day: '21.04', value: '1,234'},
                        {day: '21.05', value: '1,234'},
                        {day: '21.06', value: '1,234'},
                        {day: '21.07', value: '1,234'}
                    ]
                },
                {
                    location: '변동률(%)',
                    data: [
                        {day: '20.07', value: '-2.83'},
                        {day: '20.08', value: '-2.83'},
                        {day: '20.09', value: '-2.83'},
                        {day: '20.10', value: '-2.83'},
                        {day: '20.11', value: '-2.83'},
                        {day: '20.12', value: '-2.83'},
                        {day: '21.01', value: '-2.83'},
                        {day: '21.02', value: '-2.83'},
                        {day: '21.03', value: '-2.83'},
                        {day: '21.04', value: '-2.83'},
                        {day: '21.05', value: '-2.83'},
                        {day: '21.06', value: '-2.83'},
                        {day: '21.07', value: '-2.83'}
                    ]
                }
                
            ],
            tradingdatas1: [
                
                {
                    location: '소계',
                    data: [
                        {day: '20.07', value: '1,234'},
                        {day: '20.08', value: '1,234'},
                        {day: '20.09', value: '1,234'},
                        {day: '20.10', value: '1,234'},
                        {day: '20.11', value: '1,234'},
                        {day: '20.12', value: '1,234'},
                        {day: '21.01', value: '1,234'},
                        {day: '21.02', value: '1,234'},
                        {day: '21.03', value: '1,234'},
                        {day: '21.04', value: '1,234'},
                        {day: '21.05', value: '1,234'},
                        {day: '21.06', value: '1,234'},
                        {day: '21.07', value: '1,234'}
                    ]
                },
                {
                    location: '변동률(%)',
                    data: [
                        {day: '20.07', value: '-2.83'},
                        {day: '20.08', value: '-2.83'},
                        {day: '20.09', value: '-2.83'},
                        {day: '20.10', value: '-2.83'},
                        {day: '20.11', value: '-2.83'},
                        {day: '20.12', value: '-2.83'},
                        {day: '21.01', value: '-2.83'},
                        {day: '21.02', value: '-2.83'},
                        {day: '21.03', value: '-2.83'},
                        {day: '21.04', value: '-2.83'},
                        {day: '21.05', value: '-2.83'},
                        {day: '21.06', value: '-2.83'},
                        {day: '21.07', value: '-2.83'}
                    ]
                }
                
            ],
            // 미분양 지역 순위 리스트
            topUnsoldlists: [
                {
                    location: '경기 과천시',
                    unsoldnum: '12,345',
                    changeamount: '12,345',
                    changeratio: '1.23%',
                    url: null
                },
                {
                    location: '서울 종로구',
                    unsoldnum: '12,345',
                    changeamount: '12,345',
                    changeratio: '1.23%',
                    url: null
                },
                {
                    location: '서울 강남구',
                    unsoldnum: '12,345',
                    changeamount: '12,345',
                    changeratio: '1.23%',
                    url: null
                },
                {
                    location: '인천 서구',
                    unsoldnum: '12,345',
                    changeamount: '12,345',
                    changeratio: '1.23%',
                    url: null
                },
                {
                    location: '안산 일산서구',
                    unsoldnum: '12,345',
                    changeamount: '12,345',
                    changeratio: '1.23%',
                    url: null
                }
            ],
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
            //picker 데이터 포맷
            customLang: {
                months: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
            },
            // 미분양 현황 데이터
            starttime1: ['20/07', '21/07'],
            openPicker1: false,
            monthAcitve1: false,
            // 규모별 미분양 탭데이터
            tabnum1: 0,
            tabtextsType1: ['민간', '공공'],
            starttime2: ['20/07', '21/07'],
            openPicker2: false,
            monthAcitve2: false,
            // 미분양과 거래량 비교
            starttime3: ['20/07', '21/07'],
            openPicker3: false,
            monthAcitve3: false,
            // 미분양 지역 순위 더보기
            dataMore: false,
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
                /* 리스트 모션 추가
                this.cardH = document.querySelector('.ListMotionBox').offsetTop - document.querySelector('.ListMotionBox').offsetHeight;
                if (this.scrollH > this.cardH) {
                    this.ListMotion();
                }
                */
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
            console.log(type);
            if (type === '준공 후 미분양 현황') {
                this.tabnum1 = parm;
            } else if (type === '상세 기준별 거래량') {
                this.tabnum2 = parm;
            } else if (type === '주택매매') {
                this.tabnum3 = parm;
            } else if (type === '아파트매매') {
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
                text === '월별' ? this.monthAcitve2 = true : this.monthAcitve2 = false;
            } else if (classname === '.type3') {
                text === '월별' ? this.monthAcitve3 = true : this.monthAcitve3 = false;
            }
            
        },
        //데이터피커 레이어 open/close
        togglePicker(type) {
            if (type === 'type1') {
                this.openPicker1 = !this.openPicker1;
            } else if (type === 'type2') {
                this.openPicker2 = !this.openPicker2;
            } else if (type === 'type3') {
                this.openPicker3 = !this.openPicker3;
            }
        },
        //데이터피커 선택시
        handleChange(type) {
            if (type === 'type1') {
                this.openPicker1 = !this.openPicker1;
            } else if (type === 'type2') {
                this.openPicker2 = !this.openPicker2;
            } else if (type === 'type3') {
                this.openPicker3 = !this.openPicker3;
            }
        },
        // 토글 이벤트
        SelectToggle(parms) {
            this[parms] = !this[parms];
        },
        // 지역검색 텍스트 삭제
        TxtDelete() {
            this.srhtext = '';
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
        /* 리스트 모션
        ListMotion() {
            let ele = document.querySelectorAll('.locranklist .toprow');
            if (ele) {
                document.querySelector('.locranklist .rowlistbody').classList.add('active');
                for (let i = 0; i <= this.topUnsoldlists.length; i++) {
                    ele[i].style.setProperty('transition-delay', 0.05 * i + 's');
                }
            }
        }
        */
    }
};
</script>