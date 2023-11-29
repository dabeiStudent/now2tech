import React, { useEffect, useState } from 'react';
import axios from 'axios';

import './VoucherList.css';
import VoucherCard from './VoucherCard';

const VoucherList = props => {
  const [vouchers, setVoucher] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/voucher/get-all-voucher`)
      .then(res => {
        setVoucher(res.data)
      })
      .catch(err => {
        console.log(err);
      })
  }, [])

  return (
    <ul className='voucher-list'>
      {vouchers.map(voucher => (
        <VoucherCard key={voucher._id}
          id={voucher._id}
          name={voucher.name} />
      ))}
    </ul>
  )
}

export default VoucherList;
