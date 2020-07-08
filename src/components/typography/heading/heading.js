import React from 'react';
import block from 'bem-cn-lite';
import './heading.scss';
import PropTypes from 'prop-types';

const h = block('heading');

const Heading = ({
  size,
  variant,
  align,
  className,
  children,
}) => (
  <div className={
      h({
        size: size || '',
        variant: variant || '',
        align: align || '',
      }, className && className)
    }
  >
    {children}
  </div>
);

Heading.defaultProps = {
  size: '',
  variant: '',
  align: '',
  className: '',
};

Heading.propTypes = {
  size: PropTypes.string,
  variant: PropTypes.string,
  align: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default Heading;
