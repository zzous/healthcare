<template>
    <section class="kbboard">
        <template v-if="!(this.$router.currentRoute.path==='/singleboard')">
            <div class="mainTitle">
                <h1 class="titdepth1">KB통계보드</h1>
                <div class="titRighttext">
                    <button type="button" class="btn-fullscreen" @click="goToPage('/singleboard')">전체화면</button>
                </div>
                <ShareCommon
                    :pageurl ="this.$router.currentRoute.path"
                />
            </div>
            <div class="Topselect topselarea">
                <div class="searchinfofilter type2">
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
                    <div>
                        <span class="seltxt">날짜</span>
                        <div class="pickerarea" :class="{select:datepickericon}">
                            <!-- 클릭위치변경 0215 -->
                            <div @click="ToggleLayer('datepickerLayer', 'datepickericon','open')" style="width:calc(100% + 32px); margin-right:-32px">
                                <div class="pickerselect-text" v-html="starttime"></div>
                                <button class="iconbtn btn-picker" :class="{active:datepickericon}"></button>
                            </div>
                            <!-- 달력 레이어 -->
                            <div class="pickerlayer daylayer" v-if="datepickerLayer">
                                <div class="pickerTit">
                                    <strong>날짜 선택</strong>
                                    <div class="rangevalue">{{starttime}} 기준</div>
                                </div>
                                <DatePicker
                                    inline
                                    type="date"
                                    v-model="starttime"
                                    format="YY.MM.DD"
                                    value-type="format"
                                    :lang="{monthFormat:'MM', monthBeforeYear:false}"
                                    class="customPicker"
                                />
                                <div class="pickerbtn">
                                    <button class="btn btn-text">초기화</button>
                                    <button class="btn btn-round cancel"  @click="ToggleLayer('datepickerLayer', 'datepickericon','close')">취소</button>
                                    <button class="btn btn-round confirm">확인</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <template v-for="(item, idx) in myboardtags" >
                        <span :key="item">
                            <!-- my차트에 저장한 상태에서 화면에 적용된 my차트태그는 클래스 selected 추가 -->
                            <button type="button" class="btn btn-mychart" v-html="item"></button>
                            <button type="button" class="iconbtn btn-myclose" title="MY보드 삭제" @click="delpopup(idx)"></button>
                        </span>
                    </template>
                    <button type="button" class="btn btn-mychart icoplus" @click="openModal('myboard')">MY보드</button>
                </div>
            </div>
        </template>
        <div class="singlebtnwrap" v-else>
            <span><img src="/images/common/logo_KBboard_full.svg" /></span>
            <span class="areaLabel">창원시 마산합포구</span> <!-- 전체화면에 지역명 디스플레이 추가 22.03.08 -->
            <button type="button" class="btn-fullscreen" @click="goToPage('/kbBoard')">전체화면 닫기</button>
            <ShareCommon
                :pageurl ="this.$router.currentRoute.path"
            /><!-- 전체화면에 공유버튼 추가 22.03.28 -->
        </div>
        <div class="cardwrap">
            <!-- Card1 -->
            <div class="cardCaptureBox cardcont1">
                <ChartOption
                    :optionList="optionList"
                    @print="cardOption('print')"
                    @capture="cardOption('capture')"
                />
                <div class="cardbox cardCapture">
                    <div class="titdroparea">
                        <h1 class="titdepth3">
                            <span role="button"
                                :class="['btntitdorp arw', {down:!titledatas.type1.open}, {up:titledatas.type1.open}]"
                                @click="SelectLayerOpen('type1')"
                            >
                                {{titledatas.type1.lists[num1].text}}
                            </span>
                        </h1>
                        <div class="titdroplistbox" role="listbox" v-if="titledatas.type1.open">
							<div
                                role="list"
                                :class="['litxt', {active:item.active}]"
                                v-for="(item, index) in titledatas.type1.lists"
                                :key="index"
                                v-html="item.text"
                                @click="Titleselect(index,'type1')"
                            >
                            </div>
						</div>
                    </div>
                    <div class="chartcol">
                        <div class="chartlegend">
                            <em class="legendtit">
                                (좌)
                                <i class="icodataA type2">A1</i><span>아파트 매매 공급3.3㎡당 평균가격</span>
                            </em>
                            <span class="legend line-ff8787">전국</span>
                        </div>
                        <div class="chartlegend">
                            <em class="legendtit">
                                (우)
                                <i class="icodataA type2">A2</i><span>아파트 매매 공급3.3㎡당 평균가격 변동률(%)</span>
                            </em>
                            <span class="legend dotted-ff8787">전국</span>
                        </div>
                    </div>
                    <div class="unittextbox between">
                        <span>(2019.01.14=100.0)</span>
                        <span>(%)</span>
                    </div>
                    <!-- 차트 영역 -->
                    <div class="chartbox">
                        <div class="chartTip tradingtip" style="top: 30px; left: 50px;">
                            <span class="tiptit">2020년 10월 10일</span>
                            <div class="tablebox">
                                <div class="line header">
                                    <div class="cell">지역</div>
                                    <div class="cell">A1</div>
                                    <div class="cell">A2</div>
                                </div>
                                <div class="line">
                                    <div class="cell">전국</div>
                                    <div class="cell">123.4</div>
                                    <div class="cell">-1.2%</div>
                                </div>
                            </div>
                        </div>
                        <div class="nodata"></div>
                        <span class="watermark horizongray"></span>
                    </div>
                    <div class="unittextbox between">
						<span>업데이트 기준일: 2021. 12. 20</span>
						<span role="button" class="btn-statistics">통계비교 바로가기</span>
					</div>
                </div>
            </div>
            <!-- Card2 -->
            <div class="cardCaptureBox cardcont2">
                <ChartOption
                    :optionList="optionList"
                    @print="cardOption('print')"
                    @capture="cardOption('capture')"
                />
                <div class="cardbox cardCapture">
                    <div class="titdroparea">
                        <h1 class="titdepth3">
                            <span role="button"
                                :class="['btntitdorp arw', {down:!titledatas.type2.open}, {up:titledatas.type2.open}]"
                                @click="SelectLayerOpen('type2')"
                            >
                                {{titledatas.type2.lists[num2].text}}
                            </span>
                        </h1>
                        <div class="titdroplistbox" role="listbox" v-if="titledatas.type2.open">
							<div
                                role="list"
                                :class="['litxt', {active:item.active}]"
                                v-for="(item, index) in titledatas.type2.lists"
                                :key="index"
                                v-html="item.text"
                                @click="Titleselect(index,'type2')"
                            >
                            </div>
						</div>
                    </div>
                    <jQueryScrollbar>
                        <div class="toplistarea">
                            <div class="topranklist">
                                <div class="rowlisthead">
                                    <div class="toprow">
                                        <div class="cell celltype3">단지명</div>
                                        <div class="cell">
                                            <button type="button" class="btn btn-rowsort">3.3㎡당 KB시세(만원)</button>
                                        </div>
                                        <div class="cell">
                                            <button type="button" class="btn btn-rowsort down">변동률(%)</button>
                                        </div>
                                    </div>
                                </div>
                                <div class="rowlistbody">
                                    <div class="toprow" v-for="(item, index) in topDatalists" :key="index">
                                        <div class="aptname cell celltype3">
                                            <span :class="['icon',{num1:index===0},{num2:index===1}, {num3:index===2}]" v-if="index < 3">{{index}}</span>
                                            <span class="numtext" v-else>{{index+1}}</span>
                                            <span class="nametext">
                                                <em class="ellipsis" v-html="item.aptname.name"></em>
                                                <em v-html="item.aptname.address"></em>
                                            </span>
                                        </div>
                                        <div class="cell" v-html="item.price"></div>
                                        <div class="cell" v-html="item.ratio"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </jQueryScrollbar>
                    <div class="unittextbox between">
						<span>업데이트 기준일: 2021. 12. 20</span>
						<span role="button" class="btn-statistics">월간 선도아파트 바로가기</span> <!-- 2022.02.23 퍼블수정 -->
					</div>
                </div>
            </div>
            
            <!-- Card3 -->
            <div class="cardCaptureBox cardcont3">
                <ChartOption
                    :optionList="optionList"
                    @print="cardOption('print')"
                    @capture="cardOption('capture')"
                />
                <div class="cardbox cardCapture">
                    <div class="titdroparea">
                        <h1 class="titdepth3">
                            <span role="button"
                                :class="['btntitdorp arw', {down:!titledatas.type3.open}, {up:titledatas.type3.open}]"
                                @click="SelectLayerOpen('type3')"
                            >
                                {{titledatas.type3.lists[num3].text}}
                            </span>
                        </h1>
                        <div class="titdroplistbox" role="listbox" v-if="titledatas.type3.open">
							<div
                                role="list"
                                :class="['litxt', {active:item.active}]"
                                v-for="(item, index) in titledatas.type3.lists"
                                :key="index"
                                v-html="item.text"
                                @click="Titleselect(index,'type3')"
                            >
                            </div>
						</div>
                    </div>
                    <template v-if="listtype === '거래량'">
                        <div class="chartlegendbox">
                            <div class="chartlegend  type2">
                                <span class="legend stick-74c0fc">아파트</span>
                                <span class="legend stick-96f2d7">연립주택</span>
                                <span class="legend stick-ffec99">다세대주택</span>
                                <span class="legend stick-fcc2d7">다가구주택</span>
                                <span class="legend stick-d1afff">단독주택</span>
                            </div>
                            <div class="unittextbox right marginBnone">
                                <span>단위: 건 수</span>
                            </div>
                        </div>
                        <div class="chartbox" >
                            <div class="chartCon">
                                <div class="chartTip tradingtip mobile" style="top: -140px;">
                                    <p class="tx1">2021년 3월 주택매매 거래량</p>
                                    <p class="tx2">123,456건</p>
                                    <div class="linebox botnoline">
                                        <span class="legendlist householdtype5">단독 : 123,456건</span>
                                        <span class="legendlist householdtype4">다가구주택 : 123,456건</span>
                                        <span class="legendlist householdtype7">다세대주택 : 123,456건</span>
                                        <span class="legendlist householdtype6">연립주택 : 123,456건</span>
                                        <span class="legendlist householdtype2">아파트 : 123,456건</span>
                                    </div>
                                </div>
                                <div class="chartTip tradingtip " style="top: 30px; left: 50px;">
                                    <p class="tx1">2021년 3월 주택매매 거래량</p>
                                    <p class="tx2">123,456건</p>
                                    <div class="linebox botnoline">
                                        <span class="legendlist householdtype5">단독 : 123,456건</span>
                                        <span class="legendlist householdtype4">다가구주택 : 123,456건</span>
                                        <span class="legendlist householdtype7">다세대주택 : 123,456건</span>
                                        <span class="legendlist householdtype6">연립주택 : 123,456건</span>
                                        <span class="legendlist householdtype2">아파트 : 123,456건</span>
                                    </div>
                                </div>
                                챠트 영역
                                <div class="nodata"></div>
                                <span class="watermark horizongray"></span>
                            </div>
                        </div>
                        <div class="unittextbox between">
                            <span>업데이트 기준일: 2021. 12. 20</span>
                            <span role="button" class="btn-statistics">공공통계 거래량 바로가기</span>
                        </div>
                    </template>
                    <template v-if="listtype === '미분양'">
                        
                        <div>
                            미분양
                        </div>
                    </template>
                    
                </div>
            </div>

            <!-- Card4 -->
            <div class="cardCaptureBox cardcont3">
                <ChartOption
                    :optionList="optionList"
                    @print="cardOption('print')"
                    @capture="cardOption('capture')"
                />
                <div class="cardbox cardCapture">
                    <div class="titdroparea">
                        <h1 class="titdepth3">
                            <span role="button"
                                :class="['btntitdorp arw', {down:!titledatas.type4.open}, {up:titledatas.type4.open}]"
                                @click="SelectLayerOpen('type4')"
                            >
                                {{titledatas.type4.lists[num4].text}}
                            </span>
                        </h1>
                        <div class="titdroplistbox" role="listbox" v-if="titledatas.type4.open">
							<div
                                role="list"
                                :class="['litxt', {active:item.active}]"
                                v-for="(item, index) in titledatas.type4.lists"
                                :key="index"
                                v-html="item.text"
                                @click="Titleselect(index,'type4')"
                            >
                            </div>
						</div>
                    </div>

                    <div class="chartlegendbox">
                        <div class="chartlegend  type2"><!-- 2022.02.23 퍼블수정 / 범례스타일 추가 -->
                            <span class="legend circle-color1">매도자 많음</span>
                            <span class="legend circle-color2">비슷함</span>
                            <span class="legend circle-color3">매수자 많음</span>
                            <span class="legend circle-color4">한산함</span>
                            <span class="legend circle-color5">하락</span>
                            <span class="legend circle-color6">약하락</span>
                            <span class="legend circle-color7">약상승</span>
                            <span class="legend circle-color8">상승</span>
                        </div>
                    </div>
                    <div class="chartbox" style="margin-top:10px">
                        <div class="chartCon">
                            챠트 영역
                            <div class="chartvalbox">
                                <div>매수우위지수</div>
                                <div class="txt1">103.1</div>
                                <div><span>전주대비</span><span class="ico numup">1.1</span></div>
                            </div>
                            <span class="watermark horizongray"></span>
                        </div>
                    </div>
                    <div class="unittextbox between">
                        <span>업데이트 기준일: 2021. 12. 20</span>
                        <span role="button" class="btn-statistics">부동산 심리지수 바로가기</span>
                    </div>
                    
                </div>
            </div>

            <!-- Card5 -->
            <div class="cardCaptureBox cardcont3 last">
                <ChartOption
                    :optionList="optionList"
                    @print="cardOption('print')"
                    @capture="cardOption('capture')"
                />
                <div class="cardbox cardCapture">
                    <div class="titdroparea">
                        <h1 class="titdepth3">
                            <span role="button"
                                :class="['btntitdorp arw', {down:!titledatas.type5.open}, {up:titledatas.type5.open}]"
                                @click="SelectLayerOpen('type5')"
                            >
                                {{titledatas.type5.lists[num5].text}}
                            </span>
                        </h1>
                        <div class="titdroplistbox" role="listbox" v-if="titledatas.type5.open">
							<div
                                role="list"
                                :class="['litxt', {active:item.active}]"
                                v-for="(item, index) in titledatas.type5.lists"
                                :key="index"
                                v-html="item.text"
                                @click="Titleselect(index,'type5')"
                            >
                            </div>
						</div>
                    </div>
                    <div class="unittextbox between">
                        <button type="button" class="btn btn-text type2">상승률 높은 순</button>
                        <span>단위: %</span>
                    </div>
                    <div class="chartbox">
                         챠트 영역
                        <div class="nodata"></div>
                        <span class="watermark horizongray"></span>
                    </div>
                    <div class="unittextbox between">
                        <span>업데이트 기준일: 2021. 12. 20</span>
                        <span role="button" class="btn-statistics">투자테이블 바로가기</span>
                    </div>
                    
                </div>
            </div>
            <!-- Card6 -->
            <div class="cardCaptureBox cardcont4">
                <ChartOption
                    :optionList="optionList"
                    @print="cardOption('print')"
                    @capture="cardOption('capture')"
                />
                <div class="cardbox cardCapture">
                    <div class="titdroparea">
                        <h1 class="titdepth3">
                            <span role="button"
                                :class="['btntitdorp arw', {down:!titledatas.type6.open}, {up:titledatas.type6.open}]"
                                @click="SelectLayerOpen('type6')"
                            >
                                {{titledatas.type6.lists[num6].text}}
                            </span>
                        </h1>
                        <div class="titdroplistbox" role="listbox" v-if="titledatas.type6.open">
							<div
                                role="list"
                                :class="['litxt', {active:item.active}]"
                                v-for="(item, index) in titledatas.type6.lists"
                                :key="index"
                                v-html="item.text"
                                @click="Titleselect(index,'type6')"
                            >
                            </div>
						</div>
                    </div>
                    <div class="chartlegend  type2">
                        <span class="legend stick-74c0fc">인구</span>
                        <span class="legend linedarkblue">변동률</span>
                    </div>
                    <div class="unittextbox between">
                        <span>단위:만명</span>
                        <span>변동률(%)</span>
                    </div>
                    <div class="chartbox">
                         챠트 영역
                        <div class="nodata"></div>
                        <span class="watermark horizongray"></span>
                    </div>
                    <div class="unittextbox between">
                        <span>업데이트 기준일: 2021. 12. 20</span>
                        <span role="button" class="btn-statistics">공공통계 인구 바로가기</span>
                    </div>
                    
                </div>
            </div>


            <div class="cardCaptureBox cardcont5" >
                <ChartOption
                    :optionList="optionList"
                    @print="cardOption('print')"
                    @capture="cardOption('capture')"
                />
                <div class="cardbox cardCapture">
                    <div class="titdroparea">
                        <h1 class="titdepth3">
                            <span role="button"
                                :class="['btntitdorp arw', {down:!titledatas.type7.open}, {up:titledatas.type7.open}]"
                                @click="SelectLayerOpen('type7')"
                            >
                                {{titledatas.type7.lists[num7].text}}
                            </span>
                        </h1>
                        <div class="titdroplistbox" role="listbox" v-if="titledatas.type7.open">
							<div
                                role="list"
                                :class="['litxt', {active:item.active}]"
                                v-for="(item, index) in titledatas.type7.lists"
                                :key="index"
                                v-html="item.text"
                                @click="Titleselect(index,'type7')"
                            >
                            </div>
						</div>
                    </div>
                    <div class="chartcol">
                        <div class="chartlegend">
                            <em class="legendtit">
                                (좌)
                                <i class="icodataA type2">A1</i><span >아파트 매매 공급3.3㎡당 평균가격</span>
                            </em>
                            <span class="legend line-ff8787">전국</span>
                        </div>
                        <div class="chartlegend">
                            <em class="legendtit">
                                (우)
                                <i class="icodataA type2">A2</i><span>아파트 매매 공급3.3㎡당 평균가격 변동률(%)</span>
                            </em>
                            <span class="legend dotted-ff8787">전국</span>
                        </div>
                    </div>
                    <div class="unittextbox between">
                        <span>(2019.01.14=100.0)</span>
                        <span>(%)</span>
                    </div>
                    <!-- 차트 영역 -->
                    <div class="chartbox">
                        <div class="chartTip tradingtip" style="top: 30px; left: 50px;">
                            <span class="tiptit">2020년 10월 10일</span>
                            <div class="tablebox">
                                <div class="line header">
                                    <div class="cell">지역</div>
                                    <div class="cell">A1</div>
                                    <div class="cell">A2</div>
                                </div>
                                <div class="line">
                                    <div class="cell">전국</div>
                                    <div class="cell">123.4</div>
                                    <div class="cell">-1.2%</div>
                                </div>
                            </div>
                        </div>
                        <div class="nodata"></div>
                        <span class="watermark horizongray"></span>
                    </div>
                    <div class="unittextbox between">
						<span>업데이트 기준일: 2021. 12. 20</span>
						<span role="button" class="btn-statistics">통계비교 바로가기</span>
					</div>
                </div>
            </div>
        </div>

        <!-- 달력 모바일 -->
        <modal name="datepickerLayer"
            class="small-320"
            :clickToClose="false"
            width="100%"
            height="auto"
        >
            <div class="layer-popup">
                <div class="layercon layeremo">
                    <button type="button" class="btn btn-popclose" title="닫기"  @click="ToggleLayer('datepickerLayer', 'datepickericon', 'close')">닫기</button>
                    <div class="inner type1">
                        <div class="tit type1">기간선택</div>
                        <div class="daytext">{{starttime}} ~ {{endtime}}</div>
                        <div class="DatePickerwrap single">
                            <div role="tablist" class="tabbox tabtype3">
                                <span role="button" class="tab" :class="{active:startPicker}" @click="toggleClick('startPicker')">시작일</span>
                                <span role="button" class="tab" :class="{active:!startPicker}" @click="toggleClick('startPicker')">종료일</span>
                            </div>
                            <div v-if="startPicker">
                                <DatePicker
                                    inline
                                    v-model="starttime"
                                    valueType="format"
                                    :lang="{monthFormat:'MM', monthBeforeYear:false}"
                                    class="customPicker"
                                />
                            </div>
                            <div  v-if="!startPicker">
                                <DatePicker
                                    inline
                                    v-model="endtime"
                                    valueType="format"
                                    :lang="{monthFormat:'MM', monthBeforeYear:false}"
                                    class="customPicker"
                                />
                            </div>
                        </div>
                        <div class="layerbtn line">
                            <button type="button" class="btn md round blueline"  @click="ToggleLayer('datepickerLayer', 'datepickericon', 'close')">취소</button>
                            <button type="button" class="btn md round blue">확인</button>
                        </div>
                    </div>
                </div>
            </div>
        </modal>
        <!-- 보드저장 팝업 -->
        <modal name="myboard"
            :clickToClose="false"
            width="100%"
            height="auto"
        >
            <div class="layer-popup">
                <div class="layercon layertag">
                    <button type="button" class="btn btn-popclose" title="닫기" @click="closeModal('myboard')">닫기</button>
                    <div class="inner">
                        <template v-if="viewchart">
                            <strong class="tit">새로운 태그를 적용하면 보고있던 보드는 사라져요!</strong>
                            <p class="stit">
                                보고있던 보드를 <span class="btn btn-mychart icoplus">MY보드</span>에 저장하고<br>
                                나중에 이어서 조회해보세요 (로그인 필요)
                            </p>
                        </template>
                        <template v-else>
                            <strong class="tit">현재 보고있던 보드를 MY보드로 저장하시겠어요?</strong>
                        </template>
                        <div class="formwrap">
                            <div class="form-outer form-control" :class="{error:myboardTag}">
                                <input type="text" placeholder="저장할 별칭을 입력해주세요" v-model="boardtext">
                                <button type="button" class="btn sm round blue">저장 후 적용</button>
                            </div>
                            <p class="guideinfo icoinfo3" :class="{error:myboardTag}">
                                최대 10글자까지 입력 가능합니다
                            </p>
                            <!-- 에러케이스 문구
                            이미 존재하는 별칭입니다
                            MY차트는 최대 5개까지만 저장됩니다 -->
                        </div>
                        <template v-if="viewchart">
                        <span class="or">또는</span>
                        <div class="layerbtn">
                            <button type="button" class="btn md round blue" @click="saveMyboard">선택한 보드 적용</button>
                        </div>
                        </template>
                        <template v-else>
                        <div class="layerbtn">
                            <button type="button" class="btn md round blue" @click="saveMyboard">저장</button>
                        </div>
                        </template>
                    </div>
                </div>
            </div>
        </modal>
        <!-- 차트삭제 팝업 -->
        <modal name="myboardDel"
            :clickToClose="false"
            width="100%"
            height="auto"
        >
            <div class="layer-popup">
            <div class="layercon layeremo">
                <div class="inner">
                    <img src="/images/common/popup_img_emo1.svg">
                    <strong class="tit">삭제하시겠어요?</strong>
                    <div class="layerbtn">
                        <button type="button" class="btn md round blueline" @click="closeModal('myboardDel')">취소</button>
                        <button type="button" class="btn md round blue" @click="delMyboard">삭제</button>
                    </div>
                </div>
            </div>
        </div>
        </modal>
    </section>
