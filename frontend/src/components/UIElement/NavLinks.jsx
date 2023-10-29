import React, {useContext} from "react";
import { NavLink } from 'react-router-dom';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faCartShopping, faPhone, faUser, faArrowRightToBracket, faBarsProgress } from '@fortawesome/free-solid-svg-icons'

import getCookie from "../../ultis/getCookie";
import './NavLinks.css';
import { CartContext } from '../../ultis/cartContext';

const NavLinks = () => {
    const usernameEncoded = getCookie('username');
    const username = decodeURIComponent(usernameEncoded);
    const roleEncoded = getCookie('role');
    const role = decodeURIComponent(roleEncoded);
    const userLoggedIn = {
        userName: username,
        role: role
    }
    const cart= useContext(CartContext);
    const {items}= cart;
   
    return (
        <ul className="nav-links">
            <li>
                <form className="nav-links__search" action="/search">
                    <input type="text" placeholder="Bạn tìm gì..." />
                    <button>
                        <FontAwesomeIcon className="nav-links__icon-glass" icon={faMagnifyingGlass} />
                    </button>
                </form>

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
                            <span className="nav-links__cart-number">{items.reduce((acc, current)=> acc + current.qty, 0)}</span>
                        }
                        
                    </div>
                    <span>Giỏ hàng</span>
                </NavLink>
            </li>
            {username !== 'false' ? (
                <li>
                    <div className="dropdown-element">
                        <button className="dropdown-element__btn"><FontAwesomeIcon className="nav-links__icon-login" icon={faUser} />Hello, {userLoggedIn.userName} ({userLoggedIn.role})</button>
                        <div className="dropdown-element__menu">
                            <NavLink to='/my-profile'>Tài khoản của tôi</NavLink>
                            
                            {username === "admin" && (
                                <NavLink to="/now2tech-management" className="nav-links__login">
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
                        <FontAwesomeIcon className="nav-links__icon-login" icon={faArrowRightToBracket} />
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