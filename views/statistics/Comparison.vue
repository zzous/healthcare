<template>
    <!-- 스크롤시 영역 보존을 위한 패딩추가 -->
    <section class="comparison" :style="fixedTable? 'padding-top:'+settingtableH +'px':null">
        <div class="mainTitle">
			<h1 class="titdepth1">통계비교</h1>
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
            <ShareCommon
                :pageurl ="this.$router.currentRoute.path"
            />
		</div>
        <div :class="['datatablebox',{chart2:chartnameA2, chart3:chartnameA3, chart4:chartnameA4}, {datatablefixed:fixedTable}]" ref="dataTable" >
            <!-- 통계설정 레이어 -->
            <div class="setlayer dataset"  v-if="settingOpen" :style="'left:'+setLeft + ';right:'+setRight"    style="display:none;">
                <div class="setbody flexbox">
                    <div class="databox kbdata">
                        <strong class="subtit">KB시세통계</strong>
                        <div role="tablist" class="tabbox tabtype5">
                            <span role="button" class="tab active"  @click="typeSetting($event)">매매</span>
                            <span role="button" class="tab" @click="typeSetting($event)">전세</span>
                        </div>
                        <div class="switch-button custom-control">
                            <input type="checkbox" id="changeRatio2">
                            <label for="changeRatio2" class="switch"><span class="txt">변동률</span></label>
                        </div>
                        <div class="datalistwrap">
                            <div role="listbox" class="datalist">
                                <div role="list" class="item">
                                    <span class="datatxt" @click="settingChart($event, '매매 평균가격(아파트)')">아파트 매매 평균가격</span>
                                    <button type="button" title="도움말" class="btn-help icohelp"></button>
                                    <div role="tooltip" class="tooltip white">
                                        <div class="inner">
                                            <div class="tit">
                                                <strong>'KB시세 매매/전세 평균가격'이란?</strong>
                                            </div>
                                            <ul class="dashlist">
                                                <li>아파트의 매매와 전세의 시세평균가격입니다.</li>
                                                <li>지역내 조사되는 아파트를 대상으로 하며 통계는 세대수를 적용하여 동읍면과 구시군 및 시도 단위로 제공됩니다. </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div role="list" class="item open icopopular">
                                    <span class="datatxt arw down">아파트 공급면적당 매매 평균가격</span>
                                </div>
                                <div class="sublist">
                                    <div role="list" class="item">
                                        <span class="datatxt" @click="settingChart($event, '공급 ㎡당 매매 평균가격(아파트)')">㎡당 평균가격</span>
                                        <button type="button" title="도움말" class="btn-help icohelp"></button>
                                        <div role="tooltip" class="tooltip white">
                                            <div class="inner">
                                                <div class="tit">
                                                    <strong>'KB시세 아파트 공급면적당 매매/전세 평균가격'이란?</strong>
                                                </div>
                                                <ul class="dashlist">
                                                    <li>아파트의 공급면적(m2)당 매매와 전세의 시세평균가격입니다.</li>
                                                    <li>지역내 조사되는 아파트를 대상으로 하며 통계는 세대수를 적용하여 동읍면과 구시군 및 시도 단위로 제공됩니다.</li>
                                                    <li>공급면적 m2 또는 3.3m2당 가격으로 구분되어 제공됩니다.</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div role="list" class="item">
                                        <span class="datatxt" @click="settingChart($event, '공급 3.3㎡당 매매 평균가격(아파트)')">3.3㎡당 평균가격</span>
                                        <button type="button" title="도움말" class="btn-help icohelp"></button>
                                        <div role="tooltip" class="tooltip white">
                                            <div class="inner">
                                                <div class="tit">
                                                    <strong>'KB시세 아파트 공급면적당 매매/전세 평균가격'이란?</strong>
                                                </div>
                                                <ul class="dashlist">
                                                    <li>아파트의 공급면적(m2)당 매매와 전세의 시세평균가격입니다.</li>
                                                    <li>지역내 조사되는 아파트를 대상으로 하며 통계는 세대수를 적용하여 동읍면과 구시군 및 시도 단위로 제공됩니다.</li>
                                                    <li>공급면적 m2 또는 3.3m2당 가격으로 구분되어 제공됩니다.</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div role="list" class="item open">
                                    <span class="datatxt arw down">아파트 전용면적별 매매 평균가격</span>
                                </div>
                                <div class="sublist">
                                    <div role="list" class="item">
                                        <span class="datatxt" @click="settingChart($event, '대형 매매 평균가격(아파트)')">대형 (135㎡ 초과)</span>
                                        <button type="button" title="도움말" class="btn-help icohelp"></button>
                                        <div role="tooltip" class="tooltip white">
                                            <div class="inner">
                                                <div class="tit">
                                                    <strong>'KB시세 아파트 전용면적별 매매/전세 평균가격'이란?</strong>
                                                </div>
                                                <ul class="dashlist">
                                                    <li>아파트의 전용면적 크기별로 매매와 전세의 시세평균가격입니다. 가구수(세대수)가 적용되어 있습니다.</li>
                                                    <li>지역내 조사되는 아파트를 대상으로 하며 통계는 세대수를 적용하여 동읍면과 구시군 및 시도 단위로 제공됩니다.</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div role="list" class="item">
                                        <span class="datatxt" @click="settingChart($event, '중대형 매매 평균가격(아파트)')">중대형 (102㎡ ~ 135㎡ 이하)</span>
                                        <button type="button" title="도움말" class="btn-help icohelp"></button>
                                        <div role="tooltip" class="tooltip white">
                                            <div class="inner">
                                                <div class="tit">
                                                    <strong>'KB시세 아파트 전용면적별 매매/전세 평균가격'이란?</strong>
                                                </div>
                                                <ul class="dashlist">
                                                    <li>아파트의 전용면적 크기별로 매매와 전세의 시세평균가격입니다. 가구수(세대수)가 적용되어 있습니다.</li>
                                                    <li>지역내 조사되는 아파트를 대상으로 하며 통계는 세대수를 적용하여 동읍면과 구시군 및 시도 단위로 제공됩니다.</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div role="list" class="item">
                                        <span class="datatxt" @click="settingChart($event, '중형 매매 평균가격(아파트)')">중형 (85㎡ 초과 ~ 102㎡ 이하)</span>
                                        <button type="button" title="도움말" class="btn-help icohelp"></button>
                                        <div role="tooltip" class="tooltip white">
                                            <div class="inner">
                                                <div class="tit">
                                                    <strong>'KB시세 아파트 전용면적별 매매/전세 평균가격'이란?</strong>
                                                </div>
                                                <ul class="dashlist">
                                                    <li>아파트의 전용면적 크기별로 매매와 전세의 시세평균가격입니다. 가구수(세대수)가 적용되어 있습니다.</li>
                                                    <li>지역내 조사되는 아파트를 대상으로 하며 통계는 세대수를 적용하여 동읍면과 구시군 및 시도 단위로 제공됩니다.</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div role="list" class="item">
                                        <span class="datatxt" @click="settingChart($event, '중소형 매매 평균가격(아파트)')">중소형 (60㎡ 초과 ~ 85㎡ 이하)</span>
                                        <button type="button" title="도움말" class="btn-help icohelp"></button>
                                        <div role="tooltip" class="tooltip white">
                                            <div class="inner">
                                                <div class="tit">
                                                    <strong>'KB시세 아파트 전용면적별 매매/전세 평균가격'이란?</strong>
                                                </div>
                                                <ul class="dashlist">
                                                    <li>아파트의 전용면적 크기별로 매매와 전세의 시세평균가격입니다. 가구수(세대수)가 적용되어 있습니다.</li>
                                                    <li>지역내 조사되는 아파트를 대상으로 하며 통계는 세대수를 적용하여 동읍면과 구시군 및 시도 단위로 제공됩니다.</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div role="list" class="item">
                                        <span class="datatxt" @click="settingChart($event, '소형 매매 평균가격(아파트)')">소형 (60㎡ 이하)</span>
                                        <button type="button" title="도움말" class="btn-help icohelp"></button>
                                        <div role="tooltip" class="tooltip white">
                                            <div class="inner">
                                                <div class="tit">
                                                    <strong>'KB시세 아파트 전용면적별 매매/전세 평균가격'이란?</strong>
                                                </div>
                                                <ul class="dashlist">
                                                    <li>아파트의 전용면적 크기별로 매매와 전세의 시세평균가격입니다. 가구수(세대수)가 적용되어 있습니다.</li>
                                                    <li>지역내 조사되는 아파트를 대상으로 하며 통계는 세대수를 적용하여 동읍면과 구시군 및 시도 단위로 제공됩니다.</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div role="listbox" class="datalist">
                                <div role="list" class="item">
                                    <span class="datatxt" @click="settingChart($event, '매매 가격지수(아파트)')">아파트 매매 가격 지수</span>
                                    <button type="button" title="도움말" class="btn-help icohelp"></button>
                                    <div role="tooltip" class="tooltip white">
                                        <div class="inner">
                                            <div class="tit">
                                                <strong>'KB 아파트 매매/전세 가격지수'란?</strong>
                                            </div>
                                            <ul class="dashlist">
                                                <li>아파트의 매매와 전세 가격을 기준시점 대비 상대적인 가격을 지수화한 수치입니다.</li>
                                                <li>지역내 조사되는 아파트를 대상으로 하며 통계는 세대수를 적용하여 구시군 및 시도 단위로 제공됩니다.</li>
                                                <li>기준시점과 기준지수는 2022.01.10=100.0입니다.</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div role="list" class="item open">
                                    <span class="datatxt arw down">시장동향 심리지수</span>
                                </div>
                                <div class="sublist">
                                    <div role="list" class="item">
                                        <span class="datatxt" @click="settingChart($event, '매수우위지수')">매수우위지수</span>
                                        <button type="button" title="도움말" class="btn-help icohelp"></button>
                                        <div role="tooltip" class="tooltip white">
                                            <div class="inner">
                                                <div class="tit">
                                                    <strong>'매수우위지수'란?</strong>
                                                </div>
                                                <ul class="dashlist">
                                                    <li>지역내 부동산중개업소를 대상으로 부동산시장에 대한 설문조사 통계입니다.</li>
                                                    <li>부동산 문의가 매수자의 문의가 많은지 매도자의 문의가 많은지 그 비율을 지수화한 통계입니다.</li>
                                                    <li>매수우위지수 = 100 +"매수자 많음"비중 -"매도자 많음"비중  (조사항목 : 매수자 많음, 비슷함, 매도자 많음 3개중 택 1)</li>
                                                    <li>매수우위지수는 0~200 범위 이내이며 지수가 100을 초과할수록 '매수자가 많다'를 ,100미만일 경우 '매도자가 많다'를 의미합니다.</li>
                                                    <li>통계는 시도단위로 제공됩니다. (전국/서울/부산/대구/인천/광주/대전/울산/세종/경기/강원/충북/충남/전북/전남/경북/경남/제주/기타지방)</li>
                                                </ul>
                                            </div>
                                        </div>
                                        <!-- 전세 탭인 경우)
                                        <span class="datatxt" @click="settingChart($event, '전세수급지수')">전세수급지수</span>
                                        <button type="button" title="도움말" class="btn-help icohelp"></button>
                                        <div role="tooltip" class="tooltip white">
                                            <div class="inner">
                                                <div class="tit">
                                                    <strong>'전세수급 지수'란?</strong>
                                                </div>
                                                <ul class="dashlist">
                                                    <li>지역내 부동산중개업소를 대상으로 부동산시장에 대한 설문조사 통계입니다.</li>
                                                    <li>지역내 전세매물에 대한 공급이 충분한지 부족한지 그 비율을 지수화한 통계입니다.</li>
                                                    <li>전세수급지수 = 100 +"공급부족"비중 -"공급충분"비중  (조사항목 : 공급부족, 적절, 공급충분 3개중 택 1)</li>
                                                    <li>전세수급지수는 0~200 범위 이내이며 지수가 100을 초과할수록 '공급부족'비중이 높음을 의미합니다.</li>
                                                    <li>통계는 시도단위로 제공됩니다. (전국/서울/부산/대구/인천/광주/대전/울산/세종/경기/강원/충북/충남/전북/전남/경북/경남/제주/기타지방)</li>
                                                </ul>
                                            </div>
                                        </div>
                                        -->
                                    </div>
                                    <div role="list" class="item">
                                        <span class="datatxt" @click="settingChart($event, '매매 거래 활발 지수')">매매 거래 활발 지수</span>
                                        <button type="button" title="도움말" class="btn-help icohelp"></button>
                                        <div role="tooltip" class="tooltip white">
                                            <div class="inner">
                                                <div class="tit">
                                                    <strong>'매매거래 활발 지수'란?</strong>
                                                </div>
                                                <ul class="dashlist">
                                                    <li>지역내 부동산중개업소를 대상으로 부동산시장에 대한 설문조사 통계입니다.</li>
                                                    <li>지역내 매매거래가 활발한지 한산한지 그 비율을 지수화한 통계입니다.</li>
                                                    <li>매매거래 활발 지수 = 100 +"활발함"비중 -"한산함"비중  (조사항목 : 활발함, 보통, 한산함 3개중 택 1)</li>
                                                    <li>매매거래 활발 지수는 0~200 범위 이내이며 지수가 100을 초과할수록 '활발함'비중이 높음을 의미합니다.</li>
                                                    <li>통계는 시도단위로 제공됩니다. (전국/서울/부산/대구/인천/광주/대전/울산/세종/경기/강원/충북/충남/전북/전남/경북/경남/제주/기타지방)</li>
                                                </ul>
                                            </div>
                                        </div>
                                        <!-- 전세 탭인 경우)
                                        <span class="datatxt" @click="settingChart($event, '전세 거래 활발 지수')">전세 거래 활발 지수</span>
                                        <button type="button" title="도움말" class="btn-help icohelp"></button>
                                        <div role="tooltip" class="tooltip white">
                                            <div class="inner">
                                                <div class="tit">
                                                    <strong>'전세거래 활발 지수'란?</strong>
                                                </div>
                                                <ul class="dashlist">
                                                    <li>지역내 부동산중개업소를 대상으로 부동산시장에 대한 설문조사 통계입니다.</li>
                                                    <li>지역내 전세거래가 활발한지 한산한지 그 비율을 지수화한 통계입니다.</li>
                                                    <li>전세거래 활발 지수 = 100 +"활발함"비중 -"한산함"비중  (조사항목 : 활발함, 보통, 한산함 3개중 택 1)</li>
                                                    <li>전세거래 활발 지수는 0~200 범위 이내이며 지수가 100을 초과할수록 '활발함'비중이 높음을 의미합니다.</li>
                                                    <li>통계는 시도단위로 제공됩니다. (전국/서울/부산/대구/인천/광주/대전/울산/세종/경기/강원/충북/충남/전북/전남/경북/경남/제주/기타지방)</li>
                                                </ul>
                                            </div>
                                        </div>
                                        -->
                                    </div>
                                </div>
                                <div role="list" class="item">
                                    <span class="datatxt" @click="settingChart($event, '전세가율(아파트)')">아파트 매매가격 대비 전세가격 비(율)</span>
                                    <button type="button" title="도움말" class="btn-help icohelp"></button>
                                    <div role="tooltip" class="tooltip white">
                                        <div class="inner">
                                            <div class="tit">
                                                <strong>'KB시세 아파트 매매가격 대비 전세가격 비(율)'이란?</strong>
                                            </div>
                                            <ul class="dashlist">
                                                <li>아파트의 매매시세 대시 전세시세의 비율(전세시세/매매시세)입니다.</li>
                                                <li>지역내 조사되는 아파트를 대상으로 하며 통계는 세대수를 적용하여 동읍면과 구시군 및 시도 단위로 제공됩니다.</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="databox opendata">
                        <strong class="subtit">공공데이터</strong>
                        <div role="listbox" class="datalist">
                            <div role="list" class="item">
                                <span class="datatxt">거래량</span>
                                <button type="button" title="도움말" class="btn-help icohelp"></button>
                                <div role="tooltip" class="tooltip white">
                                    <div class="inner">
                                        <div class="tit">
                                            <strong>'거래량'이란?</strong>
                                        </div>
                                        <ul class="dashlist">
                                            <li>해당지역 주택/아파트 매매거래량 데이터입니다.  (자료출처 : 한국부동산원)</li>
                                            <li>주택유형을 주택전체 또는 아파트로 차트에서 선택하실 수 있습니다.</li>
                                            <li>통계는 구시군 및 시도 단위로 제공됩니다.</li>
                                        </ul>
                                        <div class="guideinfo line icoinfo1">주간 데이터를 제공하지 않습니다.</div>
                                    </div>
                                </div>
                            </div>
                            <div role="list" class="item">
                                <span class="datatxt">미분양물량</span>
                                <button type="button" title="도움말" class="btn-help icohelp"></button>
                                <div role="tooltip" class="tooltip white">
                                    <div class="inner">
                                        <div class="tit">
                                            <strong>'미분양 물량'이란?</strong>
                                        </div>
                                        <ul class="dashlist">
                                            <li>해당지역 미분양 현황 데이터입니다. (자료출처 : 국가공공데이터포털)</li>
                                            <li>전체미분양 또는 준공후 미분양을 차트에서 선택하실 수 있습니다.</li>
                                            <li>통계는 구시군 및 시도 단위로 제공됩니다.</li>
                                        </ul>
                                        <div class="guideinfo line icoinfo1">주간 데이터를 제공하지 않습니다.</div>
                                    </div>
                                </div>
                            </div>
                            <div role="list" class="item iconew">
                                <span class="datatxt">인구</span>
                                <button type="button" title="도움말" class="btn-help icohelp"></button>
                                <div role="tooltip" class="tooltip white">
                                    <div class="inner">
                                        <div class="tit">
                                            <strong>'인구'란?</strong>
                                        </div>
                                        <ul class="dashlist">
                                            <li>해당지역 인구 현황 데이터입니다. (자료출처 : 행정안전부, 통계청)</li>
                                            <li>해당지역의 인구증감을 차트로 확인하실 수 있습니다.</li>
                                            <li>통계는 구시군 및 시도 단위로 제공됩니다.</li>
                                        </ul>
                                        <div class="guideinfo line icoinfo1">주간 데이터를 제공하지 않습니다.</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="setfoot line">
                    <button type="button" class="btn btn-delete">삭제</button>
                    <button type="button" class="btn md round blueline" @click="settingClose">취소</button>
                    <button type="button" class="btn md round blue" @click="confirmChart">확인</button>
                </div>
            </div>
            <div role="tooltip" class="tooltip top" style="top:45px; left:0;" v-if="agreeTip">
                <span aria-hidden="true" class="arrow" style="left:4%"></span>
                <div class="flexbox">
                    <p>최대 5개 지역까지 차트 적용이 가능해요</p>
                    <button type="button" title="툴팁닫기" class="tipclose" @click="Tipclose('agree')"></button>
                </div>
            </div>
            <div role="tooltip" class="tooltip top" style="top:3px; right:165px;" v-if="otherdataTip">
                <span aria-hidden="true" class="arrow" style="left:6%"></span>
                <div class="flexbox">
                    <p>데이터를 선택해보세요</p>
                    <button type="button" title="툴팁닫기" class="tipclose" @click="Tipclose('other')"></button>
                </div>
            </div>

            <!-- 기간 및 지역 설정 레이어 -->
            <div class="setlayer dateareaset"  style="display:none;">
                <div class="setbody">
                    <div class="tabbox tabtype1">
                        <span role="button" class="tab active">전체</span>
                        <span role="button" class="tab">10년</span>
                        <span role="button" class="tab">5년</span>
                        <span role="button" class="tab">3년</span>
                        <span role="button" class="tab">2년</span>
                        <span role="button" class="tab">1년</span>
                        <span role="button" class="tab">6개월</span>
                        <span role="button" class="tab" @click="customDate" :class="{active:datepickerLayer}">직접설정</span>
                    </div>

                    <!-- 02.0217_기간직접설정 레이어 -->
                    <div class="subsetlayer" v-if="datepickerLayer">
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
                            <button type="button" class="btn md round blueline" @click="customDate">취소</button>
                            <button type="button" class="btn md round blue">선택</button>
                        </div>
                    </div>

                    <!-- 기간 슬라이더 영역-->
                    <div class="rangebox">
                        <RangeSlider
                            v-model="datevalue"
                            :marks="true"
                            :data="rangedata"
                        />
                    </div>

                    <div role="tablist" class="tabbox tabtype3">
                        <span role="tab" class="tab active" @click="TapContent($event, 'tapcontent1')">개별지역 선택하기 (최대10개)</span>
                        <span role="tab" class="tab" @click="TapContent($event, 'tapcontent2')">단일지역 전체 선택하기</span>
                    </div>
                    <!-- 개별지역 선택하기 -->
                    <div role="tabpanel" class="stepselectbox indivisual" v-if="tapcontent === 'tapcontent1'">
                        <div class="stepselect">
                            <jQueryScrollbar :useCtrl="{direction: 'x',customClass:'typeBig' }">
                                <div class="btnselect all selected">
                                    <span role="button" class="add" title="선택된지역"></span>
                                    <span role="button" class="txt" title="하위지역보기">전국</span>
                                </div>
                                <div class="btnselect selected">
                                    <span role="button" class="add" title="선택된지역"></span>
                                    <span role="button" class="txt" title="하위지역보기">서울</span>
                                </div>
                                <div class="btnselect">
                                    <span role="button" class="add" title="지역추가"></span>
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
                                <div class="btnselect">
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
                            <!-- <p class="nonecont">시/군/구</p> -->
                            <!-- 하위지역이 없는 읍면동의 경우 -->
                            <jQueryScrollbar :useCtrl="{direction: 'x',customClass:'typeBig' }">
                                <div class="btnselect last">
                                    <span role="button" class="add" title="지역추가"></span>
                                    <span role="button" class="txt" title="하위지역보기">양재동</span>
                                </div>
                            </jQueryScrollbar>
                        </div>
                        <div class="stepselect">
                            <p class="nonecont">읍/면/동</p>
                        </div>
                    </div>
                    <!-- 단일지역전체 선택하기 -->
                    <div role="tabpanel" class="stepselectbox single" v-if="tapcontent === 'tapcontent2'">
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
                                    <span role="button" class="txt" title="하위지역보기">광진구</span>
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
                    </div>
                    <!-- 태그이동 -->
                    <div class="areagroup">
                        <p class="guideinfo icoinfo2">드래그해서 순서변경이 가능해요</p>
                        <jQueryScrollbar><!-- 2022.02.18 퍼블 변경 -->
                            <div class="areatagbox">
                                <div class="tag round">전국 <span role="button" class="icodel" title="선택 삭제"></span></div>
                                <div class="tag round">서울시 <span role="button" class="icodel" title="선택 삭제"></span></div>
                                <div class="tag round">서울시 강남구 <span role="button" class="icodel" title="선택 삭제"></span></div>
                                <div class="tag round">서울시 서초구 <span role="button" class="icodel" title="선택 삭제"></span></div>
                                <div class="tag round">서울시 송파구 <span role="button" class="icodel" title="선택 삭제"></span></div>
                            </div>
                        </jQueryScrollbar>
                    </div>
                </div>
                <div class="setfoot">
                    <button type="button" class="btn md round blueline">취소</button>
                    <button type="button" class="btn md round blue">선택</button>
                </div>
            </div>


            <!-- 2022.03.04 변경된 UI 퍼블반영 :: 통계설정 레이어 -->
            <div class="setLayer dataset"  v-if="settingOpen" :style="'left:'+setLeft + ';right:'+setRight">
                <div class="setHead">
                    <button type="button" class="btn btn-popclose" title="닫기" @click="toggleClick('settingOpen')"> 닫기</button>
                    <strong>데이터 설정</strong>
                </div>
                <div class="setBody flexbox">
                    <div class="databox kbdata">
                        <strong class="subtit">KB시세통계</strong>
                        <div role="tablist" class="tabbox tabtype5">
                            <span role="button" class="tab active"  @click="typeSetting($event)">매매</span>
                            <span role="button" class="tab" @click="typeSetting($event)">전세</span>
                        </div>
                        <div class="switch-button custom-control">
                            <input type="checkbox" id="changeRatio">
                            <label for="changeRatio" class="switch"><span class="txt">변동률</span></label>
                        </div>
                        <div class="datalistwrap">
                            <div role="listbox" class="datalist">
                                <div role="list" class="item">
                                    <span class="datatxt" @click="settingChart($event, '매매 평균가격(아파트)')">아파트 매매 평균가격</span>
                                    <button type="button" title="도움말" class="btn-help icohelp"></button>
                                    <div role="tooltip" class="tooltip white">
                                        <div class="inner">
                                            <div class="tit">
                                                <strong>'KB시세 매매/전세 평균가격'이란?</strong>
                                            </div>
                                            <ul class="dashlist">
                                                <li>아파트의 매매와 전세의 시세평균가격입니다.</li>
                                                <li>지역내 조사되는 아파트를 대상으로 하며 통계는 세대수를 적용하여 동읍면과 구시군 및 시도 단위로 제공됩니다. </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div role="list" class="item open icopopular">
                                    <span class="datatxt arw down">아파트 공급면적당 매매 평균가격</span>
                                </div>
                                <div class="sublist">
                                    <div role="list" class="item">
                                        <span class="datatxt" @click="settingChart($event, '공급 ㎡당 매매 평균가격(아파트)')">㎡당 평균가격</span>
                                        <button type="button" title="도움말" class="btn-help icohelp"></button>
                                        <div role="tooltip" class="tooltip white">
                                            <div class="inner">
                                                <div class="tit">
                                                    <strong>'KB시세 아파트 공급면적당 매매/전세 평균가격'이란?</strong>
                                                </div>
                                                <ul class="dashlist">
                                                    <li>아파트의 공급면적(m2)당 매매와 전세의 시세평균가격입니다.</li>
                                                    <li>지역내 조사되는 아파트를 대상으로 하며 통계는 세대수를 적용하여 동읍면과 구시군 및 시도 단위로 제공됩니다.</li>
                                                    <li>공급면적 m2 또는 3.3m2당 가격으로 구분되어 제공됩니다.</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div role="list" class="item">
                                        <span class="datatxt" @click="settingChart($event, '공급 3.3㎡당 매매 평균가격(아파트)')">3.3㎡당 평균가격</span>
                                        <button type="button" title="도움말" class="btn-help icohelp"></button>
                                        <div role="tooltip" class="tooltip white">
                                            <div class="inner">
                                                <div class="tit">
                                                    <strong>'KB시세 아파트 공급면적당 매매/전세 평균가격'이란?</strong>
                                                </div>
                                                <ul class="dashlist">
                                                    <li>아파트의 공급면적(m2)당 매매와 전세의 시세평균가격입니다.</li>
                                                    <li>지역내 조사되는 아파트를 대상으로 하며 통계는 세대수를 적용하여 동읍면과 구시군 및 시도 단위로 제공됩니다.</li>
                                                    <li>공급면적 m2 또는 3.3m2당 가격으로 구분되어 제공됩니다.</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div role="list" class="item open">
                                    <span class="datatxt arw down">아파트 전용면적별 매매 평균가격</span>
                                </div>
                                <div class="sublist">
                                    <div role="list" class="item">
                                        <span class="datatxt" @click="settingChart($event, '대형 매매 평균가격(아파트)')">대형 (135㎡ 초과)</span>
                                        <button type="button" title="도움말" class="btn-help icohelp"></button>
                                        <div role="tooltip" class="tooltip white">
                                            <div class="inner">
                                                <div class="tit">
                                                    <strong>'KB시세 아파트 전용면적별 매매/전세 평균가격'이란?</strong>
                                                </div>
                                                <ul class="dashlist">
                                                    <li>아파트의 전용면적 크기별로 매매와 전세의 시세평균가격입니다. 가구수(세대수)가 적용되어 있습니다.</li>
                                                    <li>지역내 조사되는 아파트를 대상으로 하며 통계는 세대수를 적용하여 동읍면과 구시군 및 시도 단위로 제공됩니다.</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div role="list" class="item">
                                        <span class="datatxt" @click="settingChart($event, '중대형 매매 평균가격(아파트)')">중대형 (102㎡ ~ 135㎡ 이하)</span>
                                        <button type="button" title="도움말" class="btn-help icohelp"></button>
                                        <div role="tooltip" class="tooltip white">
                                            <div class="inner">
                                                <div class="tit">
                                                    <strong>'KB시세 아파트 전용면적별 매매/전세 평균가격'이란?</strong>
                                                </div>
                                                <ul class="dashlist">
                                                    <li>아파트의 전용면적 크기별로 매매와 전세의 시세평균가격입니다. 가구수(세대수)가 적용되어 있습니다.</li>
                                                    <li>지역내 조사되는 아파트를 대상으로 하며 통계는 세대수를 적용하여 동읍면과 구시군 및 시도 단위로 제공됩니다.</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div role="list" class="item">
                                        <span class="datatxt" @click="settingChart($event, '중형 매매 평균가격(아파트)')">중형 (85㎡ 초과 ~ 102㎡ 이하)</span>
                                        <button type="button" title="도움말" class="btn-help icohelp"></button>
                                        <div role="tooltip" class="tooltip white">
                                            <div class="inner">
                                                <div class="tit">
                                                    <strong>'KB시세 아파트 전용면적별 매매/전세 평균가격'이란?</strong>
                                                </div>
                                                <ul class="dashlist">
                                                    <li>아파트의 전용면적 크기별로 매매와 전세의 시세평균가격입니다. 가구수(세대수)가 적용되어 있습니다.</li>
                                                    <li>지역내 조사되는 아파트를 대상으로 하며 통계는 세대수를 적용하여 동읍면과 구시군 및 시도 단위로 제공됩니다.</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div role="list" class="item">
                                        <span class="datatxt" @click="settingChart($event, '중소형 매매 평균가격(아파트)')">중소형 (60㎡ 초과 ~ 85㎡ 이하)</span>
                                        <button type="button" title="도움말" class="btn-help icohelp"></button>
                                        <div role="tooltip" class="tooltip white">
                                            <div class="inner">
                                                <div class="tit">
                                                    <strong>'KB시세 아파트 전용면적별 매매/전세 평균가격'이란?</strong>
                                                </div>
                                                <ul class="dashlist">
                                                    <li>아파트의 전용면적 크기별로 매매와 전세의 시세평균가격입니다. 가구수(세대수)가 적용되어 있습니다.</li>
                                                    <li>지역내 조사되는 아파트를 대상으로 하며 통계는 세대수를 적용하여 동읍면과 구시군 및 시도 단위로 제공됩니다.</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div role="list" class="item">
                                        <span class="datatxt" @click="settingChart($event, '소형 매매 평균가격(아파트)')">소형 (60㎡ 이하)</span>
                                        <button type="button" title="도움말" class="btn-help icohelp"></button>
                                        <div role="tooltip" class="tooltip white">
                                            <div class="inner">
                                                <div class="tit">
                                                    <strong>'KB시세 아파트 전용면적별 매매/전세 평균가격'이란?</strong>
                                                </div>
                                                <ul class="dashlist">
                                                    <li>아파트의 전용면적 크기별로 매매와 전세의 시세평균가격입니다. 가구수(세대수)가 적용되어 있습니다.</li>
                                                    <li>지역내 조사되는 아파트를 대상으로 하며 통계는 세대수를 적용하여 동읍면과 구시군 및 시도 단위로 제공됩니다.</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div role="listbox" class="datalist">
                                <div role="list" class="item">
                                    <span class="datatxt" @click="settingChart($event, '매매 가격지수(아파트)')">아파트 매매 가격 지수</span>
                                    <button type="button" title="도움말" class="btn-help icohelp"></button>
                                    <div role="tooltip" class="tooltip white">
                                        <div class="inner">
                                            <div class="tit">
                                                <strong>'KB 아파트 매매/전세 가격지수'란?</strong>
                                            </div>
                                            <ul class="dashlist">
                                                <li>아파트의 매매와 전세 가격을 기준시점 대비 상대적인 가격을 지수화한 수치입니다.</li>
                                                <li>지역내 조사되는 아파트를 대상으로 하며 통계는 세대수를 적용하여 구시군 및 시도 단위로 제공됩니다.</li>
                                                <li>기준시점과 기준지수는 2019.1.14 = 100.0 입니다.</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div role="list" class="item open">
                                    <span class="datatxt arw down">시장동향 심리지수</span>
                                </div>
                                <div class="sublist">
                                    <div role="list" class="item">
                                        <span class="datatxt" @click="settingChart($event, '매수우위지수')">매수우위지수</span>
                                        <button type="button" title="도움말" class="btn-help icohelp"></button>
                                        <div role="tooltip" class="tooltip white">
                                            <div class="inner">
                                                <div class="tit">
                                                    <strong>'매수우위지수'란?</strong>
                                                </div>
                                                <ul class="dashlist">
                                                    <li>지역내 부동산중개업소를 대상으로 부동산시장에 대한 설문조사 통계입니다.</li>
                                                    <li>부동산 문의가 매수자의 문의가 많은지 매도자의 문의가 많은지 그 비율을 지수화한 통계입니다.</li>
                                                    <li>매수우위지수 = 100 +"매수자 많음"비중 -"매도자 많음"비중  (조사항목 : 매수자 많음, 비슷함, 매도자 많음 3개중 택 1)</li>
                                                    <li>매수우위지수는 0~200 범위 이내이며 지수가 100을 초과할수록 '매수자가 많다'를 ,100미만일 경우 '매도자가 많다'를 의미합니다.</li>
                                                    <li>통계는 시도단위로 제공됩니다. (전국/서울/부산/대구/인천/광주/대전/울산/세종/경기/강원/충북/충남/전북/전남/경북/경남/제주/기타지방)</li>
                                                </ul>
                                            </div>
                                        </div>
                                        <!-- 전세 탭인 경우)
                                        <span class="datatxt" @click="settingChart($event, '전세수급지수')">전세수급지수</span>
                                        <button type="button" title="도움말" class="btn-help icohelp"></button>
                                        <div role="tooltip" class="tooltip white">
                                            <div class="inner">
                                                <div class="tit">
                                                    <strong>'전세수급 지수'란?</strong>
                                                </div>
                                                <ul class="dashlist">
                                                    <li>지역내 부동산중개업소를 대상으로 부동산시장에 대한 설문조사 통계입니다.</li>
                                                    <li>지역내 전세매물에 대한 공급이 충분한지 부족한지 그 비율을 지수화한 통계입니다.</li>
                                                    <li>전세수급지수 = 100 +"공급부족"비중 -"공급충분"비중  (조사항목 : 공급부족, 적절, 공급충분 3개중 택 1)</li>
                                                    <li>전세수급지수는 0~200 범위 이내이며 지수가 100을 초과할수록 '공급부족'비중이 높음을 의미합니다.</li>
                                                    <li>통계는 시도단위로 제공됩니다. (전국/서울/부산/대구/인천/광주/대전/울산/세종/경기/강원/충북/충남/전북/전남/경북/경남/제주/기타지방)</li>
                                                </ul>
                                            </div>
                                        </div>
                                        -->
                                    </div>
                                    <div role="list" class="item">
                                        <span class="datatxt" @click="settingChart($event, '매매 거래 활발 지수')">매매 거래 활발 지수</span>
                                        <button type="button" title="도움말" class="btn-help icohelp"></button>
                                        <div role="tooltip" class="tooltip white">
                                            <div class="inner">
                                                <div class="tit">
                                                    <strong>'매매거래 활발 지수'란?</strong>
                                                </div>
                                                <ul class="dashlist">
                                                    <li>지역내 부동산중개업소를 대상으로 부동산시장에 대한 설문조사 통계입니다.</li>
                                                    <li>지역내 매매거래가 활발한지 한산한지 그 비율을 지수화한 통계입니다.</li>
                                                    <li>매매거래 활발 지수 = 100 +"활발함"비중 -"한산함"비중  (조사항목 : 활발함, 보통, 한산함 3개중 택 1)</li>
                                                    <li>매매거래 활발 지수는 0~200 범위 이내이며 지수가 100을 초과할수록 '활발함'비중이 높음을 의미합니다.</li>
                                                    <li>통계는 시도단위로 제공됩니다. (전국/서울/부산/대구/인천/광주/대전/울산/세종/경기/강원/충북/충남/전북/전남/경북/경남/제주/기타지방)</li>
                                                </ul>
                                            </div>
                                        </div>
                                        <!-- 전세 탭인 경우)
                                        <span class="datatxt" @click="settingChart($event, '전세 거래 활발 지수')">전세 거래 활발 지수</span>
                                        <button type="button" title="도움말" class="btn-help icohelp"></button>
                                        <div role="tooltip" class="tooltip white">
                                            <div class="inner">
                                                <div class="tit">
                                                    <strong>'전세거래 활발 지수'란?</strong>
                                                </div>
                                                <ul class="dashlist">
                                                    <li>지역내 부동산중개업소를 대상으로 부동산시장에 대한 설문조사 통계입니다.</li>
                                                    <li>지역내 전세거래가 활발한지 한산한지 그 비율을 지수화한 통계입니다.</li>
                                                    <li>전세거래 활발 지수 = 100 +"활발함"비중 -"한산함"비중  (조사항목 : 활발함, 보통, 한산함 3개중 택 1)</li>
                                                    <li>전세거래 활발 지수는 0~200 범위 이내이며 지수가 100을 초과할수록 '활발함'비중이 높음을 의미합니다.</li>
                                                    <li>통계는 시도단위로 제공됩니다. (전국/서울/부산/대구/인천/광주/대전/울산/세종/경기/강원/충북/충남/전북/전남/경북/경남/제주/기타지방)</li>
                                                </ul>
                                            </div>
                                        </div>
                                        -->
                                    </div>
                                </div>
                                <div role="list" class="item">
                                    <span class="datatxt" @click="settingChart($event, '전세가율(아파트)')">아파트 매매가격 대비 전세가격 비(율)</span>
                                    <button type="button" title="도움말" class="btn-help icohelp"></button>
                                    <div role="tooltip" class="tooltip white">
                                        <div class="inner">
                                            <div class="tit">
                                                <strong>'KB시세 아파트 매매가격 대비 전세가격 비(율)'이란?</strong>
                                            </div>
                                            <ul class="dashlist">
                                                <li>아파트의 매매시세 대시 전세시세의 비율(전세시세/매매시세)입니다.</li>
                                                <li>지역내 조사되는 아파트를 대상으로 하며 통계는 세대수를 적용하여 동읍면과 구시군 및 시도 단위로 제공됩니다.</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="databox opendata">
                        <strong class="subtit">공공데이터</strong>
                        <div role="listbox" class="datalist">
                            <div role="list" class="item">
                                <span class="datatxt">거래량</span>
                                <button type="button" title="도움말" class="btn-help icohelp"></button>
                                <div role="tooltip" class="tooltip white">
                                    <div class="inner">
                                        <div class="tit">
                                            <strong>'거래량'이란?</strong>
                                        </div>
                                        <ul class="dashlist">
                                            <li>해당지역 주택/아파트 매매거래량 데이터입니다.  (자료출처 : 한국부동산원)</li>
                                            <li>주택유형을 주택전체 또는 아파트로 차트에서 선택하실 수 있습니다.</li>
                                            <li>통계는 구시군 및 시도 단위로 제공됩니다.</li>
                                        </ul>
                                        <div class="guideinfo line icoinfo1">주간 데이터를 제공하지 않습니다.</div>
                                    </div>
                                </div>
                            </div>
                            <div role="list" class="item">
                                <span class="datatxt">미분양물량</span>
                                <button type="button" title="도움말" class="btn-help icohelp"></button>
                                <div role="tooltip" class="tooltip white">
                                    <div class="inner">
                                        <div class="tit">
                                            <strong>'미분양 물량'이란?</strong>
                                        </div>
                                        <ul class="dashlist">
                                            <li>해당지역 미분양 현황 데이터입니다. (자료출처 : 국가공공데이터포털)</li>
                                            <li>전체미분양 또는 준공후 미분양을 차트에서 선택하실 수 있습니다.</li>
                                            <li>통계는 구시군 및 시도 단위로 제공됩니다.</li>
                                        </ul>
                                        <div class="guideinfo line icoinfo1">주간 데이터를 제공하지 않습니다.</div>
                                    </div>
                                </div>
                            </div>
                            <div role="list" class="item iconew">
                                <span class="datatxt">인구</span>
                                <button type="button" title="도움말" class="btn-help icohelp"></button>
                                <div role="tooltip" class="tooltip white">
                                    <div class="inner">
                                        <div class="tit">
                                            <strong>'인구'란?</strong>
                                        </div>
                                        <ul class="dashlist">
                                            <li>해당지역 인구 현황 데이터입니다. (자료출처 : 행정안전부, 통계청)</li>
                                            <li>해당지역의 인구증감을 차트로 확인하실 수 있습니다.</li>
                                            <li>통계는 구시군 및 시도 단위로 제공됩니다.</li>
                                        </ul>
                                        <div class="guideinfo line icoinfo1">주간 데이터를 제공하지 않습니다.</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="setFoot line">
                    <button type="button" class="btn btn-delete">삭제</button>
                    <button type="button" class="btn round r30 grayline" @click="settingClose">취소</button>
                    <button type="button" class="btn round r30 blue" @click="confirmChart">확인</button>
                </div>
            </div>

            <!-- 2022.03.04 변경된 UI 퍼블반영 :: 기간 및 지역 설정 레이어 -->
            <div class="setLayer dateareaset" v-if="dateSetting">
                <div class="setHead">
                    <button type="button" class="btn btn-popclose" title="닫기" @click="toggleClick('dateSetting')"> 닫기</button>
                    <strong>설정</strong>
                    <div class="pickerarea" :class="{active:datepickerLayer}" @click="customDate()">
                        <div class="pickerselect-text">{{starttime}}~{{endtime}}</div>
                        <button class="iconbtn btn-picker" :class="{active:datepickerLayer}"></button>
                    </div>
                    <div class="listbtn">
                        <button type="button" class="btn textline" @click="ToggleSelect($event, '.listbtn .btn')">전체</button>
                        <button type="button" class="btn textline" @click="ToggleSelect($event, '.listbtn .btn')">10년</button>
                        <button type="button" class="btn textline" @click="ToggleSelect($event, '.listbtn .btn')">5년</button>
                        <button type="button" class="btn textline active" @click="ToggleSelect($event, '.listbtn .btn')">2년</button>
                        <button type="button" class="btn textline" @click="ToggleSelect($event, '.listbtn .btn')">1년</button>
                        <button type="button" class="btn textline" @click="ToggleSelect($event, '.listbtn .btn')">6개월</button>
                    </div>
                </div>
                <div class="setBody">
                    <!-- 02.0217_기간직접설정 레이어 -->
                    <div class="subsetlayer" v-if="datepickerLayer">
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
                            <button type="button" class="btn round r30 grayline" @click="toggleClick('datepickerLayer')">취소</button>
                            <button type="button" class="btn round r30 blue">확인</button>
                        </div>
                    </div>
                    <div role="tablist" :class="['tabbox tabtype3', checkedClass]">
                        <span role="tab" class="tab active" @click="TabSelect($event, 'tapcontent1', 'item1')">복수지역<em class="subtip">최대 10개</em></span>
                        <span role="tab" class="tab" @click="TabSelect($event, 'tapcontent2', 'item2')">단일지역<em class="subtip">하위지역포함</em></span>
                    </div>
                    <div class="flexbox">
                        <div class="datagroup">
                            <!-- 개별지역 선택하기 -->
                            <div role="tabpanel" class="stepAreabox" v-if="tabcontent === 'tapcontent1'">
                                <div class="stepbox">
                                    <div class="selectbtn all selected">
                                        <span role="button" class="add" title="선택된지역"></span>
                                        <span role="button" class="txt" title="하위지역보기">전국</span>
                                    </div>
                                    <div class="selectbtn selected">
                                        <span role="button" class="add" title="선택된지역"></span>
                                        <span role="button" class="txt" title="하위지역보기">서울</span>
                                    </div>
                                    <div class="selectbtn">
                                        <span role="button" class="add" title="지역추가"></span>
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
                                    <div class="selectbtn">
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
                                    <!-- <p class="nonecont">시/군/구</p> -->
                                    <jQueryScrollbar>
                                        <div class="selectbtn">
                                            <span role="button" class="add" title="선택된지역"></span>
                                            <span role="button" class="txt" title="하위지역보기">강남구</span>
                                        </div>
                                        <div class="selectbtn">
                                            <span role="button" class="add" title="선택된지역"></span>
                                            <span role="button" class="txt" title="하위지역보기">창원시 마산합포구</span>
                                        </div>
                                        <div class="selectbtn">
                                            <span role="button" class="add" title="선택된지역"></span>
                                            <span role="button" class="txt" title="하위지역보기">강북구</span>
                                        </div>
                                        <div class="selectbtn">
                                            <span role="button" class="add" title="선택된지역"></span>
                                            <span role="button" class="txt" title="하위지역보기">강서구</span>
                                        </div>
                                        <div class="selectbtn">
                                            <span role="button" class="add" title="선택된지역"></span>
                                            <span role="button" class="txt" title="하위지역보기">관악구</span>
                                        </div>
                                        <div class="selectbtn">
                                            <span role="button" class="add" title="선택된지역"></span>
                                            <span role="button" class="txt" title="하위지역보기">광진구</span>
                                        </div>
                                        <div class="selectbtn">
                                            <span role="button" class="add" title="선택된지역"></span>
                                            <span role="button" class="txt" title="하위지역보기">금천구</span>
                                        </div>
                                        <div class="selectbtn">
                                            <span role="button" class="add" title="선택된지역"></span>
                                            <span role="button" class="txt" title="하위지역보기">노원구</span>
                                        </div>
                                        <div class="selectbtn">
                                            <span role="button" class="add" title="선택된지역"></span>
                                            <span role="button" class="txt" title="하위지역보기">도봉구</span>
                                        </div>
                                        <div class="selectbtn">
                                            <span role="button" class="add" title="선택된지역"></span>
                                            <span role="button" class="txt" title="하위지역보기">도봉구</span>
                                        </div>
                                        <div class="selectbtn">
                                            <span role="button" class="add" title="선택된지역"></span>
                                            <span role="button" class="txt" title="하위지역보기">도봉구</span>
                                        </div>
                                    </jQueryScrollbar>
                                </div>
                                <div class="stepbox">
                                    <p class="nonecont">읍/면/동</p>
                                </div>
                            </div>
                            <!-- 단일지역전체 선택하기 -->
                            <div role="tabpanel" class="stepAreabox" v-if="tabcontent === 'tapcontent2'">
                                <div class="stepbox">
                                    <div class="selectbtn all selected">
                                        <span role="button" class="add" title="선택된지역"></span>
                                        <span role="button" class="txt" title="하위지역보기">전국</span>
                                    </div>
                                    <div class="selectbtn selected">
                                        <span role="button" class="add" title="선택된지역"></span>
                                        <span role="button" class="txt" title="하위지역보기">서울</span>
                                    </div>
                                    <div class="selectbtn">
                                        <span role="button" class="add" title="지역추가"></span>
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
                                    <div class="selectbtn">
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
                                    <!-- <p class="nonecont">시/군/구</p> -->
                                    <jQueryScrollbar>
                                        <div class="selectbtn selected">
                                            <span role="button" class="add" title="선택된지역"></span>
                                            <span role="button" class="txt" title="하위지역보기">강남구</span>
                                        </div>
                                        <div class="selectbtn">
                                            <span role="button" class="add" title="선택된지역"></span>
                                            <span role="button" class="txt" title="하위지역보기">창원시 마산합포구</span>
                                        </div>
                                        <div class="selectbtn">
                                            <span role="button" class="add" title="선택된지역"></span>
                                            <span role="button" class="txt" title="하위지역보기">강북구</span>
                                        </div>
                                        <div class="selectbtn">
                                            <span role="button" class="add" title="선택된지역"></span>
                                            <span role="button" class="txt" title="하위지역보기">강서구</span>
                                        </div>
                                        <div class="selectbtn">
                                            <span role="button" class="add" title="선택된지역"></span>
                                            <span role="button" class="txt" title="하위지역보기">관악구</span>
                                        </div>
                                        <div class="selectbtn">
                                            <span role="button" class="add" title="선택된지역"></span>
                                            <span role="button" class="txt" title="하위지역보기">광진구</span>
                                        </div>
                                        <div class="selectbtn">
                                            <span role="button" class="add" title="선택된지역"></span>
                                            <span role="button" class="txt" title="하위지역보기">금천구</span>
                                        </div>
                                        <div class="selectbtn">
                                            <span role="button" class="add" title="선택된지역"></span>
                                            <span role="button" class="txt" title="하위지역보기">노원구</span>
                                        </div>
                                        <div class="selectbtn">
                                            <span role="button" class="add" title="선택된지역"></span>
                                            <span role="button" class="txt" title="하위지역보기">도봉구</span>
                                        </div>
                                        <div class="selectbtn">
                                            <span role="button" class="add" title="선택된지역"></span>
                                            <span role="button" class="txt" title="하위지역보기">도봉구</span>
                                        </div>
                                        <div class="selectbtn">
                                            <span role="button" class="add" title="선택된지역"></span>
                                            <span role="button" class="txt" title="하위지역보기">도봉구</span>
                                        </div>
                                    </jQueryScrollbar>
                                </div>
                                <!-- 단일지역은 읍/면/동 선택불가  -->
                                <div class="stepbox">
                                    <p class="nonecont">읍/면/동<br>선택불가</p>
                                </div>
                            </div>
                        </div>
                        <!-- 태그이동 -->
                        <div class="datataggroup">
                            <jQueryScrollbar :maxHeight="'250px'">
                                <div class="areatagbox">
                                    <div class="dragTag">전국 <span role="button" class="icodel" title="선택 삭제"></span></div>
                                </div>
                            </jQueryScrollbar>
                            <p class="guideinfo icoinfo1">드래그로 순서를 변경할 수 있어요</p>
                            <button type="button" class="btn-reset type2">초기화</button>
                        </div>
                    </div>
                </div>
                <div class="setFoot line">
                    <button type="button" class="btn round r30 grayline" @click="toggleClick('dateSetting')">취소</button>
                    <button type="button" class="btn round r30 blue">확인</button>
                </div>
            </div>

            <!-- 테이블 전체 스크롤 -->
            <jQueryScrollbar>
                <div class="datatable" :class="{datatablefixedin:fixedTable}">
                    <div class="tableheader">
                        <div class="tabletit">
                            <div class="settingH">설정</div>
                            <div class="chartH1">차트A <button class="btn-dotmore iconbtn"></button></div>
                            <div class="chartH2">차트B <button class="btn-dotmore iconbtn"></button></div>
                        </div>
                        <div class="tableselect">
                            <div class="date">
                                <span class="selecttit">기간 및 지역</span>
                                <button class="btn-select iconbtn" @click="dateSettingLayer($event)"></button>
                            </div>
                            <div class="selected chartA">
                                <div class="compare">
                                    <div class="tit">
                                        <i class="icodataA">A1</i>
                                        <span class="selecttit">{{A1charttit}}</span>
                                        <button class="btn-select iconbtn" @click="settingLayer($event,'A1')"></button>
                                    </div>
                                    <div class="widthchange">(단위:만원/m²)</div>
                                </div>
                                <div class="compare">
                                    <div class="tit">
                                        <i class="icodataA">A2</i>
                                        <span class="selecttit">{{A2charttit}}</span>
                                        <button class="btn-select iconbtn" @click="settingLayer($event,'A2')"></button>
                                    </div>
                                    <div class="widthchange">(단위:만원/m²)</div>
                                </div>
                            </div>
                            <div class="selected chartB">
                                <div class="compare">
                                    <div class="tit">
                                        <i class="icodataB">A2</i>
                                        <span class="selecttit">{{A3charttit}}</span>
                                        <button class="btn-select iconbtn" @click="settingLayer($event,'A3')"></button>
                                    </div>
                                    <div class="widthchange">(단위:만원/m²)</div>
                                </div>
                                <div class="compare">
                                    <div class="tit">
                                        <i class="icodataB">A2</i>
                                        <span class="selecttit">{{A4charttit}}</span>
                                        <button class="btn-select iconbtn" @click="settingLayer($event,'A4')"></button>
                                    </div>
                                    <div class="widthchange">(단위:만원/m²)</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- 테이블영역 -->
                    <div :class="['tablebody', {close:!tableControl}]">
                        <div class="datecell">
                            <div class="celllow checkbox" >
                                <div class="checked"><img src="/images/common/icon_32_bar_chart.svg" class="icoimg" /></div>
                                <div class="contentcell">19. 10. 03 ~ 21. 10. 04</div>
                            </div>
                            <div class="celllow" :class="[{active:item.active}, item.activeClass]"  v-for="(item, index) in tabledatas" :key="index">
                                <div class="checked"><span class="datacheck" @click="checkactive(index)"></span></div>
                                <div class="contentcell" v-html="item.location"></div>
                            </div>
                        </div>
                        <div class="datacell chartA">
                            <div class="datadefault">
                                <jQueryScrollbar :useCtrl="{direction: 'x',customClass:'typeSmall' }">
                                    <div class="celllow">
                                        <div class="datavalue"  v-for="(item, index) in monthvalue" :key="index" v-html="item.month"></div>
                                    </div>
                                    <div class="celllow" :class="[{active:item.active}, item.activeClass]" v-for="(item, index) in tabledatas" :key="index">
                                        <div class="datavalue" v-for="(value, idx) in item.data" :key="idx" v-html="value.value"></div>
                                    </div>
                                </jQueryScrollbar>
                            </div>
                            <div class="comparecell">
                                <jQueryScrollbar v-if="chartnameA2" :useCtrl="{direction: 'x',customClass:'typeSmall' }">
                                    <div class="celllow">
                                        <div class="datavalue"  v-for="(item, index) in monthvalue" :key="index" v-html="item.month"></div>
                                    </div>
                                    <div class="celllow" :class="[{active:item.active}, item.activeClass]" v-for="(item, index) in tabledatas" :key="index">
                                        <div class="datavalue" v-for="(value, idx) in item.data" :key="idx" v-html="value.value"></div>
                                    </div>
                                </jQueryScrollbar>
                                <div class="dataAdd" v-if="!(chartnameA2)">
                                    비교하고 싶은 데이터를<br>
                                    추가해보세요!
                                </div>
                            </div>
                        </div>
                        <div class="datacell chartB">
                            <div class="datadefault">
                                <jQueryScrollbar v-if="chartnameA3" :useCtrl="{direction: 'x',customClass:'typeSmall' }">
                                    <div class="celllow">
                                        <div class="datavalue"  v-for="(item, index) in monthvalue" :key="index" v-html="item.month"></div>
                                    </div>
                                    <div class="celllow" :class="[{active:item.active}, item.activeClass]" v-for="(item, index) in tabledatas" :key="index">
                                        <div class="datavalue" v-for="(value, idx) in item.data" :key="idx" v-html="value.value"></div>
                                    </div>
                                </jQueryScrollbar>
                                <div class="dataAdd" v-if="!(chartnameA3)">
                                    비교하고 싶은 데이터를<br>
                                    추가해보세요!
                                </div>
                            </div>
                            <div  class="comparecell">
                                <jQueryScrollbar v-if="chartnameA4" :useCtrl="{direction: 'x',customClass:'typeSmall' }">
                                    <div class="celllow">
                                        <div class="datavalue"  v-for="(item, index) in monthvalue" :key="index" v-html="item.month"></div>
                                    </div>
                                    <div class="celllow" :class="[{active:item.active}, item.activeClass]" v-for="(item, index) in tabledatas" :key="index">
                                        <div class="datavalue" v-for="(value, idx) in item.data" :key="idx" v-html="value.value"></div>
                                    </div>
                                </jQueryScrollbar>
                                <div class="datanone datadefault" style=""></div> <!-- 데이터가 없을때 노출 -->
                                <!-- <div class="dataAdd" v-if="!(chartnameA4)">
                                    비교하고 싶은 데이터를<br>
                                    추가해보세요!
                                </div> -->
                            </div>
                        </div>
                    </div>
                    <template>
                        <button type="button" class="btn btn-more" :class="{active:datalistnum}" @click="dataMore">
                            <template v-if="datalistnum">숨기기</template>
                            <template v-else>더보기</template>
                        </button>
                    </template>
                </div>
            </jQueryScrollbar>
            <button type="button"  v-if="fixedTable" :class="['btn-tbcontrol', {active:tableControl}]" @click="toggleClick('tableControl')">테이블 접기</button>
        </div>

        <!-- 상단 고정 테이블 퍼블 만 있음 -->
        <div v-if="false" :class="['datatablefixed',{active1:tabledatascopy.length < 3},{chart2:chartnameA2}, {chart3:chartnameA3}, {chart4:chartnameA4}]">
            <jQueryScrollbar>
                <div class="datatablefixedin">
                    <div class="tableheader">
                        <div class="tableselect">
                            <div class="date" @click="dateSettingLayer($event)">
                                <span class="selecttit">기간 및 지역</span>
                                <button class="btn-select iconbtn"></button>
                            </div>
                            <div class="selected chartA">
                                <div class="compare">
                                    <div class="tit" @click="settingLayer($event,'A1')">
                                        <i class="icodataA">A1</i>
                                        <span class="selecttit">{{A1charttit}}</span>
                                        <button class="btn-select iconbtn"></button>
                                    </div>
                                    <div class="widthchange">(단위:만원/m²)</div>
                                </div>
                                <div class="compare">
                                    <div class="tit" @click="settingLayer($event,'A2')">
                                        <i class="icodataA">A2</i>
                                        <span class="selecttit">{{A2charttit}}</span>
                                        <button class="btn-select iconbtn"></button>
                                    </div>
                                    <div class="widthchange">(단위:만원/m²)</div>
                                </div>
                            </div>
                            <div class="selected chartB">
                                <div class="compare">
                                    <div class="tit" @click="settingLayer($event,'A3')">
                                        <i class="icodataB">A2</i>
                                        <span class="selecttit">{{A3charttit}}</span>
                                        <button class="btn-select iconbtn"></button>
                                    </div>
                                    <div class="widthchange">(단위:만원/m²)</div>
                                </div>
                                <div class="compare">
                                    <div class="tit" @click="settingLayer($event,'A4')">
                                        <i class="icodataB">A2</i>
                                        <span class="selecttit">{{A4charttit}}</span>
                                        <button class="btn-select iconbtn"></button>
                                    </div>
                                    <div class="widthchange">(단위:만원/m²)</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- 테이블영역 -->
                    <div :class="['tablebody', {close:!tableControl}]" >
                        <div class="datecell">
                            <div class="celllow checkbox" >
                                <div class="checked"><img src="/images/common/icon_32_bar_chart.svg" class="icoimg" /></div>
                                <div class="contentcell">19. 10. 03 ~ 21. 10. 04</div>
                            </div>
                            <div class="celllow" :class="[{active:item.active}, item.activeClass]"  v-for="(item, index) in tabledatascopy" :key="index">
                                <div class="checked"><span class="datacheck"></span></div>
                                <div class="contentcell" v-html="item.location"></div>
                            </div>
                        </div>
                        <div class="datacell chartA">
                            <div class="datadefault">
                                <jQueryScrollbar :useCtrl="{direction: 'x',customClass:'typeSmall' }">
                                    <div class="celllow">
                                        <div class="datavalue"  v-for="(item, index) in monthvalue" :key="index" v-html="item.month"></div>
                                    </div>
                                    <div class="celllow" :class="[{active:item.active}, item.activeClass]" v-for="(item, index) in tabledatascopy" :key="index">
                                        <div class="datavalue" v-for="(value, idx) in item.data" :key="idx" v-html="value.value"></div>
                                    </div>
                                </jQueryScrollbar>
                            </div>
                            <div class="comparecell">
                                <jQueryScrollbar v-if="chartnameA2" :useCtrl="{direction: 'x',customClass:'typeSmall' }">
                                    <div class="celllow">
                                        <div class="datavalue"  v-for="(item, index) in monthvalue" :key="index" v-html="item.month"></div>
                                    </div>
                                    <div class="celllow" :class="[{active:item.active}, item.activeClass]" v-for="(item, index) in tabledatascopy" :key="index">
                                        <div class="datavalue" v-for="(value, idx) in item.data" :key="idx" v-html="value.value"></div>
                                    </div>
                                </jQueryScrollbar>
                                <div class="dataAdd" v-if="!(chartnameA2)">
                                    비교하고 싶은 데이터를<br>
                                    추가해보세요!
                                </div>
                            </div>
                        </div>
                        <div class="datacell chartB">
                            <div class="datadefault">
                                <jQueryScrollbar v-if="chartnameA3" :useCtrl="{direction: 'x',customClass:'typeSmall' }">
                                    <div class="celllow">
                                        <div class="datavalue"  v-for="(item, index) in monthvalue" :key="index" v-html="item.month"></div>
                                    </div>
                                    <div class="celllow" :class="[{active:item.active}, item.activeClass]" v-for="(item, index) in tabledatascopy" :key="index">
                                        <div class="datavalue" v-for="(value, idx) in item.data" :key="idx" v-html="value.value"></div>
                                    </div>
                                </jQueryScrollbar>
                                <div class="dataAdd" v-if="!(chartnameA3)">
                                    비교하고 싶은 데이터를<br>
                                    추가해보세요!
                                </div>
                            </div>
                            <div  class="comparecell">
                                <jQueryScrollbar    v-if="chartnameA4" :useCtrl="{direction: 'x',customClass:'typeSmall' }">
                                    <div class="celllow">
                                        <div class="datavalue"  v-for="(item, index) in monthvalue" :key="index" v-html="item.month"></div>
                                    </div>
                                    <div class="celllow" :class="[{active:item.active}, item.activeClass]" v-for="(item, index) in tabledatascopy" :key="index">
                                        <div class="datavalue" v-for="(value, idx) in item.data" :key="idx" v-html="value.value"></div>
                                    </div>
                                </jQueryScrollbar>
                                <div class="datanone" style="display:none;"></div> <!-- 데이터가 없을때 노출 -->
                                <div class="dataAdd" v-if="!(chartnameA4)">
                                    비교하고 싶은 데이터를<br>
                                    추가해보세요!
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </jQueryScrollbar>
            <button type="button" :class="['btn-tbcontrol', {active:tableControl}]" @click="toggleClick('tableControl')">테이블 접기</button>
        </div>

        
        <!-- 차트 영역 -->
        <div class="chartwrap" :class="{split:split}">
            <div class="cardCaptureBox">
                <ChartOption
                    :optionList="optionList"
                    @print="cardOption('share')"
                    @capture="cardOption('capture')"
                />
                <section class="cardbox cardCapture">
                    <ChartCom
                        :chartnum="1"
                        :split="split"
                        :chartdatas ="chartdatas"
                        :charttit="A1charttit"
                        :controlLayer="controlLayer"
                        @active="activeToggle"
                        @split="splitChart"
                        @layer="openOption"
                        @img="CaptureChart"
                        @share="chartShare"
                    >
                        <!-- 범레 -->
                        <div class="chartlegend line">
                            <em class="legendtit"  v-if="!(split)"><em >(좌)</em>{{A1charttit}}</em>
                            <div class="flexbox">
                                <span class="legend"  v-for="(item, index) in chartdatas" :key="index" v-html="item.location"></span>
                            </div>
                        </div>
                        <div class="chartlegend bar" v-if="!(split)">
                            <em class="legendtit"><em>(우)</em>매수우위지수</em>
                            <div class="flexbox">
                                <span class="legend" v-for="(item, index) in chartdatas" :key="index" v-html="item.location"></span>
                            </div>
                        </div>
                        <!-- 2022.03.07 점선그래프 스타일 범례 예시 -->
                        <div class="chartlegend line2" >
                            <em class="legendtit"><em>(우)</em>매수우위지수</em>
                            <div class="flexbox">
                                <span class="legend" v-for="(item, index) in chartdatas" :key="index" v-html="item.location"></span>
                            </div>
                        </div>
                        <div class="chartlegend bar2" >
                            <em class="legendtit"><em>(우)</em>매수우위지수</em>
                            <div class="flexbox">
                                <span class="legend" v-for="(item, index) in chartdatas" :key="index" v-html="item.location"></span>
                            </div>
                        </div>
                        <!-- 차트영역 -->
                        <jQueryScrollbar >
                            <div class="chartbox" style="height:800px; width:1500px">
                                <!-- 차트레이어 -->
                                <div class="chartTip" style="left:200px;top: 80px;">
                                    <span class="tiptit">2021년 3월</span>
                                    <div class="tablebox">
                                        <div class="line header">
                                            <div class="cell">지역</div>
                                            <div class="cell">A1</div>
                                            <div class="cell">A2</div>
                                        </div>
                                        <div class="line" v-for="(item, index) in chartdatas" :key="index">
                                            <div class="cell" v-html="item.location"></div>
                                            <div class="cell" v-html="item.A1"></div>
                                            <div class="cell" v-html="item.A2"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </jQueryScrollbar>
                    </ChartCom>
                </section>
            </div>
            <div class="cardCaptureBox" v-if="split">
                <ChartOption
                    :optionList="optionList"
                    @print="cardOption('share')"
                    @capture="cardOption('capture')"
                />
                <section class="cardbox cardCapture">
                    <ChartCom
                        :chartnum="2"
                        :split="split"
                        :chartdatas ="chartdatas"
                        :charttit="A2charttit"
                        :controlLayer="sharecontrolLayer"
                        @active="activeToggle"
                        @split="splitChart"
                        @layer="openOption"
                        @img="CaptureChart"
                        @share="chartShare"
                    >
                        <!-- 범레 -->
                        <div class="chartlegend bar" >
                            <span class="legend" v-for="(item, index) in chartdatas" :key="index" v-html="item.location"></span>
                        </div>
                        <!-- 차트영역 -->
                        <jQueryScrollbar>
                            <div class="chartbox" style="height:340px; width:1500px">
                                <!-- 차트레이어 -->
                                <div class="chartTip" style="left:200px;top: 80px;">
                                    <span class="tiptit">2021년 3월</span>
                                    <div class="tablebox">
                                        <div class="line header">
                                            <div class="cell">지역</div>
                                            <div class="cell">A1</div>
                                            <div class="cell">A2</div>
                                        </div>
                                        <div class="line" v-for="(item, index) in chartdatas" :key="index">
                                            <div class="cell" v-html="item.location"></div>
                                            <div class="cell" v-html="item.A1"></div>
                                            <div class="cell" v-html="item.A2"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </jQueryScrollbar>
                    </ChartCom>
                </section>
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
    </section>
