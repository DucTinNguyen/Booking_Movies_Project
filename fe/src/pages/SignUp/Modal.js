import React from 'react'
import { history } from '../../App';

export default function Modal(props) {
    const {modal,setModal} = props;

  return (
    <div className={modal ? `modal modal__open` : `modal__hide`}>
        <div className='translate-y-1/3'>
            <h2 className='text-2xl text-center'>Awesome</h2>
            <p className='text-lg text-center'>Sign up successfully</p>
            <button onClick={()=>{history.push('/signin')}} className='bg-lime-900 w-full text-white p-3 rounded'>SIGN IN</button>
        </div>
    </div>
  )
}
