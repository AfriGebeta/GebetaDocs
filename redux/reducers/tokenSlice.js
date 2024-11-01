import {createSlice} from '@reduxjs/toolkit'

const initialState = {
   token : 'youapitoken',
  
}

export const tokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    changeToken: (state, action) => {
    
        state.token = action.payload
    },
  },
})


export const { changeToken} = tokenSlice.actions

export default tokenSlice.reducer