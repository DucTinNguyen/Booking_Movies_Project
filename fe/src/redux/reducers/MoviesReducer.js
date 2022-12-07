import { GET_DETAIL_MOVIES, GET_MOVIES } from "../types/MovieType/MovieType"

const initialState = {
    listMovies:[],
    filmDetail:{},
    filmSearch:[]
}
export default (state=initialState,action) =>{
    switch(action.type){
        case GET_MOVIES:
            return {...state,listMovies:action.data}
        case GET_DETAIL_MOVIES:
            return {...state,filmDetail:action.data}
        case 'FIND_MOVIE':
            let filmSearchUpdate = [];
            if(action.data?.movieObj){
                filmSearchUpdate.push(action.data.movieObj)
            }
            state.filmSearch = filmSearchUpdate
            return {...state};
        default: return {...state}
    }
}