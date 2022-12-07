import { all } from "redux-saga/effects"
import * as MoviesSagas from './MoviesSaga'
import * as CheckoutSaga from './CheckoutSaga'
import * as UserSaga from './UserSaga'
export function * rootSaga(){
    // console.log('rootSaga')
    // theo doi cac nghiep vu cua saga con
    yield all ([
        MoviesSagas.followgetMovies(),
        MoviesSagas.followgetDetailMovie(),


        //Checkout
        CheckoutSaga.followGetInforCheckout(),
        CheckoutSaga.followBooking(),
        //User
        UserSaga.followSignupAction(),
        UserSaga.followSigninAction(),
        UserSaga.followGetUser()
    ])
}