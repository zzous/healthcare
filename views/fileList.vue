<template>
    <div class="fileWrap">
        <h1><img src="/images/layout/img_logo_horizon.svg" />파일 리스트</h1>
        <div class="filelist">
            <ul class="labelgroup">
                <li class="num">NO</li>
                <li class="menu">메뉴Depth1</li>
                <li class="menu">메뉴Depth2</li>
                <li class="titfile">파일명 </li>
                <li class="etc">비고</li>
            </ul>
            <ul v-for="(item, index) in filelist" :key="index" class="labelgroup">
                 <li class="num">{{index+1}}</li>
                 <li class="menu">{{item.menudepth1}}</li>
                 <li class="submenu">
                     <ul>
                         <li v-for="(list, index) in item.subdepth" :key="index" :class="{done:list.done}">
                            <span>{{list.menudepth2}}</span>
                            <span>
                                
                                <template v-if="item.menudepth1 === '공통'">
                                    
                                    <em v-for="(text, index) in list.filelistname" :key="index" :class="[{active:text.done}, {labellist:text.label}]">
                                        <em class="labelguide" v-if="text.label">개발 추가 작업</em> {{text.text}}
                                    </em>
                                </template>
                                <em style="cursor:pointer" v-else @click="goToPage(list.link)">{{list.filelistname}}</em>
                            </span>
                            <span>{{list.etc}}</span>
                         </li>
                     </ul>
                 </li>

            </ul>
        </div>
    </div>
