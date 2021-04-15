import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Upload, message } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import { fbFileUploder, fbFileClear, fbDataUpdate } from '../../../redux/firebase/profile/actionCreator';

const CoverSection = () => {
  const dispatch = useDispatch();
  const { user, userId, isLoading } = useSelector(state => {
    return {
      user: state.fb.profile,
      userId: state.fb.auth.uid,
      isLoading: state.profile.loading,
    };
  });

  const props = {
    name: 'file',
    multiple: false,
    showUploadList: false,
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        dispatch(fbFileUploder(userId, 'coverImage', info.file.originFileObj));
      }
      if (info.file.status === 'done') {
        // message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        // message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  return (
    <div className="cover-image">
      <img
        style={{ width: '100%', height: '150px', objectFit: 'cover' }}
        src={user.coverImage ? user.coverImage : require('../../../static/img/profile/cover-img.png')}
        alt="banner"
      />

      <Upload {...props}>
        <Link to="#">
          <FeatherIcon icon="camera" size={16} /> Change Cover
        </Link>
      </Upload>
    </div>
  );
};

CoverSection.propTypes = {
  match: propTypes.object,
};

export default CoverSection;
