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
import ProtectedRoute from './auth/ProtectedRoute';

import { useState } from 'react';
import React from 'react';

const AuthContext = React.createContext(null);

const getAuth = ({postData}) => {

  fetch('/auth/login', {
      method : 'POST',
      headers:{'Content-type':'application/json'},
      //headers:{'Authorization' : 'Bearer '}
      body:JSON.stringify(postData),
  }).then(response => response.json()).then(data => {
      console.log(data);
      sessionStorage.setItem("token", data.token);
      sessionStorage.setItem(data.userEmail, data.password);
      sessionStorage.setItem('userid', data.userId);
      sessionStorage.setItem('token', data.token);
      console.log('stored token', sessionStorage.getItem('token') );
      console.log('userid stored', sessionStorage.getItem('userid')   );
  }).catch(error => console.log('error', error))
} 

const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);
  
    const handleLogin = async () => {
        getAuth();
  
      setToken(sessionStorage.getItem('token'));
    };
  
    const handleLogout = () => {
      setToken(null);
    };
  
    const value = {
      token,
      onLogin: handleLogin,
      onLogout: handleLogout,
    };
  
    return (
      <AuthContext.Provider value={value}>
        {children}
      </AuthContext.Provider>
    );
  };


function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path = "/search" 
            element = {
              <ProtectedRoute>
                  <Search />
              </ProtectedRoute>
            
          } 
            />
            <Route path="/connections" 
            element={
              <ProtectedRoute>
                <Connections />
              </ProtectedRoute>
          } 
            />
            <Route path="/jobs" element={
              <ProtectedRoute>
                 <Jobs />
              </ProtectedRoute>
           
            } />
            <Route path="/settings" 
            element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            
          } 
            />
            <Route path="/settings/profile/:userid" 
            element={
              <ProtectedRoute>
                <MyProfile />
              </ProtectedRoute>
            
          } 
            />
            <Route path="/settings/changepassword" 
            element={
              <ProtectedRoute>
                <ChangePassword />
              </ProtectedRoute>
            
            } />
            {/* <Route path="/login" element={<Login />} /> */}

            <Route path="/home" 
                  element=
                  {
                    <ProtectedRoute>
                        <Home />
                    </ProtectedRoute>
                    
                  } 
            />
            <Route path = "/registration" element = {<Registration />} />

            <Route path="*" element={<ErrorPage />} />
          </Routes> 
      </AuthProvider>
        
    </BrowserRouter>
  );
}

export default App;
