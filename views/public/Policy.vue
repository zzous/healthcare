<template>
    <section class="policyCon">
        <div class="mainTitle">
            <h1 class="titdepth1">정부정책</h1>
            <ShareCommon
                :pageurl ="this.$router.currentRoute.path"
            />
        </div>
        <div class="policyTap">
            <!-- 2022.03.02 퍼블수정  tabtexts의 텍스트 수정  -->
            <TabContent
                :tabcontentname="'정부정책'"
                :tabsublist="'tabbox tabtype3 submenu'"
                :tabtexts="[ '규제지역 ' , '3기신도시']"
                v-on:tabactive="tabClick"
            >
                <template slot="panel">
                    <!-- 정책 연혁 내용 삭제 예정
                    <div class="tabcon" role="tabpanel" v-if="tabnum===8">
                        <div class="cardbox policyhistory">
                            <h1 class="titdepth2">정책연혁</h1>
                            <div class="selectbox type3">
                                <span class="value txt  arw" :class="{up:selectMonth, down:!selectMonth}" @click="DayLayerOpen('selectMonth')" v-html="year"></span>
                                <div role="listbox" class="selectlist" v-if="selectMonth">
                                    <jQueryScrollbar :maxHeight="'100px'">
                                        <div
                                            role="list"
                                            :class="['item txt', {active:item.year === year}]"
                                            v-for="(item, index) in policyList"
                                            :key="index"
                                            v-html="item.year"
                                            @click="Dayselect(index, item.year,'selectMonth')"
                                        >
                                        </div>
                                    </jQueryScrollbar>
                                </div>
                            </div>
                            <div class="timelinebox">
                                <div class="timeline" v-for="(item, index) in policyList" :key="index" :ref="'timeline'+ item.year">
                                    <span class="year" v-html="item.year"></span>
                                    <div class="group" v-for="(list, idx) in item.daylists" :key="idx">
                                        <span class="date" v-html="list.day"></span>
                                        <div class="txt">
                                            <p v-html="list.text"></p>
                                            <button type="button" class="iconbtn iconyoutube" title="유튜브" aria-lable="유튜브" v-if="!(list.youtubelink===null)" @click="excuteOutLink(list.youtubelink)"></button>
                                            <button type="button" class="iconbtn iconpost" title="리브콘" aria-lable="리브콘" v-if="!(list.postlink===null)" @click="excuteOutLink(list.postlink)"></button>
                                            <button type="button" class="iconbtn icongov" title="국토부" aria-lable="국토부" v-if="!(list.govlink===null)" @click="excuteOutLink(list.govlink)"></button>
                                        </div>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                    </div> -->
                    <div class="tabcon" role="tabpanel" v-if="tabnum===0">
                        <div class="cardbox">
                            <div class="pycon">
                                <h1 class="titdepth2">대출</h1>
                                <div class="flexbox">
                                    <div class="col">
                                        <strong class="ruletit type1">투기지역, 투기과열지구</strong>
                                        <div class="sorttxt">
                                            <span class="sortlabel">LTV</span>
                                            <ul>
                                                <li>9억 이하 : 40%</li>
                                                <li>9억 초과~15억 이하 : 20%</li>
                                                <li>15억 초과 : 0%</li>
                                            </ul>
                                            <span class="sortlabel">DTI</span>
                                            <ul>
                                                <li>40%</li>
                                            </ul>
                                        </div>

                                        <strong class="txt1">1주택 세대는 주택 신규 구입을 위한 주담대 원칙적 금지</strong>
                                        <ul class="dotlist">
                                            <li>(투기지역) 기존주택 2년(투기과열은 1년)내 처분 및 전입 조건, 무주택 자녀 분가, 부모 별거봉양 등</li>
                                        </ul>

                                        <strong class="txt1">2주택 이상 보유 세대는 주택 신규 구입을 위한 주담대 금지 고가 주택(시가9억초과) 구입 시 실거주목적 제외 주담대 금지</strong>
                                        <ul class="dotlist">
                                            <li>(투기지역) 무주택세대가 구입 후 1년내 전입, 1주택세대가 기존주택 1년내 처분 및 전입 시</li>
                                        </ul>

                                        <strong class="txt1">기업자금대출제한</strong>
                                        <ul class="dotlist">
                                            <li>주택매매업·임대업 이외 업종 사업자의 주택구입목적의 주택담보 기업자금대출 신규 취급 금지</li>
                                        </ul>
                                    </div>
                                    <div class="col">
                                        <strong class="ruletit type2">조정대상지역</strong>
                                        <div class="sorttxt">
                                            <span class="sortlabel">LTV</span>
                                            <ul>
                                                <li>9억 이하 : 40%</li>
                                                <li>9억 초과 : 30%</li>
                                            </ul>
                                            <span class="sortlabel">DTI</span>
                                            <ul>
                                                <li>50%</li>
                                            </ul>
                                        </div>

                                        <strong class="txt1">1주택 세대는 주택 신규 구입을 위한 주담대 원칙적 금지</strong>
                                        <ul class="dotlist">
                                            <li>(예외) 기존주택 2년(투기과열은 1년)내 처분 및 전입 조, 무주택 자녀 분가, 부모 별거봉양 등</li>
                                        </ul>

                                        <strong class="txt1">2주택 이상 보유 세대는 주택 신규 구입을 위한 주담대 금지 고가 주택(시가9억초과) 구입시 실거주목적 제외 주담대 금지</strong>
                                        <ul class="dotlist">
                                            <li>(예외) 무주택세대가 구입 후 2년내 전입, 1주택세대가 기존주택 2년내 처분 및 전입 시</li>
                                        </ul>

                                        <strong class="txt1">기업자금대출제한</strong>
                                        <ul class="dotlist">
                                            <li>주택매매업·임대업 이외 업종 사업자의 주택구입목적의 주택담보 기업자금대출 신규 취급 금지</li>
                                        </ul>
                                    </div>
                                </div>

                                <div class="textbox between">
                                    <div class="iconinfo3">
                                        <ul class="dotlist">
                                            <li>LTV(loan to value ratio) : 주택담보대출인정비율</li>
                                            <li>DTI(debt to income ratio) : 총부채상환비율</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div class="pycon">
                                <h1 class="titdepth2">청약</h1>
                                <div class="flexbox">
                                    <div class="col">
                                        <strong class="ruletit type1">투기지역, 투기과열지구</strong>
                                        <strong class="txt1">1순위 자격요건강화</strong>
                                        <ul class="dotlist">
                                            <li>청약통장 가입후 2년 경과 + 납입횟수 24회 이상</li>
                                            <li>5년 내 당첨자가 세대에 속하지 않을것, 세대주일것</li>
                                            <li>2주택 소유 세대가 아닐 것(민영)</li>
                                        </ul>
                                        
                                        <strong class="txt1">1순위 청약일정 분리(해당지역, 기타) 민영주택 일반공급 가점제 적용확대</strong>
                                        <ul class="dotlist">
                                            <li>85m²이하 100%, 85m²이상 50%</li>
                                        </ul>
                                        
                                        <strong class="txt1">민영주택 재당첨제한</strong>
                                        <ul class="dotlist">
                                            <li>85 m²이하 : 과밀억제권역 5년, 그 외 3년</li>
                                            <li>85 m²초과 : 과밀억제권역 3년, 그 외 1년</li>
                                        </ul>
                                        
                                        <strong class="txt1">9억 초과 주택 특별공급 제외</strong>

                                    </div>
                                    <div class="col">
                                        <strong class="ruletit type2">조정대상지역</strong>
                                        <strong class="txt1">1순위 자격요건강화</strong>
                                        <ul class="dotlist">
                                            <li>청약통장 가입후 2년 경과 + 납입횟수 24회 이상</li>
                                            <li>5년 내 당첨자가 세대에 속하지 않을것, 세대주일것</li>
                                            <li>2주택 소유 세대가 아닐 것(민영)</li>
                                        </ul>

                                        <strong class="txt1">1순위 청약일정 분리(해당지역, 기타) 민영주택 일반공급 가점제 적용확대</strong>
                                        
                                        <strong class="txt1">민영주택 재당첨제한</strong>
                                        <ul class="dotlist">
                                            <li>85 m²이하 : 과밀억제권역 5년, 그 외 3년</li>
                                            <li>85 m²초과 : 과밀억제권역 3년, 그 외 1년</li>
                                        </ul>

                                        <strong class="txt1">오피스텔 거주자 우선분양</strong>
                                        <ul class="dotlist">
                                            <li>분양 100실 이상 : 20% 이하</li>
                                            <li>분양 100실 미만 : 10% 이하</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div class="pycon">
                                <h1 class="titdepth2">세제</h1>
                                <div class="flexbox">
                                    <div class="col">
                                        <strong class="ruletit type1">투기지역, 투기과열지구</strong>

                                        <strong class="txt1">규제사항 없음</strong>
                                    </div>

                                    <div class="col">
                                        <strong class="ruletit type2">조정대상지역</strong>
                                        <strong class="txt1">다주택자 양도세 중과·장특공 배제</strong>
                                        <ul class="dotlist">
                                            <li>2주택자 : +10%p, 3주택자 : +20%p</li>
                                            <li>단, ’20.06월까지 10년 이상 보유 주택 양도시 중과 배제, 장특공 적용</li>
                                            <li>분양권도 주택수에 포함</li>
                                        </ul>

                                        <strong class="txt1">2주택 이상 보유자 종부세 추가 과세</strong>
                                        <ul class="dotlist">
                                            <li>+0.2~0.8%p 추가 과세</li>
                                        </ul>

                                        <strong class="txt1">2주택 이상 보유자 보유세 세부담 상한 300%로 상향</strong>

                                        <strong class="txt1">일시적 2주택자의 종전주택 양도기간 변경</strong>
                                        <ul class="dotlist">
                                            <li>(기존) 2년이내 양도 → (변경) 1년이내 신규 주택 전입 및 1년 이내 양도</li>
                                        </ul>
                                        
                                    </div>
                                </div>
                            </div>
                            <div class="pycon">
                                <h1 class="titdepth2">전매제한</h1>
                                <div class="flexbox">
                                    <div class="col">
                                        <strong class="ruletit type1">투기지역, 투기과열지구</strong>
                                        <strong class="txt1">주택·분양권 전매제한</strong>
                                        <ul class="dotlist">
                                            <li>소유권이전등기시(최대 5년)</li>
                                            <li>분양가상한제 적용주택 전매제한기간 강화(수도권은 비투기과열지구 대비 2년 가산)</li>
                                        </ul>
                                    </div>
                                    <div class="col">
                                        <strong class="ruletit type2">조정대상지역</strong>
                                        <strong class="txt1">분양권 전매제한</strong>
                                        <ul class="dotlist">
                                            <li>(1지역) 소유권 이전등기일</li>
                                            <li>(2지역) 당첨일로부터 1년 6개월</li>
                                            <li>(3지역) 당첨일로부터 공공택지 1년, 민간택지 6개월</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div class="pycon">
                                <h1 class="titdepth2">정비사업</h1>
                                <div class="flexbox">
                                    <div class="col">
                                        <strong class="ruletit type1">투기지역, 투기과열지구</strong>
                                        <strong class="txt1">재건축 조합원 지위양도 제한</strong>
                                        <ul class="dotlist">
                                            <li>조합설립인가~소유권이전등기</li>
                                        </ul>

                                        <strong class="txt1">재개발 등 조합원 분양권 전매제한</strong>
                                        <ul class="dotlist">
                                            <li>• 관리처분계획인가 소유권이전등기</li>
                                        </ul>

                                        <strong class="txt1">정비사업 분양 재당첨 제한</strong>

                                    </div>
                                    <div class="col">
                                        <strong class="ruletit type2">조정대상지역</strong>
                                        <strong class="txt1">규제사항 없음</strong>
                                    </div>
                                </div>
                            </div>
                            <div class="pycon">
                                <h1 class="titdepth2">기타</h1>
                                <div class="flexbox">
                                    <div class="col">
                                        <strong class="ruletit type1">투기지역, 투기과열지구</strong>
                                        <strong class="txt1">3억 이상 주택 취득 시 자금조달계획서 신고 의무화</strong>
                                        <ul class="dotlist">
                                            <li>기존 주택 보유 현황, 현금 증여 등 신고 항목 확대</li>
                                            <li>9억원 초과시 증빙자료 제출</li>
                                        </ul>
                                    </div>
                                    <div class="col">
                                        <strong class="ruletit type2">조정대상지역</strong>
                                        <strong class="txt1">3억 이상 주택 취득 시 자금조달계획서 신고 의무화</strong>
                                        <ul class="dotlist">
                                            <li>기존 주택 보유 현황, 현금 증여 등 신고 항목 확대</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="tabcon" role="tabpanel" v-if="tabnum===1">
                        <div class="cardbox">
                            <!-- 배경 -->
                            <div class="pycon">
                                <strong class="ruletit type3 icon1">배경</strong>
                                <button type="button" class="btn btn-allmap arw right active type2">3기 신도시 공식 홈페이지</button>

                                <p class="txt2">2017년 국지적으로 불안한 움직임을 보이는 주택시장을 안정화시키기 위해 정부에서 부동산대책을 발표하기 시작</p>
                                <p class="txt2">지속되는 주택공급 수요에 대응하고자 3기 신도시 개발을 포함해 여러가지 공급대책을 발표했으며, 두차례에 걸쳐 3기 신도시 지역 선정을 마침</p>
                            </div>
                            <!-- // 배경 -->
                            <!-- 일정 -->
                            <div class="pycon">
                                <strong class="ruletit type3 icon2">일정</strong>
                                <p class="txt2">지구지정→지구계획수립, 토지보상→사전청약→사업승인과착공→본청약→입주 순으로 진행</p>
                                <p class="txt2">현재 지구지정이 모두 완료되고 지구계획 수립과 토지보상 절차가 진행중</p>
                            </div>
                            <!-- // 일정 -->
                            <!-- 일정 -->
                            <div class="pycon">
                                <strong class="ruletit type3 icon3">지역현황</strong>
                                
                                <strong class="txt1">남양주 왕숙</strong>
                                <div class="txtlabelbox">
                                    <span class="txt">지구명 남양주왕숙2 공공주택지구</span>
                                    <span class="txt">면적 2,393,384.58㎡</span>
                                    <span class="txt">사업시행기간 2019년~2028년</span>
                                    <span class="txt">위치  경기도 남양주시 진접읍 연평리, 내곡리, 내각리, 진건읍 신월리, 진관리, 사능리, 퇴계원읍 퇴계원리 일원</span>
                                    <span class="txt">사업시행자 경기도, 한국토지주택공사</span>
                                    <span class="txt">주택계획 주택 54천 호</span>
                                </div>

                                <strong class="txt1">남양주 왕숙2</strong>
                                <div class="txtlabelbox">
                                    <span class="txt">지구명 남양주왕숙2 공공주택지구</span>
                                    <span class="txt">면적 2,393,384.58㎡</span>
                                    <span class="txt">사업시행기간 2019년~2028년</span>
                                    <span class="txt">위치 경기도 남양주시 일패동, 이패동 일원</span>
                                    <span class="txt">사업시행자 경기도, 한국토지주택공사, 남양주도시공사</span>
                                    <span class="txt">주택계획 주택 14천 호</span>
                                </div>

                                <strong class="txt1">하남 교산</strong>
                                <div class="txtlabelbox">
                                    <span class="txt">지구명 하남교산 공공주택지구</span>
                                    <span class="txt">면적 6,314,121㎡</span>
                                    <span class="txt">사업시행기간 2019년~2028년</span>
                                    <span class="txt">위치 경기도 하남시 천현동, 항동, 하사창동 교산동, 상사창동, 춘궁동, 덕풍동, 창우동, 신장동 일원</span>
                                    <span class="txt">사업시행자 경기도, 한국토지주택공사, 하남도시공사</span>
                                    <span class="txt">주택계획 주택 33천 호</span>
                                </div>

                                <strong class="txt1">인천 계양</strong>
                                <div class="txtlabelbox">
                                    <span class="txt">지구명 인천계양 공공주택지구</span>
                                    <span class="txt">면적 3,331,714㎡</span>
                                    <span class="txt">사업시행기간 2019년~2026년</span>
                                    <span class="txt">위치 인천광역시 계양구 귤현동, 동양동, 박촌동, 병방동, 상야동 일원</span>
                                    <span class="txt">사업시행자 인천광역시, 한국토지주택공사, 인천도시공사</span>
                                    <span class="txt">주택계획 주택 17천 호</span>
                                </div>

                                <strong class="txt1">고양 창릉</strong>
                                <div class="txtlabelbox">
                                    <span class="txt">지구명 고양창릉 공공주택지구</span>
                                    <span class="txt">면적 7,890,019㎡</span>
                                    <span class="txt">사업시행기간 2019년~2029년</span>
                                    <span class="txt">위치 경기도 고양시 덕양구 원흥동, 동산동, 용두동, 향동동, 화전동, 도내동, 행신동, 화정동, 성사동, 화정동 일원</span>
                                    <span class="txt">사업시행자 경기도, 한국토지주택공사, 경기주택도시공사, 고양도시관리공사</span>
                                    <span class="txt">주택계획 주택 38천 호</span>
                                </div>
                                
                                <strong class="txt1">부천 대장</strong>
                                <div class="txtlabelbox">
                                    <span class="txt">지구명부천대장 공공주택지구</span>
                                    <span class="txt">면적 3,419,544㎡</span>
                                    <span class="txt">사업시행기간 2019년~2029년</span>
                                    <span class="txt">위치 경기도 부천시 대장동, 오정동, 원종동, 삼정동 일원</span>
                                    <span class="txt">사업시행자 경기도, 한국토지주택공사, 부천도시공사</span>
                                    <span class="txt">주택계획 주택 20천 호</span>
                                </div>

                                <strong class="txt1">광명 시흥</strong>
                                <div class="txtlabelbox">
                                    <span class="txt">지구명 광명시흥 공공주택지구</span>
                                    <span class="txt">면적 1,271만㎡</span>
                                    <span class="txt">사업시행기간 2022년~2031년</span>
                                    <span class="txt">위치 경기도 광명시 광명동, 옥길동, 노온사동, 가학동 및 시흥시 과림동, 무지내동, 금이동 일원</span>
                                    <span class="txt">사업시행자 한국토지주택공사</span>
                                    <span class="txt">주택계획 주택 70천 호</span>
                                </div>

                                <strong class="txt1">의왕·군포·안산</strong>
                                <div class="txtlabelbox">
                                    <span class="txt">지구명 의왕·군포·안산 공공주택지구</span>
                                    <span class="txt">면적  586만㎡</span>
                                    <span class="txt">사업시행기간 미정</span>
                                    <span class="txt">위치 경기도 의왕시 초평동, 월암동, 삼동, 군포시 도마교동, 부곡동, 대야미동, 안산시 건건동, 사사동 일원</span>
                                    <span class="txt">사업시행자 한국토지주택공사</span>
                                    <span class="txt">주택계획주택 4.1만 호</span>
                                </div>

                                <strong class="txt1">화성 진안</strong>
                                <div class="txtlabelbox">
                                    <span class="txt">지구명 화성진안 공공주택지구</span>
                                    <span class="txt">면적  452만㎡</span>
                                    <span class="txt">사업시행기간 미정</span>
                                    <span class="txt">위치 경기도 화성시 진안동, 반정동, 반월동, 기산동 일원</span>
                                    <span class="txt">사업시행자 한국토지주택공사</span>
                                    <span class="txt">주택계획 주택 2.9만 호</span>
                                </div>

                                <strong class="txt1">안산 장상</strong>
                                <div class="txtlabelbox">
                                    <span class="txt">지구명 화성진안 공공주택지구</span>
                                    <span class="txt">면적 2,213,319㎡</span>
                                    <span class="txt">사업시행기간 2020년~2027년</span>
                                    <span class="txt">위치 경기도 안산시 상록구 장상동, 장하동, 수암동, 부곡동, 양상동 일원</span>
                                    <span class="txt">사업시행자 경기도, 한국토지주택공사, 경기주택도시공사, 안산도시공사</span>
                                    <span class="txt">주택계획 주택 15천 호</span>
                                </div>

                                <strong class="txt1">과천 과천</strong>
                                <div class="txtlabelbox">
                                    <span class="txt">지구명 과천과천 공공주택지구</span>
                                    <span class="txt">면적1,686,888㎡</span>
                                    <span class="txt">사업시행기간 2019년~2025년</span>
                                    <span class="txt">위치 경기도 과천시 과천동, 주암동, 막계동 일원</span>
                                    <span class="txt">사업시행자 경기도, 한국토지주택공사, 경기주택도시공사, 과천도시공사</span>
                                    <span class="txt">주택계획 주택 7천 호</span>
                                </div>

                                <strong class="txt1">인천 구월2</strong>
                                <div class="txtlabelbox">
                                    <span class="txt">지구명 인천구월2 공공주택지구</span>
                                    <span class="txt">면적 220만㎡</span>
                                    <span class="txt">사업시행기간 미정</span>
                                    <span class="txt">위치 인천광역시 남동구 구월동, 남촌동, 수산동, 연수구 선학동, 미추홀구 관교동, 문학동 일원</span>
                                    <span class="txt">사업시행자 인천도시공사</span>
                                    <span class="txt">주택계획 주택 1.8만 호</span>
                                </div>

                                <strong class="txt1">화성 봉담3</strong>
                                <div class="txtlabelbox">
                                    <span class="txt">지구명 화성봉담3 공공주택지구</span>
                                    <span class="txt">면적 229만만㎡</span>
                                    <span class="txt">사업시행기간 미정</span>
                                    <span class="txt">위치 경기도 화성시 봉담읍 상리, 수영리 일원</span>
                                    <span class="txt">사업시행자 한국토지주택공사</span>
                                    <span class="txt">주택계획주택 1.7만 호</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </template>
            </TabContent>
        </div>
    </section>
