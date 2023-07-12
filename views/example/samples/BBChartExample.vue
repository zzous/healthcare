<template>
    <div id="bbChart"></div>
</template>

<script>
import 'billboard.js/dist/billboard.css';
import {
    bb,
    area,
    areaSpline
} from 'billboard.js';

export default {
    mounted() {
        /**
         * * example: https://naver.github.io/billboard.js/demo/
         * * API: https://naver.github.io/billboard.js/release/latest/doc/
         */
        bb.generate({
            data: {
                columns: [
                    ['data1', 300, 350, 300, 0, 0, 0],
                    ['data2', 130, 100, 140, 200, 150, 50]
                ],
                types: {
                    data1: area(), // for ESM specify as: area()
                    data2: areaSpline() // for ESM specify as: areaSpline()
                }
            },
            bindto: '#bbChart'
        });
    }
};
</script>
