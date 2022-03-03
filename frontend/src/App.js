import './App.css';
import Home from './dashboard/Home/Home'
import Connections from './dashboard/Connections/Connections'
import Jobs from './dashboard/Jobs/Jobs'
import Settings from './dashboard/Settings/Settings'
import Search from './dashboard/Search/Search'
import ErrorPage from './ErrorPage/ErrorPage'
import Login from './Login/Login'
import {BrowserRouter , Routes, Route} from "react-router-dom";
import LoginPage from './components/LoginPage/LoginPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path = "/search" element = {<Search />} />
        <Route path="/connections" element={<Connections />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes> 
    </BrowserRouter>
  );
}

export default App;
