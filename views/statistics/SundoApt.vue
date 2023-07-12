<template>
    <section class="SundoApt">
         <div class="mainTitle">
			<h1 class="titdepth1">월간 선도아파트</h1>
            <ShareCommon
                :pageurl ="this.$router.currentRoute.path"
            />
         </div>
        
         <div class="cardwrap">
             <div class="cardarea">
                <div class="cardbox topcard" :class="activeSticky">
                    <div class="selectbox type2 wideselect">
                        <span class="value txt arw" :class="{down:!locationSelect, up:locationSelect}" @click="SelectToggle('locationSelect')">
                            선택
                            <span class="stxt">지수120.2</span>
                            <span class="stxt">전월대비</span>
                            <span class="ico numup textin">2.4%</span>
                        </span>
                    </div>
                    <div class="filterbtns">
                        <button type="button" class="btn typeapt  active" @click="subTabActive($event,'.filterbtns');">시세총액</button>
                        <button type="button" class="btn typeapt" @click="subTabActive($event,'.filterbtns');">3.3㎡당 KB시세</button>
                        <button type="button" class="btn typeapt" @click="subTabActive($event,'.filterbtns');">세대수</button>
                    </div>
                    <!-- 지역선택 레이어 추가 -->
                    <div class="locationSelect sundo" v-if="locationSelect">
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
                </div>
                <div class="cardCaptureBox">
                    <ChartOption
                        :optionList="optionList"
                        @print="cardOption('print')"
                        @capture="cardOption('capture')"
                    />
                    <div class="cardbox cardCapture">
                        <div class="cardtit tradingtit">
                            <h1 class="titdepth2">아파트가격지수</h1>
                            <div class="listbtn type2"><!-- 2022.03.07 퍼블수정 / 마트업 수정-->
                                <button class="btn textline" @click="subTabActive($event,'.type2');">TOP10</button>
                                <button class="btn textline" @click="subTabActive($event,'.type2');">TOP20</button>
                                <button class="btn textline" @click="subTabActive($event,'.type2');">TOP30</button>
                            </div>
                        </div>
                        <div class="listradiogroup apttradio"><!-- 2022.03.07 퍼블수정 / 마크업 클래스 수정-->
                        <div>
                            <label for="all" class="custom-radio custom-control"><input type="radio" name="time" id="all"><span>전체</span></label>
                            <label for="years5" class="custom-radio custom-control"><input type="radio" name="time" id="years5"><span>5년</span></label>
                            <label for="years2" class="custom-radio custom-control"><input type="radio" name="time" id="years2"><span>2년</span></label>
                            <label for="years1" class="custom-radio custom-control"><input type="radio" name="time" id="years1"><span>1년</span></label>
                            <label for="months6" class="custom-radio custom-control"><input type="radio" name="time" id="months6"><span>6개월</span></label>
                        </div>
                            
                            <div class="rangelegend">
                                <div class="switchwrap">
                                    <div class="switch-button custom-control sm">
                                        <input type="checkbox" id="changeRatio2">
                                        <label for="changeRatio2" class="switch"><span class="txt">변동률(%)</span></label>
                                    </div>
                                    변동률(%)
                                </div>
                            </div>
                        </div>
                        <!-- 차트 전체 -->
                        <div class="chartArea">
                            <!-- 범례 -->
                            <div class="chartlegend checkedlegend aptlegend"><!-- 2022.03.28  퍼블 수정 / 범례 아이콘 변경  -->
                                <span class="legend aptprice5">KB선도아파트50지수</span>
                                <span class="legend aptprice6">서울시 시세총액 TOP20</span><br />
                                <span class="legend aptprice7">전국 아파트 매매가격지수</span>
                                <span class="legend aptprice8">서울시 아파트 매매가격지수</span>
                                
                            </div>
                            <div class="chartview" style="height: 330px; position: relative;">
                                <!-- 모바일의 경우 (해상도 767이하 부터) 해당 툴팁 표기 -->
                                <div class="chartTip tradingtip mobile apttip" style="top: -140px;">
                                    <p class="tx1">2020년 10월</p>
                                    <p class="tx1">전국</p>
                                    <div class="linebox botnoline topnoline"><!-- 2022.03.28  퍼블 수정 / 툴팁 범례 아이콘 변경  -->
                                        <span class="legend aptprice5">KB선도아파트50지수 : 123.3</span>
                                        <span class="legend aptprice6">매매가격지수 : 105.9</span>
                                    </div>
                                    <p class="tx1">서울시</p>
                                    <div class="linebox botnoline topnoline"><!-- 2022.03.28  퍼블 수정 / 툴팁 범례 아이콘 변경  -->
                                        <span class="legend aptprice7">시세총액TOP20 : 123.3</span>
                                        <span class="legend aptprice8">매매가격지수 : 105.9</span>
                                    </div>
                                </div>
                                <!--웹의 경우 (해상도 768이상 부터) 해당 차트 내 툴팁 표기 -->
                                <div class="chartTip tradingtip" style="top: 0px; left: 50px;">
                                    <p class="tx1">2020년 10월</p>
                                    <p class="tx1">전국</p>
                                    <div class="linebox botnoline topnoline"><!-- 2022.03.28  퍼블 수정 / 툴팁 범례 아이콘 변경  -->
                                        <span class="legend aptprice5">KB선도아파트50지수 : 123.3</span>
                                        <span class="legend aptprice6">매매가격지수 : 105.9</span>
                                    </div>
                                    <p class="tx1">서울시</p>
                                    <div class="linebox botnoline topnoline"><!-- 2022.03.28  퍼블 수정 / 툴팁 범례 아이콘 변경  -->
                                        <span class="legend aptprice7">시세총액TOP20 : 123.3</span>
                                        <span class="legend aptprice8">매매가격지수 : 105.9</span>
                                    </div>
                                </div>
                                <!-- 차트영역 -->
                                <div class="chart"></div>
                            </div>
                        </div>
                        
                        <!-- 테이블 영역 -->
                        <div class="tradingtable aptTable">
                            <div class="tablelabel">
                                <span>아파트 지수 구분</span>
                                <span>KB선도아파트50지수</span>
                                <span>전국 매매가격지수</span>
                                <span>서울시 시세총액 <em class="colortype-4281ff">TOP20</em></span>
                                <span>서울시 매매가격지수</span>
                            </div>
                            <jQueryScrollbar  style="width:100%;" :useCtrl="{direction: 'x' }"> <!-- 화살표 추가 22.05.20 -->
                                <div class="scrollin-pir">
                                    <div class="tablelbody">
                                        <div class="tablelow">
                                            <span class="day" v-for="(day, index) in tradingdays" :key="index"  v-html="day.day" ></span>
                                        </div>
                                        <div class="tablelow"  v-for="(item, index) in tradingdatas2" :key="index">
                                            <span class="datavalue" v-for="(data, index) in item.data" :key="index" v-html="data.value" ></span>
                                        </div>
                                    </div>
                                </div>
                            </jQueryScrollbar>
                        </div>
                        <div class="unittextbox right"> (2019.01=100.0)</div>

                    </div>
                </div>
             </div>
             <div class="cardarea moveScrollbox" :class="{flipani:filpmotion}">
                 <div class="cardbox frontcard">
                    <div class="cardtit ">
						<h1 class="titdepth2">시세총액 TOP</h1>
						<span class="datetxt">2021년 10월 기준</span>
                        <div class="btnrightarea">
                            <button type="button" class="btn btn-best" @click="flipActive('filpmotion')">KB선도아파트50</button>
                        </div>
					</div>

                    <!--
                        
                        - 정렬관련 버튼 클래스
                         : 정렬버튼(기본) : btn-rowsort
                         : 정렬버튼(내림) : btn-rowsort down
                         : 정렬버튼(올림) : btn-rowsort up
                         
                        - 정렬된 텍스트 클래스 (class="aptToplist" 부분에 추가)
                          시세총액 : sorttype1
                          3.3m당 시세 : sorttype2
                          세대수 : sorttype3
                          준공년월 : sorttype4


                        - 리스트 기준 컬러 의 경우(class="aptToplist" 부분에 추가)
                          시세총액 : selcoltype1
                          3.3m당 시세 : selcoltype2
                          세대수 : selcoltype3
                        
                    -->
                    <div class="aptToplist selcoltype3 sorttype4">
                        <div class="rowlisthead">
                            <div class="toprow"> <!-- 2022.02.18 마크업 변경-->
                                <div class="cell celltype3">단지명</div>
                                <div class="cell"><button class="btn btn-rowsort ">시세총액</button></div>
                                <div class="cell"><button class="btn btn-rowsort ">3.3m당 <br />KB시세</button></div>
                                <div class="cell"><button class="btn btn-rowsort ">세대수</button></div>
                                <div class="cell celltype2"><button class="btn btn-rowsort up">준공년월</button></div>
                            </div>
                        </div>
                        <div class="rowlistbody"><!-- 2022.02.18 테이블 수정 변경-->
                            <div class="toprow" v-for="(item, index) in topPricelists" :key="index">
                                <div class="aptname cell celltype3">
                                    <span :class="['icon',{num1:index===0},{num2:index===1}, {num3:index===2}]" v-if="index < 3">{{index}}</span>
                                    <span class="numtext" v-else>{{index+1}}</span>
                                    <span class="nametext">
                                        <em class="ellipsis" v-html="item.aptname.name"></em>
                                        <em v-html="item.aptname.address"></em>
                                    </span>
                                    <span class="kblabelicon">kb마크</span>
                                </div>
                                <div class="cell" v-html="item.totalprice"></div>
                                <div class="cell" v-html="item.kbprice"></div>
                                <div class="cell" v-html="item.totalnum"></div>
                                <div class="cell celltype2 buttoncell">
                                    <span v-html="item.bulidyear"></span>
                                    <button type="button" class="btn btn-complex" @click="gotoPage(item.url)">단지</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="paging type2" v-if="winwidth > 1189">
						<span role="button" class="num now">1</span>
						<span role="button" class="num">2</span>
						<span role="button" class="num">3</span>
						<span role="button" class="num">4</span>
						<span role="button" class="num">5</span>
					</div>
                    <button type="button" class="btn btn-more type2" v-else>더보기</button>
                 </div>
                 <div class="cardbox backcard">
                     <div class="cardtit ">
						<h1 class="titdepth2">KB선도아파트50</h1>
						<span class="datetxt">2021년 10월 기준</span>
                        <div class="btnrightarea">
                            <button type="button" class="btn btn-mbtop" @click="flipActive('filpmotion')">시세총액TOP</button>
                        </div>
					</div>
                    <div class="aptToplist">
                        <div class="rowlisthead">
                            <div class="toprow">
                                <div class="cell celltype3">단지명</div>
                                <div class="cell"><button class="btn btn-priceup">시세총액</button></div>
                                <div class="cell">3.3m당 <br />KB시세</div>
                                <div class="cell">세대수</div>
                                <div class="cell celltype2">준공년월</div>
                            </div>
                        </div>
                        <div class="rowlistbody">
                            <div class="toprow" v-for="(item, index) in topPricelists" :key="index">
                                <div class="aptname cell celltype3">
                                    <span :class="['icon',{num1:index===0},{num2:index===1}, {num3:index===2}]" v-if="index < 3">{{index+1}}</span>
                                    <span class="numtext" v-else>{{index+1}}</span>
                                    <span class="nametext">
                                        <em class="ellipsis" v-html="item.aptname.name"></em>
                                        <em v-html="item.aptname.address"></em>
                                    </span>
                                    <!-- <span class="kblabelicon">kb마크</span> --> <!-- 2022.03.02 퍼블수정 - 선도아파트50 리스트 부분에선 삭제-->
                                </div>
                                <div class="colortype-f06595 cell price" v-html="item.totalprice"></div>
                                <div class="cell" v-html="item.kbprice"></div>
                                <div class="cell" v-html="item.totalnum"></div>
                                <div class="cell celltype2 buttoncell">
                                    <span v-html="item.bulidyear"></span>
                                    <button type="button" class="btn btn-complex" @click="gotoPage(item.url)">단지</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="paging type2" v-if="winwidth > 1189">
						<span role="button" class="num now">1</span>
						<span role="button" class="num">2</span>
						<span role="button" class="num">3</span>
						<span role="button" class="num">4</span>
						<span role="button" class="num">5</span>
					</div>
                    <button v-else type="button" class="btn btn-more type2">더보기</button>
                 </div>
             </div>
             <div class="mobileFloating">
                <button class="btn btn-round confirm arw down" @click="moveScroll"><strong>서울 </strong>시세총액 TOP</button>
            </div>
         </div>
         <div class="helptxtbox">
            <div class="tit">선도 아파트 지수를 이해해봅시다!</div>
            <div class="txt">
                KB선도아파트50지수는 시가총액 상위 50개 아파트의 시가총액을 지수화한 것으로 매년 12월 50개 단지를 선정하고 1년간 유지하고 있습니다.<br>
                우리나라 시가총액 상위단지의 시계열 추이를 전국 평균가격지수와 비교해 보실 수 있습니다.<br>
                또한, 전국기준 KB선도아파트50지수와 함께 원하시는 지역별 TOP단지의 가격흐름을 시가총액, 3.3㎡당 KB시세, 세대수의 다양한 기준으로도 분석해보실 수 있습니다.
            </div>
        </div>
    </section>
