import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
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

function App() {
  const mainTitle = 'SOLO';
  return (
    <BrowserRouter>
      <HeadNav mainTitle={mainTitle} />
      <Alert />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="*" element={<Home />} />

        <Route path="/about" exact element={<About mainTitle={mainTitle} />} />
        <Route path="/hotels" exact element={<Hotels />} />
        <Route path="/hotel/:id" exact element={<Hotel />} />

        {/* Only Logout User can access */}
        <Route element={<IsUser />}>
          <Route path="/login" exact element={<Login />} />
          <Route path="/signup" exact element={<SignUp />} />
        </Route>

        {/* Only Login User can access */}
        <Route element={<ProtectedRoute />}>
          <Route path="/account" exact element={<Account mainTitle={mainTitle} />} />
          <Route path="/booking" exact element={<Booking />} />
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
