<template>
    <div class="mapContainer" >
        <!--
            각 타입에 따른 클래스명
            kbhousebk==KB 주택가격지수
            aptaverage==아파트 평균가격,
            houserent==전세가율
            ratecheck === 변동률 선택시 아이콘 변경 클래스
            hitmap===열지도

            {mobilestart:mobilestart}//하프뷰 삭제 {mobilestart:mobilestart}
            -->
        <div
            :class="[
                'allmap',
                {kbhouse:kbhouse},
                {aptaverage:aptaverage},
                {houserent:houserent},
                {hitmap:hitmap},
                {ratecheck:rateType},
                
            ]"
            :style="'height:'+ winheight+'px'"
        >
            <NaverMaps :polyCount="polyCount" :svgCount="svgCount" :zoomLevel="7" style="width:100%; height:100%;" />
            <!-- 상단필터 -->
            <div class="toparea">
                <!-- 가격필터 -->
                <div class="topmenubox" v-if="!hitmap">
                    <button type="button" class="btn active" @click="modeSetting($event,'kbhouse')">KB 주택가격지수</button>
                    <button type="button" class="btn" @click="modeSetting($event,'aptaverage')">아파트 평균가격</button>
                    <button type="button" class="btn" @click="modeSetting($event,'houserent')">전세가율</button>
                </div>
                <!--주거타입 필터-->
                <jQueryScrollbar>
                    <div class="fillterwrap">
                        <!-- 변동률선택 -->
                        <div class="switchwrap">
                            <div class="switch-button custom-control sm">
                                <input type="checkbox" id="changeRatio2" v-model="rateType">
                                <label for="changeRatio2" class="switch">
                                    <span class="txt">변동률</span>
                                </label>
                                변동률
                            </div>
                        </div>
                        <!-- 월주간선택 -->
                        <div class="filterbox"> <!-- 22.06.17 [버튼] 태그 추가 -->
                            <button :class="['btn','btn-filter',{active:monthsetting}]" @click="settingMonth($event,'월간')">월간</button>
                            <button :class="['btn','btn-filter',{active:!monthsetting}]" @click="settingMonth($event,'주간')">주간</button>
                        </div>
                        <!-- 주거형태 -->
                        <div class="filterbox"> <!-- 22.06.17 [버튼] 태그 추가 -->
                            <button class="btn btn-filter line selltype active" @click="typeSetting($event,'.btn.selltype')">매매</button>
                            <button class="btn btn-filter selltype" @click="typeSetting($event,'.btn.selltype')">전세</button>
                        </div>
                        <!-- kb주택가격지수 -->
                        <template v-if="kbhouse">
                            <div class="filterbox"> <!-- 22.06.17 [버튼] 태그 추가 -->
                                <button class="btn btn-filter line housetype active" @click="typeSetting($event,'.housetype.btn')">아파트</button>
                                <button class="btn btn-filter housetype" @click="typeSetting($event,'.housetype.btn')">단독</button>
                                <button class="btn btn-filter housetype" @click="typeSetting($event,'.housetype.btn')">연립</button>
                            </div>
                            <div class="filterbox"> <!-- 22.06.17 [버튼] 태그 추가 -->
                                <button class="btn btn-filter line active" @click="typeSetting($event,'.widthtype.btn')">전체</button> <!-- 2022.02.09 면적필터 텍스트 변경-->
                                <button class="btn btn-filter widthtype" @click="typeSetting($event,'.widthtype.btn')">대형</button>
                                <button class="btn btn-filter widthtype" @click="typeSetting($event,'.widthtype.btn')">중대형</button>
                                <button class="btn btn-filter widthtype" @click="typeSetting($event,'.widthtype.btn')">중형</button>
                                <button class="btn btn-filter widthtype" @click="typeSetting($event,'.widthtype.btn')">중소형</button>
                                <button class="btn btn-filter widthtype" @click="typeSetting($event,'.widthtype.btn')">소형</button>
                            </div>
                        </template>
                        <!-- 아파트 평균가격 -->
                        <template v-if="aptaverage">
                            <div class="filterbox"> <!-- 22.06.17 [버튼] 태그 추가 -->
                                <button :class="['btn','btn-filter','line','averagetype', {active:widthsetting}]" @click="settingWidth($event,'주택당')">주택당</button>
                                <button :class="['btn','btn-filter','averagetype', {active:!widthsetting}]" @click="settingWidth($event,'3.3㎡당')">3.3㎡당</button>
                            </div>
                            <div class="filterbox"> <!-- 22.06.17 [버튼] 태그 추가 -->
                                <button class="btn btn-filter line active" @click="typeSetting($event,'.widthtype.btn')">전체</button><!-- 2022.02.09 면적필터 텍스트 추가-->
                                <button class="btn btn-filter widthtype" @click="typeSetting($event,'.widthtype.btn')">대형</button>
                                <button class="btn btn-filter widthtype" @click="typeSetting($event,'.widthtype.btn')">중대형</button>
                                <button class="btn btn-filter widthtype" @click="typeSetting($event,'.widthtype.btn')">중형</button>
                                <button class="btn btn-filter widthtype" @click="typeSetting($event,'.widthtype.btn')">중소형</button>
                                <button class="btn btn-filter widthtype" @click="typeSetting($event,'.widthtype.btn')">소형</button>
                            </div>
                        </template>
                        <!-- 전세가율 -->
                        <template v-if="houserent">
                            <div class="filterbox"> <!-- 22.06.17 [버튼] 태그 추가 -->
                                <button class="btn btn-filter line housetype active" @click="typeSetting($event,'.housetype.btn')">아파트</button>
                                <button class="btn btn-filter housetype" @click="typeSetting($event,'.housetype.btn')">단독</button>
                                <button class="btn btn-filter housetype" @click="typeSetting($event,'.housetype.btn')">연립</button>
                            </div>
                        </template>
                        <!-- 2022.02.18 퍼블 변경 -->
                        <button type="button" class="btn-tooltip round" @click="tipToggle($event,'tipguide')" v-if="kbhouse || aptaverage">툴팁보기</button>
                    </div>
                    
                </jQueryScrollbar>
                
                <!-- 툴팁내용 -->
                <!-- 2022.03.24 툴팁 추가 -->
                <div role="tooltip" name="waitguide2" class="tooltip bottom">
                    <span aria-hidden="true" class="arrow" style="left:12px;"></span>
                    <p>전세가율은 월간데이터만 제공됩니다</p>
                </div>
                <!-- 2022.03.16 툴팁 추가 -->
                <div role="tooltip" name="waitguide" class="tooltip bottom">
                    <span aria-hidden="true" class="arrow" style="left:12px;"></span>
                    <p>단독, 연립 서비스는 준비중입니다.</p>
                </div>
                
                <div role="tooltip" name="widthguide" class="tooltip bottom" v-if="tipguide1" >
                    <span aria-hidden="true" class="arrow" style="right:10px;"></span>
                    <p>전용면적 기준이며  5개 면적구분은 다음과 같습니다.<br>
                        대형(135㎡ 초과), 중대형(102㎡초과 ~ 135㎡ 이하), 중형(85㎡ 초과 ~ 102㎡ 이하), 중소형(60㎡ 초과 ~ 85㎡ 이하), 소형(60㎡ 이하)</p>
                    <button type="button" title="툴팁닫기" class="tipclose" @click="tipToggle($event,'tipguide')"></button>
                </div>
                <div role="tooltip" class="tooltip bottom tooltbltype" v-if="tipguide" >
                    <span aria-hidden="true" class="arrow" style="right:10px;"></span>
                    <div>
                        <p>대지면적과 건물면적 기준이며  4개 면적구분은 다음과 같습니다.</p>
                        <div class="tblbox">
                            <table class="">
                                <colgroup>
                                    <col style="width:90px">
                                </colgroup>
                                <thead>
                                    <tr>
                                        <th class="backslash">
                                            <div>건물</div>
                                            대지
                                        </th>
                                        <th>331㎡이상</th>
                                        <th>161.98㎡ 이상 331㎡ 미만</th>
                                        <th>95.86㎡ 이상 161.98㎡ 미만</th>
                                        <th>95.86㎡ 미만</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th>662㎡이상</th>
                                        <td>대형</td>
                                        <td>대형</td>
                                        <td>대형</td>
                                        <td>대형</td>
                                    </tr>
                                    <tr>
                                        <th>662㎡ 미만
                                            327.3㎡ 이상</th>
                                        <td>대형</td>
                                        <td>중대형</td>
                                        <td>중대형</td>
                                        <td>중대형</td>
                                    </tr>
                                    <tr>
                                        <th>327.3㎡ 미만
                                            228,1㎡ 이상</th>
                                        <td>대형</td>
                                        <td>중대형</td>
                                        <td>중형</td>
                                        <td>중형</td>
                                    </tr>
                                    <tr>
                                        <th>228.1㎡ 미만</th>
                                        <td>대형</td>
                                        <td>중대형</td>
                                        <td>중형</td>
                                        <td>소형</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <button type="button" title="툴팁닫기" class="tipclose"  @click="tipToggle($event,'tipguide1')"></button>
                    
                </div>
                
            </div>
            <!-- 카드 영역 -->
            <div :class="['topcardwrap',{active:cardtoggle&& !hitmap}, {hitmap:hitmap}]" v-if="!mobilechangeRate">
                <template v-if="!hitmap">
                    <div class="titbox">
                        <span class="txtbox"> <!-- 22.06.17 [툴팁] span 태그 추가 -->
                            <!-- 타입별 텍스트 -->
                            <span class="tit" v-if="kbhouse"><span class="colortype-4281ff">전국</span> 아파트 매매 가격지수</span>
                            <span class="tit" v-if="aptaverage"><span class="colortype-4281ff">전국</span> 아파트 매매 평균가격</span>
                            <span class="tit" v-if="houserent"><span class="colortype-4281ff">마산합포구 </span>전세가율</span>

                            <!-- 22.06.17 [툴팁] 타입별 툴팁 변경된 문구 추가 (각 문구별 툴팁 위치 때문에 txtbox클래스 안으로 위치 변경) -->
                            <div role="tooltip" name="aptsaleguide" class="tooltip bottom" v-if="tipguide2" :class="{fold: !cardtoggle}">
                                <span aria-hidden="true" class="arrow"></span>
                                <div class="flexbox">
                                    <!-- KB 주택가격지수 문구 -->
                                    <ul class="dotlist" v-if="kbhouse">
                                        <li>주택의 매매/전세가격을 기준시점 대비한 상대적인 가격으로 지수화한 수치로 기준시점과 기준지수는 2022.1.10 =100.0 입니다.</li>
                                        <li>제공지역은 표본조사되는 지역으로 아파트는 시도, 시군구 단위이며 단독/연립/종합은 시도 단위입니다.</li>
                                        <li>미조사 및 미제공 지역은 '-'로 표기됩니다. 아파트는 '22년 4분기에 전국적으로 확대되어 읍면동까지 제공될 예정입니다.</li>
                                    </ul>
                                    <!-- 아파트 평균가격 문구 -->
                                    <ul class="dotlist" v-if="aptaverage">
                                        <li>아파트의 매매와 전세의 지역내 아파트세대수를 적용한 평균가격 통계로, 실거래가 통계가 아닌 KB시세가격 통계입니다.</li>
                                        <li>제공지역은 전국의 시도 단위이며 미조사 및 미제공 지역은 '-'로 표기됩니다.</li>
                                        <li>'22년 4분기에 전국적으로 확대되어 읍면동까지 제공될 예정입니다.</li>
                                    </ul>
                                    <!-- 전세가율 문구 -->
                                    <ul class="dotlist" v-if="houserent">
                                        <li>아파트의 매매가격 대비 전세가격의 비율(전세가격/매매가격)을 지역내 아파트세대수로 적용한 평균전세비율 통계입니다.</li>
                                        <li>제공지역은 전국의 시도 단위이며, 미조사 및 미제공 지역은 '-'로 표기됩니다.</li>
                                        <li>'22년 4분기에 전국적으로 확대되어 읍면동까지 제공될 예정입니다.</li>
                                    </ul>
                                    <button type="button" title="툴팁닫기" class="tipclose" @click="tipToggle($event,'tipguide2')"></button>
                                </div>
                            </div>
                        </span>

                        <button type="button" class="btn-tooltip type2" @click="tipToggle($event,'tipguide2')">툴팁보기</button>
                        <button type="button" :class="['iconbtn', 'btn-fold', {active:cardtoggle}]" @click="cardfold('cardtoggle')">내용접기</button>
                    </div>
                    
                    <!-- 이전 버전 툴팁 -->
                    <!-- <div role="tooltip" name="aptsaleguide" class="tooltip bottom" v-if="tipguide2" :class="{fold: !cardtoggle}">
                        <span aria-hidden="true" class="arrow" style="right:135px;"></span>
                        <div class="flexbox">
                            <p>
                               아파트의 매매와 전세의 시세평균가격입니다. 지역내 조사되는 아파트를 대상으로 하며 통계는 세대수를 적용하여 동읍면과 구시군 및 시도 단위로 제공됩니다.
                                <template v-if="false">
                                    아파트의 매매시세 대비 전세시세의 비율(전세시세/매매시세)입니다.
                                    지역내 조사되는 아파트를 대상으로 하며 통계는 아파트별 전세가율에 세대수를 적용하여 동읍면과 구시군 및 시도 단위로 제공됩니다.
                                    전세가율변동은 기준월의 전세가율과 전월의 전세가율의 차이로 단위는 %p 입니다.
                                </template>
                            </p>
                            <button type="button" title="툴팁닫기" class="tipclose" @click="tipToggle($event,'tipguide2')"></button>
                        </div>
                    </div> -->

                    <div class="indiceslist" v-if="cardtoggle">
                        <div class="listheader">
                            <span role="button" class="btn-sorting nosorting">지역명</span>
                            <span role="button" class="btn-sorting nosorting">
                                <template v-if="kbhouse">가격지수</template>
                                <template v-else-if="aptaverage">평균가격</template>
                                <template v-else-if="houserent">전세가율</template>
                            </span>
                            <span role="button" class="btn-sorting rate">
                                <template v-if="kbhouse||aptaverage">변동률(%)</template>
                                <template  v-else-if="houserent">변동률(%)</template>
                            </span>
                        </div>
                        <jQueryScrollbar>
                            <div class="listbody" :style="'height:'+ (winheight - 294)+'px'">
                                <div class="rowlist" v-for="(item, index) in indicesLists" :key="index">
                                    <!-- 변동률기준 주간-->
                                    <span v-if="rateType && !monthsetting" :class="[
                                        'sticon',
                                        {iconwt7:item.rate >= 2.0 && rateType},
                                        {iconwt6:(item.rate >= 1.0 && item.rate < 2.0)},
                                        {iconwt5:item.rate > 0 && item.rate < 1.0},
                                        {iconwt4:item.rate === 0},
                                        {iconwt3:item.rate >= -1.0 && item.rate < 0},
                                        {iconwt2:item.rate >= -2.0 && item.rate < -1.0},
                                        {iconwt1:item.rate < -2.0},
                                    ]" ></span>
                                    <!-- 변동률기준 월간-->
                                    <span v-if="rateType && monthsetting" :class="[
                                        'sticon', 'week',
                                        {iconwt7:item.rate*2 >= 4.0 && rateType},
                                        {iconwt6:(item.rate*2 >= 2.0 && item.rate*2 < 4.0)},
                                        {iconwt5:item.rate*2 > 0 && item.rate*2 < 2.0},
                                        {iconwt4:item.rate === 0},
                                        {iconwt3:item.rate*2 >= -2.0 && item.rate*2 < 0},
                                        {iconwt2:item.rate*2 >= -4.0 && item.rate*2 < -2.0},
                                        {iconwt1:item.rate*2 < -4.0},
                                    ]" ></span>
                                    <!-- 절대값기준 -->
                                    <span v-else-if="!rateType" :class="[
                                        'sticon',
                                        {iconwt6:item.indices >= 140},
                                        {iconwt5:item.indices >= 130 &&  item.indices < 140},
                                        {iconwt4:item.indices >= 120 &&  item.indices < 130},
                                        {iconwt3:item.indices >= 110 &&  item.indices < 120},
                                        {iconwt2:item.indices >= 100 &&  item.indices < 110},
                                        {iconwt1:item.indices < 100}
                                        
                                    ]"></span>
                                    <span class="locationname" v-html="item.locationname"></span>
                                    <span class="ratenum" v-html="item.indices"></span>
                                    <span :class="['iconrate', {up:item.rate > 0}, {down:item.rate < 0}, {none:item.rate === 0}]"  v-html="Math.abs(item.rate)"></span>
                                </div>
                            </div>
                        </jQueryScrollbar>
                    </div>
                </template>
                <!-- 열지도 선택시 -->
                <template v-else>
                    <div class="titbox">
                        <span class="tit">KB 아파트시세 열지도</span>
                        <button type="button" :class="['iconbtn', 'btn-fold', {active:cardtogglehit}]" @click="cardfold('cardtogglehit')">내용접기</button>
                    </div>
                    <div class="graytxtbox" v-if="cardtogglehit">
                        <!-- 2022.02.18 퍼블 변경 -->
                        지금 뜨거운 지역은 어디일까요? <br />아파트 단지의 3.3㎡ 당 KB시세(시세변동률) 또는 밀집도가 높을수록 붉은색으로 표시돼요.
					</div>
                </template>
                <div class="carddatebox" :class="[{hitfold:!cardtogglehit}, {indfold: !cardtoggle}]"> <!-- 2022.02.17 열지도 내용 접기 여부 클래스 추가 -->
                    <button type="button" class="btn btn-hitmapout" v-if="hitmap" @click="modeSetting($event,'hitmap')">끄기</button>
                    <template v-if="monthsetting">
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
                        기준
                    </template>
                    <template v-else>
                        <div :class="[{select:pickerLayer},'pickerarea']">
                            <div class="pickerselect-text" @click="OpenPicker">{{starttime}} 기준</div>
                            <button class="iconbtn btn-picker" @click="OpenPicker"></button>
                            <div class="pickerlayer" v-if="pickerLayer">
                                <div class="pickertit">
                                    <strong>날짜 변경</strong>
                                    <div class="selected-weeks" v-html="starttime"></div>
                                </div>
                                <DatePicker
                                    inline
                                    type="date"
                                    v-model="starttime"
                                    format="YYYY년MM월DD일"
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
            </div>
             <!-- 지도 마커 -->
            <template v-if="!hitmap">
                <div class="markerboxwrap" style="top: 150px;left: 50%;">
                    <div class="markerbox noicon">
                        <span>서울</span>
                        <span class="infotxt">
                            <span class="txt1">135.5</span>
                            <span class="ratetextcolor iconrate up">4.2%</span>
                        </span>
                    </div>
                </div>
                
                 <!-- 변동율 필터가 켜져 있을때 on 클래스 추가-->

                <div class="markerboxwrap" style="top:20%;left: 40%;">
                    <!-- 툴팁추가 01/11 -->
                    <button class="iconbtn markertip" ></button>
                    <div class="tooltip top" style="width:173px;">
                        <span aria-hidden="true" class="arrow" style="right: 16px;"></span>
                        <p>
                            헬리오시티 2단지 신규입주<br />헬리오시티 3단지 재건축
                        </p>
                    </div>
                     <!-- //툴팁추가 01/11 -->


                    <div class="markerbox iconwt1">
                        <span>강원</span>
                        <span class="infotxt">
                            <span class="txt1">+150.3</span>
                            <span class="ratetextcolor iconrate up">2.83</span>
                        </span>
                    </div>
                </div>
                

                <div class="markerboxwrap " style="top:25%;left: 60%;">


                    <div class="markerbox iconwt1 big">
                        <span>강원</span>
                        <span class="infotxt">
                            <span class="txt1">+150.3</span>
                            <span class="ratetextcolor iconrate up">2.83</span>
                        </span>
                    </div>
                </div>

                <!-- 2022.03.28 퍼블 수정 / 데이터 없을 경우-->
                <div class="markerboxwrap " style="top:30%;left: 40%;">
                    <div class="markerbox noweatherdata">
                        <span>데이터없을때</span>
                        <span class="infotxt">
                            <span class="txt1">-</span>
                        </span>
                    </div>
                </div>

            </template>

            <!-- 지도 컨트롤 -->
            <div class="maptools weather">
                <button type="button" :class="['btn-heatmap', {active:hitmap}]" @click="modeSetting($event,'hitmap')">KB시세 열지도</button>
                <div class="groups">
                    <button type="button" class="btn btn-zoom-up">확대</button>
                    <button type="button" class="btn btn-zoom-down">축소</button>
                </div>
                <button type="button" class="btn btn-location">위치</button>
                <button type="button" class="btn btn-tollcollect">도구 모음 버튼</button>
                <button type="button" class="btn btn-kbmove">KB부동산 새창이동</button>
                <button type="button" class="btn btn-aimove">AI<br>통계</button>
                <button type="button"
                    @click="tipToggle($event,'hitToggle')"
                    :class="[
                        'btn','btn-hitoff',
                        {type1:kbhouse && rateType || aptaverage && rateType},
                        {type1off:kbhouse && !rateType  || aptaverage && !rateType},
                        {type2:houserent && rateType},
                        {type2off:houserent && !rateType},
                        {active:hitToggle},

                    ]"
                >마커on/off</button>
            </div>

            <!-- 지도색상 범례 -->
            <button type="button" class="btn sm btn-legendary" :class="{active:mobilechangeRate}"  @click="cardfold('mobilechangeRate')">범례</button>
            <div class="changeRateLayer" :class="{mobileactive:mobilechangeRate}">
                <div class="changeRatetit" >
                    <!-- KB 주택가격지수 범례 텍스트 -->
                    <template v-if="rateType && kbhouse || rateType && aptaverage">
                        <span>아파트 매매 가격지수 변동률</span>
                        <span class="txunit">(단위 : %)</span>
                    </template>
                    <template v-else-if="!rateType && kbhouse">
                        <span>아파트 매매 가격지수 변동률</span>
                        <span class="txunit">(2019.0=100)</span>
                    </template>
                    <!-- 아파트 평균가격 범례 텍스트 -->
                    <template v-if="!rateType && widthsetting && aptaverage">
                        <span>아파트 매매 평균가격</span>
                        <span class="txunit">(단위: 억)</span>
                    </template>
                    <template v-if="!rateType && !widthsetting && aptaverage">
                        <span>공급면적 3.3㎡당 아파트 매매 평균가격</span>
                        <span class="txunit">(단위: 만원)</span>
                    </template>
                    <!-- 전세가율 -->
                    <template v-else-if="rateType && houserent">
                        <span>아파트 전세가율 변동</span>
                        <span class="txunit">(단위 : %P)</span>
                    </template>
                    <template v-else-if="!rateType && houserent">
                        <span>아파트 전세가율</span>
                        <span class="txunit">(단위 : %)</span>
                    </template>
                    <template v-else-if="!rateType && hitmap">
                        <span>공급면적 3.3㎡당 KB 아파트 시세</span>
                    </template>
                    <template v-else-if="rateType && hitmap">
                        <span>공급면적 3.3㎡당 KB 아파트 시세 변동률</span>
                    </template>
                </div>
                <div class="changeRatecon">
                    <!-- 가격지수, 평균가격 변동률 범례 아이콘 색상  -->
                    <!-- 아이콘이미지 -->
                    <div :class="['weatherimg', {ratecheck:rateType} ]" v-if="rateType && kbhouse|| aptaverage&&rateType">
                        <span :class="['sticon', `iconwt`+(index+1)]" v-for="(item, index) in 6" :key="index"></span>
                    </div>
                    <!--color범례 -->
                    <div :class="['prcidxlegend',{active:kbhouse&&rateType || aptaverage&&rateType|| rateType && houserent || rateType && hitmap} , {lease:houserent},{hitmap:hitmap}]">
                        <span :class="'prclegendtype'+ (index+1)" v-for="(item, index) in  18" :key="index"></span>
                    </div>
                    <!--범례 단위 -->
                    <div :class="['numrate', {hitmap:hitmap}]">
                        <!-- 가격지수, 평균가격 변동률 on 월간 -->
                        <template v-if="rateType && !monthsetting && (!hitmap)">
                            <span
                                v-for="(item, index) in ['-2.0', '-1.0', '0', '1.0', '2.0']"
                                :key="index"
                                v-html="item"
                                :class="`ratetype`+(index+1)"
                            >
                            </span>
                        </template>
                        <!-- 가격지수, 평균가격 변동률 on 주간 -->
                        <template v-if="rateType && monthsetting && (!hitmap)">
                            <span
                                v-for="(item, index) in ['-4.0', '-2.0', '0', '2.0', '4.0']"
                                :key="index"
                                v-html="item"
                                :class="`ratetype`+(index+1)"
                            >
                            </span>
                        </template>
                        <!-- 가격지수 변동률 off 월/주간 -->
                        <template v-if="!rateType&&kbhouse">
                            <span
                                v-for="(item, index) in ['100', '110', '120', '130', '140']"
                                :key="index"
                                v-html="item"
                                :class="`ratetype`+(index+1)"
                            >
                            </span>
                        </template>

                        <!-- 평균가격 변동률 off 주택당 -->
                        <template v-if="!rateType && aptaverage && widthsetting">
                            <span
                                v-for="(item, index) in ['2', '4', '6', '8', '10']"
                                :key="index"
                                v-html="item"
                                :class="`ratetype`+(index+1)"
                            >
                            </span>
                        </template>
                        <!-- 평균가격 변동률 off 3.3 -->
                        <template v-if="!rateType && aptaverage && !widthsetting">
                            <span
                                v-for="(item, index) in ['1000', '2000', '3000', '4000', '5000']"
                                :key="index"
                                v-html="item"
                                :class="`ratetype`+(index+1)"
                            >
                            </span>
                        </template>

                        <!--  전세가율 변동률 off  -->
                        <template v-if="!rateType && houserent">
                            <span
                                v-for="(item, index) in ['40', '50', '60', '70', '80']"
                                :key="index"
                                v-html="item"
                                :class="`ratetype`+(index+1)"
                            >
                            </span>
                        </template>
                        <!--  열지도 변동률 off  -->
                        <template v-if="!rateType && hitmap">
                            <span
                                v-for="(item, index) in ['1000', '5000']"
                                :key="index"
                                v-html="item"
                                :class="`ratetype`+(index+1)"
                            >
                            </span>
                        </template>
                        <!--  열지도 변동률 on  -->
                        <template v-if="rateType && hitmap">
                            <span
                                v-for="(item, index) in ['Low', 'High']"
                                :key="index"
                                v-html="item"
                                :class="`ratetype`+(index+1)"
                            >
                            </span>
                        </template>
                    </div>
                </div>
            </div>
            
            
            <!-- 하단 버튼이동 -->
            <div :class="[{active:cardtoggle && !hitmap},'btmrightwrap']">
                <span role="link" class="link-naver">KB통계 전문가칼럼</span>
                <span role="link" class="link-youtube">KB통계기상도</span>
            </div>

            <!-- 토스트팝업 -->
            <div class="toastmsg " style="z-index: 1000; opacity:1;"><span>단독 및 연립은</span> 광역시/도 정보만 제공됩니다.</div>
            하프뷰 삭제
            <!-- <div class="mobilestartbtn"  v-if="mobilestart" @click="halfView"></div> -->
        </div>
    </div>
