<template>
    <div>
        <div>
            <a href="https://github.com/NightCatSama/vue-slider-component" target="_blank">Document</a>
        </div>
        <div style="padding: 20px;">
            <RangeSlider v-model="value" />
            <p>
                value : {{ value }}
            </p>
        </div>
    </div>
</template>

<script>
import 'vue-slider-component/theme/antd.css';

export default {
    data() {
        return {
            value: 0
        };
    }
};
</script>
