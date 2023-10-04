import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './Pages/LoginPage';
import SignUpPage from './Pages/SignUpPage';
import HomePage from './Pages/HomePage';
// import MainHeader from './components/UIElement/MainHeader';
import MainNavigation from './components/UIElement/MainNavigation';
import ResetPWPage from './Pages/ResetPWPage';

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
            </Routes>
          </div>
        </div>
      </Router>
    </React.Fragment>
  );
}

export default App;
