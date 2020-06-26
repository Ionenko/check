import React from 'react';
import block from 'bem-cn-lite';
import './radio.scss';

const b = block('btn-radio');

const Radio = ({id, onChange, label, checked, ...props}) => {
  return (
    <label htmlFor={id} className={b({ active: !!checked }, 'btn')}>
      <input id={id} onChange={onChange} type="radio" checked={checked} {...props} />
      <span>{label}</span>
    </label>
  );
};

export default Radio;