import { createSlice } from '@reduxjs/toolkit'

let user = createSlice({
    name : 'user',
    initialState : {name : 'kim',age : 20},
    reducers : {
      changeName(state){
        return 'park'
      },
      changeAge(state,action){
        state.age += action.payload;
      }
    }
  })

  export let {changeName,changeAge} = user.actions;

  export default user