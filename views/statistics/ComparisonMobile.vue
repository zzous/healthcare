<template>
    <div class="comparisonMobile">
        <div class="mainTitle">
			<h1 class="titdepth1">통계비교</h1>
            <ShareCommon
                :pageurl ="this.$router.currentRoute.path"
            />
			<div class="filterbtns" >
				<button type="button" v-for="(item, index) in filters" :key="index" class="btn" @click="activeToggle($event, 'active');">#{{item}}</button>
                <!-- my차트에 저장한 상태에서 화면에 적용된 my차트태그는 클래스 selected 추가 -->
                <template v-for="(item, idx) in mycharttags" >
                    <span :key="item">
                        <button type="button" class="btn btn-mychart" v-html="item">투자 스터디</button>
                        <button type="button" class="iconbtn btn-myclose" title="MY차트 삭제" @click="delpopup(idx)"></button>
                    </span>
                </template>
				<button type="button" class="btn btn-mychart" @click="openModal('mychart')">MY차트</button>
			</div>
		</div>
        <div class="cardbox">
            <div class="filterforms">
				<div class="typeitem">
					<!-- 지역 설정 영역 -->
					<span class="typelabel">지역</span>
					<div class="typecheck">
						<button type="button" aria-label="지역설정" class="btn-edit iconbtn"  @click="ToggleLayer('selectLocation', 'selecticon', 'open')"></button>
						<div class="tag round">전국 <span role="button" aria-label="선택삭제" class="icodel"></span></div>
						<div class="tag round">서울 <span role="button" aria-label="선택삭제" class="icodel"></span></div>
						<div class="tag round">서울시 강남구 <span role="button" aria-label="선택삭제" class="icodel"></span></div>
						<div class="tag round">서울시 서초구 <span role="button" aria-label="선택삭제" class="icodel"></span></div>
						<div class="tag round">서울시 송파구 <span role="button" aria-label="선택삭제" class="icodel"></span></div>
						<div class="tag round">경기 <span role="button" aria-label="선택삭제" class="icodel"></span></div>
						<div class="tag round">인천 <span role="button" aria-label="선택삭제" class="icodel"></span></div>
						<div class="tag round">부산시 해운대구 <span role="button" aria-label="선택삭제" class="icodel"></span></div>
						<div class="tag round">광주시 남구 <span role="button" aria-label="선택삭제" class="icodel"></span></div>
						<div class="tag round">세종시 <span role="button" aria-label="선택삭제" class="icodel"></span></div>
					</div>
				</div>
				<!-- 기간 설정 영역 -->
				<div class="typeitem">
					<span class="typelabel">기간</span>
					<div class="typecheck">
						<button type="button" aria-label="기간설정" class="btn-edit iconbtn" @click="ToggleLayer('datepickerLayer', 'datepickericon','open')"></button>
						<div class="tag round">{{starttime}}~ {{endtime}} <span role="button" aria-label="선택삭제" class="icodel"  ></span></div>
					</div>
				</div>
			</div>
            <div class="filterforms">
				<label for="year" class="custom-radio custom-control">
					<input type="radio" name="time" id="year" checked="">
					<span>연도별 </span>
				</label>
				<label for="quarter" class="custom-radio custom-control">
					<input type="radio" name="time" id="quarter">
					<span>분기별</span>
				</label>
				<label for="month" class="custom-radio custom-control">
					<input type="radio" name="time" id="month">
					<span>월별</span>
				</label>
				<label for="week" class="custom-radio custom-control">
					<input type="radio" name="time" id="week">
					<span>주별</span>
				</label>
			</div>

        </div>
        <div class="datawrap">
            <div class="datahead chartH1">
				<strong>차트A</strong>
				<div class="chartcontrol">
					<button type="button" :class="['btn btn-control', {split:!split}, {splitactive:split}]"  @click="toggleClick('split')">[A1|A2]차트 나누기</button>
					<div class="dropdownwrap">
						<button type="button" title="차트옵션메뉴" class="btn-dotmore iconbtn"></button>
						<!--
							<div class="option-layer">
								<ul>
									<li>표 엑셀 다운받기</li>
									<li>그래프 차트 저장</li>
								</ul>
							</div>
						-->
					</div>
				</div>
			</div>
            <div class="cardbox databody">
                <div class="chartDefault">
                    <div class="charttit">
                        <div class="active">
                            <div class="btnbox">
                                <button class="line active">라인차트</button>
                                <button class="bar">막대차트</button>
                            </div>
                            <div class="chartname">
                                <i class="icodataA">A1</i>
                                <span>아파트 공급면적당 매매 평균가격</span>
                            </div>
                            <button type="button" aria-label="데이터선택하기" class="btn-edit iconbtn" @click="openModal('dateSet')"></button>
                        </div>
                        <div v-if="!split">
                            <div class="btnbox">
                                <button class="line">라인차트</button>
                                <button class="bar">막대차트</button>
                            </div>
                            <div class="chartname">
                                <i class="icodataA">A2</i>
                                <span>비교하고싶은 데이터를 추가해보세요</span>
                            </div>
                            <button type="button" aria-label="데이터선택하기" class="btn-edit iconbtn" @click="openModal('dateSet')"></button>
                        </div>
                    </div>
                    <div class="chartdata">
                        <div role="tooltip" class="tooltip bottom" style="top:32px;left:0" v-if="agreeTip && !split">
                            <span aria-hidden="true" class="arrow" style="left: 4%;"></span>
                            <div class="flexbox">
                                <p>최대 5개까지 차트 적용이 가능해요</p>
                                <button type="button" title="툴팁닫기" class="tipclose" @click="toggleClick('agreeTip')"></button>
                            </div>
                        </div>
                        <button class="btn-check type0 active">전국</button>
                        <button class="btn-check type1 active">서울</button>
                        <button class="btn-check type2 active">강남구</button>
                        <button class="btn-check type3 active">서초구</button>
                        <button class="btn-check type4 active">송파구</button>
                        <template v-if="moreCheck">
                            <button class="btn-check">경기</button>
                            <button class="btn-check">인천</button>
                            <button class="btn-check">해운대구</button>
                            <button class="btn-check">남구</button>
                        </template>
                        <button type="button" :class="['btn btn-checkmore arw', {down:!moreCheck}, {up:moreCheck}]" @click="toggleClick('moreCheck')">
                            <template v-if="moreCheck">숨기기</template>
                            <template v-else>더보기</template>
                        </button>
                    </div>
                    <div class="chartbox" style="height:252px; background:#eee;">
                        <!-- 차트 툴팁 -->
                        <div class="chartTip mobile" style="top:100px" v-if="true">
                            <div class="tiptit">
                                <span>2021년 3월</span>
                            </div>
                            <div class="tablebox type2">
                                <div class="line header">
                                    <div class="cell"></div>
                                    <div class="cell">전국</div>
                                    <div class="cell">서울</div>
                                    <div class="cell">강남구</div>
                                    <div class="cell">서초구</div>
                                    <div class="cell">송파구</div>
                                </div>
                                <div class="line">
                                    <div class="cell">A1</div>
                                    <div class="cell">551.0</div>
                                    <div class="cell">1,268.7</div>
                                    <div class="cell">2,266.4</div>
                                    <div class="cell">1,957.2</div>
                                    <div class="cell">1,617.7</div>
                                </div>
                                <div class="line">
                                    <div class="cell">A2</div>
                                    <div class="cell">551.0</div>
                                    <div class="cell">1,268.7</div>
                                    <div class="cell">2,266.4</div>
                                    <div class="cell">1,957.2</div>
                                    <div class="cell">1,617.7</div>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div class="chartlegend line">
                        <span class="legend">아파트 공급면적당 매매 평균가격</span>
                    </div>
                    <div class="chartlegend bar" v-if="!split">
                        <span class="legend">거래량</span>
                    </div>
                    <div class="chartlegend dotted"> <!-- 2022.03.31 퍼블수정 / 모바일 차트 범례추가-->
                        <span class="legend">아파트 공급면적당 매매 평균가격</span>
                    </div>
                    <div class="chartlegend stickdotted">
                        <span class="legend">거래량</span>
                    </div>
                </div>
                <div class="chartsplit" v-if="split">
                    <div class="charttit">
                        <div class="active">
                            <div class="btnbox">
                                <button class="line active">라인차트</button>
                                <button class="bar">막대차트</button>
                            </div>
                            <div class="chartname">
                                <i class="icodataA">A2</i>
                                <span>거래량</span>
                            </div>
                            <button type="button" aria-label="데이터선택하기" class="btn-edit iconbtn" @click="openModal('dateSet')"></button>
                        </div>
                    </div>
                    <div class="chartdata">
                        <button class="btn-check type0 active">전국</button>
                        <button class="btn-check type1 active">서울</button>
                        <button class="btn-check type2 active">강남구</button>
                        <button class="btn-check type3 active">서초구</button>
                        <button class="btn-check type4 active">송파구</button>
                        <template v-if="moreCheck">
                            <button class="btn-check">경기</button>
                            <button class="btn-check">인천</button>
                            <button class="btn-check">해운대구</button>
                            <button class="btn-check">남구</button>
                        </template>
                        <button type="button" :class="['btn btn-checkmore arw', {down:!moreCheck}, {up:moreCheck}]" @click="toggleClick('moreCheck')">
                            <template v-if="moreCheck">숨기기</template>
                            <template v-else>더보기</template>
                        </button>
                    </div>
                    <div class="chartbox" style="height:252px; background:#eee;">
                        <!-- 차트 툴팁 -->
                        <div class="chartTip mobile" style="top:100px" v-if="false">
                            <div class="tiptit">
                                <span>2021년 3월</span>
                            </div>
                            <div class="tablebox">
                                <div class="line header">
                                    <div class="cell"></div>
                                    <div class="cell">전국</div>
                                    <div class="cell">서울</div>
                                    <div class="cell">강남구</div>
                                    <div class="cell">서초구</div>
                                    <div class="cell">송파구</div>
                                </div>
                                <div class="line">
                                    <div class="cell">A1</div>
                                    <div class="cell">551.0</div>
                                    <div class="cell">1,268.7</div>
                                    <div class="cell">2,266.4</div>
                                    <div class="cell">1,957.2</div>
                                    <div class="cell">1,617.7</div>
                                </div>
                                <div class="line">
                                    <div class="cell">A2</div>
                                    <div class="cell">551.0</div>
                                    <div class="cell">1,268.7</div>
                                    <div class="cell">2,266.4</div>
                                    <div class="cell">1,957.2</div>
                                    <div class="cell">1,617.7</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="chartlegend bar">
                        <span class="legend">거래량</span>
                    </div>
                </div>
                <TabContent
                    :tabcontentname="'매매 평균가격'"
                    :tabsublist="'tabbox tabtype3'"
                    :tabtexts="['A1' , 'A2']"
                    v-on:tabactive="tabClick"
                >
                    <template slot="panel">
                        <div class="tabcon" role="tabpanel" v-if="tabnum===0">
                            <strong class="selecttit">아파트 공급면적당 매매 평균가격</strong>
                            <div class="tradingtable comparisonM">
                                <div class="tablelabel">
                                    <span>지역</span>
                                    <span>전국</span>
                                    <span>서울</span>
                                    <span>강남구</span>
                                    <span>서초구</span>
                                    <span>송파구</span>
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
                            <div class="unittextbox right">
                                <span>(단위:만원/㎡)</span>
                            </div>
                        </div>
                        <div class="tabcon" role="tabpanel" v-if="tabnum===1">
                            <div class="datanone dataguide">
                                해당 기간에 데이터가 존재하지 않습니다.<br>
                                조회기간을 재설정 해보세요.
                            </div>
                            <div class="dataguide dataAdd">
                                비교하고싶은 데이터를<br>추가해보세요!
                            </div>
                        </div>
                    </template>
                </TabContent>
            </div>
        </div>
        <div class="datawrap">
            <div class="datahead chartH2">
				<strong>차트A</strong>
				<div class="chartcontrol">
					<button type="button" class="btn btn-control split ">[A1|A2]차트 나누기</button>
					<div class="dropdownwrap">
						<button type="button" title="차트옵션메뉴" class="btn-dotmore iconbtn"></button>
						<!--
							<div class="option-layer">
								<ul>
									<li>표 엑셀 다운받기</li>
									<li>그래프 차트 저장</li>
								</ul>
							</div>
						-->
					</div>
				</div>
			</div>
            <div class="cardbox databody">
                <div class="charttit">
					<div>
						<div class="btnbox">
							<button class="line">라인차트</button>
							<button class="bar">막대차트</button>
						</div>
						<div class="chartname">
							<i class="icodataB">B1</i>
							<span>비교하고싶은 데이터를 추가해보세요</span>
						</div>
						<button type="button" aria-label="데이터선택하기" class="btn-edit iconbtn" @click="openModal('dateSet')"></button>
					</div>
					<div>
						<div class="btnbox">
							<button class="line">라인차트</button>
							<button class="bar">막대차트</button>
						</div>
						<div class="chartname">
							<i class="icodataB">B2</i>
							<span>비교하고싶은 데이터를 추가해보세요</span>
						</div>
						<button type="button" aria-label="데이터선택하기" class="btn-edit iconbtn" @click="openModal('dateSet')"></button>
					</div>
				</div>
            </div>
        </div>
        <!-- 위젯 -->
        <div :class="['widgetbox', {on:popularOn}]"> <!-- 2022.03.17 마크업, 이벤트 변경 -->
            <button type="button" :class="['btn-widget btn-popular', {active:widget}]" aria-descibedby="popularRegion" title="인기단지위젯" @click="openWidget"></button>
            <div id="popularRegion" class="widgetlayer">
                <strong>인기단지 보러가기</strong>
                <div role="listbox" class="widgetlist">
                    <button type="button" class="item">서울</button>
                    <button type="button" class="item">강남구</button>
                    <button type="button" class="item">영등포동3가</button>
                    <button type="button" class="item">마산합포구</button>
                </div>
            </div>
        </div>
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
                            <strong class="tit">새로운 태그를 적용하면 보고있던 차트는 사라져요!</strong>
                            <p class="stit">
                                보고있던 차트를 <span class="btn btn-mychart icoplus">MY차트</span>에 저장하고<br>
                                나중에 이어서 조회해보세요 (로그인 필요)
                            </p>
                        </template>
                        <template v-else>
                            <strong class="tit">현재 보고있던 차트를 MY차트로 저장하시겠어요?</strong>
                        </template>
                        <div class="formwrap">
                            <div class="form-outer form-control" :class="{error:mychartTag}">
                                <input type="text" placeholder="저장할 별칭을 입력해주세요" v-model="charttext">
                                <button type="button" class="btn sm round">저장 후 적용</button> <!-- 2022.04.11 퍼블수정 / blue 클래스 제거 -->
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
                            <button type="button" class="btn md round darkblue" @click="saveMychart">선택한 태그 적용</button>
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
        <!-- 데이터 선택 팝업 -->
        <modal name="dateSet"
            class="dateSetModal"
            :clickToClose="false"
            width="100%"
            height="auto"
        >
            <div class="layer-popup">
                <div class="layercon">
                    <button type="button" title="닫기" class="btn btn-popclose" @click="closeModal('dateSet')">닫기</button>
                    <div class="inner type1">
                        <div class="tit type1">데이터 선택</div>
                        <div class="databox kbdata">
                            <div class="datatit">
                                <strong class="subtit">KB시세통계</strong>
                                <div role="tablist" class="tabbox tabtype5">
                                    <span role="button" class="tab active" @click="typeSetting($event,'Sell')">매매</span>
                                    <span role="button" class="tab"  @click="typeSetting($event,'below')">전세</span>
                                </div>
                                <div class="switch-button custom-control fr">
                                    <input type="checkbox" id="changeRatio">
                                    <label for="changeRatio" class="switch">
                                        <span class="txt">변동률</span>
                                    </label>
                                </div>
                            </div>
                            <jQueryScrollbar  :maxHeight="'400px'">
                                <!-- 매매선택리스트 -->
                                <div role="listbox" class="datalist" v-if="Sell">
                                    <div role="list" class="item active">
                                        <span class="datatxt">아파트 매매 평균가격</span>
                                        <button type="button" title="도움말" class="btn-help icohelp" @click="inModal('open', 0)"></button>
                                    </div>
                                    <!-- 처음엔 서브 리스트 펼쳐진 상태가 기본 -->
                                    <div role="list" class="item icopopular open">
                                        <span class="datatxt arw down">아파트 공급면적당 매매 평균가격</span>
                                    </div>
                                    <div class="sublist">
                                        <div role="list" class="item">
                                            <span class="datatxt">㎡당 평균가격</span>
                                            <button type="button" title="도움말" class="btn-help icohelp" @click="inModal('open', 1)"></button>
                                        </div>
                                        <div role="list" class="item">
                                            <span class="datatxt">3.3㎡당 평균가격</span>
                                            <button type="button" title="도움말" class="btn-help icohelp" @click="inModal('open', 1)"></button>
                                        </div>
                                    </div>

                                    <div role="list" class="item open">
                                        <span class="datatxt arw down">아파트 전용면적별 매매 평균가격</span>
                                    </div>
                                    <div class="sublist">
                                        <div role="list" class="item">
                                            <span class="datatxt">대형 (135㎡ 초과)</span>
                                            <button type="button" title="도움말" class="btn-help icohelp"  @click="inModal('open', 2)"></button>
                                        </div>
                                        <div role="list" class="item">
                                            <span class="datatxt">중대형 (102㎡ ~ 135㎡ 이하)</span>
                                            <button type="button" title="도움말" class="btn-help icohelp" @click="inModal('open', 2)"></button>
                                        </div>
                                        <div role="list" class="item">
                                            <span class="datatxt">중형 (85㎡ 초과 ~ 102㎡ 이하)</span>
                                            <button type="button" title="도움말" class="btn-help icohelp" @click="inModal('open', 2)"></button>
                                        </div>
                                        <div role="list" class="item">
                                            <span class="datatxt">중소형 (60㎡ 초과 ~ 85㎡ 이하)</span>
                                            <button type="button" title="도움말" class="btn-help icohelp" @click="inModal('open', 2)"></button>
                                        </div>
                                        <div role="list" class="item">
                                            <span class="datatxt">소형 (60㎡ 이하)</span>
                                            <button type="button" title="도움말" class="btn-help icohelp" @click="inModal('open', 2)"></button>
                                        </div>
                                    </div>

                                    <div role="list" class="item">
                                        <span class="datatxt">아파트 매매 가격 지수</span>
                                        <button type="button" title="도움말" class="btn-help icohelp" @click="inModal('open', 3)"></button>
                                    </div>

                                    <!-- 접힌상태 -->
                                    <div role="list" class="item open">
                                        <span class="datatxt arw down">시장동향 심리지수</span>
                                    </div>
                                    <div class="sublist">
                                        <div role="list" class="item">
                                            <span class="datatxt">매수우위지수</span>
                                            <button type="button" title="도움말" class="btn-help icohelp" @click="inModal('open', 4)"></button>
                                        </div>
                                        <div role="list" class="item">
                                            <span class="datatxt">매매 거래 활발 지수</span>
                                            <button type="button" title="도움말" class="btn-help icohelp" @click="inModal('open', 6)"></button>
                                        </div>
                                    </div>

                                    <div role="list" class="item">
                                        <span class="datatxt">아파트 매매가격 대비 전세가격 비(율)</span>
                                        <button type="button" title="도움말" class="btn-help icohelp"  @click="inModal('open', 8)"></button>
                                    </div>
                                </div>
                                <!-- 전세선택리스트 -->
                                <div role="listbox" class="datalist" v-if="below">
                                    <div role="list" class="item active">
                                        <span class="datatxt">아파트 전세 평균가격</span>
                                        <button type="button" title="도움말" class="btn-help icohelp" @click="inModal('open', 0)"></button>
                                    </div>
                                    <!-- 처음엔 서브 리스트 펼쳐진 상태가 기본 -->
                                    <div role="list" class="item icopopular active">
                                        <span class="datatxt arw down">아파트 공급면적당 전세 평균가격</span>
                                    </div>
                                    <div class="sublist">
                                        <div role="list" class="item active">
                                            <span class="datatxt">㎡당 평균가격</span>
                                            <button type="button" title="도움말" class="btn-help icohelp" @click="inModal('open', 1)"></button>
                                        </div>
                                        <div role="list" class="item">
                                            <span class="datatxt">3.3㎡당 평균가격</span>
                                            <button type="button" title="도움말" class="btn-help icohelp" @click="inModal('open', 1)"></button>
                                        </div>
                                    </div>

                                    <div role="list" class="item active">
                                        <span class="datatxt arw down">아파트 전용면적별 전세 평균가격</span>
                                    </div>
                                    <div class="sublist">
                                        <div role="list" class="item">
                                            <span class="datatxt">대형 (135㎡ 초과)</span>
                                            <button type="button" title="도움말" class="btn-help icohelp" @click="inModal('open', 2)"></button>
                                        </div>
                                        <div role="list" class="item">
                                            <span class="datatxt">중대형 (102㎡ ~ 135㎡ 이하)</span>
                                            <button type="button" title="도움말" class="btn-help icohelp"  @click="inModal('open', 2)"></button>
                                        </div>
                                        <div role="list" class="item">
                                            <span class="datatxt">중형 (85㎡ 초과 ~ 102㎡ 이하)</span>
                                            <button type="button" title="도움말" class="btn-help icohelp"  @click="inModal('open', 2)"></button>
                                        </div>
                                        <div role="list" class="item">
                                            <span class="datatxt">중소형 (60㎡ 초과 ~ 85㎡ 이하)</span>
                                            <button type="button" title="도움말" class="btn-help icohelp"  @click="inModal('open', 2)"></button>
                                        </div>
                                        <div role="list" class="item">
                                            <span class="datatxt">소형 (60㎡ 이하)</span>
                                            <button type="button" title="도움말" class="btn-help icohelp" @click="inModal('open', 2)"></button>
                                        </div>
                                    </div>

                                    <div role="list" class="item">
                                        <span class="datatxt">아파트 전세 가격 지수</span>
                                        <button type="button" title="도움말" class="btn-help icohelp" @click="inModal('open', 3)"></button>
                                    </div>

                                    <div role="list" class="item active">
                                        <span class="datatxt arw down">시장동향 심리지수</span>
                                    </div>
                                    <div class="sublist">
                                        <div role="list" class="item">
                                            <span class="datatxt">전세수급지수</span>
                                            <button type="button" title="도움말" class="btn-help icohelp" @click="inModal('open', 5)"></button>
                                        </div>
                                        <div role="list" class="item">
                                            <span class="datatxt">전세거래 활발 지수</span>
                                            <button type="button" title="도움말" class="btn-help icohelp" @click="inModal('open', 7)"></button>
                                        </div>
                                    </div>

                                    <div role="list" class="item">
                                        <span class="datatxt">아파트 매매가격 대비 전세가격 비(율)</span>
                                        <button type="button" title="도움말" class="btn-help icohelp" @click="inModal('open', 8)"></button>
                                    </div>
                                </div>
                                

                                <!-- 공공선택 -->
                                <div class="datatit">
                                    <strong>공공데이터</strong>
                                </div>
                            
                                <div role="listbox" class="datalist">
                                    <div role="list" class="item iconew">
                                        <span class="datatxt">거래량</span>
                                        <button type="button" title="도움말" class="btn-help icohelp" @click="inModal('open', 9)"></button>
                                    </div>
                                    <div role="list" class="item">
                                        <span class="datatxt">미분양물량</span>
                                        <button type="button" title="도움말" class="btn-help icohelp" @click="inModal('open', 10)"></button>
                                    </div>
                                    <div role="list" class="item">
                                        <span class="datatxt">인구</span>
                                        <button type="button" title="도움말" class="btn-help icohelp" @click="inModal('open', 11)"></button>
                                    </div>
                                </div>
                            </jQueryScrollbar>
                        </div>
                        
                        <div class="layerbtn flexend line">
                            <button type="button" class="btn btn-delete1"  @click="closeModal('dateSet')">삭제</button> <!-- 삭제버튼은 차트 A2, B1, B2에만 노출 -->
                            <button type="button" class="btn md round blueline"  @click="closeModal('dateSet')">취소</button>
                            <button type="button" class="btn md round blue">확인</button>
                        </div>
                    </div>
                </div>
                <div class="inmodalWrap" v-if="inModallayer">
                    <div class="inoverlay"></div>
                    <div class="inner">
                        <div class="inmodaltit">{{toolTipCon[modalconNum].title}}</div>
                        <button type="button" title="닫기" class="btn btn-popclose" @click="inModal('close')">닫기</button>
                        <div class="inmodal-con" >
                            <ul class="dashlist" v-for="(i, index) in toolTipCon[modalconNum].conlist" :key="index">
                                <li>{{i.text}}</li>
                            </ul>
                            <div class="guideinfo line icoinfo1" v-if="toolTipCon[modalconNum].week">주간 데이터를 제공하지 않습니다.</div>

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
            class="selectLocation"
        >
            <div class="layer-popup">
                <div class="layercon layeremo">
                    <button type="button" class="btn btn-popclose" title="닫기"  @click="ToggleLayer('selectLocation', 'selecticon', 'close')">닫기</button>
                    <div class="inner type1">
                        <div class="tit type1">지역 선택</div>
                        <div role="tablist" class="tabbox tabtype3">
                            <span role="tab" :class="['tab',{active:selectLocationType1} ]" @click="toggleTap('selectLocationType1')">복수지역<em class="subtip">최대 10개</em></span> <!-- 2022.04.01 퍼블 변경  -->
                            <span role="tab" :class="['tab',{active:selectLocationType2} ]" @click="toggleTap('selectLocationType2')">단일지역<em class="subtip">하위지역포함</em></span>
                        </div>
                        <div class="stepselectbox indivisual" role="tabpanel" v-if="selectLocationType1">
                            <div class="steplink">
                                <span role="button" class="active">시/도</span>
                                <span role="button">시/군/구</span>
                                <span role="button">읍/면/동</span>
                            </div>
                            <div class="locationwrap" >
                                <jQueryScrollbar :useCtrl="{direction: 'x',customClass:'typeBig' }">
                                        <!-- 구동 선택시 full 클래스 추가 -->
                                    <div class="stepselect">
                                        <div class="btnselect all selected">
                                            <span role="button" title="지역추가" class="add"></span>
                                            <span role="button" title="하위지역보기" class="txt">전국</span>
                                        </div>
                                        <div class="btnselect selected">
                                            <span role="button" title="지역추가" class="add"></span>
                                            <span role="button" title="하위지역보기" class="txt">서울시</span>
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

                        <div class="stepselectbox indivisual" role="tabpanel" v-if="selectLocationType2" :class="{selectLocationType2:selectLocationType2}"><!-- 2022.04.01 퍼블 변경  -->
                            <div class="steplink">
                                <span role="button" class="active">시/도</span>
                                <span role="button">시/군/구</span>
                            </div>
                            <div class="locationwrap" >
                                <jQueryScrollbar :useCtrl="{direction: 'x',customClass:'typeBig' }">
                                        <!-- 구동 선택시 full 클래스 추가 -->
                                    <div class="stepselect">
                                        <div class="btnselect all selected">
                                            <span role="button" title="지역추가" class="add"></span>
                                            <span role="button" title="하위지역보기" class="txt">전국</span>
                                        </div>
                                        <div class="btnselect selected">
                                            <span role="button" title="지역추가" class="add"></span>
                                            <span role="button" title="하위지역보기" class="txt">서울시</span>
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


                        <div class="areagroup" :class="{selectLocationType2:selectLocationType2}"><!-- 2022.04.01 퍼블 변경  -->
                            <jQueryScrollbar><!-- 2022.02.18 퍼블 변경 -->
                                <div class="areatagbox">
                                    <div class="tag round">서울시 <span role="button" aria-label="선택삭제" class="icodel"></span></div>
                                    <div class="tag round">서울시 하위지역 <span role="button" aria-label="선택삭제" class="icodel"></span></div>
                                </div>
                            </jQueryScrollbar>
                            <div class="notitxtbox"  v-if="selectLocationType1"><!-- 2022.04.01 퍼블 변경  -->
                                <p class="guideinfo icoinfo1">드래그로 순서를 변경할 수 있어요</p>
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
                        <div class="daytext type1">{{starttime}} ~ {{endtime}}</div>
                        <div class="daySortingbtns">
                            <button class="btn btn-daysorting">전체</button>
                            <button class="btn btn-daysorting">10년</button>
                            <button class="btn btn-daysorting">5년</button>
                            <button class="btn btn-daysorting">2년</button>
                            <button class="btn btn-daysorting">6개월</button>
                            <button class="btn btn-daysorting">직접설정</button>
                        </div>
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
                        <div class="layerbtn line type1">
                            <button type="button" class="btn md round blueline"  @click="ToggleLayer('datepickerLayer', 'datepickericon', 'close')">취소</button>
                            <button type="button" class="btn md round blue">확인</button>
                        </div>
                    </div>
                </div>
            </div>
        </modal>
    </div>