</template>
<script>
import ChartOption from '@/components/elements/ChartOption.vue';
import Location from '@/components/elements/Location.vue';
import ShareCommon from '@/components/elements/ShareCommon.vue';
export default {
    components: {
        ChartOption,
        Location,
        ShareCommon
    },
    props: {
        scrollH: [Number]
    },
    data() {
        return {
            frontcard: '.frontcard',
            filpmotion: false,
            // 카드레이어 옵션
            optionList: [
                {text: '인쇄', type: 'print'},
                {text: '화면 캡쳐', type: 'capture'},
                {text: '엑셀 저장', type: 'excel'},
                {text: '공유', type: 'share'}
            ],
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
            //시세총액 리스트 
            topPricelists: [
                {
                    aptname: {name: '헬리오시티', address: '강동구 고덕동'},
                    totalprice: '18.27조',
                    kbprice: '6,851만원',
                    totalnum: '4,932세대',
                    bulidyear: ' 19년 02월(2년차) ',
                    url: null
                },
                {
                    aptname: {name: '헬리오시티', address: '강동구 고덕동'},
                    totalprice: '18.27조',
                    kbprice: '6,851만원',
                    totalnum: '4,932세대',
                    bulidyear: ' 19년 02월(2년차) ',
                    url: null
                },
                {
                    aptname: {name: '헬리오시티', address: '강동구 고덕동'},
                    totalprice: '18.27조',
                    kbprice: '6,851만원',
                    totalnum: '4,932세대',
                    bulidyear: ' 19년 02월(2년차) ',
                    url: null
                },
                {
                    aptname: {name: '헬리오시티', address: '강동구 고덕동'},
                    totalprice: '18.27조',
                    kbprice: '6,851만원',
                    totalnum: '4,932세대',
                    bulidyear: ' 19년 02월(2년차) ',
                    url: null
                },
                {
                    aptname: {name: '헬리오시티', address: '강동구 고덕동'},
                    totalprice: '18.27조',
                    kbprice: '6,851만원',
                    totalnum: '4,932세대',
                    bulidyear: ' 19년 02월(2년차) ',
                    url: null
                },
                {
                    aptname: {name: '헬리오시티', address: '강동구 고덕동'},
                    totalprice: '18.27조',
                    kbprice: '6,851만원',
                    totalnum: '4,932세대',
                    bulidyear: ' 19년 02월(2년차) ',
                    url: null
                },
                {
                    aptname: {name: '헬리오시티', address: '강동구 고덕동'},
                    totalprice: '18.27조',
                    kbprice: '6,851만원',
                    totalnum: '4,932세대',
                    bulidyear: ' 19년 02월(2년차) ',
                    url: null
                },
                {
                    aptname: {name: '헬리오시티', address: '강동구 고덕동'},
                    totalprice: '18.27조',
                    kbprice: '6,851만원',
                    totalnum: '4,932세대',
                    bulidyear: ' 19년 02월(2년차) ',
                    url: null
                },
                {
                    aptname: {name: '헬리오시티', address: '강동구 고덕동'},
                    totalprice: '18.27조',
                    kbprice: '6,851만원',
                    totalnum: '4,932세대',
                    bulidyear: ' 19년 02월(2년차) ',
                    url: null
                },
                {
                    aptname: {name: '헬리오시티', address: '강동구 고덕동'},
                    totalprice: '18.27조',
                    kbprice: '6,851만원',
                    totalnum: '4,932세대',
                    bulidyear: ' 19년 02월(2년차) ',
                    url: null
                }
            ],

            //widow width
            winwidth: null,

            // 지역선택레이어
            locationSelect: false,
            locationSearch: false,
            // 지역검색
            srhtext: '',
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
            // 상단 고정
            stickytop: 0,
            activeSticky: '',
            topbox: 0
            
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
                if (this.scrollH > this.cardH) {
                    document.querySelector('.frontcard').classList.add('active');
                }
                if (this.scrollH > this.stickytop && this.winwidth < 1594) {
                    this.activeSticky = 'activeSticky';
                    this.stickytop = document.querySelector('.cardCaptureBox').offsetTop;
                } else {
                    this.activeSticky = '';
                }
                this.topBox = document.querySelector('.topcard').clientHeight;
            }
        }
    },
    mounted() {
        window.addEventListener('resize', this.handleResize);
        this.startMotion();
        this.scrollH;
    },
    beforeDestory() {
        window.removeEventListener('resize', this.handleResize);
    },
    created() {
        this.winwidth = window.innerWidth;
        this.$nextTick(function() {
            this.handleResize();
            this.startMotion();
        });
        this.scrollH;
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
        //공통 == 서브탭클래스 처리 active
        subTabActive(e, classname, text) {
            if (classname === '.filterbtns') {
                const tabbox = document.querySelectorAll(classname + ' .typeapt');
                tabbox.forEach(elem => {
                    elem.classList.remove('active');
                });
                e.target.classList.add('active');
            } else {
                const tabbox = document.querySelectorAll(classname + ' .textline');
                tabbox.forEach(elem => {
                    elem.classList.remove('active');
                });
                e.target.classList.add('active');
                
            }
            
        },
        //리사이징
        handleResize() {
            if (document.querySelector('.frontcard')) {
                this.winwidth = window.innerWidth;
                if (this.winwidth > 1513) {
                    document.querySelector('.frontcard').classList.add('active');
                    
                } else {
                    document.querySelector('.frontcard').classList.remove('active');
                }
            }
            // 지역선택 영역 높이 리사이징
            if (this.winwidth < 1190) {
                this.topBox = document.querySelector('.topcard').clientHeight;
            }
        },
        //하단이동 버트
        moveScroll() {
            let cardH = document.querySelector('.moveScrollbox').offsetTop;
            if (this.activeSticky === 'activeSticky') {
                window.$eventBus.$emit('scrollMove', cardH);
            } else { //지역선택 영역 고정 아닐 때
                window.$eventBus.$emit('scrollMove', cardH - this.topBox - 24);
            }
        },

        //시세총액 리스트 모션
        startMotion() {
            if (this.winwidth > 1513) {
                clearTimeout(this.aniTimer);
                this.aniTimer = setTimeout(() => {
                    document.querySelector('.frontcard').classList.add('active');
                }, 200);
            } else {
                clearTimeout(this.aniTimer);
                this.aniTimer = setTimeout(() => {
                    document.querySelector('.frontcard').classList.remove('active');
                }, 200);
            }
        },
        //카드모션
        flipActive(type) {
            this[type] = !this[type];
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
        }
    }
};
</script>