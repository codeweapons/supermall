<template>
    <!-- <swiper>
        <swiper-item v-for='item in banners' :key='item.id'>
            <a :href="item.link">
                <img :src="item.image" alt="" @load='imageLoad'>
            </a>
        </swiper-item>
    </swiper> -->
    <div>
        <van-swipe :autoplay="2000" class="my-swipe" :height='220'>
            <van-swipe-item v-for='(item,index) in banners' :key='index'>
                <img :src="item.image" alt="" style="height:220px" @load='imageLoad'>
            </van-swipe-item>
        </van-swipe>

    </div>
</template>

<script>
    // import { Swiper, SwiperItem } from 'components/common/swiper'
    import Vue from 'vue'
    import { Swipe, SwipeItem } from "vant";
    import 'vant/lib/index.css'

    export default {
        name: 'HomeSwiper',
        props: {
            banners: {
                type: Array,
                default() {
                    return []
                }
            }
        },
        data() {
            return {
                isLoad: false
            }
        },
        components: {
            // Swiper,
            // SwiperItem
            [Swipe.name]: Swipe,
            [SwipeItem.name]: SwipeItem,
        },
        methods: {
            imageLoad() {
                if (!this.isLoad) {
                    this.$emit('swiperImageLoad')
                    this.isLoad = true
                }
            }
        }

    }
</script>

<style>

</style>