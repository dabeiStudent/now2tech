import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './Pages/Authenticate/LoginPage';
import SignUpPage from './Pages/Authenticate/SignUpPage';
import HomePage from './Pages/HomePage/HomePage';
import ResetPWPage from './Pages/Authenticate/ResetPWPage';
import ProfilePage from './Pages/Profile/ProfilePage';
// import MainHeader from './components/UIElement/MainHeader';
import MainNavigation from './components/UIElement/MainNavigation';


function App() {
  const userLoggedIn = JSON.parse(localStorage.getItem('user'));
  return (
    <React.Fragment>
      <Router>
        <div className="App">
          <MainNavigation />
          <div className='App-body'>
            <Routes>
              <Route exact path="/" element={<HomePage />} />
              {userLoggedIn ? <Route path="/login" element={<ProfilePage />} />
                : <Route path="/login" element={<LoginPage />} />}
              {userLoggedIn ? <Route path="/signup" element={<ProfilePage />} />
                : <Route path="/signup" element={<SignUpPage />} />}
              <Route path="/reset-password" element={<ResetPWPage />} />
              {userLoggedIn ? <Route path="/my-profile" element={<ProfilePage />} />
                : <Route path="/my-profile" element={<LoginPage />} />}
            </Routes>
          </div>
        </div>
      </Router>
    </React.Fragment>
  );
}

export default App;
