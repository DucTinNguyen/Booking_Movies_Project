import { Button, DatePicker, Form, Input, Select } from 'antd';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import moment from 'moment';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { DOMAIN } from '../../utility/setting'


export default function Showtime() {

  const [state, setState] = useState({
    cinestar: [],
    cinemas: [],
    room: [],
  })

  const [success,setSuccess] = useState(0)
  const {listMovies} = useSelector(state => state.MoviesReducer)
  const formik = useFormik({
    initialValues: {
      cinema: 0,
      room:0,
      movies:0,
      showtime:''
    },
    validationSchema: Yup.object({
      cinema: Yup.string().required('Cinema is required'),
      room: Yup.string().required('Room is required'),
      movies: Yup.string().required('Movies is required'),
      showtime: Yup.string().required('Showtime is required'),
  }),
    onSubmit: async (values) => {
        await axios({
          url:`${DOMAIN}/admin/showtimes`,
          method: 'POST',
          data: values
        })
        setSuccess(1)
    }
  })

 
  
  useEffect(() => {
    // Get all cinestars
    const callAPICinestar = async (req, res) => {
      let cinestars = await axios({
        url: `${DOMAIN}/cinestars`,
        method: 'GET',
      })
      setState({ ...state, cinestar: cinestars.data })
    }

    callAPICinestar()
   
  }, [])

  const renderCinestars = () => {
    return state.cinestar?.map((item, index) => {
      return { label: item.name, value: item.id }
    })
  }


  const handleChangeCinestar = async (value)=>{
      try{
          let result = await axios({
            url:`${DOMAIN}/cinestars/${value}`,
            method:'GET'
          })
          setState({...state, cinemas:result.data.cinestarCollection[0].cinema})
      }catch(e){
        console.log(e.err)
      }
  }


  const renderCinemas = () => {
    return state.cinemas?.map((item, index) => {
      return { label: item.name, value: item.id }
    })

  }
  const handleChangeCinemas = async (value) =>{
    // console.log('cinemas',value)
    formik.setFieldValue('cinema',value)

    try{
      let result = await axios({
        url:`${DOMAIN}/admin/cinemas/${value}`,
        method:'GET'
      })
      setState({...state,room:result.data.roomCollection,movie:result.data.moviesCollection[0].movie})
  }catch(e){
    console.log(e.err)
  }
  }
  const renderRooms = () => {
    return state.room?.map((item, index) => {
      return { label:item.name_room, value: item.id }
    })
  }
  const renderMovies = () => {
    return listMovies?.map((item, index) => {
      return { label:item.name, value: item.id }
    })
  }
  const handleDateChange = (value) => {
    let showtime = moment(value).format('')
    formik.setFieldValue('showtime',showtime)
    // console.log('showtime',moment(value).format(''))
  }

  const handleChangeMovie = (value) => {
    // console.log('movies',value)
    formik.setFieldValue('movies',value)
  }

  const handleChangeRoom = (value) => {
    // console.log('rooms',value)
    formik.setFieldValue('room',value)
  }
   // toast notify
   const notify = () => toast.success("Create successfully",{
    theme:'colored'
   });
  return (
    <div>
      <ToastContainer autoClose={1000} />
      <Form
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        onFinish={formik.handleSubmit}
        className="w-1/2"
        style={{margin:'0 auto'}}
      >
        <Form.Item label="Movie">
          <Select
            placeholder="Select Movie"
            style={{
              width: 300,
            }}
            name='movies'
            onChange={(value)=>{handleChangeMovie(value)}}
            options={renderMovies()}  
          />
          {formik.errors.movies && formik.touched.movies ? (
                            <div className="text-red-500">{formik.errors.movies}</div>
                        ) : null}
        </Form.Item>
        <Form.Item label="Select Cinestar">
          <Select
            placeholder="Select cinestar"
            style={{
              width: 300,
            }}
            onChange={(value)=>{handleChangeCinestar(value)}}
            options={renderCinestars()}
          />
          
        </Form.Item>
        <Form.Item label="Select Cinema">
          <Select
            placeholder="Select cinema"
            style={{
              width: 300,
            }}
            name="cinema"
            onChange={(value)=>{handleChangeCinemas(value)}}
            options={renderCinemas()}
          />
          {formik.errors.cinema && formik.touched.cinema ? (
                            <div className="text-red-500">{formik.errors.cinema}</div>
                        ) : null}
        </Form.Item>
        <Form.Item label="Room">
          <Select
            placeholder="Select room"
            style={{
              width: 300,
            }}
            name='room'
            onChange={(value)=>{handleChangeRoom(value)}}
            options={renderRooms()}
          />
          {formik.errors.room && formik.touched.room ? (
                            <div className="text-red-500">{formik.errors.room}</div>
                        ) : null}
        </Form.Item>
        <Form.Item label="Showtime">
          <DatePicker name='showtime' onChange={(value)=>{handleDateChange(value)}} />
          {formik.errors.showtime && formik.touched.showtime ? (
                            <div className="text-red-500">{formik.errors.showtime}</div>
                        ) : null}
        </Form.Item>
        <Form.Item  label="Create Showtime">
          <Button onClick={success ? notify : ''} htmlType='submit'>OK</Button>
        </Form.Item>
      </Form>

    </div>
  )
}