import React, { useState } from 'react'
import Footer from '../../components/Footer/Footer'
import Header from '../../components/Header/Header'
import { Tabs } from 'antd';
import { Rate } from 'antd';
import { useEffect } from 'react';
import axios from 'axios'

import { Fragment } from 'react';
import PopupVideo from './PopupVideo';
import { useDispatch, useSelector } from 'react-redux';
import { GET_SAGA_DETAIL_MOVIE } from '../../redux/types/MovieType/MovieType';
import { history } from '../../App';
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import './Detail.css'
import _ from 'lodash';
import moment from 'moment/moment';


const cinemaStyle = {
  width: 45,
  height: 45,
  margin: '0 auto',
  border: 'solid 1px #bdbdbd'
}
const cinemaActive = {
  width: 45,
  height: 45,
  margin: '0 auto',
  border: 'solid 1px #D82D8B'
}
export default function Detail(props) {
  const introduceStyle = {
    backgroundRepeat: "no-repeat",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }

  //useState movie
  // const [movie,setMovie] = useState({});
  // const [cinestar,setCinestar] = useState([]);

  const [open, setOpen] = useState(false);

  let { filmDetail } = useSelector(state => state.MoviesReducer);
  // console.log(filmDetail)
  const list_cinestar = _.uniqBy(filmDetail.cinestar, 'name')
  const [showtime, setShowtime] = useState(!list_cinestar ? list_cinestar[0].id : 1);
  const dispatch = useDispatch();

  //scroll to top when redirect to

  useEffect(() => {

    // window.scrollTo(0, 0);

    //dispatch len saga

    dispatch({
      type: GET_SAGA_DETAIL_MOVIE,
      id: props.match.params.id
    })
  }, [])


  return (
    <div>

      {/* Header */}
      <Header />
      {/* Introducetion */}
      <section className={`introduction container sm:max-w-full py-32`} style={{ ...introduceStyle }}>
        <div className='grid grid-cols-8'>
          <div className={`lg:col-span-2 md:col-span-3 sm:col-span-8 introduce__left`}>
            <div className={`relative rounded-xl overflow-hidden movie__image`}>
              <img className='w-full sm:max-w-full ' src={filmDetail.image} alt='phim' />
              <div className={`movie__image--active`}>
                <div>
                  <button onClick={() => { setOpen(true) }} className='block w-full text-center bg-red-500 text-white rounded py-3 hover:bg-green-600 transition-all duration-700'>Trailer</button>
                  <Rate disabled value={filmDetail.rate * 5 / 10} />
                  <PopupVideo url={filmDetail.trailer} open={open} setOpen={setOpen} />
                </div>
              </div>
            </div>
          </div>
          <div className={`lg:col-span-6 md:col-span-5 sm:col-span-8 text-white lg:w-4/5 sm:w-full px-6 introduce__right`}>
            <h3 style={{ fontSize: '26px', color: '#e4d804', fontWeight: 'bold' }}>New Episodes</h3>
            <h2 className={`text-7xl lg:text-6xl md:text-5xl sm:text-3xl lg:w-full sm:w-full md:w-full text-white bold introduction__tittle`}>{filmDetail.name}</h2>
            <div className={`text-white font-bold flex items-center lg:w-4/5 md:w-full sm:w-full justify-between introduction__infor`}>
              <span className="bg-white text-black font-bold text-xs" style={{ padding: '7px 10px' }}>PG 18</span>
              <span className=" text-white border-2 border-white font-bold text-xs" style={{ padding: '5px 10px' }}>HD</span>
              <span>Action,Comedy</span>
              <p className="flex items-center m-0"> <i className="fa fa-calendar-alt mr-2 text-yellow-400"></i> <span>{filmDetail.year}</span></p>
              <p className="flex items-center m-0"> <i className="fa fa-clock mr-2 text-yellow-400"></i> <span>{filmDetail.time} min</span></p>
            </div>
            <p style={{ fontSize: 14, fontWeight: 500, color: '#bcbcbc', marginTop: 15 }}>{filmDetail.description}</p>
          </div>
        </div>
      </section>
      {/* Showtimes */}
      <section className={`container sm:max-w-full showtimes`}>
        <h2 className="text-xl bold">Showtimes</h2>
        <div>
          <section className=" m-auto lg:w-3/4 sm:w-full" style={{ border: '1px solid #bdbdbd' }}>
            <div className={`cinestars`}>
              <Swiper
                spaceBetween={0}
                slidesPerView={5}
                className="cinestar-header"
              >
                {filmDetail.cinestar?.map((item, index) => {
                  return <SwiperSlide key={index} onClick={() => { setShowtime(item.id) }}>
                    <div className="cursor-pointer">
                      <img className="rounded" style={item.id === showtime ? cinemaActive : cinemaStyle} src={item.logo} />
                      <span>{item.name}</span>
                    </div>
                  </SwiperSlide>
                })}
              </Swiper>
            </div>
            <div className={`cinema`}>
              {filmDetail.cinemas?.filter(cinema => showtime === cinema.cinestar).map((cinema, index) => {
                return <div key={index} className="grid grid-cols-10 py-3 px-3" style={{borderBottom: '1px solid #ececec'}}>
                  <div className="col-span-7 flex items-center ">
                    <img style={{ ...cinemaStyle, margin: 0 }} src={list_cinestar[showtime - 1].logo} alt={cinema.name} />
                    <div className='ml-2'>
                      <p className="mb-0">{cinema.name}</p>
                      <p className="mb-0">{cinema.address}</p>
                    </div>
                  </div>
                  <div className="col-span-3 flex items-center justify-center">
                    <ul className="mb-0">
                      {filmDetail.calendar?.filter(item => cinema.id === item.cinema).map((calendar,index) => {
                        return <li onClick={()=>{
                          history.push(`/checkout/${calendar.id}/${calendar.room}`)
                        }} className="text-blue-500 rounded border border-blue-500 cursor-pointer px-3 py-1 mt-1 sm:text-sm lg:text-base" key={index}>{moment(calendar.showtime).format('dddd ,h:mm a ')}</li>
                      })}
                   </ul>
                  </div>
                  
                </div>
              })}
            </div>
          </section>
        </div>
      </section>
      <Footer />
    </div>


  )
}
