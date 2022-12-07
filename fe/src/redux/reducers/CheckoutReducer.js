import { BOOKED, CHECKOUT } from "../types/CheckoutType/CheckoutType"

const initialState = {
    checkout:{},
    listBooking:[]
}

const CheckoutReducer = (state = initialState,action) =>{
    switch(action.type){
        case CHECKOUT:{
            return {...state,checkout:action.data}
        }
        case BOOKED:
            let listBookingUpdate = [...state.listBooking];
            let index = listBookingUpdate.findIndex(item => item.id ===action.data.id);
            if(index !== -1){
                listBookingUpdate.splice(index, 1);
            }
            else{
                listBookingUpdate.push(action.data)
            }
            return {...state,listBooking:listBookingUpdate}
        case 'CLEAR':
            let listBookingUpdateNew = [...state.listBooking];
            listBookingUpdateNew.splice(0,listBookingUpdateNew.length)
            return {...state,listBooking:listBookingUpdateNew}
        default: return {...state}
    }
}
export default CheckoutReducer