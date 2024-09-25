import React from 'react'
import header from '../assets/header.jpg'

function Header() {
    return (
        <div className='relative w-full'>
            <img className='w-full lg:w-full h-60 md:h-[470px] lg:min-h-[716px]  object-cover' src={header} alt='Image' />
            <div className=' text-left absolute inset-0 text-white flex flex-col  items-start justify-center px-6 md:px-24 lg:px-52'>
                <div className= 'text-sm md:text-2xl  lg:text-4xl font-roboto'>T-Shirt/Tops</div>
                <div className='font-bold text-md  md:text-4xl lg:text-6xl py-1 md:py-2 lg:py-4'>Summer <br className=''/> Value Pack</div>
                <div className='text-sm md:text-xl  lg:text-4xl mb-3 md:pb-2 lg:pb-4'>Cool / Colourful / Comfy</div>
                <button className='rounded-xl text-xs md:text-lg bg-white text-black px-2 py-1 md:px-10 md:py-1 lg:px-12 lg:py-2'>Shop Now</button>
            </div>
        </div>
    )
}

export default Header
