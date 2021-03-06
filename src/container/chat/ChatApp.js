import React, { useState, lazy, Suspense, useEffect } from 'react';
import { Row, Col, Badge, Skeleton } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useFirestoreConnect } from 'react-redux-firebase';
import { Switch, Route, NavLink } from 'react-router-dom';
import FeatherIcon from 'feather-icons-react';
import PropTypes from 'prop-types';
import { Scrollbars } from 'react-custom-scrollbars';
import { UL, Content, ChatSidebar } from './style';
import PrivetChat from './overview/PrivetChat';
import GroupChat from './overview/GroupChat';
import AllContacts from './overview/AllContacts';
import { AutoComplete } from '../../components/autoComplete/autoComplete';
import { Main } from '../styled';
import { Button } from '../../components/buttons/buttons';
import { Cards } from '../../components/cards/frame/cards-frame';
import { PageHeader } from '../../components/page-headers/page-headers';
import { fetchConvos, newConversation } from '../../redux/firebase/messages/actionCreator';

import { ShareButtonPageHeader } from '../../components/buttons/share-button/share-button';
import { ExportButtonPageHeader } from '../../components/buttons/export-button/export-button';
import { CalendarButtonPageHeader } from '../../components/buttons/calendar-button/calendar-button';

const SingleChat = lazy(() => import('./overview/singleChat'));

const ChatApp = ({ match }) => {
  const { rtl, searchData, uid } = useSelector(state => {
    return {
      rtl: state.ChangeLayoutMode.rtlData,
      searchData: state.headerSearchData,
      uid: state.fb.auth.uid,
    };
  });

  useFirestoreConnect([
    { collection: 'conversations', where: ['users', 'array-contains', `${uid}`], orderBy: 'recentActivity' },
  ]);

  const left = !rtl ? 'left' : 'right';
  const [state, setState] = useState({
    search: searchData,
    me: 'woadud@gmail.com',
  });

  const { notData } = state;

  const patternSearch = searchText => {
    const data = searchData.filter(item => item.title.toUpperCase().startsWith(searchText.toUpperCase()));
    setState({
      ...state,
      search: data,
    });
  };

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

  return (
    <>
      <PageHeader
        ghost
        title="Chat"
        // buttons={[
        //   <div key="1" className="page-header-actions">
        //     <CalendarButtonPageHeader />
        //     <ExportButtonPageHeader />
        //     <ShareButtonPageHeader />
        //     <Button size="small" type="primary">
        //       <FeatherIcon icon="plus" size={14} />
        //       Add New
        //     </Button>
        //   </div>,
        // ]}
      />

      <Main>
        <Row gutter={30}>
          <Col xxl={7} lg={10} xs={24}>
            <ChatSidebar>
              <Cards headless>
                <div className="chatbox-search">
                  <AutoComplete onSearch={patternSearch} dataSource={notData} width="100%" patterns />
                </div>
                <nav>
                  <UL>
                    <li>
                      <NavLink activeClassName="active" to={`${match.path}`}>
                        All Contacts
                      </NavLink>
                    </li>
                  </UL>
                </nav>
                <Content>
                  <Scrollbars
                    className="custom-scrollbar"
                    autoHide
                    autoHideTimeout={500}
                    autoHideDuration={200}
                    renderThumbHorizontal={renderThumbHorizontal}
                    renderThumbVertical={renderThumbVertical}
                    renderView={renderView}
                    renderTrackVertical={renderTrackVertical}
                  >
                    <Switch>
                      <Suspense
                        fallback={
                          <Cards headless>
                            <Skeleton avatar paragraph={{ rows: 10 }} active />
                          </Cards>
                        }
                      >
                        {/* <Route path={`${match.path}/private`} component={PrivetChat} />
                        <Route path={`${match.path}/group`} component={GroupChat} /> */}
                        <Route path={`${match.path}`} component={AllContacts} />
                      </Suspense>
                    </Switch>
                  </Scrollbars>
                </Content>
              </Cards>
            </ChatSidebar>
          </Col>
          <Col xxl={17} lg={14} xs={24}>
            <Switch>
              <Suspense
                fallback={
                  <Cards headless>
                    <Skeleton avatar paragraph={{ rows: 10 }} active />
                  </Cards>
                }
              >
                <Route exact path={`${match.path}/:id`} component={SingleChat} />
                <Route exact path={`${match.path}`} component={SingleChat} />
              </Suspense>
            </Switch>
          </Col>
        </Row>
      </Main>
    </>
  );
};

ChatApp.propTypes = {
  match: PropTypes.object,
};
export default ChatApp;
