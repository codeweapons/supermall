<template>
    <div class="category">
        <nav-bar class="nav-bar">
            <div slot="center">分类</div>
        </nav-bar>
        <div class="content">
            <tab-menu :categories='categories' @selectItem='selectItem'></tab-menu>
            <div class="gird-view">
                <tab-content-category :categoryData="categoryData"></tab-content-category>
            </div>
        </div>
    </div>
</template>


<script>
    import NavBar from 'components/common/navbar/NavBar'
    import Scroll from 'components/common/scroll/Scroll'

    import TabMenu from './childComs/TabMenu'
    import TabContentCategory from './childComs/TabContentCategory'


    import { getCategory, getCategoryDetail, getSubcategory } from 'network/category.js'

    export default {
        name: 'Category',
        data() {
            return {
                categories: [],
                currentIndex: -1,
                categoryData: [],
            }
        },
        components: {
            NavBar,
            TabMenu,
            TabContentCategory,
            Scroll

        },
        created() {
            this._getCategory()
        },
        computed: {
            showSubcategory() {
                if (this.currentIndex === -1) return {}
                return this.categoryData[this.currentIndex].subcategories

            },
        },
        methods: {
            _getCategory() {
                getCategory().then(res => {
                    this.categories = res.data.category.list
                    // for (let i = 0; i < this.categories.length; i++) {
                    //     this.categoryData[i] = {
                    //         subcategories: [],
                    //     }
                    // }


                    this._getSubcategories(0)
                })
            },
            _getSubcategories(index) {
                this.currentIndex = index;
                const mailKey = this.categories[index].maitKey;
                getSubcategory(mailKey).then(res => {
                    // this.categoryData.push(...res.data.list)
                    this.categoryData = res.data.list
                    // this.categoryData[index].subcategories.push(...res.data.list)
                    // this.categoryData = { ...this.categoryData }

                })

            },
            selectItem(index) {
                this._getSubcategories(index)

            }
        },

    }
</script>

<style scoped>
    .nav-bar {
        background-color: var(--color-tint);
        font-weight: 700;
        color: #fff;
        /* position: fixed; */
    }

    .content {
        display: flex;
    }

    .gird-view {
        width: 80%;
    }
</style>