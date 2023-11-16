import React from "react";

import './Loader.css';
const Loader = () => {
    return (
        <div className="loading-component">
            <div className="spinner">
                <div className="loader"></div>
            </div>
            <p>Đang tải...</p>
        </div>
    )
};

export default Loader;