import React, { useState } from 'react';
import OrdersContent from './components/OrdersContent';
import ProductsContent from './components/ProductsContent';
import UsersContent from './components/UsersContent';
import DashboardContent from './components/DashboardContent';
import ChatContent from './components/ChatContent';
import VouchersContent from './components/VouchersContent';

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
                        className={selectedContent === 'vouchers' ? 'active' : ''}
                        onClick={() => handleTabClick('vouchers')}
                    >
                        Vouchers
                    </li>
                    <li
                        className={selectedContent === 'chat' ? 'active' : ''}
                        onClick={() => handleTabClick('chat')}
                    >
                        Messages
                    </li>
                </ul>
            </div>
            <div className="content">
                {selectedContent === 'dashboard' && <DashboardContent />}
                {selectedContent === 'orders' && <OrdersContent />}
                {selectedContent === 'products' && <ProductsContent />}
                {selectedContent === 'users' && <UsersContent />}
                {selectedContent === 'chat' && <ChatContent />}
                {selectedContent === 'vouchers' && <VouchersContent />}
            </div>
        </div>
    );
};

export default MainAdminPage;