import {createSlice} from '@reduxjs/toolkit'

const initialState = {
  current: 'geocoding',
  
}

export const playgroundSlice = createSlice({
  name: 'playground',
  initialState,
  reducers: {
    changeTopicPlayGround: (state, action) => {
      state.current = action.payload
    },
  },
})


export const { changeTopicPlayGround} = playgroundSlice.actions

export default playgroundSlice.reducer






