import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import BottomNav from './components/BottomNav';
import HeadNav from './components/HeadNav';
import LoginAlert from './components/LoginAlert';
import Home from './pages/Home';

function App() {
  const mainTitle = 'SOLO';
  return (
    <BrowserRouter>
      <HeadNav mainTitle={mainTitle} />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="*" exact element={<LoginAlert />} />
      </Routes>
      <BottomNav />
    </BrowserRouter>
  );
}

export default App;
