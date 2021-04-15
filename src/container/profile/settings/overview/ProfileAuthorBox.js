import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Upload } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { Link, NavLink, useRouteMatch } from 'react-router-dom';
import propTypes from 'prop-types';
import { ProfileAuthorBox } from './style';
import Heading from '../../../../components/heading/heading';
import { Cards } from '../../../../components/cards/frame/cards-frame';
import { fbFileUploder, fbFileClear, fbDataUpdate } from '../../../../redux/firebase/profile/actionCreator';
import ImgCrop from 'antd-img-crop';

const AuthorBox = () => {
  const dispatch = useDispatch();
  const { user, userId, isLoading, profileImage, isFileLoading } = useSelector(state => {
    return {
      user: state.fb.profile,
      userId: state.fb.auth.uid,
      isLoading: state.profile.loading,
      profileImage: state.profile.profileImage,
      isFileLoading: state.profile.fileLoading,
    };
  });
  const { path } = useRouteMatch();
  const onPreview = async file => {
    let src = file.url;
    if (!src) {
      src = await new Promise(resolve => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow.document.write(image.outerHTML);
  };
  const props = {
    name: 'file',
    multiple: false,
    showUploadList: false,
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        dispatch(fbFileUploder(userId, 'profileImage', info.file.originFileObj));
      }
      if (info.file.status === 'done') {
        // message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        // message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  return (
    <ProfileAuthorBox>
      <Cards headless>
        <div className="author-info">
          <figure>
            <img
              style={{ width: '120px', height: '120px', objectFit: 'cover' }}
              src={user.profileImage ? user.profileImage : require('../../../../static/img/avatar/profileImage.png')}
              alt=""
            />

            <ImgCrop>
              <Upload {...props}>
                <Link className="upload-btn" to="#">
                  <FeatherIcon icon="camera" size={16} />
                </Link>
              </Upload>
            </ImgCrop>
          </figure>
          <figcaption>
            <div className="info">
              <Heading as="h4">{user.name}</Heading>
              <p>{user.type}</p>
            </div>
          </figcaption>
        </div>
        <nav className="settings-menmulist">
          <ul>
            <li>
              <NavLink to={`${path}/profile`}>
                <FeatherIcon icon="user" size={14} />
                Edit Profile
              </NavLink>
            </li>
            {/* <li>
              <NavLink to={`${path}/account`}>
                <FeatherIcon icon="settings" size={14} />
                Account Settings
              </NavLink>
            </li>
            <li>
              <NavLink to={`${path}/password`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-key"
                >
                  <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
                </svg>
                Change Password
              </NavLink>
            </li>
            <li>
              <NavLink to={`${path}/social`}>
                <FeatherIcon icon="users" size={14} />
                Social Profile
              </NavLink>
            </li>
            <li>
              <NavLink to={`${path}/notification`}>
                <FeatherIcon icon="bell" size={14} />
                Notification
              </NavLink>
            </li> */}
          </ul>
        </nav>
      </Cards>
    </ProfileAuthorBox>
  );
};

AuthorBox.propTypes = {
  match: propTypes.object,
};

export default AuthorBox;
