import React from 'react';
import Radio from "../radio";

const RadioGroup = ({className, items, setValue, value, ...props}) => {

  function handleChange(e){
    setValue(e.target.value);
  }

  return (
    <div className={className || null}>
      {
        items && items.length > 0 ? items.map((item) => (
          <Radio
            key={item.value}
            id={item.value}
            onChange={handleChange}
            label={item.label}
            value={item.value}
            checked={item.value === value}
            {...props}
          />
        )) : null
      }
    </div>
  );
};

export default RadioGroup;