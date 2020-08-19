import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state:{
        cartList:[]
    },
    mutations:{
        addCart(state,payload){
            let product = state.cartList.find(item=>item.iid===payload.iid)
            if(product){
                product.count+=1
            }else{
                payload.count = 1
                payload.checked = true
                state.cartList.push(payload)
            }
        }
    }
})

export default store