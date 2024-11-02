import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { FaRegStarHalfStroke } from "react-icons/fa6"; // Import star icons
import { FaStar } from "react-icons/fa6";
import { FaRegStar } from "react-icons/fa6";
import { addToCart, decrementQty, incrementQty } from '../Redux/Actions/CartActions';


function ProductCard({ product }) {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { cartItems } = useSelector(state => state.cart);
  const { loggedIn } = useSelector((state) => state.auth);


  const handleAddToCart = (product) => {
    if (loggedIn) {
      dispatch(addToCart(product));
    } else {
      console.log(loggedIn);
      navigate('/login');
    }
  };

  const handleIncrement = () => {
    dispatch(incrementQty({ id: product.id }));
  };

  const handleDecrement = () => {
    dispatch(decrementQty({ id: product.id }));
  };

  const isInCart = cartItems.find(item => item.id === product.id);

  // Function to render stars based on product rating
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
      stars.push(<FaRegStarHalfStroke key="half" className="text-yellow-500" />); // Half star
    }

    // Push empty stars if less than 5 total
    while (stars.length < 5) {
      stars.push(<FaRegStar key={stars.length} className="text-yellow-500" />); // Empty star
    }

    return stars;
  };

  return (

    <div className=" h-[300px] md:h-[420px] bg-white rounded-lg shadow-lg hover:bg-[#fdf1f1] cursor-pointer">
      <Link to={`/singleproduct/${product._id}`} state={{ data: product }}>
        <div className="relative overflow-hidden rounded-lg">
          <img className="object-cover w-48 h-40 md:w-full md:h-64" src={product.image} alt={product.title} />
          <div className="absolute inset-0 bg-black opacity-40"></div>
        </div>
      </Link>

      <div className=" flex flex-col items-center ">
        <h3 className="text-xs md:text-lg font-bold text-gray-900 mt-4  ">{product.title}</h3>

        {/* Render rating stars */}
        <div className="flex mt-2 " >
          {renderRatingStars(product.rating)} {/* Pass product.rating */}
        </div>
        <span className="text-gray-900 font-bold text-xs md:text-lg mt-2 ">Price: ${product.price}</span>
        <button onClick={() => handleAddToCart(product)} className="w-24 md:w-36 bg-[#F5AAAA] mx-4 text-xs text-white my-2 px-0 py-2 md:py-2 md:px-2 rounded-lg md:rounded-full decoration-solid md:font-bold hover:bg-gray-300">
          {isInCart ? 'Added to Cart' : 'Add to Cart'}
        </button>


      </div>
    </div >

  );
}

export default ProductCard;
