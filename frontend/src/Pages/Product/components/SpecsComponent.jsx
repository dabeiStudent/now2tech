import React from 'react';
import {Table} from 'react-bootstrap';

import './SpecsComponent.css';

const SpecsComponent = props => {
  return (
    <div className='specs-container'>
        
        <h2>Thông số kỹ thuật</h2>
        <Table >
            <thead className='custom-table-head'>
                <tr>
                    <th className='custom-column__first'></th>
                    <th className='custom-column__second'></th>
                </tr>
            </thead>
            <tbody className='custom-table-body'>
                {props.specs && props.specs.map((spec, index)=> (
                    <tr key={spec._id} className={index % 2 === 0 && "grey"}>
                        <td>{spec.stype}</td>
                        <td>{spec.sdetail}</td>
                    </tr>

                ))}
            </tbody>
        </Table>
    </div>
  )
}

export default SpecsComponent