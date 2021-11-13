import React, { useState, useEffect } from 'react';
import { Badge } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { Link, useRouteMatch } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Scrollbars } from 'react-custom-scrollbars';
import { useSelector } from 'react-redux';
import { useFirestoreConnect } from 'react-redux-firebase';
import moment from 'moment';
import { textRefactor } from '../../../components/utilities/utilities';
import { AtbdTopDropdwon } from './auth-info-style';
import { Popover } from '../../popup/popup';
import Heading from '../../heading/heading';

const MessageBox = () => {
  const { path } = useRouteMatch();
  const { convos, uid, isLoader, rtl } = useSelector(state => {
    return {
      convos: state.fs.data.conversations,
      uid: state.fb.auth.uid,
      isLoader: state.conversations.loading,
      rtl: state.ChangeLayoutMode.rtlData,
    };
  });
  useFirestoreConnect([
    { collection: 'conversations', where: ['users', 'array-contains', `${uid}`], orderBy: 'recentActivity' },
  ]);
  const [state, setState] = useState({
    conversationsList: false,
    loading: isLoader,
  });

  const { conversationsList, loading } = state;

  useEffect(() => {
    if (convos) {
      let arrayOfConvos = Object.values(convos);
      setState({
        ...state,
        conversationsList: arrayOfConvos,
      });
    }
  }, [convos]);

  const renderThumb = ({ style, ...props }) => {
    const thumbStyle = {
      borderRadius: 6,
      backgroundColor: '#F1F2F6',
    };
    return <div style={{ ...style, ...thumbStyle }} props={props} />;
  };

  const renderTrackVertical = () => {
    const thumbStyle = {
      position: 'absolute',
      width: '6px',
      transition: 'opacity 200ms ease 0s',
      opacity: 0,
      [rtl ? 'left' : 'right']: '2px',
      bottom: '2px',
      top: '2px',
      borderRadius: '3px',
    };
    return <div className="hello" style={thumbStyle} />;
  };

  const renderView = ({ style, ...props }) => {
    const customStyle = {
      marginRight: rtl && 'auto',
      [rtl ? 'marginLeft' : 'marginRight']: '-17px',
    };
    return <div {...props} style={{ ...style, ...customStyle }} />;
  };

  renderThumb.propTypes = {
    style: PropTypes.shape(PropTypes.object),
  };

  renderView.propTypes = {
    style: PropTypes.shape(PropTypes.object),
  };

  const notifications = convo => {
    if (convo.notification && convo.notification.from && convo.notification.from !== uid) {
      console.log('TRUE', convo.notification.from);
      return true;
    } else {
      return false;
    }
  };

  const content = (
    <AtbdTopDropdwon className="atbd-top-dropdwon">
      <Heading className="atbd-top-dropdwon__title" as="h5">
        <span className="title-text">Messages</span>
        <Badge
          className="badge-success"
          count={conversationsList.length && conversationsList.some(notifications) ? 'New' : 0}
        />
      </Heading>
      <Scrollbars
        autoHeight
        autoHide
        renderThumbVertical={renderThumb}
        renderView={renderView}
        renderTrackVertical={renderTrackVertical}
      >
        <div className="atbd-top-dropdwon-menu">
          {conversationsList.length ? (
            <ul className="atbd-top-dropdwon__nav">
              {conversationsList
                .sort((a, b) => {
                  return b.recentActivity - a.recentActivity;
                })
                .map((convo, key) => {
                  const { messages, recentActivity } = convo;
                  let user;
                  let id;
                  let content;
                  let count = 0;
                  if (convo.users[0] == uid) {
                    user = convo.user2;
                  } else {
                    user = convo.user1;
                  }
                  if (messages.length) {
                    id = messages[messages.length - 1].timestamp;
                    content = messages[messages.length - 1].content;
                  } else {
                    id = recentActivity;
                    content = ' ';
                  }
                  if (convo.notification && convo.notification.from == user.id) {
                    count = convo.notification.count;
                  }
                  const same = moment(id).format('MM-DD-YYYY') === moment().format('MM-DD-YYYY');
                  return (
                    <li key={user.id}>
                      <Link to={`${path}/chat/${user.id}`}>
                        <figure className="atbd-top-dropdwon__content">
                          <img src={user.profileImage} alt="" />
                          <figcaption>
                            <Heading as="h5">
                              {user.name}{' '}
                              <span className={count !== 0 ? 'color-success' : ' '}>
                                {same ? moment(id).format('hh:mm A') : moment(id).format('dddd')}
                              </span>
                            </Heading>
                            <div>
                              <span className="atbd-top-dropdwonText">{textRefactor(content, 5)}</span>
                              {count !== 0 && (
                                <span>
                                  <Badge className="badge-success" count={count} />
                                </span>
                              )}
                            </div>
                          </figcaption>
                        </figure>
                      </Link>
                    </li>
                  );
                })}
            </ul>
          ) : (
            <h3>No messages</h3>
          )}
        </div>
      </Scrollbars>
      <Link className="btn-seeAll" to={`${path}/chat`}>
        See all messages
      </Link>
    </AtbdTopDropdwon>
  );

  return (
    <div className="message">
      <Popover placement="bottomLeft" content={content} action="click">
        {conversationsList.length && conversationsList.some(notifications) ? (
          <Badge dot offset={[-8, -5]}>
            <Link to="#" className="head-example">
              <FeatherIcon icon="mail" size={20} />
            </Link>
          </Badge>
        ) : (
          <Link to="#" className="head-example">
            <FeatherIcon icon="mail" size={20} />
          </Link>
        )}
      </Popover>
    </div>
  );
};

MessageBox.propTypes = {
  rtl: PropTypes.bool,
};

export default MessageBox;
