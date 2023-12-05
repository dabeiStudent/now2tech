import React, { useContext, useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faCartShopping, faPhone, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './NavLinks.css';
import { CartContext } from '../../ultis/cartContext';
import { formatPrice } from "../../ultis/formatPrice";
import StarRating from "../../Pages/Product/components/StarRating";
import SearchItem from "./SearchItem";

const NavLinks = () => {
    const [authorizedUser, setAuthorizeUser] = useState({
        userName: '',
        role: ''
    });
    const [products, setProducts] = useState([]);
    const [goodProducts, setGoodProduct] = useState([]);
    const [isSearch, setIsSearch] = useState(false);
    const [searchKeyword, setSearchKeyword] = useState('');
    const location = useLocation();
    const navigate = useNavigate();
    const [latedSearch, setLatedSearch] = useState([]);

    const cart = useContext(CartContext);
    const { items } = cart;

    const openSearchHandler = () => {
        setIsSearch(true);
    }

    const closeSearchHandler = () => {
        setIsSearch(false);
    };

    const searchKeywordChangeHandler = (e) => {
        setSearchKeyword(e.target.value);
        setIsSearch(true);
    };

    const submitHandler = (e) => {
        e.preventDefault();
        document.getElementById('search-box').blur();
        if (searchKeyword.trim()) {
            navigate(`/tim-kiem/${searchKeyword}/1`);
            setIsSearch(false)
        } else {
            navigate('/')
        }
    }
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/product/get-all-product?keyword=${searchKeyword}`)
            .then(result => {
                setProducts(result.data.result);
            })
            .catch(err => {
                toast(err);
            })
    }, [searchKeyword]);
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/product/get-good-product`)
            .then(result => {
                setGoodProduct(result.data.result);
            })
            .catch(err => {
                toast(err);
            })
    }, [searchKeyword])
    useEffect(() => {
        if (location.pathname !== `/tim-kiem/${searchKeyword}`) {
            setSearchKeyword('');
        }
    }, [location])
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/user/authorize-user`, { withCredentials: true })
            .then(result => {
                setAuthorizeUser({
                    userName: result.data.name,
                    role: result.data.role
                });
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    const gotoProductHandle = () => {
        setSearchKeyword('');
        setIsSearch(false);
    }
    return (
        <React.Fragment>
            <ToastContainer />
            <ul className="nav-links">
                <li className="list-of-search" onMouseLeave={closeSearchHandler}>
                    <form onSubmit={submitHandler} className="nav-links__search">
                        <input className="input-search" autoComplete="off" id="search-box" value={searchKeyword} onChange={searchKeywordChangeHandler} onClick={openSearchHandler} type="text" placeholder="Bạn tìm gì..." />
                        <button>
                            <FontAwesomeIcon className="nav-links__icon-glass" icon={faMagnifyingGlass} />
                        </button>
                    </form>
                    {isSearch && (
                        <div className="search-menu-container">
                            {products.length > 0 && searchKeyword !== ''
                                ? <div className="search-menu-body">
                                    <div className="recommend">
                                        <p>Kết quả tìm kiếm: </p>
                                    </div>
                                    {products.map((product) => (
                                        <SearchItem 
                                            key={product._id}
                                            gotoProductHandle={gotoProductHandle}
                                            id={product._id}
                                            name={product.name}
                                            rating={product.avgRating}
                                            price={product.sellPrice}
                                            image={product.pimage[0]}/>
                                    ))
                                    }
                                </div>
                                : <div className="search-menu-body">
                                    <div className="not-found">
                                        <p>Chúng tôi có vài gợi ý cho bạn</p>
                                    </div>
                                    <div className="recommend">
                                        <p>Sản phẩm gợi ý: </p>
                                    </div>
                                    {goodProducts.map(product => (
                                        <SearchItem 
                                            key={product._id}
                                            gotoProductHandle={gotoProductHandle}
                                            id={product._id}
                                            name={product.name}
                                            rating={product.avgRating}
                                            price={product.sellPrice}
                                            image={product.pimage[0]}/>
                                    ))
                                    }
                                </div>}
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
                {authorizedUser.userName !== 'khách hàng' ? (
                    <li>
                        <div className="dropdown-element">
                            <button className="dropdown-element__btn">{authorizedUser.userName} ({authorizedUser.role})<FontAwesomeIcon className="nav-links__icon-login" icon={faUserCircle} /></button>
                            <div className="dropdown-element__menu">
                                <NavLink to='/my-profile'>Tài khoản của tôi</NavLink>

                                {authorizedUser.role === "admin" && (
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
            </ul>
        </React.Fragment>
    )
}

export default NavLinks