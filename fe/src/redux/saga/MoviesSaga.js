import axios from 'axios'
import {call, fork, takeLatest,put,delay} from 'redux-saga/effects'
import { DOMAIN } from '../../utility/setting'
import { GET_DETAIL_MOVIES, GET_LIST_MOVIE, GET_MOVIES, GET_SAGA_DETAIL_MOVIE, HIDING, LOADING } from '../types/MovieType/MovieType'

function * getMovies(action){

    //load một cái hiệu ứng loading trước khi hiển thị dữ liệu
    try{
        // yield delay(3000);
        let result = yield call(()=>{
            return axios({
                method: 'get',
                headers: {     
                  'Accept': 'application/json',
                  'Content-Type': 'application/json;charset=UTF-8'},
                url: `${DOMAIN}/movies`,
              })
        })
        //dispatch len reudcer
        yield put({
            type:GET_MOVIES,
            data:result.data
        })
    
    }
    catch(e){
        console.log(e)
    }
    // console.log(1234)
}

function* getDetailMovie(action){
    let {id} = action;
    try{
        yield delay(200)
        let result = yield call(()=>{
            return axios({
                method: 'get',
                headers: {     
                  'Accept': 'application/json',
                  'Content-Type': 'application/json;charset=UTF-8'},
                url: `${DOMAIN}/movies/${id}`,
              })
        })
        //dispatch len reducer
        yield put({
            type:GET_DETAIL_MOVIES,
            data:result.data
        })
    }
    catch(e){
        console.log(e)
    }
}   

///theo doi action
export function* followgetMovies(){
    yield takeLatest(GET_LIST_MOVIE,getMovies)
}
export function* followgetDetailMovie(){
    yield takeLatest(GET_SAGA_DETAIL_MOVIE,getDetailMovie)
}
