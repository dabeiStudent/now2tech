import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faChartSimple } from '@fortawesome/free-solid-svg-icons';
import { faCreditCard, faFileLines } from '@fortawesome/free-regular-svg-icons';

import './DashboardContent.css';
import { formatPrice } from '../../../ultis/formatPrice';
import ChartCompenent from './ChartCompenent';
import LineChartComponent from './LineChartComponent';

const DashboardContent = () => {

    return (
        <div className='dashboard-component'>
            <div className="stats-bar">
            
                <div className="stats-card">
                    <div className='stats-card__icon'>
                        <FontAwesomeIcon icon={faChartSimple}/>
                    </div>
                    <p>Số lượng sản phẩm</p>
                    <h3>200</h3>
                </div>
                <div className="stats-card">
                    <div className='stats-card__icon'>
                        <FontAwesomeIcon icon={faFileLines}/>
                    </div>
                    <p>Số lượng đơn hàng</p>
                    <h3>5000</h3>
                </div>
                <div className="stats-card">
                    <div className='stats-card__icon'>
                        <FontAwesomeIcon icon={faUsers}/>
                    </div>
                    <p>Số lượng người dùng</p>
                    <h3>5000</h3>
                </div>
                <div className="stats-card">
                    <div className='stats-card__icon'>
                        <FontAwesomeIcon icon={faCreditCard}/>
                    </div>
                    <p>Tổng doanh thu</p>
                    <h3>{formatPrice(500000000)}</h3>
                </div>
            </div>
            <div className="chart-container">
                <div className="chart-container__left">
                    <div className='user-chart'>
                        <ChartCompenent/>
                    </div>
                    <div>
                        <ChartCompenent/>
                    </div>
                </div>
                <div className="chart-container__right">
                    <LineChartComponent/>
                </div>

            </div>
        </div>
    )
}

export default DashboardContent