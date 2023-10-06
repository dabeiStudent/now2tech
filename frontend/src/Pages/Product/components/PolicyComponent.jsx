import React from 'react';

import './PolicyComponent.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBoxOpen, faShieldHalved, faClockRotateLeft } from '@fortawesome/free-solid-svg-icons'

const PolicyComponent = () => {
  return (
    <div className='policy'>
        <ul className='policy-list'>
            <li>
              <div className='policy-icons'>
                <FontAwesomeIcon className='policy-icon' icon={faClockRotateLeft}/>
              </div>
              <p>1 đổi 1 trong vòng <strong>12 tháng</strong> trên toàn quốc hoàn toàn miễn phí</p>
            </li>
            <li>
              <div className='policy-icons'>
                <FontAwesomeIcon className='policy-icon' icon={faBoxOpen}/>
              </div>
              <p>Bộ sản phẩm gồm: Hộp, sách hướng dẫn, Cây lấy sim, Củ sạc, Cáp sạc  </p>
            </li>
            <li>
              <div className='policy-icons'>
                <FontAwesomeIcon className='policy-icon' icon={faShieldHalved}/>
              </div>
              <p>Bảo hành<strong> chính hãng 18 tháng</strong> tại các trung tâm bảo hành</p>
            </li>
        </ul>
        
    </div>
  )
}

export default PolicyComponent;
