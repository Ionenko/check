import React from 'react';
import block from 'bem-cn-lite';
import PropTypes from 'prop-types';
import './stepper.scss';

import checkIcon from '../../../img/check.svg';

const s = block('stepper');

const Stepper = ({ steps, active, completed }) => {
  const items = [];

  for (let i = 0; i < steps; i++) {
    items.push(
      <li
        key={i}
        className={s('item', {
          active: i <= active,
        })}
      >
        {
          i < completed ? <img src={checkIcon} alt="icon" /> : null
        }
      </li>,
    );
  }

  return (
    <div className={s()}>
      <ul className={s('list')}>
        {items}
      </ul>
    </div>
  );
};

Stepper.propTypes = {
  steps: PropTypes.number.isRequired,
  active: PropTypes.number.isRequired,
  completed: PropTypes.number.isRequired,
};

export default Stepper;
