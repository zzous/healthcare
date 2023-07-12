<template>
    <div class="investtable" >
        <div class="mainTitle">
            <h1 class="titdepth1">투자 테이블</h1>
            <div role="tablist" class="tabbox tabtype1">
                <span role="button" class="tab" :class="{active:!aptTable}" @click="tableSetting($event, 'aptTable')">지역 찾기</span>
                <span role="button" class="tab" :class="{active:aptTable}" @click="tableSetting($event,'aptTable')">아파트 찾기</span>

                <!-- 지역 찾기 비활성화 클래스 disabled 추가 :: 오픈임시가이드 22.04.15 -->
                <!-- <span role="button" class="tab disabled">지역 찾기</span> -->
            </div>
            
            <!-- 지역찾기 탭 툴팁 :: 오픈임시가이드 22.04.15 -->
            <!-- <div role="tooltip" name="openGuide1" class="tooltip bottom">
                <span aria-hidden="true" class="arrow"></span>
                <div class="flexbox">
                    <p>지역찾기 서비스는 준비중입니다.</p>
                </div>
            </div> -->
            <!-- 도움말 위치 변경 22.03.07 -->
            <div class="tiparea">
                <button type="button" :class="['btn','btn-tip','arw' , {down:!tooltip},{up:tooltip}]" @click="toggleClick('tooltip')"><span class="txt">내게 꼭 맞는</span> 지역과 아파트 찾기 TIP!</button>
                <!-- 도움말 창-->
                <div class="tiphelplayer" v-if="tooltip">
                    <div class="tiphelpcont">
                        <div class="titbox">
                            <button type="button" class="btn btn-popclose" title="닫기"  @click="toggleClick('tooltip')"></button>
                            <div class="tit">내게 꼭 맞는 지역과 아파트를 찾을 수 있게 도와드려요.</div>
                        </div>
                        <div class="contbox">
                            <div class="steplist">
                                <div class="steprow">
                                    <div class="stepnum one">STEP <span class="num">1</span></div>
                                    <div>상단의 ‘지역 찾기’와 ‘아파트 찾기’ 중 원하는 탭을 선택하세요.</div>
                                </div>
                                <div class="steprow">
                                    <div class="stepnum two">STEP <span class="num">2</span></div>
                                    <div>지역추가/선택으로 찾고자하는
                                        지역을 설정 후, 기간선택으로 데이터
                                        기준일과 증감률 기간을 설정하세요.</div>
                                </div>
                                <div class="steprow">
                                    <div class="stepnum three">STEP <span class="num">3</span></div>
                                    <div>녹색필터에 원하시는 조건을 자유롭게 입력해서 조회결과 리스트를 좁혀나가 보세요.</div>
                                </div>
                            </div>
                            <div class="tiptxtbox">
                                <span class="tip">TIP!</span>
                                <p>조회결과 리스트에서 원하는 지역이나 아파트 행을
                                    선택하면 그래프로 시계열 추이를 확인할 수 있어요. </p>
                                <p>초기화를 원할 경우 필터초기화 버튼을 눌러보세요. </p>
                                <p>순서이동 버튼으로 조회결과 데이터 순서를 내가 원하는 순서로 변경해 보실 수 있어요.</p>
                            </div>
                            <div class="tipnotitxt">※ KB시세·통계 데이터는 매주 업데이트 되며, 광역시도/시군구/읍면동 단위로 제공됩니다. (거래량, 미분양물량 의 경우 매월 업데이트 및 광역시도/시군구 까지 제공)</div>

                        </div>
                    </div>
                </div>
                <!-- // 도움말 창-->
            </div>
            <ShareCommon
                :pageurl ="this.$router.currentRoute.path"
            />
        </div>
        <div class="cardbox botnone">
            <!-- 타이틀 삭제, 도움말TIP 상단으로 위치 변경 22.03.07
            <div class="cardtit invest">
                <h1 class="titdepth2">지역 찾기</h1>
            </div> -->
            <div class="topselarea">
                <div class="selectbox type2">
                    <span class="value txt arw" :class="[{down:!selecticon},{up:selecticon}]" @click="ToggleLayer('selectLocation', 'selecticon', 'open')">지역추가</span>
                </div>
                <div>
                    <span class="seltxt">증감률 기간</span>
                    <div class="pickerarea" :class="{active:datepickericon}"  @click="ToggleLayer('datepickerLayer', 'datepickericon','open')">
                        <div class="pickerselect-text">{{starttime}}~{{endtime}}</div>
                        <button class="iconbtn btn-picker" :class="{active:datepickericon}"></button>
                    </div>
                </div>
                <div class="listbtn">
                    <button type="button" class="btn textline active" @click="typeSetting($event, '.listbtn .btn')">1년</button>
                    <button type="button" class="btn textline" @click="typeSetting($event, '.listbtn .btn')">6개월</button>
                    <button type="button" class="btn textline" @click="typeSetting($event, '.listbtn .btn')">3개월</button>
                    <button type="button" class="btn textline" @click="typeSetting($event, '.listbtn .btn')">1개월</button>
                    <button type="button" class="btn textline" @click="typeSetting($event, '.listbtn .btn')">1주</button>
                </div>
            </div>
            <div class="searchinfofilter">
                <span class="alltxt line">총 73개</span>
                <button type="button" class="btn btn-tag" @click="activeToggle($event, 'active');">#매매지수 상승 2%이상</button>
                <button type="button" class="btn btn-tag" @click="activeToggle($event, 'active');">#전세가율60%이상</button>
                <button type="button" class="btn btn-tag" @click="activeToggle($event, 'active');">#평당2천이하</button>
                <template v-for="(item, idx) in mycharttags" >
                    <span :key="item">
                        <!-- my차트에 저장한 상태에서 화면에 적용된 my차트태그는 클래스 selected 추가 -->
                        <button type="button" class="btn btn-mychart" v-html="item" @click="activeToggle($event, 'active');" ></button>
                        <button type="button" class="iconbtn btn-myclose" title="MY차트 삭제" @click="delpopup(idx)"></button>
                    </span>
                </template>
                <button type="button" class="btn btn-mychart icoplus" @click="openModal('mychart')">MY필터</button>
                <div class="tablecontrol">
                    <button  @click="openModal('orderTable')">데이터 순서 이동</button>
                    <button>필터초기화</button>
                    <span>2021.11.17 기준</span>
                </div>
            </div>
            <!-- 지역 설정 레이어 -->
            <div class="setlayer dateareaset invest" v-if="selectLocation" style="display:none;">
                <div class="setbody">
                    <!-- 지역전체 선택하기 -->
                    <div role="tabpanel" class="stepselectbox single">
                        <div class="stepselect">
                            <jQueryScrollbar :useCtrl="{direction: 'x',customClass:'typeBig' }">
                                <div class="btnselect all">
                                    <span role="button" class="add" title="지역추가"></span>
                                    <span role="button" class="txt" title="하위지역보기">전국</span>
                                </div>
                                <div class="btnselect">
                                    <span role="button" class="add" title="지역추가"></span>
                                    <span role="button" class="txt" title="하위지역보기">서울</span>
                                </div>
                                <div class="btnselect">
                                    <span role="button" class="add" title="선택된지역"></span>
                                    <span role="button" class="txt" title="하위지역보기">부산</span>
                                </div>
                                <div class="btnselect">
                                    <span role="button" class="add" title="지역추가"></span>
                                    <span role="button" class="txt" title="하위지역보기">대구</span>
                                </div>
                                <div class="btnselect">
                                    <span role="button" class="add" title="지역추가"></span>
                                    <span role="button" class="txt" title="하위지역보기">인천</span>
                                </div>
                                <div class="btnselect">
                                    <span role="button" class="add" title="지역추가"></span>
                                    <span role="button" class="txt" title="하위지역보기">광주</span>
                                </div>
                                <div class="btnselect">
                                    <span role="button" class="add" title="지역추가"></span>
                                    <span role="button" class="txt" title="하위지역보기">대전</span>
                                </div>
                                <div class="btnselect">
                                    <span role="button" class="add" title="지역추가"></span>
                                    <span role="button" class="txt" title="하위지역보기">울산</span>
                                </div>
                                <div class="btnselect">
                                    <span role="button" class="add" title="지역추가"></span>
                                    <span role="button" class="txt" title="하위지역보기">세종</span>
                                </div>
                                <div class="btnselect selected">
                                    <span role="button" class="add" title="지역추가"></span>
                                    <span role="button" class="txt" title="하위지역보기">경기</span>
                                </div>
                                <div class="btnselect">
                                    <span role="button" class="add" title="지역추가"></span>
                                    <span role="button" class="txt" title="하위지역보기">강원</span>
                                </div>
                                <div class="btnselect">
                                    <span role="button" class="add" title="지역추가"></span>
                                    <span role="button" class="txt" title="하위지역보기">충북</span>
                                </div>
                                <div class="btnselect">
                                    <span role="button" class="add" title="지역추가"></span>
                                    <span role="button" class="txt" title="하위지역보기">충남</span>
                                </div>
                                <div class="btnselect">
                                    <span role="button" class="add" title="지역추가"></span>
                                    <span role="button" class="txt" title="하위지역보기">전북</span>
                                </div>
                                <div class="btnselect">
                                    <span role="button" class="add" title="지역추가"></span>
                                    <span role="button" class="txt" title="하위지역보기">전남</span>
                                </div>
                                <div class="btnselect">
                                    <span role="button" class="add" title="지역추가"></span>
                                    <span role="button" class="txt" title="하위지역보기">경북</span>
                                </div>
                                <div class="btnselect">
                                    <span role="button" class="add" title="지역추가"></span>
                                    <span role="button" class="txt" title="하위지역보기">경남</span>
                                </div>
                                <div class="btnselect">
                                    <span role="button" class="add" title="지역추가"></span>
                                    <span role="button" class="txt" title="하위지역보기">제주</span>
                                </div>
                            </jQueryScrollbar>
                        </div>
                        <div class="stepselect">
                            <!-- 하위 지역이 없을 때 -->
                            <!-- <p class="nonecont">시/군/구</p> -->
                            <jQueryScrollbar :useCtrl="{direction: 'x',customClass:'typeBig' }">
                                <div class="btnselect">
                                    <span role="button" class="add" title="지역추가"></span>
                                    <span role="button" class="txt" title="하위지역보기">강남구</span>
                                </div>
                                <div class="btnselect">
                                    <span role="button" class="add" title="지역추가"></span>
                                    <span role="button" class="txt" title="하위지역보기">강동구</span>
                                </div>
                                <div class="btnselect">
                                    <span role="button" class="add" title="지역추가"></span>
                                    <span role="button" class="txt" title="하위지역보기">강북구</span>
                                </div>
                                <div class="btnselect">
                                    <span role="button" class="add" title="지역추가"></span>
                                    <span role="button" class="txt" title="하위지역보기">강서구</span>
                                </div>
                                <div class="btnselect">
                                    <span role="button" class="add" title="지역추가"></span>
                                    <span role="button" class="txt" title="하위지역보기">관악구</span>
                                </div>
                                <div class="btnselect">
                                    <span role="button" class="add" title="지역추가"></span>
                                    <span role="button" class="txt" title="하위지역보기">창원시 마산합포구</span>
                                </div>
                                <div class="btnselect">
                                    <span role="button" class="add" title="지역추가"></span>
                                    <span role="button" class="txt" title="하위지역보기">구로구</span>
                                </div>
                                <div class="btnselect">
                                    <span role="button" class="add" title="지역추가"></span>
                                    <span role="button" class="txt" title="하위지역보기">금천구</span>
                                </div>
                                <div class="btnselect">
                                    <span role="button" class="add" title="지역추가"></span>
                                    <span role="button" class="txt" title="하위지역보기">노원구</span>
                                </div>
                                <div class="btnselect">
                                    <span role="button" class="add" title="지역추가"></span>
                                    <span role="button" class="txt" title="하위지역보기">도봉구</span>
                                </div>
                                <div class="btnselect">
                                    <span role="button" class="add" title="지역추가"></span>
                                    <span role="button" class="txt" title="하위지역보기">동대문구</span>
                                </div>
                                <div class="btnselect">
                                    <span role="button" class="add" title="지역추가"></span>
                                    <span role="button" class="txt" title="하위지역보기">동작구</span>
                                </div>
                                <div class="btnselect">
                                    <span role="button" class="add" title="지역추가"></span>
                                    <span role="button" class="txt" title="하위지역보기">마포구</span>
                                </div>
                                <div class="btnselect">
                                    <span role="button" class="add" title="지역추가"></span>
                                    <span role="button" class="txt" title="하위지역보기">서대문구</span>
                                </div>
                                <div class="btnselect">
                                    <span role="button" class="add" title="지역추가"></span>
                                    <span role="button" class="txt" title="하위지역보기">서초구</span>
                                </div>
                                <div class="btnselect">
                                    <span role="button" class="add" title="지역추가"></span>
                                    <span role="button" class="txt" title="하위지역보기">성동구</span>
                                </div>
                                <div class="btnselect">
                                    <span role="button" class="add" title="지역추가"></span>
                                    <span role="button" class="txt" title="하위지역보기">성북구</span>
                                </div>
                                <div class="btnselect">
                                    <span role="button" class="add" title="지역추가"></span>
                                    <span role="button" class="txt" title="하위지역보기">송파구</span>
                                </div>
                                <div class="btnselect">
                                    <span role="button" class="add" title="지역추가"></span>
                                    <span role="button" class="txt" title="하위지역보기">양천구</span>
                                </div>
                            </jQueryScrollbar>
                        </div>
                        <div class="stepselect">
                            <jQueryScrollbar :useCtrl="{direction: 'x',customClass:'typeBig' }">
                                <div class="btnselect">
                                    <span role="button" class="add" title="지역추가"></span>
                                    <span role="button" class="txt" title="하위지역보기">동전체</span>
                                </div>
                            </jQueryScrollbar>
                        </div>
                    </div>
                    <!-- 태그이동 -->
                    <div class="areagroup"  v-if="!aptTable"> <!--22.02.29 지역찾기에서만 보여지기 -->
                        <div class="tag round">전국 <span role="button" class="icodel" title="선택 삭제"></span></div>
                        <div class="tag round">서울시 <span role="button" class="icodel" title="선택 삭제"></span></div>
                        <div class="tag round">서울시 강남구 <span role="button" class="icodel" title="선택 삭제"></span></div>
                        <div class="tag round">서울시 서초구 <span role="button" class="icodel" title="선택 삭제"></span></div>
                        <div class="tag round">서울시 송파구 <span role="button" class="icodel" title="선택 삭제"></span></div>
                    </div>
                </div>
                <div class="setfoot">
                    <span class="notitxt" v-if="aptTable">1개 지역만 선택 가능합니다.</span><!--22.02.29 아파트찾기에서만 보여지기 -->
                    <button type="button" class="btn md round blueline" @click="toggleClick('selectLocation')">취소</button>
                    <button type="button" class="btn md round blue" @click="toggleClick('selectLocation')">확인</button>
                </div>
            </div>
            <!-- 달력 레이어 -->
            <div class="subsetlayer invest" v-if="datepickerLayer" style="display:none;">
                <div class="DatePickerwrap">
                    <div>
                        <div class="daytext">
                            <span>시작일</span>
                            {{starttime}}
                        </div>
                        <DatePicker
                            inline
                            v-model="starttime"
                            valueType="format"
                            :lang="{monthFormat:'MM', monthBeforeYear:false}"
                            class="customPicker"
                        />
                    </div>
                    <div>
                        <div class="daytext">
                            <span>종료일</span>
                            {{endtime}}
                        </div>
                        <DatePicker
                            inline
                            v-model="endtime"
                            valueType="format"
                            :lang="{monthFormat:'MM', monthBeforeYear:false}"
                            class="customPicker"
                        />
                    </div>
                </div>
                <div class="setfoot line">
                    <button type="button" class="btn md round blueline" @click="ToggleLayer('datepickerLayer', 'datepickericon','close')">취소</button>
                    <button type="button" class="btn md round blue">선택</button>
                </div>
            </div>


            <!-- 2022.03.04 변경된 UI 퍼블반영 :: 지역 설정 레이어 -->
            <div class="setLayer dateareaset invest" v-if="selectLocation">
                <div class="setHead">
                    <button type="button" class="btn btn-popclose" title="닫기" @click="toggleClick('selectLocation')"> 닫기</button>
                    <strong>설정</strong>
                    <span class="notitxt" v-if="aptTable">1개 지역만 선택 가능합니다.</span><!--22.02.29 아파트찾기에서만 보여지기 -->
                </div>
                <div class="setBody">
                    <!-- 지역전체 선택하기 -->
                    <div class="flexbox">
                        <div class="datagroup">
                            <div class="stepAreabox">
                                <div class="stepbox">
                                    <div class="selectbtn all">
                                        <span role="button" class="add" title="지역추가"></span>
                                        <span role="button" class="txt" title="하위지역보기">전국</span>
                                    </div>
                                    <div class="selectbtn selected">
                                        <span role="button" class="add" title="지역추가"></span>
                                        <span role="button" class="txt" title="하위지역보기">서울</span>
                                    </div>
                                    <div class="selectbtn">
                                        <span role="button" class="add" title="선택된지역"></span>
                                        <span role="button" class="txt" title="하위지역보기">부산</span>
                                    </div>
                                    <div class="selectbtn">
                                        <span role="button" class="add" title="지역추가"></span>
                                        <span role="button" class="txt" title="하위지역보기">대구</span>
                                    </div>
                                    <div class="selectbtn">
                                        <span role="button" class="add" title="지역추가"></span>
                                        <span role="button" class="txt" title="하위지역보기">인천</span>
                                    </div>
                                    <div class="selectbtn">
                                        <span role="button" class="add" title="지역추가"></span>
                                        <span role="button" class="txt" title="하위지역보기">광주</span>
                                    </div>
                                    <div class="selectbtn">
                                        <span role="button" class="add" title="지역추가"></span>
                                        <span role="button" class="txt" title="하위지역보기">대전</span>
                                    </div>
                                    <div class="selectbtn">
                                        <span role="button" class="add" title="지역추가"></span>
                                        <span role="button" class="txt" title="하위지역보기">울산</span>
                                    </div>
                                    <div class="selectbtn">
                                        <span role="button" class="add" title="지역추가"></span>
                                        <span role="button" class="txt" title="하위지역보기">세종</span>
                                    </div>
                                    <div class="selectbtn selected">
                                        <span role="button" class="add" title="지역추가"></span>
                                        <span role="button" class="txt" title="하위지역보기">경기</span>
                                    </div>
                                    <div class="selectbtn">
                                        <span role="button" class="add" title="지역추가"></span>
                                        <span role="button" class="txt" title="하위지역보기">강원</span>
                                    </div>
                                    <div class="selectbtn">
                                        <span role="button" class="add" title="지역추가"></span>
                                        <span role="button" class="txt" title="하위지역보기">충북</span>
                                    </div>
                                    <div class="selectbtn">
                                        <span role="button" class="add" title="지역추가"></span>
                                        <span role="button" class="txt" title="하위지역보기">충남</span>
                                    </div>
                                    <div class="selectbtn">
                                        <span role="button" class="add" title="지역추가"></span>
                                        <span role="button" class="txt" title="하위지역보기">전북</span>
                                    </div>
                                    <div class="selectbtn">
                                        <span role="button" class="add" title="지역추가"></span>
                                        <span role="button" class="txt" title="하위지역보기">전남</span>
                                    </div>
                                    <div class="selectbtn">
                                        <span role="button" class="add" title="지역추가"></span>
                                        <span role="button" class="txt" title="하위지역보기">경북</span>
                                    </div>
                                    <div class="selectbtn">
                                        <span role="button" class="add" title="지역추가"></span>
                                        <span role="button" class="txt" title="하위지역보기">경남</span>
                                    </div>
                                    <div class="selectbtn">
                                        <span role="button" class="add" title="지역추가"></span>
                                        <span role="button" class="txt" title="하위지역보기">제주</span>
                                    </div>
                                </div>
                                <div class="stepbox">
                                    <!-- 하위 지역이 없을 때 -->
                                    <!-- <p class="nonecont">시/군/구</p> -->
                                    <jQueryScrollbar>
                                        <div class="selectbtn selected">
                                            <span role="button" class="add" title="지역추가"></span>
                                            <span role="button" class="txt" title="하위지역보기">구 전체</span>
                                        </div>
                                        <div class="selectbtn">
                                            <span role="button" class="add" title="지역추가"></span>
                                            <span role="button" class="txt" title="하위지역보기">강남구</span>
                                        </div>
                                        <div class="selectbtn">
                                            <span role="button" class="add" title="지역추가"></span>
                                            <span role="button" class="txt" title="하위지역보기">강동구</span>
                                        </div>
                                        <div class="selectbtn">
                                            <span role="button" class="add" title="지역추가"></span>
                                            <span role="button" class="txt" title="하위지역보기">강북구</span>
                                        </div>
                                        <div class="selectbtn">
                                            <span role="button" class="add" title="지역추가"></span>
                                            <span role="button" class="txt" title="하위지역보기">강서구</span>
                                        </div>
                                        <div class="selectbtn">
                                            <span role="button" class="add" title="지역추가"></span>
                                            <span role="button" class="txt" title="하위지역보기">관악구</span>
                                        </div>
                                        <div class="selectbtn">
                                            <span role="button" class="add" title="지역추가"></span>
                                            <span role="button" class="txt" title="하위지역보기">구로구</span>
                                        </div>
                                        <div class="selectbtn">
                                            <span role="button" class="add" title="지역추가"></span>
                                            <span role="button" class="txt" title="하위지역보기">금천구</span>
                                        </div>
                                        <div class="selectbtn">
                                            <span role="button" class="add" title="지역추가"></span>
                                            <span role="button" class="txt" title="하위지역보기">노원구</span>
                                        </div>
                                        <div class="selectbtn">
                                            <span role="button" class="add" title="지역추가"></span>
                                            <span role="button" class="txt" title="하위지역보기">도봉구</span>
                                        </div>
                                        <div class="selectbtn">
                                            <span role="button" class="add" title="지역추가"></span>
                                            <span role="button" class="txt" title="하위지역보기">동대문구</span>
                                        </div>
                                        <div class="selectbtn">
                                            <span role="button" class="add" title="지역추가"></span>
                                            <span role="button" class="txt" title="하위지역보기">동작구</span>
                                        </div>
                                        <div class="selectbtn">
                                            <span role="button" class="add" title="지역추가"></span>
                                            <span role="button" class="txt" title="하위지역보기">마포구</span>
                                        </div>
                                        <div class="selectbtn">
                                            <span role="button" class="add" title="지역추가"></span>
                                            <span role="button" class="txt" title="하위지역보기">서대문구</span>
                                        </div>
                                        <div class="selectbtn">
                                            <span role="button" class="add" title="지역추가"></span>
                                            <span role="button" class="txt" title="하위지역보기">서초구</span>
                                        </div>
                                        <div class="selectbtn">
                                            <span role="button" class="add" title="지역추가"></span>
                                            <span role="button" class="txt" title="하위지역보기">성동구</span>
                                        </div>
                                        <div class="selectbtn">
                                            <span role="button" class="add" title="지역추가"></span>
                                            <span role="button" class="txt" title="하위지역보기">성북구</span>
                                        </div>
                                        <div class="selectbtn">
                                            <span role="button" class="add" title="지역추가"></span>
                                            <span role="button" class="txt" title="하위지역보기">송파구</span>
                                        </div>
                                        <div class="selectbtn">
                                            <span role="button" class="add" title="지역추가"></span>
                                            <span role="button" class="txt" title="하위지역보기">양천구</span>
                                        </div>
                                    </jQueryScrollbar>
                                </div>
                                <div class="stepbox">
                                    <p class="nonecont">읍/면/동</p>
                                </div>
                            </div>
                        </div>
                        <!-- 태그이동 -->
                        <div class="datataggroup" v-if="!aptTable"> <!--22.02.29 지역찾기에서만 보여지기 -->
                            <jQueryScrollbar :maxHeight="'250px'">
                                <div class="areatagbox">
                                    <div class="dragTag">서울시 구 전체<span role="button" class="icodel" title="선택 삭제"></span></div>
                                </div>
                            </jQueryScrollbar>
                            <p class="guideinfo icoinfo1">드래그로 순서를 변경할 수 있어요</p>
                            <button type="button" class="btn-reset type2">초기화</button>
                        </div>
                    </div>
                </div>
                <div class="setFoot line">
                    <button type="button" class="btn round r30 grayline" @click="toggleClick('selectLocation')">취소</button>
                    <button type="button" class="btn round r30 blue" @click="toggleClick('selectLocation')">확인</button>
                </div>
            </div>
            <!-- 2022.03.04 변경된 UI 퍼블반영 :: 달력 레이어 -->
            <div class="subsetlayer invest" v-if="datepickerLayer">
                <div class="DatePickerwrap Allpicker">
                    <div>
                        <div class="daytext">
                            <span>시작일</span>
                            {{starttime}}
                        </div>
                        <DatePicker
                            inline
                            v-model="starttime"
                            valueType="format"
                            :lang="{monthFormat:'MM', monthBeforeYear:false}"
                            class="customPicker"
                        />
                    </div>
                    <div>
                        <div class="daytext">
                            <span>종료일</span>
                            {{endtime}}
                        </div>
                        <DatePicker
                            inline
                            v-model="endtime"
                            valueType="format"
                            :lang="{monthFormat:'MM', monthBeforeYear:false}"
                            class="customPicker"
                        />
                    </div>
                </div>
                <div class="setFoot line">
                    <button type="button" class="btn round r30 grayline" @click="ToggleLayer('datepickerLayer', 'datepickericon','close')">취소</button>
                    <button type="button" class="btn round r30 blue">선택</button>
                </div>
            </div>
            
            <!-- 지역 테이블 영역 -->
            <div class="tableArea" ref="tableTop" v-if="!aptTable">
                <div class="gridTableWrap"  v-if="!(tableitemsbody.length===0)">
                    <jQueryGridScrollbar  ref="gridScroll" class="gridScroll"
                        :maxWidth="'100%'"
                        :maxHeight="winheight +120+'px'"
                        :scrollMaxWidth="'100%'"
                        :scrollMaxHeight="winheight+ 'px'"
                        :useCtrl="{direction: 'x',customClass:'typesmall' }"
                    >
                        <template slot="gHead">
                            <div ref="tHead" class="gHead" :style="{ transform: `translateX(${-cScrollLeft}px)`}">
                                <div class="head">
                                    <div class="headin">
                                        <div class="headitem">
                                            <div class="hi-tit">아파트 매매가격지수</div>
                                            <div class="hi-subtit">
                                                <div>지수</div>
                                                <div>증감률(%)</div>
                                            </div>
                                            <div class="fonmhead">
                                                <div>
                                                    <div class="tableinputbox">
                                                        <input type="text">
                                                        <em>~</em>
                                                        <input type="text">
                                                    </div>
                                                </div>
                                                <div>
                                                    <div class="tableinputbox">
                                                        <input type="text">
                                                        <em>~</em>
                                                        <input type="text">
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="headitem">
                                            <div class="hi-tit">공급3.3㎡당 매매 평균가격 <button class="btn-change iconbtn type1 "></button></div>
                                            <div class="hi-subtit">
                                                <div>가격(만원)</div>
                                                <div>증감률(%)</div>
                                            </div>
                                            <div class="fonmhead">
                                                <div>
                                                    <div class="tableinputbox">
                                                        <input type="text">
                                                        <em>~</em>
                                                        <input type="text">
                                                    </div>
                                                </div>
                                                <div>
                                                    <div class="tableinputbox">
                                                        <input type="text">
                                                        <em>~</em>
                                                        <input type="text">
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="headitem">
                                            <div class="hi-tit">전세가율</div>
                                            <div class="hi-subtit">
                                                <div>전세가율(%)</div>
                                                <div>증감률(%)</div>
                                            </div>
                                            <div class="fonmhead">
                                                <div>
                                                    <div class="tableinputbox">
                                                        <input type="text">
                                                        <em>~</em>
                                                        <input type="text">
                                                    </div>
                                                </div>
                                                <div>
                                                    <div class="tableinputbox">
                                                        <input type="text">
                                                        <em>~</em>
                                                        <input type="text">
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="headitem">
                                            <div class="hi-tit">아파트 전세가격지수</div>
                                            <div class="hi-subtit">
                                                <div>지수</div>
                                                <div>증감률(%)</div>
                                            </div>
                                            <div class="fonmhead">
                                                <div>
                                                    <div class="tableinputbox">
                                                        <input type="text">
                                                        <em>~</em>
                                                        <input type="text">
                                                    </div>
                                                </div>
                                                <div>
                                                    <div class="tableinputbox">
                                                        <input type="text">
                                                        <em>~</em>
                                                        <input type="text">
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="headitem">
                                            <div class="hi-tit">공급3.3㎡당 전세 평균가격 <button class="btn-change iconbtn type1 "></button></div>
                                            <div class="hi-subtit">
                                                <div>가격(만원)</div>
                                                <div>증감률(%)</div>
                                            </div>
                                            <div class="fonmhead">
                                                <div>
                                                    <div class="tableinputbox">
                                                        <input type="text">
                                                        <em>~</em>
                                                        <input type="text">
                                                    </div>
                                                </div>
                                                <div>
                                                    <div class="tableinputbox">
                                                        <input type="text">
                                                        <em>~</em>
                                                        <input type="text">
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="headitem">
                                            <div class="hi-tit">거래량<em>(21년 10월)</em></div>
                                            <div class="hi-subtit">
                                                <div>거래량(건 수)</div>
                                                <div>증감률(%)</div>
                                            </div>
                                            <div class="fonmhead">
                                                <div>
                                                    <div class="tableinputbox">
                                                        <input type="text">
                                                        <em>~</em>
                                                        <input type="text">
                                                    </div>
                                                </div>
                                                <div>
                                                    <div class="tableinputbox">
                                                        <input type="text">
                                                        <em>~</em>
                                                        <input type="text">
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="headitem">
                                            <div class="hi-tit">미분양물량<em>(21년 10월)</em></div>
                                            <div class="hi-subtit">
                                                <div>미분양물량(호)</div><!-- 2022.03.02 퍼블 수정 / 텍스트 수정-->
                                                <div>증감률(%)</div>
                                            </div>
                                            <div class="fonmhead">
                                                <div>
                                                    <div class="tableinputbox">
                                                        <input type="text">
                                                        <em>~</em>
                                                        <input type="text">
                                                    </div>
                                                </div>
                                                <div>
                                                    <div class="tableinputbox">
                                                        <input type="text">
                                                        <em>~</em>
                                                        <input type="text">
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </template>
                        <template slot="gLeft">
                            <div class="gLeft">
                                <div class="head">
                                    <div>지역명</div>
                                    <div class="fonmhead">
                                        <span class="btn-mychart">MY필터</span> <!-- 2022.04.14 퍼블 수정-->
                                    </div>
                                </div>
                                <div class="body" :style="{ transform: `translateY(${-cScrollTop}px)`}">
                                    <div class="bodyitem" v-for="(item, index) in tableitems" :key="index" v-html="item" @click="toggleClassName($event, index, 'active')">강남구 대치동</div>
                                </div>
                            </div>
                        </template>
                        <template slot="gBody" >
                            <div ref="tBody" class="body" >
                                <div class="bodygroup">
                                   <div class="bodyitem" v-for="(item, index) in tableitemsbody" :key="index">
                                       <div v-html="item.num"></div>
                                       <div v-html="item.rate"
                                        :class="[
                                            {blue9:item.rate < -2.667},
                                            {blue8:item.rate >= -2.667 && item.rate < -2.334},
                                            {blue7:item.rate >= -2.334 && item.rate < -2.000},
                                            {blue6:item.rate >= -2.000 && item.rate < -1.667},
                                            {blue5:item.rate >= -1.667 && item.rate < -1.334},
                                            {blue4:item.rate >= -1.334 && item.rate < -1.000},
                                            {blue3:item.rate >= -1.000 && item.rate < -0.667},
                                            {blue2:item.rate >= -0.667 && item.rate < -0.334},
                                            {blue1:item.rate >= -0.334 && item.rate < 0},
                                            {red1:item.rate >= 0 && item.rate < 0.334},
                                            {red2:item.rate >= 0.334 && item.rate < 0.667},
                                            {red3:item.rate >= 0.667 && item.rate < 1.000},
                                            {red4:item.rate >= 1.000 && item.rate < 1.334},
                                            {red5:item.rate >= 1.334 && item.rate < 1.667},
                                            {red6:item.rate >= 1.667 && item.rate < 2.000},
                                            {red7:item.rate >= 2.000 && item.rate < 2.334},
                                            {red8:item.rate >= 2.334 && item.rate < 2.667},
                                            {red9:item.rate >= 2.667},
                                        ]"
                                       ></div>
                                   </div>
                                </div>
                                <div class="bodygroup">
                                   <div class="bodyitem" v-for="(item, index) in tableitemsbody" :key="index">
                                       <div v-html="item.num"></div>
                                       <div v-html="item.rate"
                                        :class="[
                                            {blue9:item.rate < -2.667},
                                            {blue8:item.rate >= -2.667 && item.rate < -2.334},
                                            {blue7:item.rate >= -2.334 && item.rate < -2.000},
                                            {blue6:item.rate >= -2.000 && item.rate < -1.667},
                                            {blue5:item.rate >= -1.667 && item.rate < -1.334},
                                            {blue4:item.rate >= -1.334 && item.rate < -1.000},
                                            {blue3:item.rate >= -1.000 && item.rate < -0.667},
                                            {blue2:item.rate >= -0.667 && item.rate < -0.334},
                                            {blue1:item.rate >= -0.334 && item.rate < 0},
                                            {red1:item.rate >= 0 && item.rate < 0.334},
                                            {red2:item.rate >= 0.334 && item.rate < 0.667},
                                            {red3:item.rate >= 0.667 && item.rate < 1.000},
                                            {red4:item.rate >= 1.000 && item.rate < 1.334},
                                            {red5:item.rate >= 1.334 && item.rate < 1.667},
                                            {red6:item.rate >= 1.667 && item.rate < 2.000},
                                            {red7:item.rate >= 2.000 && item.rate < 2.334},
                                            {red8:item.rate >= 2.334 && item.rate < 2.667},
                                            {red9:item.rate >= 2.667},
                                        ]"
                                       ></div>
                                   </div>
                                </div>
                                <div class="bodygroup">
                                   <div class="bodyitem" v-for="(item, index) in tableitemsbody1" :key="index">
                                       <div v-html="item.num"></div>
                                       <div v-html="item.rate"
                                        :class="[
                                            {blue9:item.rate < -2.667},
                                            {blue8:item.rate >= -2.667 && item.rate < -2.334},
                                            {blue7:item.rate >= -2.334 && item.rate < -2.000},
                                            {blue6:item.rate >= -2.000 && item.rate < -1.667},
                                            {blue5:item.rate >= -1.667 && item.rate < -1.334},
                                            {blue4:item.rate >= -1.334 && item.rate < -1.000},
                                            {blue3:item.rate >= -1.000 && item.rate < -0.667},
                                            {blue2:item.rate >= -0.667 && item.rate < -0.334},
                                            {blue1:item.rate >= -0.334 && item.rate < 0},
                                            {red1:item.rate >= 0 && item.rate < 0.334},
                                            {red2:item.rate >= 0.334 && item.rate < 0.667},
                                            {red3:item.rate >= 0.667 && item.rate < 1.000},
                                            {red4:item.rate >= 1.000 && item.rate < 1.334},
                                            {red5:item.rate >= 1.334 && item.rate < 1.667},
                                            {red6:item.rate >= 1.667 && item.rate < 2.000},
                                            {red7:item.rate >= 2.000 && item.rate < 2.334},
                                            {red8:item.rate >= 2.334 && item.rate < 2.667},
                                            {red9:item.rate >= 2.667},
                                        ]"
                                       ></div>
                                   </div>
                                </div>
                                <div class="bodygroup">
                                   <div class="bodyitem" v-for="(item, index) in tableitemsbody" :key="index">
                                       <div v-html="item.num"></div>
                                       <div v-html="item.rate"
                                        :class="[
                                            {blue9:item.rate < -2.667},
                                            {blue8:item.rate >= -2.667 && item.rate < -2.334},
                                            {blue7:item.rate >= -2.334 && item.rate < -2.000},
                                            {blue6:item.rate >= -2.000 && item.rate < -1.667},
                                            {blue5:item.rate >= -1.667 && item.rate < -1.334},
                                            {blue4:item.rate >= -1.334 && item.rate < -1.000},
                                            {blue3:item.rate >= -1.000 && item.rate < -0.667},
                                            {blue2:item.rate >= -0.667 && item.rate < -0.334},
                                            {blue1:item.rate >= -0.334 && item.rate < 0},
                                            {red1:item.rate >= 0 && item.rate < 0.334},
                                            {red2:item.rate >= 0.334 && item.rate < 0.667},
                                            {red3:item.rate >= 0.667 && item.rate < 1.000},
                                            {red4:item.rate >= 1.000 && item.rate < 1.334},
                                            {red5:item.rate >= 1.334 && item.rate < 1.667},
                                            {red6:item.rate >= 1.667 && item.rate < 2.000},
                                            {red7:item.rate >= 2.000 && item.rate < 2.334},
                                            {red8:item.rate >= 2.334 && item.rate < 2.667},
                                            {red9:item.rate >= 2.667},
                                        ]"
                                       ></div>
                                   </div>
                                </div>
                                <div class="bodygroup">
                                   <div class="bodyitem" v-for="(item, index) in tableitemsbody1" :key="index">
                                       <div v-html="item.num"></div>
                                       <div v-html="item.rate"
                                        :class="[
                                            {blue9:item.rate < -2.667},
                                            {blue8:item.rate >= -2.667 && item.rate < -2.334},
                                            {blue7:item.rate >= -2.334 && item.rate < -2.000},
                                            {blue6:item.rate >= -2.000 && item.rate < -1.667},
                                            {blue5:item.rate >= -1.667 && item.rate < -1.334},
                                            {blue4:item.rate >= -1.334 && item.rate < -1.000},
                                            {blue3:item.rate >= -1.000 && item.rate < -0.667},
                                            {blue2:item.rate >= -0.667 && item.rate < -0.334},
                                            {blue1:item.rate >= -0.334 && item.rate < 0},
                                            {red1:item.rate >= 0 && item.rate < 0.334},
                                            {red2:item.rate >= 0.334 && item.rate < 0.667},
                                            {red3:item.rate >= 0.667 && item.rate < 1.000},
                                            {red4:item.rate >= 1.000 && item.rate < 1.334},
                                            {red5:item.rate >= 1.334 && item.rate < 1.667},
                                            {red6:item.rate >= 1.667 && item.rate < 2.000},
                                            {red7:item.rate >= 2.000 && item.rate < 2.334},
                                            {red8:item.rate >= 2.334 && item.rate < 2.667},
                                            {red9:item.rate >= 2.667},
                                        ]"
                                       ></div>
                                   </div>
                                </div>
                                <div class="bodygroup">
                                   <div class="bodyitem" v-for="(item, index) in tableitemsbody" :key="index">
                                       <div v-html="item.num"></div>
                                       <div v-html="item.rate"
                                        :class="[
                                            {blue9:item.rate < -2.667},
                                            {blue8:item.rate >= -2.667 && item.rate < -2.334},
                                            {blue7:item.rate >= -2.334 && item.rate < -2.000},
                                            {blue6:item.rate >= -2.000 && item.rate < -1.667},
                                            {blue5:item.rate >= -1.667 && item.rate < -1.334},
                                            {blue4:item.rate >= -1.334 && item.rate < -1.000},
                                            {blue3:item.rate >= -1.000 && item.rate < -0.667},
                                            {blue2:item.rate >= -0.667 && item.rate < -0.334},
                                            {blue1:item.rate >= -0.334 && item.rate < 0},
                                            {red1:item.rate >= 0 && item.rate < 0.334},
                                            {red2:item.rate >= 0.334 && item.rate < 0.667},
                                            {red3:item.rate >= 0.667 && item.rate < 1.000},
                                            {red4:item.rate >= 1.000 && item.rate < 1.334},
                                            {red5:item.rate >= 1.334 && item.rate < 1.667},
                                            {red6:item.rate >= 1.667 && item.rate < 2.000},
                                            {red7:item.rate >= 2.000 && item.rate < 2.334},
                                            {red8:item.rate >= 2.334 && item.rate < 2.667},
                                            {red9:item.rate >= 2.667},
                                        ]"
                                       ></div>
                                   </div>
                                </div>
                                <div class="bodygroup">
                                   <div class="bodyitem" v-for="(item, index) in tableitemsbody1" :key="index">
                                       <div v-html="item.num"></div>
                                       <div v-html="item.rate"
                                        :class="[
                                            {blue9:item.rate < -2.667},
                                            {blue8:item.rate >= -2.667 && item.rate < -2.334},
                                            {blue7:item.rate >= -2.334 && item.rate < -2.000},
                                            {blue6:item.rate >= -2.000 && item.rate < -1.667},
                                            {blue5:item.rate >= -1.667 && item.rate < -1.334},
                                            {blue4:item.rate >= -1.334 && item.rate < -1.000},
                                            {blue3:item.rate >= -1.000 && item.rate < -0.667},
                                            {blue2:item.rate >= -0.667 && item.rate < -0.334},
                                            {blue1:item.rate >= -0.334 && item.rate < 0},
                                            {red1:item.rate >= 0 && item.rate < 0.334},
                                            {red2:item.rate >= 0.334 && item.rate < 0.667},
                                            {red3:item.rate >= 0.667 && item.rate < 1.000},
                                            {red4:item.rate >= 1.000 && item.rate < 1.334},
                                            {red5:item.rate >= 1.334 && item.rate < 1.667},
                                            {red6:item.rate >= 1.667 && item.rate < 2.000},
                                            {red7:item.rate >= 2.000 && item.rate < 2.334},
                                            {red8:item.rate >= 2.334 && item.rate < 2.667},
                                            {red9:item.rate >= 2.667},
                                        ]"
                                       ></div>
                                   </div>
                                </div>
                            </div>
                        </template>
                    </jQueryGridScrollbar>
                </div>
                <div class="noresultfilter" v-if="tableitemsbody.length===0" :style="'height:'+ (winheight +190)+'px'"></div>
            </div>

            <!-- 아파트 테이블 영역 -->
            <div class="tableArea" ref="tableTop" v-if="aptTable">
                <div class="gridTableWrap">
                    <jQueryGridScrollbar  ref="gridScroll" class="gridScroll"
                        :maxWidth="'100%'"
                        :maxHeight="winheight +120+'px'"
                        :scrollMaxWidth="'100%'"
                        :scrollMaxHeight="winheight + 'px'"
                        :useCtrl="{direction: 'x',customClass:'typesmall' }"
                    >
                        <template slot="gHead">
                            <div ref="tHead" class="gHead" :style="{ transform: `translateX(${-cScrollLeft}px)`}">
                                <div class="head">
                                    <div class="headin">
                                        <div class="headitem type1">
                                            <div class="hi-tit">면적(㎡) <button class="btn-change iconbtn type1 "></button></div>
                                            <div class="hi-subtit">
                                                <div>공급</div>
                                                <div>전용</div>
                                            </div>
                                            <div class="fonmhead">
                                                <div>
                                                    <div class="tableinputbox">
                                                        <input type="text">
                                                        <em>~</em>
                                                        <input type="text">
                                                    </div>
                                                </div>
                                                <div>
                                                    <div class="tableinputbox">
                                                        <input type="text">
                                                        <em>~</em>
                                                        <input type="text">
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="headitem type2">
                                            <div class="hi-tit">세대수</div>
                                            <div class="fonmhead">
                                                <div>
                                                    <div class="tableinputbox">
                                                        <input type="text">
                                                        <em>~</em>
                                                        <input type="text">
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="headitem type3">
                                            <div class="hi-tit">연차</div>
                                            <div class="fonmhead">
                                                <div>
                                                    <div class="tableinputbox">
                                                        <input type="text">
                                                        <em>~</em>
                                                        <input type="text">
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="headitem">
                                            <div class="hi-tit">공급3.3㎡당 매매시세 <button class="btn-change iconbtn type1 "></button></div>
                                            <div class="hi-subtit">
                                                <div>시세(만원)</div>
                                                <div>증감률(%)</div>
                                            </div>
                                            <div class="fonmhead">
                                                <div>
                                                    <div class="tableinputbox">
                                                        <input type="text">
                                                        <em>~</em>
                                                        <input type="text">
                                                    </div>
                                                </div>
                                                <div>
                                                    <div class="tableinputbox">
                                                        <input type="text">
                                                        <em>~</em>
                                                        <input type="text">
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="headitem">
                                            <div class="hi-tit">매매시세</div>
                                            <div class="hi-subtit">
                                                <div>시세(억원)</div> <!-- 2022.03.02 퍼블 수정 / 텍스트 수정-->
                                                <div>증감률(%)</div>
                                            </div>
                                            <div class="fonmhead">
                                                <div>
                                                    <div class="tableinputbox">
                                                        <input type="text">
                                                        <em>~</em>
                                                        <input type="text">
                                                    </div>
                                                </div>
                                                <div>
                                                    <div class="tableinputbox">
                                                        <input type="text">
                                                        <em>~</em>
                                                        <input type="text">
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="headitem">
                                            <div class="hi-tit">전세시세</div>
                                            <div class="hi-subtit">
                                                <div>시세(억원)</div> <!-- 2022.03.02 퍼블 수정 / 텍스트 수정-->
                                                <div>증감률(%)</div>
                                            </div>
                                            <div class="fonmhead">
                                                <div>
                                                    <div class="tableinputbox">
                                                        <input type="text">
                                                        <em>~</em>
                                                        <input type="text">
                                                    </div>
                                                </div>
                                                <div>
                                                    <div class="tableinputbox">
                                                        <input type="text">
                                                        <em>~</em>
                                                        <input type="text">
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="headitem">
                                            <div class="hi-tit">전세가율</div>
                                            <div class="hi-subtit">
                                                <div>전세가율(%)</div>
                                                <div>증감률(%)</div>
                                            </div>
                                            <div class="fonmhead">
                                                <div>
                                                    <div class="tableinputbox">
                                                        <input type="text">
                                                        <em>~</em>
                                                        <input type="text">
                                                    </div>
                                                </div>
                                                <div>
                                                    <div class="tableinputbox">
                                                        <input type="text">
                                                        <em>~</em>
                                                        <input type="text">
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="headitem type2">
                                            <div class="hi-tit">매매전세차(억원)</div> <!-- 2022.03.02 퍼블 수정 / 텍스트 수정-->
                                            <div class="fonmhead">
                                                <div>
                                                    <div class="tableinputbox">
                                                        <input type="text">
                                                        <em>~</em>
                                                        <input type="text">
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </template>
                        <template slot="gLeft">
                            <div class="gLeft flexgroup">
                                <div>
                                    <div class="head">
                                        <div>지역명</div>
                                        <div class="fonmhead">
                                            <button class="btn-mychart">MY필터</button>
                                        </div>
                                    </div>
                                    <div class="body" :style="{ transform: `translateY(${-cScrollTop}px)`}">
                                        <div class="bodyitem" v-for="(item, index) in tableitems" :key="index" v-html="item" @click="toggleClassName($event, index, 'active')">강남구 대치동</div>
                                    </div>
                                </div>
                                <div>
                                    <div class="head">
                                        <div>단지명</div>
                                        <div class="fonmhead">
                                            <div class="tableinputbox">
                                                <input type="text">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="body" :style="{ transform: `translateY(${-cScrollTop}px)`}" ref="orderleft">
                                        <div class="bodyitem" v-for="(item, index) in tableitems" :key="index" v-html="item">강남구 대치동</div>
                                    </div>
                                </div>
                            </div>
                        </template>
                        
                        <template slot="gBody" >
                            <div ref="tBody" class="body" >
                                <div class="bodygroup type1">
                                   <div class="bodyitem" v-for="(item, index) in tableitemsbody" :key="index">
                                       <div v-html="item.num"></div>
                                       <div v-html="item.rate"></div>
                                   </div>
                                </div>
                                <div class="bodygroup type2">
                                   <div class="bodyitem" v-for="(item, index) in tableitemsbody" :key="index">
                                       <div v-html="item.num"></div>
                                   </div>
                                </div>
                                <div class="bodygroup type3">
                                   <div class="bodyitem" v-for="(item, index) in tableitemsbody1" :key="index">
                                       <div v-html="item.num"></div>
                                   </div>
                                </div>
                                <div class="bodygroup">
                                   <div class="bodyitem" v-for="(item, index) in tableitemsbody" :key="index">
                                       <div v-html="item.num"></div>
                                       <div v-html="item.rate"
                                        :class="[
                                            {blue9:item.rate < -2.667},
                                            {blue8:item.rate >= -2.667 && item.rate < -2.334},
                                            {blue7:item.rate >= -2.334 && item.rate < -2.000},
                                            {blue6:item.rate >= -2.000 && item.rate < -1.667},
                                            {blue5:item.rate >= -1.667 && item.rate < -1.334},
                                            {blue4:item.rate >= -1.334 && item.rate < -1.000},
                                            {blue3:item.rate >= -1.000 && item.rate < -0.667},
                                            {blue2:item.rate >= -0.667 && item.rate < -0.334},
                                            {blue1:item.rate >= -0.334 && item.rate < 0},
                                            {red1:item.rate >= 0 && item.rate < 0.334},
                                            {red2:item.rate >= 0.334 && item.rate < 0.667},
                                            {red3:item.rate >= 0.667 && item.rate < 1.000},
                                            {red4:item.rate >= 1.000 && item.rate < 1.334},
                                            {red5:item.rate >= 1.334 && item.rate < 1.667},
                                            {red6:item.rate >= 1.667 && item.rate < 2.000},
                                            {red7:item.rate >= 2.000 && item.rate < 2.334},
                                            {red8:item.rate >= 2.334 && item.rate < 2.667},
                                            {red9:item.rate >= 2.667},
                                        ]"
                                       ></div>
                                   </div>
                                </div>
                                <div class="bodygroup">
                                   <div class="bodyitem" v-for="(item, index) in tableitemsbody1" :key="index">
                                       <div v-html="item.num"></div>
                                       <div v-html="item.rate"
                                        :class="[
                                            {blue9:item.rate < -2.667},
                                            {blue8:item.rate >= -2.667 && item.rate < -2.334},
                                            {blue7:item.rate >= -2.334 && item.rate < -2.000},
                                            {blue6:item.rate >= -2.000 && item.rate < -1.667},
                                            {blue5:item.rate >= -1.667 && item.rate < -1.334},
                                            {blue4:item.rate >= -1.334 && item.rate < -1.000},
                                            {blue3:item.rate >= -1.000 && item.rate < -0.667},
                                            {blue2:item.rate >= -0.667 && item.rate < -0.334},
                                            {blue1:item.rate >= -0.334 && item.rate < 0},
                                            {red1:item.rate >= 0 && item.rate < 0.334},
                                            {red2:item.rate >= 0.334 && item.rate < 0.667},
                                            {red3:item.rate >= 0.667 && item.rate < 1.000},
                                            {red4:item.rate >= 1.000 && item.rate < 1.334},
                                            {red5:item.rate >= 1.334 && item.rate < 1.667},
                                            {red6:item.rate >= 1.667 && item.rate < 2.000},
                                            {red7:item.rate >= 2.000 && item.rate < 2.334},
                                            {red8:item.rate >= 2.334 && item.rate < 2.667},
                                            {red9:item.rate >= 2.667},
                                        ]"
                                       ></div>
                                   </div>
                                </div>
                                <div class="bodygroup">
                                   <div class="bodyitem" v-for="(item, index) in tableitemsbody" :key="index">
                                       <div v-html="item.num"></div>
                                       <div v-html="item.rate"
                                        :class="[
                                            {blue9:item.rate < -2.667},
                                            {blue8:item.rate >= -2.667 && item.rate < -2.334},
                                            {blue7:item.rate >= -2.334 && item.rate < -2.000},
                                            {blue6:item.rate >= -2.000 && item.rate < -1.667},
                                            {blue5:item.rate >= -1.667 && item.rate < -1.334},
                                            {blue4:item.rate >= -1.334 && item.rate < -1.000},
                                            {blue3:item.rate >= -1.000 && item.rate < -0.667},
                                            {blue2:item.rate >= -0.667 && item.rate < -0.334},
                                            {blue1:item.rate >= -0.334 && item.rate < 0},
                                            {red1:item.rate >= 0 && item.rate < 0.334},
                                            {red2:item.rate >= 0.334 && item.rate < 0.667},
                                            {red3:item.rate >= 0.667 && item.rate < 1.000},
                                            {red4:item.rate >= 1.000 && item.rate < 1.334},
                                            {red5:item.rate >= 1.334 && item.rate < 1.667},
                                            {red6:item.rate >= 1.667 && item.rate < 2.000},
                                            {red7:item.rate >= 2.000 && item.rate < 2.334},
                                            {red8:item.rate >= 2.334 && item.rate < 2.667},
                                            {red9:item.rate >= 2.667},
                                        ]"
                                       ></div>
                                   </div>
                                </div>
                                <div class="bodygroup">
                                   <div class="bodyitem" v-for="(item, index) in tableitemsbody1" :key="index">
                                       <div v-html="item.num"></div>
                                       <div v-html="item.rate"
                                        :class="[
                                            {blue9:item.rate < -2.667},
                                            {blue8:item.rate >= -2.667 && item.rate < -2.334},
                                            {blue7:item.rate >= -2.334 && item.rate < -2.000},
                                            {blue6:item.rate >= -2.000 && item.rate < -1.667},
                                            {blue5:item.rate >= -1.667 && item.rate < -1.334},
                                            {blue4:item.rate >= -1.334 && item.rate < -1.000},
                                            {blue3:item.rate >= -1.000 && item.rate < -0.667},
                                            {blue2:item.rate >= -0.667 && item.rate < -0.334},
                                            {blue1:item.rate >= -0.334 && item.rate < 0},
                                            {red1:item.rate >= 0 && item.rate < 0.334},
                                            {red2:item.rate >= 0.334 && item.rate < 0.667},
                                            {red3:item.rate >= 0.667 && item.rate < 1.000},
                                            {red4:item.rate >= 1.000 && item.rate < 1.334},
                                            {red5:item.rate >= 1.334 && item.rate < 1.667},
                                            {red6:item.rate >= 1.667 && item.rate < 2.000},
                                            {red7:item.rate >= 2.000 && item.rate < 2.334},
                                            {red8:item.rate >= 2.334 && item.rate < 2.667},
                                            {red9:item.rate >= 2.667},
                                        ]"
                                       ></div>
                                   </div>
                                </div>
                                <div class="bodygroup type2">
                                   <div class="bodyitem" v-for="(item, index) in tableitemsbody1" :key="index">
                                       <div v-html="item.num"></div>
                                   </div>
                                </div>
                            </div>
                        </template>
                    </jQueryGridScrollbar>
                </div>
                <div class="noresultfilter" v-if="tableitemsbody.length===0" :style="'height:'+ (winheight +190)+'px'"></div>
            </div>
            
            <!-- 범례 -->
            <div class="textbox between type2" v-if="!chartOn && !(tableitemsbody.length===0)">
                <span class="tablebottex iconinfo3">리스트는 최대 50개까지 표시됩니다</span>
                <div class="changeRateLayer type2">
                    <div class="changeRatetit">증감(률)</div>
                    
                    <div class="changeRatecon">
                        <div class="pickarrow">
                            <span class="pick"></span>
                            <span class="pick"></span>
                            <span class="pick"></span>
                            <span class="pick"></span>
                            <span class="pick"></span>
                        </div>
                        <div class="prcidxlegend active">
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
                        <div class="numrate">
                            <span class="ratetype1">-2.0</span>
                            <span class="ratetype2">-1.0</span>
                            <span class="ratetype3">0</span>
                            <span class="ratetype4">1.0</span>
                            <span class="ratetype5">2.0</span>
                        </div>
                    </div>
                    <div class="changeRatetxunit">(단위: %)</div>
                </div>
            </div>
            <!-- 차트 영역 -->
            <div class="chartFullarea" :class="{active:chartOn}" v-if="chartOn">
                <div class="chartin">
                    <div class="charttitbox">
                        <div class="titbox">
                            <div class="tit">은마아파트 112.55A/84.96</div>
                            <button type="button" class="btn btn-roundarrow" v-if="!aptTable">아파트 찾기</button> <!-- 2022.02.10 지역찾기/아파트찾기 구분 v-if -->
                            <button type="button" class="btn btn-aptlook" v-else>단지보기</button> <!-- 2022.02.10 아마트 찾기 탭 단지보기 버튼  -->
                            <button type="button" class="btn btn-popclose" title="닫기" @click="chartToggle($event, 'chartOn', 'close')"></button>
                        </div>

                        <div role="tablist" class="tabbox tabtype3">
                            <span role="button" class="tab" :class="{active:item.active}"
                                @click="tabselect(index,'tablist')"
                                v-for="(item, index) in tablist"
                                :key="index"
                                v-html="item.text">
                            </span>
                        </div>

                        <div class="selectbox type3 mbselect">
                            <span class="value txt arw" :class="{up:taplayer, down:!taplayer}" @click="tabLayerOpen('taplayer')" v-html="tabSelectText"></span>
                            <div role="listbox" class="selectlist" v-if="taplayer">
                                <jQueryScrollbar :maxHeight="'141px'">
                                    <div
                                        role="list"
                                        :class="['item txt', {active:item.active}]"
                                        v-for="(item, index) in tablist"
                                        :key="index"
                                        v-html="item.text"
                                        @click="tabselect(index,'tablist', 'taplayer')"
                                    >
                                    </div>
                                </jQueryScrollbar>
                            </div>
                        </div>
                        <div class="chartForm">
                            <label for="yearAll" class="custom-radio custom-control"><input type="radio" name="time" id="yearAll"><span>전체</span></label>
                            <label for="year5" class="custom-radio custom-control"><input type="radio" name="time" id="year5"><span>5년</span></label>
                            <label for="year2" class="custom-radio custom-control"><input type="radio" name="time" id="year2" checked><span>2년</span></label><!-- 2022.02.18 퍼블 변경 -->
                            <label for="year1" class="custom-radio custom-control"><input type="radio" name="time" id="year1"><span>1년</span></label>
                            <label for="month" class="custom-radio custom-control"><input type="radio" name="time" id="month"><span>6개월</span></label>
                        </div>
                    </div>

                    <div class="chartTapcon">
                        <div class="chartlegend">
                            <div>
                                <span class="legend line-faa2c1">아파트 매매가격지수 </span>
                            </div>
                            <div>
                                <span class="legend area-96f2d7">주간변동률(%)</span>
                            </div>
                        </div>
                        <!-- 해상도 1189이하 -->
                        <div class="chartTip tradingtip mobile " style="top: 0">
                            <p class="tiptit">2020년 10월</p>
                            <div class="linebox botnoline topnoline">
                                <p class="txbar">매매가격지수: 107.9</p>
                                <p class="txbar">증감률: 2.4%</p>
                            </div>
                        </div>
                        <div class="chartbox invest" >
                            <!-- 해상도 1189이상 -->
                            <div class="chartTip tradingtip" style="top: 50px; left: 50px;">
                                <p class="tiptit">2020년 10월</p>
                                <div class="linebox botnoline topnoline">
                                    <p class="txbar">매매가격지수: 107.9</p>
                                    <p class="txbar">증감률: 2.4%</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 순서이동레이어 팝업 -->
            <modal name="orderTable"
                :clickToClose="false"
                width="100%"
                height="auto"
            >
                <div class="layer-popup">
                    <div class="layercon layertag orderTable">
                        <button type="button" class="btn btn-popclose" title="닫기" @click="closeModal('orderTable')">닫기</button>
                        <div class="inner ordermovelayer">
                            
                            <div class="drggablebox">
                                <div class="tit">순서이동</div>
                                <div class="drgtxt">드래그해서 순서를 변경할 수 있습니다.</div>
                                <div>
                                    <Draggable
                                        tag="div"
                                        v-model="list"
                                        v-bind="draggableOptions"
                                        :move="onMove"
                                        @start="isDragging = true"
                                        @end="isDragging = false"
                                    >
                                        <transition-group type="transition" :name="'list'" tag="div" class="draggableGroup">
                                            <div v-for="v in list" :key=" v.id" style="position:relative">
                                                <div class="draggItem"> {{ v.value }}</div>
                                            </div>
                                        </transition-group>
                                    </Draggable>
                                </div>
                                <div class="layerbtn">
                                    <button type="button" class="btn md round blueline"  @click="toggleClick('orderLayer')">취소</button>
                                    <button type="button" class="btn md round blue">저장</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </modal>
            <!-- 차트저장 팝업 -->
            <modal name="mychart"
                :clickToClose="false"
                width="100%"
                height="auto"
            >
                <div class="layer-popup">
                    <div class="layercon layertag">
                        <button type="button" class="btn btn-popclose" title="닫기" @click="closeModal('mychart')">닫기</button>
                        <div class="inner">
                            <template v-if="viewchart">
                                <strong class="tit">새로운 태그를 적용하면<br> 사용하던 필터는 사라져요!</strong>
                                <p class="stit">
                                    입력한 필터값을 저장하고<br>나중에 이어서 조회해보세요 (로그인 필요)
                                </p>
                            </template>
                            <template v-else>
                                <strong class="tit">현재 사용 중인 필터를 MY필터로 저장하시겠어요?</strong>
                            </template>
                            <div class="formwrap">
                                <div class="form-outer form-control" :class="{error:mychartTag}">
                                    <input type="text" placeholder="저장할 별칭을 입력해주세요" v-model="charttext">
                                    <button type="button" class="btn sm round blue" v-if="viewchart"> 저장 후 적용</button>
                                </div>
                                <p class="guideinfo icoinfo3" :class="{error:mychartTag}">
                                    최대 10글자까지 입력 가능합니다
                                </p>
                                <!-- 에러케이스 문구
                                이미 존재하는 별칭입니다
                                MY차트는 최대 5개까지만 저장됩니다 -->
                            </div>
                            <template v-if="viewchart">
                            <span class="or">또는</span>
                            <div class="layerbtn">
                                <button type="button" class="btn md round blue" @click="saveMychart">저장없이 적용</button>
                            </div>
                            </template>
                            <template v-else>
                            <div class="layerbtn">
                                <button type="button" class="btn md round blue" @click="saveMychart">저장</button>
                            </div>
                            </template>
                        </div>
                    </div>
                </div>
            </modal>
            <!-- 차트삭제 팝업 -->
            <modal name="mychartDel"
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
                            <button type="button" class="btn md round blueline" @click="closeModal('mychartDel')">취소</button>
                            <button type="button" class="btn md round blue" @click="delMychart">삭제</button>
                        </div>
                    </div>
                </div>
            </div>
            </modal>
            <!-- 지역선택모바일 -->
            <modal name="selectLocation"
                :clickToClose="false"
                width="100%"
                height="auto"
            >
                <div class="layer-popup">
                    <div class="layercon layeremo">
                        <button type="button" class="btn btn-popclose" title="닫기"  @click="ToggleLayer('selectLocation', 'selecticon', 'close')">닫기</button>
                        <div class="inner type1">
                            <div class="tit type1">지역 선택 <span v-if="aptTable">1개 지역만 선택 가능합니다.</span></div> <!-- 2022.02.09 아파트 선택시만 텍스트 표시-->
                            
                            <div class="stepselectbox indivisual" :class="{aptTable:aptTable}"><!-- 2022.04.01 퍼블 찾기 / 아파트찾기 선택 구분 클래스 -->
                                <div class="steplink">
                                    <span role="button" class="active">시/도</span>
                                    <span role="button">시/군/구</span>
                                </div>
                                <div class="locationwrap" >
                                    <jQueryScrollbar :useCtrl="{direction: 'x',customClass:'typeBig' }">
                                         <!-- 구동 선택시 full 클래스 추가 -->
                                        <div class="stepselect">
                                            <div class="btnselect all selected"> <!-- 전국 또는 하위지역이 없을 때 only 클래스 추가 -->
                                                <span role="button" title="지역추가" class="add"></span>
                                                <span role="button" title="하위지역보기" class="txt">전국</span>
                                            </div>
                                            <div class="btnselect selected">
                                                <span role="button" title="지역추가" class="add"></span>
                                                <span role="button" title="하위지역보기" class="txt">서울시</span>
                                            </div>
                                            <div class="btnselect alltype2"> <!-- 2022.02.09 꺽쇠화살표 없는 경우-->
                                                <span role="button" title="지역추가" class="add"></span>
                                                <span role="button" title="하위지역보기" class="txt">구전체</span>
                                            </div>
                                            <div class="btnselect">
                                                <span role="button" title="지역추가" class="add"></span>
                                                <span role="button" title="하위지역보기" class="txt">부산시</span>
                                            </div>
                                            <div class="btnselect">
                                                <span role="button" title="지역추가" class="add"></span>
                                                <span role="button" title="하위지역보기" class="txt">부산시</span>
                                            </div>
                                            <div class="btnselect">
                                                <span role="button" title="지역추가" class="add"></span>
                                                <span role="button" title="하위지역보기" class="txt">부산시</span>
                                            </div>
                                            <div class="btnselect">
                                                <span role="button" title="지역추가" class="add"></span>
                                                <span role="button" title="하위지역보기" class="txt">부산시</span>
                                            </div>
                                            <div class="btnselect">
                                                <span role="button" title="지역추가" class="add"></span>
                                                <span role="button" title="하위지역보기" class="txt">부산시</span>
                                            </div>
                                             <div class="btnselect">
                                                <span role="button" title="지역추가" class="add"></span>
                                                <span role="button" title="하위지역보기" class="txt">부산시</span>
                                            </div>
                                            <div class="btnselect">
                                                <span role="button" title="지역추가" class="add"></span>
                                                <span role="button" title="하위지역보기" class="txt">부산시</span>
                                            </div>
                                            <div class="btnselect">
                                                <span role="button" title="지역추가" class="add"></span>
                                                <span role="button" title="하위지역보기" class="txt">부산시</span>
                                            </div>
                                            <div class="btnselect">
                                                <span role="button" title="지역추가" class="add"></span>
                                                <span role="button" title="하위지역보기" class="txt">부산시</span>
                                            </div>
                                            <div class="btnselect">
                                                <span role="button" title="지역추가" class="add"></span>
                                                <span role="button" title="하위지역보기" class="txt">부산시</span>
                                            </div>
                                            <div class="btnselect">
                                                <span role="button" title="지역추가" class="add"></span>
                                                <span role="button" title="하위지역보기" class="txt">부산시</span>
                                            </div>
                                            <div class="btnselect">
                                                <span role="button" title="지역추가" class="add"></span>
                                                <span role="button" title="하위지역보기" class="txt">부산시</span>
                                            </div>
                                             <div class="btnselect">
                                                <span role="button" title="지역추가" class="add"></span>
                                                <span role="button" title="하위지역보기" class="txt">부산시</span>
                                            </div>
                                            <div class="btnselect">
                                                <span role="button" title="지역추가" class="add"></span>
                                                <span role="button" title="하위지역보기" class="txt">부산시</span>
                                            </div>
                                        </div>
                                    </jQueryScrollbar>
                                </div>
                            </div>

                            <div class="areagroup" v-if="!aptTable"> <!-- 2022.02.09 지역찾기 선택시에 표시 -->
                                <jQueryScrollbar><!-- 2022.04.01 퍼블 변경 / 스크롤 추가 / 초기화 버튼 추가-->
                                    <div class="areatagbox">
                                        <div class="tag round">서울시 <span role="button" aria-label="선택삭제" class="icodel"></span></div>
                                        <div class="tag round">서울시 하위지역 <span role="button" aria-label="선택삭제" class="icodel"></span></div>
                                    </div>
                                </jQueryScrollbar>
                                <div class="notitxtbox">
                                    <button type="button" class="btn-reset type2">초기화</button>
                                </div>
                            </div>
                            <div class="layerbtn line">
                                <button type="button" class="btn md round blueline">취소</button>
                                <button type="button" class="btn md round blue">확인</button>
                            </div>
                        </div>
                    </div>
                </div>
            </modal>
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
                            <div class="DatePickerwrap Allpicker single">
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
        </div>
    </div>
