import Vue from 'vue'
import Vuex from 'vuex'
// import { reject, resolve } from 'core-js/fn/promise'
// import promise from 'core-js/fn/promise'

Vue.use(Vuex)

const store = new Vuex.Store({
    state:{
        cartList:[]
    },
    mutations:{
        addCounter(state,payload){
            payload.count++
        },
        addToCart(state,payload){
            state.cartList.push(payload)
        }           
    },
    actions:{
        addCart(context, payload) {

            return new Promise((resolve,reject)=>{
                let product = context.state.cartList.find(item => item.iid === payload.iid)
                if (product) {
                    // product.count += 1
                    context.commit('addCounter', product)
                    resolve('当前的商品数量+1')
                } else {
                    payload.count = 1
                    payload.checked = true
                    context.commit('addToCart', payload)
                    resolve('添加了新的商品')
                }
            })
        }
    }
})

export default store