import axios from 'axios'
import { call,put,takeLatest } from 'redux-saga/effects'
import { history } from '../../App';
import { DOMAIN } from '../../utility/setting';
import { GET_USER, SIGNIN_SAGA, SIGNUP_SAGA, SIGN_IN, USER } from '../types/UserType/userType'



function * signUp(action) {
    let {user} = action;
    console.log(user);
    try{
        yield call(()=>{
            axios({
                method: 'POST',
                url:`${DOMAIN}/user`,
                data:user
            })
        })
    }
    catch(e){
        console.log(e)
    }
}
function * signIn(action){
    let {user} = action;
    try{
        let result = yield call(()=>{
            return axios({
                method: 'POST',
                url: `${DOMAIN}/session`,
                data:user
            })
        })
        
        if(result.data.user){
            localStorage.setItem('user',JSON.stringify(result.data.user))
            history.push('/home')
        }
        else{
            yield put({
                type:'ERR',
                data:result.data.message,
            })
        }

    }catch(e){console.log(e.err)}
}
function * getUsers() {
    try{
        let result = yield call(()=>{
            return axios({
                method: 'GET',
                url:`${DOMAIN}/user`
            })
        })
        // console.log(result.data)
        yield put({
            type:USER,
            data:result.data
        })
    }
    catch(e){console.log(e.err)}
}
export function * followSignupAction(){
    yield takeLatest(SIGNUP_SAGA,signUp)
}
export function * followSigninAction(){
    yield takeLatest(SIGNIN_SAGA,signIn)
}
export function * followGetUser(){
    yield takeLatest(GET_USER,getUsers)
}