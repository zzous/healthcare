<template>
    <section class="statisticswerap">
        <div class="mainTitle">
            <h1 class="titdepth1">지역간 데이터 비교하기</h1>
            <div class="filterbtns">
                <button type="button" class="btn-label round blue">#전국평균가격TOP5</button>
                <button type="button" class="btn-label round blue">#서울시거래량TOP5</button>
                <button type="button" class="btn-label round blue">#GTX-D관련</button>
                <button type="button" class="btn-label round green btn-myChart">+ MY차트</button>
            </div>
            <div class="filterforms">
                <Forminput
                    :labelname="'연도별'"
                    :inputtype="'radio'"
                    :type="'radio'"
                    :name="'time'"
                    :id="'year'"
                />
                <Forminput
                    :labelname="'분기별'"
                    :inputtype="'radio'"
                    :type="'radio'"
                    :name="'time'"
                    :id="'quarter'"
                />
                <Forminput
                    :labelname="'월별'"
                    :inputtype="'radio'"
                    :type="'radio'"
                    :name="'time'"
                    :id="'month'"
                />
                <Forminput
                    :labelname="'주별'"
                    :inputtype="'radio'"
                    :type="'radio'"
                    :name="'time'"
                    :id="'week'"
                />
            </div>
            <Guidetext :icotype="'icohelp'" :guidetext="'원하는 지역의 데이터를 시각화된 차트로 비교해보세요'" />
        </div>
        <section class="chartgroup">
            <h1 class="titdepth2">"<span v-for="(item, index) in location" :key="index" v-html="item.locationname"></span>" 의 지역데이터</h1>
            <div class="chartwrap" :class="{splitview:chartmord}">
                <ChartBox
                    :control="true"
                    :Controltext="Controltext"
                    :controlLayer="controlLayer"
                    :chartname="'공급면적 당 KB시세 아파트 매매 평균가격'"
                    :location="location"
                    @img="CaptureChart"
                    @share="Share"
                    @layer="ToggleLayer"
                    @chartShare="chartShare"
                    @close="chartClose"

                >
                    <div class="chartview">
                        <div class="chartTip" style="left:10px; top:20px">
                            <span class="date">2021.02</span>
                            <span class="tiptit">공급면적 당 KB시세 아파트 매매 평균가격</span>
                            <span :class="'colortype-'+item.classname" v-for="(item, index) in location" :key="index" v-html="item.locationname"></span>
                            <!-- 색상 클래스
                            .colortype-bac055 전국
                            .colortype-e3ba51 서울
                            .colortype-efa360 서울시 강남구
                            .colortype-64ad8f 서울시 서초구 -->
                        </div>
                        <div class="chartarea">
                            <!-- 그래프 색상 코드
                            #bac055 전국
                            #e3ba51 서울
                            #efa360 서울시 강남구
                            #64ad8f 서울시 서초구 -->

                            <img src="/common/images/chart_ex.png" style="width:100%;" />
                        </div>
                    </div>
                </ChartBox>
                <ChartBox
                    v-if="chartmord"
                    :control="false"
                    :controlLayer="controlLayer"
                    :chartname="'공급면적 당 KB시세 아파트 매매 평균가격'"
                    :location="location"
                >
                    <div class="chartview">
                        <div class="chartTip" style="left:10px; top:20px">
                            <span class="date">2021.02</span>
                            <span class="tiptit">공급면적 당 KB시세 아파트 매매 평균가격</span>
                            <span :class="'colortype-'+item.classname" v-for="(item, index) in location" :key="index" v-html="item.locationname"></span>
                            <!-- 색상 클래스
                            .colortype-bac055 전국
                            .colortype-e3ba51 서울
                            .colortype-efa360 서울시 강남구
                            .colortype-64ad8f 서울시 서초구 -->
                        </div>
                        <div class="chartarea">
                            <!-- 그래프 색상 코드
                            #bac055 전국
                            #e3ba51 서울
                            #efa360 서울시 강남구
                            #64ad8f 서울시 서초구 -->

                            <img src="/common/images/chart_ex.png" style="width:100%;" />
                        </div>
                    </div>
                </ChartBox>
            </div>
        </section>
    </section>
