<template>
    <div>
        <van-grid>
            <van-grid-item v-for='(item,index) in categoryData'>
                <img :src="item.image" alt="" class='item-img'>
                <div class='item-text'>{{item.title}}</div>
            </van-grid-item>>
        </van-grid>
    </div>
</template>


<script>
    import Vue from 'vue';
    import { Grid, GridItem } from 'vant';

    export default {
        name: 'TabContentCategory',
        components: {
            [Grid.name]: Grid,
            [GridItem.name]: GridItem
        },
        props: {
            categoryData: Array
        }
    }
</script>

<style scoped>
    .panel img {
        width: 100%;
    }

    .item {
        text-align: center;
    }

    .item-img {
        width: 80%;
    }

    .item-text {
        margin-top: 15px;
        font-size: 12px;

    }
</style>