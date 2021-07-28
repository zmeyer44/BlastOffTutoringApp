import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import moment from 'moment';
import FeatherIcon from 'feather-icons-react';
import PropTypes from 'prop-types';
import { Badge } from 'antd';
import { BlockSpan, ChatWrapper } from '../style';
import { textRefactor } from '../../../components/utilities/utilities';
import { filterSinglePage } from '../../../redux/chat/actionCreator';
import { Button } from '../../../components/buttons/buttons';

const AllContacts = ({ match }) => {
  const dispatch = useDispatch();
  const { convos, uid, isLoader } = useSelector(state => {
    return {
      convos: state.fs.data.conversations,
      uid: state.fb.auth.uid,
      isLoader: state.conversations.loading,
    };
  });
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

  const dataFiltering = e => {
    dispatch(filterSinglePage(e.currentTarget.getAttribute('data-email')));
  };

  return (
    <ChatWrapper>
      {console.log(conversationsList)}
      {!conversationsList ? (
        <div className="create-action">
          <Button className="btn-add" size="default" type="default" shape="circle" block>
            <FeatherIcon icon="user-plus" size={14} />
            Loading...
          </Button>
        </div>
      ) : conversationsList.length ? (
        <>
          <div className="create-action">
            <Link to="/home/search">
              <Button className="btn-add" size="default" type="default" shape="circle" block>
                <FeatherIcon icon="user-plus" size={14} />
                Find More Tutors
              </Button>
            </Link>
          </div>
          <ul>
            {conversationsList
              .sort((a, b) => {
                return b.recentActivity - a.recentActivity;
              })
              .map((convo, key) => {
                const { messages, recentActivity } = convo;
                let user;
                let id;
                let content;
                let count;
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
                // console.log('Convo Notification: ', convo.notification.from);
                // console.log('user: ', user);
                if (convo.notification && convo.notification.from == user.id) {
                  count = convo.notification.count;
                }
                // const id = messages[messages.length - 1].time;
                const same = moment(id).format('MM-DD-YYYY') === moment().format('MM-DD-YYYY');
                return (
                  <li key={user.id} className="chat-link-signle">
                    <NavLink onClick={dataFiltering} data-email={user.id} to={`${match.path}/${user.id}`}>
                      <div className="author-figure">
                        <img src={user.profileImage} alt="" />
                        <span className={'inactive'} />
                      </div>
                      <div className="author-info">
                        <BlockSpan className="author-name">{user.name}</BlockSpan>

                        <BlockSpan className="author-chatText">{textRefactor(content, 5)}</BlockSpan>
                      </div>
                      <div className="author-chatMeta">
                        <BlockSpan>{same ? moment(id).format('hh:mm A') : moment(id).format('dddd')}</BlockSpan>

                        {count !== 0 && <Badge className="badge-success" count={count} />}
                      </div>
                    </NavLink>
                  </li>
                );
              })}
          </ul>
        </>
      ) : (
        <>
          <div className="create-action">
            <Link to="/home/search">
              <Button className="btn-add" size="default" type="default" shape="circle" block>
                <FeatherIcon icon="user-plus" size={14} />
                Find More Tutors
              </Button>
            </Link>
          </div>
          <ul>
            <li>No conversations yet</li>
          </ul>
        </>
      )}
    </ChatWrapper>
  );
};
AllContacts.propTypes = {
  match: PropTypes.object,
};
export default AllContacts;
