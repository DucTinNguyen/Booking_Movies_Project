import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Header from '../../components/Header/Header';
import _ from 'lodash';
import { CalendarOutlined, ClockCircleOutlined } from '@ant-design/icons';
import axios from 'axios'
import './Home.css'
import Footer from '../../components/Footer/Footer';
import { getListMoviesAction } from '../../redux/actions/MoviesAction/MovieAction';
import { GET_LIST_MOVIE, GET_MOVIES } from '../../redux/types/MovieType/MovieType';
import Upcoming from './HomeLayout/Upcoming';
import TopRated from './HomeLayout/TopRated';

import { useSpring, animated } from 'react-spring'
import Sidebar from './HomeLayout/Sidebar';

const introduceStyle = {
  height: "800px",
  backgroundRepeat: "no-repeat",
  backgroundSize: 'cover',
  backgroundPosition: 'center',
}

export default function Home(props) {
  const {listMovies} = useSelector(state => state.MoviesReducer)
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({type:GET_LIST_MOVIE})
  },[])

  //filter
  const list_Upcoming = listMovies.filter(item => item.rate ===0)
  const list_Rate = listMovies.filter(item => item.rate !==0)
  return (
    <div className="relative">
      <Header />
      {/* INTRODUCTION */}
      <section className="flex items-center" style={{ ...introduceStyle, backgroundImage: 'url(/image/banner_bg01.jpg)' }}>
        <div className="container lg:max-w-full md:max-w-full sm:max-w-full">
          <h3 className="text-2xl font-bold " style={{ color: '#e4d804' }}>Movflx</h3>
          <h2 className={`text-7xl lg:text-6xl md:text-5xl sm:text-3xl lg:w-6/12 sm:w-full md:w-full text-white bold introduction__tittle`}>Unlimited Movie, TVs Shows, & More.</h2>
          <div className={`text-white font-bold flex items-center xl:w-2/5 lg:w-6/12 md:w-6/12 sm:w-9/12 justify-between introduction__infor`}>
            <span className="bg-white text-black font-bold text-xs" style={{ padding: '7px 10px' }}>PG 18</span>
            <span className=" text-white border-2 border-white font-bold text-xs" style={{ padding: '5px 10px' }}>HD</span>
            <span>Action,Comedy</span>
            <p className="flex items-center m-0"> <i className="fa fa-calendar-alt mr-2 text-yellow-400"></i> <span>2021</span></p>
            <p className="flex items-center m-0"> <i className="fa fa-clock mr-2 text-yellow-400"></i> <span>121 min</span></p>
          </div>
        </div>
      </section>
      {/* UPCOMING FILM */}
      <Upcoming list_Upcoming={list_Upcoming} />
      {/* TOP RATED */}
      <TopRated list_Rate={list_Rate} />
      {/* FOOTER  */}
      <Footer />


    </div>
  )
}
