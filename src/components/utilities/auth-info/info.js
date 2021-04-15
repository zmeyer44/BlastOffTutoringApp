import React, { useState } from 'react';
import { Avatar } from 'antd';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import FeatherIcon from 'feather-icons-react';
import { InfoWraper, NavAuth, UserDropDwon } from './auth-info-style';
import Message from './message';
import Notification from './notification';
import Features from './features';
import Support from './support';
import { Popover } from '../../popup/popup';
import { logOut } from '../../../redux/authentication/actionCreator';
import { fbAuthLogout } from '../../../redux/firebase/auth/actionCreator';
import Heading from '../../heading/heading';

const AuthInfo = () => {
  const dispatch = useDispatch();
  const { isLogout, userLoggedIn } = useSelector(state => {
    return {
      isLogout: state.fb.auth.uid,
      userLoggedIn: state.fb.profile,
    };
  });

  const SignOut = e => {
    e.preventDefault();
    dispatch(fbAuthLogout());
  };

  if (!isLogout) dispatch(logOut());

  const userContent = (
    <UserDropDwon>
      <div className="user-dropdwon">
        <figure className="user-dropdwon__info">
          <img
            src={
              userLoggedIn.profileImage
                ? userLoggedIn.profileImage
                : require('../../../static/img/avatar/profileImage.png')
            }
            alt=""
          />
          <figcaption>
            <Heading as="h5"> {`${userLoggedIn.firstName} ${userLoggedIn.lastName}`}</Heading>
            <p>{userLoggedIn.type}</p>
          </figcaption>
        </figure>
        <ul className="user-dropdwon__links">
          <li>
            <Link to="settings">
              <FeatherIcon icon="user" /> Profile
            </Link>
          </li>
          <li>
            <Link to="calendar/month">
              <FeatherIcon icon="calendar" /> Calendar
            </Link>
          </li>
          <li>
            <Link to="activity">
              <FeatherIcon icon="globe" /> Activity
            </Link>
          </li>

          <li>
            <Link to="settings">
              <FeatherIcon icon="settings" /> Settings
            </Link>
          </li>
          <li>
            <Link to="support">
              <FeatherIcon icon="bell" /> Help
            </Link>
          </li>
        </ul>
        <Link className="user-dropdwon__bottomAction" onClick={SignOut} to="#">
          <FeatherIcon icon="log-out" /> Sign Out
        </Link>
      </div>
    </UserDropDwon>
  );

  return (
    <InfoWraper>
      <Message />
      <Notification />
      <Features />
      <Support />

      <div className="nav-author">
        <Popover placement="bottomRight" content={userContent} action="click">
          <Link to="#" className="head-example">
            <Avatar
              src={
                userLoggedIn.profileImage
                  ? userLoggedIn.profileImage
                  : 'https://cdn0.iconfinder.com/data/icons/user-pictures/100/matureman1-512.png'
              }
            />
          </Link>
        </Popover>
      </div>
    </InfoWraper>
  );
};

export default AuthInfo;