</template>
<style scoped>
/* 맵 사용시 삭제 */
/* .policyCon .titdepth2{margin-bottom:4px; font-size:16px;} */
.policyCon .cardbox{margin-bottom:0}
.selectbox.type3 .selectlist{bottom:auto; top:40px}
.timelinebox{height:auto}
@media (max-width: 1189px){
.timelinebox{height:auto}
}
</style>
<script>
import ShareCommon from '@/components/elements/ShareCommon.vue';
import { policyList } from '@/data/policyList.js';
export default {
    components: {
        ShareCommon
    },
    data() {
        return {
            policyList,
            // year: '2021',
            // selectMonth: false,
            tabnum: 0
            
        };
    },
    mounted() { // 2022.02.11 모바일 버전에서 지도 보는 버튼 숨김
        // document.querySelector('.changebtn').style.display = 'none';
    },
    methods: {
        //공통 == 탭클래스 처리 active
        tabClick(parm, type) {
            console.log(type);
            if (type === '정부정책') {
                this.tabnum = parm;
            }
        },
         //년월선택
        // Dayselect(idx, year, parms) {
        //     this.year = year;
        //     const scrTop = this.$refs['timeline' + year][0].offsetTop;
        //     window.$eventBus.$emit('scrollMove', scrTop);
        //     this.DayLayerOpen(parms);
        // },
        //월 셀렉, 레이어 오픈
        // DayLayerOpen(parms) {
        //     this[parms] === true ? this[parms] = false : this[parms] = true;
        // },
        //외부링크
        excuteOutLink(link) {
            window.open(link);
        }
    }
};
</script>