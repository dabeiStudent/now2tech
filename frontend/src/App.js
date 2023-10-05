import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './Pages/LoginPage';
import HomePage from './Pages/HomePage/HomePage'
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
              {/* <Route exact path="/login" element={<LoginPage />} /> */}
            </Routes>
          </div>
        </div>
      </Router>
      <Router>
        <Routes>
          <Route path="/login" element= {<LoginPage/>}/>
        </Routes>
        
      </Router>
    </React.Fragment>
  );
}

export default App;
