import React from "react";
import NavLinks from "./NavLinks";
import { NavLink } from "react-router-dom";

import './MainHeader.css';
const MainHeader = () => {

    return (
        <header className="main-header">
            <h1 className="main-header_logo">
                <NavLink end to='/' >NOW2Tech</NavLink>
            </h1>
            <nav className="navigation-links">
                <NavLinks />
            </nav>
        </header>
    )
}

export default MainHeader;