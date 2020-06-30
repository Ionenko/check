import React from 'react';
import block from 'bem-cn-lite';
import './radio.scss';

const b = block('btn-radio');

const Radio = (props) => {
  const {id, label, checked, name, value} = props;
  return (
    <label htmlFor={id} className={b({ active: !!checked }, 'btn')}>
      <input
        id={id}
        type="radio"
        checked={checked}
        name={name}
        value={value}
        {...props}
      />
      <span>{label}</span>
    </label>
  );
};

export default Radio;