/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useState, useEffect, Fragment, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';
import FeatherIcon from 'feather-icons-react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { Scrollbars } from 'react-custom-scrollbars';
import { SingleChatWrapper, MessageList, Footer } from '../style';
import Heading from '../../../components/heading/heading';
import { Button } from '../../../components/buttons/buttons';
import { newMessage, newConversation, setRead } from '../../../redux/firebase/messages/actionCreator';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { Dropdown } from '../../../components/dropdown/dropdown';

const SingleChat = ({ match }) => {
  const dispatch = useDispatch();
  const msgSection = useRef();

  const { rtl, chat, uid, convosOrdered, isLoader } = useSelector(state => {
    return {
      rtl: state.ChangeLayoutMode.rtlData,
      chat: state.chatSingle.data,
      uid: state.fb.auth.uid,
      convosOrdered: state.fs.ordered.conversations,
      isLoader: state.conversations.loading,
    };
  });

  const left = !rtl ? 'left' : 'right';

  const [state, setState] = useState({
    chatData: chat,
    singleContent: false,
    me: uid,
    name: 'Not Found',
    inputValue: '',
    fileList: [],
    fileList2: [],
    loading: isLoader,
    newConvo: false,
  });

  const { singleContent, name, profileImage, me, inputValue, fileList, fileList2, loading, newConvo } = state;

  // ?
  useEffect(() => {
    let unmounted = false;
    let name;
    let profileImage;

    if (convosOrdered) {
      let currentConvo;
      if (match.params.id) {
        console.log('Props');
        let tempConvo = convosOrdered.filter(convo => {
          return convo.users.includes(match.params.id);
        });
        currentConvo = tempConvo[0];
      } else {
        //no props, not a new convo, just pressed the button
        currentConvo = convosOrdered[convosOrdered.length - 1];
      }
      // At this point current convo is either 1 conversation or none.

      if (currentConvo) {
        if (currentConvo.users[0] == uid) {
          name = currentConvo.user2.name;
          profileImage = currentConvo.user2.profileImage;
        } else {
          name = currentConvo.user1.name;
          profileImage = currentConvo.user1.profileImage;
        }
        if (!unmounted) {
          setState({
            ...state,
            chatData: currentConvo,
            singleContent: currentConvo,
            name: name,
            profileImage,
            inputValue,
            me: uid,
            fileList,
            fileList2,
            loading: isLoader,
          });
        }
      } else {
        console.log('NEW CONTACT');
        if (!newConvo) {
          setState({
            ...state,
            newConvo: true,
          });
          dispatch(newConversation(uid, match.params.id));
        }
      }
    } else if (convosOrdered) {
      if (match.params.id && convosOrdered.length === 0) {
        console.log('FIRST CONTACT');
        if (!newConvo) {
          setState({
            ...state,
            newConvo: true,
          });
          dispatch(newConversation(uid, match.params.id));
        }
      }
    } else {
      console.log('Null');
    }

    return () => {
      unmounted = true;
    };
  }, [match]);

  useEffect(() => {
    msgSection.current.scrollToBottom();
  }, [state]);

  useEffect(() => {
    if (state.chatData) {
      console.log('dispatching');

      if (
        state.chatData.notification &&
        state.chatData.notification.from !== uid && state.chatData.notification.from == null
      ) {
        dispatch(setRead(state.chatData, null));
      }
    }
  }, [state.chatData]);

  const handleChange = e => {
    setState({
      ...state,
      inputValue: e.target.value,
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (inputValue) {
      const pushcontent = {
        content: inputValue,
        timestamp: new Date().getTime(),
        seen: false,
        sentBy: me,
      };
      dispatch(newMessage(state.chatData.id, pushcontent));
      setState({
        ...state,
        inputValue: '',
      });
    }
  };

  // const props = {
  //   name: 'file',
  //   action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  //   headers: {
  //     authorization: 'authorization-text',
  //   },
  //   listType: 'picture-card',
  //   onChange(info) {
  //     if (info.file.status !== 'uploading') {
  //       // console.log(info.file, info.fileList);
  //       setState({
  //         ...state,
  //         fileList: info.fileList,
  //       });
  //     }
  //     if (info.file.status === 'done') {
  //       message.success(`${info.file.name} file uploaded successfully`);
  //     } else if (info.file.status === 'error') {
  //       message.error(`${info.file.name} file upload failed.`);
  //     }
  //   },
  // };
  // const attachment = {
  //   name: 'file',
  //   action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  //   headers: {
  //     authorization: 'authorization-text',
  //   },
  //   onChange(info) {
  //     if (info.file.status !== 'uploading') {
  //       // console.log(info.file, info.fileList);
  //       setState({
  //         ...state,
  //         fileList2: info.fileList,
  //       });
  //     }
  //     if (info.file.status === 'done') {
  //       message.success(`${info.file.name} file uploaded successfully`);
  //     } else if (info.file.status === 'error') {
  //       message.error(`${info.file.name} file upload failed.`);
  //     }
  //   },
  // };

  const renderView = ({ style, ...props }) => {
    const customStyle = {
      marginRight: 'auto',
      [rtl ? 'left' : 'right']: '2px',
      [rtl ? 'marginLeft' : 'marginRight']: '-19px',
    };
    return <div {...props} style={{ ...style, ...customStyle }} />;
  };

  const renderThumbVertical = ({ style, ...props }) => {
    const thumbStyle = {
      borderRadius: 6,
      backgroundColor: '#F1F2F6',
      [left]: '2px',
    };
    return <div style={{ ...style, ...thumbStyle }} props={props} />;
  };

  const renderTrackVertical = () => {
    const thumbStyle = {
      position: 'absolute',
      width: '6px',
      transition: 'opacity 200ms ease 0s',
      opacity: 0,
      [rtl ? 'left' : 'right']: '6px',
      bottom: '2px',
      top: '2px',
      borderRadius: '3px',
    };
    return <div style={thumbStyle} />;
  };

  const renderThumbHorizontal = ({ style, ...props }) => {
    const thumbStyle = {
      borderRadius: 6,
      backgroundColor: '#F1F2F6',
    };
    return <div style={{ ...style, ...thumbStyle }} props={props} />;
  };

  const content = (
    <>
      <NavLink to="#">
        <FeatherIcon icon="users" size={14} />
        <span>Create new group</span>
      </NavLink>
      <NavLink to="#">
        <FeatherIcon icon="trash-2" size={14} />
        <span>Delete conversation</span>
      </NavLink>
      <NavLink to="#">
        <FeatherIcon icon="slash" size={14} />
        <span>Block & Report</span>
      </NavLink>
    </>
  );

  return (
    <SingleChatWrapper>
      <Cards
        title={
          <>
            <Heading as="h5">{!loading && name}</Heading>
            {/* <p>Active Now</p> */}
          </>
        }
        isbutton={[
          <Dropdown content={content} key="1">
            <Link to="#">
              <FeatherIcon icon="more-vertical" />
            </Link>
          </Dropdown>,
        ]}
      >
        <ul className="atbd-chatbox">
          <Scrollbars
            className="custom-scrollbar"
            autoHide
            autoHideTimeout={500}
            autoHideDuration={200}
            renderThumbHorizontal={renderThumbHorizontal}
            renderThumbVertical={renderThumbVertical}
            renderView={renderView}
            renderTrackVertical={renderTrackVertical}
            ref={msgSection}
          >
            {!loading && singleContent ? (
              singleContent.messages.map((mes, index) => {
                const id = mes.timestamp;

                const same = moment(id).format('MM-DD-YYYY') === moment().format('MM-DD-YYYY');

                return (
                  <Fragment key={id}>
                    {false && (
                      <p className="time-connector text-center text-capitalize">
                        <span>today</span>
                      </p>
                    )}
                    <li className="atbd-chatbox__single" key={id} style={{ overflow: 'hidden' }}>
                      <div className={mes.sentBy !== me ? 'left' : 'right'}>
                        {mes.sentBy !== me ? <img src={profileImage} alt="" /> : null}

                        <div className="atbd-chatbox__content">
                          <Heading as="h5" className="atbd-chatbox__name">
                            {mes.sentBy !== me && name}
                            <span>{same ? moment(id).format('hh:mm A') : moment(id).format('LL')}</span>
                          </Heading>

                          {mes.sentBy !== me ? (
                            <div className="atbd-chatbox__contentInner d-flex">
                              <div className="atbd-chatbox__message">
                                <MessageList className="message-box">{mes.content}</MessageList>
                              </div>
                            </div>
                          ) : (
                            <div className="atbd-chatbox__contentInner d-flex">
                              <div className="atbd-chatbox__message">
                                <MessageList className="message-box">{mes.content}</MessageList>
                              </div>
                            </div>
                          )}
                          {mes.sentBy === me && singleContent.length === index + 1 ? (
                            <div className="message-seen text-right">
                              <span className="message-seen__time"> </span>
                              {/* <span className="message-seen__time">Seen 9:20 PM </span> */}
                              <img src={mes.profileImage} alt="" />
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </li>
                  </Fragment>
                );
              })
            ) : (
              <p>No data found</p>
            )}
          </Scrollbars>
        </ul>

        <Footer>
          <form onSubmit={handleSubmit}>
            <div
              className={`chatbox-reply-form d-flex ${state.fileList.length && 'hasImage'} ${state.fileList2.length &&
                'hasFile'}`}
            >
              <div className="chatbox-reply-input">
                <span className="smile-icon">
                  <FeatherIcon icon="smile" size={24} />
                </span>
                <input
                  onChange={handleChange}
                  placeholder="Type your message..."
                  name="chat"
                  id="chat"
                  style={{ width: '100%' }}
                  value={inputValue}
                />
              </div>
              <div className="chatbox-reply-action d-flex">
                <Button onClick={handleSubmit} type="primary" className="btn-send">
                  <FeatherIcon icon="send" size={18} />
                </Button>
              </div>
            </div>
          </form>
        </Footer>
      </Cards>
    </SingleChatWrapper>
  );
};

SingleChat.propTypes = {
  match: PropTypes.object,
};
export default SingleChat;
