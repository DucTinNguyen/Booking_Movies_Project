import { USER } from "../types/UserType/userType"

const initialState = {
    message: '',
    users:[]
}
export default (state=initialState,action)=>{

    switch(action.type){
        case 'ERR':
            return {...state,message: action.data}
        case USER:
            return {...state,users:action.data}
        default: return {...state}
    }
}