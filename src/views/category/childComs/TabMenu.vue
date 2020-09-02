<template>
    <van-sidebar v-model="activeKey">
        <van-sidebar-item v-for='(item,index) in categories' :key="index" :title="item.title"
            @click="itemClick(index)" />

    </van-sidebar>
</template>


<script>
    import Vue from 'vue';
    import { Sidebar, SidebarItem } from 'vant';
    import 'vant/lib/index.css'

    export default {
        name: 'TabMenu',
        data() {
            return {
                activeKey: 0,
                currentIndex: 0
            }
        },
        props: {
            categories: Array
        },
        components: {
            [Sidebar.name]: Sidebar,
            [SidebarItem.name]: SidebarItem

        },
        methods: {
            itemClick(index) {
                this.currentIndex = index
                this.$emit('selectItem', index)
            }
        },

    }
</script>

<style scoped>
</style>