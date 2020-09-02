<template>
    <div id="home">
        <nav-bar class="home-nav">
            <div slot="center">购物街</div>
        </nav-bar>
        <tab-control :titles='["流行","新款","精选"]' @btnclick='tabClick' ref='tabControl1' class="tab-contorl"
            v-show='isTabFixed'></tab-control>

        <scroll class="content" ref='scroll' :probe-type='3' @scroll='contentScroll' :pull-up-load='true'
            @pullingUp='loadMore'>
            <home-swiper :banners='banners' @swiperImageLoad='swiperImageLoad'></home-swiper>
            <recommend-view :recommends='recommends'></recommend-view>
            <feature-view></feature-view>
            <tab-control :titles='["流行","新款","精选"]' @btnclick='tabClick' ref='tabControl2'></tab-control>
            <goods-list :goods="goods[currentType].list"></goods-list>
        </scroll>

        <back-top @click.native='backClick' v-show='isShowBackTop'></back-top>
    </div>
</template>

<script>
    import NavBar from 'components/common/navbar/NavBar'
    import TabControl from 'components/content/tabControl/TabControl'
    import GoodsList from 'components/content/goods/GoodsList'
    import Scroll from 'components/common/scroll/Scroll'
    import BackTop from 'components/content/backTop/BackTop'


    import HomeSwiper from './childComps/HomeSwiper'
    import RecommendView from './childComps/RecommendView'
    import FeatureView from './childComps/FeatureView'

    import { getHomeMultidata, getHomeGoods } from 'network/home'

    import { debounce } from 'common/utils.js'



    export default {
        name: 'Home',
        components: {
            NavBar,
            HomeSwiper,
            RecommendView,
            FeatureView,
            TabControl,
            GoodsList,
            Scroll,
            BackTop
        },
        data() {
            return {
                banners: [],
                recommends: [],
                goods: {
                    'pop': { page: 0, list: [] },
                    'new': { page: 0, list: [] },
                    'sell': { page: 0, list: [] },
                },
                currentType: 'pop',
                isShowBackTop: false,
                tabOffsetTop: 0,
                isTabFixed: false,
                saveY: 0
            }
        },
        activated() {
            this.$refs.scroll.scroll.scrollTo(0, this.saveY)
            this.$refs.scroll.scroll.refresh()
        },
        deactivated() {
            this.saveY = this.$refs.scroll.scroll.y
        },
        created() {
            this.getHomeMultidata()
            this.getHomeGoods('pop')
            this.getHomeGoods('new')
            this.getHomeGoods('sell')
        },
        mounted() {
            const refresh = debounce(this.$refs.scroll.refresh, 100)

            this.$bus.$on('itemImageLoad', () => {
                refresh()
                // console.log('--------');
            })
        },
        methods: {
            swiperImageLoad() {
                //所有的组件都有一个属性$el用于获取组建中的元素
                this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
            },

            loadMore() {
                this.getHomeGoods(this.currentType)
            },
            tabClick(index) {
                switch (index) {
                    case 0:
                        this.currentType = 'pop'
                        break
                    case 1:
                        this.currentType = 'new'
                        break
                    case 2:
                        this.currentType = 'sell'
                        break
                }
                this.$refs.tabControl1.currentIndex = index;
                this.$refs.tabControl2.currentIndex = index;
            },

            getHomeMultidata() {
                getHomeMultidata().then(res => {
                    this.banners = res.data.banner.list;
                    this.recommends = res.data.recommend.list
                })
            },
            getHomeGoods(type) {
                const page = this.goods[type].page + 1
                getHomeGoods(type, page).then(res => {
                    this.goods[type].list.push(...res.data.list)
                    this.goods[type].page += 1

                    this.$refs.scroll.finishPullUp()
                    // console.log(res);
                })
            },
            backClick() {
                this.$refs.scroll.scroll.scrollTo(0, 0, 500)
            },
            contentScroll(position) {
                this.isShowBackTop = (-position.y) > 1000
                this.isTabFixed = (-position.y) > this.tabOffsetTop
            },

        }
    }
</script>

<style scoped>
    .home-nav {
        background-color: var(--color-tint);
        color: #fff;
        /* position: fixed;
        left: 0;
        right: 0;
        top: 0;
        z-index: 9; */
    }

    #home {
        /* padding-top: 44px; */
        height: 100vh;
        position: relative;
    }



    .content {
        overflow: hidden;
        position: absolute;
        top: 44px;
        bottom: 49px;
        left: 0;
        right: 0;
    }

    .tab-contorl {
        position: relative;
        z-index: 9;
    }
</style>