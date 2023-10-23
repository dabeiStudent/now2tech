import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { faMessage } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';

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
import Chat from './components/UIElement/Chat';
import CartPage from './Pages/Cart/CartPage';
import ScrollToTop from './ultis/scrollToTop';
import { CartContext } from './ultis/cartContext';
import { useCart } from './ultis/cartHooks';
import Shipping from './Pages/Cart/Shipping';
import { OrderContext } from './ultis/orderContext';
import { useOrder } from './ultis/orderHooks';
import MainAdminPage from './Pages/Admin/MainAdminPage';
import OrderPage from './Pages/Order/OrderPage';

import './App.css';

function App() {
  const usernameEncoded = getCookie('username');
  const username = decodeURIComponent(usernameEncoded);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleChatButtonClick = () => {
    setIsChatOpen(true);
  };

  const { cartItems, addToCart, reduceQty, increaseQty, deleteItem } = useCart();
  const { selectedItems, address, setSelectedItems, setAddress } = useOrder();

  return (
    <React.Fragment>
      <PayPalScriptProvider deferLoading={true}>
      <CartContext.Provider value={{
        items: cartItems,
        addToCart: addToCart,
        reduceQty: reduceQty,
        increaseQty: increaseQty,
        deleteItem: deleteItem
      }}>
        <OrderContext.Provider value={{
          selectedItems: selectedItems,
          address: address,
          setSelectedItems: setSelectedItems,
          setAddress: setAddress
        }}>
          
            <Router>
              <div className="App">
                <MainNavigation />
                <div className='App-body'>
                  <ScrollToTop />
                  <Routes>
                    <Route exact path="/" element={<HomePage />} />
                    <Route exact path='/chi-tiet-san-pham/:pid' element={<ProductPage />} />

                    <Route exact path='/gio-hang' element={<CartPage />} />
                    <Route exact path='/thong-tin-giao-hang' element={<Shipping />} />
                    <Route exact path='/chi-tiet-don-hang/:oid' element={<OrderPage/>}/>


                    {username === "admin"
                      && <Route exact path="/now2tech-management" element={<MainAdminPage />} />}
                    {username !== 'false' ? <Route path="/login" element={<ProfilePage />} />
                      : <Route path="/login" element={<LoginPage />} />}
                    {username !== 'false' ? <Route path="/signup" element={<ProfilePage />} />
                      : <Route path="/signup" element={<SignUpPage />} />}
                    <Route path="/reset-password" element={<ResetPWPage />} />
                    {username !== 'false' ? <Route path="/my-profile" element={<ProfilePage />} />
                      : <Route path="/my-profile" element={<LoginPage />} />}
                  </Routes>
                </div>
                <div className="App-footer">
                  {username !== "admin" && <Footer />}
                </div>
                {!isChatOpen && username !== "admin" ?
                  < button className="chat-button" onClick={handleChatButtonClick} >
                    <FontAwesomeIcon icon={faMessage} />
                  </button>
                  : <></>
                }
                {isChatOpen && <Chat />}
              </div>
            </Router>
          
          
        </OrderContext.Provider>
      </CartContext.Provider>
      </PayPalScriptProvider>              
    </React.Fragment >
  );
}

export default App;
