<template>
    <div class="example">
        <div class="gap">
            <h2>Naver Map</h2>
            <div><input type="number" placeholder="Polygon 개수" @keydown.enter="e => setValue('poly', e.target.value)" /> (maximum: 20,000)</div>
            <div><input type="number" placeholder="svg 개수" @keydown.enter="e => setValue('svg', e.target.value)"> (svg 개수 * random)</div>

            <div class="container">
                <div class="sLeft">
                </div>
                <div class="sRight">
                    <NaverMaps :polyCount="polyCount" :svgCount="svgCount" />
                </div>
            </div>
        </div>
        <div class="gap">
            <h2>Api Frame</h2>
            <ApiFrameExample />
        </div>
        <div class="gap">
            <h2>Env Frame</h2>
            <EnvFrameExample />
        </div>
        <div class="gap">
            <h2>Switch Frame</h2>
            <SwitchFrameExample />
        </div>
        <div class="gap">
            <h2>Billboard Chart</h2>
            <BBChartExample />
        </div>
        <div class="gap">
            <h3>Draggable (Based on Soratablejs)</h3>
            <div class="sample">
                <SortableExample />
            </div>
        </div>
        <div class="gap">
            <h3>Range Slider</h3>
            <div class="sample">
                <RangeSliderExample />
            </div>
        </div>
        <div class="gap">
            <h3>Datepicker</h3>
            <div class="sample">
                <DatePickerExample />
            </div>
        </div>
        <div class="gap">
            <h3>Vue Custom Scrollbar</h3>
            <div class="sample">
                <VueCustomScrollbarExample />
            </div>
        </div>
        <div class="gap">
            <h3>Modal & Toasted</h3>
            <div class="sample">
                <ToastedExample />
            </div>
            <div class="sample">
                <ModalExample />
            </div>
        </div>
        <div class="gap">
            <h3>Slick</h3>
            <div class="sample">
                <VueSlickExample />
            </div>
        </div>
        <div class="gap">
            <h2>D3 Chart</h2>
            <div class="sample">
                <button @click="getCbnChartData(Math.ceil((Math.random() * 2)))">Data injection</button>
                <CbnChart :promise="cbnChartPromise" />
            </div>
            <div class="sample">
                <button @click="getBarChartData(Math.ceil((Math.random() * 2)))">Data injection</button>
                <BarChart :promise="barChartPromise" />
            </div>
            <div class="sample">
                <button @click="getMultiLineChartData(Math.round((Math.random() * 1)))">Data injection</button>
                <MultiLineChart :promise="multiLineChartPromise" />
            </div>
            <div class="sample">
                <MapChart :promise="mapChartPromise" />
            </div>
        </div>
    </div>
</template>

<script>
import request from '@/core/request';

import NaverMaps from './samples/NaverMaps.vue';
import ApiFrameExample from './samples/ApiFrameExample.vue';
import EnvFrameExample from './samples/EnvFrameExample.vue';
import SwitchFrameExample from './samples/SwitchFrameExample.vue';
import BBChartExample from './samples/BBChartExample.vue';
import SortableExample from './samples/SortableExample.vue';
import RangeSliderExample from './samples/RangeSliderExample.vue';
import DatePickerExample from './samples/DatePickerExample.vue';
import VueCustomScrollbarExample from './samples/VueCustomScrollbarExample.vue';
import ToastedExample from './samples/ToastedExample.vue';
import ModalExample from './samples/ModalExample.vue';
import VueSlickExample from './samples/VueSlickExample.vue';

import CbnChart from '@/components/charts/CbnChart.vue';
import MultiLineChart from '@/components/charts/MultiLineChart.vue';
import BarChart from '@/components/charts/BarChart.vue';
import MapChart from '@/components/charts/MapChart.vue';

