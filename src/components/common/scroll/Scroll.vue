<template>
    <div class="wrapper" ref='wrapper'>
        <div class="content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    import BScroll from 'better-scroll'

    export default {
        name: 'Scroll',
        data() {
            return {
                scroll: null,

            }
        },
        props: {
            probeType: {
                type: Number,
                default: 0
            },
            pullUpLoad: {
                type: Boolean,
                default: false
            }

        },
        mounted() {
            this.scroll = new BScroll(this.$refs.wrapper, {
                probeType: this.probeType,
                click: true,
                pullUpLoad: this.pullUpLoad
            })
            this.scroll.on('scroll', position => {
                this.$emit('scroll', position)
            })
            this.scroll.on('pullingUp', () => {
                this.$emit('pullingUp')
            })


        },
        methods: {
            finishPullUp() {
                this.scroll && this.scroll.finishPullUp()
            },
            refresh() {
                // console.log('------------');
                this.scroll && this.scroll.refresh()
            }
        }
    }
</script>

<style scoped>

</style>