import React from 'react';
import PropTypes from 'prop-types';
import block from 'bem-cn-lite'
import './field.scss';

const f = block('field');


const Field = ({id, label, error, valid, multiline, ...props}) => {

  const TextFiled = !multiline ? `input` : 'textarea';

  return (
    <div className={f({
      valid,
      error : !!error,
    })}>
      {
        label ? <label htmlFor={id} className={f('label')}>
          {label}
        </label> : null
      }
      <TextFiled onChange={(e) => console.log(e.target.value)} className={f('element')} id={id} {...props}/>
      {
        error ? <span className={f('message', {error: !!error})}>
          {error}
        </span> : null
      }
    </div>
  );
};

Field.defaultProps = {
  type: 'text',
  value: '',
  label: null,
  error: null,
  valid: true,
  multiline: false
};

Field.propTypes = {
  id: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  label: PropTypes.string,
  error: PropTypes.string,
  valid: PropTypes.bool,
  multiline: PropTypes.bool,
  type: PropTypes.string,
};

export default Field;