import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, setCategoryFilter, setPriceFilter } from '../Features/Product/ProductSlice';
import ProductCard from '../Components/ProductCard';
import NavBar from '../Components/NavBar';

function AllProduct() {
  const dispatch = useDispatch();
  const { filteredProducts, status, error } = useSelector(state => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleCategoryChange = (category) => {
    dispatch(setCategoryFilter(category));
  };

  const handlePriceChange = (priceRange) => {
    dispatch(setPriceFilter(priceRange));
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <NavBar />
      <div className="flex">
        <div className='w-[20%] bg-white border hidden md:block'>
          <div className='flex justify-between p-4'>
            <h5 className='text-lg font-bold'>FILTERS</h5>
            <button className='text-rose-400 text-sm' onClick={() => { handleCategoryChange(''); handlePriceChange(''); }}>
              CLEAR ALL
            </button>
          </div>
          <hr />
          <ul className='flex flex-col items-start py-6 px-3'>
            <li><input type="radio" name="category" onChange={() => handleCategoryChange('men')} /> Men</li>
            <li><input type="radio" name="category" onChange={() => handleCategoryChange('women')} /> Women</li>
            <li><input type="radio" name="category" onChange={() => handleCategoryChange('kids')} /> Kids</li>
          </ul>
          <hr />
          <ul className='flex flex-col items-start py-6 px-3'>
            <li><input type="checkbox" onChange={() => handlePriceChange('0-20')} /> 0-$20</li>
            <li><input type="checkbox" onChange={() => handlePriceChange('20-40')} /> $20-$40</li>
            <li><input type="checkbox" onChange={() => handlePriceChange('40-100')} /> $40-$100</li>
          </ul>
        </div>

        <div className="container mx-auto p-8">
          <div className="w-64 md:w-full md:h-full grid grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllProduct;
