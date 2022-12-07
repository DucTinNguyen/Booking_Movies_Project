import React, { memo, useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { DOMAIN } from '../../utility/setting'
import { Space, Table, Tag, Button, Modal, Input, DatePicker, Form, InputNumber, Upload, Select } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { GET_LIST_MOVIE } from '../../redux/types/MovieType/MovieType';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import moment from 'moment';
const { Search } = Input;




function Movies() {
    const { listMovies } = useSelector(state => state.MoviesReducer)
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({ type: GET_LIST_MOVIE })
    }, [])
    //status exchange data in table
    const [status, setStatus] = useState(1)
    const [success,setSuccess] = useState(0)
    // let dataMovies = listMovies;
    // modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    // cinestar & cinema 
    const [state, setState] = useState({
        cinestar: [],
        cinemas: [],
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
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
        // window.location.reload(false)
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    //Delete Movies
    const handleDeleteMovie = async (id) => {
        await axios({
            method: 'DELETE',
            url: `${DOMAIN}/movies/${id}`
        })
        window.location.reload(false)
    }


    // formik
    const formik = useFormik({
        initialValues: {
            name: '',
            date: '',
            rate: '',
            description: '',
            time: '',
            genre: '',
            trailer: '',
            cinestar: 0,
            cinemas: 0,
            image: {},
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Name is required'),
            date: Yup.string().required('Date is required'),
            rate: Yup.string().required('Rate is required'),
            description: Yup.string().required('Description is required'),
            time: Yup.string().required('Time is required'),
            genre: Yup.string().required('Genre is required'),
            trailer: Yup.string().required('Trailer is required'),
            cinestar: Yup.string().required('Cinestar is required'),
            cinemas: Yup.string().required('Cinemas is required'),
            
        })
        ,
        onSubmit: values => {
            //   alert(JSON.stringify(values, null, 2));
            let formData = new FormData();
            for (let key in values) {
                if (key !== 'image') {
                    formData.append(key, values[key])
                }
                else {
                    formData.append('image', values.image)
                }
            }
            (async () => {
                let result = await axios({
                    url: `${DOMAIN}/admin/create`,
                    method: 'POST',
                    data: formData
                })
            })()
            //set lai 
            setSuccess(1)
        },
    });
    // handle change input
    const handleChangeDate = (value) => {
        let date = moment(value).format('YYYY')
        formik.setFieldValue('date', date)
    }
    const handleChangeInputnumber = value => {
        formik.setFieldValue('rate', value)
    }
    // Cinestar
    const handleChangeCinestar = async value => {
        formik.setFieldValue('cinestar', value)
        try {
            let result = await axios({
                url: `${DOMAIN}/cinestars/${value}`,
                method: 'GET'
            })
            setState({ ...state, cinemas: result.data.cinestarCollection[0].cinema })
        } catch (e) {
            console.log(e.err)
        }
    }
    // render cinestar
    const renderCinestars = () => {
        return state.cinestar?.map((item, index) => {
            return { label: item.name, value: item.id,key:index }
        })
    }
    //render cinemas
    const renderCinemas = () => {
        return state.cinemas?.map((item, index) => {
            return { label: item.name, value: item.id,key:index }
        })
    }

    const handleChangeCinemas = value => {
        formik.setFieldValue('cinemas', value)
    }



    const handleChangeImage = e => {
        // console.log(value.target.files[0])
        // formik.setFieldValue('image',value.target.files[0].name)
        let file = e.target.files[0];
        if (file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/gif' || file.type === 'image/png') {
            let reader = new FileReader();
            reader.readAsDataURL(file);
            // reader.onload =(e)=>{
            //     // console.log(e.target.result)
            // }
            // console.log(file)
            formik.setFieldValue('image', file)
        }

    }
    let columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <a>{text}</a>,
            width: 150
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'des',
        },
        {
            title: 'Image',
            dataIndex: 'image',
            key: 'image',
            width: 100,
            render: (text) => <img className="w-full" src={text} />
        },
        {
            title: 'Genre',
            dataIndex: 'genre',
            key: 'genre',
        },
        {
            title: 'Rate',
            dataIndex: 'rate',
            key: 'rate',
        },
        {
            title: 'Year',
            dataIndex: 'year',
            key: 'year',
        },
        {
            title: 'Time',
            dataIndex: 'time',
            key: 'time',
        },
        {
            title: 'Trailer',
            dataIndex: 'trailer',
            key: 'trailer',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button type="danger" onClick={() => { handleDeleteMovie(record.id) }}>Delete</Button>
                </Space>
            ),
        },
    ];
    // Toast notify
    const notify = () => toast.success("Create successfully!", {
        position: "top-right",
        autoClose: 500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
    });
    // find movie
    const onSearch = async (value) => {
        setStatus(0)
        let result = await axios({
            url: `${DOMAIN}/admin/movie`,
            method: 'POST',
            data: {
                name: value
            }
        })
        dispatch({
            type: 'FIND_MOVIE',
            data: result.data
        })
    };
    let {filmSearch} = useSelector(state => state.MoviesReducer)
    return (
        <div>
            <ToastContainer autoClose={500} theme="dark" />
            <Modal title="Create Movie" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <Form
                    labelCol={{
                        span: 4,
                    }}
                    wrapperCol={{
                        span: 14,
                    }}
                    layout="horizontal"
                    onFinish={formik.handleSubmit}
                >
                    <Form.Item label="Name">
                        <Input name='name' onChange={formik.handleChange} />
                        {formik.errors.name && formik.touched.name ? (
                            <div className="text-red-500">{formik.errors.name}</div>
                        ) : null}
                    </Form.Item>
                    <Form.Item label="Cinestar">
                        <Select
                            placeholder="Select cinestar"
                            style={{
                                width: 300,
                            }}
                            name='cinestar'
                            onChange={(value) => { handleChangeCinestar(value) }}
                            options={renderCinestars()}
                        />
                        {formik.errors.cinestar && formik.touched.cinestar ? (
                            <div className="text-red-500">{formik.errors.cinestar}</div>
                        ) : null}
                    </Form.Item>
                    <Form.Item label="Cinema">
                        <Select
                            placeholder="Select cinema"
                            style={{
                                width: 300,
                            }}
                            name ='cinemas'
                            onChange={(value) => { handleChangeCinemas(value) }}
                            options={renderCinemas()}
                        />
                        {formik.errors.cinemas && formik.touched.cinemas ? (
                            <div className="text-red-500">{formik.errors.cinemas}</div>
                        ) : null}
                    </Form.Item>
                    <Form.Item label="Genre">
                        <Input name='genre' onChange={formik.handleChange} />
                        {formik.errors.genre && formik.touched.genre ? (
                            <div className="text-red-500">{formik.errors.genre}</div>
                        ) : null}
                    </Form.Item>
                    <Form.Item label="Trailer">
                        <Input name='trailer' onChange={formik.handleChange} />
                        {formik.errors.trailer && formik.touched.trailer ? (
                            <div className="text-red-500">{formik.errors.trailer}</div>
                        ) : null}
                    </Form.Item>
                    <Form.Item label="Time">
                        <Input name='time' onChange={formik.handleChange} />
                        {formik.errors.time && formik.touched.time ? (
                            <div className="text-red-500">{formik.errors.time}</div>
                        ) : null}
                    </Form.Item>
                    <Form.Item label="DatePicker">
                        <DatePicker format={"DD/MM/YYYY"} name='date' onChange={handleChangeDate} />
                        {formik.errors.date && formik.touched.date ? (
                            <div className="text-red-500">{formik.errors.date}</div>
                        ) : null}
                    </Form.Item>
                    <Form.Item label="Rate">
                        <InputNumber name="rate" onChange={handleChangeInputnumber} />
                        {formik.errors.rate && formik.touched.rate ? (
                            <div className="text-red-500">{formik.errors.rate}</div>
                        ) : null}
                    </Form.Item>
                    <Form.Item label="Description">
                        <Input.TextArea name='description' onChange={formik.handleChange} />
                        {formik.errors.description && formik.touched.description ? (
                            <div className="text-red-500">{formik.errors.description}</div>
                        ) : null}
                    </Form.Item>
                    <Form.Item label="Image">
                        <input type="file" accept=".jpg, .jpeg, .png" name='image' onChange={handleChangeImage} />
                        {formik.errors.image && formik.touched.image ? (
                            <div className="text-red-500">{formik.errors.image}</div>
                        ) : null}
                    </Form.Item>
                    <Form.Item label="Confirm">
                        <Button onClick={ success ? notify : ''} htmlType='submit'>OK</Button>
                    </Form.Item>
                </Form>
            </Modal>
            <div className="flex items-center mb-4">
                <Search
                    placeholder="What movie do you want?"
                    allowClear
                    enterButton="Search"
                    size="medium"
                    onSearch={onSearch}
                />
                <Button type="primary" onClick={showModal}>Create Movie</Button>
            </div>

            <Table columns={columns} dataSource={status ? listMovies : filmSearch} />;
        </div>
    )
}
export default memo(Movies)
