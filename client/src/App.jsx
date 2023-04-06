import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import HeadNav from './components/HeadNav';
import Account from './pages/Account';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/Signup';
import Booking from './pages/Booking';
import ProtectedRoute from './Routes/ProtectedRoute';
import Hotels from './pages/Hotels';
import IsAdmin from './Routes/IsAdmin';
import Admin from './pages/Admin';
import About from './pages/About';
import Toast from './components/Toast';
import IsUser from './Routes/IsUser';
import Alert from './components/Alert';
import Hotel from './pages/Hotel';
import Cities from './pages/Cities';
import Cart from './pages/Cart';
import { getCartItemFn } from './store/slices/CartSlice';
import { getCityFn } from './store/slices/CitiesSlice';

function App() {
  const mainTitle = 'SOLO';
  const dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(getCartItemFn());
    }
    dispatch(getCityFn());
  }, []);

  return (
    <BrowserRouter>
      <HeadNav mainTitle={mainTitle} />
      <Alert />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="*" element={<Home />} />

        <Route path="/about" exact element={<About mainTitle={mainTitle} />} />
        <Route path="/hotels" exact element={<Hotels />} />
        <Route path="/cities" exact element={<Cities />} />

        {/* Only Logout User can access */}
        <Route element={<IsUser />}>
          <Route path="/login" exact element={<Login />} />
          <Route path="/signup" exact element={<SignUp />} />
        </Route>

        {/* Only Login User can access */}
        <Route element={<ProtectedRoute />}>
          <Route path="/hotel/:id" exact element={<Hotel />} />
          <Route path="/account" exact element={<Account mainTitle={mainTitle} />} />
          <Route path="/booking" exact element={<Booking />} />
          <Route path="/cart" exact element={<Cart />} />
        </Route>

        {/* Only Admin can access */}
        <Route element={<IsAdmin />}>
          <Route path="/dashboard" exact element={<Admin />} />
        </Route>

      </Routes>
      <Toast />
    </BrowserRouter>
  );
}

export default App;
