import React from 'react'
import { FaInstagram, FaFacebook, FaTwitter } from "react-icons/fa";

function Footer() {
    return (
        <footer className="bg-[#F5AAAA] text-white py-12 ">
            <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left column: Navigation and Social Icons */}
                <div className="flex flex-col items-center lg:items-start ">
                    {/* Nav Links */}
                    <ul className="flex lg:flex-col gap-8 md:gap-3 text-start mb-4 md:mb-16 text-xs  md:text-base">
                        <li className="hover:text-gray-300 cursor-pointer">Home</li>
                        <li className="hover:text-gray-300 cursor-pointer">Men</li>
                        <li className="hover:text-gray-300 cursor-pointer">Women</li>
                        <li className="hover:text-gray-300 cursor-pointer">Kids</li>
                    </ul>
                    
                    {/* Social Icons */}
                    <ul className="flex gap-6 text-base md:text-2xl">
                        <li className="hover:text-gray-300 cursor-pointer"><FaInstagram /></li>
                        <li className="hover:text-gray-300 cursor-pointer"><FaFacebook /></li>
                        <li className="hover:text-gray-300 cursor-pointer"><FaTwitter /></li>
                    </ul>
                </div>

                {/* Right column: Newsletter text and form */}
                <div className="flex flex-col  items-center lg:items-start lg:ml-auto">
                    <h2 className="text-base md:text-xl font-bold mb-2 md:mb-4">Subscribe to our newsletter</h2>
                    <h3 className="text-xs md:text-lg mb-5 px-4 text-center lg:text-left">
                        The latest news, articles, and resources, sent to your inbox weekly.
                    </h3>

                    {/* Newsletter form */}
                    <div className="flex">
                        <input type="text" className="rounded-lg px-2 text-xs py-1 md:px-5 md:py-2 text-black" placeholder="Enter your email" />
                        <button className="ml-2  px-2 text-xs md:px-5 md:py-2 bg-white text-[#F5AAAA] font-bold rounded-lg">Submit</button>
                    </div>
                </div>
            </div>

            {/* Footer bottom text */}
            <div className="mt-12 text-center text-white">
                © 2024 Cloth, Inc. All rights reserved.
            </div>
        </footer>
    );
}

export default Footer;
