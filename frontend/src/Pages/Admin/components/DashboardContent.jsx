import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faChartSimple } from '@fortawesome/free-solid-svg-icons';
import { faCreditCard, faFileLines } from '@fortawesome/free-regular-svg-icons';
import axios from 'axios';

import './DashboardContent.css';
import { formatPrice } from '../../../ultis/formatPrice';
import ChartCompenent from './ChartCompenent';
import LineChartComponent from './LineChartComponent';
import Loader from '../../../components/UIElement/Loader';
import BarChartComponent from './BarChartComponent';

const DashboardContent = () => {
    const [statistic, setStatistic]= useState(null);
    const [userStats, setUserStats]= useState(null);
    const [salesStats, setSalesStats]= useState(null);

    const year= 2023;


    useEffect(()=> {
        const getStatistic= async ()=> {
            await axios.get('http://localhost:5000/statistic/get-statistic', { withCredentials: true})
            .then(res=> {
                setStatistic(res.data)})
            .catch(err=> console.log(err))
        }
        getStatistic();
    }, []);

    useEffect(()=> {
        const getUserStats= async(req, res)=> {
          await axios.get(`http://localhost:5000/statistic/user-statistic?year=${year}`, {withCredentials: true})
          .then(res=> {
            setUserStats(res.data);
          })
          .catch(err=> console.log(err));
        }
        getUserStats();
    }, []);

    useEffect(()=> {
        const getSalesStats= async(req, res)=> {
          await axios.get(`http://localhost:5000/statistic/sales-statistic?year=${year}`, { withCredentials: true })
          .then(res=> {
            setSalesStats(res.data);
          })
          .catch(err=> console.log(err));
        }
        getSalesStats();
    }, []);

    return (
        <React.Fragment>
            <div className='dashboard'>
            {(statistic && userStats) ? (
            <div className='dashboard-component'>
                <div className="stats-bar">
                    <div className="stats-card">
                        <div className='stats-card__icon'>
                            <FontAwesomeIcon icon={faChartSimple}/>
                        </div>
                        <p>Số lượng sản phẩm</p>
                        <h3>{statistic.productTotal}</h3>
                    </div>
                    <div className="stats-card">
                        <div className='stats-card__icon'>
                            <FontAwesomeIcon icon={faFileLines}/>
                        </div>
                        <p>Số lượng đơn hàng</p>
                        <h3>{statistic.orderTotal}</h3>
                    </div>
                    <div className="stats-card">
                        <div className='stats-card__icon'>
                            <FontAwesomeIcon icon={faUsers}/>
                        </div>
                        <p>Số lượng người dùng</p>
                        <h3>{statistic.userTotal}</h3>
                    </div>
                    <div className="stats-card">
                        <div className='stats-card__icon'>
                            <FontAwesomeIcon icon={faCreditCard}/>
                        </div>
                        <p>Tổng doanh thu</p>
                        <h3>{formatPrice(salesStats.totalSales)}</h3>
                    </div>
                </div>
                <div className="chart-container">
                    <div className="chart-container__left">
                        <div className='user-chart'>
                            <ChartCompenent orderStats={statistic.orderStats}/>
                        </div>
                        <div>
                            <BarChartComponent monthlyStats={userStats.monthlyStats}/>
                        </div>
                    </div>
                    <div className="chart-container__right">
                        <LineChartComponent monthlyStats={salesStats.monthlyStats}/>
                    </div>

                </div>
            </div>) : (<Loader/>)}
            </div>
        </React.Fragment>
    )
}

export default DashboardContent