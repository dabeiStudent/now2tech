import logo from './logo.svg';
import './App.css';

import MainHeader from './components/UIElement/MainHeader';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/Pages/LoginPage';
import HomePage from './components/Pages/HomePage';

function App() {
  return (
    <React.Fragment>
      <Router>
        <div className="App">
          <MainHeader />
          <div className='App-body'>
            <Routes>
              <Route exact path="/" element={<HomePage />} />
              <Route exact path="/login" element={<LoginPage />} />
            </Routes>
          </div>
        </div>
      </Router>
    </React.Fragment>
  );
}

export default App;