export default {
    components: {
        NaverMaps,
        ApiFrameExample,
        EnvFrameExample,
        SwitchFrameExample,
        BBChartExample,
        SortableExample,
        RangeSliderExample,
        DatePickerExample,
        VueCustomScrollbarExample,
        ToastedExample,
        ModalExample,
        VueSlickExample,

        CbnChart,
        BarChart,
        MultiLineChart,
        MapChart
    },
    data() {
        return {
            polyCount: null,
            svgCount: null,
            barChartPromise: () => {},
            cbnChartPromise: () => {},
            multiLineChartPromise: () => {},
            mapChartPromise: () => {}
        };
    },
    async created() {
        // * Init Charts
        await this.getCbnChartData();

        await this.getBarChartData(Math.ceil((Math.random() * 2)));
        await this.getMultiLineChartData(Math.round((Math.random() * 1)));
        await this.getMapChartData();
    },
    methods: {
        setValue(t, v) {
            switch (t) {
                case 'poly':
                    return this.polyCount = v;
                case 'svg':
                    return this.svgCount = v;
            }
        },
        async getCbnChartData() {
            this.cbnChartPromise = new Promise(async (resolve, reject) => {
                try {
                    const resData = await request.get('/dummy/json/monthly.json');

                    const data = Object.keys(resData)
                        .map(key => resData[key])
                        .reduce((acc, cur) => ([...acc, ...cur]), []);
                    const dataset = Object.keys(resData).map(key => {
                        return Object.keys(resData[key]).map(v => {
                            return {
                                x: resData[key][v].date,
                                y: resData[key][v].price
                            };
                        });
                    });

                    const domain = {
                        x: [new Date(d3.min(dataset, d => d3.min(d, c => c.x))), new Date(d3.max(dataset, d => d3.max(d, c => c.x)))],
                        y: [d3.min(dataset, d => d3.min(d, c => c.y)), d3.max(dataset, d => d3.max(d, c => c.y))]
                    };

                    const label = {
                        x: 'Date',
                        y: 'Price'
                    };

                    const series = ['data1', 'data2'];

                    resolve({
                        data,
                        dataset,
                        domain,
                        label,
                        series
                    });
                } catch (error) {
                    reject(error);
                }
            });
        },
        async getBarChartData(params) {
            this.barChartPromise = new Promise(async (resolve, reject) => {
                try {
                    const data = await d3.csv(`/dummy/csv/country${params}.csv`);
                    const dataset = data.map(v => ({ x: v.Country, y: v.Value }));
                    const domain = {
                        x: dataset.map(v => v.x),
                        y: [0, 13000]
                    };
                    const label = {
                        x: 'XLabel',
                        y: 'YLabel'
                    };

                    resolve({
                        data,
                        dataset,
                        domain,
                        label
                    });
                } catch (error) {
                    reject(error);
                }
            });
        },
        async getMultiLineChartData(params) {
            const _Promise = (data, delay) => new Promise(resolve => setTimeout(() => resolve(data), delay));
            const sampleData = [
                {
                    '2019': { '1': 18, '2': 24, '3': 48, '4': 27, '5': 12, '6': 6, '7': 18, '8': 15, '9': 36, '10': 60, '11': 18, '12': 28 },
                    '2020': { '1': 9, '2': 16, '3': 32, '4': 18, '5': 8, '6': 4, '7': 12, '8': 10, '9': 24, '10': 40, '11': 9, '12': 14 },
                    '2021': { '1': 0, '2': 8, '3': 16, '4': 9, '5': 4, '6': 2, '7': 6, '8': 5, '9': 12, '10': 20, '11': 0, '12': 0 }
                },
                {
                    '2022': { '1': 1, '2': 2, '3': 3, '4': 27, '5': 12, '6': 6, '7': 18, '8': 15, '9': 6, '10': 15, '11': 18, '12': 60 },
                    '2023': { '1': 9, '2': 16, '3': 32, '4': 18, '5': 9, '6': 2, '7': 60, '8': 45, '9': 20, '10': 12, '11': 29, '12': 15 },
                    '2024': { '1': 0, '2': 8, '3': 16, '4': 9, '5': 4, '6': 2, '7': 6, '8': 5, '9': 12, '10': 20, '11': 0, '12': 0 },
                    '2025': { '1': 0, '2': 9, '3': 12, '4': 8, '5': 4, '6': 2, '7': 6, '8': 2, '9': 3, '10': 7, '11': 8, '12': 0 },
                    '2026': { '1': 12, '2': 7, '3': 7, '4': 2, '5': 4, '6': 8, '7': 10, '8': 14, '9': 11, '10': 18, '11': 56, '12': 0 },
                    '2027': { '1': 0, '2': 7, '3': 7, '4': 2, '5': 54, '6': 8, '7': 7, '8': 14, '9': 22, '10': 20, '11': 54, '12': 7 }
                }
            ];

            this.multiLineChartPromise = new Promise(async (resolve, reject) => {
                try {
                    const data = await _Promise(sampleData[params], 0);
                    const dataset = Object.keys(data).map(key => Object.keys(data[key]).map(v => ({ x: v, y: data[key][v] })));
                    const domain = {
                        x: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
                        y: [0, 80]
                    };
                    const label = {
                        x: 'XLabel',
                        y: 'YLabel'
                    };
                    const series = Object.keys(data);

                    resolve({
                        data,
                        dataset,
                        domain,
                        label,
                        series
                    });
                } catch (error) {
                    reject(error);
                }
            });
        },
        async getMapChartData() {
            this.mapChartPromise = new Promise(async (resolve, reject) => {
                try {
                    const data = await d3.json('/dummy/topo/seoul.json');
                    const dataset = topojson.feature(data, data.objects['seoul']);
                    const diffData = await d3.csv('/dummy/csv/population.csv');
                    const diffDataset = new Map(diffData.map(d => [`${d.code}`, +d.population]));

                    resolve({
                        data,
                        dataset,
                        diffData,
                        diffDataset
                    });
                } catch (error) {
                    reject(error);
                }
            });
        }
    }
};
</script>

<style lang="scss">
.example {
    .gap { overflow: hidden; max-width: 1200px; margin: 45px auto 30px;
        > h2 { margin: 0 0 15px; font-size: 18px; font-weight: bold; }
        .sample { margin: 15px 0 25px; }
        .guides {
            .sample { margin: 0 0 15px; }
        }
    }

    .container { overflow: hidden; display: flex; align-items: center; justify-content: center; position: relative; width: 100%; height: 600px; box-sizing: border-box;
        .sLeft { width: 0; }
        .sRight { width: 100%; height: 100%; }
    }
}
.list-move { transition: transform 0.5s; }

</style>