</template>
<script>
import ChartBox from '@/components/elements/ChartBox.vue';
import BBChartExample from '../example/samples/BBChartExample.vue';
export default {
    components: {
        ChartBox,
        BBChartExample
    },
    data() {
        return {
            location: [
                {locationname: '전국', classname: 'bac055'},
                {locationname: '서울', classname: 'e3ba51'},
                {locationname: '서울시 강남구', classname: 'efa360'},
                {locationname: '서울시 서초구', classname: '64ad8f'}
            ],
            controlLayer: false,
            chartmord: false,
            Controltext: '[A1 | A2] 차트 나누기'
        };
    },
    methods: {
        CaptureChart() {
            console.log('Capture');
            this.controlLayer = false;
        },
        Share() {
            console.log('Share');
            this.controlLayer = false;
        },
        ToggleLayer() {
            this.controlLayer = !this.controlLayer;
        },
        chartShare() {
            console.log('chartshare');
            this.chartmord = !this.chartmord;
            this.chartmord ? this.Controltext = '[A1 | A2] 차트 합치기' : this.Controltext = '[A1 | A2] 차트 나누기';
        },
        chartClose() {
            console.log('close');
        }
    }
};
</script>
<style>

    .statisticswerap{padding:20px;}
    .mainTitle {display:flex;align-items:center;margin-bottom: 20px; position: relative;}
    .mainTitle .guidetext{margin-left:auto}
    .filterbtns{margin-left:5px;}
    .filterforms{display:flex}
    .filterforms:before{content: ""; display: inline-block;vertical-align: middle;width:1px;height: 15px;margin: 0 12px;background: #e1e1e1;}
    
    .chartwrap{display:flex;}
    .chartwrap .chartbox{flex:1 1 auto}
    
    .charttit span{display:inline-block;width: 20%;padding: 10px;background: #c8e4f0;font-weight: 700;text-align: center;}
    .chartbody{padding: 20px;border: 3px solid #c8e4f0;border-radius: 5px;margin-top:-3px; position: relative;}
    .chartcontrol{position:absolute; right:10px; top:10px}
    .chartname{margin-left: 20px;font-weight: 600;color: #000; opacity: .4;}
    .chartname.default{opacity:1;}
    .chartname:nth-of-type(1){margin-left:0px;}
    .chartwrap.splitview  .chartbox:nth-of-type(1) .chartname{display: none;}
    .chartwrap.splitview  .chartbox:nth-of-type(1) .chartname.default{display: block;}
    .chartwrap.splitview  .chartbox:nth-of-type(2) .chartname.default{display:none;}
    .chartwrap.splitview{justify-content: space-between;}
    .chartwrap.splitview  .chartbox{max-width:49.5%;}
    .chartarea{}
    .chartview{position: relative;}
    .chartTip{position: absolute; box-shadow: 1px 1px 10px #ccc; background-color:#fff; padding:10px; border-radius:15px 15px 0 15px; z-index: 999;}
    .chartTip >span{display:block; font-size:11px;}
    .chartTip .date{color:#666}
    .chartlegend {margin-top:10px}
    .chartlegend > span{display:inline-block; margin:0 0 3px 25px; font-size:12px;}
    .chartlegend > span:before{content: "";display: inline-block;vertical-align: 1px;width: 5px;height: 5px;margin-right: 5px; border-radius: 2px;}
    .chartlegend > span.colortype-bac055:before{background:#bac055}
    .chartlegend > span.colortype-e3ba51:before{background:#e3ba51}
    .chartlegend > span.colortype-efa360:before{background:#efa360}
    .chartlegend > span.colortype-64ad8f:before{background:#64ad8f}
   
   .colortype-bac055{color:#bac055}
   .colortype-e3ba51{color:#e3ba51}
   .colortype-efa360{color:#efa360}
   .colortype-64ad8f{color:#64ad8f}

   .control-layer{position: absolute;z-index: 2;background: #fff;text-align: left; border-radius: 8px;box-shadow: 1px 1px 10px #ccc; left:70px; top:33px;}
   .control-layer > button{display:block; font-size:11px; padding:10px;}
   
   
    /* 타이틀 */
   .titdepth1{font-size:23px}
   .titdepth2{font-size:15px; margin-bottom:20px;}

    

    /*button */
    .btn-label {display:inline-block; vertical-align: middle; position: relative; padding: 5px; border-width:1px;border-style:solid;font-size: 12px; line-height:12px; margin-left:5px;}
    .btn-label:nth-of-type(1){margin-left:0px;}
    .btn-label.round { border-radius: 6px; }
    .btn-label.blue { border-color: #1465e8; color: #1465e8; }
    .btn-label.green { border-color: #4bd44b; color: #4bd44b; }
    .btn-label.btn-myChart { margin-left: 15px; }
    .btn-myChart:before { content: ""; position: absolute; left: -10px; top: 50%; width: 3px; height: 3px; margin-top: -1px; background: #666; border-radius: 50%;margin-top:-1px;}

    .btn-control{min-width: 28px;padding: 5px;font-size: 12px; border:solid 1px #666; border-radius: 4px; margin-left:4px;}
    .btn-control:nth-of-type(1){margin-left:0px;}
    /*아이콘 관련*/
    .guidetext.icohelp:before{content:"?";display:inline-block;width:14px;height:14px;border: 1px solid #333;line-height: 12px;text-align: center;border-radius: 50%;vertical-align: middle; font-size:12px;}
    /* 체크박스 라디오 */
    .custom-radio + .custom-radio { margin-left: 10px; }
    .custom-radio span { display: flex; align-items: center; font-size: 12px; }
    .custom-radio span:before { content: ""; position: relative; width: 6px; height: 6px; margin-right: 3px; padding: 4px; border: 1px solid #ddd; background: #fff; border-radius: 50%; }
    .custom-radio.custom-input input[type="radio"]:checked + span:before { border-color: #ccc; background: #ddd; }

</style>
