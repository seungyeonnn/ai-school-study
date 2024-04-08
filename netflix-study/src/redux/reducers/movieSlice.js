import { createSlice } from "@reduxjs/toolkit";

// 이 안에는 세 개의 값을 적게 되어 있음 
// 원랜 다 따로 적어야 했는데, 툴킷으로 객체안에 한번에 정의할 수 있게 바뀜
const movieSlice = createSlice({
    name:'movie',
    initialState:{
        popularMovies:[],
        topRatedMovies:[],
        upcomingMovies:[],
        genreList:[]
    },
    reducers:{
        initData:(state,action)=>{
            let {payload} = action;
            console.log('[movieSlice.js,payload]',payload)
            state.popularMovies = payload.popular.results
            console.log('state.popularMovies',state.popularMovies)
            state.topRatedMovies = payload.topRated.results
            state.upcomingMovies = payload.upcoming.results
            state.genreList = payload.genre.genres
        },
    }
})

export const MovieReducerActions = movieSlice.actions;
export default movieSlice.reducer