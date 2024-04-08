import { createSlice } from '@reduxjs/toolkit'

export const movieSlice = createSlice({
  name: 'movie',
  initialState: {
    popularMovies: [],
    topRatedMovies: [],
    upcomingMovies: [],
    genreList : [],
    searchList : [],
    detailData : {}
  },
  reducers: {
    initData : (state,action) =>{
      state.popularMovies = action.payload.popular
      state.topRatedMovies = action.payload.topRated
      state.upcomingMovies = action.payload.upcoming
      state.genreList = action.payload.genres
    },
    searchData : (state, action)=>{
      state.searchList = action.payload
    },
    detailData : (state, action)=>{
      state.detailData = action.payload
    }
  },
  
})

export const movieReducerActions = movieSlice.actions
export default movieSlice.reducer
