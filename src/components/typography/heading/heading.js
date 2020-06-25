import React from 'react';
import block from 'bem-cn-lite';
import './heading.scss';

const h = block('heading');

const Heading = ({
  size,
  type,
  variant,
  align,
  className,
  ...props
}) => {
  return (
    <div className={
      h({
        size: size || '',
        variant: variant || '',
        align: align || '',
      }, className && className)
    }>
      {props.children}
    </div>
  );
};

export default Heading;
