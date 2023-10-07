import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './Pages/Authenticate/LoginPage';
import SignUpPage from './Pages/Authenticate/SignUpPage';
import HomePage from './Pages/HomePage/HomePage';
import ResetPWPage from './Pages/Authenticate/ResetPWPage';
import ProfilePage from './Pages/Profile/ProfilePage';
// import MainHeader from './components/UIElement/MainHeader';
import MainNavigation from './components/UIElement/MainNavigation';
import Footer from './components/UIElement/Footer';
import ProductPage from './Pages/Product/ProductPage';
import getCookie from './ultis/getCookie';

import './App.css';
function App() {
  const usernameEncoded = getCookie('username');
  const username = decodeURIComponent(usernameEncoded);
  return (
    <React.Fragment>
      <Router>
        <div className="App">
          <MainNavigation />
          <div className='App-body'>
            <Routes>
              <Route exact path="/" element={<HomePage />} />
              {username !== 'false' ? <Route path="/login" element={<ProfilePage />} />
                : <Route path="/login" element={<LoginPage />} />}
              {username !== 'false' ? <Route path="/signup" element={<ProfilePage />} />
                : <Route path="/signup" element={<SignUpPage />} />}
              <Route path="/reset-password" element={<ResetPWPage />} />
              {username !== 'false' ? <Route path="/my-profile" element={<ProfilePage />} />
                : <Route path="/my-profile" element={<LoginPage />} />}
              <Route path='/chi-tiet-san-pham/:pid' element={<ProductPage />} />
            </Routes>
          </div>
          <div className="App-footer">
            <Footer />
          </div>
        </div>
      </Router>
    </React.Fragment>
  );
}

export default App;
