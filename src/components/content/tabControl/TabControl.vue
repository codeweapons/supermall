<template>
    <div class="tab-control">
        <div :key='item.index' v-for='(item,index) in titles' class="tab-control-item"
            :class='{active:index===currentIndex}' @click='btnclick(index)'>
            <span>{{item}}</span>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'TabControl',
        props: {
            titles: {
                tyle: Array,
                default() {
                    return []
                }
            }
        },
        data() {
            return {
                currentIndex: 0
            }
        },
        methods: {
            btnclick(index) {
                this.currentIndex = index;
                this.$emit('btnclick', index)
            }
        }
    }
</script>

<style scoped>
    .tab-control {
        display: flex;
        text-align: center;
        line-height: 40px;
        height: 40px;
        font-size: 15px;
        background-color: #fff;
    }

    .tab-control-item {
        flex: 1;
    }

    .active {
        color: var(--color-high-text);

    }

    .active span {
        border-bottom: 3px solid var(--color-tint);
    }

    .tab-control-item span {
        padding: 5px;
    }
</style>