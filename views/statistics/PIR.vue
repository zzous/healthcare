<template>
    <section class="pir">
        <div class="mainTitle">
            <h1 class="titdepth1">소득 대비 주택가격 비율(PIR)</h1>
            <div class="filterbtns">
                <button type="button"
                    v-for="(item, index) in locations" :key="index" v-html="item.area"
                    :class="[`btn-area`,{active:item.active}]"
                    @click="activebtn('button', index)"
                />
            </div>
            <Guidetext :icotype="'icoinfo1'" :guidetext="'KB아파트담보대출PIR은 서울, 경기, 인천 3 개 지역만 분기별로 제공됩니다.'"  />
            <ShareCommon
                :pageurl ="this.$router.currentRoute.path"
            />
        </div>
        <div class="cardwrap">
            <div class="pirchart" >
                <div class="cardCaptureBox">
                    <ChartOption
                        :optionList="optionList"
                        @print="cardOption('print')"
                        @capture="cardOption('capture')"
                    />
                    <div class="cardbox cardCapture">
                        <div class="mobile-tipbox">
                            <div class="tiptit">
                                <span>2020년 2분기</span>
                                <em>단위 : 만원, 배</em>
                            </div>
                            <div class="tablebox pir">
                                <div class="line header">
                                    <div class="cell">지역</div>
                                    <div class="cell">가구소득</div>
                                    <div class="cell">주택가격</div>
                                    <div class="cell">KB아파트<br />담보대출PIR</div>
                                </div>
                                <div :class="['line', {seoul:item.location==='서울',inchon:item.location==='인천',gg:item.location==='경기' }]" v-for="(item, index) in chartdatas" :key="index" >
                                    <div class="cell" v-html="item.location"></div>
                                    <div class="cell" v-for="(value, idx) in item.value" :key="idx" v-html="value" ></div>
                                </div>
                            </div>
                        </div>
                        <div class="filterforms noline">
                            <div class="ck-form">
                                <label for="aptpir" class="custom-checkbox custom-control"><input type="checkbox" name="pir" id="aptpir" checked="checked"><span>KB아파트담보대출PIR </span></label>
                                <label for="housepir" class="custom-checkbox custom-control"><input type="checkbox" name="pir" id="housepir" ><span>주택가격</span></label>
                                <label for="incomepir" class="custom-checkbox custom-control"><input type="checkbox" name="pir" id="incomepir"><span>가구소득</span></label>
                            </div>
                            <div class="radio-form">
                                <label for="all" class="custom-radio custom-control"><input type="radio" name="time" id="all" checked="checked"><span>전체 </span></label>
                                <label for="yeartype1" class="custom-radio custom-control"><input type="radio" name="time" id="yeartype1" checked="checked"><span>10년</span></label>
                                <label for="yeartype2" class="custom-radio custom-control"><input type="radio" name="time" id="yeartype2" checked="checked"><span>5년</span></label>
                            </div>
                            
                        </div>
                        <!-- 차트영역 -->
                        <div style="position:relative; height:570px">
                            <!-- 차트레이어 -->
                            <div class="chartTip" style="left:0px;top: 200px;">
                                <span class="tiptit flexbox">
                                    <em>2021년 3월</em>
                                    <em>단위 : 만원, 배</em>

                                </span>
                                <div class="tablebox pir">
                                    <div class="line header">
                                        <div class="cell">지역</div>
                                        <div class="cell">가구소득</div>
                                        <div class="cell">주택가격</div>
                                        <div class="cell">KB아파트<br />담보대출PIR</div>
                                    </div>
                                    <div :class="['line', {seoul:item.location==='서울',inchon:item.location==='인천',gg:item.location==='경기' }]" v-for="(item, index) in chartdatas" :key="index" >
                                        <div class="cell" v-html="item.location"></div>
                                        <div class="cell" v-for="(value, idx) in item.value" :key="idx" v-html="value" ></div>
                                    </div>
                                </div>
                            </div>
                            <!-- 기간 슬라이더 영역-->
                            <div class="rangebox pir">
                                <div class="rangedatebox">
                                    
                                    <div class="barlegend">
                                        <span>2008</span>
                                        <span>현재</span>
                                    </div>
                                    <div class="barcont">
                                        
                                        <span class="datetext"> 양쪽 화살표를 움직여 기간별 변동률을 확인해보세요!</span>
                                        <span class="imgslider" style="position:absolute; left:-10px; top:-15px;" ><img src="/images/common/icon_36_Knob.svg" /></span>
                                        <!-- <span class="btn-chartRange left" style="left:-10px"></span> -->
                                        <span class="btn-chartRange right" style="right:-10px"></span>
                                    </div>
                                     <!-- style 값 없는 경우 width 100%-->
                                    <!-- <div class="barvalue" style="left:10%;right:10%;width:80%;">
                                        <button type="button" class="btncircle arrowleft"><span class="icoarrow"></span><span class="vtext">2008</span></button>
                                        <button type="button" class="btncircle arrowright"><span class="icoarrow"></span><span class="vtext">현재</span></button>
                                    </div> -->
                                </div>
                                <div role="tooltip" class="tooltip bottom" style="left:0px;top:48px;" v-if="guidetip1">
                                    <span aria-hidden="true" class="arrow" style="left:8px;"></span>
                                    <div class="flexbox">
                                        <p>양쪽 화살표를 움직여<br>기간별 변동률을 확인해보세요</p>
                                        <button type="button" title="툴팁닫기" class="tipclose" @click="Tipclose('guidetip1')"></button>
                                    </div>
                                </div>
                                <div role="tooltip" class="tooltip bottom" style="right:0;top:48px;" v-if="guidetip2">
                                    <span aria-hidden="true" class="arrow" style="left:calc(100% - 18px)"></span>
                                    <div class="flexbox">
                                        <div class="txtBox tar">
                                            <div>KB아파트담보대출PIR은 <span class="colortxtup">서울 <span class="iconrate up">30%</span>  경기 <span class="iconrate up">4.2%</span></span>  <span class="colortxtdown">인천 <span class="iconrate down">4.2%</span></span> 변동되었습니다. </div>
                                            <div>주택가격은 <span class="colortxtup">서울 <span class="iconrate up">30%</span> 경기<span class="iconrate up">4.2%</span></span>  <span class="colortxtdown">인천 <span class="iconrate down">4.2%</span></span> 변동되었습니다.</div>
                                            <div>가구소득은 <span class="colortxtup">서울 <span class="iconrate up">30%</span>  경기 <span class="iconrate up">4.2%</span></span>  <span class="colortxtdown">인천 <span class="iconrate down">4.2%</span></span> 변동되었습니다.</div>
                                        </div>
                                        <button type="button" title="툴팁닫기" class="tipclose" @click="Tipclose('guidetip2')"></button>
                                        </div>
                                </div>
                            </div>
                            <!-- 차트 영역 -->
                            <div class="chartlegend">
                                <div>
                                    <span class="legend lineblack colortype-69696f">KB아파트담보대출PIR</span>
                                </div>
                                <div>
                                    <span class="legend areagray">주택가격</span>
                                    <span class="legend areadarkgray">가구소득</span>
                                </div>
                            </div>

                            <div class="unittextbox between">
                                <span>(배)</span>
                                <span>(만원)</span>
                            </div>
                        </div>

                        <!-- 도움말 영역 -->
                        <div class="helptxtbox">
                            <div class="tit">KB아파트담보대출PIR를 이해해봅시다!</div>
                            <div class="txt">
                                <strong>PIR(Price to income ratio)= 주택가격/가구소득</strong><br>
                                PIR은 주택가격을 가구소득으로 나눈 값입니다. (PIR이 10이라면 주택가격은 연소득의 10배입니다.) 가구소득은 분기단위 해당 지역 내 KB국민은행 부동산담보대출(아파트) 대출자의 연소득 중위값이며 주택가격은 분기단위 해당 지역 내 KB국민은행 부동산담보대출(아파트) 실행시 조사된 담보평가 가격의 중위값입니다. (KB아파트담보대출PIR은 실제 KB국민은행의 대출거래 정보로 작성된 지수로 기존 당행에서 발표중인 PIR과는 차이가 있습니다.)
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="pirdec">
                <div class="cardbox">
                    <h1 class="titdepth2 sm">나와 연소득이 비슷한 사람들은 얼마짜리 집을 살까?</h1>
                    <div class="exparea">
                        <div class="inputexp">
                            <div class="textbox"><!-- 2022.03.10 퍼블 수정 / 텍스트 수정 -->
                                <p>KB국민은행에 아파트담보대출을 받으신 분들은 평균적으로 <strong>서울</strong>에서 소득 대비 <strong>12.7배</strong> 가격의 주택을 구입하셨습니다.</p>
                                <p>KB아파트담보대출PIR 활용하여 <strong>연 가구소득 대비 주택구입가</strong>를 예상해보세요.</p>
                            </div>
                            <div class="inputarea">
                                <span>연소득을 입력해보세요.</span><!-- 2022.03.10 퍼블 수정 / 텍스트 수정 -->
                                <div class="inputbox">
                                    <span><input type="text" /><em>만원</em></span>
                                    <button>확인</button>
                                </div>
                            </div>
                        </div>
                        <!-- 막대그래프 -->
                        <div class="exp-graph">
                            <div class="botcopy">2021년 2분기 PIR기준</div>
                            <div class="graphlegned">
                                <span class="colortype-69696f">내 연소득</span>
                                <span class="colortype-f59f00">서울 주택</span>
                                <span class="colortype-e74980">경기 주택</span>
                                <span class="colortype-228be6">인천 주택</span>
                            </div>
                            <div class="graphbox">
                                <div class="linedot" :style="'bottom:'+height1+'%'"></div>
                                <div class="bar">
                                    <span class="colortype-69696f toptext">5,519 만원</span>
                                    <span class="barline" :style="'height:'+height1+'%'">
                                        <span class="databar" ></span>
                                    </span>
                                </div>
                                <div class="bar">
                                    <span class="colortype-f59f00 toptext">6.3 억</span>
                                    <span class="barline" :style="'height:'+height2+'%'">
                                        <span class="databar" ></span>
                                        <span class="incomtext">
                                            연소득<br />
                                            x<br />
                                            12.7배
                                        </span>
                                    </span>
                                </div>
                                <div class="bar">
                                    <span class="colortype-e74980 toptext">4.9억</span>
                                    <span class="barline" :style="'height:'+height3+'%'">
                                        <span class="databar" ></span>
                                        <span class="incomtext">
                                            연소득<br />
                                            x<br />
                                            12.7배
                                        </span>
                                    </span>
                                </div>
                                <div class="bar">
                                    <span class="colortype-228be6 toptext">4.3억</span>
                                    <span class="barline" :style="'height:'+height4+'%'">
                                        <span class="databar" ></span>
                                        <span class="incomtext">
                                            연소득<br />
                                            x<br />
                                            12.7배
                                        </span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="botcopy">KB부동산 제공</div>
                </div>
                <div class="cardbox">
                    <div class="tabletit">
                        <span role="button" class="btn-statistics">주택가격동향 바로가기</span>
                        <span>단위 : 만원, 배</span>
                    </div>
                    <!-- pc,tablet테이블 -->
                    <div class="webtablearea">
                        <div class="pirtable">
                            <jQueryScrollbar  style="width:100%; height:353px">
                                <div class="scrollin-pir">
                                    <div class="pirtable-header">
                                        <div class="header-cell yearlabel">
                                            년도
                                        </div>
                                        <div class="header-cell">
                                            <span class="bgcolortype-fff9db colortype-fab005">서울</span>
                                            <span>
                                                <em>가구<br />소득</em>
                                                <em>주택<br />가격</em>
                                                <em>KB아파트<br />담보대출<br />PIR<br /></em>
                                            </span>
                                        </div>
                                        <div class="header-cell">
                                            <span class="bgcolortype-fff0f6 colortype-e74980">경기</span>
                                            <span>
                                                <em>가구<br />소득</em>
                                                <em>주택<br />가격</em>
                                                <em>KB아파트<br />담보대출<br />PIR<br /></em>
                                            </span>
                                        </div>
                                        <div class="header-cell">
                                            <span class="bgcolortype-e7f5ff colortype-228be6">경기</span>
                                            <span>
                                                <em>가구<br />소득</em>
                                                <em>주택<br />가격</em>
                                                <em>KB아파트<br />담보대출<br />PIR<br /></em>
                                            </span>
                                        </div>
                                    </div>
                                    <div class="stickyCell"  v-if="scroll">
                                        <div class="days-cell" v-html="pirdatas[0].day"></div>
                                        <div class="header-cell" v-for="(data, index) in pirdatas[0].data" :key="index">
                                            <span>
                                                <em v-for="(value, index) in data.value" :key="index" v-html="value"></em>
                                            </span>
                                        </div>
                                    </div>
                                    <jQueryScrollbar :maxHeight="'318px'" style="width:100%;">
                                        <div class="pirtable-body">
                                            <div class="data-cell">
                                                <div class="data-row" :class="{active:index === selectedNum}" v-for="(item, index) in pirdatas" :key="index">
                                                    <div class="days-cell" v-html="item.day"></div>
                                                    <div class="header-cell" v-for="(data, index) in item.data" :key="index">
                                                        <span>
                                                            <em v-for="(value, index) in data.value" :key="index" v-html="value"></em>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                        </div>
                                    </jQueryScrollbar>
                                </div>
                            </jQueryScrollbar>
                        </div>
                    </div>
                    <!-- 모바일테이블 -->
                    <div class="moblietablearea">
                        <TabContent
                            :tabsublist="'tabbox tabtype3'"
                            :tabtexts="tabtextsType1"
                            v-on:tabactive="tabClick"
                        >
                            <template slot="panel">
                                <div :class="[`pirtable`, {seoul:pirLocation==='서울'},{inchon:pirLocation==='인천'},{gg:pirLocation==='경기'},]">
                                    <div class="scrollin-pir">
                                        <div class="pirtable-header">
                                            <div class="header-cell yearlabel">
                                                년도
                                            </div>
                                            <div class="header-cell">
                                                <span>{{pirLocation}}</span>
                                                <span>
                                                    <em>가구<br />소득</em>
                                                    <em>주택<br />가격</em>
                                                    <em>KB아파트<br />담보대출<br />PIR<br /></em>
                                                </span>
                                            </div>
                                        </div>
                                        <div class="pirtable-body">
                                            <div class="data-cell" >
                                                <div class="data-row" v-for="(item, index) in pirdata_" :key="index">
                                                    <div class="days-cell" v-html="item.day"></div>
                                                    <div class="header-cell" v-for="(data, index) in item.data" :key="index">
                                                        <span>
                                                            <em v-for="(value, index) in data.value" :key="index" v-html="value"></em>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                        </div>
                                    </div>
                                </div>
                                <div class="morebtn">
                                    <button type="button" class="btn sm">더보기</button>
                                </div>
                            </template>
                        </TabContent>
                    </div>
                </div>
            </div>
        </div>
        <!-- 도움말 영역 모바일 22.03.30 -->
        <div class="helptxtbox mobile">
            <div class="tit">KB아파트담보대출PIR를 이해해봅시다!</div>
            <div class="txt">
                <strong>PIR(Price to income ratio)= 주택가격/가구소득</strong><br>
                PIR은 주택가격을 가구소득으로 나눈 값입니다. (PIR이 10이라면 주택가격은 연소득의 10배입니다.) 가구소득은 분기단위 해당 지역 내 KB국민은행 부동산담보대출(아파트) 대출자의 연소득 중위값이며 주택가격은 분기단위 해당 지역 내 KB국민은행 부동산담보대출(아파트) 실행시 조사된 담보평가 가격의 중위값입니다. (KB아파트담보대출PIR은 실제 KB국민은행의 대출거래 정보로 작성된 지수로 기존 당행에서 발표중인 PIR과는 차이가 있습니다.)
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
    data() {
        return {
            // 카드레이어 옵션
            optionList: [
                {text: '인쇄', type: 'print'},
                {text: '화면 캡쳐', type: 'capture'},
                {text: '엑셀 저장', type: 'excel'}
            ],
            tabtextsType1: ['서울', '경기', '인천'],
            locations: [
                {area: '서울', active: true},
                {area: '경기', active: true},
                {area: '인천', active: true}
            ],
            chartdatas: [
                {
                    location: '서울',
                    value: ['5,519', '73,750', '13.4']
                },
                {
                    location: '경기',
                    value: ['5,519', '73,750', '13.4']
                },
                {
                    location: '인천',
                    value: ['5,519', '73,750', '13.4']
                }
            ],
            chartdatas_: [],
            guidetip1: true,
            guidetip2: true,
            pirdays: ['’21 2Q', '’21 3Q'],
            pirdatas: [
                {
                    day: '’21 2Q',
                    data:
                    [
                        {
                            location: '서울',
                            value: ['5,519_seoul', '73,750', '13.4']
                        },
                        {
                            location: '경기',
                            value: ['5,519_gyeonggi', '73,750', '13.4']
                        },
                        {
                            location: '인천',
                            value: ['5,519_inchon', '73,750', '13.4']
                        }
                    ]

                },
                {
                    day: '’21 3Q',
                    data:
                    [
                        {
                            location: '서울',
                            value: ['5,519', '73,750', '13.4']
                        },
                        {
                            location: '경기',
                            value: ['5,519', '73,750', '13.4']
                        },
                        {
                            location: '인천',
                            value: ['5,519', '73,750', '13.4']
                        }
                    ]

                },
                {
                    day: '’21 3Q',
                    data:
                    [
                        {
                            location: '서울',
                            value: ['5,519', '73,750', '13.4']
                        },
                        {
                            location: '경기',
                            value: ['5,519', '73,750', '13.4']
                        },
                        {
                            location: '인천',
                            value: ['5,519', '73,750', '13.4']
                        }
                    ]

                },
                {
                    day: '’21 3Q',
                    data:
                    [
                        {
                            location: '서울',
                            value: ['5,519', '73,750', '13.4']
                        },
                        {
                            location: '경기',
                            value: ['5,519', '73,750', '13.4']
                        },
                        {
                            location: '인천',
                            value: ['5,519', '73,750', '13.4']
                        }
                    ]

                },
                {
                    day: '’21 3Q',
                    data:
                    [
                        {
                            location: '서울',
                            value: ['5,519', '73,750', '13.4']
                        },
                        {
                            location: '경기',
                            value: ['5,519', '73,750', '13.4']
                        },
                        {
                            location: '인천',
                            value: ['5,519', '73,750', '13.4']
                        }
                    ]

                },
                {
                    day: '’21 3Q',
                    data:
                    [
                        {
                            location: '서울',
                            value: ['5,519', '73,750', '13.4']
                        },
                        {
                            location: '경기',
                            value: ['5,519', '73,750', '13.4']
                        },
                        {
                            location: '인천',
                            value: ['5,519', '73,750', '13.4']
                        }
                    ]

                },
                {
                    day: '’21 3Q',
                    data:
                    [
                        {
                            location: '서울',
                            value: ['5,519', '73,750', '13.4']
                        },
                        {
                            location: '경기',
                            value: ['5,519', '73,750', '13.4']
                        },
                        {
                            location: '인천',
                            value: ['5,519', '73,750', '13.4']
                        }
                    ]

                },
                {
                    day: '’21 3Q',
                    data:
                    [
                        {
                            location: '서울',
                            value: ['5,519', '73,750', '13.4']
                        },
                        {
                            location: '경기',
                            value: ['5,519', '73,750', '13.4']
                        },
                        {
                            location: '인천',
                            value: ['5,519', '73,750', '13.4']
                        }
                    ]

                },
                {
                    day: '’21 3Q',
                    data:
                    [
                        {
                            location: '서울',
                            value: ['5,519', '73,750', '13.4']
                        },
                        {
                            location: '경기',
                            value: ['5,519', '73,750', '13.4']
                        },
                        {
                            location: '인천',
                            value: ['5,519', '73,750', '13.4']
                        }
                    ]

                },
                {
                    day: '’21 3Q',
                    data:
                    [
                        {
                            location: '서울',
                            value: ['5,519', '73,750', '13.4']
                        },
                        {
                            location: '경기',
                            value: ['5,519', '73,750', '13.4']
                        },
                        {
                            location: '인천',
                            value: ['5,519', '73,750', '13.4']
                        }
                    ]

                },
                {
                    day: '’21 3Q',
                    data:
                    [
                        {
                            location: '서울',
                            value: ['5,519', '73,750', '13.4']
                        },
                        {
                            location: '경기',
                            value: ['5,519', '73,750', '13.4']
                        },
                        {
                            location: '인천',
                            value: ['5,519', '73,750', '13.4']
                        }
                    ]

                },
                {
                    day: '’21 3Q',
                    data:
                    [
                        {
                            location: '서울',
                            value: ['5,519', '73,750', '13.4']
                        },
                        {
                            location: '경기',
                            value: ['5,519', '73,750', '13.4']
                        },
                        {
                            location: '인천',
                            value: ['5,519', '73,750', '13.4']
                        }
                    ]

                }
            ],
            pirdata_: [],
            pirLocation: '서울',
            scrollrow: true,
            selectedNum: 2,
            height1: 0,
            height2: 0,
            height3: 0,
            height4: 0,
            anyTimer: null,
            scroll: false
        };
    },
    created() {
        this.chartdatas_ = this.chartdatas;
        this.pirdatas.forEach((item) => {
            item.data.forEach((value) => {
                if (value.location.indexOf('서울') === 0) {
                    this.pirdata_.push({'day': item.day, 'data': [value]});
                }
                return value;
            });
            return item;
        });
    },
    mounted() {
        this.height1 = 20;
        this.height2 = 90;
        this.height3 = 80;
        this.height4 = 60;
        clearTimeout(this.aniimer);
        this.aniTimer = setTimeout(() => {
            document.querySelector('.graphbox').classList.add('active');
        }, 600);
        window.addEventListener('scroll', this.handleScroll);
        $(this.$el).find('.scrollin-pir > .scrollbar-outer > .scroll-wrapper > .scroll-content').on('scroll', this.handleScroll);
    },
    destroyed() {
        window.removeEventListener('scroll', this.handleScroll);
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
        //퉅팁
        Tipclose(type)  {
            if (type === 'guidetip1') {
                this.guidetip1 = false;
            } else if (type === 'guidetip2') {
                this.guidetip2 = false;
            }
        },
        //버튼 active
        activebtn(type, idx) {
            if (type === 'button') {
                this.locations.forEach((item, index) => {
                    if (index === idx) {
                        if (item.active === true) {
                            item.active = false;
                        } else {
                            item.active = true;
                        }
                    }
                    return item;
                });
            }
            
            
        },
        //탭 콘텐츠 컴포넌트
        tabClick(parm) {
            let location = this.tabtextsType1[parm];
            this.tableSet(location);
        },
        // Tap 테이블 체크
        tableSet(listname) {
            this.pirdata_ = [];
            if (listname === '서울') {
                this.pirLocation = listname;
                this.Tablereset(this.pirdatas, this.pirdata_, listname);
            } else if (listname === '경기') {
                this.pirLocation = listname;
                this.Tablereset(this.pirdatas, this.pirdata_, listname);
            } else if (listname === '인천') {
                this.pirLocation = listname;
                this.Tablereset(this.pirdatas, this.pirdata_, listname);
            }
        },
        // Tap 테이블 데이터  setting
        Tablereset(listdata, _listdata, listname) {
            listdata.forEach((item) => {
                item.data.forEach((value) => {
                    if (value.location.indexOf(listname) === 0) {
                        _listdata.push({'day': item.day, 'data': [value]});
                    }
                    return value;
                });
                return item;
            });
        },
        // 테이블 스크롤
        handleScroll(event) {
            event.target.scrollTop > 37 ? this.scroll = true : this.scroll = false;
        }
    }
};
</script>