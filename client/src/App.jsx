// import { useSelector } from 'react-redux';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import BottomNav from './components/BottomNav';
import HeadNav from './components/HeadNav';
import LoginAlert from './components/LoginAlert';
import Cities from './pages/Cities';
// import Admin from './pages/Admin';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/Signup';

function App() {
  // const allCities = useSelector((state) => state.cities);
  // console.log(allCities);
  const mainTitle = 'SOLO';
  return (
    <BrowserRouter>
      <HeadNav mainTitle={mainTitle} />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="*" exact element={<LoginAlert />} />
        <Route path="/login" exact element={<Login mainTitle={mainTitle} />} />
        <Route path="/cities" exact element={<Cities />} />
        <Route path="/signup" exact element={<SignUp />} />
        {/* Protected Route */}
        {/* <Route path="/admin">
          <isAdmin>
            <Admin />
          </isAdmin>
        </Route> */}
      </Routes>
      <BottomNav />
    </BrowserRouter>
  );
}

export default App;
