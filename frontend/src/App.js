import React, { useState, useEffect, useCallback, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { faMessage } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import getCookie from './ultis/getCookie';
import { CartContext } from './ultis/cartContext';
import { useCart } from './ultis/cartHooks';
import { OrderContext } from './ultis/orderContext';
import { useOrder } from './ultis/orderHooks';
import { AuthContext } from './ultis/authContext';
import ScrollToTop from './ultis/scrollToTop';
import './App.css';

import MainNavigation from './components/UIElement/MainNavigation';
import Footer from './components/UIElement/Footer';
import Loader from './components/UIElement/Loader';
import HomePage from './Pages/HomePage/HomePage';
import LoginPage from './Pages/Authenticate/LoginPage';
import ProfilePage from './Pages/Profile/ProfilePage';
const SignUpPage = React.lazy(() => import('./Pages/Authenticate/SignUpPage'));
// const HomePage= React.lazy(()=> import('./Pages/HomePage/HomePage'));
const ResetPWPage = React.lazy(() => import('./Pages/Authenticate/ResetPWPage'));
const ProductPage = React.lazy(() => import('./Pages/Product/ProductPage'));
const Chat = React.lazy(() => import('./components/UIElement/Chat'));
const CartPage = React.lazy(() => import('./Pages/Cart/CartPage'));
const Shipping = React.lazy(() => import('./Pages/Cart/Shipping'));
const MainAdminPage = React.lazy(() => import('./Pages/Admin/MainAdminPage'));
const OrderPage = React.lazy(() => import('./Pages/Order/OrderPage'));
const VNPayPayment = React.lazy(() => import('./Pages/Order/VNPayPayment'));
const VoucherPage = React.lazy(() => import('./Pages/Voucher/VoucherPage'));
const SearchResultPage = React.lazy(() => import('./Pages/Search/SearchResultPage'));
const FilterByCategory = React.lazy(() => import('./Pages/Search/FilterByCategory'));

function App() {
  const usernameEncoded = getCookie('username');
  const username = decodeURIComponent(usernameEncoded);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const [isLogin, setIsLogin] = useState(false);

  const handleChatButtonClick = () => {
    setIsChatOpen(true);
  };

  const { cartItems, addToCart, reduceQty, increaseQty, deleteItem, setCartItems } = useCart();
  const { selectedItems, address, setSelectedItems, setAddress } = useOrder();

  const login = useCallback(() => {
    setIsLogin(true);
  }, []);

  const logout = useCallback(() => {
    setIsLogin(false);
  }, [])

  useEffect(() => {
    const usernameEncoded = getCookie('username');
    const username = decodeURIComponent(usernameEncoded);

    if (username !== 'false') {
      login();
    }
  }, [login])

  return (
    <React.Fragment>
      <AuthContext.Provider value={{ isLogin: isLogin, login: login, logout: logout, username: username }}>
        <CartContext.Provider value={{
          items: cartItems,
          addToCart: addToCart,
          reduceQty: reduceQty,
          increaseQty: increaseQty,
          deleteItem: deleteItem,
          setCartItems: setCartItems
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
                <Suspense fallback={<Loader />}>
                  <div className='App-body'>
                    <ScrollToTop />
                    <Routes>
                      <Route exact path="/" element={<HomePage />} />
                      <Route exact path='/chi-tiet-san-pham/:pid' element={<ProductPage />} />
                      <Route exact path='/gio-hang' element={<CartPage />} />
                      <Route exact path='/thong-tin-giao-hang' element={<Shipping />} />
                      <Route exact path='/chi-tiet-don-hang/:oid' element={<OrderPage />} />
                      <Route exact path='/thanh-toan/vnpay/:oid' element={<VNPayPayment />} />
                      <Route exact path='/khuyen-mai/:vid' element={<VoucherPage />} />
                      <Route exact path='/tim-kiem/:keyword/:page' element={<SearchResultPage />} />
                      <Route exact path='/loctheodanhmuc/:category/:brand/:minp/:maxp/:page' element={<FilterByCategory />} />
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
                  {!isChatOpen && username !== "admin" ?
                    < button className="chat-button" onClick={handleChatButtonClick} >
                      <FontAwesomeIcon icon={faMessage} />
                    </button>
                    : <></>
                  }
                  {isChatOpen && <Chat />}
                </Suspense>
                <div className="App-footer">
                  <Footer />
                </div>

              </div>
            </Router>
          </OrderContext.Provider>
        </CartContext.Provider>
      </AuthContext.Provider>
    </React.Fragment >
  );
}

export default App;
