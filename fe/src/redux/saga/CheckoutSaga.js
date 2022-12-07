import axios from "axios";
import { call, fork, put, takeLatest } from "redux-saga/effects";
import { DOMAIN } from "../../utility/setting";
import { BOOKING_SAGA, CHECKOUT, GET_CHECKOUT } from "../types/CheckoutType/CheckoutType";

function * getInforCheckout(action){

    let {id,roomid} = action;

    try{
        let result = yield call(()=>{
            return axios({
                method: 'get',
                headers: {     
                  'Accept': 'application/json',
                  'Content-Type': 'application/json;charset=UTF-8'},
                url: `${DOMAIN}/add/${id}/${roomid}`,
              })
        })
        console.log(result.data)
        //dispatch len reducer
        yield put({
            type:CHECKOUT,
            data: result.data
        })
    }
    catch(e){
        console.log(e)
    }
}

function * booking(action) {

    let {data} = action
    try{
        let result = yield call(()=>{
            return  axios({
                method:'post',
                url: `${DOMAIN}/book`,
                data: data
            })
        })
    }
    catch(e){
        console.log(e)
    }
}

export function * followBooking(){
    yield takeLatest(BOOKING_SAGA,booking)
}

export function * followGetInforCheckout(){
    yield takeLatest(GET_CHECKOUT,getInforCheckout);
}