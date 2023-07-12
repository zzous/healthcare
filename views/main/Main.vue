<template>
    <section class="mainPage">
        <div class="mainlinebanner" v-if="mainlinebanner">
            <span class="text">2021년 10월 25일 리브부동산 서비스가 일시 중단될 예정입니다.</span>
            <span class="link">자세히 보기</span>
            <span class="btn-close" @click="mainlinebanner =!mainlinebanner"></span>
        </div>
        
        <div class="mainFull">
            <div class="maincontent">
                <div class="mainsec bgbox" >
                    <h1 class="headmainLg firstmotion">KB가 만든 부동산 데이터 플랫폼</h1>
                    <!-- PC버전 클래스 web , mobile버전 클래스 mobile  -->
                    <div class="menucardbox secondmotion" :class="[{mobile:winwidth < 905}, {web:winwidth > 904}]" >
                        <!-- winwidth < 905 -->
                        <template v-if="winwidth < 905">
                            <template v-for="(card, index) in menucardListW" >
                                <div
                                    :class="[
                                        'menucard', card.classname,
                                        {flipcard:card.subList.length > 0},
                                        {active:card.active}
                                    ]"
                                    :key="index"
                                    @click="guideMenu(card.classname)"
                                >
                                    <template>
                                        <div class="front" v-if="card.subList.length > 0 || (card.classname==='menuguide')">
                                            <strong>{{card.name}}</strong>
                                        </div>
                                        <div class="front" v-if="card.subList.length === 0 && !(card.classname==='menuguide')" @click="goToPage(card.link)">
                                            <strong>{{card.name}}</strong>
                                        </div>
                                        <div class="back" v-if="!(index===0)">
                                            <div class="cardbtngroup">
                                                <button type="submit"
                                                    :class="'btnkbdata'+(idx+1)"
                                                    v-for="(subcard, idx) in card.subList"
                                                    :key="idx"
                                                    @click="goToPage(subcard.sublink)"
                                                >
                                                    {{subcard.text}}
                                                </button>
                                            </div>
                                        </div>
                                    </template>
                                    <button type="button" class="btn-menumore" title="더 알아보기"  @click="cardToggle(index, card.classname)" v-if="card.subList.length > 0">더 알아보기</button>
                                    <button type="button" class="btn-menumore" title="더 알아보기"  @click="cardToggle(index, card.classname)" v-if="card.subList.length === 0">1더 알아보기</button>
                                </div>
                            </template>
                        </template>
                        <VueSlickCarousel v-bind="settings" v-else ref="slickTypeMain">
                            <template v-for="(card, index) in menucardListW">
                               <div class="anycase" :key="index">
                                    <div
                                        :class="[
                                            'menucard', card.classname,
                                            {flipcard:card.subList.length > 0},
                                            {active:card.active}
                                        ]"
                                        
                                        @click="guideMenu(card.classname)"
                                        @mouseover="touchStrart('slickTypeMain')"
                                        @mouseleave="touchEnd('slickTypeMain')"
                                        @touchstart="touchStrart('slickTypeMain')"
                                        @touchend="touchEnd('slickTypeMain')"
                                    >
                                        <template>
                                            <div class="front"
                                                @click="()=> card.subList.length === 0 && !(card.classname==='menuguide') ? goToPage(card.link) : null"
                                            >
                                                <strong>{{card.name}}</strong>
                                            </div>
                                            <div class="back" v-if="!(index===0)">
                                                <div class="cardbtngroup">
                                                    <button type="button"
                                                        :class="'btnkbdata'+(idx+1)"
                                                        v-for="(subcard, idx) in card.subList"
                                                        :key="idx"
                                                        @click="goToPage(subcard.sublink)"
                                                    >
                                                        {{subcard.text}}
                                                    </button>
                                                </div>
                                                <button type="button" class="btn-menumore" title="더 알아보기"  @click="cardToggle(index, card.classname)" v-if="card.subList.length > 0">더 알아보기</button>
                                            </div>
                                        </template>
                                        <button type="button" class="btn-menumore" title="더 알아보기"  @click="cardToggle(index, card.classname)" v-if="!(card.classname==='menudiagram') && !(card.classname==='menupublic')">더 알아보기</button>
                                    </div>
                                    <button type="button" class="btn-menumore elecase" title="더 알아보기"
                                        @click="cardToggle(index, card.classname)"
                                        @mouseover="touchStrart('slickTypeMain')"
                                        @mouseleave="touchEnd('slickTypeMain')"
                                        @touchstart="touchStrart('slickTypeMain')"
                                        @touchend="touchEnd('slickTypeMain')"
                                        v-if="card.classname==='menudiagram' || card.classname==='menupublic'"
                                    >더 알아보기</button>
                               </div>
                            </template>
                        </VueSlickCarousel>
                    </div>
                    <button type="button" class="btn-logingo thirdmotion">로그인하고 더 많은 기능 보기</button>
                </div>
                <div class="mainsec"  ref="menunews">
                    <h1 class="headmain firstmotion"><img src="/images/common/img_headmain1.svg" alt="새로운 부동산 데이터 소식을 알아보세요"></h1>
                    <div class="flexbox secondmotion">
                        <div class="box secondmotion">
                            <h1 class="headsub"><img src="/images/common/img_headsub1.svg" alt="데이터허브 Pick"></h1>
                            <button type="button" class="btn btn-dataguide arw right">전체보기</button>
                            <!--
                                PC, TABLET(768px ~)은 6개 노출
                                MOBILE(~ 767px)은 4개 노출
                            -->
                            <div role="listbox" class="newsbox">
                                <div role="listitem" class="newsitem" v-for="(item, index) in hubpick" :key="index">
                                    <div class="img"><img :src="item.image" alt=""></div>
                                    <p v-html="item.text"></p>
                                </div>
                            </div>
                        </div>
                        <div :class="['box','thirdmotion', {moreHeightbox:moreList}]">
                            <h1 class="headsub"><img src="/images/common/img_headsub2.svg" alt="새로 업데이트 되었어요"></h1>
                            <div role="listbox" class="textlistbox type1">
                                <div role="listitem" :class="['textitem',{new:item.new}]" v-for="(item, index) in updateList" :key="index">
                                    <span class="subtxt" v-html="item.type"></span>
                                    <span class="maintxt" v-html="item.title"></span>
                                    <em class="date" v-html="item.date"></em>
                                </div>
                                <div :class="['moveitem', {active:moreactive}]"  v-if="moreList">
                                    <div role="listitem" :class="['textitem move',{new:item.new}]" v-for="(item) in addUpdateList" :key="item.title">
                                        <span class="subtxt" v-html="item.type"></span>
                                        <span class="maintxt" v-html="item.title"></span>
                                        <em class="date" v-html="item.date"></em>
                                    </div>
                                </div>
                            </div>
                            <div class="rankmorebox">
                                <button type="button" :class="['btn btnrankmore arw', {down:!moreList}, {up:moreList}]" @click="moreUpdateList">
                                    <span v-if="!moreList">더보기</span>
                                    <span v-else >접기</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- KB통계기상도 -->
                <div class="mainsec bgbox" ref="menuweather">
                    <div class="flexbox imgbox">
                        <div class="title">
                            <img src="/images/common/text_pc_weathermap.svg" alt="KB통계기상도" class="firstmotion">
                            <button type="button" class="btn-menugo iconweather secondmotion" title="KB통계기상도 바로가기">KB통계기상도 바로가기</button>
                        </div>
                        <div class="img thirdmotion">
                            <div class="video">
                                <video loop="" autoplay="" muted="" playsinline="">
                                    <!-- 660*490 -->
                                    <source src="/images/common/video_weathermap.mp4" type="video/mp4">
                                </video>
                            </div>
                        </div>
                        <!-- 비디오 노출 안될 시 대체 이미지 -->
                        <!-- <img src="/images/common/img_weathermap@3x.png" alt=""> -->
                    </div>
                </div>
                <!-- KB통계보드 -->
                <div class="mainsec bgbox" ref="menuboard">
                    <div class="flexbox imgbox">
                        <div class="title">
                            <img src="/images/common/text_pc_kbboard.svg" alt="KB통계보드" class="firstmotion">
                            <button type="button" class="btn-menugo iconkbboard secondmotion" title="KB통계보드 바로가기">KB통계보드 바로가기</button>
                        </div>
                        <div class="img thirdmotion">
                            <div class="video">
                                <video loop="" autoplay="" muted="" playsinline="">
                                    <!-- 660*490 -->
                                    <source src="/images/common/video_kbboard.mp4" type="video/mp4">
                                </video>
                            </div>
                            <!-- 비디오 노출 안될 시 대체 이미지 -->
                            <!-- <img src="/images/common/img_kbboard@3x.png" alt=""> -->
                        </div>
                    </div>
                </div>
                <!-- 부동산지도 -->
                <div class="mainsec bgbox" ref="menuai">
                    <div class="flexbox imgbox">
                        <div class="title">
                            <img src="/images/common/text_pc_ai.svg" alt="부동산지도" class="firstmotion">
                            <button type="button" class="btn-menugo iconai secondmotion" title="부동산지도 바로가기">부동산지도 바로가기</button>
                        </div>
                        <div class="img thirdmotion">
                            <div class="video">
                                <video loop="" autoplay="" muted="" playsinline="">
                                    <!-- 660*490 -->
                                    <source src="/images/common/video_ai.mp4" type="video/mp4">
                                </video>
                            </div>
                            <!-- 비디오 노출 안될 시 대체 이미지 -->
                            <!-- <img src="/images/common/img_ai@3x.png" alt=""> -->
                        </div>
                    </div>
                </div>
                <!-- KB통계 -->
                <div class="mainsec bgbox" ref="menudiagram">
                    <div class="flexbox imgbox ">
                        <div class="title">
                            <div class="firstmotion">
                                <span class="changetit"><img :src="kbdataLists[currentTarget].textimage" :alt="kbdataLists[currentTarget].name" /></span>
                            </div>
                            <div class="kbdatabtn secondmotion">
                                <button type="button"
                                v-for="(item, index) in kbdataLists" :key="index"
                                :class="[{active:item.active}, 'btnkbdata'+(index+1)]"
                                @click="imgPaging(index)"></button>
                            </div>
                            <button type="button" :class="['btn-menugo','thirdmotion', 'iconkbdata'+(currentTarget+1)]">{{kbdataLists[currentTarget].name}}</button>
                        </div>
                        <div class="img pagingimg fourthmotion">
                            <div class="imgchange active">
                            <img :src="kbdataLists[currentTarget].viewimages">
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 공공통계  -->
                <div class="mainsec bgbox" ref="menupublic">
                    <h1 class="headsubLg firstmotion">여기 저기 흩어진 공공 빅테이터를 한 곳에서 간편하게 보세요.</h1>
                    <div class="imgrolling secondmotion">
                        <VueSlickCarousel v-bind="settings1" ref="slickTypePublic">
                            <span role="button"
                                v-for="(image, index) in publicdataimgs"
                                :key="index"
                                @mouseover="touchStrart('slickTypePublic')"
                                @mouseleave="touchEnd('slickTypePublic')"
                                @touchstart="touchStrart('slickTypePublic')"
                                @touchend="touchEnd('slickTypePublic')"
                                @touchmove="touchEnd('slickTypePublic')"
                            >
                                <img :src="image.src" :alt="image.text">
                            </span>
                        </VueSlickCarousel>
                    </div>
                </div>
            </div>
            <div :class="['myfloating', {active:floatingClick}, checkedClass]" >
                <span role="button" class="iconlatestbtn" @click="interestLayer($event,'iconlatest')"><em>최근 본</em></span>
                <span role="button" class="iconlikebtn" @click="interestLayer($event,'iconlike')"><em>관심있는</em></span>
            </div>
        </div>
        <div :class="['mylayer', checkedClass]" v-if="mylayer">
            <div class="mylayerin">
                <div class="mobiletit" v-if="mobileMode">
                    <span v-if="checkedClass==='iconlike'">관심있는 부동산</span>
                    <span v-else>최근 본</span>
                    <button class="btn btn-popclose" @click="mylayerClose"></button>
                </div>
                <div role="listbox" class="textlistbox type2">
                    <!--
                        라벨 건물유형별 클래스명
                        아파트 : buildtype1
                        오피스텔 : buildtype2
                        빌라 : buildtype3
                        단독 : buildtype4
                        다가구 : buildtype5
                        토지/건물 : buildtype6
                        {type: '아파트', name: '동탄시범다은마을월드메르디앙반도유보라', addr: '화성시 반송동', checked: false},
                    -->
                    <div role="listitem" class="textitem" v-for="(item, index) in interestList" :key="index">
                        <template v-if="item.type==='아파트'">
                            <span class="label build buildtype1">아</span>
                        </template>
                        <template v-if="item.type==='오피스텔'">
                            <span class="label build buildtype2">오</span>
                        </template>
                        <template v-if="item.type==='빌라'">
                            <span class="label build buildtype3">빌</span>
                        </template>
                        <template v-if="item.type==='단독'">
                            <span class="label build buildtype4">단</span>
                        </template>
                        <template v-if="item.type==='다가구'">
                            <span class="label build buildtype5">다</span>
                        </template>
                        <template v-if="item.type==='토지/건물'">
                            <span class="label build buildtype5">토</span>
                        </template>
                        
                        <div class="txt">
                            <p class="maintxt ellipsis" v-html="item.name"></p>
                            <p class="subtxt" v-html="item.addr"></p>
                        </div>
                        <button type="button" title="관심부동산으로 등록" aria-label="관심부동산으로 등록" :class="['iconbtn','btn-like',{active:item.checked}]"></button>
                    </div>
                    <!-- 관심부동산 5개 이상인 경우 버튼 노출 -->
                    <button type="button" class="btn-interest arw right" v-if="checkedClass==='iconlike'"><strong>999</strong>개 전체보기</button>
                    <!-- 리스트가 존재하지 않을 때 -->
                    <div class="mynodata" title="최근 본 부동산이 없습니다." v-if="interestList.length === 0">
                        <button type="button" class="btn btn-gray">부동산 가격지도 바로가기 &gt;</button>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
