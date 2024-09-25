import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa'; // Import star icons
import NavBar from '../Components/NavBar';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../Features/Cart/CartSlice';

function Singledetails() {
  const dispatch = useDispatch();
  const location = useLocation();
  const [details, setDetails] = useState({});
  const cartItems = useSelector(state => state.cart.cartItems);

  useEffect(() => {
    const data = location.state.data;
    setDetails(data);
  }, []);

  const handleAddToCart = (details) => {
    dispatch(addToCart(details));
  };

  const isInCart = cartItems.find(item => item.id === details.id);

  // Function to render stars based on details rating
  const renderRatingStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating); // Number of full stars
    const hasHalfStar = rating % 1 !== 0; // Check if there's a half star

    // Push full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={i} className="text-yellow-500" />); // Full star
    }

    // Push half star if needed
    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key="half" className="text-yellow-500" />); // Half star
    }

    // Push empty stars if less than 5 total
    while (stars.length < 5) {
      stars.push(<FaRegStar key={stars.length} className="text-yellow-500" />); // Empty star
    }

    return stars;
  };

  return (
    <div>
      <NavBar />
    <div className='w-full h-auto'>
      <div class="flex flex-col gap-8 m-5 md:m-14 items-center lg:m-24 bg-white border border-gray-200 rounded-lg shadow md:flex-row  hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
        <img class="object-cover w-full rounded-t-lg h-64 md:h-auto md:w-72 lg:w-5xl md:rounded-none md:rounded-s-lg" src={details.image} alt="" />
        <div class="flex flex-col justify-between px-5 md:p-6 lg:p-0  leading-normal">
          <h5 class="mb-2 md:text-2xl lg:text-4xl font-bold tracking-tight text-gray-900 dark:text-white">{details.title}</h5>
          <p class="mb-3 font-normal md:text-base lg:text-xl text-gray-700 dark:text-gray-400">{details.description}</p>
          <div className="flex mt-2 text-xl" >
            {renderRatingStars(details.rating)} {/* Pass product.rating */}
          </div>
          <div class="mb-3 md:text-2xl lg:text-3xl font-bold text-gray-700 dark:text-gray-400 my-4">${details.price}</div>
          <button onClick={() => handleAddToCart(details)} className="w-42 lg:w-96 md:w-64 bg-[#F5AAAA] mx-4 my-4 text-base text-white  px-0 py-1 md:py-1 md:px-2 rounded-lg md:rounded-full decoration-solid md:font-bold hover:bg-gray-300">
              {isInCart ? 'Added to Cart' : 'Add to Cart'}
            </button>
        </div>
        </div>
      </div>

    </div>
  );
}

export default Singledetails;
