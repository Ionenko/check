import React from 'react';
import block from 'bem-cn-lite';
import './stepper.scss';

import checkIcon from '../../../img/check.svg';

const s = block('stepper');

const Stepper = ({steps, active, completed}) => {

  const items = [];

  for(let i = 0; i < steps; i++) {

    items.push(
      <li key={i} className={s('item', {
        active: i <= active
      })}>
        {
          i < completed ? <img src={checkIcon} alt="icon"/> : null
        }
      </li>
    )
  }

  return (
    <div  className={s()}>
      <ul className={s('list')}>
        {items}
      </ul>
    </div>
  );
};

export default Stepper;