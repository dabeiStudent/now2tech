import React from 'react';
import {Table} from 'react-bootstrap';

import './SpecsComponent.css';

const SpecsComponent = props => {
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
                {props.specs && props.specs.map(spec=> (
                    <tr key={spec._id}>
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