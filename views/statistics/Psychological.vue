<template>
    <section class="psychological">
        <div class="mainTitle">
			<h1 class="titdepth1">부동산 시장 심리지수</h1>
            <div role="tablist" class="tabbox tabtype1">
                <span role="button" class="tab active" @click="typeSetting($event, '.tabtype1:nth-of-type(1) .tab')">매매</span>
                <span role="button" class="tab"  @click="typeSetting($event, '.tabtype1:nth-of-type(1) .tab')">전세</span>
            </div>
            <div role="tablist" class="tabbox tabtype1">
                <span role="button" class="tab active" @click="typeSetting($event, '.tabtype1:nth-of-type(2) .tab')">월간</span>
                <span role="button" class="tab"   @click="typeSetting($event, '.tabtype1:nth-of-type(2) .tab')">주간</span>
            </div>
            <!-- 탭 인터랙션 -->
            <!--
            <div role="tablist" class="tabbox tabtype1 type1 act1">
                <span role="button" class="tab active" @click="typeSetting($event, '.tabtype1.type1 .tab', 'act1')">매매</span>
                <span role="button" class="tab"  @click="typeSetting($event, '.tabtype1.type1 .tab', 'act2')">전세</span>
            </div>
            <div role="tablist" class="tabbox tabtype1 type2 act1">
                <span role="button" class="tab active" @click="typeSetting($event, '.tabtype1.type2 .tab', 'act1')">월간</span>
                <span role="button" class="tab"   @click="typeSetting($event, '.tabtype1.type2 .tab', 'act2')">주간</span>
            </div>
            -->
             <div class="filterforms">
                <label for="tab1" class="custom-radio custom-control">
                    <input type="radio" name="tabs" id="tab1" >
                    <span> <!-- 2022.03.15 / 퍼블 수정 / PC, 모바일 구분-->
                        <em class="pctit">매수 우위 지수</em>
                        <em class="motit">매매우위지수</em>
                    </span>
                </label>
                <label for="tab2" class="custom-radio custom-control">
                    <input type="radio" name="tabs" id="tab2">
                    <span> <!-- 2022.03.15 / 퍼블 수정 / PC, 모바일 구분-->
                        <em class="pctit">매매 거래 활발 지수</em>
                        <em class="motit">거래활발지수</em>
                    </span>
                </label>
                <label for="tab3" class="custom-radio custom-control">
                    <input type="radio" name="tabs" id="tab3">
                    <span> <!-- 2022.03.15 / 퍼블 수정 / PC, 모바일 구분-->
                        <em class="pctit">매매 가격 전망 지수</em>
                        <em class="motit">가격전망지수</em>
                    </span>
                </label>
            </div>
            
            <Guidetext :icotype="'icoinfo1'" :guidetext="'부동산 심리지수는 표본 중개업소 대상 설문조사로 집계된 통계입니다.'"  /> <!-- 2022.03.08 퍼블수정/ 텍스트 수정-->
            <ShareCommon
                :pageurl ="this.$router.currentRoute.path"
            />
        </div>
        <!-- <TabContent
            :tabsublist="'tabbox tabtype4'"
            :tabtexts="tabtextsType1"
            v-on:tabactive="tabClick"
        > -->
            <!-- <template slot="panel">
               
            </template> -->
             <!-- 매수 우위 지수 -->
            <div class="tabcon" role="tabpanel" v-if="tabnum===0">
                <div class="cardwrap">
                    <div class="cardbox areaselect">
                        <div class="cardtit psychologicaltit">
                            <h1 class="titdepth2">지역 선택</h1>
                            <div class="mapChartbtnbox">
                                <button class="btn btn-map" @click="typeSetting($event, '.mapChartbtnbox > .btn')">지도로 보기</button>
                                <button class="btn btn-graph active" @click="typeSetting($event, '.mapChartbtnbox > .btn')">그래프로 보기</button>
                            </div>
                        </div>
                        <div class="listbtn chartlistbtn">
                            <!-- 그래프로 보기 할때만 노출 -->
                            <template v-if="false">
                                <button type="button" class="btn textline active" @click="typeSetting($event, '.chartlistbtn > .btn')">높은순</button>
                                <button type="button" class="btn textline" @click="typeSetting($event, '.chartlistbtn > .btn')">낮은순</button>
                                <button type="button" class="btn textline" @click="typeSetting($event, '.chartlistbtn > .btn')">지역순</button>
                            </template>
                            <!-- 지도로 보기 전국일때  노출 -->
                            <template>
                                <!-- 버튼활성화 클래스 active 추가 -->
                                <button type="button" class="btn btn-allmap arw right active">전국 평균 99.9</button>
                            </template>
                        </div>
                        <!-- 맵차트  영역-->
                        <div class="mapChart">
                            <div style="position:relative;min-height:544px; background:#fafafa;">
                                <span class="pinlocation" title="맵차트 마커">서울<em>127.9</em></span>
                                <span class="watermark horizongray"  title="워터마크"></span>
                                <!-- 툴팁 -->
                                <div role="tooltip" class="tooltip bluetype bottom" style="left:85px;margin-top:96px;"> <!--2022.02.17 툴팁 스타일 변경 -->
                                    <span aria-hidden="true" class="arrow" style="margin-left:-6px;left:50%;"></span>
                                    <span role="button"><span class="line">전국 평균</span> 99.9</span>
                                </div>
                            </div>
                            <div class="maplegend">
                                <div class="maplegend-text">
                                    <span>200</span>
                                    <span>180</span>
                                    <span>160</span>
                                    <span>140</span>
                                    <span>120</span>
                                    <span>100</span>
                                    <span>80</span>
                                    <span>60</span>
                                    <span>40</span>
                                    <span>20</span>
                                    <span>0</span>
                                </div>
                                <div class="maplegend-box">
                                    <span></span>
                                    <span class="bgcolortype-f76707"></span>
                                    <span class="bgcolortype-fd7e14"></span>
                                    <span class="bgcolortype-ff922b"></span>
                                    <span class="bgcolortype-ffa94d"></span>
                                    <span class="bgcolortype-ffc078"></span>
                                    <span class="bgcolortype-63e6be"></span>
                                    <span class="bgcolortype-38d9a9"></span>
                                    <span class="bgcolortype-20c997"></span>
                                    <span class="bgcolortype-12b886"></span>
                                    <span class="bgcolortype-0ca678"></span>
                                </div>
                            </div>
                        </div>
                        <div class="chartforms">
                            <!-- 월간선택시 -->
                            <template v-if="false">
                                <div class="selectbox type3">
                                    <span class="value txt arw" :class="{up:selectYear, down:!selectYear}" @click="DayLayerOpen('selectYear')" v-html="year"></span>
                                    <div role="listbox" class="selectlist" v-if="selectYear">
                                        <jQueryScrollbar :maxHeight="'141px'">
                                            <div
                                                role="list"
                                                :class="['item txt', {active:item.active}]"
                                                v-for="(item, index) in daysType1"
                                                :key="index"
                                                v-html="item.text"
                                                @click="Dayselect(index,'daysType1', 'selectYear')"
                                            >
                                            </div>
                                        </jQueryScrollbar>
                                    </div>
                                </div>
                                <div class="selectbox type3">
                                    <span class="value txt  arw" :class="{up:selectMonth, down:!selectMonth}" @click="DayLayerOpen('selectMonth')" v-html="month">10월</span>
                                    <div role="listbox" class="selectlist" v-if="selectMonth">
                                        <jQueryScrollbar :maxHeight="'141px'">
                                            <div
                                                role="list"
                                                :class="['item txt', {active:item.active}]"
                                                v-for="(item, index) in daysType2"
                                                :key="index"
                                                v-html="item.text"
                                                @click="Dayselect(index,'daysType2','selectMonth')"
                                            >
                                            </div>
                                        </jQueryScrollbar>
                                    </div>
                                </div>
                            </template>
                            <!-- 주간선택시 -->
                            <template >
                                <div class="pickerarea" :class="{select: pickerLayer}">
                                    <div class="pickerselect-text" v-html="starttime1"></div>
                                    <button class="iconbtn btn-picker" @click="OpenPicker"></button>
                                    <div class="pickerlayer" v-if="pickerLayer">
                                        <div class="pickertit">
                                            <strong>날짜 변경</strong>
                                            <div class="selected-weeks" v-html="starttime1"></div>
                                        </div>
                                        <DatePicker
                                            inline
                                            type="date"
                                            v-model="starttime1"
                                            format="YY.MM.DD"
                                            value-type="format"
                                            :lang="{monthFormat:'MM', monthBeforeYear:false}"
                                            class="customPicker"
                                        />
                                        <div class="pickerbtn">
                                            <button class="btn btn-text">초기화</button>
                                            <button class="btn btn-round cancel"  @click="OpenPicker">취소</button>
                                            <button class="btn btn-round confirm"  @click="OpenPicker">확인</button>
                                        </div>
                                    </div>
                                </div>
                            </template>
                        </div>
                        
                        <div class="helpboxbg">
                            <div class="helptxtbox">
                                <div class="tit">매수 우위 지수를 이해해봅시다!</div>
                                <div class="txt">
                                    본 통계는 표본 중개업소를 대상으로 표본 설문조사로 집계된 통계입니다.<br>
                                    조사항목은 매수자많음, 비슷함, 매도자많음  3개중 택1 입니다.<br>
                                    매수우위지수 = 100 + "매수자 많음" 비중 - "매도자 많음" 비중<br>
                                    매수우위지수가 100을 초과할수록 매수자가 많음을, 100 미만일 경우 매도자가 많음을 의미합니다.
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="cardCaptureBox moveScrollbox">
                        <ChartOption
                            :optionList="optionList"
                            @print="cardOption('print')"
                            @capture="cardOption('capture')"
                        />
                        <div class="cardbox cardCapture">
                            <div class="cardtit psychologicaltit">
                                <h1 class="titdepth2"><span class="colortype-4281ff">서울</span> 매수 우위 지수</h1>
                                <div class="filterforms">
                                    <label for="yearAll" class="custom-radio custom-control"><input type="radio" name="time" id="yearAll" ><span>전체</span></label>
                                    <label for="year10" class="custom-radio custom-control"><input type="radio" name="time" id="year10" ><span>10년</span></label>
                                    <label for="year5" class="custom-radio custom-control"><input type="radio" name="time" id="year5" ><span>5년 </span></label>
                                    <label for="year3" class="custom-radio custom-control"><input type="radio" name="time" id="year3" ><span>2년 </span></label>
                                </div>
                            </div>
                            <div class="legendinfobox">
                                <div class="txt">
                                    <strong>2020년 6월</strong> 기준 서울은 ‘매수자많음’ 응답이 ‘매도자많음’ 응답보다
                                    <span class="colortype-ff922b">27.9%</span> 많은,
                                    <strong>매도자에게 유리한 시장</strong>입니다.
                                </div>
                                <div class="bargrahparea">
                                    <div class="legendvalue lightgreen" style="width:20%">
                                        <div class="valuetext">
                                            <span>매도자 많음</span>
                                            <span>12.8%</span>
                                        </div>
                                    </div>
                                    <div class="legendvalue gray" style="width:46.5%">
                                        <div class="valuetext">
                                            <span>비슷함 </span>
                                            <span>46.5%</span>
                                        </div>
                                    </div>
                                    <div class="legendvalue deepyellow" style="width:40.7%">
                                        <div class="valuetext">
                                            <span>매수자 많음</span>
                                            <span>40.7%</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="grapharrow" style="right:10px"></div>
                            </div>
                            <div class="sichart">
                                <div class="chartlegend">
                                    <div><span class="legend lineblack2 colortype-69696f">매수우위지수</span></div>
                                    <div>
                                        <span class="legend sticklightgreen">매도자많음</span>
                                        <span class="legend stickgray">비슷함</span>
                                        <span class="legend stickdeepyellow">매수자많음</span>
                                        <span class="legend nolegend">응답비율(%)</span>
                                    </div>
                                </div>
                                <!-- 차트영역 -->
                                <div :style="'position:relative;background:#f2f2f2; height:'+ chartHeight1+'px;'">
                                    <div class="graphtip" style="top:20px;left:100px;">
                                        <div class="tit">2019년 12월</div>
                                        <div>거래활발지수 59.3</div>
                                    </div>
                                </div>
                            </div>
                            <!-- 데이터 테이블 -->
                            <div class="tradingtable psychological bgcoltype"><!-- 2022.03.15 퍼블수정 / bgcoltype 클래스 추가-->
                                <div class="tablelabel">
                                    <span>-</span>
                                    <span>매수자 많음 (%)</span>
                                    <span>비슷함 (%)</span>
                                    <span>매도자 많음 (%)</span>
                                    <span>매수우위지수</span>
                                </div>
                                <jQueryScrollbar>
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
                                <div class="textbox between"> <!--  2022.02.23 퍼블 수정 / 버튼추가 -->
                                <span><button type="button" class="btn-statistics">주택가격동향 바로가기</button></span>
                                <div class="tableguidetext">매수우위지수 = 100 + "매수자 많음" 비중 - "매도자 많음" 비중</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 매매 거래 활발 지수 -->
            <div class="tabcon" role="tabpanel" v-if="tabnum===1">
                <div class="cardwrap">
                    <div class="cardbox areaselect">
                        <div class="cardtit psychologicaltit">
                            <h1 class="titdepth2">지역 선택</h1>
                            <div class="mapChartbtnbox">
                                <button class="btn btn-map" @click="typeSetting($event, '.mapChartbtnbox > .btn' )">지도로 보기</button>
                                <button class="btn btn-graph active" @click="typeSetting($event, '.mapChartbtnbox > .btn' )">그래프로 보기</button>
                            </div>
                        </div>
                        <div class="listbtn chartlistbtn">
                            <button type="button" class="btn textline active" @click="typeSetting($event, '.chartlistbtn > .btn' )">높은순</button>
                            <button type="button" class="btn textline" @click="typeSetting($event, '.chartlistbtn > .btn' )">낮은순</button>
                            <button type="button" class="btn textline" @click="typeSetting($event, '.chartlistbtn > .btn' )">지역순</button>
                        </div>
                        <!-- 맵차트  영역-->
                        <div class="mapChart">
                            <div style="position:relative;min-height:544px; background:#fafafa;">
                                <span class="pinlocation" title="맵차트 마커"></span>
                                <span class="watermark horizongray"  title="워터마크"></span>
                                <!-- 툴팁 -->
                                <div role="tooltip" class="tooltip bottom" style="left:85px;margin-top:96px;">
                                    <span aria-hidden="true" class="arrow" style="margin-left:-6px;left:50%;"></span>
                                    <p>전국 평균 99.9</p>
                                </div>
                            </div>
                            <div class="maplegend">
                                <div class="maplegend-text">
                                    <span>200</span>
                                    <span>180</span>
                                    <span>160</span>
                                    <span>140</span>
                                    <span>120</span>
                                    <span>100</span>
                                    <span>80</span>
                                    <span>60</span>
                                    <span>40</span>
                                    <span>20</span>
                                    <span>0</span>
                                </div>
                                <div class="maplegend-box">
                                    <span></span>
                                    <span class="bgcolortype-ff5252"></span>
                                    <span class="bgcolortype-ff6b6b"></span>
                                    <span class="bgcolortype-ff8787"></span>
                                    <span class="bgcolortype-ffa8a8"></span>
                                    <span class="bgcolortype-ffc9c9"></span>
                                    <span class="bgcolortype-b2ebf2"></span>
                                    <span class="bgcolortype-66d9e8"></span>
                                    <span class="bgcolortype-00d0e1"></span>
                                    <span class="bgcolortype-22b8cf"></span>
                                    <span class="bgcolortype-15aabf"></span>
                                </div>
                            </div>
                        </div>
                        <div class="chartforms">
                            <!-- 월간선택시 -->
                            <template>
                                <div class="selectbox type3">
                                    <span class="value txt arw" :class="{up:selectYear, down:!selectYear}" @click="DayLayerOpen('selectYear')" v-html="year"></span>
                                    <div role="listbox" class="selectlist" v-if="selectYear">
                                        <jQueryScrollbar :maxHeight="'141px'">
                                            <div
                                                role="list"
                                                :class="['item txt', {active:item.active}]"
                                                v-for="(item, index) in daysType1"
                                                :key="index"
                                                v-html="item.text"
                                                @click="Dayselect(index,'daysType1', 'selectYear')"
                                            >
                                            </div>
                                        </jQueryScrollbar>
                                    </div>
                                </div>
                                <div class="selectbox type3">
                                    <span class="value txt  arw" :class="{up:selectMonth, down:!selectMonth}" @click="DayLayerOpen('selectMonth')" v-html="month">10월</span>
                                    <div role="listbox" class="selectlist" v-if="selectMonth">
                                        <jQueryScrollbar :maxHeight="'141px'">
                                            <div
                                                role="list"
                                                :class="['item txt', {active:item.active}]"
                                                v-for="(item, index) in daysType2"
                                                :key="index"
                                                v-html="item.text"
                                                @click="Dayselect(index,'daysType2','selectMonth')"
                                            >
                                            </div>
                                        </jQueryScrollbar>
                                    </div>
                                </div>
                            </template>
                            <!-- 주간선택시 -->
                            <template v-if="false">
                                <div class="pickerarea" :class="{select: pickerLayer}">
                                    <div class="pickerselect-text" v-html="starttime1"></div>
                                    <button class="iconbtn btn-picker" @click="OpenPicker"></button>
                                    <div class="pickerlayer" v-if="pickerLayer">
                                        <div class="pickertit">
                                            <strong>날짜 변경</strong>
                                            <div class="selected-weeks" v-html="starttime1"></div>
                                        </div>
                                        <DatePicker
                                            inline
                                            type="date"
                                            v-model="starttime1"
                                            format="YY.MM.DD"
                                            value-type="format"
                                            :lang="{monthFormat:'MM', monthBeforeYear:false}"
                                            class="customPicker"
                                        />
                                        <div class="pickerbtn">
                                            <button class="btn btn-text">초기화</button>
                                            <button class="btn btn-round cancel"  @click="OpenPicker">취소</button>
                                            <button class="btn btn-round confirm"  @click="OpenPicker">확인</button>
                                        </div>
                                    </div>
                                </div>
                            </template>
                        </div>
                        
                        <div class="helpboxbg">
                            <div class="helptxtbox">
                                <div class="tit">매매 거래 활발 지수를 이해해봅시다!</div>
                                <div class="txt">
                                    본 통계는 표본 중개업소를 대상으로 표본 설문조사로 집계된 통계입니다.<br />
                                    조사항목은 활발함, 보통, 한산함  3개중 택1 입니다.<br />
                                    매매거래활발지수 = 100 + "활발함" 비중 - "한산함" 비중<br />
                                    매매거래활발지수가 100을 초과할수록 활발함을, 100 미만일 경우 한산함을 의미합니다.
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="cardCaptureBox moveScrollbox">
                        <ChartOption
                            :optionList="optionList"
                            @print="cardOption('print')"
                            @capture="cardOption('capture')"
                        />
                        <div class="cardbox  cardCapture">
                            <div class="cardtit psychologicaltit">
                                <h1 class="titdepth2"><span class="colortype-4281ff">세종</span>  매매 거래 활발 지수</h1>
                                <div class="filterforms">
                                    <label for="yearAll" class="custom-radio custom-control"><input type="radio" name="time" id="yearAll" ><span>전체</span></label>
                                    <label for="year10" class="custom-radio custom-control"><input type="radio" name="time" id="year10" ><span>10년</span></label>
                                    <label for="year5" class="custom-radio custom-control"><input type="radio" name="time" id="year5" ><span>5년 </span></label>
                                    <label for="year3" class="custom-radio custom-control"><input type="radio" name="time" id="year3" ><span>2년 </span></label>
                                </div>
                            </div>
                            <div class="legendinfobox">
                                <div class="txt">
                                    <strong>2019년 12월</strong> 기준 세종은
                                    <span class="colortype-00d0e1">‘한산함' 응답이 59.3%,</span>
                                    <span class="colortype-f06595">’활발함’ 응답이 27.9%</span> 으로,
                                    <strong>매매 거래 활발 지수는 전월대비 2.1 상승</strong>하였습니다.
                                </div>
                                <div class="bargrahparea">
                                    <div class="legendvalue skyblue" style="width:60%">
                                        <div class="valuetext">
                                            <span>한산함</span>
                                            <span>59.3%</span>
                                        </div>
                                    </div>
                                    <div class="legendvalue gray" style="width:25%">
                                        <div class="valuetext">
                                            <span>보통 </span>
                                            <span>25%</span>
                                        </div>
                                    </div>
                                    <div class="legendvalue coral" style="width:15%">
                                        <div class="valuetext">
                                            <span>활발함</span>
                                            <span>15%</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="grapharrow" style="right:10px"></div>
                            </div>
                            <div class="sichart">
                                <div class="chartlegend">
                                    <div><span class="legend lineblack2 colortype-69696f">매매거래활발지수</span></div>
                                    <div>
                                        <span class="legend stickskyblue">한산함 응답(%)</span>
                                        <span class="legend stickgray">보통 응답(%)</span>
                                        <span class="legend stickcoral">활발함</span>
                                        <span class="legend nolegend">응답비율(%)</span>
                                    </div>
                                </div>
                                <!-- 차트영역 -->
                                <div :style="'position:relative;background:#f2f2f2; height:'+ chartHeight1+'px;'">
                                    <div class="graphtip" style="top:20px;left:100px;">
                                        <div class="tit">2019년 12월</div>
                                        <div>거래활발지수 59.3</div>
                                    </div>
                                </div>
                            </div>
                            <!-- 데이터 테이블 -->
                            <div class="tradingtable psychological bgcoltype"><!-- 2022.03.15 퍼블수정 / bgcoltype 클래스 추가-->
                                <div class="tablelabel">
                                    <span>-</span>
                                    <span>매수자 많음 (%)</span>
                                    <span>비슷함 (%)</span>
                                    <span>매도자 많음 (%)</span>
                                    <span>매수우위지수</span>
                                </div>
                                <jQueryScrollbar>
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
                                <div class="textbox between"> <!--  2022.02.23 퍼블 수정 / 버튼추가 -->
                                <span><button type="button" class="btn-statistics">주택가격동향 바로가기</button></span>
                                <div class="tableguidetext">매매가격전망지수 = 100 aa+('크게상승'비중 x 1 + '약간상승'비중 x 0.5) - ('크게하락'비중 x 1 + '약간하락'비중 x 0.5)M</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 매매 가격 전망 지수 -->
            <div class="tabcon" role="tabpanel" v-if="tabnum===2">
                <div class="cardwrap">
                    <div class="cardbox areaselect">
                        <div class="cardtit psychologicaltit">
                            <h1 class="titdepth2">지역 선택</h1>
                            <div class="mapChartbtnbox">
                                <button class="btn btn-map" @click="typeSetting($event, '.mapChartbtnbox > .btn' )">지도로 보기</button>
                                <button class="btn btn-graph active" @click="typeSetting($event, '.mapChartbtnbox > .btn' )">그래프로 보기</button>
                            </div>
                        </div>
                        <div class="listbtn chartlistbtn">
                            <button type="button" class="btn textline active" @click="typeSetting($event, '.chartlistbtn > .btn' )">높은순</button>
                            <button type="button" class="btn textline" @click="typeSetting($event, '.chartlistbtn > .btn' )">낮은순</button>
                            <button type="button" class="btn textline" @click="typeSetting($event, '.chartlistbtn > .btn' )">지역순</button>
                        </div>
                        <!-- 맵차트  영역-->
                        <div class="mapChart">
                            <div style="position:relative;min-height:544px; background:#fafafa;">
                                <span class="pinlocation" title="맵차트 마커"></span>
                                <span class="watermark horizongray"  title="워터마크"></span>
                                <!-- 툴팁 -->
                                <div role="tooltip" class="tooltip bottom" style="left:85px;margin-top:96px;">
                                    <span aria-hidden="true" class="arrow" style="margin-left:-6px;left:50%;"></span>
                                    <p>전국 평균 99.9</p>
                                </div>
                            </div>
                            <div class="maplegend">
                                <div class="maplegend-text">
                                    <span>200</span>
                                    <span>180</span>
                                    <span>160</span>
                                    <span>140</span>
                                    <span>120</span>
                                    <span>100</span>
                                    <span>80</span>
                                    <span>60</span>
                                    <span>40</span>
                                    <span>20</span>
                                    <span>0</span>
                                </div>
                                <div class="maplegend-box">
                                    <span></span>
                                    <span class="bgcolortype-e74980"></span>
                                    <span class="bgcolortype-f06595"></span>
                                    <span class="bgcolortype-f783ac"></span>
                                    <span class="bgcolortype-faa2c1"></span>
                                    <span class="bgcolortype-fcc2d7"></span>
                                    <span class="bgcolortype-a5d8ff"></span>
                                    <span class="bgcolortype-74c0fc"></span>
                                    <span class="bgcolortype-51b4ff"></span>
                                    <span class="bgcolortype-339af0"></span>
                                    <span class="bgcolortype-228be6"></span>
                                </div>
                            </div>
                        </div>
                        <div class="chartforms">
                                <!-- 월간선택시 -->
                                <template>
                                <div class="selectbox type3">
                                    <span class="value txt arw" :class="{up:selectYear, down:!selectYear}"  @click="DayLayerOpen('selectYear')" v-html="year"></span>
                                    <div role="listbox" class="selectlist" v-if="selectYear">
                                        <jQueryScrollbar :maxHeight="'141px'">
                                            <div
                                                role="list"
                                                :class="['item txt', {active:item.active}]"
                                                v-for="(item, index) in daysType1"
                                                :key="index"
                                                v-html="item.text"
                                                @click="Dayselect(index,'daysType1', 'selectYear')"
                                            >
                                            </div>
                                        </jQueryScrollbar>
                                    </div>
                                </div>
                                <div class="selectbox type3">
                                    <span class="value txt  arw" :class="{up:selectMonth, down:!selectMonth}" @click="DayLayerOpen('selectMonth')" v-html="month">10월</span>
                                    <div role="listbox" class="selectlist" v-if="selectMonth">
                                        <jQueryScrollbar :maxHeight="'141px'">
                                            <div
                                                role="list"
                                                :class="['item txt', {active:item.active}]"
                                                v-for="(item, index) in daysType2"
                                                :key="index"
                                                v-html="item.text"
                                                @click="Dayselect(index,'daysType2','selectMonth')"
                                            >
                                            </div>
                                        </jQueryScrollbar>
                                    </div>
                                </div>
                                </template>
                            <!-- 주간선택시 -->
                            <template v-if="false">
                                <div class="pickerarea" :class="{select: pickerLayer}">
                                    <div class="pickerselect-text" v-html="starttime1"></div>
                                    <button class="iconbtn btn-picker" @click="OpenPicker"></button>
                                    <div class="pickerlayer" v-if="pickerLayer">
                                        <div class="pickertit">
                                            <strong>날짜 변경</strong>
                                            <div class="selected-weeks" v-html="starttime1"></div>
                                        </div>
                                        <DatePicker
                                            inline
                                            type="date"
                                            v-model="starttime1"
                                            format="YY.MM.DD"
                                            value-type="format"
                                            :lang="{monthFormat:'MM', monthBeforeYear:false}"
                                            class="customPicker"
                                        />
                                        <div class="pickerbtn">
                                            <button class="btn btn-text">초기화</button>
                                            <button class="btn btn-round cancel"  @click="OpenPicker">취소</button>
                                            <button class="btn btn-round confirm"  @click="OpenPicker">확인</button>
                                        </div>
                                    </div>
                                </div>
                            </template>
                        </div>
                        <div class="helpboxbg">
                            <div class="helptxtbox">
                                <div class="tit">매매 가격 전망 지수를 이해해봅시다!</div>
                                <div class="txt">
                                    본 통계는 표본 중개업소를 대상으로 표본 설문조사로 집계된 통계입니다.
                                    조사항목은 크게상승, 약간상승, 보통, 약간하락, 크게하락 5개중 택1 입니다.
                                    매매가격전망지수 = 100 +('크게상승'비중 x 1 + '약간상승'비중 x 0.5) - ('크게하락'비중 x 1 + '약간하락'비중 x 0.5)
                                    매매가격전망지수가 100을 초과할수록 상승전망을, 100 미만일 경우 하락전망을 의미합니다.
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="cardCaptureBox moveScrollbox">
                        <ChartOption
                            :optionList="optionList"
                            @print="cardOption('print')"
                            @capture="cardOption('capture')"
                        />
                        <div class="cardbox  cardCapture">
                            <div class="cardtit psychologicaltit">
                                <h1 class="titdepth2"><span class="colortype-4281ff">세종</span>  매매 거래 활발 지수</h1>
                                <div class="filterforms">
                                    <label for="yearAll" class="custom-radio custom-control"><input type="radio" name="time" id="yearAll" ><span>전체</span></label>
                                    <label for="year10" class="custom-radio custom-control"><input type="radio" name="time" id="year10" ><span>10년</span></label>
                                    <label for="year5" class="custom-radio custom-control"><input type="radio" name="time" id="year5" ><span>5년 </span></label>
                                    <label for="year3" class="custom-radio custom-control"><input type="radio" name="time" id="year3" ><span>2년 </span></label>
                                </div>
                            </div>
                            <div class="legendinfobox">
                                <div class="txt">
                                    <strong>2019년 12월</strong> 기준 서울은
                                    <span class="colortype-00d0e1">가격 하락전망' 응답이 59.3%,</span>
                                    <span class="colortype-f06595">가격 상승전망 응답이 27.9%</span> 으로,
                                    <strong>매매 가격 상승전망</strong>이 우세합니다.
                                <div>
                                    <button class="btninfo iconinfo" @click="OpenTip"></button>
                                        <!-- 툴팁 -->
                                        <div role="tooltip" class="tooltip top" style="top:-64px;right:-18px;" v-if="toolTip">
                                            <span aria-hidden="true" class="arrow" style="left:90%;"></span>
                                            <div class="flexbox">
                                                <p>
                                                    ‘상승’은 ‘크게상승’응답과 ‘약간상승’ 응답의 합이며<br>
                                                    ‘하락’은 ‘크게하락’응답과 ‘약간하락’ 응답의 합입니다.
                                                </p>
                                                <button type="button" title="툴팁닫기" class="tipclose" @click="OpenTip"></button>
                                            </div>
                                        </div>
                                        <!-- // 툴팁-->
                                    </div>
                                </div>
                                <div class="bargrahparea">
                                    <div class="legendvalue blue" style="width:1%">
                                        <div class="valuetext">
                                            <span>하락</span>
                                            <span>59.3%</span>
                                        </div>
                                    </div>
                                    <div class="legendvalue skyblue" style="width:60%">
                                    </div>
                                    <div class="legendvalue gray" style="width:25%">
                                        <div class="valuetext">
                                            <span>보통 </span>
                                            <span>25%</span>
                                        </div>
                                    </div>
                                    <div class="legendvalue coral" style="width:13.5%">
                                    </div>
                                    <div class="legendvalue pink" style="width:1.5%">
                                        <div class="valuetext">
                                            <span>상승</span>
                                            <span>13.5%</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="grapharrow" style="right:10px"></div>
                            </div>
                            <div class="sichart">
                                <div class="chartlegend">
                                    <div>
                                        <span class="legend lineblack2 colortype-69696f">매매가격전망지수</span>
                                    </div>
                                    <div>
                                        <span class="legend stickblue">크게하락</span>
                                        <span class="legend sticksky">약간하락</span>
                                        <span class="legend stickgray">보통</span>
                                        <span class="legend sticklightpink">약간상승</span>
                                        <span class="legend stickpink">크게상승</span>
                                        <span class="legend nolegend">응답비율(%)</span>
                                    </div>
                                </div>
                                <!-- 차트영역 -->
                                <div :style="'position:relative;background:#f2f2f2; height:'+ chartHeight1+'px;'">
                                    <div class="graphtip" style="top:20px;left:100px;">
                                        <div class="tit">2019년 12월</div>
                                        <div>거래활발지수 59.3</div>
                                    </div>
                                </div>
                            </div>
                            <!-- 데이터 테이블 -->
                            <div class="tradingtable psychological bgcoltype"><!-- 2022.03.15 퍼블수정 / bgcoltype 클래스 추가-->
                                <div class="tablelabel">
                                    <span>-</span>
                                    <span>매수자 많음 (%)</span>
                                    <span>비슷함 (%)</span>
                                    <span>매도자 많음 (%)</span>
                                    <span>매수우위지수</span>
                                </div>
                                <jQueryScrollbar>
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
                                <div class="textbox between"> <!--  2022.02.23 퍼블 수정 / 버튼추가 -->
                                <span><button type="button" class="btn-statistics">주택가격동향 바로가기</button></span>
                                <div class="tableguidetext">매매가격전망지수 = 100 +('크게상승'비중 x 1 + '약간상승'비중 x 0.5) - ('크게하락'비중 x 1 + '약간하락'비중 x 0.5)</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="mobileFloating">
                <button class="btn btn-round confirm arw down" @click="moveScroll"><strong>서울 </strong>자세히 보기 </button>
            </div>
        <!-- </TabContent> -->
        <div class="cardbox" ref="chartCard">
            <div class="cardtit psychologicaltit">
                <h1 class="titdepth2">월간 매매 심리 3종 한 눈에 보기</h1>
                <div class="titDec">
                    가격상승전망 지역, 매수자가 많은 지역, 거래활발 지역을 4분면에서 한 눈에 확인해보세요.
                </div>
            </div>
            <div class="tppichartarea">
                <div class="bubbleguide">
                    <div class="bubbletext" @click="bubbleMore($event)">
                        <strong class="numTit">II</strong>
                        <div class="guidetit">
                            <span class="colortype-38d9a9">매도자 많음</span>
                            <span class="colortype-f783ac">가격 상승 전망</span>
                        </div>
                        <div class="text-group">
                            <p class="par">부동산을 팔려는 사람보다 살려는 사람이 많아 매도자의 가격협상력이 우위에 있는 지역이에요. 또한 가격상승을 예측하는 응답 역시 더 많은 지역입니다.</p>
                            <p class="par">2021.10월 기준 충북 등이 대표적인 지역입니다.</p>
                        </div>
                    </div>
                    <div class="bubbletext" @click="bubbleMore($event)">
                        <strong class="numTit">I</strong>
                        <div class="guidetit">
                            <span class="colortype-ffa94d">매수자 많음</span>
                            <span class="colortype-f783ac">가격 상승 전망</span>
                        </div>
                        <div class="text-group">
                            <p class="par">부동산을 팔려는 사람보다 살려는 사람이 많아 매도자의 가격협상력이 우위에 있는 지역이에요. 또한 가격상승을 예측하는 응답 역시 더 많은 지역입니다.</p>
                            <p class="par">2021.10월 기준 충북 등이 대표적인 지역입니다.</p>
                        </div>
                    </div>
                </div>
                <!-- 차트 영역 -->
                <div class="bubblechart"  :style="'background:#eee;' + 'height:'+chartHeight +'px;'">
                    <!-- 그래프 타이틀 -->
                    <span class="titcircle">거래<br>활발지수</span>
                    <span class="pincircle active" style="top:20%;left:20%;width:50px;height:50px;">서울</span>
                    <!-- 가로세로축 텍스트 -->
                    <div class="vervalue">
                        <span class="txt top">상승전망</span>
                        <span class="txt btm">하락전망</span>
                    </div>
                    <div class="horvalue ">
                        <span class="txt left">매도자 많음</span>
                        <span class="txt right">매수자많음</span>
                    </div>
                    <!-- 가로세로축 타이틀 -->
                    <span class="xtext">매매 가격 전망 지수</span>
                    <span class="ytext">매수우위 지수</span>
                    <!-- 가로세로축 평균텍스트-->
                    <span class="xintext"><span class="txt">매수우위지수 전국 평균</span></span>
                    <span class="yintext"><span class="txt">가격전망지수 전국 평균</span></span>
                    <!-- 지역비율값 -->
                    <span class="pincircle" style="top:50%;left:50%;width:110px;height:110px;">충북<br>12.8</span>
                    <div class="maptools">
                        <button type="button" class="btn btn-Refresh">새로고침</button>
                        <div class="groups">
                            <button type="button" class="btn btn-zoom-up">확대</button>
                            <button type="button" class="btn btn-zoom-down">축소</button>
                        </div>
                    </div>
                </div>
                <div class="bubbleguide">
                    <div class="bubbletext" @click="bubbleMore($event)">
                        <strong class="numTit">III</strong>
                        <div class="guidetit">
                            <span class="colortype-38d9a9">매도자 많음</span>
                            <span class="colortype-51b4ff">가격 하락전망</span>
                        </div>
                        <div class="text-group">
                            <p class="par">부동산을 살려는 사람보다 팔려는 사람이 많아 매수자의 가격협상력이 우위에 있는 지역이에요. 또한 가격하락을 예측하는 응답이 더 많은 지역입니다.</p>
                            <p class="par">2021.10월 기준 대구 등이 대표적인 지역입니다.</p>
                        </div>
                    </div>
                    <div class="bubbletext" @click="bubbleMore($event)">
                        <strong class="numTit">IV</strong>
                        <div class="guidetit">
                            <span class="colortype-ffa94d">매수자 많음</span>
                            <span class="colortype-51b4ff">가격 하락전망</span>
                        </div>
                        <div class="text-group">
                            <p class="par">부동산을 팔려는 사람보다 살려는 사람이 많아 매도자의 가격협상력이 우위에 있는 지역이에요. 그러나 가격하락을 예측하는 응답이 더 많아 신중한 판단이 필요한 지역입니다.</p>
                            <p class="par">2021. 10월 기준 해당하는 지역은 없습니다.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="rangecontent trading-range type1">
                <div class="selectbox type3">
                    <span class="value txt arw" :class="{up:selectYear1, down:!selectYear1}" @click="DayLayerOpen('selectYear1')" v-html="year1"></span><!-- 2022.04.20 퍼블수정 / 클래스 up, down-->
                    <div role="listbox" class="selectlist" v-if="selectYear1">
                        <jQueryScrollbar :maxHeight="'141px'">
                            <div
                                role="list"
                                :class="['item txt', {active:item.active}]"
                                v-for="(item, index) in daysType1"
                                :key="index"
                                v-html="item.text"
                                @click="Dayselect(index,'daysType1', 'selectYear1')"
                            >
                            </div>
                        </jQueryScrollbar>
                    </div>
                </div>
                <RangeSlider
                    v-model="datevalue"
                    :marks="true"
                    :data="rangelists"
                />
            </div>
        </div>
    </section>