</template>
<script>
import ShareCommon from '@/components/elements/ShareCommon.vue';
export default {
    components: {
        ShareCommon
    },
    props: {
        scrollH: [Number]
    },
    data() {
        return {
        
            filters: ['강남3구', '서울시거래량TOP5', '전국평균가격TOP5', 'GTX-D관련'],
            mycharttags: [],
            viewchart: false,
            charttext: '',
            tabnum: 0,
            agreeTip: true,
            moreCheck: false,
            split: false,
            Sell: true,
            below: false,
            // 인기 단지 위젯
            widget: false,
            popularOn: false,
            //지역선택
            selectLocation: false,
            selecticon: false,
            selectLocationType1: true,
            selectLocationType2: false,
            //달력
            datepickerLayer: false,
            datepickericon: false,
            starttime: '16. 06. 05',
            endtime: '16. 06. 05',
            // 모바일 피커탭
            startPicker: true,
            endPicker: false,
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
                    location: '서울',
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
                    location: '강남구',
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
                    location: '서초구',
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
                    location: '송파구',
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
            inModallayer: false,
            modalconNum: 0,
            toolTipCon: [
                {
                    title: '"KB시세 매매/전세 평균가격"이란?',
                    conlist: [
                        {text: '아파트의 매매와 전세의 시세평균가격입니다.'},
                        {text: '지역내 조사되는 아파트를 대상으로 하며 통계는 세대수를 적용하여 동읍면과 구시군 및 시도 단위로 제공됩니다.'}
                    ],
                    week: false
                },
                {
                    title: '"KB시세 아파트 공급면적당 매매/전세 평균가격"이란?',
                    conlist: [
                        {text: '아파트의 공급면적(m2)당 매매와 전세의 시세평균가격입니다.'},
                        {text: '지역내 조사되는 아파트를 대상으로 하며 통계는 세대수를 적용하여 동읍면과 구시군 및 시도 단위로 제공됩니다.'},
                        {text: '공급면적 m2 또는 3.3m2당 가격으로 구분되어 제공됩니다.'}
                    ],
                    week: false
                },
                {
                    title: '"KB시세 아파트 전용면적별 매매/전세 평균가격"이란?',
                    conlist: [
                        {text: '아파트의 전용면적 크기별로 매매와 전세의 시세평균가격입니다. 가구수(세대수)가 적용되어 있습니다.'},
                        {text: '지역내 조사되는 아파트를 대상으로 하며 통계는 세대수를 적용하여 동읍면과 구시군 및 시도 단위로 제공됩니다.'}
                    ],
                    week: false
                },
                {
                    title: '"KB 아파트 매매/전세 가격지수"이란?',
                    conlist: [
                        {text: '아파트의 매매와 전세 가격을 기준시점 대비 상대적인 가격을 지수화한 수치입니다.'},
                        {text: '지역내 조사되는 아파트를 대상으로 하며 통계는 세대수를 적용하여 구시군 및 시도 단위로 제공됩니다.'},
                        {text: '준시점과 기준지수는 2022.01.10=100.0입니다.'}
                    ],
                    week: false
                },
                {
                    title: '"매수우위 지수"란?',
                    conlist: [
                        {text: '지역내 부동산중개업소를 대상으로 부동산시장에 대한 설문조사 통계입니다.'},
                        {text: '부동산 문의가 매수자의 문의가 많은지 매도자의 문의가 많은지 그 비율을 지수화한 통계입니다.'},
                        {text: '매수우위지수 = 100 +"매수자 많음"비중 -"매도자 많음"비중 (조사항목 : 매수자 많음, 비슷함, 매도자 많음 3개중 택 1)'},
                        {text: '매수우위지수는 0~200 범위 이내이며 지수가 100을 초과할수록 "매수자가 많다"를 ,100미만일 경우 "매도자가 많다"를 의미합니다.'},
                        {text: '통계는 시도단위로 제공됩니다. (전국/서울/부산/대구/인천/광주/대전/울산/세종/경기/강원/충북/충남/전북/전남/경북/경남/제주/기타지방)'}
                    ],
                    week: false
                },
                {
                    title: '"전세수급 지수"란?',
                    conlist: [
                        {text: '지역내 부동산중개업소를 대상으로 부동산시장에 대한 설문조사 통계입니다.'},
                        {text: '지역내 전세매물에 대한 공급이 충분한지 부족한지 그 비율을 지수화한 통계입니다.'},
                        {text: '전세수급지수 = 100 +"공급부족"비중 -"공급충분"비중 (조사항목 : 공급부족, 적절, 공급충분 3개중 택 1)'},
                        {text: '전세수급지수는 0~200 범위 이내이며 지수가 100을 초과할수록 "공급부족"비중이 높음을 의미합니다.'},
                        {text: '통계는 시도단위로 제공됩니다. (전국/서울/부산/대구/인천/광주/대전/울산/세종/경기/강원/충북/충남/전북/전남/경북/경남/제주/기타지방)'}
                    ],
                    week: false
                },
                {
                    title: '"매매거래 활발 지수"란?',
                    conlist: [
                        {text: '지역내 부동산중개업소를 대상으로 부동산시장에 대한 설문조사 통계입니다.'},
                        {text: '지역내 매매거래가 활발한지 한산한지 그 비율을 지수화한 통계입니다.'},
                        {text: '매매거래 활발 지수 = 100 +"활발함"비중 -"한산함"비중 (조사항목 : 활발함, 보통, 한산함 3개중 택 1)'},
                        {text: '매매거래 활발 지수는 0~200 범위 이내이며 지수가 100을 초과할수록 "활발함"비중이 높음을 의미합니다.'},
                        {text: '통계는 시도단위로 제공됩니다. (전국/서울/부산/대구/인천/광주/대전/울산/세종/경기/강원/충북/충남/전북/전남/경북/경남/제주/기타지방)'}
                    ],
                    week: false
                },
                {
                    title: '"전세거래 활발 지수"란?',
                    conlist: [
                        {text: '지역내 부동산중개업소를 대상으로 부동산시장에 대한 설문조사 통계입니다.'},
                        {text: '지역내 전세거래가 활발한지 한산한지 그 비율을 지수화한 통계입니다.'},
                        {text: '전세거래 활발 지수 = 100 +"활발함"비중 -"한산함"비중 (조사항목 : 활발함, 보통, 한산함 3개중 택 1)'},
                        {text: '전세거래 활발 지수는 0~200 범위 이내이며 지수가 100을 초과할수록 "활발함"비중이 높음을 의미합니다.'},
                        {text: '통계는 시도단위로 제공됩니다. (전국/서울/부산/대구/인천/광주/대전/울산/세종/경기/강원/충북/충남/전북/전남/경북/경남/제주/기타지방)'}
                    ],
                    week: false
                },
                {
                    title: '"KB시세 아파트 매매가격 대비 전세가격 비(율)"이란?',
                    conlist: [
                        {text: '아파트의 매매시세 대시 전세시세의 비율(전세시세/매매시세)입니다.'},
                        {text: '지역내 조사되는 아파트를 대상으로 하며 통계는 세대수를 적용하여 동읍면과 구시군 및 시도 단위로 제공됩니다.'}
                    ],
                    week: false
                },
                {
                    title: '"거래량"이란?',
                    conlist: [
                        {text: '해당지역 주택/아파트 매매거래량 데이터입니다. (자료출처 : 한국부동산원)'},
                        {text: '주택유형을 주택전체 또는 아파트로 차트에서 선택하실 수 있습니다.'},
                        {text: '통계는 구시군 및 시도 단위로 제공됩니다.'}
                    ],
                    week: true
                },
                {
                    title: '"미분양 물량"이란?',
                    conlist: [
                        {text: '해당지역 미분양 현황 데이터입니다. (자료출처 : 국가공공데이터포털)'},
                        {text: '전체미분양 또는 준공후 미분양을 차트에서 선택하실 수 있습니다.'},
                        {text: '통계는 구시군 및 시도 단위로 제공됩니다.'}
                    ],
                    week: true
                },
                {
                    title: '"인구"이란?',
                    conlist: [
                        {text: '해당지역 인구 현황 데이터입니다. (자료출처 : 행정안전부, 통계청)'},
                        {text: '해당지역의 인구증감을 차트로 확인하실 수 있습니다.'},
                        {text: '통계는 구시군 및 시도 단위로 제공됩니다'}
                    ],
                    week: true
                }
            ]
        };
    },
    computed: {
        mychartTag() {
            return this.charttext.length > 5 ? true : false;
        }
    },
    watch: {
        scrollH: {
            deep: true,
            handler() {
                this.handleScroll();
            }
        }
    },
    methods: {
        //공통 == 버튼클래스 처리 active
        activeToggle(e, classname) {
            if (e.target.classList.contains(classname) === true) {
                e.target.classList.remove(classname);
            } else {
                e.target.classList.add(classname);
            }
        },
        // 선택 레이어 매매 전세 토글
        typeSetting(e, type) {
            if (type === 'Sell') {
                this.Sell = true;
                this.below = false;
            } else {
                this.Sell = false;
                this.below = true;
            }
            let tabbox = document.querySelectorAll('.tabtype5 .tab');
            tabbox.forEach(elem => {
                elem.classList.remove('active');
            });
            e.target.classList.add('active');
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
        //공통 == 탭클래스 처리 active
        tabClick(parm, type) {
            //console.log(type);
            if (type === '매매 평균가격') {
                this.tabnum = parm;
            }
        },
        //팁 * 체크박스 더보기
        toggleClick(type) {
            this[type] = !this[type];
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
        // 탭
        toggleTap(type) {
            if (type === 'selectLocationType1') {
                this.selectLocationType1 = true;
                this.selectLocationType2 = false;
            } else {
                this.selectLocationType2 = true;
                this.selectLocationType1 = false;
            }
            
        },
        inModal(type, num) {
            console.log(type);
            this.modalconNum = num;
            type === 'open' ? this.inModallayer = true : this.inModallayer = false;
        },
        //위젯 열기
        openWidget() {
            this.widget = !this.widget;
        },

        //인기단지위젯
        handleScroll() {
            this.scrollH > 50 ? this.popularOn = true : this.popularOn = false;
        }
    }
};
</script>