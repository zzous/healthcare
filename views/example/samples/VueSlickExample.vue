<template>
    <div>
        <VueSlickCarousel v-bind="settings">
            <template v-for="(imageSrc, idx) in images">
                <img :src="imageSrc" alt="" :key="idx"/>
            </template>
        </VueSlickCarousel>
    </div>
</template>

<script>
export default {
    data() {
        return {
            images: [
                '/images/samples/moon_1920_1280.jpg',
                '/images/samples/moon_1920_1280.jpg',
                '/images/samples/moon_1920_1280.jpg'
            ],
            settings: {
                slidesToShow: 1,
                arrows: true,
                dots: true,
                autoplay: true,
                speed: 1000,
                pauseOnDotsHover: true,
                pauseOnFocus: true,
                pauseOnHover: true,
                infinite: true
            }
        };
    }
};
</script>