</template>
<script>
import ChartOption from '@/components/elements/ChartOption.vue';
import ShareCommon from '@/components/elements/ShareCommon.vue';
export default {
    components: {
        ChartOption,
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
                {text: '엑셀 저장', type: 'excel'}
            ],
            // 탭 사용 DATA
            tabtextsType1: ['매매 우위 지수', '거래 활발 지수', '가격 전망 지수'],
            tabnum: 0,
            tabnum1: 0,
            tabnum2: 0,
            //우위지수 테이블 데이터 샘플
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
            //우위지수 테이블 데이터 샘플
            tradingdatas: [
                {
                    location: '매수자 많음 (%)',
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
                    location: '비슷함 (%)',
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
                    location: '매도자 많음 (%)',
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
                    location: '매수우위지수',
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
            //range 데이터
            datevalue: ['10월'],
            rangelists: ['8월', '9월', '10월', '11월', '12월', '1월', '2월', '3월', '4월', '5월', '6월', '7월'],
            //datepicker 
            starttime1: '2021.10. 05',
            pickerLayer: false,
            //월선택 셀렉트
            daysType1: [
                {text: '2015년', active: false},
                {text: '2016년', active: false},
                {text: '2017년', active: false},
                {text: '2018년', active: true},
                {text: '2019년', active: false},
                {text: '2020년', active: false},
                {text: '2021년', active: false},
                {text: '2022년', active: false}
            ],
            daysType2: [
                {text: '1월', active: false},
                {text: '2월', active: false},
                {text: '3월', active: false},
                {text: '4월', active: true},
                {text: '5월', active: false},
                {text: '6월', active: false},
                {text: '7월', active: false},
                {text: '8월', active: false}
            ],
            selectYear: false,
            selectYear1: false,
            selectMonth: false,
            year: '2016년',
            year1: '2016년',
            month: '3월',
            toolTip: false,
            winwidth: 0,
            chartHeight: null,
            chartHeight1: null
        };
    },
    //스크롤 이동에 따른 자세히 보기 버튼 Show/hide
    watch: {
        scrollH: {
            deep: true,
            handler() {
                this.cardH = document.querySelector('.moveScrollbox').offsetTop / 2 ;
                this.scrollH  < this.cardH   ?
                    document.querySelector('.mobileFloating').classList.add('active') :
                    document.querySelector('.mobileFloating').classList.remove('active');
            }
        }
    },
    created() {
        this.winwidth = window.innerWidth;
        this.$nextTick(function() {
            this.handleResize();
        });
    },
    mounted() {
        window.addEventListener('resize', this.handleResize);
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
         //탭 콘텐츠 컴포넌트
        tabClick(parm, type) {
            this.tabnum = parm;
        },
        // 선택 레이어 매매 전세 토글
        typeSetting(e, classGroup) {
            let tabbox = document.querySelectorAll(classGroup);
            tabbox.forEach(elem => {
                elem.classList.remove('active');
            });
            e.target.classList.add('active');
        },
        // 선택 레이어 매매 전세 토글 탭 모션 추가
        /*
        typeSetting(e, classGroup, classname) { // 모션 변수 classname 추가
            let tabbox = document.querySelectorAll(classGroup);
            const event = e.target;
            tabbox.forEach(elem => {
                elem.classList.remove('active');
            });
            event.classList.add('active');
            
            // 탭 모션 추가
            if (classname) {
                event.parentNode.classList.remove('act1', 'act2');
                event.parentNode.classList.add(classname);
            }
        },
        */
        //데이터 피커 오픈
        OpenPicker() {
            this.pickerLayer === true ? this.pickerLayer = false : this.pickerLayer = true;
        },
        //매매 거래 활발 지수 툴팁
        OpenTip() {
            this.toolTip === true ? this.toolTip = false : this.toolTip = true;
        },
        //년월 셀렉 오픈
        DayLayerOpen(parms) {
            this[parms] === true ? this[parms] = false : this[parms] = true;
        },
        //년월선택
        Dayselect(idx, arr, parms) {
            this[arr].forEach((item, index) => {
                if (index === idx && arr === 'daysType1') {
                    item.active = true;
                    this.year = item.text;
                    this.year1 = item.text;
                } else if (index === idx && arr === 'daysType2') {
                    item.active = true;
                    this.month = item.text;
                } else {
                    item.active = false;
                }
                return item;
            });
            this.DayLayerOpen(parms);
        },
        //심리 3종 텍스트 박스
        bubbleMore(e) {
            if (e.target.classList.contains('active') === true) {
                e.target.classList.remove('active');
            } else {
                e.target.classList.add('active');
            }
        },
        //bubblechart 리사이징
        handleResize(event) {
            this.winwidth = window.innerWidth;
            const mapcardH = document.querySelector('.cardwrap > .cardbox:nth-of-type(1)');
            
            if (document.querySelector('.mobileFloating') && this.$refs.chartCard && mapcardH) {
                // 레이싱차트 타이틀, 레인지 높이
                const titH = this.$refs.chartCard.childNodes[0].clientHeight;
                const rangeH = document.querySelector('.rangecontent.trading-range').clientHeight;
                // 우위 지수 타이틀, 테이블 범례 높이
                const cardtitH = document.querySelector('.cardwrap > .cardCaptureBox .cardtit').clientHeight;
                const cardtitBoxH = document.querySelector('.moveScrollbox .legendinfobox').clientHeight;
                const tableH = document.querySelector('.moveScrollbox .psychological.tradingtable').clientHeight;
                const textBox = document.querySelector('.moveScrollbox .textbox.between').clientHeight;
                const legendH = document.querySelector('.moveScrollbox .chartlegend').clientHeight;
                


                if (this.winwidth < 1190) {
                    this.chartHeight = document.querySelector('.bubblechart').offsetWidth;
                    document.querySelector('.mobileFloating').classList.add('active');
                } else {
                    // 카드마진  값 170
                    this.chartHeight = this.$refs.chartCard.clientHeight - titH -  rangeH - 170;
                    document.querySelector('.mobileFloating').classList.remove('active');
                    // 카드마진, 테이블 마진  값 140
                    this.chartHeight1 = mapcardH.clientHeight - cardtitBoxH - cardtitH - tableH  - textBox - legendH - 140;
                }
            }
        },
        moveScroll() {
            let cardH = document.querySelector('.moveScrollbox').offsetTop;
            window.$eventBus.$emit('scrollMove', cardH);
        }
    }
};
</script>