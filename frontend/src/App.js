import './App.css';
import Home from './dashboard/Home/Home'
import Connections from './dashboard/Connections/Connections'
import Jobs from './dashboard/Jobs/Jobs'
import Settings from './dashboard/Settings/Settings'
import MyProfile from './dashboard/Settings/MyProfile/MyProfile';
import ChangePassword from './dashboard/Settings/ChangePassword/ChangePassword';
import Search from './dashboard/Search/Search'
import ErrorPage from './ErrorPage/ErrorPage'
import {BrowserRouter , Routes, Route} from "react-router-dom";
import LoginPage from './dashboard/LoginPage/LoginPage';
import Registration from './dashboard/Registration/Registration';



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path = "/search" element = {<Search />} />
        <Route path="/connections" element={<Connections />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/settings/profile/:userid" element={<MyProfile />} />
        <Route path="/settings/changepassword" element={<ChangePassword />} />
        <Route path="/login" element={<Login />} />

        <Route path="/home" element={<Home />} />
        <Route path = "/registration" element = {<Registration />} />

        <Route path="*" element={<ErrorPage />} />
      </Routes> 
    </BrowserRouter>
  );
}

export default App;