</template>
<style>

</style>
<script>
import NaverMaps from '@/views/example/samples/NaverMaps.vue';
export default {
    components: {
        NaverMaps
    },
    data() {
        return {
            polyCount: null,
            svgCount: null,
            //리사이징 데이터
            winwidth: null,
            winheight: null,
            //가격지수 선택데이터
            kbhouse: true,
            aptaverage: false,
            houserent: false,
            hitmap: false,
            //월간, 면적 선택데이터
            monthsetting: true,
            widthsetting: true,
            // 변동률데이터
            rateType: true,
            //툴팁 데이터
            tipguide: false,
            tipguide1: false,
            tipguide2: false,
            // 카드 토글데이터
            cardtoggle: true,
            cardtogglehit: true,
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
            //데이터피커
            pickerLayer: false,
            starttime: '2021년 10월 25일',
            selectYear: false,
            selectYear1: false,
            selectMonth: false,
            year: '2016년',
            year1: '2016년',
            month: '3월',
            mobilechangeRate: false,
            //가격지수 데이터
            indicesLists: [
                {locationname: '강원', indices: 99, rate: -2.83},
                {locationname: '충북', indices: 100, rate: -2.0},
                {locationname: '광주', indices: 100.3, rate: -1.0},
                {locationname: '인천', indices: 110, rate: 0},
                {locationname: '충남', indices: 120, rate: 0.7},
                {locationname: '대전', indices: 120.3, rate: 1.0},
                {locationname: '경남', indices: 130, rate: 1.01},
                {locationname: '전북', indices: 130.3, rate: 2.09},
                {locationname: '경기', indices: 150.3, rate: 2.83},
                {locationname: '경북', indices: 150.3, rate: 2.83},
                {locationname: '부산', indices: 150.3, rate: 2.83},
                {locationname: '서울', indices: 150.3, rate: 2.83},
                {locationname: '울산', indices: 150.3, rate: 2.83},
                {locationname: '전남', indices: 150.3, rate: 2.83},
                {locationname: '대구', indices: 150.3, rate: 2.83},
                {locationname: '제주', indices: 150.3, rate: 2.83},
                {locationname: '세종', indices: 150.3, rate: 2.83}
            ],
            //모바일 진입시 첫 화면 버튼 처리
            mobilestart: false,
            // 지도 마커 표시
            hitToggle: false

        };
    },
    created() {
        this.winwidth = window.innerWidth;
        this.winheight = window.innerHeight;
    },
    mounted() {
        window.addEventListener('resize', this.handleResize);
        this.handleResize();
        this.ListMotion(); //리스트 모션 추가
    },
    beforeDestory() {
        window.removeEventListener('resize', this.handleResize);
    },
    methods: {
        //모바일 하프뷰 한번만 삭제  LANDDATA03-512
        // halfView() {
        //     this.mobilestart = false;
        // },
        //데이터 피커 오픈
        OpenPicker() {
            this.pickerLayer === true ? this.pickerLayer = false : this.pickerLayer = true;
        },
        //카드펼침, 범례보이기(모바일)
        cardfold(type) {
            this[type] = !this[type];
            //접었다 폈을 때 카드 모션
            if (type === 'cardtoggle') {
                this[type] === true ? this.$nextTick(function() { this.ListMotion(); }) : null;
            }
        },
        ///월간 주간 선택
        settingMonth(e, type) {
            if (type === '월간') {
                this.monthsetting = true;
            } else {
                this.monthsetting = false;
            }
        },
        // 평균가격주택당선택
        settingWidth(e, type) {
            if (type === '주택당') {
                this.widthsetting = true;
            } else {
                this.widthsetting = false;
            }
        },
        //메뉴선택
        modeSetting(e, type) {
            this.typeSetting(e, '.topmenubox .btn');
            this.kbhouse = false;
            this.aptaverage = false;
            this.houserent = false;
            if (type === 'kbhouse') {
                this.kbhouse = true;
                this.hitmap = false;
            } else if (type === 'aptaverage') {
                this.aptaverage = true;
                this.hitmap = false;
            } else if (type === 'houserent') {
                this.houserent = true;
                this.hitmap = false;
            } else if (type === 'hitmap') {
                if (this.hitmap === true) {
                    this.hitmap = false;
                    this.kbhouse = true;
                } else {
                    this.hitmap = true;
                }
            }
            //열지도모드 off 카드 모션
            if (type === 'hitmap' && this[type] === false) {
                this.$nextTick(function() {
                    this.ListMotion();
                });
            }
        },
        // 선택 토글
        typeSetting(e, className) {
            let tabbox = document.querySelectorAll(className);
            tabbox.forEach(elem => {
                elem.classList.remove('active');
            });
            e.target.classList.add('active');
        },
        //툴팁처리
        tipToggle(e, type) {
            this[type] = !this[type];
        },
        
        //레이어 팝업 스크롤 처리 
        handleResize(event) {
            this.winwidth = window.innerWidth;
            // 범례버튼 모바일
            if (this.winwidth < 1190) {
                this.mobilebtnH = 114;
                this.mobilestart = true;
                this.winheight = window.innerHeight - 56;
            } else {
                this.mobilebtnH = 0;
                this.mobilestart = false;
                this.winheight = window.innerHeight - 32;
            }
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
        /* 리스트 모션 */
        ListMotion() {
            let ele = document.querySelectorAll('.indiceslist .listbody .rowlist');
            if (ele) {
                document.querySelector('.indiceslist .listbody').classList.add('active');
                for (let i = 0; i < this.indicesLists.length; i++) {
                    ele[i].style.setProperty('transition-delay', 0.05 * i + 's');
                }
            }
        }
        
    }
};
</script>