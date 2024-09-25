import React from 'react';
import NavBar from '../Components/NavBar';
import { useDispatch, useSelector } from 'react-redux';
import { decrementQty, incrementQty } from '../Features/Cart/CartSlice';

function CartItems() {
    const { cartItems, totalAmount } = useSelector(state => state.cart);  // Now include totalAmount
    const dispatch = useDispatch();

    const handleIncrement = (id) => {
        dispatch(incrementQty({ _id: id }));
    };

    const handleDecrement = (id) => {
        dispatch(decrementQty({ _id: id }));
    };

    return (
        <div>
            <NavBar />
            <div className="py-2 md:py-16">
                <div className="container h-full mx-auto p-5 md:px-16">
                    {cartItems.length > 0 ? (
                        <div>
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-8">
                                {cartItems.map((item) => (
                                    <div key={item._id} className="bg-white rounded-lg shadow-lg hover:bg-[#fdf1f1] cursor-pointer">
                                        <div className="relative overflow-hidden rounded-lg">
                                            <img className="object-cover w-48 h-40 md:w-full md:h-64" src={item.image} alt={item.title} />
                                            <div className="absolute inset-0 bg-black opacity-40"></div>
                                        </div>
                                        <div className="px-0 flex flex-col items-center md:px-3">
                                            <h3 className="text-xs md:text-lg font-bold text-gray-900 mt-4">{item.title}</h3>
                                            <span className="text-gray-900 font-bold text-xs md:text-lg mt-2">${item.price}</span>
                                            <div className="flex items-center space-x-2 mt-2 justify-center pb-7">
                                                <button onClick={() => handleDecrement(item._id)} className="bg-[#F5AAAA] text-white py-2 px-4 rounded-full hover:bg-gray-300">-</button>
                                                <span>{item.quantity}</span>
                                                <button onClick={() => handleIncrement(item._id)} className="bg-[#F5AAAA] text-white py-2 px-4 rounded-full hover:bg-gray-300">+</button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Total Amount Display */}
                            <div className="mx-auto my-36 border bg-[#F5AAAA] text-white py-5 ">
                                <h3 className="text-3xl font-bold px-5">Total Amount: ${totalAmount.toFixed(2)}</h3> {/* Use totalAmount from Redux */}
                            </div>
                        </div>
                    ) : (
                        <div className="px-4 py-4 text-center">
                            <h2 className="text-lg font-bold text-gray-900">No items in cart</h2>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default CartItems;
