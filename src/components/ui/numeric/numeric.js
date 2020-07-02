import React from 'react';
import InputNumber from 'rc-input-number';
import 'rc-input-number/assets/index.css';
import './numeric.scss';
import arrowDownIcon from '../../../img/arrow-down.svg';

const formatNumber = (x) => {
  const n = parseInt(x);
  return n >= 10 || n === 0 ? n :  '0' + n;
};

const Numeric = (props) => {
  const baseHandler = (<img src={arrowDownIcon} alt="arrow icon"/>);

  return (
    <InputNumber
      upHandler={baseHandler}
      downHandler={baseHandler}
      formatter={formatNumber}
      {...props}
    />
  )

};
export default Numeric;