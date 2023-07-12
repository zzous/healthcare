<template>
    <section class="land">
        <div class="mainTitle">
			<h1 class="titdepth1">토지 가격변동과 거래량</h1>
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
                <div class="txttop5">
                    <span class="txt">지가변동률 최고지역</span>
                </div>
                <jQueryScrollbar style="width:100%;" :useCtrl="{direction: 'x',customClass:'typeSmall' }">
                    <div class="btnstop5_scroll">
                        <div class="btnstop5">
                            <button type="button">1.경기 화성시</button>
                            <button type="button">2.경기 평택시</button>
                            <button type="button">3.인천 남동구</button>
                            <button type="button">4.경기 파주시</button>
                            <button type="button">5.인천 서구</button>
                        </div>
                        <div class="txttop5 none">
                            <span class="txt">지가변동률 최저지역</span>
                        </div>
                        <div class="btnstop5">
                            <button type="button">1.경기 화성시</button>
                            <button type="button">2.경기 평택시</button>
                            <button type="button">3.인천 남동구</button>
                            <button type="button">4.경기 파주시</button>
                            <button type="button">5.인천 서구</button>
                        </div>
                    </div>
                </jQueryScrollbar>
            </div>
            <div class="topranking">
                <button type="button" :class="['btntoprank iconcrown arw',{down:!topView, up:topView}]" @click="SelectToggle('topView')">Top 지역랭킹</button>
                <div class="toprankingbox">
                    <div class="titbox iconrise">상승률 Top 5</div>
                    <div class="btnstop5">
                        <button type="button">1.경기 화성시</button>
                        <button type="button">2.경기 평택시</button>
                        <button type="button">3.인천 남동구</button>
                        <button type="button">4.경기 파주시</button>
                        <button type="button">5.인천 서구</button>
                    </div>
                    <div class="titbox iconfall">하락률 Top 5</div>
                    <div class="btnstop5">
                        <button type="button">1.경기 화성시</button>
                        <button type="button">2.경기 평택시</button>
                        <button type="button">3.인천 남동구</button>
                        <button type="button">4.경기 파주시</button>
                        <button type="button">5.인천 서구</button>
                    </div>
                    <!-- 최근 상승 or 하락 지역이 없을 때 -->
                    <!-- <div class="nodatabox">
                        상승 지역이 없습니다.
                    </div> -->
                    <!-- <div class="nodatabox">
                        하락 지역이 없습니다.
                    </div> -->
                    <div class="tablebottex iconinfo3">‘21.07월 기준 전월대비 지가변동률 상승/하락 Top 5 지역(시/군/구) 입니다.</div>
                </div>
            </div>
        </div>
        <div class="cardwrap" ref="fixedWrap">
            <div class="cardcon" >
                <!-- 지가지수 변동률 -->
                <div class="cardCaptureBox cardmapBox">
                    <ChartOption
                        :optionList="optionList"
                        @print="cardOption('print')"
                        @capture="cardOption('capture')"
                    />
                    <div class="cardbox cardCapture">
                        <div class="cardtit tradingtit">
                            <h1 class="titdepth2">지가지수 변동률</h1>
                        </div>
                        <TabContent
                            :tabcontentname="'지가지수 변동률'"
                            :tabsublist="'tabbox tabtype3 submenu'"
                            :tabtexts="tabtextsType1"
                            v-on:tabactive="tabClick"
                        >
                            <template slot="tabsubtnArea">
                                <div class="listbtn type1"><!-- 2022.03.31 퍼블 수정 / 분기별 삭제-->
                                    <button class="btn textline" @click="subTabActive($event,'.type1','년별');">년별</button>
                                    <button class="btn textline" @click="subTabActive($event,'.type1','월별');">월별</button>
                                    <div :class="['pickerarea', {active:monthAcitve1},{select:openPicker1}]">
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
                                <div class="tabcon" role="tabpanel" v-if="tabnum===0">
                                    <div class="holdcon">
                                        <div class="checkedlegend"><!-- 2022.03.31 퍼블 수정 / 비도시, 준도시, 준농림 삭제-->
                                            <button class="btn-check landtype1 active">소계</button>
                                            <button class="btn-check landtype2 active">주거</button>
                                            <button class="btn-check landtype3 active">상업</button>
                                            <button class="btn-check landtype4 active">공업</button>
                                            <button class="btn-check landtype5 active">녹지</button>
                                            <button class="btn-check landtype6 active">관리</button>
                                            <button class="btn-check landtype7 active">보전관리</button>
                                            <button class="btn-check landtype8 active">농림</button>
                                            <button class="btn-check landtype9 active">생산관리</button>
                                            <button class="btn-check landtype10 active">계획관리</button>
                                            <button class="btn-check landtype11 active">자연환경보전</button>
                                        </div>
                                        <div class="unittextbox right"><span>단위: 변동률(%)</span></div>
                                        <!-- 차트영역 -->
                                        <div class="chartbox" style="height:370px;">
                                            <!-- 모바일의 경우 (해상도 1189이하 부터) 해당 툴팁 표기 -->
                                            <div class="chartTip tradingtip mobile" style="top:-140px;">
                                                <p class="tx1">2021년 1월 변동률(전월대비)</p>
                                                <p class="tx2 upvalue">123(<span class="ico numup">0.123%</span>)</p> <!-- 2022.04.04 퍼블 변경 / 마크업, 컬러 수정  -->
                                                <div class="linebox botnoline"><!-- 2022.03.31 퍼블 수정 / 비도시, 준도시, 준농림 삭제, 범례컬러박스 로 변경-->
                                                    <p class="legendlist landtype2">주거:123(<span class="ico numup"></span>0.123%)</p>
                                                    <p class="legendlist landtype3">상업:123(<span class="ico numup"></span>0.123%)</p>
                                                    <p class="legendlist landtype4">공업:123(<span class="ico numup"></span>0.123%)</p>
                                                    <p class="legendlist landtype5">녹지:123(<span class="ico numup"></span>0.123%)</p>
                                                    <p class="legendlist landtype6">관리:123(<span class="ico numup"></span>0.123%)</p>
                                                    <p class="legendlist landtype7">보전관리:123(<span class="ico numup"></span>0.123%)</p>
                                                    <p class="legendlist landtype8">농림:123(<span class="ico numup"></span>0.123%)</p>
                                                    <p class="legendlist landtype9">생산관리:123(<span class="ico numup"></span>0.123%)</p>
                                                    <p class="legendlist landtype10">계획관리:123(<span class="ico numup"></span>0.123%)</p>
                                                    <p class="legendlist landtype11">자연환경보전:123(<span class="ico numup"></span>0.123%)</p>
                                                </div>
                                            </div>
                                            <!--웹의 경우 (해상도 1190이상 부터) 해당 차트 내 툴팁 표기 -->
                                            <div class="chartTip tradingtip " style="top:30px;left:50px">
                                                <p class="tx1">2021년 1월 변동률(전월대비)</p>
                                                <p class="tx2 upvalue">123(<span class="ico numup">0.123%</span>)</p> <!-- 2022.04.04 퍼블 변경 / 마크업, 컬러 수정  -->
                                                <div class="linebox botnoline"><!-- 2022.03.31 퍼블 수정 / 비도시, 준도시, 준농림 삭제, 범례컬러박스 로 변경-->
                                                    <p class="legendlist landtype2">주거:123(<span class="ico numup"></span>0.123%)</p>
                                                    <p class="legendlist landtype3">상업:123(<span class="ico numup"></span>0.123%)</p>
                                                    <p class="legendlist landtype4">공업:123(<span class="ico numup"></span>0.123%)</p>
                                                    <p class="legendlist landtype5">녹지:123(<span class="ico numup"></span>0.123%)</p>
                                                    <p class="legendlist landtype6">관리:123(<span class="ico numup"></span>0.123%)</p>
                                                    <p class="legendlist landtype7">보전관리:123(<span class="ico numup"></span>0.123%)</p>
                                                    <p class="legendlist landtype8">농림:123(<span class="ico numup"></span>0.123%)</p>
                                                    <p class="legendlist landtype9">생산관리:123(<span class="ico numup"></span>0.123%)</p>
                                                    <p class="legendlist landtype10">계획관리:123(<span class="ico numup"></span>0.123%)</p>
                                                    <p class="legendlist landtype11">자연환경보전:123(<span class="ico numup"></span>0.123%)</p>
                                                </div>
                                            </div>
                                            <div class="nodata"></div>
                                            <span class="watermark horizongray"></span>
                                        </div>
                                        <!-- 테이블 -->
                                        <div class="tradingtable house"><!-- 2022.03.31 퍼블 수정 / 비도시, 준도시, 준농림 삭제-->
                                            <div class="tablelabel" style="width:116px">
                                                <span>구분</span>
                                                <span>소계</span>
                                                <span>주거</span>
                                                <span>상업</span>
                                                <span>공업</span>
                                                <span>녹지</span>
                                                <span>관리</span>
                                                <span>보전관리</span>
                                                <span>농림</span>
                                                <span>생산관리</span>
                                                <span>계획관리</span>
                                                <span>자연환경보전</span>
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
                                        <div class="textbox"><span role="button" class="btn-statistics iconsource" @click="openPublicPopup('open',$event,'landType1')">출처 : 국가통계 포털</span></div>
                                    </div>
                                </div>
                                <div class="tabcon" role="tabpanel" v-if="tabnum===1">
                                    <div class="holdcon">
                                        <div class="checkedlegend">
                                            <button class="btn-check landtype1 active">소계</button>
                                            <button class="btn-check landtype2 active">전</button>
                                            <button class="btn-check landtype3 active">답</button>
                                            <button class="btn-check landtype4 active">주거용(대)</button>
                                            <button class="btn-check landtype5 active">상업용(대)</button>
                                            <button class="btn-check landtype6 active">임야</button>
                                            <button class="btn-check landtype7 active">공장용지</button>
                                            <button class="btn-check landtype8 active">기타</button>
                                        </div>
                                        <div class="unittextbox right"><span>단위: 변동률(%)</span></div>
                                        <!-- 차트영역 -->
                                        <div class="chartbox" style="height:370px;">
                                            <!-- 모바일의 경우 (해상도 1189이하 부터) 해당 툴팁 표기 -->
                                            <div class="chartTip tradingtip mobile" style="top:-140px;">
                                                <p class="tx1">2021년 1월 변동률(전월대비)</p>
                                                <p class="tx2 downvalue">123(<span class="ico numdown">0.123%</span>)</p> <!-- 2022.04.04 퍼블 변경 / 지가지수 값 추가  -->
                                                <div class="linebox botnoline">
                                                    <p class="legendlist landtype2">전:123(<span class="ico numup"></span>0.123%)</p>
                                                    <p class="legendlist landtype3">답:123(<span class="ico numdown"></span>0.123%)</p>
                                                    <p class="legendlist landtype4">주거용(대):123(<span class="ico numup"></span>0.123%)</p>
                                                    <p class="legendlist landtype5">상업용(대):123(<span class="ico numup"></span>0.123%)</p>
                                                    <p class="legendlist landtype6">임야:123(<span class="ico numup"></span>0.123%)</p>
                                                    <p class="legendlist landtype7">공장용지:123(<span class="ico numup"></span>0.123%)</p>
                                                    <p class="legendlist landtype8">기타:123(<span class="ico numup"></span>0.123%)</p>
                                                </div>
                                            </div>
                                            <!--웹의 경우 (해상도 1190이상 부터) 해당 차트 내 툴팁 표기 -->
                                            <div class="chartTip tradingtip " style="top:30px;left:50px">
                                                <p class="tx1">2021년 1월 변동률(전월대비)</p>
                                                <p class="tx2 downvalue">123(<span class="ico numdown">0.123%</span>)</p> <!-- 2022.04.04 퍼블 변경 / 지가지수 값 추가  -->
                                                <div class="linebox botnoline">
                                                    <p class="legendlist landtype2">전:123(<span class="ico numup"></span>0.123%)</p>
                                                    <p class="legendlist landtype3">답:123(<span class="ico numdown"></span>0.123%)</p>
                                                    <p class="legendlist landtype4">주거용(대):123(<span class="ico numup"></span>0.123%)</p>
                                                    <p class="legendlist landtype5">상업용(대):123(<span class="ico numup"></span>0.123%)</p>
                                                    <p class="legendlist landtype6">임야:123(<span class="ico numup"></span>0.123%)</p>
                                                    <p class="legendlist landtype7">공장용지:123(<span class="ico numup"></span>0.123%)</p>
                                                    <p class="legendlist landtype8">기타:123(<span class="ico numup"></span>0.123%)</p>
                                                </div>
                                            </div>
                                            <div class="nodata"></div>
                                            <span class="watermark horizongray"></span>
                                        </div>
                                        <!-- 테이블 -->
                                        <div class="tradingtable house">
                                            <div class="tablelabel" style="width:84px">
                                                <span>구분</span>
                                                <span>소계</span>
                                                <span>전</span>
                                                <span>답</span>
                                                <span>주거용(대)</span>
                                                <span>상업용(대)</span>
                                                <span>임야</span>
                                                <span>공장용지</span>
                                                <span>기타</span>
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
                                        <div class="textbox"><span role="button" class="btn-statistics iconsource" @click="openPublicPopup('open',$event,'landType1')">출처 : 국가통계 포털</span></div>
                                    </div>
                                </div>
                            </template>
                        </TabContent>
                    </div>
                </div>
                <!-- 토지 거래량 -->
                <div class="cardCaptureBox">
                    <ChartOption
                        :optionList="optionList"
                        @print="cardOption('print')"
                        @capture="cardOption('capture')"
                    />
                    <div class="cardbox cardCapture">
                        <div class="cardtit tradingtit">
                            <h1 class="titdepth2">토지 거래량</h1>
                        </div>
                        <TabContent
                            :tabcontentname="'토지 거래량'"
                            :tabsublist="'tabbox tabtype3 submenu line2'"
                            :tabtexts="tabtextsType2"
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
                                    <TabContent
                                        :tabcontentname="'전체'"
                                        :tabsublist="'tabbox tabtype5'"
                                        :tabtexts="tabtextsType3"
                                        v-on:tabactive="tabClick"
                                    >
                                    <template slot="panel">
                                        <div class="tabcon" role="tabpanel" v-if="tabnum2===0">
                                            <div class="holdcon">
                                                <div class="unittextbox right"><span>단위: 필지</span></div>
                                                <!-- 차트영역 -->
                                                <div class="chartbox" style="height:370px;">
                                                    <!-- 모바일의 경우 (해상도 1189이하 부터) 해당 툴팁 표기 -->
                                                    <div class="chartTip tradingtip mobile" style="top:-140px;">
                                                        <p class="tx1">2021년 1월 거래량</p>
                                                        <p class="tx2">1,234,567필지</p>
                                                    </div>
                                                    <!--웹의 경우 (해상도 1190이상 부터) 해당 차트 내 툴팁 표기 -->
                                                    <div class="chartTip tradingtip " style="top:30px;left:50px">
                                                        <p class="tx1">2021년 1월 거래량</p>
                                                        <p class="tx2">1,234,567필지</p>
                                                    </div>
                                                    <div class="nodata"></div>
                                                    <span class="watermark horizongray"></span>
                                                </div>
                                                <!-- 테이블 -->
                                                <div class="tradingtable people land">
                                                    <div class="tablelabel">
                                                        <span class="labelH">구분</span>
                                                        <span>전체</span>
                                                        <!--<span class="overHeight">661~1,000㎡</span>--> <!-- 2022.03.02 퍼블수정 , 2줄이 될때 -->
                                                    </div>
                                                    <jQueryScrollbar  style="width:100%;">
                                                        <div class="scrollin-pir">
                                                            <div class="tablelbody">
                                                                <div class="tablelow">
                                                                    <span class="daygroup" v-for="(day, index) in tradingdays" :key="index" :class="{selected:index == 12}"> <!-- 2022.03.15  퍼블 수정 / 테이블 라인선택시 -->
                                                                        <span class="yearmonth" v-html="day.day"></span>
                                                                        <span class="typegroup">
                                                                            <span>거래량</span>
                                                                            <span class="line2">변동률<br>(전월대비)</span>
                                                                        </span>
                                                                    </span>
                                                                </div>
                                                                <div class="tablelow"  v-for="(item, index) in landingdatas" :key="index">
                                                                    <span class="valuegroup" v-for="(data, index) in item.daylists" :key="index">
                                                                        <span class="datavalue" v-for="(value, idx) in data.data"  v-html="value.value" :key="idx"  :class="{selected:index == 12}"></span><!-- 2022.03.15  퍼블 수정 / 테이블 라인표시 예시 -->
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </jQueryScrollbar>
                                                </div>
                                                <div class="textbox"><span role="button" class="btn-statistics iconsource" @click="openPublicPopup('open',$event,'landType2')">출처 : 국가통계 포털</span></div>

                                            </div>
                                        </div>
                                        <div class="tabcon" role="tabpanel" v-if="tabnum2===1">
                                            <div class="holdcon">
                                                <div class="unittextbox right"><span>단위: 천㎡</span></div>
                                                <!-- 차트영역 -->
                                                <div class="chartbox" style="height:370px;">
                                                    <!-- 모바일의 경우 (해상도 1189이하 부터) 해당 툴팁 표기 -->
                                                    <div class="chartTip tradingtip mobile" style="top:-140px;">
                                                        <p class="tx1">2021년 1월 거래량</p>
                                                        <p class="tx2">1,234,567천㎡</p>
                                                    </div>
                                                    <!--웹의 경우 (해상도 1190이상 부터) 해당 차트 내 툴팁 표기 -->
                                                    <div class="chartTip tradingtip " style="top:30px;left:50px">
                                                        <p class="tx1">2021년 1월 거래량</p>
                                                        <p class="tx2">1,234,567천㎡</p>
                                                    </div>
                                                    <div class="nodata"></div>
                                                    <span class="watermark horizongray"></span>
                                                </div>
                                                <!-- 테이블 -->
                                                <div class="tradingtable people land">
                                                    <div class="tablelabel">
                                                        <span class="labelH">구분</span>
                                                        <span>전체</span>
                                                    </div>
                                                    <jQueryScrollbar  style="width:100%;">
                                                        <div class="scrollin-pir">
                                                            <div class="tablelbody">
                                                                <div class="tablelow">
                                                                    <span class="daygroup" v-for="(day, index) in tradingdays" :key="index" >
                                                                        <span class="yearmonth" v-html="day.day"></span>
                                                                        <span class="typegroup">
                                                                            <span>거래량</span>
                                                                            <span class="line2">변동률<br>(전월대비)</span>
                                                                        </span>
                                                                    </span>
                                                                </div>
                                                                <div class="tablelow"  v-for="(item, index) in landingdatas" :key="index">
                                                                    <span class="valuegroup" v-for="(data, index) in item.daylists" :key="index">
                                                                        <span class="datavalue" v-for="(value, idx) in data.data"  v-html="value.value" :key="idx"></span>
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </jQueryScrollbar>
                                                </div>
                                                <div class="textbox"><span role="button" class="btn-statistics iconsource" @click="openPublicPopup('open',$event,'landType2')">출처 : 국가통계 포털</span></div>
                                            </div>
                                        </div>
                                    </template>

                                    </TabContent>
                                </div>
                                <div class="tabcon" role="tabpanel" v-if="tabnum1===1">
                                    <TabContent
                                        :tabcontentname="'거래주체별'"
                                        :tabsublist="'tabbox tabtype5 tabsub'"
                                        :tabtexts="tabtextsType3"
                                        v-on:tabactive="tabClick"
                                    >
                                    <template slot="tabsubtnArea">
                                        <div class="mapchartbox type1">
											<button type="button" class="btn btntreemap active" @click="mapBtnBox($event, '.type1')">트리맵</button>
											<button type="button" class="btn btnareachart" @click="mapBtnBox($event, '.type1')">영역차트</button>
										</div>
                                    </template>
                                    <template slot="panel">
                                        <div class="tabcon" role="tabpanel" v-if="tabnum3===0">
                                            <div class="holdcon">
                                                <div class="unittextbox right"><span>단위: 필지</span></div>
                                                <!-- 트리맵 버튼이 선택된 경우 -->
                                                <!-- 트리맵 차트영역 -->
                                                <div class="chartbox" style="height:420px;">
                                                    
                                                </div>
                                                <div class="rangecontent trading-range">
                                                    <RangeSlider
                                                        v-model="datevalue"
                                                        :marks="true"
                                                        :data="rangelists"
                                                    />
                                                </div>
                                                <div class="textbox"><span role="button" class="btn-statistics iconsource" @click="openPublicPopup('open',$event,'landType2')">출처 : 국가통계 포털</span></div>

                                            </div>
                                        </div>
                                        <div class="tabcon" role="tabpanel" v-if="tabnum3===1">
                                            <div class="holdcon">
                                                <div class="checkedlegend">
                                                    <button class="btn-check landobjtype1 active">개인→개인</button>
                                                    <button class="btn-check landobjtype2 active">개인→법인</button>
                                                    <button class="btn-check landobjtype3 active">개인→기타</button>
                                                    <button class="btn-check landobjtype4 active">법인→개인</button>
                                                    <button class="btn-check landobjtype5 active">법인→법인</button>
                                                    <button class="btn-check landobjtype6 active">법인→기타</button>
                                                    <button class="btn-check landobjtype7 active">기타→개인</button>
                                                    <button class="btn-check landobjtype8 active">기타→법인</button>
                                                    <button class="btn-check landobjtype9 active">기타→기타</button>
                                                </div>
                                                <div class="unittextbox right">
                                                    <span>단위: 필지</span>
                                                </div>
                                                <!-- 영역 차트 버튼이 선택된 경우 -->
                                                <!-- 차트영역 -->
                                                <div class="chartbox" style="height:370px;">
                                                    <!-- 모바일의 경우 (해상도 1189이하 부터) 해당 툴팁 표기 -->
                                                    <div class="chartTip tradingtip mobile" style="top:-140px;">
                                                        <p class="tx1">2021년 1월 토지거래량</p>
                                                        <p class="tx2">1,234,567필지</p>
                                                        <div class="linebox botnoline">
                                                            <span class="legendlist landobjtype9">기타→기타:123,456필지</span>
                                                            <span class="legendlist landobjtype8">기타→법인:123,456필지</span>
                                                            <span class="legendlist landobjtype7">기타→개인:123,456필지</span>
                                                            <span class="legendlist landobjtype6">법인→기타:123,456필지</span>
                                                            <span class="legendlist landobjtype5">법인→법인:123,456필지</span>
                                                            <span class="legendlist landobjtype4">법인→개인:123,456필지</span>
                                                            <span class="legendlist landobjtype3">개인→기타:123,456필지</span>
                                                            <span class="legendlist landobjtype2">개인→법인:123,456필지</span>
                                                            <span class="legendlist landobjtype1">개인→개인:123,456필지</span>
                                                        </div>
                                                    </div>
                                                    <!--웹의 경우 (해상도 1190이상 부터) 해당 차트 내 툴팁 표기 -->
                                                    <div class="chartTip tradingtip " style="top:30px;left:50px">
                                                        <p class="tx1">2021년 1월 토지거래량</p>
                                                        <p class="tx2">1,234,567필지</p>
                                                        <div class="linebox botnoline">
                                                            <span class="legendlist landobjtype9">기타→기타:123,456필지</span>
                                                            <span class="legendlist landobjtype8">기타→법인:123,456필지</span>
                                                            <span class="legendlist landobjtype7">기타→개인:123,456필지</span>
                                                            <span class="legendlist landobjtype6">법인→기타:123,456필지</span>
                                                            <span class="legendlist landobjtype5">법인→법인:123,456필지</span>
                                                            <span class="legendlist landobjtype4">법인→개인:123,456필지</span>
                                                            <span class="legendlist landobjtype3">개인→기타:123,456필지</span>
                                                            <span class="legendlist landobjtype2">개인→법인:123,456필지</span>
                                                            <span class="legendlist landobjtype1">개인→개인:123,456필지</span>
                                                        </div>
                                                    </div>
                                                    <div class="nodata"></div>
                                                    <span class="watermark horizongray"></span>
                                                </div>
                                                <!-- 테이블 -->
                                                <div class="tradingtable people house land">
                                                    <div class="tablelabel">
                                                        <span class="labelH">구분</span>
                                                        <span>전체</span>
                                                        <span>개인→개인</span>
                                                        <!-- 범례 항목
                                                        <span>개인→법인</span>
                                                        <span>개인→기타</span>
                                                        <span>법인→개인</span>
                                                        <span>법인→법인</span>
                                                        <span>법인→기타</span>
                                                        <span>기타→개인</span>
                                                        <span>기타→법인</span>
                                                        <span>기타→기타</span>
                                                        -->
                                                    </div>
                                                    <jQueryScrollbar  style="width:100%;">
                                                        <div class="scrollin-pir">
                                                            <div class="tablelbody">
                                                                <div class="tablelow">
                                                                    <span class="daygroup" v-for="(day, index) in tradingdays" :key="index">
                                                                        <span class="yearmonth" v-html="day.day"></span>
                                                                        <span class="typegroup">
                                                                            <span>거래량</span>
                                                                            <span class="line2">변동률<br>(전월대비)</span>
                                                                        </span>
                                                                    </span>
                                                                </div>
                                                                <div class="tablelow"  v-for="(item, index) in landingdatas1" :key="index">
                                                                    <span class="valuegroup" v-for="(data, index) in item.daylists" :key="index">
                                                                        <span class="datavalue" v-for="(value, idx) in data.data"  v-html="value.value" :key="idx"></span>
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </jQueryScrollbar>
                                                </div>
                                                <div class="textbox"><span role="button" class="btn-statistics iconsource" @click="openPublicPopup('open',$event,'landType2')">출처 : 국가통계 포털</span></div>
                                            </div>
                                        </div>
                                    </template>

                                    </TabContent>
                                </div>
                                <div class="tabcon" role="tabpanel" v-if="tabnum1===2">
                                    <TabContent
                                        :tabcontentname="'거래규모별'"
                                        :tabsublist="'tabbox tabtype5 tabsub'"
                                        :tabtexts="tabtextsType3"
                                        v-on:tabactive="tabClick"
                                    >
                                    <template slot="tabsubtnArea">
                                        <div class="mapchartbox type2">
											<button type="button" class="btn btntreemap" @click="mapBtnBox($event, '.type2')">트리맵</button>
											<button type="button" class="btn btnareachart active" @click="mapBtnBox($event, '.type2')">영역차트</button>
										</div>
                                    </template>
                                    <template slot="panel">
                                        <div class="tabcon" role="tabpanel" v-if="tabnum4===0">
                                            <div class="holdcon">
                                                <div class="unittextbox right"><span>단위: 필지</span></div>
                                                <!-- 트리맵 버튼이 선택된 경우 -->
                                                <!-- 트리맵 차트영역 -->
                                                <div class="chartbox" style="height:420px;">
                                                    <!-- 모바일의 경우 (해상도 1189이하 부터) 해당 툴팁 표기 -->
                                                    <div class="chartTip tradingtip mobile" style="top:-140px;">
                                                        <p class="tx1">2021년 5월 거래량</p>
                                                        <div class="linebox botnoline">
                                                            <p class="txbar">300㎡ 이하 : 1,234,567 천㎡</p>
                                                        </div>
                                                    </div>
                                                    <!--웹의 경우 (해상도 1190이상 부터) 해당 차트 내 툴팁 표기 -->
                                                    <div class="chartTip tradingtip " style="top:30px;left:50px">
                                                        <p class="tx1">2021년 5월 거래량</p>
                                                        <div class="linebox botnoline">
                                                            <p class="txbar">300㎡ 이하 : 1,234,567 천㎡</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="rangecontent trading-range">
                                                    <RangeSlider
                                                        v-model="datevalue1"
                                                        :marks="true"
                                                        :data="rangelists"
                                                    />
                                                </div>
                                                <div class="textbox"><span role="button" class="btn-statistics iconsource" @click="openPublicPopup('open',$event,'landType2')">출처 : 국가통계 포털</span></div>

                                            </div>
                                        </div>
                                        <div class="tabcon" role="tabpanel" v-if="tabnum4===1">
                                            <div class="holdcon">
                                                <div class="checkedlegend">
                                                    <button class="btn-check landsizetype1 active">300㎡ 이하</button>
                                                    <button class="btn-check landsizetype2 active">331~660㎡</button>
                                                    <button class="btn-check landsizetype3 active">661~1,000㎡</button>
                                                    <button class="btn-check landsizetype4 active">1,001~2,000㎡</button>
                                                    <button class="btn-check landsizetype5 active">2,001~5,000㎡</button>
                                                    <button class="btn-check landsizetype6 active">5,001~10,000㎡</button>
                                                    <button class="btn-check landsizetype7 active">10,001~33,000㎡</button>
                                                    <button class="btn-check landsizetype8 active">33,000㎡ 초과</button>
                                                </div>
                                                <div class="unittextbox right">
                                                    <span>단위: 필지</span>
                                                </div>
                                                <!-- 영역 차트 버튼이 선택된 경우 -->
                                                <!-- 차트영역 -->
                                                <div class="chartbox" style="height:370px;">
                                                    <!-- 모바일의 경우 (해상도 1189이하 부터) 해당 툴팁 표기 -->
                                                    <div class="chartTip tradingtip mobile" style="top:-140px;">
                                                        <p class="tx1">2021년 1월 토지거래량</p>
                                                        <p class="tx2">1,234,567필지</p>
                                                        <div class="linebox botnoline">
                                                            <span class="legendlist landsizetype8">33,000㎡ 초과 : 123,456필지</span>
                                                            <span class="legendlist landsizetype7">10,001~33,000㎡ : 123,456필지</span>
                                                            <span class="legendlist landsizetype6">10,001~33,000㎡ : 123,456필지</span>
                                                            <span class="legendlist landsizetype5">2,001~5,000㎡ : 123,456필지</span>
                                                            <span class="legendlist landsizetype4">1,001~2,000㎡ : 123,456필지</span>
                                                            <span class="legendlist landsizetype3">661~1,000㎡ : 123,456필지</span>
                                                            <span class="legendlist landsizetype2">301~660㎡ : 123,456필지</span>
                                                            <span class="legendlist landsizetype1">300㎡ 이하 : 123,456필지</span>
                                                        </div>
                                                    </div>
                                                    <!--웹의 경우 (해상도 1190이상 부터) 해당 차트 내 툴팁 표기 -->
                                                    <div class="chartTip tradingtip " style="top:30px;left:50px">
                                                        <p class="tx1">2021년 1월 토지거래량</p>
                                                        <p class="tx2">1,234,567필지</p>
                                                        <div class="linebox botnoline">
                                                            <span class="legendlist landsizetype8">33,000㎡ 초과 : 123,456필지</span>
                                                            <span class="legendlist landsizetype7">10,001~33,000㎡ : 123,456필지</span>
                                                            <span class="legendlist landsizetype6">10,001~33,000㎡ : 123,456필지</span>
                                                            <span class="legendlist landsizetype5">2,001~5,000㎡ : 123,456필지</span>
                                                            <span class="legendlist landsizetype4">1,001~2,000㎡ : 123,456필지</span>
                                                            <span class="legendlist landsizetype3">661~1,000㎡ : 123,456필지</span>
                                                            <span class="legendlist landsizetype2">301~660㎡ : 123,456필지</span>
                                                            <span class="legendlist landsizetype1">300㎡ 이하 : 123,456필지</span>
                                                        </div>
                                                    </div>
                                                    <div class="nodata"></div>
                                                    <span class="watermark horizongray"></span>
                                                </div>
                                                <!-- 테이블 -->
                                                <div class="tradingtable people house land">
                                                    <div class="tablelabel">
                                                        <span class="labelH">구분</span>
                                                        <span>전체</span>
                                                        <span>개인→개인</span>
                                                        <!-- 범례 항목
                                                        <span>개인→법인</span>
                                                        <span>개인→기타</span>
                                                        <span>법인→개인</span>
                                                        <span>법인→법인</span>
                                                        <span>법인→기타</span>
                                                        <span>기타→개인</span>
                                                        <span>기타→법인</span>
                                                        <span>기타→기타</span>
                                                        -->
                                                    </div>
                                                    <jQueryScrollbar  style="width:100%;">
                                                        <div class="scrollin-pir">
                                                            <div class="tablelbody">
                                                                <div class="tablelow">
                                                                    <span class="daygroup" v-for="(day, index) in tradingdays" :key="index">
                                                                        <span class="yearmonth" v-html="day.day"></span>
                                                                        <span class="typegroup">
                                                                            <span>거래량</span>
                                                                            <span class="line2">변동률<br>(전월대비)</span>
                                                                        </span>
                                                                    </span>
                                                                </div>
                                                                <div class="tablelow"  v-for="(item, index) in landingdatas1" :key="index">
                                                                    <span class="valuegroup" v-for="(data, index) in item.daylists" :key="index">
                                                                        <span class="datavalue" v-for="(value, idx) in data.data"  v-html="value.value" :key="idx"></span>
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </jQueryScrollbar>
                                                </div>
                                                <div class="textbox"><span role="button" class="btn-statistics iconsource" @click="openPublicPopup('open',$event,'landType2')">출처 : 국가통계 포털</span></div>
                                            </div>
                                        </div>
                                    </template>

                                    </TabContent>
                                </div>
                                <div class="tabcon" role="tabpanel" v-if="tabnum1===3">
                                    <TabContent
                                        :tabcontentname="'용도지역별'"
                                        :tabsublist="'tabbox tabtype5 tabsub'"
                                        :tabtexts="tabtextsType3"
                                        v-on:tabactive="tabClick"
                                    >
                                    <template slot="tabsubtnArea">
                                        <div class="mapchartbox type4">
											<button type="button" class="btn btntreemap" @click="mapBtnBox($event, '.type4')">트리맵</button>
											<button type="button" class="btn btnareachart active" @click="mapBtnBox($event, '.type4')">영역차트</button>
										</div>
                                    </template>
                                    <template slot="panel">
                                        <div class="tabcon" role="tabpanel" v-if="tabnum5===0">
                                            <div class="holdcon">
                                                <div class="unittextbox right"><span>단위: 필지</span></div>
                                                <!-- 트리맵 버튼이 선택된 경우 -->
                                                <!-- 트리맵 차트영역 -->
                                                <div class="chartbox" style="height:420px;">
                                                    <!-- 모바일의 경우 (해상도 1189이하 부터) 해당 툴팁 표기 -->
                                                    <div class="chartTip tradingtip mobile" style="top:-140px;">
                                                        <p class="tx1">2021년 5월 거래량</p>
                                                        <div class="linebox botnoline">
                                                            <p class="txbar">주거 : 1,234,567 천㎡</p>
                                                        </div>
                                                    </div>
                                                    <!--웹의 경우 (해상도 1190이상 부터) 해당 차트 내 툴팁 표기 -->
                                                    <div class="chartTip tradingtip " style="top:30px;left:50px">
                                                        <p class="tx1">2021년 5월 거래량</p>
                                                        <div class="linebox botnoline">
                                                            <p class="txbar">주거 : 1,234,567 천㎡</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="rangecontent trading-range">
                                                    <RangeSlider
                                                        v-model="datevalue2"
                                                        :marks="true"
                                                        :data="rangelists"
                                                    />
                                                </div>
                                                <div class="textbox"><span role="button" class="btn-statistics iconsource" @click="openPublicPopup('open',$event,'landType2')">출처 : 국가통계 포털</span></div>

                                            </div>
                                        </div>
                                        <div class="tabcon" role="tabpanel" v-if="tabnum5===1">
                                            <div class="holdcon">
                                                <div class="checkedlegend">
                                                    <button class="btn-check landareatype1 active">주거</button>
                                                    <button class="btn-check landareatype2 active">상업</button>
                                                    <button class="btn-check landareatype3 active">공업</button>
                                                    <button class="btn-check landareatype4 active">녹지</button>
                                                    <button class="btn-check landareatype5 active">관리</button>
                                                    <button class="btn-check landareatype6 active">농림</button>
                                                    <button class="btn-check landareatype7 active">개발제한</button>
                                                    <button class="btn-check landareatype8 active">용도미지정</button>
                                                    <button class="btn-check landareatype9 active">자연환경보전</button>
                                                </div>
                                                <div class="unittextbox right">
                                                    <span>단위: 필지</span>
                                                </div>
                                                <!-- 영역 차트 버튼이 선택된 경우 -->
                                                <!-- 차트영역 -->
                                                <div class="chartbox" style="height:370px;">
                                                    <!-- 모바일의 경우 (해상도 1189이하 부터) 해당 툴팁 표기 -->
                                                    <div class="chartTip tradingtip mobile" style="top:-140px;">
                                                        <p class="tx1">2021년 1월 토지거래량</p>
                                                        <p class="tx2">1,234,567필지</p>
                                                        <div class="linebox botnoline">
                                                            <span class="legendlist landareatype9">자연환경보전 : 123,456필지</span>
                                                            <span class="legendlist landareatype8">용도미지정 : 123,456필지</span>
                                                            <span class="legendlist landareatype7">개발제한 : 123,456필지</span>
                                                            <span class="legendlist landareatype6">농립 : 123,456필지</span>
                                                            <span class="legendlist landareatype5">관리 : 123,456필지</span>
                                                            <span class="legendlist landareatype4">녹지 : 123,456필지</span>
                                                            <span class="legendlist landareatype3">공업 : 123,456필지</span>
                                                            <span class="legendlist landareatype2">상업 : 123,456필지</span>
                                                            <span class="legendlist landareatype1">주거 : 123,456필지</span>
                                                        </div>
                                                    </div>
                                                    <!--웹의 경우 (해상도 1190이상 부터) 해당 차트 내 툴팁 표기 -->
                                                    <div class="chartTip tradingtip " style="top:30px;left:50px">
                                                        <p class="tx1">2021년 1월 토지거래량</p>
                                                        <p class="tx2">1,234,567필지</p>
                                                        <div class="linebox botnoline">
                                                            <span class="legendlist landareatype9">자연환경보전 : 123,456필지</span>
                                                            <span class="legendlist landareatype8">용도미지정 : 123,456필지</span>
                                                            <span class="legendlist landareatype7">개발제한 : 123,456필지</span>
                                                            <span class="legendlist landareatype6">농립 : 123,456필지</span>
                                                            <span class="legendlist landareatype5">관리 : 123,456필지</span>
                                                            <span class="legendlist landareatype4">녹지 : 123,456필지</span>
                                                            <span class="legendlist landareatype3">공업 : 123,456필지</span>
                                                            <span class="legendlist landareatype2">상업 : 123,456필지</span>
                                                            <span class="legendlist landareatype1">주거 : 123,456필지</span>
                                                        </div>
                                                    </div>
                                                    <div class="nodata"></div>
                                                    <span class="watermark horizongray"></span>
                                                </div>
                                                <!-- 테이블 -->
                                                <div class="tradingtable people house land">
                                                    <div class="tablelabel">
                                                        <span class="labelH">구분</span>
                                                        <span>주거</span>
                                                        <span>상업</span>
                                                        <!-- 범례 항목
                                                        <span>공업</span>
                                                        <span>녹지</span>
                                                        <span>관리</span>
                                                        <span>농림</span>
                                                        <span>개발제한</span>
                                                        <span>용도미지정</span>
                                                        <span>자연환경보전</span>
                                                        -->
                                                    </div>
                                                    <jQueryScrollbar  style="width:100%;">
                                                        <div class="scrollin-pir">
                                                            <div class="tablelbody">
                                                                <div class="tablelow">
                                                                    <span class="daygroup" v-for="(day, index) in tradingdays" :key="index">
                                                                        <span class="yearmonth" v-html="day.day"></span>
                                                                        <span class="typegroup">
                                                                            <span>거래량</span>
                                                                            <span class="line2">변동률<br>(전월대비)</span>
                                                                        </span>
                                                                    </span>
                                                                </div>
                                                                <div class="tablelow"  v-for="(item, index) in landingdatas2" :key="index">
                                                                    <span class="valuegroup" v-for="(data, index) in item.daylists" :key="index">
                                                                        <span class="datavalue" v-for="(value, idx) in data.data"  v-html="value.value" :key="idx"></span>
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </jQueryScrollbar>
                                                </div>
                                                <div class="textbox"><span role="button" class="btn-statistics iconsource" @click="openPublicPopup('open',$event,'landType2')">출처 : 국가통계 포털</span></div>
                                            </div>
                                        </div>
                                    </template>

                                    </TabContent>
                                </div>
                                <div class="tabcon" role="tabpanel" v-if="tabnum1===4">
                                    <TabContent
                                        :tabcontentname="'건물용도별'"
                                        :tabsublist="'tabbox tabtype5 tabsub'"
                                        :tabtexts="tabtextsType3"
                                        v-on:tabactive="tabClick"
                                    >
                                    <template slot="tabsubtnArea">
                                        <div class="mapchartbox type5">
											<button type="button" class="btn btntreemap" @click="mapBtnBox($event, '.type5')">트리맵</button>
											<button type="button" class="btn btnareachart active" @click="mapBtnBox($event, '.type5')">영역차트</button>
										</div>
                                    </template>
                                    <template slot="panel">
                                        <div class="tabcon" role="tabpanel" v-if="tabnum6===0">
                                            <div class="holdcon">
                                                <div class="unittextbox right"><span>단위: 필지</span></div>
                                                <!-- 트리맵 버튼이 선택된 경우 -->
                                                <!-- 트리맵 차트영역 -->
                                                <div class="chartbox" style="height:420px;">
                                                    <!-- 모바일의 경우 (해상도 1189이하 부터) 해당 툴팁 표기 -->
                                                    <div class="chartTip tradingtip mobile" style="top:-140px;">
                                                        <p class="tx1">2021년 5월 거래량</p>
                                                        <div class="linebox botnoline">
                                                            <p class="txbar">단독주택 : 1,234,567 천㎡</p>
                                                        </div>
                                                    </div>
                                                    <!--웹의 경우 (해상도 1190이상 부터) 해당 차트 내 툴팁 표기 -->
                                                    <div class="chartTip tradingtip " style="top:30px;left:50px">
                                                        <p class="tx1">2021년 5월 거래량</p>
                                                        <div class="linebox botnoline">
                                                            <p class="txbar">단독주택 : 1,234,567 천㎡</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="rangecontent trading-range">
                                                    <RangeSlider
                                                        v-model="datevalue3"
                                                        :marks="true"
                                                        :data="rangelists"
                                                    />
                                                </div>
                                                <div class="textbox"><span role="button" class="btn-statistics iconsource" @click="openPublicPopup('open',$event,'landType2')">출처 : 국가통계 포털</span></div>

                                            </div>
                                        </div>
                                        <div class="tabcon" role="tabpanel" v-if="tabnum6===1">
                                            <div class="holdcon">
                                                <div class="checkedlegend">
                                                    <button class="btn-check landareatype1 active">단독주택</button>
                                                    <button class="btn-check landareatype2 active">다가구주택</button>
                                                    <button class="btn-check landareatype3 active">다세대주택</button>
                                                    <button class="btn-check landareatype4 active">연립주택</button>
                                                    <button class="btn-check landareatype5 active">아파트</button>
                                                    <button class="btn-check landareatype6 active">상업업무용</button>
                                                    <button class="btn-check landareatype7 active">공업용</button>
                                                    <button class="btn-check landareatype8 active">기타건물</button>
                                                    <button class="btn-check landareatype9 active">나지</button>
                                                </div>
                                                <div class="unittextbox right">
                                                    <span>단위: 필지</span>
                                                </div>
                                                <!-- 영역 차트 버튼이 선택된 경우 -->
                                                <!-- 차트영역 -->
                                                <div class="chartbox" style="height:370px;">
                                                    <!-- 모바일의 경우 (해상도 1189이하 부터) 해당 툴팁 표기 -->
                                                    <div class="chartTip tradingtip mobile" style="top:-140px;">
                                                        <p class="tx1">2021년 1월 토지거래량</p>
                                                        <p class="tx2">1,234,567필지</p>
                                                        <div class="linebox botnoline">
                                                            <span class="legendlist landareatype9">나지 : 123,456필지</span>
                                                            <span class="legendlist landareatype8">기타건물 : 123,456필지</span>
                                                            <span class="legendlist landareatype7">공업용 : 123,456필지</span>
                                                            <span class="legendlist landareatype6">상업업무용 : 123,456필지</span>
                                                            <span class="legendlist landareatype5">아파트 : 123,456필지</span>
                                                            <span class="legendlist landareatype4">연립주택 : 123,456필지</span>
                                                            <span class="legendlist landareatype3">다세대주택 : 123,456필지</span>
                                                            <span class="legendlist landareatype2">다가구주택 : 123,456필지</span>
                                                            <span class="legendlist landareatype1">단독주택 : 123,456필지</span>
                                                        </div>
                                                    </div>
                                                    <!--웹의 경우 (해상도 1190이상 부터) 해당 차트 내 툴팁 표기 -->
                                                    <div class="chartTip tradingtip " style="top:30px;left:50px">
                                                        <p class="tx1">2021년 1월 토지거래량</p>
                                                        <p class="tx2">1,234,567필지</p>
                                                        <div class="linebox botnoline">
                                                            <span class="legendlist landareatype9">나지 : 123,456필지</span>
                                                            <span class="legendlist landareatype8">기타건물 : 123,456필지</span>
                                                            <span class="legendlist landareatype7">공업용 : 123,456필지</span>
                                                            <span class="legendlist landareatype6">상업업무용 : 123,456필지</span>
                                                            <span class="legendlist landareatype5">아파트 : 123,456필지</span>
                                                            <span class="legendlist landareatype4">연립주택 : 123,456필지</span>
                                                            <span class="legendlist landareatype3">다세대주택 : 123,456필지</span>
                                                            <span class="legendlist landareatype2">다가구주택 : 123,456필지</span>
                                                            <span class="legendlist landareatype1">단독주택 : 123,456필지</span>
                                                        </div>
                                                    </div>
                                                    <div class="nodata"></div>
                                                    <span class="watermark horizongray"></span>
                                                </div>
                                                <!-- 테이블 -->
                                                <div class="tradingtable people house land">
                                                    <div class="tablelabel">
                                                        <span class="labelH">단독주택</span>
                                                        <span>다가구주택</span>
                                                        <span>다세대주택</span>
                                                        <!-- 범례 항목
                                                        <span>연립주택</span>
                                                        <span>아파트</span>
                                                        <span>상업업무용</span>
                                                        <span>공업용</span>
                                                        <span>기타건물</span>
                                                        <span>나지</span>
                                                        -->
                                                    </div>
                                                    <jQueryScrollbar  style="width:100%;">
                                                        <div class="scrollin-pir">
                                                            <div class="tablelbody">
                                                                <div class="tablelow">
                                                                    <span class="daygroup" v-for="(day, index) in tradingdays" :key="index">
                                                                        <span class="yearmonth" v-html="day.day"></span>
                                                                        <span class="typegroup">
                                                                            <span>거래량</span>
                                                                            <span class="line2">변동률<br>(전월대비)</span>
                                                                        </span>
                                                                    </span>
                                                                </div>
                                                                <div class="tablelow"  v-for="(item, index) in landingdatas3" :key="index">
                                                                    <span class="valuegroup" v-for="(data, index) in item.daylists" :key="index">
                                                                        <span class="datavalue" v-for="(value, idx) in data.data"  v-html="value.value" :key="idx"></span>
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </jQueryScrollbar>
                                                </div>
                                                <div class="textbox"><span role="button" class="btn-statistics iconsource" @click="openPublicPopup('open',$event,'landType2')">출처 : 국가통계 포털</span></div>
                                            </div>
                                        </div>
                                    </template>

                                    </TabContent>
                                </div>
                            </template>
                        </TabContent>
                    </div>
                </div>
                <!-- 토지시장 심리지수 -->
                <div class="cardCaptureBox">
                    <ChartOption
                        :optionList="optionList"
                        @print="cardOption('print')"
                        @capture="cardOption('capture')"
                    />
                    <div class="cardbox cardCapture">
                        <div class="cardtit tradingtit">
                            <h1 class="titdepth2">토지시장 심리지수</h1>
                            <!-- 지역명이 표기되는 경우 -->
                            <!-- <h1 class="titdepth2"><span class="colortype-4281ff">경기</span>토지시장 심리지수</h1> -->
                            <div role="tooltip" class="tooltip bottom" style="bottom:-38px; left:0;" v-if="guidetip1">
                                <span aria-hidden="true" class="arrow" style="left:10px"></span>
                                <div class="flexbox">
                                    <p>심리지수는 시/도 단위까지 조회가 가능합니다.</p>
                                    <button type="button" title="툴팁닫기" class="tipclose"  @click="TipToggle('guidetip1', guidetip1)"></button>
                                </div>
                            </div>
                        </div>
                        <div class="holdcon">
                            <div class="textbox">
                                <div class="listbtn type3">
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
                            <div class="unittextbox right">
                                <span>단위: 심리지수</span>
                            </div>
                            <!-- 차트영역 -->
                            <div class="chartbox" style="height:370px;">
                                <!-- 모바일의 경우 (해상도 1189이하 부터) 해당 툴팁 표기 -->
                                <div class="chartTip tradingtip mobile" style="top:-140px;">
                                    <p class="tx1">2021년 1월 심리지수</p>
                                    <p class="tx2">123</p>
                                </div>
                                <!--웹의 경우 (해상도 1190이상 부터) 해당 차트 내 툴팁 표기 -->
                                <div class="chartTip tradingtip " style="top:30px;left:50px">
                                    <p class="tx1">2021년 1월 심리지수</p>
                                    <p class="tx2">123</p>
                                </div>
                                <div class="nodata"></div>
                                <span class="watermark horizongray"></span>
                            </div>
                            <!-- 테이블 -->
                            <div class="tradingtable house">
                                <div class="tablelabel" style="width:86px">
                                    <span>구분</span>
                                    <span>심리지수</span>
                                </div>
                                <jQueryScrollbar  style="width:100%;">
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
                            <div class="textbox"><span role="button" class="btn-statistics iconsource" @click="openPublicPopup('open',$event,'landType3')">출처 : 국가통계 포털</span></div>
                            <!-- 도움말 영역 -->
                            <div class="helptxtbox">
                                <div class="tit">토지시장 소비심리지수란?</div>
                                <div class="txt"><!-- 2022.04.29 퍼블 수정 오타 수정-->
                                    ‘토지시장 소비심리지수' 는 0~200의 값으로 표현되며, 지수가 100을 넘으면 전월에 비해 가격상승 및 거래증가를 예측하는 설문 응답자가 많음을 의미합니다.<br/>
                                    <span class="highlighter">지수가 0과 100 사이일 경우 토지 가격이 하락하고 거래가 감소 전망이 많음을 의미합니다.</span>
                                </div>
                                <div class="txt">※토지시장 소비 심리지수 = (토지가격지수 + 토지거래지수)/2</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="cardmap" ref="cardmap">
                <div class="cardbox"  :style="'height:'+ (winheight - 190) +'px'">
                    <div class="changeRateLayer type2">
                        <div class="changeRatecon" style="width:324px">
                            <div class="prcidxlegend changerate line">
                                <span class="prclegendtype1"></span>
                                <span class="prclegendtype2"></span>
                                <span class="prclegendtype3"></span>
                                <span class="prclegendtype4"></span>
                                <span class="prclegendtype5"></span>
                                <span class="prclegendtype6"></span>
                                <span class="prclegendtype7"></span>
                                <span class="prclegendtype8"></span>
                                <span class="prclegendtype9"></span>
                                <span class="prclegendtype10"></span>
                                <span class="prclegendtype11"></span>
                                <span class="prclegendtype12"></span>
                                <span class="prclegendtype13"></span>
                                <span class="prclegendtype14"></span>
                                <span class="prclegendtype15"></span>
                                <span class="prclegendtype16"></span>
                                <span class="prclegendtype17"></span>
                                <span class="prclegendtype18"></span>
                            </div>
                            <div class="numrate type2" style="width:calc(100% + (100% / 6))">
                                <span class="ratetype1 ico down">1.20%</span>
                                <span class="ratetype1 ico down">0.80%</span>
                                <span class="ratetype2 ico down">0.40%</span>
                                <span class="ratetype3">0</span>
                                <span class="ratetype4 ico up">0.40%</span>
                                <span class="ratetype5 ico up">0.80%</span>
                                <span class="ratetype5 ico up">1.20%</span>
                            </div>
                        </div>
                    </div>

                    <div class="changeRateLayer type2" style="top:100px">
                        <div class="changeRatecon" style="width:324px">
                            <div class="prcidxlegend lease">
                                <span class="prclegendtype1"></span>
                                <span class="prclegendtype5"></span>
                                <span class="prclegendtype10"></span>
                                <span class="prclegendtype13"></span>
                                <span class="prclegendtype16"></span>
                                <span class="prclegendtype18"></span>
                            </div>
                            <div class="numrate type2" style="width:calc(100% + (100% / 7))">
                                <span class="ratetype1">0</span>
                                <span class="ratetype2">0.2만</span>
                                <span class="ratetype3">0.4만</span>
                                <span class="ratetype4">0.6만</span>
                                <span class="ratetype5">0.8만</span>
                                <span class="ratetype6">1.0만</span>
                                <span class="ratetype6">1.2만 이상</span>
                            </div>
                        </div>
                    </div>

                    <div class="changeRateLayer type2" style="top:160px">
                        <div class="changeRatecon" style="width:324px">
                            <div class="prcidxlegend active">
                                <span class="prclegendtype6"></span>
                                <span class="prclegendtype7"></span>
                                <span class="prclegendtype8"></span>
                                <span class="pinktype1"></span>
                                <span class="pinktype2"></span>
                                <span class="pinktype3"></span>
                            </div>
                            <div class="numrate type2" style="width:calc(100% + (100% / 7))">
                                <span class="ratetype1">0</span>
                                <span class="ratetype2">40</span>
                                <span class="ratetype3">80</span>
                                <span class="ratetype4">100</span>
                                <span class="ratetype5">120</span>
                                <span class="ratetype6">160</span>
                                <span class="ratetype6">200</span>
                            </div>
                        </div>
                    </div>

                    <div class="changeRateLayer type2" style="top:215px"> <!-- 22.03.28 지도 범례 추가 -->
                        <div class="changeRatecon" style="width:324px">
                            <div class="prcidxlegend trading">
                                <span class="prclegendtype1"></span>
                                <span class="prclegendtype2"></span>
                                <span class="prclegendtype3"></span>
                                <span class="prclegendtype4"></span>
                                <span class="prclegendtype5"></span>
                                <span class="prclegendtype6"></span>
                            </div>
                            <div class="numrate type2" style="width:calc(100% + (100% / 7))">
                                <span class="ratetype1">0</span>
                                <span class="ratetype2">700</span>
                                <span class="ratetype3">1400</span>
                                <span class="ratetype4">2100</span>
                                <span class="ratetype5">2800</span>
                                <span class="ratetype6">3500</span>
                                <span class="ratetype6">4200</span>
                            </div>
                        </div>
                    </div>


                    <div class="areatooltip type4" style="top:300px; left:200px;">
                        <div class="toolbox">
                            <span class="arrow"></span>
                            <div class="txt">구리시</div>
                        </div>
                        <div class="numbox">1,234,765</div>
                    </div>
                                    
                    <div class="areatooltip type5" style="top:380px; left:200px;">
                        <div class="toolbox">
                            <span class="arrow"></span>
                            <div class="txt">구리시</div>
                        </div>
                        <div class="numbox">1,234,765</div>
                    </div>
        
                    <div class="dateSelect household poab">
                        <div class="selectbox type4 width115">
                            <span class="value txt arw" :class="{up:!selectmonth, down:selectmonth}" @click="DayLayerOpen('selectmonth')" v-html="month"></span>
                            <div role="listbox" class="selectlist" v-if="selectmonth">
                                <jQueryScrollbar :maxHeight="'141px'">
                                    <div
                                        role="list"
                                        :class="['item txt', {active:item.active}]"
                                        v-for="(item, index) in monthType"
                                        :key="index"
                                        v-html="item.text"
                                        @click="Dayselect(index,'monthType','selectmonth')"
                                    >
                                    </div>
                                </jQueryScrollbar>
                            </div>
                        </div>
                        <div class="selectbox type4 width115">
                            <span class="value txt arw" :class="{up:!selectYear, down:selectYear}" @click="DayLayerOpen('selectYear')" v-html="year"></span>
                            <div role="listbox" class="selectlist" v-if="selectYear">
                                
                                    <div
                                        role="list"
                                        :class="['item txt', {active:item.active}]"
                                        v-for="(item, index) in daysType"
                                        :key="index"
                                        v-html="item.text"
                                        @click="Dayselect(index,'daysType','selectYear')"
                                    >
                                    </div>
                                
                            </div>
                        </div>
                        <div class="selectbox type4 width115">
                            <span class="value txt arw" :class="{up:!houselayer, down:houselayer}" @click="DayLayerOpen('houselayer')" v-html="house"></span>
                            <div role="listbox" class="selectlist" v-if="houselayer">
                                    <div
                                        role="list"
                                        :class="['item txt', {active:item.active}]"
                                        v-for="(item, index) in houeType"
                                        :key="index"
                                        v-html="item.text"
                                        @click="houseSelect(index,'houeType','houselayer')"
                                    >
                                    </div>
                            </div>
                        </div>


                        <!-- <div class="selectbox type4 width115">
                            <span class="value txt check" v-html="house"  @click="DayLayerOpen('houselayer')"></span>
                            <div role="listbox" class="selectlist downlist1" v-if="houselayer">
                                <template  v-for="(item, index) in houeType" >
                                    <div class="item txt" role="list" :key="index" v-html="item.text" v-if="!(item.active)" @click="houseSelect(index,'houeType','houselayer')"></div>
                                </template>
                            </div>
                        </div> -->
                    </div>
                </div>
            </div>
        </div>
        <!-- 보조지수 -->
        <div class="mainTitlewrap">
            <div class="mainTitle">
                <h1 class="titdepth2">눈여겨 봐야 할 보조지수</h1>
            </div>
            <div class="subTitlebox">
                <div class="tit">(변동률, 2021년 9월 기준)</div>
                <span class="tablebottex iconinfo3">차트내 지역명을 클릭하시면 해당 지역의 지가변동률이 조회됩니다.</span>
                <div class="textbox"><span role="button" class="btn-statistics iconsource" @click="openPublicPopup('open',$event,'landType4')">출처 : 공공데이터포털</span></div>
            </div>
        </div>
        <!-- 보조지수 그래프 영역 -->
        <div class="cardwrap minicard">
            <div class="cardbox">
                <div class="titbox">
                    <span class="icontype icontrain">고속철도 인근 지가지수</span>
                </div>
                <div class="linechartarea">
                    <div class="linechart">
                        <div class="barline up">
                            <span class="label">오송역</span>
                            <span class="bar" style="width:80%;"></span>
                            <span class="data">0.57%</span>
                        </div>
                        <div class="barline up">
                            <span class="label">동대구역</span>
                            <span class="bar" style="width:60%;"></span>
                            <span class="data">0.57%</span>
                        </div>
                        <div class="barline up">
                            <span class="label">여천역</span>
                            <span class="bar" style="width:40%;"></span>
                            <span class="data">0.57%</span>
                        </div>
                        <div class="barline up">
                            <span class="label">신경주역</span>
                            <span class="bar" style="width:20%;"></span>
                            <span class="data">0.57%</span>
                        </div>
                        <div class="barline up">
                            <span class="label">대전역</span>
                            <span class="bar" style="width:10%;"></span>
                            <span class="data">0.57%</span>
                        </div>
                        <div class="barline basic">
                            <span class="label">서울역</span>
                            <span class="bar" style="width:0;"></span>
                        </div>
                        <div class="barline down">
                            <span class="label">용산역</span>
                            <span class="data">0.57%</span>
                            <span class="bar" style="width:10%;"></span>
                        </div>
                        <div class="barline down">
                            <span class="label">영등포역</span>
                            <span class="data">0.57%</span>
                            <span class="bar" style="width:25%;"></span>
                        </div>
                        <div class="barline down">
                            <span class="label">청량리역</span>
                            <span class="data">0.57%</span>
                            <span class="bar" style="width:50%;"></span>
                        </div>
                        <div class="barline down">
                            <span class="label">수원역</span>
                            <span class="data">0.57%</span>
                            <span class="bar" style="width:60%;"></span>
                        </div>
                    </div>
                </div>
                <div class="btmmorebox">
					<button type="button" class="btnspread arw" title="더보기" :class="{down:!chartMore, up:chartMore}" @click="SelectToggle('chartMore')"></button>
				</div>
            </div>
            <div class="cardbox">
                <div class="titbox">
                    <span class="icontype iconmetro">지하철 인근 지가지수</span>
                </div>
                <div class="linechartarea">
                    <div class="linechart">
                        <div class="barline up">
                            <span class="label">서울 강남구</span>
                            <span class="bar" style="width:80%;"></span>
                            <span class="data">0.57%</span>
                        </div>
                        <div class="barline up">
                            <span class="label">경기 과천시</span>
                            <span class="bar" style="width:60%;"></span>
                            <span class="data">0.57%</span>
                        </div>
                        <div class="barline up">
                            <span class="label">창원 마산 합포구</span>
                            <span class="bar" style="width:40%;"></span>
                            <span class="data">0.57%</span>
                        </div>
                        <div class="barline up">
                            <span class="label">서울 서초구</span>
                            <span class="bar" style="width:20%;"></span>
                            <span class="data">0.57%</span>
                        </div>
                        <div class="barline up">
                            <span class="label">서울 광진구</span>
                            <span class="bar" style="width:10%;"></span>
                            <span class="data">0.57%</span>
                        </div>
                        <div class="barline basic">
                            <span class="label">경기 고양시 일산서구</span>
                            <span class="bar" style="width:0;"></span>
                        </div>
                        <div class="barline down">
                            <span class="label">서울 영등포구</span>
                            <span class="data">0.57%</span>
                            <span class="bar" style="width:10%;"></span>
                        </div>
                        <div class="barline down">
                            <span class="label">경기 성남시 분당구</span>
                            <span class="data">0.57%</span>
                            <span class="bar" style="width:25%;"></span>
                        </div>
                        <div class="barline down">
                            <span class="label">대구 중구</span>
                            <span class="data">0.57%</span>
                            <span class="bar" style="width:50%;"></span>
                        </div>
                        <div class="barline down">
                            <span class="label">부산 동래구</span>
                            <span class="data">0.57%</span>
                            <span class="bar" style="width:60%;"></span>
                        </div>
                    </div>
                </div>
                <div class="btmmorebox">
					<button type="button" class="btnspread arw up" title="더보기"></button>
				</div>
            </div>
            <div class="cardbox">
                <div class="titbox">
                    <span class="icontype iconpolicy">정책사업 지가지수</span>
                </div>
                <div class="linechartarea">
                    <div class="linechart">
                        <div class="barline up">
                            <span class="label">부산</span>
                            <span class="bar" style="width:80%;"></span>
                            <span class="data">0.57%</span>
                        </div>
                        <div class="barline up">
                            <span class="label">서울</span>
                            <span class="bar" style="width:60%;"></span>
                            <span class="data">0.57%</span>
                        </div>
                        <div class="barline up">
                            <span class="label">대전</span>
                            <span class="bar" style="width:40%;"></span>
                            <span class="data">0.57%</span>
                        </div>
                        <!-- 더보기 버튼 클릭하면 노출 -->
                        <!-- <div class="barline up">
                            <span class="label">광주</span>
                            <span class="bar" style="width:40%;"></span>
                            <span class="data">0.57%</span>
                        </div>
                        <div class="barline up">
                            <span class="label">울산</span>
                            <span class="bar" style="width:40%;"></span>
                            <span class="data">0.57%</span>
                        </div>
                        <div class="barline basic">
                            <span class="label">충북</span>
                            <span class="bar" style="width:0"></span>
                        </div>
                        <div class="barline down">
                            <span class="label">세종</span>
                            <span class="data">0.57%</span>
                            <span class="bar" style="width:40%;"></span>
                        </div>
                        <div class="barline down">
                            <span class="label">강원</span>
                            <span class="data">0.57%</span>
                            <span class="bar" style="width:40%;"></span>
                        </div>
                        <div class="barline down">
                            <span class="label">경남</span>
                            <span class="data">0.57%</span>
                            <span class="bar" style="width:40%;"></span>
                        </div>
                        <div class="barline down">
                            <span class="label">전북</span>
                            <span class="data">0.57%</span>
                            <span class="bar" style="width:40%;"></span>
                        </div> -->
                    </div>
                </div>
                <div class="btmmorebox">
					<button type="button" class="btnspread arw down" title="더보기"></button>
				</div>
            </div>
            <div class="cardbox">
                <div class="titbox">
                    <span class="icontype iconbusiness">산업단지 지가지수</span>
                </div>
                <div class="linechartarea">
                    <div class="linechart">
                        <div class="barline up">
                            <span class="label">부산</span>
                            <span class="bar" style="width:100%;"></span>
                            <span class="data">0.57%</span>
                        </div>
                        <div class="barline up">
                            <span class="label">경북</span>
                            <span class="bar" style="width:60%;"></span>
                            <span class="data">0.57%</span>
                        </div>
                        <div class="barline up">
                            <span class="label">전남</span>
                            <span class="bar" style="width:40%;"></span>
                            <span class="data">0.57%</span>
                        </div>
                    </div>
                </div>
                <div class="btmmorebox">
					<button type="button" class="btnspread arw down" title="더보기"></button>
				</div>
            </div>
            <div class="cardbox">
                <div class="titbox">
                    <span class="icontype icongreenery">농림지역 지가지수</span>
                </div>
                <div class="linechartarea">
                    <div class="linechart">
                        <div class="barline up">
                            <span class="label">경기</span>
                            <span class="bar" style="width:100%;"></span>
                            <span class="data">0.57%</span>
                        </div>
                        <div class="barline up">
                            <span class="label">강원</span>
                            <span class="bar" style="width:60%;"></span>
                            <span class="data">0.57%</span>
                        </div>
                        <div class="barline up">
                            <span class="label">충북</span>
                            <span class="bar" style="width:40%;"></span>
                            <span class="data">0.57%</span>
                        </div>
                        <!-- 더보기 버튼 클릭하면 노출 -->
                        <!-- <div class="barline up">
                            <span class="label">충남</span>
                            <span class="bar" style="width:40%;"></span>
                            <span class="data">0.57%</span>
                        </div>
                        <div class="barline up">
                            <span class="label">전북</span>
                            <span class="bar" style="width:40%;"></span>
                            <span class="data">0.57%</span>
                        </div>
                        <div class="barline basic">
                            <span class="label">전남</span>
                            <span class="bar" style="width:0;"></span>
                        </div>
                        <div class="barline down">
                            <span class="label">전북</span>
                            <span class="data">0.57%</span>
                            <span class="bar" style="width:40%;"></span>
                        </div>
                        <div class="barline down">
                            <span class="label">경남</span>
                            <span class="data">0.57%</span>
                            <span class="bar" style="width:40%;"></span>
                        </div> -->
                    </div>
                </div>
                <div class="btmmorebox">
					<button type="button" class="btnspread arw down" title="더보기"></button>
				</div>
            </div>
        </div>
        <div class="helptxtbox">
			<div class="tit">보조지수를 이해해봅시다!</div>
            <ul class="dottxt">
                <li>고속철도, 지하철 인근 (역세권) 지가지수:  고속철도( KTX) 및 지하철 인근 표본지의 지가지수</li><!-- 2022.04.29 퍼블 수정 / 오타 수정-->
                <li>정책사업 (혁신도시) 지가지수: 혁신도시를 이루고 있는 읍면동들의 지가지수</li>
                <li>산업단지 지가지수: 전국국가산업단지, 지방산업단지 등 산업단지 인근 표본지의 지가지수</li>
                <li>농지 지가지수: 농림지역 내 전/답 표본지의 지가지수</li>
            </ul>
		</div>

        <!-- 지역간 비교 -->
        <div class="cardCaptureBox">
            <ChartOption
                :optionList="optionList"
                @print="cardOption('print')"
                @capture="cardOption('capture')"
            />
            <div class="cardbox cardCapture">
                <div class="cardtit tradingtit">
                    <h1 class="titdepth2">지역간 비교</h1>
                </div>
                <TabContent
                    :tabcontentname="'지역간 비교'"
                    :tabsublist="'tabbox tabtype3 submenu'"
                    :tabtexts="tabtextsType4"
                    v-on:tabactive="tabClick"
                >
                    <template slot="tabsubtnArea">
                        <div class="listbtn">
                            <div :class="['pickerarea', {active:monthAcitve4},{select:openPicker4}]">
                                <div class="pickerselect-text">
                                    <template v-if="starttime4.length > 0">
                                        {{starttime4[0]}}~{{starttime4[1]}}
                                    </template>
                                </div>
                                <button :class="['iconbtn btn-picker', {active:monthAcitve4}]" @click="togglePicker('type4')" />
                            </div>
                            <!-- 날짜선택 -->
                            <div class="pickerlayer lineLayer" v-if="openPicker4">
                                <div class="pickerTit">
                                    기간선택
                                    <div class="rangevalue">
                                        <span>{{starttime4[0]}}~{{starttime4[1]}}</span>
                                    </div>
                                    <button class="btn btn-popclose" @click="togglePicker('type4')"></button>
                                </div>
                                <div class="rangeTit">
                                    <div>시작</div>
                                    <div>종료</div>
                                </div>
                                <DatePicker
                                    inline
                                    range
                                    type="month"
                                    v-model="starttime4"
                                    format="YY/MM"
                                    value-type="format"
                                    :lang="customLang"
                                    @change="handleChange('type4')"
                                />
                                <div class="btmlocbtn">
                                        <button class="btn btn-reset">초기화</button>
                                    <button class="btn btn-round cancel" @click="togglePicker('type4')">취소</button>
                                    <button class="btn btn-round confirm" @click="togglePicker('type4')">확인</button>
                                </div>
                            </div>
                        </div>
                    </template>
                    <template slot="panel">
                        <div class="tabcon" role="tabpanel" v-if="tabnum7===0">
                            <div class="holdcon">
                                <div class="selectbox type5">
                                    <span class="value txt arw" :class="{down:!locationSelect1, up:locationSelect1}" @click="SelectToggle('locationSelect1')">비교지역</span>
                                </div>
                                <!-- 지역선택 레이어 -->
                                <div class="locationSelect" v-if="locationSelect1">
                                    <button type="button" class="btn btn-popclose" title="닫기" @click="SelectToggle('locationSelect1')">닫기</button>
                                    <div class="tit">
                                        <strong>지역선택</strong>
                                        <button type="button" class="btn btn-search" title="검색" @click="SelectToggle('locationSearch1')">검색</button>
                                    </div>
                                    <Location
                                        :locationArea="locationArea"
                                        @seletlocation="seletlocation"
                                    >
                                        <!-- 지역검색 레이어 -->
                                        <div class="locationSelect search" v-if="locationSearch1">
                                            <button type="button" class="btn btn-popclose" title="닫기" @click="SelectToggle('locationSearch1')">닫기</button>
                                            <div class="tit">
                                                <button type="button" title="뒤로가기" aria-label="뒤로가기" class="btn btn-back arw left" @click="SelectToggle('locationSearch1')"></button>
                                                <strong>지역검색</strong>
                                            </div>
                                            <div class="locsearchwrap">
                                                <div class="locsearchbox">
                                                    <div class="searchinpbox">
                                                        <input type="text" placeholder="지역을 검색해보세요" v-model="srhtext1">
                                                        <button type="button" class="btn btn-inpclear" title="검색어 삭제" v-if="srhtext1.length > 0" @click="TxtDelete('srhtext1')"></button>
                                                        <button type="button" class="btn btn-search" title="검색"></button>
                                                    </div>
                                                    <div class="schwordlistwrap" v-if="srhtext1.length > 0">
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
                                <!-- 툴팁 -->
                                <div role="tooltip" class="tooltip bottom" style="top:38px; left:0;" v-if="guidetip2">
                                    <span aria-hidden="true" class="arrow" style="left:10px"></span>
                                    <div class="flexbox">
                                        <p>‘전국' 데이터와 비교할 지역을 선택해 보세요.</p>
                                        <button type="button" title="툴팁닫기" class="tipclose"  @click="TipToggle('guidetip2', guidetip2)"></button>
                                    </div>
                                </div>
                                <div class="chartlegend type2">
                                    <span class="legend line-1c7ed6">전국 지가변동률</span>
                                    <!-- 지역 선택될 경우 -->
                                    <!-- <span class="legend line-1c7ed6">서울 종로구 지가변동률</span>
                                    <span class="legend line-ff922b">서울 영등포구 지가변동률 </span> -->
                                </div>
                                <div class="unittextbox between">
                                    <span>거래량(필지)</span>
                                    <span>변동률 (%, 전월대비)</span>
                                </div>
                                <!-- 차트영역 -->
                                <div class="chartbox" style="height:370px;">
                                    <!-- 모바일의 경우 (해상도 1189이하 부터) 해당 툴팁 표기 -->
                                    <div class="chartTip tradingtip mobile" style="top:-140px;">
                                        <p class="tx1">2021년 1월 지가변동률</p>
                                        <div class="linebox botnoline">
                                            <p class="tx2 txblack">서울 종로구</p>
                                            <p class="txbar txblack">변동률(전월대비):<span class="ico numup"></span>0.123%</p>
                                        </div>
                                        <div class="linebox botnoline">
                                            <p class="tx2 txblack">창원 마산합포구</p>
                                            <p class="txbar txblack">변동률(전월대비):<span class="ico numup"></span>0.123%</p>
                                        </div>
                                    </div>
                                    <!--웹의 경우 (해상도 1190이상 부터) 해당 차트 내 툴팁 표기 -->
                                    <div class="chartTip tradingtip " style="top:30px;left:50px">
                                        <p class="tx1">2021년 1월 지가변동률</p>
                                        <div class="linebox botnoline">
                                            <p class="tx2 txblack">서울 종로구</p>
                                            <p class="txbar txblack">변동률(전월대비):<span class="ico numup"></span>0.123%</p>
                                        </div>
                                        <div class="linebox botnoline">
                                            <p class="tx2 txblack">창원 마산합포구</p>
                                            <p class="txbar txblack">변동률(전월대비):<span class="ico numup"></span>0.123%</p>
                                        </div>
                                    </div>
                                    <div class="nodata"></div>
                                    <span class="watermark horizongray"></span>
                                </div>
                            </div>
                        </div>
                        <div class="tabcon" role="tabpanel" v-if="tabnum7===1">
                            <div class="holdcon">
                                <div class="selectbox type5">
                                    <span class="value txt arw" :class="{down:!locationSelect2, up:locationSelect2}" @click="SelectToggle('locationSelect2')">비교지역</span>
                                </div>
                                <!-- 지역선택 레이어 -->
                                <div class="locationSelect" v-if="locationSelect2">
                                    <button type="button" class="btn btn-popclose" title="닫기" @click="SelectToggle('locationSelect2')">닫기</button>
                                    <div class="tit">
                                        <strong>지역선택</strong>
                                        <button type="button" class="btn btn-search" title="검색" @click="SelectToggle('locationSearch2')">검색</button>
                                    </div>
                                    <Location
                                        :locationArea="locationArea"
                                        @seletlocation="seletlocation"
                                    >
                                        <!-- 지역검색 레이어 -->
                                        <div class="locationSelect search" v-if="locationSearch2">
                                            <button type="button" class="btn btn-popclose" title="닫기" @click="SelectToggle('locationSearch2')">닫기</button>
                                            <div class="tit">
                                                <button type="button" title="뒤로가기" aria-label="뒤로가기" class="btn btn-back arw left" @click="SelectToggle('locationSearch2')"></button>
                                                <strong>지역검색</strong>
                                            </div>
                                            <div class="locsearchwrap">
                                                <div class="locsearchbox">
                                                    <div class="searchinpbox">
                                                        <input type="text" placeholder="지역을 검색해보세요" v-model="srhtext2">
                                                        <button type="button" class="btn btn-inpclear" title="검색어 삭제" v-if="srhtext2.length > 0" @click="TxtDelete('srhtext2')"></button>
                                                        <button type="button" class="btn btn-search" title="검색"></button>
                                                    </div>
                                                    <div class="schwordlistwrap" v-if="srhtext2.length > 0">
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
                                <!-- 툴팁 -->
                                <div role="tooltip" class="tooltip bottom" style="top:38px; left:0;" v-if="guidetip2">
                                    <span aria-hidden="true" class="arrow" style="left:10px"></span>
                                    <div class="flexbox">
                                        <p>‘전국' 데이터와 비교할 지역을 선택해 보세요.</p>
                                        <button type="button" title="툴팁닫기" class="tipclose"  @click="TipToggle('guidetip2', guidetip2)"></button>
                                    </div>
                                </div>
                                <div class="chartlegend type2">
                                    <span class="legend stick-74c0fc">서울 종로구 거래량</span>
                                    <span class="legend line-1c7ed6">서울 종로구 변동률</span>
                                    <span class="legend stick-ff922b">서울 강남구 거래량</span>
                                    <span class="legend line-ff922b">서울 강남구 변동률</span>
                                </div>
                                <div class="unittextbox between">
                                    <span>거래량(필지)</span>
                                    <span>변동률 (%, 전월대비)</span>
                                </div>
                                <!-- 차트영역 -->
                                <div class="chartbox" style="height:370px;">
                                    <!-- 모바일의 경우 (해상도 1189이하 부터) 해당 툴팁 표기 -->
                                    <div class="chartTip tradingtip mobile" style="top:-140px;">
                                        <p class="tx1">2021년 1월 토지거래량</p>
                                        <div class="linebox botnoline">
                                            <p class="tx2 txblack">서울 종로구</p>
                                            <p class="txbar txblack">변동률(전월대비):<span class="ico numup"></span>0.123%</p>
                                        </div>
                                        <div class="linebox botnoline">
                                            <p class="tx2 txblack">창원 마산합포구</p>
                                            <p class="txbar txblack">변동률(전월대비):<span class="ico numup"></span>0.123%</p>
                                        </div>
                                    </div>
                                    <!--웹의 경우 (해상도 1190이상 부터) 해당 차트 내 툴팁 표기 -->
                                    <div class="chartTip tradingtip " style="top:30px;left:50px">
                                        <p class="tx1">2021년 1월 토지거래량</p>
                                        <div class="linebox botnoline">
                                            <p class="tx2 txblack">서울 종로구</p>
                                            <p class="txbar txblack">1,234,567필지<span class="ico numup"></span>0.123%</p>
                                        </div>
                                        <div class="linebox botnoline">
                                            <p class="tx2 txblack">창원 마산합포구</p>
                                            <p class="txbar txblack">1,234,567필지<span class="ico numup"></span>0.123%</p>
                                        </div>
                                    </div>
                                    <div class="nodata"></div>
                                    <span class="watermark horizongray"></span>
                                </div>
                            </div>
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
            :class="{landType4:landType4}"
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
            //picker  데이터
            monthAcitve1: false,
            openPicker1: false,
            starttime1: ['20/07', '21/07'],
            monthAcitve2: false,
            openPicker2: false,
            starttime2: ['20/07', '21/07'],
            monthAcitve3: true,
            openPicker3: false,
            starttime3: ['20/07', '21/07'],
            monthAcitve4: true,
            openPicker4: false,
            starttime4: ['20/07', '21/07'],
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
            locationSelect1: false,
            locationSearch1: false,
            locationSelect2: false,
            locationSearch2: false,
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
            tabtextsType1: ['용도지역별', '이용상황별'],
            tabnum: 0,
            tabtextsType2: ['전체', '거래주체별', '거래규모별', '용도지역별', '건물용도별'],
            tabtextsType3: ['필지', '면적'],
            tabtextsType4: ['지가변동률', '토지거래량'],
            tabnum1: 0,
            tabnum2: 0,
            tabnum3: 0,
            tabnum4: 0,
            tabnum5: 0,
            tabnum6: 0,
            tabnum7: 0,
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
                {day: '21.07'}
            ],
            //테이블 데이터
            tradingdatas: [
                {
                    location: '소계',
                    data: [
                        {day: '20.07', value: '+0.123'},
                        {day: '20.08', value: '+0.123'},
                        {day: '20.09', value: '+0.123'},
                        {day: '20.10', value: '+0.123'},
                        {day: '20.11', value: '+0.123'},
                        {day: '20.12', value: '+0.123'},
                        {day: '21.01', value: '+0.123'},
                        {day: '21.02', value: '+0.123'},
                        {day: '21.03', value: '+0.123'},
                        {day: '21.04', value: '+0.123'},
                        {day: '21.05', value: '+0.123'},
                        {day: '21.06', value: '+0.123'},
                        {day: '21.07', value: '+0.123'}
                    ]
                },
                {
                    location: '주거',
                    data: [
                        {day: '20.07', value: '+0.123'},
                        {day: '20.08', value: '+0.123'},
                        {day: '20.09', value: '+0.123'},
                        {day: '20.10', value: '+0.123'},
                        {day: '20.11', value: '+0.123'},
                        {day: '20.12', value: '+0.123'},
                        {day: '21.01', value: '+0.123'},
                        {day: '21.02', value: '+0.123'},
                        {day: '21.03', value: '+0.123'},
                        {day: '21.04', value: '+0.123'},
                        {day: '21.05', value: '+0.123'},
                        {day: '21.06', value: '+0.123'},
                        {day: '21.07', value: '+0.123'}
                    ]
                },
                {
                    location: '상업',
                    data: [
                        {day: '20.07', value: '+0.123'},
                        {day: '20.08', value: '+0.123'},
                        {day: '20.09', value: '+0.123'},
                        {day: '20.10', value: '+0.123'},
                        {day: '20.11', value: '+0.123'},
                        {day: '20.12', value: '+0.123'},
                        {day: '21.01', value: '+0.123'},
                        {day: '21.02', value: '+0.123'},
                        {day: '21.03', value: '+0.123'},
                        {day: '21.04', value: '+0.123'},
                        {day: '21.05', value: '+0.123'},
                        {day: '21.06', value: '+0.123'},
                        {day: '21.07', value: '+0.123'}
                    ]
                },
                {
                    location: '공업',
                    data: [
                        {day: '20.07', value: '+0.123'},
                        {day: '20.08', value: '+0.123'},
                        {day: '20.09', value: '+0.123'},
                        {day: '20.10', value: '+0.123'},
                        {day: '20.11', value: '+0.123'},
                        {day: '20.12', value: '+0.123'},
                        {day: '21.01', value: '+0.123'},
                        {day: '21.02', value: '+0.123'},
                        {day: '21.03', value: '+0.123'},
                        {day: '21.04', value: '+0.123'},
                        {day: '21.05', value: '+0.123'},
                        {day: '21.06', value: '+0.123'},
                        {day: '21.07', value: '+0.123'}
                    ]
                },
                {
                    location: '녹지',
                    data: [
                        {day: '20.07', value: '+0.123'},
                        {day: '20.08', value: '+0.123'},
                        {day: '20.09', value: '+0.123'},
                        {day: '20.10', value: '+0.123'},
                        {day: '20.11', value: '+0.123'},
                        {day: '20.12', value: '+0.123'},
                        {day: '21.01', value: '+0.123'},
                        {day: '21.02', value: '+0.123'},
                        {day: '21.03', value: '+0.123'},
                        {day: '21.04', value: '+0.123'},
                        {day: '21.05', value: '+0.123'},
                        {day: '21.06', value: '+0.123'},
                        {day: '21.07', value: '+0.123'}
                    ]
                },
                {
                    location: '관리',
                    data: [
                        {day: '20.07', value: '+0.123'},
                        {day: '20.08', value: '+0.123'},
                        {day: '20.09', value: '+0.123'},
                        {day: '20.10', value: '+0.123'},
                        {day: '20.11', value: '+0.123'},
                        {day: '20.12', value: '+0.123'},
                        {day: '21.01', value: '+0.123'},
                        {day: '21.02', value: '+0.123'},
                        {day: '21.03', value: '+0.123'},
                        {day: '21.04', value: '+0.123'},
                        {day: '21.05', value: '+0.123'},
                        {day: '21.06', value: '+0.123'},
                        {day: '21.07', value: '+0.123'}
                    ]
                },
                {
                    location: '보전관리',
                    data: [
                        {day: '20.07', value: '+0.123'},
                        {day: '20.08', value: '+0.123'},
                        {day: '20.09', value: '+0.123'},
                        {day: '20.10', value: '+0.123'},
                        {day: '20.11', value: '+0.123'},
                        {day: '20.12', value: '+0.123'},
                        {day: '21.01', value: '+0.123'},
                        {day: '21.02', value: '+0.123'},
                        {day: '21.03', value: '+0.123'},
                        {day: '21.04', value: '+0.123'},
                        {day: '21.05', value: '+0.123'},
                        {day: '21.06', value: '+0.123'},
                        {day: '21.07', value: '+0.123'}
                    ]
                },
                {
                    location: '농림',
                    data: [
                        {day: '20.07', value: '+0.123'},
                        {day: '20.08', value: '+0.123'},
                        {day: '20.09', value: '+0.123'},
                        {day: '20.10', value: '+0.123'},
                        {day: '20.11', value: '+0.123'},
                        {day: '20.12', value: '+0.123'},
                        {day: '21.01', value: '+0.123'},
                        {day: '21.02', value: '+0.123'},
                        {day: '21.03', value: '+0.123'},
                        {day: '21.04', value: '+0.123'},
                        {day: '21.05', value: '+0.123'},
                        {day: '21.06', value: '+0.123'},
                        {day: '21.07', value: '+0.123'}
                    ]
                },
                {
                    location: '생산관리',
                    data: [
                        {day: '20.07', value: '+0.123'},
                        {day: '20.08', value: '+0.123'},
                        {day: '20.09', value: '+0.123'},
                        {day: '20.10', value: '+0.123'},
                        {day: '20.11', value: '+0.123'},
                        {day: '20.12', value: '+0.123'},
                        {day: '21.01', value: '+0.123'},
                        {day: '21.02', value: '+0.123'},
                        {day: '21.03', value: '+0.123'},
                        {day: '21.04', value: '+0.123'},
                        {day: '21.05', value: '+0.123'},
                        {day: '21.06', value: '+0.123'},
                        {day: '21.07', value: '+0.123'}
                    ]
                },
                {
                    location: '계획관리',
                    data: [
                        {day: '20.07', value: '+0.123'},
                        {day: '20.08', value: '+0.123'},
                        {day: '20.09', value: '+0.123'},
                        {day: '20.10', value: '+0.123'},
                        {day: '20.11', value: '+0.123'},
                        {day: '20.12', value: '+0.123'},
                        {day: '21.01', value: '+0.123'},
                        {day: '21.02', value: '+0.123'},
                        {day: '21.03', value: '+0.123'},
                        {day: '21.04', value: '+0.123'},
                        {day: '21.05', value: '+0.123'},
                        {day: '21.06', value: '+0.123'},
                        {day: '21.07', value: '+0.123'}
                    ]
                },
                {
                    location: '자연환경보전',
                    data: [
                        {day: '20.07', value: '+0.123'},
                        {day: '20.08', value: '+0.123'},
                        {day: '20.09', value: '+0.123'},
                        {day: '20.10', value: '+0.123'},
                        {day: '20.11', value: '+0.123'},
                        {day: '20.12', value: '+0.123'},
                        {day: '21.01', value: '+0.123'},
                        {day: '21.02', value: '+0.123'},
                        {day: '21.03', value: '+0.123'},
                        {day: '21.04', value: '+0.123'},
                        {day: '21.05', value: '+0.123'},
                        {day: '21.06', value: '+0.123'},
                        {day: '21.07', value: '+0.123'}
                    ]
                }
            ],
            tradingdatas1: [
                {
                    location: '소계',
                    data: [
                        {day: '20.07', value: '+0.123'},
                        {day: '20.08', value: '+0.123'},
                        {day: '20.09', value: '+0.123'},
                        {day: '20.10', value: '+0.123'},
                        {day: '20.11', value: '+0.123'},
                        {day: '20.12', value: '+0.123'},
                        {day: '21.01', value: '+0.123'},
                        {day: '21.02', value: '+0.123'},
                        {day: '21.03', value: '+0.123'},
                        {day: '21.04', value: '+0.123'},
                        {day: '21.05', value: '+0.123'},
                        {day: '21.06', value: '+0.123'},
                        {day: '21.07', value: '+0.123'}
                    ]
                },
                {
                    location: '전',
                    data: [
                        {day: '20.07', value: '+0.123'},
                        {day: '20.08', value: '+0.123'},
                        {day: '20.09', value: '+0.123'},
                        {day: '20.10', value: '+0.123'},
                        {day: '20.11', value: '+0.123'},
                        {day: '20.12', value: '+0.123'},
                        {day: '21.01', value: '+0.123'},
                        {day: '21.02', value: '+0.123'},
                        {day: '21.03', value: '+0.123'},
                        {day: '21.04', value: '+0.123'},
                        {day: '21.05', value: '+0.123'},
                        {day: '21.06', value: '+0.123'},
                        {day: '21.07', value: '+0.123'}
                    ]
                },
                {
                    location: '답',
                    data: [
                        {day: '20.07', value: '+0.123'},
                        {day: '20.08', value: '+0.123'},
                        {day: '20.09', value: '+0.123'},
                        {day: '20.10', value: '+0.123'},
                        {day: '20.11', value: '+0.123'},
                        {day: '20.12', value: '+0.123'},
                        {day: '21.01', value: '+0.123'},
                        {day: '21.02', value: '+0.123'},
                        {day: '21.03', value: '+0.123'},
                        {day: '21.04', value: '+0.123'},
                        {day: '21.05', value: '+0.123'},
                        {day: '21.06', value: '+0.123'},
                        {day: '21.07', value: '+0.123'}
                    ]
                },
                {
                    location: '주거용(대)',
                    data: [
                        {day: '20.07', value: '+0.123'},
                        {day: '20.08', value: '+0.123'},
                        {day: '20.09', value: '+0.123'},
                        {day: '20.10', value: '+0.123'},
                        {day: '20.11', value: '+0.123'},
                        {day: '20.12', value: '+0.123'},
                        {day: '21.01', value: '+0.123'},
                        {day: '21.02', value: '+0.123'},
                        {day: '21.03', value: '+0.123'},
                        {day: '21.04', value: '+0.123'},
                        {day: '21.05', value: '+0.123'},
                        {day: '21.06', value: '+0.123'},
                        {day: '21.07', value: '+0.123'}
                    ]
                },
                {
                    location: '상업용(대)',
                    data: [
                        {day: '20.07', value: '+0.123'},
                        {day: '20.08', value: '+0.123'},
                        {day: '20.09', value: '+0.123'},
                        {day: '20.10', value: '+0.123'},
                        {day: '20.11', value: '+0.123'},
                        {day: '20.12', value: '+0.123'},
                        {day: '21.01', value: '+0.123'},
                        {day: '21.02', value: '+0.123'},
                        {day: '21.03', value: '+0.123'},
                        {day: '21.04', value: '+0.123'},
                        {day: '21.05', value: '+0.123'},
                        {day: '21.06', value: '+0.123'},
                        {day: '21.07', value: '+0.123'}
                    ]
                },
                {
                    location: '임야',
                    data: [
                        {day: '20.07', value: '+0.123'},
                        {day: '20.08', value: '+0.123'},
                        {day: '20.09', value: '+0.123'},
                        {day: '20.10', value: '+0.123'},
                        {day: '20.11', value: '+0.123'},
                        {day: '20.12', value: '+0.123'},
                        {day: '21.01', value: '+0.123'},
                        {day: '21.02', value: '+0.123'},
                        {day: '21.03', value: '+0.123'},
                        {day: '21.04', value: '+0.123'},
                        {day: '21.05', value: '+0.123'},
                        {day: '21.06', value: '+0.123'},
                        {day: '21.07', value: '+0.123'}
                    ]
                },
                {
                    location: '공장용지',
                    data: [
                        {day: '20.07', value: '+0.123'},
                        {day: '20.08', value: '+0.123'},
                        {day: '20.09', value: '+0.123'},
                        {day: '20.10', value: '+0.123'},
                        {day: '20.11', value: '+0.123'},
                        {day: '20.12', value: '+0.123'},
                        {day: '21.01', value: '+0.123'},
                        {day: '21.02', value: '+0.123'},
                        {day: '21.03', value: '+0.123'},
                        {day: '21.04', value: '+0.123'},
                        {day: '21.05', value: '+0.123'},
                        {day: '21.06', value: '+0.123'},
                        {day: '21.07', value: '+0.123'}
                    ]
                },
                {
                    location: '기타',
                    data: [
                        {day: '20.07', value: '+0.123'},
                        {day: '20.08', value: '+0.123'},
                        {day: '20.09', value: '+0.123'},
                        {day: '20.10', value: '+0.123'},
                        {day: '20.11', value: '+0.123'},
                        {day: '20.12', value: '+0.123'},
                        {day: '21.01', value: '+0.123'},
                        {day: '21.02', value: '+0.123'},
                        {day: '21.03', value: '+0.123'},
                        {day: '21.04', value: '+0.123'},
                        {day: '21.05', value: '+0.123'},
                        {day: '21.06', value: '+0.123'},
                        {day: '21.07', value: '+0.123'}
                    ]
                }
            ],
            tradingdatas2: [
                {
                    location: '심리지수',
                    data: [
                        {day: '20.07', value: '+0.123'},
                        {day: '20.08', value: '+0.123'},
                        {day: '20.09', value: '+0.123'},
                        {day: '20.10', value: '+0.123'},
                        {day: '20.11', value: '+0.123'},
                        {day: '20.12', value: '+0.123'},
                        {day: '21.01', value: '+0.123'},
                        {day: '21.02', value: '+0.123'},
                        {day: '21.03', value: '+0.123'},
                        {day: '21.04', value: '+0.123'},
                        {day: '21.05', value: '+0.123'},
                        {day: '21.06', value: '+0.123'},
                        {day: '21.07', value: '+0.123'}
                    ]
                }
            ],
            landingdatas: [
                {
                    type: '전체',
                    daylists:
                        [
                            {
                                day: '20.07',
                                data: [
                                    {type: '거래량', value: '1,234,567'},
                                    {type: '변동률', value: '1.23%'}
                                ]
                            },
                            {
                                day: '20.08',
                                data: [
                                    {type: '거래량', value: '1,234,567'},
                                    {type: '변동률', value: '1.23%'}
                                ]
                            },
                            {
                                day: '20.09',
                                data: [
                                    {type: '거래량', value: '1,234,567'},
                                    {type: '변동률', value: '1.23%'}
                                ]
                            },
                            {
                                day: '20.10',
                                data: [
                                    {type: '거래량', value: '1,234,567'},
                                    {type: '변동률', value: '1.23%'}
                                ]
                            },
                            {
                                day: '20.11',
                                data: [
                                    {type: '거래량', value: '1,234,567'},
                                    {type: '변동률', value: '1.23%'}
                                ]
                            },
                            {
                                day: '20.12',
                                data: [
                                    {type: '거래량', value: '1,234,567'},
                                    {type: '변동률', value: '1.23%'}
                                ]
                            },
                            {
                                day: '21.01',
                                data: [
                                    {type: '거래량', value: '1,234,567'},
                                    {type: '변동률', value: '1.23%'}
                                ]
                            },
                            {
                                day: '21.02',
                                data: [
                                    {type: '거래량', value: '1,234,567'},
                                    {type: '변동률', value: '1.23%'}
                                ]
                            },
                            {
                                day: '21.03',
                                data: [
                                    {type: '거래량', value: '1,234,567'},
                                    {type: '변동률', value: '1.23%'}
                                ]
                            },
                            {
                                day: '21.04',
                                data: [
                                    {type: '거래량', value: '1,234,567'},
                                    {type: '변동률', value: '1.23%'}
                                ]
                            },
                            {
                                day: '21.05',
                                data: [
                                    {type: '거래량', value: '1,234,567'},
                                    {type: '변동률', value: '1.23%'}
                                ]
                            },
                            {
                                day: '21.06',
                                data: [
                                    {type: '거래량', value: '1,234,567'},
                                    {type: '변동률', value: '1.23%'}
                                ]
                            },
                            {
                                day: '21.07',
                                data: [
                                    {type: '거래량', value: '1,234,567'},
                                    {type: '변동률', value: '1.23%'}
                                ]
                            }
                        ]
                    
                    
                }
            ],
            landingdatas1: [
                {
                    type: '전체',
                    daylists:
                        [
                            {
                                day: '20.07',
                                data: [
                                    {type: '거래량', value: '1,234,567'},
                                    {type: '변동률', value: '1.23%'}
                                ]
                            },
                            {
                                day: '20.08',
                                data: [
                                    {type: '거래량', value: '1,234,567'},
                                    {type: '변동률', value: '1.23%'}
                                ]
                            },
                            {
                                day: '20.09',
                                data: [
                                    {type: '거래량', value: '1,234,567'},
                                    {type: '변동률', value: '1.23%'}
                                ]
                            },
                            {
                                day: '20.10',
                                data: [
                                    {type: '거래량', value: '1,234,567'},
                                    {type: '변동률', value: '1.23%'}
                                ]
                            },
                            {
                                day: '20.11',
                                data: [
                                    {type: '거래량', value: '1,234,567'},
                                    {type: '변동률', value: '1.23%'}
                                ]
                            },
                            {
                                day: '20.12',
                                data: [
                                    {type: '거래량', value: '1,234,567'},
                                    {type: '변동률', value: '1.23%'}
                                ]
                            },
                            {
                                day: '21.01',
                                data: [
                                    {type: '거래량', value: '1,234,567'},
                                    {type: '변동률', value: '1.23%'}
                                ]
                            },
                            {
                                day: '21.02',
                                data: [
                                    {type: '거래량', value: '1,234,567'},
                                    {type: '변동률', value: '1.23%'}
                                ]
                            },
                            {
                                day: '21.03',
                                data: [
                                    {type: '거래량', value: '1,234,567'},
                                    {type: '변동률', value: '1.23%'}
                                ]
                            },
                            {
                                day: '21.04',
                                data: [
                                    {type: '거래량', value: '1,234,567'},
                                    {type: '변동률', value: '1.23%'}
                                ]
                            },
                            {
                                day: '21.05',
                                data: [
                                    {type: '거래량', value: '1,234,567'},
                                    {type: '변동률', value: '1.23%'}
                                ]
                            },
                            {
                                day: '21.06',
                                data: [
                                    {type: '거래량', value: '1,234,567'},
                                    {type: '변동률', value: '1.23%'}
                                ]
                            },
                            {
                                day: '21.07',
                                data: [
                                    {type: '거래량', value: '1,234,567'},
                                    {type: '변동률', value: '1.23%'}
                                ]
                            }
                        ]
                    
                    
                },
                {
                    type: '개인→개인',
                    daylists:
                        [
                            {
                                day: '20.07',
                                data: [
                                    {type: '거래량', value: '1,234,567'},
                                    {type: '변동률', value: '1.23%'}
                                ]
                            },
                            {
                                day: '20.08',
                                data: [
                                    {type: '거래량', value: '1,234,567'},
                                    {type: '변동률', value: '1.23%'}
                                ]
                            },
                            {
                                day: '20.09',
                                data: [
                                    {type: '거래량', value: '1,234,567'},
                                    {type: '변동률', value: '1.23%'}
                                ]
                            },
                            {
                                day: '20.10',
                                data: [
                                    {type: '거래량', value: '1,234,567'},
                                    {type: '변동률', value: '1.23%'}
                                ]
                            },
                            {
                                day: '20.11',
                                data: [
                                    {type: '거래량', value: '1,234,567'},
                                    {type: '변동률', value: '1.23%'}
                                ]
                            },
                            {
                                day: '20.12',
                                data: [
                                    {type: '거래량', value: '1,234,567'},
                                    {type: '변동률', value: '1.23%'}
                                ]
                            },
                            {
                                day: '21.01',
                                data: [
                                    {type: '거래량', value: '1,234,567'},
                                    {type: '변동률', value: '1.23%'}
                                ]
                            },
                            {
                                day: '21.02',
                                data: [
                                    {type: '거래량', value: '1,234,567'},
                                    {type: '변동률', value: '1.23%'}
                                ]
                            },
                            {
                                day: '21.03',
                                data: [
                                    {type: '거래량', value: '1,234,567'},
                                    {type: '변동률', value: '1.23%'}
                                ]
                            },
                            {
                                day: '21.04',
                                data: [
                                    {type: '거래량', value: '1,234,567'},
                                    {type: '변동률', value: '1.23%'}
                                ]
                            },
                            {
                                day: '21.05',
                                data: [
                                    {type: '거래량', value: '1,234,567'},
                                    {type: '변동률', value: '1.23%'}
                                ]
                            },
                            {
                                day: '21.06',
                                data: [
                                    {type: '거래량', value: '1,234,567'},
                                    {type: '변동률', value: '1.23%'}
                                ]
                            },
                            {
                                day: '21.07',
                                data: [
                                    {type: '거래량', value: '1,234,567'},
                                    {type: '변동률', value: '1.23%'}
                                ]
                            }
                        ]
                    
                    
                }
            ],
            landingdatas2: [
                {
                    type: '주거',
                    daylists:
                        [
                            {
                                day: '20.07',
                                data: [
                                    {type: '거래량', value: '1,234,567'},
                                    {type: '변동률', value: '1.23%'}
                                ]
                            },
                            {
                                day: '20.08',
                                data: [
                                    {type: '거래량', value: '1,234,567'},
                                    {type: '변동률', value: '1.23%'}
                                ]
                            },
                            {
                                day: '20.09',
                                data: [
                                    {type: '거래량', value: '1,234,567'},
                                    {type: '변동률', value: '1.23%'}
                                ]
                            },
                            {
                                day: '20.10',
                                data: [
                                    {type: '거래량', value: '1,234,567'},
                                    {type: '변동률', value: '1.23%'}
                                ]
                            },
                            {
                                day: '20.11',
                                data: [
                                    {type: '거래량', value: '1,234,567'},
                                    {type: '변동률', value: '1.23%'}
                                ]
                            },
                            {
                                day: '20.12',
                                data: [
                                    {type: '거래량', value: '1,234,567'},
                                    {type: '변동률', value: '1.23%'}
                                ]
                            },
                            {
                                day: '21.01',
                                data: [
                                    {type: '거래량', value: '1,234,567'},
                                    {type: '변동률', value: '1.23%'}
                                ]
                            },
                            {
                                day: '21.02',
                                data: [
                                    {type: '거래량', value: '1,234,567'},
                                    {type: '변동률', value: '1.23%'}
                                ]
                            },
                            {
                                day: '21.03',
                                data: [
                                    {type: '거래량', value: '1,234,567'},
                                    {type: '변동률', value: '1.23%'}
                                ]
                            },
                            {
                                day: '21.04',
                                data: [
                                    {type: '거래량', value: '1,234,567'},
                                    {type: '변동률', value: '1.23%'}
                                ]
                            },
                            {
                                day: '21.05',
                                data: [
                                    {type: '거래량', value: '1,234,567'},
                                    {type: '변동률', value: '1.23%'}
                                ]
                            },
                            {
                                day: '21.06',
                                data: [
                                    {type: '거래량', value: '1,234,567'},
                                    {type: '변동률', value: '1.23%'}
                                ]
                            },
                            {
                                day: '21.07',
                                data: [
                                    {type: '거래량', value: '1,234,567'},
                                    {type: '변동률', value: '1.23%'}
                                ]
                            }
                        ]
                    
                    
                },
                {
                    type: '상업',
                    daylists:
                        [
                            {
                                day: '20.07',
                                data: [
                                    {type: '거래량', value: '1,234,567'},
                                    {type: '변동률', value: '1.23%'}
                                ]
                            },
                            {
                                day: '20.08',
                                data: [
                                    {type: '거래량', value: '1,234,567'},
                                    {type: '변동률', value: '1.23%'}
                                ]
                            },
                            {
                                day: '20.09',
                                data: [
                                    {type: '거래량', value: '1,234,567'},
                                    {type: '변동률', value: '1.23%'}
                                ]
                            },
                            {
                                day: '20.10',
                                data: [
                                    {type: '거래량', value: '1,234,567'},
                                    {type: '변동률', value: '1.23%'}
                                ]
                            },
                            {
                                day: '20.11',
                                data: [
                                    {type: '거래량', value: '1,234,567'},
                                    {type: '변동률', value: '1.23%'}
                                ]
                            },
                            {
                                day: '20.12',
                                data: [
                                    {type: '거래량', value: '1,234,567'},
                                    {type: '변동률', value: '1.23%'}
                                ]
                            },
                            {
                                day: '21.01',
                                data: [
                                    {type: '거래량', value: '1,234,567'},
                                    {type: '변동률', value: '1.23%'}
                                ]
                            },
                            {
                                day: '21.02',
                                data: [
                                    {type: '거래량', value: '1,234,567'},
                                    {type: '변동률', value: '1.23%'}
                                ]
                            },
                            {
                                day: '21.03',
                                data: [
                                    {type: '거래량', value: '1,234,567'},
                                    {type: '변동률', value: '1.23%'}
                                ]
                            },
                            {
                                day: '21.04',
                                data: [
                                    {type: '거래량', value: '1,234,567'},
                                    {type: '변동률', value: '1.23%'}
                                ]
                            },
                            {
                                day: '21.05',
                                data: [
                                    {type: '거래량', value: '1,234,567'},
                                    {type: '변동률', value: '1.23%'}
                                ]
                            },
                            {
                                day: '21.06',
                                data: [
                                    {type: '거래량', value: '1,234,567'},
                                    {type: '변동률', value: '1.23%'}
                                ]
                            },
                            {
                                day: '21.07',
                                data: [
                                    {type: '거래량', value: '1,234,567'},
                                    {type: '변동률', value: '1.23%'}
                                ]
                            }
                        ]
                    
                    
                }
            ],
            landingdatas3: [
                {
                    type: '단독주택',
                    daylists:
                        [
                            {
                                day: '20.07',
                                data: [
                                    {type: '거래량', value: '1,234,567'},
                                    {type: '변동률', value: '1.23%'}
                                ]
                            },
                            {
                                day: '20.08',
                                data: [
                                    {type: '거래량', value: '1,234,567'},
                                    {type: '변동률', value: '1.23%'}
                                ]
                            },
                            {
                                day: '20.09',
                                data: [
                                    {type: '거래량', value: '1,234,567'},
                                    {type: '변동률', value: '1.23%'}
                                ]
                            },
                            {
                                day: '20.10',
                                data: [
                                    {type: '거래량', value: '1,234,567'},
                                    {type: '변동률', value: '1.23%'}
                                ]
                            },
                            {
                                day: '20.11',
                                data: [
                                    {type: '거래량', value: '1,234,567'},
                                    {type: '변동률', value: '1.23%'}
                                ]
                            },
                            {
                                day: '20.12',
                                data: [
                                    {type: '거래량', value: '1,234,567'},
                                    {type: '변동률', value: '1.23%'}
                                ]
                            },
                            {
                                day: '21.01',
                                data: [
                                    {type: '거래량', value: '1,234,567'},
                                    {type: '변동률', value: '1.23%'}
                                ]
                            },
                            {
                                day: '21.02',
                                data: [
                                    {type: '거래량', value: '1,234,567'},
                                    {type: '변동률', value: '1.23%'}
                                ]
                            },
                            {
                                day: '21.03',
                                data: [
                                    {type: '거래량', value: '1,234,567'},
                                    {type: '변동률', value: '1.23%'}
                                ]
                            },
                            {
                                day: '21.04',
                                data: [
                                    {type: '거래량', value: '1,234,567'},
                                    {type: '변동률', value: '1.23%'}
                                ]
                            },
                            {
                                day: '21.05',
                                data: [
                                    {type: '거래량', value: '1,234,567'},
                                    {type: '변동률', value: '1.23%'}
                                ]
                            },
                            {
                                day: '21.06',
                                data: [
                                    {type: '거래량', value: '1,234,567'},
                                    {type: '변동률', value: '1.23%'}
                                ]
                            },
                            {
                                day: '21.07',
                                data: [
                                    {type: '거래량', value: '1,234,567'},
                                    {type: '변동률', value: '1.23%'}
                                ]
                            }
                        ]
                    
                    
                },
                {
                    type: '다가구주택',
                    daylists:
                        [
                            {
                                day: '20.07',
                                data: [
                                    {type: '거래량', value: '1,234,567'},
                                    {type: '변동률', value: '1.23%'}
                                ]
                            },
                            {
                                day: '20.08',
                                data: [
                                    {type: '거래량', value: '1,234,567'},
                                    {type: '변동률', value: '1.23%'}
                                ]
                            },
                            {
                                day: '20.09',
                                data: [
                                    {type: '거래량', value: '1,234,567'},
                                    {type: '변동률', value: '1.23%'}
                                ]
                            },
                            {
                                day: '20.10',
                                data: [
                                    {type: '거래량', value: '1,234,567'},
                                    {type: '변동률', value: '1.23%'}
                                ]
                            },
                            {
                                day: '20.11',
                                data: [
                                    {type: '거래량', value: '1,234,567'},
                                    {type: '변동률', value: '1.23%'}
                                ]
                            },
                            {
                                day: '20.12',
                                data: [
                                    {type: '거래량', value: '1,234,567'},
                                    {type: '변동률', value: '1.23%'}
                                ]
                            },
                            {
                                day: '21.01',
                                data: [
                                    {type: '거래량', value: '1,234,567'},
                                    {type: '변동률', value: '1.23%'}
                                ]
                            },
                            {
                                day: '21.02',
                                data: [
                                    {type: '거래량', value: '1,234,567'},
                                    {type: '변동률', value: '1.23%'}
                                ]
                            },
                            {
                                day: '21.03',
                                data: [
                                    {type: '거래량', value: '1,234,567'},
                                    {type: '변동률', value: '1.23%'}
                                ]
                            },
                            {
                                day: '21.04',
                                data: [
                                    {type: '거래량', value: '1,234,567'},
                                    {type: '변동률', value: '1.23%'}
                                ]
                            },
                            {
                                day: '21.05',
                                data: [
                                    {type: '거래량', value: '1,234,567'},
                                    {type: '변동률', value: '1.23%'}
                                ]
                            },
                            {
                                day: '21.06',
                                data: [
                                    {type: '거래량', value: '1,234,567'},
                                    {type: '변동률', value: '1.23%'}
                                ]
                            },
                            {
                                day: '21.07',
                                data: [
                                    {type: '거래량', value: '1,234,567'},
                                    {type: '변동률', value: '1.23%'}
                                ]
                            }
                        ]
                    
                    
                }
            ],
            // 지역검색
            srhtext: '',
            srhtext1: '',
            srhtext2: '',
            // 거래량Top5
            topView: false,
            // 차트더보기
            chartMore: true,
            //리사이징 데이터
            winwidth: null,
            winheight: null,
            //지도 셀렉터
            selectYear: false,
            selectmonth: false,
            houselayer: false,
            year: '2020년',
            house: '지가변동률',
            month: '7월',
            houeType: [
                {text: '지가변동률', active: true},
                {text: '거래량(필지)', active: false},
                {text: '시장 심리지수', active: false}
            ],
            monthType: [
                {text: '1월', active: false},
                {text: '2월', active: false},
                {text: '3월', active: false},
                {text: '4월', active: false},
                {text: '5월', active: true},
                {text: '6월', active: false},
                {text: '7월', active: false},
                {text: '8월', active: false},
                {text: '9월', active: false},
                {text: '10월', active: false},
                {text: '11월', active: false},
                {text: '12월', active: false}
            ],
            daysType: [
                {text: '2021년', active: false},
                {text: '2022년', active: false}
            ],
            //공공팝업 레이어
            publicPopup,
            publicLayer: false,
            popData: null,
            publicTop: null,
            landType4: null
        };
    },
    watch: {
        scrollH: {
            deep: true,
            handler() {
                this.stickyTop();
                if (window.innerWidth > 1189) {
                    this.stickymap();
                }
            }
        }
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
        //지도 따라 다니기
        stickymap() {
            let ele = document.querySelector('.cardmapBox');
            let eleEnd = (this.$refs.fixedWrap.clientHeight - ele.clientHeight) + 575;
            if (this.scrollH > 0 &&  this.scrollH <=   eleEnd) {
                this.$refs.cardmap.classList.add('fixed');
                this.$refs.fixedWrap.classList.add('fixedWrap');
                this.$refs.cardmap.classList.remove('stopFixed');

            } else if (this.scrollH >   eleEnd) {
                this.$refs.cardmap.classList.remove('fixed');
                this.$refs.cardmap.classList.add('stopFixed');
            } else {
                this.$refs.fixedWrap.classList.remove('fixedWrap');
                this.$refs.cardmap.classList.remove('fixed');
            }
        },
        handleResize(event) {
            this.winwidth = window.innerWidth;
            this.winheight = window.innerHeight;
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
            if (type === '지가지수 변동률') {
                this.tabnum = parm;
            } else if (type === '토지 거래량') {
                this.tabnum1 = parm;
            } else if (type === '전체') {
                this.tabnum2 = parm;
            } else if (type === '거래주체별') {
                this.tabnum3 = parm;
            } else if (type === '거래규모별') {
                this.tabnum4 = parm;
            } else if (type === '용도지역별') {
                this.tabnum5 = parm;
            } else if (type === '건물용도별') {
                this.tabnum6 = parm;
            } else if (type === '지역간 비교') {
                this.tabnum7 = parm;
            }
        },
        //공통 == 서브탭클래스 처리 active
        subTabActive(e, classname, text) {
            let tabbox = document.querySelectorAll(classname + ' .textline');
            tabbox.forEach(elem => {
                elem.classList.remove('active');
            });
            e.target.classList.add('active');
            if (classname === '.type1') {
                text === '월별' ? this.monthAcitve1 = true : this.monthAcitve1 = false;
            } else if (classname === '.type2') {
                text === '월별' ? this.monthAcitve2 = true : this.monthAcitve2 = false;
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
            } else if (type === 'type4') {
                this.openPicker4 = !this.openPicker4;
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
            } else if (type === 'type4') {
                this.openPicker4 = !this.openPicker4;
            }
        },
        mapBtnBox(e, classname) {
            let btn = document.querySelectorAll(classname + '.mapchartbox .btn');
            btn.forEach(elem => {
                elem.classList.remove('active');
            });
            e.target.classList.add('active');
        },
        //토글
        SelectToggle(parms) {
            this[parms] = !this[parms];
            if (!this[parms]) {
                window.$eventBus.$emit('scrollStop', 'close');
            } else {
                window.$eventBus.$emit('scrollStop', 'open');
            }
        },
        // 지역검색 텍스트 삭제
        TxtDelete(parms) {
            this[parms] = '';
        },
        //년월 셀렉 오픈
        DayLayerOpen(parms) {
            this[parms] === true ? this[parms] = false : this[parms] = true;
        },
        //년월선택
        Dayselect(idx, arr, parms) {
            this[arr].forEach((item, index) => {
                if (index === idx && arr === 'daysType') {
                    item.active = true;
                    this.year = item.text;
                } else if (index === idx && arr === 'monthType') {
                    item.active = true;
                    this.month = item.text;
                }
                else {
                    item.active = false;
                }
                return item;
            });
            this.DayLayerOpen(parms);
        },
        //가구선택
        houseSelect(idx, arr, parms) {
            this[arr].forEach((item, index) => {
                if (index === idx) {
                    item.active = true;
                    this.house = item.text;
                } else {
                    item.active = false;
                }
                return item;
            });
            this.DayLayerOpen(parms);
            
        },
        //공공팝업 레이어
        openPublicPopup(type, e, data) {
            if (type === 'open') {
                this.publicLayer = true;
                this.popData = publicPopup[data];
                if (window.innerWidth > 1189) {
                    this.$nextTick(function() {
                        this.publicTop = Math.abs(document.querySelector('.pagelayout').getBoundingClientRect().top + 10) + (e.target.getBoundingClientRect().top - this.$refs.layercon.$el.clientHeight) ;
                    });
                    data === 'landType4' ? this.landType4 = true : this.landType4 = false;
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
        }
    }
};
</script>