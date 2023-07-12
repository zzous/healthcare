<template>
    <div>
        <DatePicker v-model="time" valueType="format" />
    </div>
</template>

<script>
export default {
    data() {
        return {
            time: null
        };
    }
};
</script>
