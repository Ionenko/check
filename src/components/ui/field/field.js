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
      <TextFiled className={f('element')} id={id} {...props}/>
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
};

Field.propTypes = {
  label: PropTypes.any,
  error: PropTypes.any,
  valid: PropTypes.any,
  type: PropTypes.any,
  value: PropTypes.any,
};

export default Field;