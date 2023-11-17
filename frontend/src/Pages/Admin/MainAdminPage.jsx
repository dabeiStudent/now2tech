import React, { useState } from 'react';
import OrdersContent from './components/OrdersContent';
import ProductsContent from './components/ProductsContent';
import UsersContent from './components/UsersContent';
import SettingsContent from './components/SettingsContent';
import DashboardContent from './components/DashboardContent';

import './MainAdminPage.css';

const MainAdminPage = () => {
    const [selectedContent, setSelectedContent] = useState('dashboard');

    const handleTabClick = (content) => {
        setSelectedContent(content);
    };

    return (
        <div className="admin-dashboard">
            <div className="sidebar">
                <ul>
                    <li
                        className={selectedContent === 'dashboard' ? 'active' : ''}
                        onClick={() => handleTabClick('dashboard')}
                    >
                        Dashboard
                    </li>
                    <li
                        className={selectedContent === 'orders' ? 'active' : ''}
                        onClick={() => handleTabClick('orders')}
                    >
                        Orders
                    </li>
                    <li
                        className={selectedContent === 'products' ? 'active' : ''}
                        onClick={() => handleTabClick('products')}
                    >
                        Products
                    </li>
                    <li
                        className={selectedContent === 'users' ? 'active' : ''}
                        onClick={() => handleTabClick('users')}
                    >
                        Users
                    </li>
                    <li
                        className={selectedContent === 'settings' ? 'active' : ''}
                        onClick={() => handleTabClick('settings')}
                    >
                        Settings
                    </li>
                </ul>
            </div>
            <div className="content">
                {selectedContent === 'dashboard' && <DashboardContent />}
                {selectedContent === 'orders' && <OrdersContent />}
                {selectedContent === 'products' && <ProductsContent />}
                {selectedContent === 'users' && <UsersContent />}
                {selectedContent === 'settings' && <SettingsContent />}
            </div>
        </div>
    );
};

export default MainAdminPage;