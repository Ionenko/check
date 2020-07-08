import React from 'react';
import block from 'bem-cn-lite';
import './button.scss';
import PropTypes from 'prop-types';

const b = block('btn');
const ico = block('btn-icon');

const Button = (props) => {
  const {
    tag,
    className,
    icon,
    children,
  } = props;

  const Tag = `${tag}`;

  return (
    <Tag {...props} className={icon ? ico(null, className) : b(null, className)}>
      {
        children
      }
    </Tag>
  );
};

Button.defaultProps = {
  tag: 'button',
  className: '',
  icon: false,
};

Button.propTypes = {
  tag: PropTypes.string,
  className: PropTypes.string,
  icon: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default Button;