</template>
<script>
export default {
    
    data() {
        return {
            filelist: [
                {menudepth1: '공통',
                    subdepth: [
                        {
                            menudepth2: '',
                            filelistname:
                                [
                                    {text: '반응형 레이아웃 재 작업 (디자인 미배포 ) 완료예정일: 모름', done: false, label: false},
                                    {text: 'GNB 스크롤 정의 (디자인 미배포 ) 완료예정일: 모름', done: false, label: false},
                                    {text: '차트 갭쳐 영역 태그 분리 (12/20완료) 디자인 미정으로 추가 css작업 있음(레이어내의 리스트 디자인변경)', done: false, label: true},
                                    {text: '차트 툴팁 모바일(해상도 기준 767)일때 차트 영역 밖으로 태그 분리 태그 변경 및 클래스 추가(퍼블리싱 12/21완료)', done: false, label: true},
                                    {text: '지역선택 레이어 추가 (퍼블리싱 01/04완료 태그 변경 스크립트 변경)', done: false, label: true},
                                    {text: '거래량/인구/가구 최근 조회지역 모바일 ui변경 (퍼블리싱 01/13완료 태그 변경)', done: false, label: true}
                                ],
                            link: '',
                            etc: '',
                            done: false
                        }
                    ]

                },
                {menudepth1: '메인',
                    subdepth: [
                        {
                            menudepth2: '메인',
                            filelistname: '메인 - @views/main/Main.vue',
                            link: '/main',
                            etc: '개발 필요한 부분 일부진행(데이터허브 pick, 업데이트 , 최근, 관심 부동산 레이어)',
                            done: false
                        }
                    ]
                },
                {menudepth1: 'KB통계',
                    subdepth: [
                        {
                            menudepth2: '통계기상도',
                            filelistname: '통계기상도 - @views/statistics/WeatherMap.vue',
                            link: '/weathermap',
                            etc: '상단 필터 툴팁 버튼 디자인 수정 있을수 있음/ 범례 케이스 변경완료(1/13)',
                            done: true
                        },
                        {
                            menudepth2: '통계비교',
                            filelistname: '지역간 데이터 비교하기 - @views/statistics/Comparison.vue',
                            link: '/comparison',
                            etc: '완료- 상단 고정시 스크롤(01/04 디자인 배포) 진행중(1/6일 완료 예정)',
                            done: true
                        },
                        {
                            menudepth2: '통계비교- 모바일 ',
                            filelistname: '통계비교- 모바일- @views/statistics/ComparisonMobile.vue',
                            link: '/comparison_mobile',
                            etc: '완료',
                            done: true
                        },
                        {
                            menudepth2: 'PIR',
                            filelistname: '소득 대비 주택가격 비율(PIR) - @views/statistics/PIR.vue',
                            link: '/PIR',
                            etc: '텍스트 추가 (1/13일완료)',
                            done: true
                        },
                        {
                            menudepth2: '심리지수',
                            filelistname: '심리지수 - @views/statistics/Psychological.vue',
                            link: '/psychological',
                            etc: '버튼 추가 (1/13일완료)',
                            done: true
                        },
                        {
                            menudepth2: '선도 아파트',
                            filelistname: '선도 아파트 - @views/statistics/SundoApt.vue',
                            link: '/sundoapt',
                            etc: '(12/23일 기준 퍼블리싱 완료), 지역 선택 레이어 (퍼블리싱 01/04완료 태그 변경 동작 변경)',
                            done: true
                        },
                        {
                            menudepth2: '투자 테이블',
                            filelistname: '투자 테이블 - @views/statistics/InvestTable.vue',
                            link: '/investtable',
                            etc: '퍼블리싱 완료(1/13) (디자인 업데이트 1/10완료)',
                            done: true
                        },
                        {
                            menudepth2: '주월간 주택동향',
                            filelistname: ' @views/statistics/MonthTable.vue',
                            link: '/monthtable?tableId=주간%20아파트%20매매가격지수',
                            etc: '진행중',
                            done: false
                        },
                        {
                            menudepth2: 'KB통계보드',
                            filelistname: ' @views/statistics/kbBoard.vue',
                            link: '/kbBoard',
                            etc: '완료',
                            done: true
                        }
                    ]

                },
                {menudepth1: '주택',
                    subdepth: [
                        {
                            menudepth2: '거래량',
                            filelistname: '거래량',
                            link: '/house',
                            etc: '캡쳐 영역 버튼 분리 수정 예정(12/20일 기준 디자인 미배포), 거래량 Top5 UI 변경완료(1/13일)  ',
                            done: true
                        }
                    ]

                },
                {menudepth1: '공공통계',
                    subdepth: [
                        {
                            menudepth2: '인구',
                            filelistname: '인구',
                            link: '/people',
                            etc: '캡쳐 영역 버튼 분리 수정 예정(12/20일 기준 디자인 미배포), 최근조회지역 UI  변경완료(1/13일)',
                            done: true
                        },
                        {
                            menudepth2: '가구',
                            filelistname: '가구',
                            link: '/household',
                            etc: '캡쳐 영역 버튼 분리 수정 예정(12/20일 기준 디자인 미배포), 최근조회지역 UI  변경완료(1/13일)',
                            done: true
                        },
                        {
                            menudepth2: '미분양',
                            filelistname: '미분양',
                            link: '/unsold',
                            etc: '',
                            done: true
                        },
                        {
                            menudepth2: '토지',
                            filelistname: '토지',
                            link: '/land',
                            etc: '',
                            done: true
                        },
                        {
                            menudepth2: '정부정책',
                            filelistname: '정부정책',
                            link: '/policy',
                            etc: '완료',
                            done: true
                        },
                        {
                            menudepth2: '주택공급',
                            filelistname: '주택공급',
                            link: '/SupplyHouse',
                            etc: '완료',
                            done: true
                        }
                    ]

                },
                {menudepth1: 'AI 가격지도',
                    subdepth: [
                        {
                            menudepth2: '주택',
                            filelistname: '주택-@views/ai/Aihouse.vue',
                            link: '/ai',
                            etc: '',
                            done: true
                        }
                    ]

                }
            ]
        };
    }
};
</script>
<style>
.fileWrap{padding:30px; color:#676767}
.fileWrap > h1{display:flex;align-items: center; border-bottom:solid 1px #ddd}
.fileWrap > h1 img{margin-right:5px;}
.filelist{margin-top:30px;}
.labelgroup{display:flex;align-items: center;background:#dfe0e2; text-align: center;}
.labelgroup > li{ padding:5px 0; }
.labelgroup +.labelgroup{background:#fff;align-items:stretch}
.labelgroup +.labelgroup > li{border-bottom:solid 1px #ddd;padding:0px;}
.labelgroup .num{flex-basis:60px; flex-shrink:0; border-right:solid 1px #ddd}
.labelgroup .etc{flex-basis:400px; flex-shrink:0;}
.labelgroup .menu{flex-basis:150px; flex-shrink:0;border-right:solid 1px #ddd}
.labelgroup .titfile{flex:1;border-right:solid 1px #ddd}
.labelgroup +.labelgroup > li.titfile{text-align: left; padding-left:10px;}
.labelgroup +.labelgroup > li.menu{text-align: left; padding-left:10px;}
.labelgroup > li.submenu{flex:1}
.labelgroup > li.submenu ul li.done{background:#eee}
.labelgroup > li.submenu ul li{display: flex;border-bottom:solid 1px #ddd}
.labelgroup > li.submenu ul li:nth-last-of-type(1){border-bottom:none;}
.labelgroup > li.submenu ul li span{padding:5px 0;text-align: left; padding-left:10px;border-right:solid 1px #ddd;}
.labelgroup > li.submenu ul li span:nth-of-type(1){flex-basis:150px; flex-shrink:0;}
.labelgroup > li.submenu ul li span:nth-of-type(2){flex:1;}
.labelgroup > li.submenu ul li span:nth-of-type(3){flex-basis:400px; flex-shrink:0;border-right:none;}
.labelgroup > li.submenu ul li span a{text-decoration: underline; color:#666}
.labelgroup > li.submenu ul li span em{display:block;}
.labelgroup > li.submenu ul li span em em.labelguide{display:inline-block; padding:0 6px; height:16px; text-align: center; background-color:#4281ff; color:#fff;    border-radius: 30px;
    font-size: 12px;line-height: 15px;}
    .labellist{color:#4281ff}
</style>