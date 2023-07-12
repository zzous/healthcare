<template>
    <section class="trading">
        <div class="mainTitle">
			<h1 class="titdepth1">주택거래량</h1> <!-- 2022.03.22 퍼블수정 / 타이틀 변경 -->
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
            <div class="txttop5">
                <span class="txt">거래량 Top5</span>
            </div>
            <div role="tooltip" class="tooltip top houseTip" style="top:-70px;" v-if="guidetip1">
                <span aria-hidden="true" class="arrow"></span>
                <div class="flexbox">
                    <p>2021. 07 기준<br>주택 매매 거래량 최다 지역 (시/군/구) </p>
                    <button type="button" title="툴팁닫기" class="tipclose" @click="TipToggle('guidetip1',guidetip1 )"></button>
                </div>
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
                <button type="button" class="btntoprank iconcrown arw" :class="{down:!topView, up:topView}" @click="SelectToggle('topView')">거래량 Top5</button>
                <div class="toprankingbox">
                    <div class="titbox iconcrown">거래량 Top5</div>
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
        <!-- 주택매매 거래량 -->
        
        <div class="cardCaptureBox">
            <ChartOption
                :optionList="optionList"
                @print="cardOption('print')"
                @capture="cardOption('capture')"
            />
            <div class="cardbox cardCapture">
                <div class="cardtit tradingtit">
                    <h1 class="titdepth2">주택매매 거래량</h1>
                </div>
                <TabContent
                    :tabcontentname="'주택매매 거래량'"
                    :tabsublist="'tabbox tabtype3  submenu'"
                    :tabtexts="tabtextsType1"
                    v-on:tabactive="tabClick"
                >
                    <template slot="tabsubtnArea">
                        <div class="listbtn type1">
                            <button class="btn textline" @click="subTabActive($event,'.type1','3년');">3년</button>
                            <button class="btn textline" @click="subTabActive($event,'.type1','년별');">년별</button>
                            <button class="btn textline" @click="subTabActive($event,'.type1','분기별');">분기별</button>
                            <button class="btn textline" @click="subTabActive($event,'.type1','월별');">월별</button>
                            <div :class="['pickerarea ', {active:monthAcitve},{select:openPicker}]">
                                <div class="pickerselect-text">
                                    <template v-if="starttime.length > 0">
                                        {{starttime[0]}}~{{starttime[1]}}
                                    </template>
                                </div>
                                <button :class="['iconbtn btn-picker', {active:monthAcitve}]" @click="togglePicker('type1')" />
                            </div>
                            <!-- 날짜선택 -->
                            <div class="pickerlayer lineLayer" v-if="openPicker">
                                <div class="pickerTit">
                                    기간선택
                                    <div class="rangevalue">
                                        <span>{{starttime[0]}}~{{starttime[1]}}</span>
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
                                    v-model="starttime"
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
                    </template>
                    <template slot="panel">
                        <div class="tabcon" role="tabpanel" v-if="tabnum===0">
                            <div>
                                <div class="tradingchart" style="position:relative">
                                    <!-- 모바일의 경우 (해상도 767이하 부터) 해당 툴팁 표기 -->
                                    <div class="chartTip tradingtip mobile" >
                                        <p class="tx1">3월 5년 평균 거래량 (’16~’20년)</p>
                                        <p class="tx2">123,456건</p>
                                        <div class="linebox">
                                            <p class="txnum">21.3월: 12,345건(<span class="ico numup"></span>12.3%)</p>
                                            <p class="txnum">20.3월: 12,345건(<span class="ico numup"></span>12.3%)</p>
                                            <p class="txnum">19.3월: 12,345건(<span class="ico numdown"></span>12.3%)</p>
                                        </div>
                                        <Guidetext :icotype="'icoinfo'" :guidetext="'괄호 안의 변동률은 전년동월의 거래량과 비교한 수치입니다.'"  />
                                    </div>
                                    <!-- 범례 -->
                                    <div class="chartlegend line tradinglegend type2">
                                        <span class="legend legendlicon1">2019년</span>
                                        <span class="legend legendlicon2">2020년</span>
                                        <span class="legend legendlicon3">2021년</span>
                                        <span class="legend legendlicon4">5년평균</span>
                                        <span class="textlabel">단위 : 건 수</span> <!-- 변동률 탭에서는 "단위 : 변동률(%)" 로 표기 -->
                                    </div>
                                    <div class="chartview" style="height:348px;position:relative">
                                        <!--웹의 경우 (해상도 768이상 부터) 해당 차트 내 툴팁 표기 -->
                                        <div class="chartTip tradingtip" style="top:30px;left:50px">
                                            <p class="tx1">3월 5년 평균 거래량 (’16~’20년)</p>
                                            <p class="tx2">123,456건</p>
                                            <div class="linebox">
                                                <p class="txnum">21.3월: 12,345건(<span class="ico numup"></span>12.3%)</p>
                                                <p class="txnum">20.3월: 12,345건(<span class="ico numup"></span>12.3%)</p>
                                                <p class="txnum">19.3월: 12,345건(<span class="ico numdown"></span>12.3%)</p>
                                            </div>
                                            <Guidetext :icotype="'icoinfo'" :guidetext="'괄호 안의 변동률은 전년동월의 거래량과 비교한 수치입니다.'"  />
                                        </div>
                                        <div class="nodata"></div>
                                        <span class="watermark horizongray"></span>
                                    </div>
                                    
                                </div>
                                <div class="tradingtable">
                                    <div class="tablelabel">
                                        <span>구분</span>
                                        <span>전국</span>
                                        <span>수도권</span>
                                        <span>지방</span>
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
                                <div class="textbox">
                                    <span role="button" class="btn-statistics iconsource" @click="openPublicPopup('open',$event,'tradingType1')">출처: 국가통계포털</span>
                                </div>
                            </div>
                        </div>
                        <div class="tabcon" role="tabpanel" v-else-if="tabnum===1">
                            <div>
                                <div class="tradingchart" style="position:relative">
                                    <!-- 범례 -->
                                    <div class="chartlegend line tradinglegend type2">
                                        <span class="legend legendlicon1">2019년</span>
                                        <span class="legend legendlicon2">2020년</span>
                                        <span class="legend legendlicon3">2021년</span>
                                        <span class="legend legendlicon4">5년평균</span>
                                        <span class="textlabel">단위 : 변동률(%)</span>
                                    </div>
                                    <div class="chartview" style="height:348px;position:relative">
                                        <!-- 모바일의 경우 (해상도 767이하 부터) 해당 툴팁 표기 -->
                                        <div class="chartTip tradingtip mobile" style="top:-170px;">
                                            <p class="tx1">3월 5년 평균 변동률 ('16~'20년)</p>
                                            <p class="tx2 up">12.3%</p> <!-- 하락시 down 클래스로 변경 -->
                                            <div class="linebox">
                                                <p class="txnum">21.3월: 12,345건(<span class="ico numup"></span>12.3%)</p>
                                                <p class="txnum">20.3월: 12,345건(<span class="ico numup"></span>12.3%)</p>
                                                <p class="txnum">19.3월: 12,345건(<span class="ico numdown"></span>12.3%)</p>
                                            </div>
                                            <Guidetext :icotype="'icoinfo'" :guidetext="'괄호 안의 변동률은 전년동월의 거래량과 비교한 수치입니다.'"  />
                                        </div>
                                        <!--웹의 경우 (해상도 768이상 부터) 해당 차트 내 툴팁 표기 -->
                                        <div class="chartTip tradingtip" style="top:30px;left:50px">
                                            <p class="tx1">3월 5년 평균 변동률 ('16~'20년)</p>
                                            <p class="tx2 up">12.3%</p> <!-- 하락시 down 클래스로 변경 -->
                                            <div class="linebox">
                                                <p class="txnum">21.3월: 12,345건(<span class="ico numup"></span>12.3%)</p>
                                                <p class="txnum">20.3월: 12,345건(<span class="ico numup"></span>12.3%)</p>
                                                <p class="txnum">19.3월: 12,345건(<span class="ico numdown"></span>12.3%)</p>
                                            </div>
                                            <Guidetext :icotype="'icoinfo'" :guidetext="'괄호 안의 변동률은 전년동월의 거래량과 비교한 수치입니다.'"  />
                                        </div>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                    </template>
                </TabContent>
            </div>
        </div>
        <!-- 상세 기준별 거래량 -->
        <div class="cardCaptureBox">
            <ChartOption
                :optionList="optionList"
                @print="cardOption('print')"
                @capture="cardOption('capture')"
            />
            <div class="cardbox cardCapture">
                <div class="cardtit tradingtit">
                    <h1 class="titdepth2">상세 기준별 거래량</h1>
                </div>
                <TabContent
                    :tabcontentname="'상세 기준별 거래량'"
                    :tabsublist="'tabbox tabtype3  submenu'"
                    :tabtexts="tabtextsType2"
                    v-on:tabactive="tabClick"
                >
                    <template slot="tabsubtnArea">
                        <div class="listbtn type2">
                            <button class="btn textline" @click="subTabActive($event,'.type2','년별');">년별</button>
                            <button class="btn textline" @click="subTabActive($event,'.type2','분기별');">분기별</button>
                            <button class="btn textline" @click="subTabActive($event,'.type2','월별');">월별</button>
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
                                    format="YY.MM"
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
                            <TabContent
                                :tabcontentname="'주택매매'"
                                :tabsublist="'tabbox tabtype5'"
                                :tabtexts="tabtextsType3"
                                v-on:tabactive="tabClick"
                            >
                                <template slot="panel">
                                    <div class="tabcon" v-if="tabnum2===0">
                                        <div class="checkedlegend">
                                            <!-- <div class="legenditem">
                                                <button v-for="(item,index) in checktiems" :key="index" v-html="item.text" :class="['btn-check', item.classname, {active:item.active}]">아파트</button>
                                            </div> -->
                                            <button v-for="(item,index) in checktiems" :key="index" v-html="item.text" :class="['btn-check', item.classname, {active:item.active}]">아파트</button><!-- 체크해제 : active 클래스제거 -->
                                            <div class="rangelegend">
                                                <div class="switchwrap">
                                                    하나씩 보기
                                                    <div class="switch-button custom-control sm">
                                                        <input type="checkbox" id="changeRatio2">
                                                        <label for="changeRatio2" class="switch"><span class="txt">증감률</span></label>
                                                    </div>
                                                </div>
                                                <span class="text">단위 : 건 수</span>
                                            </div>
                                        </div>
                                        <div class="barchertArea" style="height:378px;position:relative">
                                            <!-- 모바일의 경우 (해상도 767이하 부터) 해당 툴팁 표기 -->
                                            <div class="chartTip tradingtip mobile"  style="top:-260px">
                                                <p class="tx1">21.12월 주택매매 거래량</p>
                                                <p class="tx2">123,456건</p>
                                                <div class="linebox botnoline">
                                                    <span class="legendlist housetype1">아파트 : 123,456건</span>
                                                    <span class="legendlist housetype2">연립주택 : 123,456건</span>
                                                    <span class="legendlist housetype3">다세대주택 : 123,456건</span>
                                                    <span class="legendlist housetype4">다가구주택 : 123,456건</span>
                                                    <span class="legendlist housetype5">단독 : 123,456건</span>
                                                </div>
                                            </div>
                                            
                                            <div class="barchertbox">
                                                <!--웹의 경우 (해상도 768이상 부터) 해당 차트 내 툴팁 표기 -->
                                                <div class="chartTip tradingtip" style="top:0; left:50px;">
                                                    <p class="tx1">21.12월 주택매매 거래량</p>
                                                    <p class="tx2">123,456건</p>
                                                    <div class="linebox botnoline">
                                                        <span class="legendlist housetype1">아파트 : 123,456건</span>
                                                        <span class="legendlist housetype2">연립주택 : 123,456건</span>
                                                        <span class="legendlist housetype3">다세대주택 : 123,456건</span>
                                                        <span class="legendlist housetype4">다가구주택 : 123,456건</span>
                                                        <span class="legendlist housetype5">단독 : 123,456건</span>
                                                    </div>
                                                </div>
                                                <div class="barlinebox">
                                                    <div class="barline">
                                                        <div class="lineitem housetype5" style="height:5%;"></div>
                                                        <div class="lineitem housetype4" style="height:5%;"></div>
                                                        <div class="lineitem housetype3" style="height:5%;"></div>
                                                        <div class="lineitem housetype2" style="height:5%;"></div>
                                                        <div class="lineitem housetype1" style="height:60%;"></div>
                                                    </div>
                                                </div>
                                                
                                            </div>
                                        </div>
                                        <!-- 테이블 -->
                                        <div class="tradingtable">
                                            <div class="tablelabel">
                                                <span>구분</span>
                                                <span>전국</span>
                                                <span>수도권</span>
                                                <span>지방</span>
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
                                        <div class="textbox">
                                            <span role="button" class="btn-statistics iconsource" @click="openPublicPopup('open',$event,'tradingType1')">출처: 국가통계포털</span>
                                        </div>
                                    </div>
                                    <!-- 거래규모 -->
                                    <div class="tabcon"  v-if="tabnum2===1">
                                        <div class="checkedlegend">
                                            <button class="btn-check housetransize1 active">20㎡이하</button>
                                            <button class="btn-check housetransize2 active">21~40㎡</button>
                                            <button class="btn-check housetransize3 active">41~60㎡</button>
                                            <button class="btn-check housetransize4 active">61~85㎡</button>
                                            <button class="btn-check housetransize5 active">86~100㎡</button>
                                            <button class="btn-check housetransize6 active">101~135㎡</button>
                                            <button class="btn-check housetransize7 active">136~165㎡</button>
                                            <button class="btn-check housetransize8 active">166~198㎡</button>
                                            <button class="btn-check housetransize9 active">198㎡초과</button>
                                            <div class="rangelegend">
                                                <div class="switchwrap">
                                                    하나씩 보기
                                                    <div class="switch-button custom-control sm">
                                                        <input type="checkbox" id="changeRatio2">
                                                        <label for="changeRatio2" class="switch"><span class="txt">증감률</span></label>
                                                    </div>
                                                </div>
                                                <span class="text">단위 : 건 수</span>
                                            </div>
                                        </div>
                                        <div class="barchertArea" style="height:378px;position:relative">
                                            <!-- 모바일의 경우 (해상도 767이하 부터) 해당 툴팁 표기 -->
                                            <div class="chartTip tradingtip mobile"  style="top:-260px">
                                                <p class="tx1">21.12월 주택매매 거래량</p>
                                                <p class="tx2">123,456건</p>
                                                <div class="linebox botnoline">
                                                    <span class="legendlist housetransize1">20㎡이하 : 1,588건</span>
                                                    <span class="legendlist housetransize2">21~40㎡ : 12,608건</span>
                                                    <span class="legendlist housetransize3">41~60㎡ : 35,589건</span>
                                                    <span class="legendlist housetransize4">61~85㎡ : 32,600건</span>
                                                    <span class="legendlist housetransize5">86~100㎡ : 2,524건</span>
                                                    <span class="legendlist housetransize6">101~135㎡ : 6,146건</span>
                                                    <span class="legendlist housetransize7">136~165㎡ : 2,191건</span>
                                                    <span class="legendlist housetransize8">166~198㎡ : 1,294건</span>
                                                    <span class="legendlist housetransize9">198㎡초과 : 2,984건</span>
                                                </div>
                                            </div>
                                            
                                            <div class="barchertbox">
                                                <!--웹의 경우 (해상도 768이상 부터) 해당 차트 내 툴팁 표기 -->
                                                <div class="chartTip tradingtip" style="top:0; left:50px;">
                                                    <p class="tx1">21.12월 주택매매 거래량</p>
                                                    <p class="tx2">123,456건</p>
                                                    <div class="linebox botnoline">
                                                        <span class="legendlist housetransize1">20㎡이하 : 1,588건</span>
                                                        <span class="legendlist housetransize2">21~40㎡ : 12,608건</span>
                                                        <span class="legendlist housetransize3">41~60㎡ : 35,589건</span>
                                                        <span class="legendlist housetransize4">61~85㎡ : 32,600건</span>
                                                        <span class="legendlist housetransize5">86~100㎡ : 2,524건</span>
                                                        <span class="legendlist housetransize6">101~135㎡ : 6,146건</span>
                                                        <span class="legendlist housetransize7">136~165㎡ : 2,191건</span>
                                                        <span class="legendlist housetransize8">166~198㎡ : 1,294건</span>
                                                        <span class="legendlist housetransize9">198㎡초과 : 2,984건</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- 거래주체 -->
                                    <div class="tabcon"  v-if="tabnum2===2">
                                        <div class="checkedlegend">
                                            <button class="btn-check housetranssubject1 active">개인-&gt;개인</button>
                                            <button class="btn-check housetranssubject2 active">개인-&gt;법인</button>
                                            <button class="btn-check housetranssubject3 active">개인-&gt;기타</button>
                                            <button class="btn-check housetranssubject4 active">법인-&gt;개인</button>
                                            <button class="btn-check housetranssubject5 active">법인-&gt;법인</button>
                                            <button class="btn-check housetranssubject6 active">법인-&gt;기타</button>
                                            <button class="btn-check housetranssubject7 active">기타-&gt;개인</button>
                                            <button class="btn-check housetranssubject8 active">기타-&gt;법인</button>
                                            <button class="btn-check housetranssubject9 active">기타-&gt;기타</button>
                                            <div class="rangelegend">
                                                <div class="switchwrap">
                                                    하나씩 보기
                                                    <div class="switch-button custom-control sm">
                                                        <input type="checkbox" id="changeRatio2">
                                                        <label for="changeRatio2" class="switch"><span class="txt">증감률</span></label>
                                                    </div>
                                                </div>
                                                <span class="text">단위 : 건 수</span>
                                            </div>
                                        </div>
                                        <div class="barchertArea" style="height:378px;position:relative">
                                            <!-- 모바일의 경우 (해상도 767이하 부터) 해당 툴팁 표기 -->
                                            <div class="chartTip tradingtip mobile"  style="top:-260px">
                                                <p class="tx1">21.12월 주택매매 거래량</p>
                                                <p class="tx2">123,456건</p>
                                                <div class="linebox botnoline">
                                                    <span class="legendlist housetranssubject1">개인-&gt;개인 : 82,733건</span>
                                                    <span class="legendlist housetranssubject2">개인-&gt;법인 : 5,060건</span>
                                                    <span class="legendlist housetranssubject3">개인-&gt;기타 : 1,331건</span>
                                                    <span class="legendlist housetranssubject4">법인-&gt;개인 : 5,881건</span>
                                                    <span class="legendlist housetranssubject5">법인-&gt;법인 : 697건</span>
                                                    <span class="legendlist housetranssubject6">법인-&gt;기타 : 469건</span>
                                                    <span class="legendlist housetranssubject7">기타-&gt;개인 : 1,322건</span>
                                                    <span class="legendlist housetranssubject8">기타-&gt;법인 : 23건</span>
                                                    <span class="legendlist housetranssubject9">기타-&gt;기타 : 8건</span>
                                                </div>
                                            </div>
                                            
                                            <div class="barchertbox">
                                                <!--웹의 경우 (해상도 768이상 부터) 해당 차트 내 툴팁 표기 -->
                                                <div class="chartTip tradingtip" style="top:0; left:50px;">
                                                    <p class="tx1">21.12월 주택매매 거래량</p>
                                                    <p class="tx2">123,456건</p>
                                                    <div class="linebox botnoline">
                                                        <span class="legendlist housetranssubject1">개인-&gt;개인 : 82,733건</span>
                                                        <span class="legendlist housetranssubject2">개인-&gt;법인 : 5,060건</span>
                                                        <span class="legendlist housetranssubject3">개인-&gt;기타 : 1,331건</span>
                                                        <span class="legendlist housetranssubject4">법인-&gt;개인 : 5,881건</span>
                                                        <span class="legendlist housetranssubject5">법인-&gt;법인 : 697건</span>
                                                        <span class="legendlist housetranssubject6">법인-&gt;기타 : 469건</span>
                                                        <span class="legendlist housetranssubject7">기타-&gt;개인 : 1,322건</span>
                                                        <span class="legendlist housetranssubject8">기타-&gt;법인 : 23건</span>
                                                        <span class="legendlist housetranssubject9">기타-&gt;기타 : 8건</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- 매입자연령 -->
                                    <div class="tabcon"  v-if="tabnum2===3">
                                        <div class="checkedlegend">
                                            <button class="btn-check buyerage1 active">20대이하</button>
                                            <button class="btn-check buyerage2 active">30대</button>
                                            <button class="btn-check buyerage3 active">40대</button>
                                            <button class="btn-check buyerage4 active">50대</button>
                                            <button class="btn-check buyerage5 active">60대</button>
                                            <button class="btn-check buyerage6 active">70대이상</button>
                                            <button class="btn-check buyerage7 active">기타</button>
                                            <div class="rangelegend">
                                                <div class="switchwrap">
                                                    하나씩 보기
                                                    <div class="switch-button custom-control sm">
                                                        <input type="checkbox" id="changeRatio2">
                                                        <label for="changeRatio2" class="switch"><span class="txt">증감률</span></label>
                                                    </div>
                                                </div>
                                                <span class="text">단위 : 건 수</span>
                                            </div>
                                        </div>
                                        <div class="barchertArea" style="height:378px;position:relative">
                                            <!-- 모바일의 경우 (해상도 767이하 부터) 해당 툴팁 표기 -->
                                            <div class="chartTip tradingtip mobile"  style="top:-260px">
                                                <p class="tx1">21.12월 주택매매 거래량</p>
                                                <p class="tx2">123,456건</p>
                                                <div class="linebox botnoline">
                                                    <span class="legendlist buyerage1">20대이하 : 6,145건</span>
                                                    <span class="legendlist buyerage2">30대 : 20,196건</span>
                                                    <span class="legendlist buyerage3">40대 : 21,909건</span>
                                                    <span class="legendlist buyerage4">50대 : 20,354건</span>
                                                    <span class="legendlist buyerage5">60대 : 14,195건</span>
                                                    <span class="legendlist buyerage6">70대이상 : 7,134건</span>
                                                    <span class="legendlist buyerage7">기타 : 7,591건</span>
                                                </div>
                                            </div>
                                            
                                            <div class="barchertbox">
                                                <!--웹의 경우 (해상도 768이상 부터) 해당 차트 내 툴팁 표기 -->
                                                <div class="chartTip tradingtip" style="top:0; left:50px;">
                                                    <p class="tx1">21.12월 주택매매 거래량</p>
                                                    <p class="tx2">123,456건</p>
                                                    <div class="linebox botnoline">
                                                        <span class="legendlist buyerage1">20대이하 : 6,145건</span>
                                                    <span class="legendlist buyerage2">30대 : 20,196건</span>
                                                    <span class="legendlist buyerage3">40대 : 21,909건</span>
                                                    <span class="legendlist buyerage4">50대 : 20,354건</span>
                                                    <span class="legendlist buyerage5">60대 : 14,195건</span>
                                                    <span class="legendlist buyerage6">70대이상 : 7,134건</span>
                                                    <span class="legendlist buyerage7">기타 : 7,591건</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </template>
                            </TabContent>
                        </div>
                        <div class="tabcon" role="tabpanel" v-else-if="tabnum1===1">
                            <TabContent
                                :tabcontentname="'아파트매매'"
                                :tabsublist="'tabbox tabtype5'"
                                :tabtexts="tabtextsType4"
                                v-on:tabactive="tabClick"
                            >
                                <template slot="panel">
                                    <div class="tabcon" v-if="tabnum3===0">
                                        <div class="checkedlegend">
                                            <button class="btn-check housetransize1 active">20㎡이하</button>
                                            <button class="btn-check housetransize2 active">21~40㎡</button>
                                            <button class="btn-check housetransize3 active">41~60㎡</button>
                                            <button class="btn-check housetransize4 active">61~85㎡</button>
                                            <button class="btn-check housetransize5 active">86~100㎡</button>
                                            <button class="btn-check housetransize6 active">101~135㎡</button>
                                            <button class="btn-check housetransize7 active">136~165㎡</button>
                                            <button class="btn-check housetransize8 active">166~198㎡</button>
                                            <button class="btn-check housetransize9 active">198㎡초과</button>
                                            <div class="rangelegend">
                                                <div class="switchwrap">
                                                    하나씩 보기
                                                    <div class="switch-button custom-control sm">
                                                        <input type="checkbox" id="changeRatio2">
                                                        <label for="changeRatio2" class="switch"><span class="txt">증감률</span></label>
                                                    </div>
                                                </div>
                                                <span class="text">단위 : 건 수</span>
                                            </div>
                                        </div>
                                        <div class="barchertArea" style="height:378px;position:relative">
                                            <!-- 모바일의 경우 (해상도 767이하 부터) 해당 툴팁 표기 -->
                                            <div class="chartTip tradingtip mobile"  style="top:-260px">
                                                <p class="tx1">21.12월 아파트매매 거래량</p>
                                                <p class="tx2">123,456건</p>
                                                <div class="linebox botnoline">
                                                    <span class="legendlist housetransize1">20㎡이하 : 1,588건</span>
                                                    <span class="legendlist housetransize2">21~40㎡ : 12,608건</span>
                                                    <span class="legendlist housetransize3">41~60㎡ : 35,589건</span>
                                                    <span class="legendlist housetransize4">61~85㎡ : 32,600건</span>
                                                    <span class="legendlist housetransize5">86~100㎡ : 2,524건</span>
                                                    <span class="legendlist housetransize6">101~135㎡ : 6,146건</span>
                                                    <span class="legendlist housetransize7">136~165㎡ : 2,191건</span>
                                                    <span class="legendlist housetransize8">166~198㎡ : 1,294건</span>
                                                    <span class="legendlist housetransize9">198㎡초과 : 2,984건</span>
                                                </div>
                                            </div>
                                            
                                            <div class="barchertbox">
                                                <!--웹의 경우 (해상도 768이상 부터) 해당 차트 내 툴팁 표기 -->
                                                <div class="chartTip tradingtip" style="top:0; left:50px;">
                                                    <p class="tx1">21.12월 아파트매매 거래량</p>
                                                    <p class="tx2">123,456건</p>
                                                    <div class="linebox botnoline">
                                                        <span class="legendlist housetransize1">20㎡이하 : 1,588건</span>
                                                        <span class="legendlist housetransize2">21~40㎡ : 12,608건</span>
                                                        <span class="legendlist housetransize3">41~60㎡ : 35,589건</span>
                                                        <span class="legendlist housetransize4">61~85㎡ : 32,600건</span>
                                                        <span class="legendlist housetransize5">86~100㎡ : 2,524건</span>
                                                        <span class="legendlist housetransize6">101~135㎡ : 6,146건</span>
                                                        <span class="legendlist housetransize7">136~165㎡ : 2,191건</span>
                                                        <span class="legendlist housetransize8">166~198㎡ : 1,294건</span>
                                                        <span class="legendlist housetransize9">198㎡초과 : 2,984건</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- 거래주체 -->
                                    <div class="tabcon" v-if="tabnum3===1">
                                        <div class="checkedlegend">
                                            <button class="btn-check housetranssubject1 active">개인-&gt;개인</button>
                                            <button class="btn-check housetranssubject2 active">개인-&gt;법인</button>
                                            <button class="btn-check housetranssubject3 active">개인-&gt;기타</button>
                                            <button class="btn-check housetranssubject4 active">법인-&gt;개인</button>
                                            <button class="btn-check housetranssubject5 active">법인-&gt;법인</button>
                                            <button class="btn-check housetranssubject6 active">법인-&gt;기타</button>
                                            <button class="btn-check housetranssubject7 active">기타-&gt;개인</button>
                                            <button class="btn-check housetranssubject8 active">기타-&gt;법인</button>
                                            <button class="btn-check housetranssubject9 active">기타-&gt;기타</button>
                                            <div class="rangelegend">
                                                <div class="switchwrap">
                                                    하나씩 보기
                                                    <div class="switch-button custom-control sm">
                                                        <input type="checkbox" id="changeRatio2">
                                                        <label for="changeRatio2" class="switch"><span class="txt">증감률</span></label>
                                                    </div>
                                                </div>
                                                <span class="text">단위 : 건 수</span>
                                            </div>
                                        </div>
                                        <div class="barchertArea" style="height:378px;position:relative">
                                            <!-- 모바일의 경우 (해상도 767이하 부터) 해당 툴팁 표기 -->
                                            <div class="chartTip tradingtip mobile"  style="top:-260px">
                                                <p class="tx1">21.12월 아파트매매 거래량</p>
                                                <p class="tx2">123,456건</p>
                                                <div class="linebox botnoline">
                                                    <span class="legendlist housetranssubject1">개인-&gt;개인 : 82,733건</span>
                                                    <span class="legendlist housetranssubject2">개인-&gt;법인 : 5,060건</span>
                                                    <span class="legendlist housetranssubject3">개인-&gt;기타 : 1,331건</span>
                                                    <span class="legendlist housetranssubject4">법인-&gt;개인 : 5,881건</span>
                                                    <span class="legendlist housetranssubject5">법인-&gt;법인 : 697건</span>
                                                    <span class="legendlist housetranssubject6">법인-&gt;기타 : 469건</span>
                                                    <span class="legendlist housetranssubject7">기타-&gt;개인 : 1,322건</span>
                                                    <span class="legendlist housetranssubject8">기타-&gt;법인 : 23건</span>
                                                    <span class="legendlist housetranssubject9">기타-&gt;기타 : 8건</span>
                                                </div>
                                            </div>
                                            
                                            <div class="barchertbox">
                                                <!--웹의 경우 (해상도 768이상 부터) 해당 차트 내 툴팁 표기 -->
                                                <div class="chartTip tradingtip" style="top:0; left:50px;">
                                                    <p class="tx1">21.12월 아파트매매 거래량</p>
                                                    <p class="tx2">123,456건</p>
                                                    <div class="linebox botnoline">
                                                        <span class="legendlist housetranssubject1">개인-&gt;개인 : 82,733건</span>
                                                        <span class="legendlist housetranssubject2">개인-&gt;법인 : 5,060건</span>
                                                        <span class="legendlist housetranssubject3">개인-&gt;기타 : 1,331건</span>
                                                        <span class="legendlist housetranssubject4">법인-&gt;개인 : 5,881건</span>
                                                        <span class="legendlist housetranssubject5">법인-&gt;법인 : 697건</span>
                                                        <span class="legendlist housetranssubject6">법인-&gt;기타 : 469건</span>
                                                        <span class="legendlist housetranssubject7">기타-&gt;개인 : 1,322건</span>
                                                        <span class="legendlist housetranssubject8">기타-&gt;법인 : 23건</span>
                                                        <span class="legendlist housetranssubject9">기타-&gt;기타 : 8건</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- 매입자연령 -->
                                    <div class="tabcon" v-if="tabnum3===2">
                                        <div class="checkedlegend">
                                            <button class="btn-check buyerage1 active">20대이하</button>
                                            <button class="btn-check buyerage2 active">30대</button>
                                            <button class="btn-check buyerage3 active">40대</button>
                                            <button class="btn-check buyerage4 active">50대</button>
                                            <button class="btn-check buyerage5 active">60대</button>
                                            <button class="btn-check buyerage6 active">70대이상</button>
                                            <button class="btn-check buyerage7 active">기타</button>
                                            <div class="rangelegend">
                                                <div class="switchwrap">
                                                    하나씩 보기
                                                    <div class="switch-button custom-control sm">
                                                        <input type="checkbox" id="changeRatio2">
                                                        <label for="changeRatio2" class="switch"><span class="txt">증감률</span></label>
                                                    </div>
                                                </div>
                                                <span class="text">단위 : 건 수</span>
                                            </div>
                                        </div>
                                        <div class="barchertArea" style="height:378px;position:relative">
                                            <!-- 모바일의 경우 (해상도 767이하 부터) 해당 툴팁 표기 -->
                                            <div class="chartTip tradingtip mobile"  style="top:-260px">
                                                <p class="tx1">21.12월 아파트매매 거래량</p>
                                                <p class="tx2">123,456건</p>
                                                <div class="linebox botnoline">
                                                    <span class="legendlist buyerage1">20대이하 : 6,145건</span>
                                                    <span class="legendlist buyerage2">30대 : 20,196건</span>
                                                    <span class="legendlist buyerage3">40대 : 21,909건</span>
                                                    <span class="legendlist buyerage4">50대 : 20,354건</span>
                                                    <span class="legendlist buyerage5">60대 : 14,195건</span>
                                                    <span class="legendlist buyerage6">70대이상 : 7,134건</span>
                                                    <span class="legendlist buyerage7">기타 : 7,591건</span>
                                                </div>
                                            </div>
                                            
                                            <div class="barchertbox">
                                                <!--웹의 경우 (해상도 768이상 부터) 해당 차트 내 툴팁 표기 -->
                                                <div class="chartTip tradingtip" style="top:0; left:50px;">
                                                    <p class="tx1">21.12월 아파트매매 거래량</p>
                                                    <p class="tx2">123,456건</p>
                                                    <div class="linebox botnoline">
                                                        <span class="legendlist buyerage1">20대이하 : 6,145건</span>
                                                    <span class="legendlist buyerage2">30대 : 20,196건</span>
                                                    <span class="legendlist buyerage3">40대 : 21,909건</span>
                                                    <span class="legendlist buyerage4">50대 : 20,354건</span>
                                                    <span class="legendlist buyerage5">60대 : 14,195건</span>
                                                    <span class="legendlist buyerage6">70대이상 : 7,134건</span>
                                                    <span class="legendlist buyerage7">기타 : 7,591건</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </template>
                            </TabContent>
                        </div>
                    </template>
                </TabContent>
            </div>
        </div>
        <!-- 거래량과 가격변동률∙인구이동 비교 -->
        <div class="cardCaptureBox">
            <ChartOption
                :optionList="optionList"
                @print="cardOption('print')"
                @capture="cardOption('capture')"
            />
            <div class="cardbox cardCapture">
                <div class="cardtit tradingtit">
                    <h1 class="titdepth2">거래량과 가격변동률∙인구이동 비교</h1>
                </div>
                <!--2022.04.14 퍼블 수정 -->
                <div class="filterforms type2">
                    <div class="bubblelegend">
                        <span class="tit">버블 갯수</span>
                        <div class="radioforms">
                            <label for="year" class="custom-radio2 custom-control">
                                <input type="radio" name="time" id="year" checked="">
                                <span>5개</span>
                            </label>
                            <label for="quarter" class="custom-radio2 custom-control">
                                <input type="radio" name="time" id="quarter">
                                <span>10개</span>
                            </label>
                            <label for="month" class="custom-radio2 custom-control">
                                <input type="radio" name="time" id="month" disabled> <!-- 비활성화 상태 -->
                                <span>15개</span>
                            </label>
                        </div>
                    </div>
                    <div class="chartlegend type2">
                        <span class="legend bubbleareatype1">현재지역 거래량</span>
                        <span class="legend bubbleareatype2">Top 지역 거래량</span>
                        <span class="legend bubbleareatype3 fr">가격변동&amp;인구이동 높은 지역</span>
                    </div>
                </div>
                <div class="trandingrangeChart" style="height:431px">
                    <div class="bubblegroup">
                        <!-- 사분면차트 줌 버튼 추가 -->
                        <div class="maptools sm">
                            <button type="button" class="btn btn-Refresh">새로고침</button>
                            <div class="groups">
                                <button type="button" class="btn btn-zoom-up">확대</button>
                                <button type="button" class="btn btn-zoom-down">축소</button>
                            </div>
                        </div>
                        <div class="bubble bgcolortype-9a5eee" style="top:40px;left:140px;width:100px;height:100px">
                            <span>서울 종로구</span>
                            <span class="num">1,234건</span>
                            거래량
                        </div>
                        <div class="bubble bgcolortype-f783ac" style="top:300px;left:100px;width:90px;height:90px">
                            <span>서울 종로구</span>
                            <span class="num">1,234건</span>
                            거래량
                        </div>
                        <!-- [D] 2-1 선택된 지역 버블 -->
                        <div class="bubble active" style="top:50px;left:10px;width:160px;height:160px">
                            <span>서울 종로구</span>
                            <span class="num">1,234건</span>
                            거래량
                        </div>
                        <span class="watermark horizongray"></span>
                    </div>
                
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
                <div class="tradingnodata" v-if="false">
                    화면 상단에 전국 지역을 선택하시면 데이터를 보실수 있습니다. 지역을 선택하시면 해당 지역과 인근 지역들의 거래량, 가격변동률과 순 인구이동을 비교하실 수 있습니다.
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
            guidetip1: true,
            guidetip2: true,
            guidetip3: true,
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
            locationSelect: false,
            locationSearch: false,
            tradingdatas: [
                
                {
                    location: '전국',
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
                    location: '수도권',
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
                    location: '지방',
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
            checktiems: [
                {text: '아파트', active: true, classname: 'housetype1'},
                {text: '연립주택', active: true, classname: 'housetype2'},
                {text: '다세대주택', active: true, classname: 'housetype3'},
                {text: '다가구 주택', active: true, classname: 'housetype4'},
                {text: '단독주택', active: true, classname: 'housetype5'}
            ],
            checktiems1: [
                {text: '20m² 이하', active: true, classname: 'housetype1'},
                {text: '21~40m²', active: true, classname: 'housetype2'},
                {text: '41~60m²', active: true, classname: 'housetype3'},
                {text: '61~85m²', active: true, classname: 'housetype4'},
                {text: '86~100m²', active: true, classname: 'housetype5'},
                {text: '101~135m²', active: true, classname: 'housetype6'},
                {text: '136~165m²', active: true, classname: 'housetype7'},
                {text: '166~198m²', active: true, classname: 'housetype8'},
                {text: '198m² 초과', active: true, classname: 'housetype9'}
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
            //range 데이터
            datevalue: ['10월'],
            rangelists: ['8월', '9월', '10월', '11월', '12월', '1월', '2월', '3월', '4월', '5월', '6월', '7월'],
            // 주택매매 거래량 탭데이터
            tabnum: 0,
            tabtextsType1: ['거래량', '변동률'],
            starttime: ['21.05', '21.12'], //2022.02.18 퍼블 변경
            openPicker: false,
            monthAcitve: false,
            // 상세 기준별 거래량 탭데이터
            tabnum1: 0,
            tabtextsType2: ['주택매매', '아파트매매'],
            starttime1: ['21.05', '21.12'], //2022.02.18 퍼블 변경
            openPicker1: false,
            monthAcitve1: false,
            // 상세 기준별 거래량 탭데이터 - 주택매매탭
            tabnum2: 0,
            tabtextsType3: ['주택유형', '거래규모', '거래주체', '매입자연령'],
            tabnum3: 0,
            tabtextsType4: ['거래규모', '거래주체', '매입자연령'],
            // 지역검색
            srhtext: '',
            // 거래량Top5
            topView: false,
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
        //퉅팁
        TipToggle(type, status)  {
            if (type === 'guidetip1') {
                this.guidetip1 = !status;
            } else if (type === 'guidetip2') {
                this.guidetip2 = !status;
            } else if (type === 'guidetip3') {
                this.guidetip3 = !status;
            }
        },
        //공통 == 탭클래스 처리 active
        tabClick(parm, type) {
            console.log(type);
            if (type === '주택매매 거래량') {
                this.tabnum = parm;
            } else if (type === '상세 기준별 거래량') {
                this.tabnum1 = parm;
            } else if (type === '주택매매') {
                this.tabnum2 = parm;
            } else if (type === '아파트매매') {
                this.tabnum3 = parm;
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
                text === '월별' ? this.monthAcitve = true : this.monthAcitve = false;
            } else if (classname === '.type2') {
                text === '월별' ? this.monthAcitve1 = true : this.monthAcitve1 = false;
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
        // 지역선택 레이어 open/close
        SelectToggle(parms) {
            this[parms] = !this[parms];
            if (!this[parms]) {
                window.$eventBus.$emit('scrollStop', 'close');
            } else {
                window.$eventBus.$emit('scrollStop', 'open');
            }
        },
        // 지역검색 텍스트 삭제
        TxtDelete() {
            this.srhtext = '';
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