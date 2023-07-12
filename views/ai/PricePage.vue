<template>
    <div style="position:relative;height:100%;">
        <div class="map" style="height:100%;width:100%;">
            <div class="circlebx" style="width:100px;height:100px;top:10%;left:10%">
                인천<br>00,000 호
            </div>

            <div class="btn btn-date">
                <span>기준월</span>
                <strong>2021.07</strong>
            </div>
            <div class="maptools">
                <button type="button" class="btn btn-shar">공유</button>
                <div class="groups">
                    <button type="button" class="btn btn-zoom-up">확대</button>
                    <button type="button" class="btn btn-zoom-down">축소</button>
                </div>
                <button type="button" class="btn btn-location">위치</button>
            </div>
            <div class="layer-popup type2" style="top:400px;right:50px; position:absolute; z-index:999;">
				<div class="layercon">
					<button type="button" class="btn btn-popclose" title="닫기">닫기</button>
					<div class="inner">
						<strong class="tit">경북</strong>
						<button type="button" class="btn btn-dataview" title="상세 데이터 복">상세 데이터 보기</button>

                        <TabContent
                            :tabcontentname="'상세데이터보기'"
                            :tabsublist="'tabbox tabtype5'"
                            :tabtexts="tabtextsType1"
                            v-on:tabactive="tabClick"
                        >
                            <template slot="panel">
                                <div class="tabcon" role="tabpanel" v-if="tabnum===0">
                                    <div class=""></div>

                                   
                                </div>
                                <div class="tabcon" role="tabpanel" v-if="tabnum===1">
                                    <div class="pi">
                                        <img src="/images/common/chart.png" alt="확인을위한 썸네일">
                                        <div class="text" style="top:19px;left:21px; position:absolute">단독주택<br>123,456호</div>
                                    </div>
                                    
                                </div>
                                <div class="lalyerbtn">
                                    <button type="button" class="btn btn_location">경북 내 지역 보기</button>
                                </div>
                            </template>
                        </TabContent>
						
					</div>
				</div>
			</div>
            
            <NaverMaps :polyCount="polyCount" :svgCount="svgCount" :zoomLevel="7" style="width:100%; height:100%;" />
        </div>
        
    </div>
</template>
<style>
.circlebx { display: flex;position: absolute;align-items: center;justify-content: center;text-align: center; color: #fff;font-size: 16px;font-weight: 500; background: rgba(54,95,191,0.5);border-radius: 100%;cursor: pointer;z-index: 999;}
.btn-date {position: fixed;bottom: 30px;right: 50px;width: 141px; height: 36px;line-height: 20px; padding: 8px 10px; border: 0; background: #fff;cursor: pointer; z-index: 999;box-shadow:0 6px 16px 0 rgba(0,0,0,0.16);}
.btn-date:after{position:relative;top:2px;left:3px;display:inline-block;content: "";width: 16px;height: 16px;margin-right: 4px;background-image: url('/images/common/icon_16_gray_down.svg');transform: rotate(90deg);}
.btn-date span{color:#aeb0b4}
.btn-date strong{color:#1e1e1f;font-weight:400;font-size:14px}
.btn-dataview{position:relative;border:0;font-size:13px;padding-right:18px}
.btn-dataview:after{position:absolute;top:50%;right:0;content:"";transform:rotateY(180deg);display:block;width:16px;height:16px;margin-top:-8px;background:url('/images/common/icon-16-arrowdown.svg')}
.btn_location{padding:5px 8px;border-radius:15px;color:#4281ff;border:1px solid #4281ff;line-height:1.3;font-size:13px;}
.btn_location:after{display:inline-block;content:"";width:16px;height:16px;margin-left:1px;background:url('/images/common/icon-16-search.svg');vertical-align:middle;}

.maptools{position:absolute;top:36px;right:36px; z-index:999}
.maptools button{display:block;width:36px;height:36px;border-radius:6px;background:#fff;border:1px solid #ccc;box-shadow:0 6px 16px 0 rgba(0,0,0,0.16);text-align:center;color:#222;font-size:13px;font-weight:500}
.maptools .groups{margin:12px 0}
.maptools .groups button:nth-child(1){border-bottom:0;border-bottom-left-radius: 0;border-bottom-right-radius: 0;box-shadow:0}
.maptools .groups button:nth-child(2){border-top:0;border-top-left-radius:0;border-top-right-radius:0;box-shadow:0}
.maptools .mapbx{position:fixed;width:100%;height:100%}



.layer-popup.type2{position:fixed;width:340px;color:#1e1e1f}
.layer-popup.type2 .layercon{width:100%;min-width:auto;border-radius:13px;padding:20px;box-shadow: 0 6px 12px 0 rgba(0, 0, 0, 0.12);}
.layer-popup.type2 .inner{padding:0;text-align:left}
.layer-popup.type2 .inner .pi{position: relative;}
.layer-popup.type2 .inner .pi .text{color:#69696f}
.layer-popup .btn-popclose{border:0}
.layer-popup.type2 .tit{display:inline-block;margin:0 0 16px;font-size:24px;font-weight:500}

.layer-popup.type2 .lalyerbtn{padding-top:16px;margin-top:16px;border-top:1px solid rgba(0, 0, 0, 0.12);text-align:center;}

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
            tabtextsType1: ['년도별', '주택유형별', '거래규모별'],
            tabnum: 0
        };
    },
    methods: {
        tabClick(parm, type) {
            console.log(type);
            if (type === '상세데이터보기') {
                this.tabnum = parm;
            }
        }
    }
};
</script>