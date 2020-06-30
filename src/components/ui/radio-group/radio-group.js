import React from 'react';
import Radio from "../radio";
import block from 'bem-cn-lite';
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
    name
  } = props;

  return (
    <div className={className || null}>
      <div className={r({
        error: !!error && touched
      })}>
        {
          items && items.length > 0 ? items.map((item) => (
            <Radio
              key={item.value}
              id={item.value}
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
        error ? <span className={m({error: !!error})}>
          {error}
        </span> : null
      }
    </div>
  );
};

export default RadioGroup;