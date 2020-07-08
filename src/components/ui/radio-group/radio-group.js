import React from 'react';
import { generate } from 'shortid';
import block from 'bem-cn-lite';
import PropTypes from 'prop-types';
import Radio from '../radio';
import './radio-group.scss';

const r = block('radio-group');
const m = block('message');

const RadioGroup = (props) => {
  const {
    className,
    items,
    setFieldValue,
    error,
    touched,
    value,
    name,
  } = props;

  return (
    <div className={className || null}>
      <div className={r({
        error: !!error && touched,
      })}
      >
        {
          items && items.length > 0 ? items.map((item, i) => (
            <Radio
              key={i}
              id={generate()}
              onChange={() => setFieldValue(name, item.value)}
              label={item.label}
              value={item.value}
              checked={item.value === value}
              name={name}
            />
          )) : null
        }
      </div>
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

RadioGroup.defaultProps = {
  className: '',
  value: false,
  touched: false,
  error: '',
};

RadioGroup.propTypes = {
  className: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  setFieldValue: PropTypes.func.isRequired,
  error: PropTypes.string,
  touched: PropTypes.bool,
  value: PropTypes.bool,
  name: PropTypes.string.isRequired,
};

export default RadioGroup;
