import React from 'react';
import './spinner.scss';
import block from 'bem-cn-lite';

const s = block('spinner');

const Spinner = () => (
  <div className={s()}>
    <div className={s('circles')}>
      <div className={s('circle', { 1: true })} />
      <div className={s('circle', { 2: true })} />
      <div className={s('circle', { 3: true })} />
      <div className={s('circle', { 4: true })} />
      <div className={s('circle', { 5: true })} />
      <div className={s('circle', { 6: true })} />
      <div className={s('circle', { 7: true })} />
      <div className={s('circle', { 8: true })} />
      <div className={s('circle', { 9: true })} />
      <div className={s('circle', { 10: true })} />
      <div className={s('circle', { 11: true })} />
      <div className={s('circle', { 12: true })} />
    </div>
  </div>
);

export default Spinner;
