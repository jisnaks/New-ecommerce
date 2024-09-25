
import './App.css';
import AllProduct from './Pages/AllProduct';
import Home from './Pages/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './Pages/Login';
import Register from './Pages/Register';
import CartItems from './Pages/CartItems';
import SingleProduct from './Pages/SingleProduct';

function App() {
  return (
    <div className="App overflow-x-hidden">
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/allproducts' element={<AllProduct />}/>
          <Route path='/login' element={<Login />}/>
          <Route path='/register' element={<Register />}/>
          <Route path='/allproducts' element={<AllProduct />}/>
          <Route path='/cartitems' element={<CartItems />}/>
          <Route path='/singleproduct/:_id' element={<SingleProduct />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
