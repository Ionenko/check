import React, { useState } from 'react';
import { useToasts } from 'react-toast-notifications';
import Files from 'react-files';
import block from 'bem-cn-lite';
import './file.scss';
import PropTypes from 'prop-types';
import Spinner from '../../spinner';
import { uploadOrderImage } from '../../../redux/actions/order';
import {useApolloClient} from "@apollo/react-hooks";

const m = block('message');

const File = (props) => {
  const {
    error,
    onChange,
    children,
  } = props;

  const [loading, setLoading] = useState(false);
  const client = useApolloClient();
  const { addToast } = useToasts();

  const handleChange = async ([file]) => {
    setLoading(true);
    const res = await uploadOrderImage(client, file);
    setLoading(false);
    onChange(res.data.uploadOrderImage.id);
  };

  function showError(err) {
    addToast(
      err.message,
      {
        appearance: 'error',
      },
    );
  }

  return (
    <div>
      <Files {...props} onError={showError} onChange={handleChange}>
        {loading ? <Spinner /> : null}
        {children}
      </Files>
      {
        error ? (
          <span className={m({ error: !!error })}>
            {error}
          </span>
        ) : null
      }
    </div>
  );
};

File.defaultProps = {
  error: '',
};

File.propTypes = {
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default File;