export default {
    props: {
        scrollH: [Number]
    },
    data() {
        return {
            //띠배너
            mainlinebanner: true,
            //슬라이드 모션
            settings: {
                arrows: false,
                dots: false,
                infinite: true,
                slidesToShow: 6,
                slidesToScroll: 0.1,
                autoplay: true,
                speed: 500,
                autoplaySpeed: 0,
                pauseOnFocus: false,
                pauseOnHover: false,
                swipeToSlide: false,
                touchMove: false,
                cssEase: 'linear',
                responsive: [
                    {
                        breakpoint: 1630,
                        settings: {
                            slidesToShow: 5
                        }
                    },
                    {
                        breakpoint: 1400,
                        settings: {
                            slidesToShow: 4.5
                        }
                    },
                    {
                        breakpoint: 1230,
                        settings: {
                            slidesToShow: 4
                            
                        }
                    },
                    {
                        breakpoint: 950,
                        settings: {
                            slidesToShow: 3.5
                        }
                    }

                ]
            },
            //슬라이드 모션
            settings1: {
                arrows: false,
                dots: false,
                infinite: true,
                slidesToShow: 5,
                slidesToScroll: 0.05,
                autoplay: true,
                speed: 500,
                autoplaySpeed: 0,
                pauseOnFocus: false,
                pauseOnHover: false,
                cssEase: 'linear',
                responsive: [
                    {
                        breakpoint: 1630,
                        settings: {
                            slidesToShow: 4
                        }
                    },
                    {
                        breakpoint: 1430,
                        settings: {
                            slidesToShow: 3.5
                        }
                    },
                    {
                        breakpoint: 1270,
                        settings: {
                            slidesToShow: 2.5
                        }
                    },
                    {
                        breakpoint: 547,
                        settings: {
                            slidesToShow: 1.5
                        }
                    }

                ]
            },
            winwidth: 0,
            floatingClick: false,
            checkedClass: null,
            mylayer: false,
            mobileMode: false,
            moreList: false,
            moreactive: false,
            motionTimer: null,
            currentTarget: 0,
            menucardListW: [
                {name: 'Guide', active: false, classname: 'menuguide',  subList: [], link: ''},
                {name: 'KB통계기상도', active: false, classname: 'menuweather', subList: [], link: '/weathermap'},
                {name: 'KB통계보드', active: false, classname: 'menuboard', subList: [], link: '/kbBoard'},
                {name: '부동산지도', active: false, classname: 'menuai', subList: [], link: '/ai'},
                {   name: 'KB통계',
                    active: false,
                    classname: 'menudiagram',
                    subList: [
                        {text: '통계비교', sublink: '/comparison'},
                        {text: '투자테이블', sublink: '/investtable'},
                        {text: '부동산시장심리', sublink: '/psychological'},
                        {text: '소득대비주택가격', sublink: '/pir'},
                        {text: '월간선도아파트', sublink: '/sundoapt'},
                        {text: '주택가격동향조사', sublink: '/monthtable?tableId=주간%20아파트%20매매가격지수'}
                    ],
                    link: ''
                },
                {   name: '공공통계',
                    active: false,
                    classname: 'menupublic',
                    subList: [
                        {text: '주택거래량', sublink: '/house'},
                        {text: '주택공급', sublink: ''},
                        {text: '미분양', sublink: '/unsold'},
                        {text: '인구', sublink: '/people'},
                        {text: '가구', sublink: '/household'},
                        {text: '토지', sublink: '/land'},
                        {text: '정부정책', sublink: '/policy'}
                    ],
                    link: ''
                },
                {name: 'NEWS', active: false, classname: 'menunews', subList: [], link: ''}
            ],
            hubpick: [
                {image: '/images/samples/img_1@2x.png', text: '대출 빙하기 극복할 "슬기로운 금융생활" 꿀팁은?'},
                {image: '/images/samples/img_1@2x.png', text: '인구 학자들의 경고, 주택시장의 깊은 한숨'},
                {image: '/images/samples/img_1@2x.png', text: '전국 오피스텔 시세지수는 연간 14.1%상승, 12월은 상승폭은 주춤'},
                {image: '/images/samples/img_1@2x.png', text: '대출 빙하기 극복할 "슬기로운 금융생활" 꿀팁은?'},
                {image: '/images/samples/img_1@2x.png', text: '인구 학자들의 경고, 주택시장의 깊은 한숨'},
                {image: '/images/samples/img_1@2x.png', text: '전국 오피스텔 시세지수는 연간 14.1%상승, 12월은 상승폭은 주춤'}
            ],
            updateList: [
                {type: '주택가격동향조사', title: '(주간)KB주택가격동향', date: '2021.12.30', new: true},
                {type: '토지', title: '눈여겨 봐야 할 보조지수', date: '2021.12.30', new: true},
                {type: '부동산', title: '12월 추정가 갱신', date: '2021.12.30', new: false},
                {type: '주택공급', title: '청약통장가입현황', date: '2021.12.30', new: false},
                {type: '주택공급', title: '청약통장가입현황', date: '2021.12.30', new: false}
            ],
            addUpdateList: [
                {type: '주택공급', title: '청약통장가입현황', date: '2021.12.30', new: false},
                {type: '주택가격동향조사', title: '(주간)KB주택가격동향', date: '2021.12.30', new: false},
                {type: '토지', title: '눈여겨 봐야 할 보조지수', date: '2021.12.30', new: false},
                {type: '부동산', title: '12월 추정가 갱신', date: '2021.12.30', new: false}
                
            ],
            interestList: [
                {type: '아파트', name: '동탄시범다은마을월드메르디앙반도유보라', addr: '화성시 반송동', checked: false},
                {type: '아파트', name: '동탄시범다은마을월드메르디앙반도유보라', addr: '화성시 반송동', checked: false},
                {type: '빌라', name: '동탄시범다은마을월드메르디앙반도유보라', addr: '화성시 반송동', checked: false},
                {type: '아파트', name: '동탄시범다은마을월드', addr: '화성시 반송동', checked: false},
                {type: '단독', name: '동탄시범다은마을월드메르디앙반도유보라', addr: '화성시 반송동', checked: false},
                {type: '다가구', name: '211-3', addr: '화성시 반송동', checked: false},
                {type: '토지/건물', name: '동탄시범다은마을월드메르디앙반도유보라', addr: '화성시 반송동', checked: false}
            ],
            kbdataLists: [
                {name: '통계비교보기', textimage: '/images/common/text_pc_kbdata1.svg', viewimages: '/images/common/img_kbdata1@3x.png', active: true},
                {name: '투자테이블보기', textimage: '/images/common/text_pc_kbdata2.svg', viewimages: '/images/common/img_kbdata2@3x.png', active: false},
                {name: '부동산심리지수보기', textimage: '/images/common/text_pc_kbdata3.svg', viewimages: '/images/common/img_kbdata3@3x.png', active: false},
                {name: '소득대비주택가격보기', textimage: '/images/common/text_pc_kbdata4.svg', viewimages: '/images/common/img_kbdata4@3x.png', active: false},
                {name: '월간선도아파트보기', textimage: '/images/common/text_pc_kbdata5.svg', viewimages: '/images/common/img_kbdata5@3x.png', active: false},
                {name: '주택가격동향조사보기', textimage: '/images/common/text_pc_kbdata6.svg', viewimages: '/images/common/img_kbdata6@3x.png', active: false}
            ],
            publicdataimgs: [
                {src: '/images/common/img_public1@2x.png', text: '거래량'},
                {src: '/images/common/img_public2@2x.png', text: '인구(지도)'},
                {src: '/images/common/img_public3@2x.png', text: '가구(그래프)'},
                {src: '/images/common/img_public4@2x.png', text: '미분양(지도)'},
                {src: '/images/common/img_public5@2x.png', text: '토지(그래프)'},
                {src: '/images/common/img_public6@2x.png', text: '거래량(지도)'},
                {src: '/images/common/img_public7@2x.png', text: '주택공급(그래프)'},
                {src: '/images/common/img_public8@2x.png', text: '가구(지도)'},
                {src: '/images/common/img_public9@2x.png', text: '인구(그래프)'},
                {src: '/images/common/img_public10@2x.png', text: '미분양(그래프)'},
                {src: '/images/common/img_public11@2x.png', text: '토지(지도)'}
            ]
        };
    },
    watch: {
        //스크롤 이벤트
        scrollH: {
            deep: true,
            handler() {
                this.scrollHandl();
            }
        }
    },
    mounted() {
        window.addEventListener('resize', this.handleResize);
        this.handleResize();
        // 첫번째 카드 모션
        clearTimeout(this.motionTimer);
        this.motionTimer = setTimeout(() => {
            if (document.querySelectorAll('.mainsec')) {
                document.querySelectorAll('.mainsec')[0].classList.add('ani');
            }
        }, 300);
        this.scrollHandl();
    },
    beforeDestory() {
        window.removeEventListener('resize', this.handleResize);
    },
    created() {
        this.winwidth = window.innerWidth;
    },
    methods: {
        interestLayer(e, type) {
            if (type === 'iconlatest') {
                if (this.checkedClass === 'iconlatest') {
                    this.floatingClick = false;
                    this.mylayer = false;
                    this.checkedClass = null;
                } else {
                    this.checkedClass = 'iconlatest';
                    this.floatingClick = true;
                    this.mylayer = true;
                }
            } else if (type === 'iconlike') {
                if (this.checkedClass === 'iconlike') {
                    this.floatingClick = false;
                    this.mylayer = false;
                    this.checkedClass = null;
                } else {
                    this.checkedClass = 'iconlike';
                    this.floatingClick = true;
                    this.mylayer = true;
                }
            }
            if (window.innerWidth < 906) {
                document.querySelector('#wrap').classList.add('modalOpen');
                this.mobileMode = true;
            }
        },
        mylayerClose() {
            this.floatingClick = false;
            this.mylayer = false;
            document.querySelector('#wrap').classList.remove('modalOpen');
        },
        handleResize() {
            this.winwidth = window.innerWidth;
            if (window.innerWidth < 1190 && this.mylayer === true) {
                document.querySelector('#wrap').classList.add('modalOpen');
                this.mobileMode = true;
            } else {
                document.querySelector('#wrap').classList.remove('modalOpen');
                this.mobileMode = false;
            }
        },
        moreUpdateList() {
            this.moreList = !this.moreList;
            this.$nextTick(function() {
                clearTimeout(this.motionTimer);
                this.motionTimer = setTimeout(() => {
                    this.moreactive = !this.moreactive;
                }, 200);
            });
        },
        cardToggle(idx, type) {
            //console.log(this.$refs[type].offsetTop);
            //window.$eventBus.$emit('scrollMove', sectionH);
            const sectionH = this.$refs[type].offsetTop;
            if ((idx === 4 || idx === 5) && this.winwidth < 905) {
                this.menucardListW.forEach((ele, index) => {
                    if (index === idx) {
                        ele.active === true ? ele.active = false : ele.active = true;
                    }
                });
            } else {
                window.$eventBus.$emit('scrollMove', sectionH);
            }
        },
        imgPaging(idx) {
            if (document.querySelector('.imgchange')) {
                document.querySelector('.imgchange').classList.remove('active');
                this.kbdataLists.forEach((ele, index) => {
                    if (index === idx) {
                        ele.active = true;
                        clearTimeout(this.motionTimer);
                        this.motionTimer = setTimeout(() => {
                            this.currentTarget = idx;
                            document.querySelector('.imgchange').classList.add('active');
                        }, 500); // 500 => 100 시간 변경
                   
                    } else {
                        ele.active = false;
                    }
                });
            }
        },
        touchStrart(el) {
            this.$refs[el].pause();
        },
        touchEnd(el) {
            this.$refs[el].play();
        },
        //가이드 메뉴 
        guideMenu(type) {
            if (type === 'menuguide') {
                window.$eventBus.$emit('guidePage', 'click');
            }
        },
        //스크롤이벤트
        scrollHandl() {
            window.$eventBus.$emit('guidePage', 'scroll');
            document.querySelectorAll('.mainsec').forEach((ele, index) => {
                if (!(index === 0)) {
                    if (ele.offsetTop < this.scrollH + 400) {
                        ele.classList.add('ani');
                    } else {
                        ele.classList.remove('ani');
                    }
                }
            });
        }
    }
};
</script>