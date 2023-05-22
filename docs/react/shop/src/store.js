import { configureStore,createSlice } from '@reduxjs/toolkit'
import user from './store/userSlice.js'
import data from './data.js'

let stok = createSlice({
  name : 'stok',
  initialState : [10,11,12]
})

let cart = createSlice({
  name : 'cart',
  initialState : [
    {id : 0, title : 'White and Black', count : 2},
    {id : 2, title : 'Grey Yordan', count : 1}
  ],
  reducers : {
    plusnum(state,y){
     state[y.payload].count += 1;
    },
    carts(state,zx){
      state = [...state,zx.payload]
      return state
    }
  }
})

export let { plusnum,carts } = cart.actions;

export default configureStore({
  reducer: { 
    user : user.reducer,
    stok : stok.reducer,
    cart : cart.reducer,
    data : data.reducer
  }
}) 