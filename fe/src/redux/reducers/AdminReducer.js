import Movies from "../../pages/Admin/Movies";
import User from "../../pages/Admin/User";
import Showtimes from "../../pages/Admin/Showtime";

const initialState = {
    component:<Movies />,
    path:'/admin/movies'
}

export default (state = initialState,action)=>{
    switch(action.type){
        case 'Users':
            return {...state,component: <User/>,path:'/admin/users'}
        case 'Movies':
            return {...state,component: <Movies/>,path:'/admin/movies'}
        case 'Showtimes':
            return {...state,component: <Showtimes/>,path:'/admin/showtimes'}
        default: return {...state}
    }
}