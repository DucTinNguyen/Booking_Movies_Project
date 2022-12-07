import React, { useEffect, useState } from 'react'
import Footer from '../../components/Footer/Footer'
import Header from '../../components/Header/Header'
import './contact.css'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

import { useFormik } from "formik";

const introduceStyle = {
  height: "600px",
  backgroundRepeat: "no-repeat",
  backgroundSize: 'cover',
  backgroundPosition: 'center',
}
export default function Contact(props) {

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
    validationSchema: Yup.object({
      name: Yup.string()
      .min(2, "Mininum 2 characters")
      .max(15, "Maximum 15 characters")
      .required("Required!"),
      email: Yup.string().email('Invalid email').required('Email is required'),
      subject: Yup.string().required('Subject is required'),
      message: Yup.string().required('Message is required'),
    })
    ,
    onSubmit: values => {
      // console.log(values)
    },
  })


  return (
    <div>
      {/* Header */}
      <Header />
      {/* Introducetion */}
      <section className="flex items-center justify center relative" style={{ ...introduceStyle, backgroundImage: 'url(/image/breadcrumb_bg.jpg)' }}>
        <div className="absolute w-full h-full" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}></div>
        <h3 className="w-full text-white text-center -translate-y-2/4 text-6xl font-bold">Contact</h3>
      </section>
      {/* contact */}
      <section className={`contact grid grid-cols-12 gap-7 container sm:max-w-full`}>
        <div className={`col-span-8 md:col-span-7 sm:col-span-12 contact__left`}>
          <h3 className={`text_heading`}>Contact Form</h3>
          <form onSubmit={formik.handleSubmit} className={`form grid grid-cols-2 gap-8`}>
            <div className='sm:col-span-2 lg:col-span-1 col-span-2'>
              <input onChange={formik.handleChange} values={formik.values.name} placeholder="Your Name *" name="name" type="text" />
              {formik.errors.name && formik.touched.name && (
              <p className="text-red-500 m-0 pl-2">{formik.errors.name}</p>
              )}
            </div>
            <div className='sm:col-span-2 lg:col-span-1 col-span-2'>
              <input onChange={formik.handleChange} values={formik.values.email} placeholder="Your Email *" name="email" type="email" />
              {formik.errors.email && formik.touched.email && (
              <p className="text-red-500 m-0 pl-2">{formik.errors.email}</p>
              )}
            </div>
            <div className="col-span-2">
              <input onChange={formik.handleChange} values={formik.values.subject}  placeholder="Subject *" name="subject" type="text" />
              {formik.errors.subject && formik.touched.subject && (
              <p className="text-red-500 m-0 pl-2">{formik.errors.subject}</p>
              )}
            </div>
            <div className="col-span-2">
              <textarea onChange={formik.handleChange} values={formik.values.message} className=" text-white" name="message" placeholder=" *Type your message..." />
              {formik.errors.message && formik.touched.message && (
              <p className="text-red-500 m-0 pl-2">{formik.errors.message}</p>
              )}
            </div>
            <button type="submit" className={`btn__send sm:text-xs sm:w-full lg:w-1/2 `}>SEND MESSAGE</button>
          </form>
        </div>
        <div className={`col-span-4 md:col-span-5 sm:col-span-12 contact__right`}>
          <h3 className={`text_heading`}>Information</h3>
          <div className={`font-semibold information`} style={{ color: '#bcbcbc' }}>
            <p style={{ borderBottom: '1px solid #313035', paddingBottom: 25 }}>
              <strong style={{ color: '#fafafa', fontWeight: 600 }}>Find solutions :</strong> to common problems, or get help from a support agent industry's standard.
            </p>
            <ul className={`information_list`}>
              <li className={`information__item lg:text-base sm:text-sm`}>
                <i className="fa fa-map-marker-alt"></i>
                <p><strong>Address : </strong> W38 Park Road New York</p>
              </li>
              <li className={`information__item lg:text-base sm:text-sm`}>
                <i className="fa fa-map-marker-alt"></i>
                <p><strong>Address : </strong> W38 Park Road New York</p>
              </li>
              <li className={`information__item lg:text-base sm:text-sm`}>
                <i className="fa fa-map-marker-alt"></i>
                <p><strong>Address : </strong> W38 Park Road New York</p>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}
