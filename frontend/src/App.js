import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

import Navbar from './components/Navbar'
import Home from './pages/Home'
import Product from './pages/Product'
import Cart from './pages/Cart'
import Login from './pages/Login'
import Profile from './pages/Profile'
import Register from './pages/Register'
import Shipping from './pages/Shipping'
import PaymentMethod from './pages/PaymentMethod'
import PlaceOrder from './pages/PlaceOrder'
import OrderDetails from './pages/OrderDetails'
import UserListAdmin from './pages/UserListAdmin'
import ProductListAdmin from './pages/ProductListAdmin'
import ProductCreateAdmin from './pages/ProductCreateAdmin'
import ProductUpdateAdmin from './pages/ProductUpdateAdmin'
import OrderListAdmin from './pages/OrderListAdmin'
import SearchResults from './pages/SearchResults'

// TODO: https://stackoverflow.com/a/66362955
function App() {
  return (
    <>
      <Router>
          <Navbar/>
          <Routes>
            <Route path='/login' element={<Login/>}/>
            <Route path='/profile' element={<Profile/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/' element={<Home/>}/>
            <Route path='/product/:id' element={<Product/>}/>
            <Route path='/search/:searchTerm' element={<SearchResults/>}/>
            <Route path='/cart' element={<Cart/>}/>
            <Route path='/cart/:id' element={<Cart/>}/>
            <Route path='/shipping' element={<Shipping/>}/>
            <Route path='/payment' element={<PaymentMethod/>} />
            <Route path='/place-order' element={<PlaceOrder/>}/>
            <Route path='/order/:id' element={<OrderDetails/>}/>
            <Route path='/admin/users' element={<UserListAdmin/>}/>
            <Route path='/admin/products' element={<ProductListAdmin/>}/>
            <Route path='/admin/products/create' element={<ProductCreateAdmin/>}/>
            <Route path='/admin/products/:id/edit' element={<ProductUpdateAdmin/>}/>
            <Route path='/admin/orders' element={<OrderListAdmin/>}/>
          </Routes>
      </Router>
    </>
  );
}

export default App;
