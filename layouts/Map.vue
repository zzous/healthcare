<template>

    <div id="wrap allmap">
        <Header />
        <div id="container">
            <router-view  class="maplayout" />
        </div>
    </div>
</template>


<script>
import Header from '@/components/layouts/Header.vue';
import Footer from '@/components/layouts/Footer.vue';

export default {
    components: {
        Header,
        Footer
    },
    data() {
        return {
            
        };
    }
};
</script>