</template>
<style>
.comparison .datatablefixed .tabletit{display:none}
.comparison .datatablefixed .btn-more{display:none}
</style>
<script>
import ChartCom from '@/components/statistics/ChartCom.vue';
import ChartOption from '@/components/elements/ChartOption.vue';
import ShareCommon from '@/components/elements/ShareCommon.vue';
export default {
    components: {
        ChartCom,
        ChartOption,
        ShareCommon
    },
    props: {
        scrollH: [Number]
    },
    data() {
        return {
            // 인기 단지 위젯
            popularOn: false,
            // 상단 테이블 고정
            fixedTable: false,
            // 카드레이어 옵션
            optionList: [
                {text: '인쇄', type: 'print'},
                {text: '화면 캡쳐', type: 'capture'},
                {text: '엑셀 저장', type: 'excel'},
                {text: '공유', type: 'share'}
            ],
            chartdatas: [
                {location: '전국', A1: '551.0', A2: '551.0'},
                {location: '서울', A1: '1,268.7', A2: '1,268.7'},
                {location: '강남구', A1: '2,266.4', A2: '2,266.4'},
                {location: '서초구', A1: '1,957.2', A2: '1,957.2'},
                {location: '송파구', A1: '1,617.7', A2: '1,617.7'}
            ],
            filters: ['강남3구', '서울시거래량TOP5', '전국평균가격TOP5', 'GTX-D관련'],
            monthvalue: [
                {month: '20. 06'},
                {month: '20. 08'},
                {month: '20. 09'},
                {month: '20. 10'},
                {month: '20. 11'},
                {month: '20. 12'},
                {month: '21. 01'},
                {month: '21. 02'},
                {month: '21. 03'},
                {month: '21. 04'},
                {month: '21. 05'},
                {month: '21. 06'},
                {month: '21. 07'},
                {month: '21. 08'},
                {month: '21. 09'}
            ],
            tabledatascopy: [],
            tabledatas: [
                
                {location: '전국',
                    active: false,
                    data: [
                        {month: '20. 06', value: '464.7'},
                        {month: '20. 08', value: '464.7'},
                        {month: '20. 09', value: '464.7'},
                        {month: '20. 10', value: '464.7'},
                        {month: '20. 11', value: '464.7'},
                        {month: '20. 12', value: '464.7'},
                        {month: '21. 01', value: '464.7'},
                        {month: '21. 02', value: '464.7'},
                        {month: '21. 03', value: '464.7'},
                        {month: '21. 04', value: '464.7'},
                        {month: '21. 05', value: '464.7'},
                        {month: '21. 06', value: '464.7'},
                        {month: '21. 07', value: '464.7'},
                        {month: '21. 08', value: '464.7'},
                        {month: '21. 09', value: '464.7'}
                    ]
                },
                {location: '서울',
                    active: false,
                    data: [
                        {month: '20. 06', value: '464.7'},
                        {month: '20. 08', value: '464.7'},
                        {month: '20. 09', value: '464.7'},
                        {month: '20. 10', value: '464.7'},
                        {month: '20. 11', value: '464.7'},
                        {month: '20. 12', value: '464.7'},
                        {month: '21. 01', value: '464.7'},
                        {month: '21. 02', value: '464.7'},
                        {month: '21. 03', value: '464.7'},
                        {month: '21. 04', value: '464.7'},
                        {month: '21. 05', value: '464.7'},
                        {month: '21. 06', value: '464.7'},
                        {month: '21. 07', value: '464.7'},
                        {month: '21. 08', value: '464.7'},
                        {month: '21. 09', value: '464.7'}
                    ]
                },
                {location: '강남구',
                    active: false,
                    data: [
                        {month: '20. 06', value: '464.7'},
                        {month: '20. 08', value: '464.7'},
                        {month: '20. 09', value: '464.7'},
                        {month: '20. 10', value: '464.7'},
                        {month: '20. 11', value: '464.7'},
                        {month: '20. 12', value: '464.7'},
                        {month: '21. 01', value: '464.7'},
                        {month: '21. 02', value: '464.7'},
                        {month: '21. 03', value: '464.7'},
                        {month: '21. 04', value: '464.7'},
                        {month: '21. 05', value: '464.7'},
                        {month: '21. 06', value: '464.7'},
                        {month: '21. 07', value: '464.7'},
                        {month: '21. 08', value: '464.7'},
                        {month: '21. 09', value: '464.7'}
                    ]
                },
                {location: '서초구',
                    active: false,
                    data: [
                        {month: '20. 06', value: '464.7'},
                        {month: '20. 08', value: '464.7'},
                        {month: '20. 09', value: '464.7'},
                        {month: '20. 10', value: '464.7'},
                        {month: '20. 11', value: '464.7'},
                        {month: '20. 12', value: '464.7'},
                        {month: '21. 01', value: '464.7'},
                        {month: '21. 02', value: '464.7'},
                        {month: '21. 03', value: '464.7'},
                        {month: '21. 04', value: '464.7'},
                        {month: '21. 05', value: '464.7'},
                        {month: '21. 06', value: '464.7'},
                        {month: '21. 07', value: '464.7'},
                        {month: '21. 08', value: '464.7'},
                        {month: '21. 09', value: '464.7'}
                    ]
                },
                {location: '송파구',
                    active: false,
                    data: [
                        {month: '20. 06', value: '464.7'},
                        {month: '20. 08', value: '464.7'},
                        {month: '20. 09', value: '464.7'},
                        {month: '20. 10', value: '464.7'},
                        {month: '20. 11', value: '464.7'},
                        {month: '20. 12', value: '464.7'},
                        {month: '21. 01', value: '464.7'},
                        {month: '21. 02', value: '464.7'},
                        {month: '21. 03', value: '464.7'},
                        {month: '21. 04', value: '464.7'},
                        {month: '21. 05', value: '464.7'},
                        {month: '21. 06', value: '464.7'},
                        {month: '21. 07', value: '464.7'},
                        {month: '21. 08', value: '464.7'},
                        {month: '21. 09', value: '464.7'}
                    ]
                }
            ],
            controlLayer: false,
            sharecontrolLayer: false,
            
            charttit1: '매매 평균가격(아파트)',
            charttit2: '',
            charttit3: '',
            charttit4: '',
            
            A1charttit: '매매 평균가격(아파트)',
            A2charttit: '',
            A3charttit: '',
            A4charttit: '',
            
            widget: false,
            split: false,
            
            settingOpen: false,
            charttype: 'A1',
            chartnameA1: false,
            chartnameA2: false,
            chartnameA3: false,
            chartnameA4: false,
            layerleft: 140,
            layertop: 40,
            agreeTip: true,
            otherdataTip: true,
            charttext: '',
            mycharttags: [],
            mycharttagnum: null,
            viewchart: false,
            datalistnum: false,
            tipleft: 0,
            tiptop: 0,
            innertipname: null,
            tapcontent: 'tapcontent1',
            tabcontent: 'tapcontent1',
            dateSetting: false,
            //탭 인터랙션
            checkedClass: null,
            datevalue: ['2008', '2011', '2014', '2017', '2022'],
            rangedata: ['2008', '2011', '2014', '2017', '2022'],
            datepickerLayer: false,
            starttime: '2016년 10월 5일',
            endtime: '2021년 10월 5일',
            //프리셋레이어 left
            setLeft: null,
            setRight: null,
            //테이블 플로팅
            tableControl: true,
            settingtableH: null
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
                this.fixTable();
                this.handleScroll();
            }
        }
    },
    mounted() {
        window.$eventBus.$on('layerClose', this.otherTouch);
        this.$nextTick(function() {
            if (this.$refs.dataTable) {
                this.settingtableH = this.$refs.dataTable.clientHeight;
            }
        });
    },
    methods: {
        otherTouch() {
            // this.Tipclose('agree');
            // this.Tipclose('other');
            console.log('바디클릭');
        },
        //공통 == 버튼클래스 처리 active
        activeToggle(e, classname) {
            if (e.target.classList.contains(classname) === true) {
                e.target.classList.remove(classname);
            } else {
                e.target.classList.add(classname);
            }
        },
        //인기단지위젯
        handleScroll() {
            this.scrollH > 50 ? this.popularOn = true : this.popularOn = false;
        },
        //차트 나누기
        splitChart() {
            this.split = !this.split;
        },
        //레이어 옵션
        openOption() {
            console.log('레이어 옵션');
            this.controlLayer = !this.controlLayer;
        },
        //이미지 저장
        CaptureChart() {
            console.log('이미지로 저장');
        },
        //공유하기
        chartShare() {
            console.log('공유하기');
        },
        //위젯 열기
        openWidget() {
            this.widget = !this.widget;
        },
        // 선택 레이어 매매 전세 토글
        typeSetting(e) {
            let tabbox = document.querySelectorAll('.tabtype5 .tab');
            tabbox.forEach(elem => {
                elem.classList.remove('active');
            });
            e.target.classList.add('active');
        },
        // 선택 레이어 차트별 제목선택(active, 제목선택)
        settingChart(e, charttit) {
            let listbox = document.querySelectorAll('.datalist .item');
            listbox.forEach(elem => {
                elem.classList.remove('active');
            });
            e.target.parentNode.classList.add('active');
            if (this.charttype === 'A1') {
                this.charttit1 = charttit;
            } else if (this.charttype === 'A2') {
                this.charttit2 = charttit;
            } else if (this.charttype === 'A3') {
                this.charttit3 = charttit;
            } else if (this.charttype === 'A4') {
                this.charttit4 = charttit;
            }
        },
        // 선택 레이어 열기(선택된 위치 chartnam으로 설정)
        settingLayer(e, chartname) {
            //테이블 플로팅 되어있을 때
            if (this.fixedTable === true) {
                window.$eventBus.$emit('scrollMove', 0);
            }
            //기간 지역 레이어가 열려 있을때 닫기
            if (this.dateSetting === true)
                this.dateSetting = false;
            document.querySelector('.date > .btn-select').classList.remove('active');
            //툴팁 닫기
            this.Tipclose('other');
            const A1btn = document.querySelector('.chartA >.compare:nth-of-type(1) .btn-select');
            const A2btn = document.querySelector('.chartA >.compare:nth-of-type(2) .btn-select');
            const A3btn = document.querySelector('.chartB >.compare:nth-of-type(1) .btn-select');
            const A4btn = document.querySelector('.chartB >.compare:nth-of-type(2) .btn-select');
            this.charttype = chartname;
            this.settingOpen = true;
            
           
            if (chartname === 'A1') {
                this.setLeft = (document.querySelector('.chartA .datadefault').clientWidth / 2) + 'px';
                this.setRight = 'auto';
                A1btn.classList.add('active');
                A2btn.classList.remove('active');
                A3btn.classList.remove('active');
                A4btn.classList.remove('active');
            } else if (chartname === 'A2') {
                this.setLeft = 'auto';
                this.setRight  = (document.querySelector('.chartB .datadefault').clientWidth)   + 'px';
                A2btn.classList.add('active');
                A1btn.classList.remove('active');
                A3btn.classList.remove('active');
                A4btn.classList.remove('active');
            } else if (chartname === 'A3') {
                this.setLeft = 'auto';
                document.querySelector('.chartB .compare:nth-of-type(1)').clientWidth > 149 ?
                    this.setRight = this.setRight  = (document.querySelector('.chartB .compare:nth-of-type(2)').clientWidth)   + 'px' :
                    this.setRight = this.setRight  = (document.querySelector('.chartB .compare:nth-of-type(1)').clientWidth - 100)   + 'px';
                A3btn.classList.add('active');
                A1btn.classList.remove('active');
                A2btn.classList.remove('active');
                A4btn.classList.remove('active');
            } else if (chartname === 'A4') {
                this.setLeft = 'auto';
                this.setRight = 0;
                A4btn.classList.add('active');
                A1btn.classList.remove('active');
                A2btn.classList.remove('active');
                A3btn.classList.remove('active');
            }
            
        },
        // 선택 레이어 닫기
        settingClose() {
            let listbox = document.querySelectorAll('.tableselect .btn-select');
            listbox.forEach(elem => {
                elem.classList.remove('active');
            });
            this.settingOpen = false;
        },
        // 선택 레이어 확인 (테이블 내용 차트 이름 설정)
        confirmChart() {
            //팁닫기
            this.agreeTip = false;
            this.otherdataTip = false;
            if (this.charttype === 'A1') {
                this.chartnameA1 = true;
                this.A1charttit = this.charttit1;
            } else if (this.charttype === 'A2') {
                this.chartnameA2 = true;
                this.A2charttit = this.charttit2;
            } else if (this.charttype === 'A3') {
                this.chartnameA3 = true;
                this.A3charttit = this.charttit3;
            } else if (this.charttype === 'A4') {
                this.chartnameA4 = true;
                this.A4charttit = this.charttit4;
            }
            this.settingClose();
        },
        //팁
        Tipclose(type) {
            if (type === 'agree') {
                this.agreeTip = false;
            } else if (type === 'other') {
                this.otherdataTip = false;
            }
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
        // 테이블색상선택
        checkactive(idx) {
            console.log(idx);
            this.tabledatas.forEach((item, index) => {
                if (index === idx) {
                    if (item.active === true) {
                        item.active = false;
                        this.tabledatascopy.splice(index, 1);
                    } else {
                        item.active = true;
                        this.tabledatascopy.push(item);
                    }
                    this.getActiveClass();
                }
                return item;
            });
        },
        // 테이블색상선택
        getActiveClass() {
            let count = 0;
            this.tabledatas.forEach((item, index) => {
                if (item.active) {
                    item.activeClass = `type${count++}`;
                } else {
                    item.activeClass = null;
                }
            });
        },
        //상단 테이블 고정
        fixTable() {
            this.settingtableH = this.$refs.dataTable.clientHeight;
            if (this.scrollH  > this.settingtableH) {
                this.fixedTable = true;
                this.settingOpen = false;
                this.dateSetting = false;
            } else {
                this.fixedTable = false;
                this.tableControl = true,
                this.settingtableH = null;
            }
            console.log(this.settingtableH, this.scrollH);
        },
        //지역선택하기
        TapContent(e, conmane) {
            this.tapcontent = conmane;
            let tabbox = document.querySelectorAll('.tabbox.tabtype3 .tab');
            tabbox.forEach(elem => {
                elem.classList.remove('active');
            });
            e.target.classList.add('active');
        },
        //지역 탭 선택 UI 개선으로 추가 2022.03.04
        TabSelect(e, conmane, type) {
            this.tabcontent = conmane;
            this.checkedClass = type;
            let tabbox = document.querySelectorAll('.tabbox.tabtype3 .tab');
            tabbox.forEach(elem => {
                elem.classList.remove('active');
            });
            e.target.classList.add('active');
        },
        //기간지역선택하기
        dateSettingLayer(event) {
            //테이블 플로팅 되어있을 때
            if (this.fixedTable === true) {
                window.$eventBus.$emit('scrollMove', 0);
            }
            //차트 ab active삭제
            document.querySelectorAll('.btn-select').forEach((elem, index) => {
                if (index > 0) {
                    elem.classList.remove('active');
                }
            });
            //프리셋 차트 삭제
            this.charttype = null;
            this.settingOpen = false;
            //기간지역 선택 팝업
            if (this.dateSetting === false) {
                this.dateSetting = true;
                document.querySelector('.date > .btn-select').classList.add('active');
            } else {
                this.dateSetting = false;
                document.querySelector('.date > .btn-select').classList.remove('active');
            }
        },
    
        //기간직접설정
        customDate() {
            this.datepickerLayer = !this.datepickerLayer;
        },
        //지역설정 UI 개선으로 추가 2022.03.04
        toggleClick(type) {
            this[type] = !this[type];
        },
        //데이터 더보기
        dataMore() {
            this.datalistnum = !this.datalistnum;
        },
        //선택 활성화 UI 개선으로 추가 2022.03.04
        ToggleSelect(e, classname) {
            let selectbox = document.querySelectorAll(classname);
            selectbox.forEach(ele => {
                ele.classList.remove('active');
            });
            e.target.classList.add('active');
        }
    }
};
</script>