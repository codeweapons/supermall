<template>
    <div id='detail'>
        <detail-nav-bar class="detail-nav-bar" @titleClick='titleClick' ref="nav"></detail-nav-bar>
        <scroll class="content" ref="scroll" @scroll='contentScroll' :probe-type='3'>

            <detail-swiper :topImage='topImage'></detail-swiper>
            <detail-base-info :goods='goods'></detail-base-info>
            <detail-shop-info :shop='shop'></detail-shop-info>
            <detail-goods-info :detail-info='detailInfo' @imageLoad='imageLoad'></detail-goods-info>
            <detail-param-info ref='params' :param-info='paramInfo'></detail-param-info>
            <detail-comment-info ref="comment" :comment-info='commentInfo'></detail-comment-info>
            <goods-list :goods='recommends' ref="recommend"></goods-list>
        </scroll>
        <detail-bottom-bar @addCart='addToCart'></detail-bottom-bar>
    </div>
</template>

<script>
    import DetailNavBar from './childComs/DetailNavBar'
    import DetailSwiper from './childComs/DetailSwiper'
    import DetailBaseInfo from './childComs/DetailBaseInfo'
    import DetailShopInfo from './childComs/DetailShopInfo'
    import DetailGoodsInfo from './childComs/DetailGoodsInfo'
    import DetailParamInfo from './childComs/DetailParamInfo'
    import DetailCommentInfo from './childComs/DetailCommentInfo'
    import DetailBottomBar from './childComs/DetailBottomBar'

    import Scroll from 'components/common/scroll/Scroll'
    import GoodsList from 'components/content/goods/GoodsList'

    import { getDetail, Goods, Shop, GoodsParam, getRecommend } from 'network/detail.js'
    import { debounce } from 'common/utils.js'
    import { Dialog } from 'vant';


    export default {
        name: 'Detail',
        data() {
            return {
                iid: null,
                topImage: [],
                goods: {},
                shop: {},
                detailInfo: {},
                paramInfo: {},
                commentInfo: {},
                recommends: [],
                themeTopYs: [],
                getThemeTopY: null,
                currentIndex: 0
            }
        },
        components: {
            DetailNavBar,
            DetailSwiper,
            DetailBaseInfo,
            DetailShopInfo,
            Scroll,
            DetailGoodsInfo,
            DetailParamInfo,
            DetailCommentInfo,
            GoodsList,
            DetailBottomBar
        },
        created() {
            //1.保存传入的iid
            this.iid = this.$route.params.iid;
            //2.根据iid请求详情数据
            getDetail(this.iid).then(res => {
                //获取顶部的图片轮播数据
                const data = res.result
                this.topImage = res.result.itemInfo.topImages
                //获取商品信息
                this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
                //获取商家信息
                this.shop = new Shop(data.shopInfo)
                //商品详情数据
                this.detailInfo = data.detailInfo
                //获取参数信息
                this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
                //获取评论信息
                if (data.rate.cRate !== 0) {
                    this.commentInfo = data.rate.list[0]
                }
            })
            //请求推荐数据
            getRecommend().then(res => {
                this.recommends = res.data.list
                // console.log(res);
            });
            this.getThemeTopY = debounce(() => {
                this.themeTopYs = []
                this.themeTopYs.push(0)
                this.themeTopYs.push(this.$refs.params.$el.offsetTop)
                this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
                this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
                this.themeTopYs.push(Number.MAX_VALUE)


            }, 100)
        },
        methods: {
            imageLoad() {
                this.$refs.scroll.scroll.refresh();
                this.getThemeTopY();
                // console.log(this.themeTopYs)
            },
            titleClick(index) {
                this.$refs.scroll.scroll.scrollTo(0, -this.themeTopYs[index], 200)
            },
            contentScroll(position) {
                const positionY = -position.y;
                // console.log(positionY);
                let length = this.themeTopYs.length
                for (let i = 0; i < length - 1; i++) {

                    if (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i + 1]) {
                        this.currentIndex = i;
                        this.$refs.nav.currentIndex = this.currentIndex


                    }
                    // this.currentIndex = i;

                    // console.log(this.currentIndex);
                    // if ((i < length - 1 && positionY > this.themeTopYs[i] && positionY < this.themeTopYs[i + 1] || (i === length - 1 && positionY > this.themeTopYs[i]))) {
                    //     console.log(i);
                    // }
                }

            },
            addToCart() {
                const product = {}
                product.image = this.topImage[0];
                product.title = this.goods.title;
                product.desc = this.goods.desc;
                product.price = this.goods.realPrice;
                product.iid = this.iid;

                this.$store.dispatch('addCart', product).then(res=>{
                Dialog({ message: '加入购物车成功' })
                })
                
                // console.log(this.$store.state.cartList);
            }


        }
    }

</script>

<style scoped>
    #detail {
        position: relative;
        z-index: 11;
        background-color: #fff;
        height: 100vh;
    }

    .content {
        height: calc(100% - 44px - 49px);
    }

    .detail-nav-bar {
        position: relative;
        z-index: 1;
        background-color: #fff;
    }
</style>