</template>
<script>
import Location from '@/components/elements/Location.vue';
import ChartOption from '@/components/elements/ChartOption.vue';
import ShareCommon from '@/components/elements/ShareCommon.vue';
export default {
    components: {
        Location,
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
                {text: '엑셀 저장', type: 'excel'},
                {text: '공유', type: 'share'}
            ],
            //picker  데이터
            monthAcitve: true,
            openPicker: false,
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
            tabnum: 0,
            //카드타이틀 데이터
            num1: 0,
            num2: 0,
            num3: 0,
            num4: 0,
            num5: 0,
            num6: 0,
            num7: 0,
            titledatas: {
                type1: {
                    open: false,
                    lists: [
                        {text: 'KB아파트 매매 가격지수', active: true},
                        {text: 'KB아파트 전세 가격지수', active: false},
                        {text: '아파트 매매 평균가격', active: false},
                        {text: '아파트 전세 평균가격', active: false},
                        {text: '아파트 매매 공급 3.3㎡ 당 평균가격', active: false},
                        {text: '아파트 전세 공급 3.3㎡ 당 평균가격', active: false},
                        {text: '아파트 전세가율', active: false}
                    ]
                },
                type2: {
                    open: false,
                    lists: [
                        {text: '주간 3.3㎡당 매매시세 상승 단지 TOP', active: true},
                        {text: '월간 3.3㎡당 매매시세 상승 단지 TOP', active: false},
                        {text: '주간 3.3㎡당 전세시세 상승 단지 TOP', active: false},
                        {text: '월간 3.3㎡당 전세시세 상승 단지 TOP', active: false}
                    ]
                },
                type3: {
                    open: false,
                    lists: [
                        {text: '거래량', active: true},
                        {text: '미분양', active: false},
                        {text: '인구', active: false},
                        {text: '전출입', active: false},
                        {text: '입주물량', active: false},
                        {text: '공급물량', active: false}
                    ]
                },
                type4: {
                    open: false,
                    lists: [
                        {text: '매수/매도 시장동향 설문조사', active: true},
                        {text: '매매거래활발 설문조사', active: false},
                        {text: '매매가격전망 설문조사', active: false},
                        {text: '전세수급 시장동향 설문조사', active: false},
                        {text: '전세거래활발 설문조사', active: false},
                        {text: '전세가격전망 설문조사', active: false}
                    ]
                },
                type5: {
                    open: false,
                    lists: [
                        {text: '주간 아파트 매매가격지수 상승률 지역 TOP', active: true},
                        {text: '월간 아파트 매매가격지수 상승률 지역 TOP', active: false},
                        {text: '주간 아파트 전세가격지수 상승률 지역 TOP', active: false},
                        {text: '월간 아파트 전세가격지수 상승률 지역 TOP', active: false}
                    ]
                },

                type6: {
                    open: false,
                    lists: [
                        {text: '거래량', active: true},
                        {text: '미분양', active: false},
                        {text: '인구', active: false},
                        {text: '전출입', active: false},
                        {text: '입주물량', active: false},
                        {text: '공급물량', active: false}
                    ]
                },
                type7: {
                    open: false,
                    lists: [
                        {text: 'KB아파트 매매 가격지수', active: true},
                        {text: 'KB아파트 전세 가격지수', active: false},
                        {text: '아파트 매매 평균가격', active: false},
                        {text: '아파트 전세 평균가격', active: false},
                        {text: '아파트 매매 공급 3.3㎡ 당 평균가격', active: false},
                        {text: '아파트 전세 공급 3.3㎡ 당 평균가격', active: false},
                        {text: '아파트 전세가율', active: false}
                    ]
                }
                
            },

            
            //단지 TOP 데이터
            topDatalists: [
                {
                    aptname: {name: '디에이치퍼스티어아이파크', address: '강남구 개포동'},
                    price: '56,789.4',
                    ratio: '1.23'
                },
                {
                    aptname: {name: '디에이치퍼스티어아이파크', address: '강남구 개포동'},
                    price: '56,789.4',
                    ratio: '1.23'
                },
                {
                    aptname: {name: '디에이치퍼스티어아이파크', address: '강남구 개포동'},
                    price: '56,789.4',
                    ratio: '1.23'
                },
                {
                    aptname: {name: '디에이치퍼스티어아이파크', address: '강남구 개포동'},
                    price: '56,789.4',
                    ratio: '1.23'
                },
                {
                    aptname: {name: '디에이치퍼스티어아이파크', address: '강남구 개포동'},
                    price: '56,789.4',
                    ratio: '1.23'
                },
                {
                    aptname: {name: '디에이치퍼스티어아이파크', address: '강남구 개포동'},
                    price: '56,789.4',
                    ratio: '1.23'
                },
                {
                    aptname: {name: '디에이치퍼스티어아이파크', address: '강남구 개포동'},
                    price: '56,789.4',
                    ratio: '1.23'
                }
            ],
            
            // 지역검색
            srhtext: '',
            //달력
            datepickerLayer: false,
            datepickericon: false,
            starttime: '21. 12. 20',
            endtime: '16. 06. 05',
            // 모바일 피커탭
            startPicker: true,
            endPicker: false,
            //필터 데이터
            myboardtags: [],
            boardtext: '',
            viewchart: false,
            listtype: '거래량'
        };
    },
    computed: {
        myboardTag() {
            return this.boardtext.length > 5 ? true : false;
        }
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
        subTabActive(e, classname) {
            let tabbox = document.querySelectorAll(classname + ' .textline');
            tabbox.forEach(elem => {
                elem.classList.remove('active');
            });
            e.target.classList.add('active');
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
        //지역선택, 캘린더 선택
        ToggleLayer(type, icontype, opentype) {
            this[icontype] = !this[icontype];
            if (window.innerWidth < 1190) {
                opentype === 'open' ?  this.openModal(type) : this.closeModal(type);
            } else {
                this[type] = !this[type];
            }
        },
        // 선택  토글
        typeSetting(e, classGroup) {
            let tabbox = document.querySelectorAll(classGroup);
            tabbox.forEach(elem => {
                elem.classList.remove('active');
            });
            e.target.classList.add('active');
        },
        //my보드 저장
        saveMyboard() {
            if (this.myboardtags.length < 5) {
                this.myboardtags.push(this.boardtext);
                this.closeModal('myboard');
            }
        },
        //my보드 삭제버튼
        delMyboard() {
            this.myboardtags.splice(this.myboardtagnum);
            console.log('차트삭제');
            this.closeModal('myboardDel');
        },
        //my보드 삭제팝업
        delpopup(index) {
            this.myboardtagnum = index;
            this.openModal('myboardDel');
        },
        //년월 셀렉 오픈
        SelectLayerOpen(parms) {
            this.titledatas[parms].open === true ? this.titledatas[parms].open = false : this.titledatas[parms].open = true;
        },
        //년월선택
        Titleselect(idx, arr) {
            this.titledatas[arr].lists.forEach((item, index) => {
                if (index === idx) {
                    item.active = true;
                    this.listtype = item.text;
                } else {
                    item.active = false;
                }
                return item;
            });
            if (arr === 'type1') {
                this.num1 = idx;
            } else if (arr === 'type2') {
                this.num2 = idx;
            } else if (arr === 'type3') {
                this.num3 = idx;
            } else if (arr === 'type4') {
                this.num4 = idx;
            } else if (arr === 'type5') {
                this.num5 = idx;
            } else if (arr === 'type6') {
                this.num6 = idx;
            } else if (arr === 'type7') {
                this.num7 = idx;
            }
            
            this.SelectLayerOpen(arr);
        }
    }
};
</script>