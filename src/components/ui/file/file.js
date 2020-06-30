import React from 'react';
import { useAlert } from 'react-alert';
import Files from "react-files";
import block from 'bem-cn-lite';
import './file.scss';

const m = block('message');

const File = ({error, ...props}) => {

  const alert = useAlert();

  function showError(err) {
    alert.show(
      <span className={m({error: true})}>
        {err.message}
      </span>, {type: 'error'}
    );
  }

  return (
    <div>
      <Files onError={showError} {...props}>
        {props.children}
      </Files>
      {
        error ? <span className={m({error: !!error})}>
          {error}
        </span> : null
      }
    </div>
  );
};

export default File;