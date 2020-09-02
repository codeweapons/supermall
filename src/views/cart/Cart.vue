<template>
    <div class="cart">
        <nav-bar class="nav-bar">
            <div slot="center">购物车({{$store.state.cartList.length}})</div>
        </nav-bar>
        <cart-list></cart-list>
        <bottom-bar></bottom-bar>
    </div>
</template>

<script>
    import NavBar from 'components/common/navbar/NavBar'

    import CartList from './childComs/CartList'
    import BottomBar from './childComs/BottomBar'

    export default {
        name: 'Cart',
        components: {
            NavBar,
            CartList, BottomBar
        }

    }
</script>

<style scoped>
    .cart {
        height: 100vh;
    }

    .nav-bar {
        background-color: var(--color-tint);
        color: #fff;
    }
</style>