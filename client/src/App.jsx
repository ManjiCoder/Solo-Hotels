import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
// import BottomNav from './components/BottomNav';
import HeadNav from './components/HeadNav';
import LoginAlert from './components/LoginAlert';
import Account from './pages/Account';
import Cities from './pages/Cities';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/Signup';
import Booking from './pages/Booking';
import ProtectedRoute from './ProtectedRoute/ProtectedRoute';

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
        <Route path="/cities" exact element={<Cities />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/account" exact element={<Account mainTitle={mainTitle} />} />
          <Route path="/booking" exact element={<Booking />} />

        </Route>

      </Routes>
      {/* <BottomNav /> */}
    </BrowserRouter>
  );
}

export default App;
