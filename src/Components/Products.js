
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProductCard from './ProductCard';
import { fetchProducts } from '../Features/Product/ProductSlice';
import { Link } from 'react-router-dom';

function Products() {
  const dispatch = useDispatch();
  const { products, status, error } = useSelector(state => state.products);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  // Filter to only include "new" products
  const newProducts = products.filter(product => product.isNew);


  return (
    <div className="py-2 md:py-16">
      <div className="container mx-auto p-5">
        <div className='flex justify-between'>
          <h2 className="text-sm md:text-3xl font-bold text-black mb-9 md:mb-20 ">Latest Products</h2>
          <Link to='allproducts'>
            <h3 className='text-sm md:text-lg text-[#F5AAAA]'>See all</h3>
          </Link>
        </div>

        <div className="w-68 md:w-full md:h-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-8 ">
          {newProducts.slice(0, 4).map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Products;