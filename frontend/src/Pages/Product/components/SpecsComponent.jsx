import React from 'react';
import {Table} from 'react-bootstrap';

import './SpecsComponent.css';

const SpecsComponent = () => {
  return (
    <div className='specs-container'>
        <h2>Thông số kỹ thuật</h2>
        <Table >
            <thead>
                <tr>
                    <th className='custom-column__first'></th>
                    <th className='custom-column__second'></th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>CPU:</td>
                    <td>Ryzen 56600H3.3GHz</td>
                </tr>
                <tr>
                    <td>RAM:</td>
                    <td>16 GBDDR5 2 khe (1 khe 8 GB + 1 khe 8 GB)4800 MHz</td>
                </tr>
                <tr>
                    <td>Kích thước, khối lượng:</td>
                    <td>Dài 370 mm - Rộng 260 mm - Dày 23.5 mm - Nặng 2.4 kg</td>
                </tr>
            </tbody>
        </Table>
    </div>
  )
}

export default SpecsComponent