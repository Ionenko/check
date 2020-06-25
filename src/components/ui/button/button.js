import React from 'react';
import block from 'bem-cn-lite';
import './button.scss';

const b = block('btn');
const ico = block('btn-icon');


const Button = ({tag, className, icon, ...props}) => {
  const Tag = `${tag}`;
  return (
    <Tag {...props} className={icon ? ico(null, className) : b(null, className)}>
      {
        props.children
      }
    </Tag>
  );
};


Button.defaultProps = {
  tag: 'button',
};

export default Button;