</template>
<script>
const listItems = [
    '매매가격지수',
    '공급3.3㎡당 매매 평균가격',
    '전세가율',
    '아파트 전세가격지수',
    '공급3.3㎡당 전세 평균가격',
    '거래량',
    '미분양물량'
].map((value, index) => ({ id: index + 1, value, index }));
import ShareCommon from '@/components/elements/ShareCommon.vue';
export default {
    components: {
        ShareCommon
    },
    data() {
        return {
            aptTable: true,
           // 탭 모바일
            taplayer: false,
            tablist: [
                {text: '매매가격지수', active: false},
                {text: '공급3.3㎡당 매매 평균가격', active: false},
                {text: '전세가율', active: false},
                {text: '전세가격지수', active: true},
                {text: '공급3.3㎡당 전세 평균가격', active: false},
                {text: '거래량', active: false},
                {text: '미분양물량', active: false}
            ],
            tabSelectText: '매매가격지수',
            //드래그
            list: listItems,
            editable: true,
            isDragging: false,
            delayedDragging: false,
            // 스크롤
            cScrollTop: 0,
            cScrollLeft: 0,
            //리사이징 데이터
            winheight: null,
            tableTopH: 0,
           //도움말팁 
            tooltip: false,
            orderLayer: false,
            // 차트레이어
            chartOn: false,
             //테이블 데이터
            tableitems: [
                '강남구 대치동',
                '강남구 대치동',
                '강남구 대치동',
                '강남구 대치동',
                '강남구 대치동',
                '강남구 대치동',
                '강남구 대치동',
                '강남구 대치동',
                '강남구 대치동',
                '강남구 대치동',
                '강남구 대치동',
                '강남구 대치동',
                '강남구 대치동',
                '강남구 대치동',
                '강남구 대치동',
                '강남구 대치동',
                '강남구 대치동',
                '강남구 대치동',
                '강남구 대치동',
                '강남구 대치동',
                '강남구 대치동'
            ],
            tableitemsbody: [
                {num: '123.4', rate: -2.667},
                {num: '123.4', rate: -2.334},
                {num: '123.4', rate: -2.669},
                {num: '123.4', rate: -1.4},
                {num: '123.4', rate: 1.4},
                {num: '123.4', rate: -2.000},
                {num: '123.4', rate: 3.4},
                {num: '123.4', rate: 1.2},
                {num: '123.4', rate: 0.2},
                {num: '123.4', rate: 0.9},
                {num: '123.4', rate: 1.7},
                {num: '123.4', rate: 1.5},
                {num: '123.4', rate: -1.3},
                {num: '123.4', rate: -1.6},
                {num: '123.4', rate: 1.8},
                {num: '123.4', rate: 1.3},
                {num: '123.4', rate: 1.6},
                {num: '123.4', rate: -1.8},
                {num: '123.4', rate: 0},
                {num: '123.4', rate: 2.0},
                {num: '123.4', rate: -2.3}
            ],
            tableitemsbody1: [
                {num: '123.4', rate: -2.334},
                {num: '123.4', rate: -2.669},
                {num: '123.4', rate: -1.4},
                {num: '123.4', rate: 1.4},
                {num: '123.4', rate: -2.000},
                {num: '123.4', rate: 1.7},
                {num: '123.4', rate: 1.5},
                {num: '123.4', rate: -1.3},
                {num: '123.4', rate: -1.6},
                {num: '123.4', rate: -1.8},
                {num: '123.4', rate: 0},
                {num: '123.4', rate: 2.0},
                {num: '123.4', rate: -2.3},
                {num: '123.4', rate: -2.667},
                {num: '123.4', rate: 3.4},
                {num: '123.4', rate: 1.2},
                {num: '123.4', rate: 0.2},
                {num: '123.4', rate: 0.9},
                {num: '123.4', rate: 1.8},
                {num: '123.4', rate: 1.3},
                {num: '123.4', rate: 1.6}
            ],
            //필터 데이터
            mycharttags: [],
            charttext: '',
            viewchart: true,
            //지역선택
            selectLocation: false,
            selecticon: false,
            //달력
            datepickerLayer: false,
            datepickericon: false,
            starttime: '16. 06. 05',
            endtime: '16. 06. 05',
            // 모바일 피커탭
            startPicker: true,
            endPicker: false,
            // 탭 인터랙션
            checkedClass: null
        };
    },
    computed: {
        listString() {
            return JSON.stringify(this.list, null, 2);
        },
        draggableOptions() {
            return {
                group: 'description',
                animation: 0,
                ghostClass: 'ghost',
                disabled: !this.editable
            };
        },
        mychartTag() {
            return this.charttext.length > 5 ? true : false;
        }
    },
    watch: {
        'isDragging': {
            handler: function(nV) {
                if (nV) return this.delayedDragging = true;
                this.$nextTick(() => this.delayedDragging = false);
            }
        }
    },
    mounted() {
        // * Grid scroll Watch
        if (!(this.tableitemsbody.length === 0)) {
            const watchGridScrollTop = this.$watch(() => this.$refs.gridScroll.cScrollTop, scrollTop => this.cScrollTop = scrollTop);
            const watchGridScrollLeft = this.$watch(() => this.$refs.gridScroll.cScrollLeft, scrollLeft => this.cScrollLeft = scrollLeft);
        }
        //리사이징
        this.$nextTick(() => {
            window.addEventListener('resize', this.handleResize);
            this.handleResize();
        });
    },
    beforeDestory() {
        window.removeEventListener('resize', this.handleResize);
    },
    methods: {
       
        // 선택  토글
        typeSetting(e, classGroup) {
            let tabbox = document.querySelectorAll(classGroup);
            tabbox.forEach(elem => {
                elem.classList.remove('active');
            });
            e.target.classList.add('active');
        },
        // 아파트 지역 토글
        tableSetting(e, type) { // classname 변수 추가 
            this[type] = !this[type];
            /* 탭 인터랙션 */
            // this.checkedClass = classname;
            // let tabbox = document.querySelectorAll('.mainTitle .tabbox .tabtype1');
            // tabbox.forEach(elem => {
            //     elem.classList.remove('active');
            // });
            // e.target.classList.add('active');

            this.chartToggle(e, 'chartOn', 'close');
            this.$refs.tBody.childNodes.forEach((item, index) => {
                const ele = item.childNodes;
                ele.forEach((item) => {
                    item.classList.remove('active');
                });
            });
            
        },
        //도움말 Tip
        toggleClick(type, event) {
            if (type === 'tooltip') {
                this.selectLocation = false;
                this.selecticon = false;
                this.datepickerLayer = false;
                this.datepickericon = false;
                if (window.innerWidth < 1189) {
                    if (this[type] === true) {
                        document.querySelector('#wrap').classList.remove('modalOpen');
                        
                    } else {
                        document.querySelector('#wrap').classList.add('modalOpen');
                    }
                }
            }
            this[type] = !this[type];
        },
        //지역선택, 캘린더 선택
        ToggleLayer(type, icontype, opentype) {
            //도움말 닫기
            this.tooltip = false;
            document.querySelector('#wrap').classList.remove('modalOpen');
            
            if (type === 'datepickerLayer') {
                this.selectLocation = false;
                this.selecticon = false;
            } else if (type === 'selectLocation') {
                this.datepickerLayer = false;
                this.datepickericon = false;
            }
           
            this[icontype] = !this[icontype];
            if (window.innerWidth < 1190) {
                opentype === 'open' ?  this.openModal(type) : this.closeModal(type);
            } else {
                this[type] = !this[type];
            }
        },
        handleResize() {
            if (!this.chartOn && window.innerWidth < 1190) {
                this.closeModal('selectLocation');
                this.closeModal('datepickerLayer');
                this.selectLocation = false;
                this.selecticon = false;
                this.datepickerLayer = false;
                this.datepickericon = false;
                this.winheight = this.$refs.tBody ? this.$refs.tBody.clientHeight : null;
            } else if (!this.chartOn && window.innerWidth > 1189) {
                //335 footer높이 텍스트 + 범례
                console.log(this.tableTopH);
                this.tableTopH = this.$refs.tableTop ? this.$refs.tableTop.offsetTop : null;
                this.winheight = (window.innerHeight - 335) - this.tableTopH;
            }
        },
        //드래그 이벤트
        onMove({ relatedContext: rc, draggedContext: dc }) {
            const rEl = rc.element;
            const dEl = dc.element;

            return (!rEl || !rEl.fixed) && !dEl.fixed;
        },
        //my차트 저장
        saveMychart() {
            if (this.mycharttags.length < 5) {
                this.mycharttags.push(this.charttext);
                this.closeModal('mychart');
            }
        },
        //my차트 삭제버튼
        delMychart() {
            this.mycharttags.splice(this.mycharttagnum);
            console.log('차트삭제');
            this.closeModal('mychartDel');
        },
        //my차트 삭제팝업
        delpopup(index) {
            this.mycharttagnum = index;
            this.openModal('mychartDel');
        },
        //테이블 선택
        thisClass(e, type, className) {
            let tabbox = document.querySelectorAll(type, className);
            tabbox.forEach(elem => {
                elem.classList.remove(className);
            });
            e.target.classList.add(className);
        },
        toggleClassName(e, idx,  className) {
            this.thisClass(e, '.gLeft .bodyitem', className);
            this.$refs.tBody.childNodes.forEach((item, index) => {
                const ele = item.childNodes;
                ele.forEach((item) => {
                    item.classList.remove(className);
                });
                ele[idx].classList.contains(className) ? ele[idx].classList.remove(className) : ele[idx].classList.add(className);
            });
            //아파트만 있음
            if (this.aptTable === true)
                //서브 고정 셀 선택
                this.$refs.orderleft.childNodes.forEach((item, index) => {
                    if (index === idx) {
                        item.classList.add(className);
                    } else {
                        item.classList.remove(className);
                    }
                });
            //console.log(this.$refs.orderleft.length);
            this.chartToggle(e, 'chartOn', 'open');
        },
        //차트 레이어
        chartToggle(e, type, status) {
            if (status === 'open') {
                this[type] = true;
                if (window.innerWidth > 1189) {
                    //테이블 최소 높이
                    this.winheight = 205;
                    // 테이블 한칸 36  선택된 셀이 젤 마지막으로 
                    $(this.$el).find('.gBody .scroll-content').animate({scrollTop: e.target.offsetTop - 72}, 400);
                } else {
                    document.querySelector('#wrap').classList.add('modalOpen');
                }
            } else {
                this[type] = false;
                window.innerWidth > 1189 ? this.winheight = (window.innerHeight - 335) - this.tableTopH : this.winheight = this.$refs.tBody.clientHeight;
                document.querySelector('#wrap').classList.remove('modalOpen');
            }
        },
        //탭 레이어
        tabLayerOpen(parms) {
            this[parms] === true ? this[parms] = false : this[parms] = true;
        },
        //셀렉트 탭 선택
        tabselect(idx, arr, parms) {
            this[arr].forEach((item, index) => {
                if (index === idx) {
                    item.active = true;
                    this.tabSelectText = item.text;
                } else {
                    item.active = false;
                }
                return item;
            });
            this.tabLayerOpen(parms);
        },
        //공통 == 버튼클래스 처리 active
        activeToggle(e, classname) {
            if (e.target.classList.contains(classname) === true) {
                e.target.classList.remove(classname);
            } else {
                e.target.classList.add(classname);
            }
        }
    }
};
</script>