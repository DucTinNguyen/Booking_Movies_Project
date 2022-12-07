import React, { useEffect } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup';
import './SignIn.css'
import { history } from '../../App'
import { useDispatch, useSelector } from 'react-redux';
import { SIGNIN_SAGA } from '../../redux/types/UserType/userType';
import { memo } from 'react';
function SignIn() {

  const dispatch = useDispatch();
  const {message} = useSelector(state => state.UserReducer)
  //save into localStorage
  // localStorage.setItem('user',JSON.stringify(user))
  // //Check redirect to previous page
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().required('Email is required'),
      password: Yup.string().required('Password is required')
    }),
    onSubmit: values => {
      //
      dispatch({
        type:SIGNIN_SAGA,
        user: values
      })
    },
  });


  return (
    <div className={'container sm:max-w-full app'}>
      <div className={'signUp'} >
        <form onSubmit={formik.handleSubmit} className={'signUp__content'}>
          <h3 className={'heading'}>Movflx</h3>
          <div className={'wrap__input'}>
            <input value={formik.values.name} onChange={formik.handleChange} name="email" type="email" placeholder="Email" />
            {formik.errors.email && formik.touched.email && (
              <p className="text-red-500 m-0 pl-2">{formik.errors.email}</p>
            )}
          </div>
          <div className={'wrap__input'}>
            <input value={formik.values.password} onChange={formik.handleChange} name="password" type="password" placeholder="Password" />
            {formik.errors.password && formik.touched.password && (
              <p className="text-red-500 m-0 pl-2">{formik.errors.password}</p>
            )}
          </div>
          <span className="text-red-500 inline-block mb-2 pl-2">{message}</span>
          <button type="submit" className={'w-full button__signup'}>SIGN IN</button>
          <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)', textAlign: 'center', marginTop: 20 }}>Login with <span className='hover:text-cyan-500' style={{ color: '#ff5860', fontWeight: '600', cursor: 'pointer' }}>Google account</span></p>
          <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)', textAlign: 'center', marginTop: 20 }}>If you don't have account <span onClick={() => { history.push('/signup') }} className='hover:text-cyan-500' style={{ color: '#ff5860', fontWeight: '600', cursor: 'pointer' }}>Register</span></p>

        </form>
      </div>
    </div>
  )
}
export default memo(SignIn)