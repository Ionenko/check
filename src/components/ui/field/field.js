import React from 'react';
import PropTypes from 'prop-types';
import { Field as FiledFormik } from "formik";
import block from 'bem-cn-lite';
import './field.scss';

const f = block('field');
const m = block('message');

const Field = ({ id, label, error, value, onChange, multi, name, ...props }) => {
  const fieldType = !multi ? 'input' : 'textarea';

  return (
    <div className={f({
      error: !!error,
    })}
    >
      {
        label ? (
          <label htmlFor={id} className={f('label')}>
            {label}
          </label>
        ) : null
      }
      <FiledFormik
        {...props}
        name={name}
        component={fieldType}
        id={id}
        onChange={onChange}
        value={value}
        className={f('element')}
      />
      {
        error ? (
          <span className={m({ error: !!error })}>
            {error}
          </span>
        ) : null
      }
    </div>
  );
};

Field.defaultProps = {
  value: '',
  label: null,
  error: null,
  multi: false,
  name: '',
};

Field.propTypes = {
  id: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  label: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  error: PropTypes.string,
  multi: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
};

export default Field;
