import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Sidebar from '../../pages/Home/HomeLayout/Sidebar';
import {history} from '../../App';
import './Header.css'
export default function Header(props) {
  const [style, setStyle] = useState({
    backgroundColor: 'transperant',
  })

  //state status click icon bar
  //
  const user = JSON.parse(localStorage.getItem('user'))

  const [status,setStatus] = useState(0);
  useEffect(() => {
    const handleScroll = event => {

      if (window.scrollY >= 260) {
        setStyle({
          backgroundColor: '#171D22',
          WebkitTransition: 'all 1s ease-in-out'
        })
      }
      if (window.scrollY < 260) {
        setStyle({
          backgroundColor: 'transparent',
          WebkitTransition: 'all 1s ease-in-out'
        })
      }
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [])
  const handelLogout = () => {
    localStorage.clear();
    window.location.reload(false);
  }
  return (
    <div>
      <header style={style} className="py-5 text-white fixed w-full z-30 container sm:max-w-full">
        <div className="flex justify-between items-center h-16 mx-auto">
          <NavLink rel="noopener noreferrer" to="/" aria-label="Back to homepage" className="flex items-center p-2">
            <img className="w-40" src="/image/logo.png" alt="logo" />
          </NavLink>
          <ul className="items-stretch hidden space-x-3 lg:flex">
            <li className="flex">
              <NavLink to="/home" className="flex items-center px-4 font-semibold -mb-1 text-white" activeClassName="text-amber-400">HOME</NavLink>
            </li>
            <li className="flex">
              <NavLink rel="noopener noreferrer" to="/blog" className="flex items-center px-4 font-semibold -mb-1 text-white" activeClassName="text-amber-400">BLOG</NavLink>
            </li>
            <li className="flex">
              <NavLink rel="noopener noreferrer" to="/contact" className="flex items-center px-4 font-semibold -mb-1 text-white" activeClassName="text-amber-400">CONTACT</NavLink>
            </li>
          </ul>
          {user ? <div className={`flex items-center sm:hidden lg:flex relative cursor-pointer user`}>
            <img style={{width:30,height:30}} src={`https://ui-avatars.com/api/?name=${user.name}`}/>
            <span>{user.name}</span>
            {/* sub menu */}
            <ul className={`absolute bg-white py-5 sub_user`}>
              {/* <li className='text-black text-sm transition-all duration-200 hover:bg-slate-200 cursor-pointer'><i className="fa fa-user-circle mr-1" style={{color: '#bdbdbd'}}></i>Profile</li> */}
              {user.role === 'admin' ? <li onClick={() =>{history.push('/admin')}} className='text-black text-sm transition-all duration-200 hover:bg-slate-200 cursor-pointer'><i className="fa fa-user-circle mr-1" style={{color: '#bdbdbd'}}></i>Admin</li> : <></> }
              <li onClick={()=>{handelLogout()}} className='text-black text-sm transition-all duration-200 hover:bg-slate-200 cursor-pointer'><i className="fa-solid fa-arrow-right-from-bracket mr-1" style={{color: '#bdbdbd'}}></i>Logout</li>
            </ul>

          </div> : <div className="items-center flex-shrink-0 hidden lg:flex">
            <button onClick={()=>{history.push('/signin')}} className="self-center px-8 py-3 rounded border-2 mr-3">Sign in</button>
            <button onClick={()=>{history.push('/signup')}} className="self-center px-8 py-3 font-semibold rounded border-2 border-yellow-600">Sign up</button>
          </div>}
          
          <button className="p-4 lg:hidden" onClick={() => {setStatus(!status)}}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 dark:text-gray-100">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </header>
      <Sidebar status={status} setStatus={setStatus}/>
      {/* inner */}
      {status ? <div className="absolute w-full h-full top-0 bottom-0 right-0 left-0 z-300" onClick={()=>{setStatus(!status)}} style={{backgroundColor:'rgba(0,0,0,0.7)'}} ></div> : '' }      
    </div>
  )
}
