import React, { lazy, Suspense } from 'react';
import { useSelector } from 'react-redux';
import { Row, Col, Skeleton } from 'antd';
import { useFirestoreConnect } from 'react-redux-firebase';

import FeatherIcon from 'feather-icons-react';
import { NavLink, Switch, Route, useRouteMatch } from 'react-router-dom';
import { SettingWrapper } from './overview/style';
import { PageHeader } from '../../../components/page-headers/page-headers';
import { Main } from '../../styled';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { Button } from '../../../components/buttons/buttons';
import { ShareButtonPageHeader } from '../../../components/buttons/share-button/share-button';
import { ExportButtonPageHeader } from '../../../components/buttons/export-button/export-button';
import { CalendarButtonPageHeader } from '../../../components/buttons/calendar-button/calendar-button';

const UserCard = lazy(() => import('./overview/UserCard'));
const CoverSection = lazy(() => import('./overview/CoverSection'));
const UserBio = lazy(() => import('./overview/UserBio'));
const Overview = lazy(() => import('./overview/Overview'));
const Timeline = lazy(() => import('./overview/Timeline'));
const Activity = lazy(() => import('./overview/Activity'));

const MyProfile = ({ match }) => {
  const { user } = useSelector(state => {
    return {
      user: state.fs.data.selectedUser,
    };
  });
  useFirestoreConnect([
    {
      collection: 'users',
      doc: `${match.params.id}`,
      storeAs: 'selectedUser',
    },
  ]);
  const { path } = useRouteMatch();
  return (
    <>
      <PageHeader ghost title="User Profile" />

      <Main>
        <Row gutter={25}>
          <Col xxl={6} lg={8} md={10} xs={24}>
            <Suspense
              fallback={
                <Cards headless>
                  <Skeleton avatar active paragraph={{ rows: 3 }} />
                </Cards>
              }
            >
              <UserCard {...user} />
            </Suspense>
          </Col>
          <Col xxl={18} lg={16} md={14} xs={24}>
            <SettingWrapper>
              <Suspense
                fallback={
                  <Cards headless>
                    <Skeleton active />
                  </Cards>
                }
              >
                <div className="coverWrapper">
                  <CoverSection {...user}/>
                  <nav className="profileTab-menu">
                    <ul>
                      <li>
                        <NavLink to={`/home/profile/${match.params.id}`}>Overview</NavLink>
                      </li>
                      {/* <li>
                        <NavLink to={`${path}/reviews`}>Reviews</NavLink>
                      </li> */}
                      {/* <li>
                        <NavLink to={`${path}/activity`}>Activity</NavLink>
                      </li> */}
                    </ul>
                  </nav>
                </div>
              </Suspense>
              <Switch>
                <Suspense
                  fallback={
                    <Cards headless>
                      <Skeleton active paragraph={{ rows: 10 }} />
                    </Cards>
                  }
                >
                  <Route path={`${path}`} component={Overview} />
                  {/* <Route path={`${path}/timeline`} component={Timeline} />
                  <Route path={`${path}/activity`} component={Activity} /> */}
                </Suspense>
              </Switch>
            </SettingWrapper>
          </Col>
        </Row>
      </Main>
    </>
  );
};

MyProfile.propTypes = {
  // match: propTypes.object,
};

export default MyProfile;
