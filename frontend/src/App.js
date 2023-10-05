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
  return (
    <React.Fragment>
      <Router>
        <div className="App">
          <MainNavigation />
          <div className='App-body'>
            <Routes>
              <Route exact path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/reset-password" element={<ResetPWPage />} />
              <Route path="/my-profile" element={<ProfilePage />} />
            </Routes>
          </div>
        </div>
      </Router>
    </React.Fragment>
  );
}

export default App;
