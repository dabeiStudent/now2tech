import React, { useContext, useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faCartShopping, faPhone, faUserCircle } from '@fortawesome/free-solid-svg-icons';

import './NavLinks.css';
import { CartContext } from '../../ultis/cartContext';
import getCookie from "../../ultis/getCookie";
const NavLinks = () => {
    const usernameEncoded = getCookie('username');
    const username = decodeURIComponent(usernameEncoded);
    const roleEncoded = getCookie('role');
    const role = decodeURIComponent(roleEncoded);
    const userLoggedIn = {
        userName: username,
        role: role
    };
    let { keyword }= useParams();
    const [isSearch, setIsSearch]= useState(false);
    const [searchKeyword, setSearchKeyword]= useState('');
    const location= useLocation();
    const navigate= useNavigate();
    const [latedSearch, setLatedSearch]= useState([]);

    const cart = useContext(CartContext);
    const { items } = cart;

    const openSearchHandler= ()=> {
        setIsSearch(true);
    }

    const closeSearchHandler= ()=> {
        setIsSearch(false);
    };

    const searchKeywordChangeHandler= (e)=>{
        setSearchKeyword(e.target.value)
    };

    const submitHandler= (e)=> {
        e.preventDefault();
        document.getElementById('search-box').blur();
        if(searchKeyword.trim()){
            navigate(`/tim-kiem/${searchKeyword}`);
        } else{
            navigate('/')
        }          
    }

    useEffect(()=> {
        if(location.pathname !== `/tim-kiem/${searchKeyword}`){
            setSearchKeyword('');
        }
    }, [location])


    // useEffect(() => {
    //     axios.get('http://localhost:5000/user/after-login', { withCredentials: true })
    //         .then(result => {
    //             setUserLogin(result.data);
    //             setLogin(!isLogged)
    //         })
    //         .catch(err => {
    //             console.log(err);
    //             setUserLogin({
    //                 userName: '',
    //                 role: ''
    //             })
    //         })
    // }, [isLogged])
    return (
        <ul className="nav-links">
            <li>
                <form onSubmit={submitHandler} className="nav-links__search">
                    <input autoComplete="off" id="search-box" value={searchKeyword} onChange={searchKeywordChangeHandler} onBlur={closeSearchHandler} onFocus={openSearchHandler} type="text" placeholder="Bạn tìm gì..." />
                    <button>
                        <FontAwesomeIcon className="nav-links__icon-glass" icon={faMagnifyingGlass} />
                    </button>
                </form>
                {isSearch && (
                    <div className="search-menu-container">
                        <div className="search-menu-body">
                            <span>{searchKeyword}</span>
                        </div>
                    </div>
                )}
                

            </li>
            <li>
                <FontAwesomeIcon className="nav-links__icon-phone" icon={faPhone} />
                <div>
                    <span className="span-text">Gọi đặt hàng</span><br />
                    <span className="span-phoneNumber">0123.456.789</span>
                </div>

            </li>
            <li>
                <NavLink to="/gio-hang" className="nav-links__cart">
                    <div className="nav-links__box-cart">
                        <FontAwesomeIcon className="nav-links__icon-cart" icon={faCartShopping} />
                        {items.length > 0 &&
                            <span className="nav-links__cart-number">{items.reduce((acc, current) => acc + current.qty, 0)}</span>
                        }

                    </div>
                    {/* <span>Giỏ hàng</span> */}
                </NavLink>
            </li>
            {userLoggedIn.userName !== 'false' ? (
                <li>
                    <div className="dropdown-element">
                        <button className="dropdown-element__btn">{userLoggedIn.userName} ({userLoggedIn.role})<FontAwesomeIcon className="nav-links__icon-login" icon={faUserCircle} /></button>
                        <div className="dropdown-element__menu">
                            <NavLink to='/my-profile'>Tài khoản của tôi</NavLink>

                            {userLoggedIn.userName === "admin" && (
                                <NavLink to="/now2tech-management">
                                    Quản lý
                                    {/* <FontAwesomeIcon className="nav-links__icon-login" icon={faBarsProgress} /> */}
                                    {/* <span>Quản lý</span> */}
                                </NavLink>
                            )}
                        </div>
                    </div>
                </li>
            ) : (
                <li>
                    <NavLink to="/login" className="nav-links__login">
                        {/* <FontAwesomeIcon className="nav-links__icon-login" icon={faArrowRightToBracket} /> */}
                        <span>Đăng nhập</span>
                    </NavLink>
                </li>
            )}
            {/* //  <li>
                //     <NavLink to='/my-profile' className="nav-links__login">
                //         <FontAwesomeIcon className="nav-links__icon-login" icon={faUser} />
                //         <span>Hello, {userLoggedIn.userName} ({userLoggedIn.role})</span>
                //     </NavLink>
                // </li> */}
            {/* <li>
                <NavLink to="/history">
                    <FontAwesomeIcon className="nav-links__icon-user" icon={faUser} />
                    <span>Tài khoản và đơn hàng</span>
                </NavLink>
            </li> */}

        </ul>
    )
}

export default NavLinks