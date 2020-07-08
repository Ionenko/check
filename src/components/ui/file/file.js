import React, { useState } from 'react';
import { useToasts } from 'react-toast-notifications';
import Files from 'react-files';
import block from 'bem-cn-lite';
import './file.scss';
import PropTypes from 'prop-types';
import { useUploadOrderImage } from '../../../hooks/order';
import Spinner from '../../spinner';

const m = block('message');

const File = (props) => {
  const {
    error,
    onChange,
    children,
  } = props;

  const [loading, setLoading] = useState(false);

  const { addToast } = useToasts();
  const uploadImage = useUploadOrderImage();

  const handleChange = async ([file]) => {
    setLoading(true);
    const res = await uploadImage(file);
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
