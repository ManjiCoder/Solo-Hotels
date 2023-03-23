import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
// import BottomNav from './components/BottomNav';
import HeadNav from './components/HeadNav';
import LoginAlert from './components/LoginAlert';
import Account from './pages/Account';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/Signup';
import Booking from './pages/Booking';
import ProtectedRoute from './ProtectedRoute/ProtectedRoute';
import Hotels from './pages/Hotels';
import IsAdmin from './ProtectedRoute/IsAdmin';
import Admin from './pages/Admin';

function App() {
  const mainTitle = 'SOLO';

  return (
    <BrowserRouter>
      <HeadNav mainTitle={mainTitle} />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="*" exact element={<LoginAlert />} />
        <Route path="/login" exact element={<Login mainTitle={mainTitle} />} />
        <Route path="/signup" exact element={<SignUp mainTitle={mainTitle} />} />
        <Route path="/hotels" exact element={<Hotels />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/account" exact element={<Account mainTitle={mainTitle} />} />
          <Route path="/booking" exact element={<Booking />} />
        </Route>

        <Route element={<IsAdmin />}>
          <Route path="/dashboard" element={<Admin />} />
        </Route>

      </Routes>
      {/* <BottomNav /> */}
    </BrowserRouter>
  );
}

export default App;
