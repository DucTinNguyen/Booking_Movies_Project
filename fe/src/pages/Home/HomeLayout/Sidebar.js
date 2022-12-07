import { conforms } from 'lodash';
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import { useTransition, animated, to, useSpring } from 'react-spring'
export default function Sidebar(props) {
    const {status,setStatus} = props;
    const  propsStyle = useSpring({
        from: {x:0,opacity:1},
        to:{x:100,opacity:0},
        duration:4000
    })
    const user = JSON.parse(localStorage.getItem('user'))
  return (
    <div>
   <animated.nav style={ !status? {opacity:propsStyle.opacity,transform: propsStyle.x.to((x)=>`translateX(${x}%)`)} :{} } className={status ? `sidebar open` : `hide_bar`}>
      <div className={`menu__heading flex items-center justify-between py-8 px-6`}>
        <a>
          <img className=" w-1/2" src='image/logo.png' alt='logo' />
        </a>
        <i onClick={()=>{setStatus(0)}} className="text-white fa fa-times text-xl cursor-pointer px-4"></i>
      </div>
      
      <ul>
          <NavLink rel="noopener noreferrer" to="/home" activeClassName="text-amber-400"><li className="text-white p-4 border-y border-slate-800 cursor-pointer">Home</li></NavLink>
          <NavLink rel="noopener noreferrer" to="/blog" activeClassName="text-amber-400"><li className="text-white p-4 border-y border-slate-800 cursor-pointer">Blog</li></NavLink>
          <NavLink rel="noopener noreferrer" to="/contact" activeClassName="text-amber-400"><li className="text-white p-4 border-y border-slate-800 cursor-pointer">Contact</li></NavLink>
          {!user ? <>
          <NavLink rel="noopener noreferrer" to="/signup" activeClassName="text-amber-400"><li className="text-white p-4 border-y border-slate-800 cursor-pointer">Sign Up</li></NavLink>
          <NavLink rel="noopener noreferrer" to="/signin" activeClassName="text-amber-400"> <li className="text-white p-4 border-y border-slate-800 cursor-pointer">Sign In</li></NavLink></>
          : user.role === "user" ? <><NavLink rel="noopener noreferrer" to="/signin" activeClassName="text-amber-400"> <li className="text-white p-4 border-y border-slate-800 cursor-pointer">Profile</li></NavLink></> : <><NavLink rel="noopener noreferrer" to="/admin" activeClassName="text-amber-400"> <li className="text-white p-4 border-y border-slate-800 cursor-pointer">Admin</li></NavLink></>}
      </ul>
    </animated.nav>
    </div>
  )
}
