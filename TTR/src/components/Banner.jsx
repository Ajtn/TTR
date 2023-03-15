import React from 'react'
import Navbar from './Navbar'
import Title from '../assets/coollogo_com-253933836.png'

export default function Banner() {
    return (
        <div className='banner'>
            <img className='banner-title' src={Title}/>
            <Navbar />
        </div>
    )
}
