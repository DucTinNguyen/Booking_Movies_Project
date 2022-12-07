import React, { useState } from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { history } from '../../App'
import Modal from './Modal'
import './SignUp.css'
import { useDispatch } from 'react-redux';
import { SIGNUP_SAGA } from '../../redux/types/UserType/userType';
export default function SignUp() {
    const [modal, setModal] = useState(false);
    const dispatch = useDispatch();
    // value validation
    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            phone: ''
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .required("Name is required!"),
            email: Yup.string().email('Invalid email').required('Email is required'),
            password: Yup.string().required('Password is required'),
            phone: Yup.string().required('Phone is required'),
        }),
        onSubmit: values => {

            //dispatch sang usersaga
            dispatch({
                type: SIGNUP_SAGA,
                user: values
            })
            setModal(!modal)
        },
    });


    return (
        <div className={'container sm:max-w-full app relative'}>
            <Modal modal={modal} setModal={setModal} />
            <div className={'signUp'} >
                <form onSubmit={formik.handleSubmit} className={'signUp__content'}>
                    <h3 className={'heading'}>Movflx</h3>
                    <div className={'wrap__input'}>
                        <input value={formik.values.name} onChange={formik.handleChange} name="name" type="text" placeholder="Name" />
                        {formik.errors.name && formik.touched.name && (
                            <p className="text-red-500 m-0 pl-2">{formik.errors.name}</p>
                        )}
                    </div>
                    <div className={'wrap__input'}>
                        <input value={formik.values.email} onChange={formik.handleChange} name="email" type="email" placeholder="Email" />
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
                    <div className={'wrap__input'}>
                        <input value={formik.values.phone} onChange={formik.handleChange} name="phone" type="text" placeholder="Phone number" />
                        {formik.errors.phone && formik.touched.phone && (
                            <p className="text-red-500 m-0 pl-2">{formik.errors.phone}</p>
                        )}
                    </div>
                    <button className={'w-full button__signup'} type='submit'>SIGN UP</button>
                    <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)', textAlign: 'center', marginTop: 20 }}>Already have an account? <span onClick={() => { history.push('/signin') }} style={{ color: '#ff5860', cursor: 'pointer' }}>Sign in</span></p>
                </form>
            </div>
            {/* inner */}
            {modal ? <div className="absolute w-full h-full top-0 bottom-0 right-0 left-0 z-300" onClick={() => { setModal(!modal) }} style={{ backgroundColor: 'rgba(0,0,0,0.3)' }} ></div> : ''}
        </div>
    )
}
