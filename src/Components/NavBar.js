import React, { useState } from 'react'
import Logo from '../assets/Logo.jpg'
import { CiShoppingCart } from "react-icons/ci";
import { RiAccountCircleLine } from "react-icons/ri";
import { CiHeart } from "react-icons/ci";
import { CiSearch } from "react-icons/ci";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoMdClose } from "react-icons/io";
import { Link } from 'react-router-dom';


function NavBar() {

  const [menuOpen, setMenuOpen] = useState(false);
  const handleSidebar = ()=>{
    setMenuOpen(!menuOpen)
  }

  return (
    <div className='w-full h-10 md:h-16 shadow-lg bg-white flex justify-between items-center py-4 px-4  md:px-14 md:py-9'>
      {/* Mobile menu */}
      <RxHamburgerMenu className='lg:hidden' onClick={() => handleSidebar()} />

      <Link to='/'><div className='text-xl md:text-2xl font-protest text-[#F5AAAA]'>Cloth.</div></Link>
      <ul className='flex items-center gap-8 hidden lg:flex text-slate-500'>
      <Link to='/'><li className='hover:text-[#F5AAAA]'>Home</li></Link>
        <li className='hover:text-[#F5AAAA]'>Men</li>
        <li className='hover:text-[#F5AAAA]'>Women</li>
        <li className='hover:text-[#F5AAAA]'>Kids</li>
        <li className='hover:text-[#F5AAAA]'>All Products</li>
      </ul>

      <div className='flex items-center relative hidden md:flex'>
        <input className='border h-7 rounded-full px-9 py-1 ' type='text' placeholder='Search..' />
        <CiSearch className='absolute left-3 text-xl text-black text-gray-500 ' />
      </div>

      {/* Icons */}
      <ul className='flex items-center gap-1 md:gap-3 text-lg lg:text-2xl '>
        <li className='hover:bg-[#F5AAAA] rounded-full lg:hidden '><CiSearch /></li>
        <li className='hover:bg-[#F5AAAA] rounded-full '><CiHeart /></li>
        <Link to='/cartitems'><li className='hover:bg-[#F5AAAA] rounded-full '><CiShoppingCart /></li></Link>
       <li className='hover:bg-[#F5AAAA] rounded-full '> <Link to='/register'><RiAccountCircleLine /></Link></li>
      </ul>

      {/* hamberger is Open */}
      {menuOpen &&
        <div className='absolute top-0 left-0 bg-[#F5AAAA] w-full h-full'>
          <IoMdClose className='absolute top-8 left-9 text-white md:text-2xl' onClick={()=>handleSidebar()}/>
          <ul className='flex flex-col items-center gap-6 justify-center py-20'>
            <li className='text-white md:text-xl hover:text-gray-300'>Home</li>
            <li className='text-white md:text-xl hover:text-gray-300'>Men</li>
            <li className='text-white md:text-xl hover:text-gray-300'>Women</li>
            <li className='text-white md:text-xl hover:text-gray-300'>Kids</li>
          </ul>
        </div>

      }

    </div>
  )
}

export default NavBar
