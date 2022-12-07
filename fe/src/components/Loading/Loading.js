import React from 'react'
import { useSelector } from 'react-redux'
import styleLoading from './Loading.module.css'
export default function Loading() {

    const {isLoading} = useSelector(state => state.LoadingReducer);
    if(isLoading){
        return (
            <div className={styleLoading.loading}>
                 <div className='text-center'>
                    <h2 className='text-2xl'>Loading...</h2>
                    <span className={`${styleLoading['loading__ball ball--1']}`}></span>
                    <span className={`${styleLoading['loading__ball ball--2']}`}></span>
                    <span className={`${styleLoading['loading__ball ball--3']}`}></span>
                </div>
            </div>
        )
    }
    else{
        return ''
    }
}
