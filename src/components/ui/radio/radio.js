import React from 'react';
import block from 'bem-cn-lite';
import './radio.scss';
import PropTypes from 'prop-types';

const b = block('btn-radio');

const Radio = (props) => {
  const {
    id,
    label,
    checked,
    name,
    value,
  } = props;
  return (
    <label htmlFor={id} className={b({ active: !!checked }, 'btn')}>
      <input
        {...props}
        id={id}
        type="radio"
        checked={checked}
        name={name}
        value={value}
      />
      <span>{label}</span>
    </label>
  );
};

Radio.defaultProps = {
  label: '',
};

Radio.propTypes = {
  id: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  label: PropTypes.string,
  checked: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.bool.isRequired,
};

export default Radio;
