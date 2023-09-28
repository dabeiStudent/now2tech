import React from "react";

import './MainHeader.css';
const MainHeader = () => {
    return (
        <header className="Header">
            <div className="Header_logo">
                <a href="/">Now2Tech</a>
            </div>
            <div className="Header_category">
                <h2>Danh mục</h2>
            </div>
            <div className="Header_search_bar">
                <input />
            </div>
        </header>
    )
}

export default MainHeader;