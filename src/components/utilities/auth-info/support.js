import React from 'react';
import FeatherIcon from 'feather-icons-react';
import { Link, useRouteMatch } from 'react-router-dom';
import { NestedDropdwon } from './auth-info-style';
import { Popover } from '../../popup/popup';
import Heading from '../../heading/heading';

const Support = () => {
  const { path } = useRouteMatch();
  const content = (
    <NestedDropdwon>
      <div className="support-dropdwon">
        <ul>
          <Heading as="h5">How to use?</Heading>
          <li>
            <Link to={`${path}/support`}>How to find a tutor</Link>
          </li>
          <li>
            <Link to={`${path}/support`}>Chatting with tutors</Link>
          </li>
          <li>
            <Link to={`${path}/support`}>Getting more opportunities</Link>
          </li>
        </ul>
        <ul>
          <Heading as="h5">Sessions</Heading>
          <li>
            <Link to={`${path}/support`}>How to start a session</Link>
          </li>
          <li>
            <Link to={`${path}/support`}>Sending invites</Link>
          </li>
          <li>
            <Link to={`${path}/support`}>Printing my certificate</Link>
          </li>
        </ul>
        <ul>
          <Heading as="h5">Approval process</Heading>
          <li>
            <Link to={`${path}/support`}>How to approve students</Link>
          </li>
          <li>
            <Link to={`${path}/support`}>How to confirm students</Link>
          </li>
        </ul>
      </div>
    </NestedDropdwon>
  );

  return (
    <div className="support">
      <Popover placement="bottomLeft" content={content} action="click">
        <Link to="#" className="head-example">
          <FeatherIcon icon="help-circle" size={20} />
        </Link>
      </Popover>
    </div>
  );
};

export default Support;
