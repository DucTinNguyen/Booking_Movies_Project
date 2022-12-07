import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Header from '../../components/Header/Header'
import { BOOKED, GET_CHECKOUT, BOOKING_SAGA } from '../../redux/types/CheckoutType/CheckoutType'
import { DOMAIN } from '../../utility/setting'
import _ from 'lodash'
import { history } from '../../App';
import './Checkout.css'

export default function Checkout(props) {

    const { checkout } = useSelector(state => state.CheckoutReducer)
    const { listBooking } = useSelector(state => state.CheckoutReducer)
    // console.log(checkout)

    const movieInformation = checkout.calendar?.movies;
    const cinemaInfor = checkout.calendar?.cinema;
    const listChair = checkout.chairs?.chair

    // console.log(movieInformation)
    // console.log(cinemaInfor)
    // console.log(listChair)

    // const {movies,chairs,cinema} = checkout;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({
            type: GET_CHECKOUT,
            id: props.match.params.id,
            roomid: props.match.params.roomid
        })
        ///dispatch clear list booking reducer
        dispatch({
            type: 'CLEAR'
        })
    }, [])

    //booking function

    const booking = () => {
        // if(!_.isEmpty(user)){
        //     dispatch({
        //         type:BOOKING_SAGA,
        //         data:listBooking
        //     })
        //     window.location.reload(false)
        // }
        // else{
        //     history.push('/signin')
        // }
        if (localStorage.getItem('user')) {
            dispatch({
                type: BOOKING_SAGA,
                data: listBooking
            })
            window.location.reload(false)
        }
        else {
            history.push('/signin')
        }

    }











    //render chairs
    const renderChairs = () => {
        return listChair?.map((chair, index) => {

            let classBooking = '';

            let indexObj = listBooking.findIndex(item => item.id === chair.id);
            if (indexObj !== -1) {
                classBooking = 'booking'
            }
            return <span onClick={() => {
                dispatch({
                    type: BOOKED,
                    data: chair
                })
            }} key={index} className={`chair ${classBooking} text-center ${chair.status ? 'booked' : ''}`}>{chair.name}</span>
        })
    }
    return (
        <div>
            {/* <Header /> */}
            <section style={{ backgroundColor: 'rgba(0,0,0,0.2)' }} className="container sm:max-w-full py-16">
                <div className={`booking__header text-center `}>
                    <img style={{ width: 100, margin: '0 auto' }} src="/image/tickets.png" alt="logo" />
                    <h3 className={`booking__heading`}>BOOK A TICKET</h3>
                    <p className={`booking__title`}>and have a fun movie time</p>
                </div>
                {/* sub */}
                <nav className="container sm:max-w-full grid justify-items-center pt-10">
                    <ul className="grid grid-cols-3 gap-x-4">
                        <li className="flex items-center" style={{ color: '#4c4145' }}>
                            <span className={`chair mr-3`}></span>
                            Available
                        </li>
                        <li className="flex items-center" style={{ color: '#4c4145' }}>
                            <span className={`chair booking mr-3`}></span>
                            Booking
                        </li>
                        <li className="flex items-center" style={{ color: '#4c4145' }}>
                            <span className={`chair booked mr-3`}></span>
                            Booked
                        </li>
                    </ul>
                </nav>
                {/*  main booking */}
                <div className={`booking__body pt-5 relative container sm:max-w-full grid grid-cols-12 mt-20`}>
                    <div className={`lg:col-span-8 sm:col-span-12 booking__chairs`}>
                        {/* hiển thị danh sách các ghê */}
                        <div className={`grid lg:grid-cols-10 justify-items-center sm:grid-cols-10 gap-4 booking__body--chairs`}>
                            {renderChairs()}
                        </div>
                    </div>
                    <div className={`lg:col-span-4 sm:col-span-12 sm:w-full bg-white p-5 relative sm:mt-10 lg:mt-0 booking_infor`}>
                        <h2 className='text-2xl text-center text-red-500'>The Information Ticket</h2>
                        {/* hiển thị danh sách ghế đã đặt */}
                        <p className="grid grid-cols-2">
                            <span style={{ color: '#E15252' }}>Movie:</span>
                            <span style={{ color: '#D92828', fontWeight: '500', textAlign: 'right' }}>{movieInformation?.name}</span>
                        </p>
                        <p className="grid grid-cols-2">
                            <span style={{ color: '#E15252' }}>Cinema:</span>
                            <span style={{ color: '#D92828', fontWeight: '500', textAlign: 'right' }}>{cinemaInfor?.name}</span>
                        </p>
                        <p className="grid grid-cols-2">
                            <span style={{ color: '#E15252' }}>Room:</span>
                            <span style={{ color: '#D92828', fontWeight: '500', textAlign: 'right' }}>Room {checkout.calendar?.room}</span>
                        </p>
                        <p className="grid grid-cols-2">
                            <span style={{ color: '#E15252' }}>Address:</span>
                            <span style={{ color: '#D92828', fontWeight: '500', textAlign: 'right' }}>{cinemaInfor?.address}</span>
                        </p>
                        <p className="grid grid-cols-2 ">
                            <span style={{ color: '#E15252' }}>Chairs:</span>
                            <span style={{ color: '#D92828', fontWeight: '500', textAlign: 'right' }}>
                                {listBooking.map((item, index) => {
                                    return <span key={index}>{item.name}-</span>
                                })}
                            </span>
                        </p>
                        <p className="grid grid-cols-2 mb-12">
                            <span style={{ color: '#E15252' }}>Total:</span>
                            <span style={{ color: '#D92828', fontWeight: '500', textAlign: 'right' }}>{listBooking?.reduce((sum, chair, index) => {
                                return sum += parseFloat(chair.price);
                            }, 0).toLocaleString()}đ</span>
                        </p>
                        <div className="absolute bottom-0 right-0 left-0 grid grid-cols-2">
                            <button
                                onClick={() => { booking() }}
                                className="bg-green-700 py-2 rounded text-white hover:bg-slate-700 transition-all">BOOK TICKET</button>
                            <button className="bg-yellow-700 py-2 rounded text-black" onClick={() => {
                                dispatch({
                                    type: "CLEAR"
                                })
                            }}>CLEAR ALL</button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
