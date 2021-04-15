import React, { lazy, Suspense } from 'react';
import { useSelector } from 'react-redux';
import { Row, Col, Skeleton } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Button } from '../../components/buttons/buttons';
import { Main } from '../styled';
import { ShareButtonPageHeader } from '../../components/buttons/share-button/share-button';
import { ExportButtonPageHeader } from '../../components/buttons/export-button/export-button';
import { CalendarButtonPageHeader } from '../../components/buttons/calendar-button/calendar-button';
import {
  Banner1,
  Banner2,
  BannerEvent,
  Banner3,
  Banner4,
  BannerFinishProfile,
  Banner5,
  Banner6,
  Banner7,
  BannerRecords,
  BannerCarousel,
  BannerLong,
  BannerCard,
  BannerCard2,
  BannerCta,
  BannerCta2,
} from '../../components/banners/Banners';
const SocialMediaOverview = lazy(() => import('./overview/index/SocialMediaOverview'));
const FacebookOverview = lazy(() => import('./overview/index/FacebookOverview'));
const YoutubeSubscribers = lazy(() => import('./overview/index/YoutubeSubscribers'));
const TwitterOverview = lazy(() => import('./overview/index/TwitterOverview'));
const InstagramOverview = lazy(() => import('./overview/index/InstagramOverview'));
const LinkedinKeyMetrics = lazy(() => import('./overview/index/LinkedinKeyMetrics'));
const SocialTrafficMetrics = lazy(() => import('./overview/index/SocialTrafficMetrics'));

const Dashboard = () => {
  const { profile } = useSelector(state => {
    return {
      profile: state.fb.profile,
    };
  });
  return (
    <>
      <PageHeader
        ghost
        title="Welcome to Blast Off"
        buttons={[
          <div key="6" className="page-header-actions">
            <CalendarButtonPageHeader key="1" />
            <ExportButtonPageHeader key="2" />
            <ShareButtonPageHeader key="3" />
            <Button size="small" key="4" type="primary">
              <FeatherIcon icon="plus" size={14} />
              Add New
            </Button>
          </div>,
        ]}
      />
      <Main>
        <Row justify="center" gutter={25}>
          {profile.type == 'Tutor' && !profile.bio && (
            <Col xxl={8} lg={24} xs={24}>
              <Suspense
                fallback={
                  <Cards headless>
                    <Skeleton active />
                  </Cards>
                }
              >
                <BannerFinishProfile />
              </Suspense>
            </Col>
          )}

          <Col xxl={8} lg={24} xs={24}>
            <Suspense
              fallback={
                <Cards headless>
                  <Skeleton active />
                </Cards>
              }
            >
              <BannerCta2 name={profile.firstName ? `${profile.firstName} ${profile.lastName}` : ''} />
            </Suspense>
          </Col>

          <Col xxl={6} xl={8} lg={10} sm={24} xs={24}>
            <Suspense
              fallback={
                <Cards headless>
                  <Skeleton active />
                </Cards>
              }
            >
              <Banner2 />
            </Suspense>
          </Col>

          <Col xxl={6} xl={16} lg={14} sm={24} xs={24}>
            <Suspense
              fallback={
                <Cards headless>
                  <Skeleton active />
                </Cards>
              }
            >
              <Banner7 />
            </Suspense>
          </Col>
          <Col xxl={6} xl={16} lg={14} sm={24} xs={24}>
            <Suspense
              fallback={
                <Cards headless>
                  <Skeleton active />
                </Cards>
              }
            >
              <BannerRecords />
            </Suspense>
          </Col>
          <Col xxl={6} xl={8} lg={10} sm={24} xs={24}>
            <Suspense
              fallback={
                <Cards headless>
                  <Skeleton active />
                </Cards>
              }
            >
              <BannerEvent />
            </Suspense>
          </Col>

          <Col xxl={8} lg={24} xs={24}>
            <Suspense
              fallback={
                <Cards headless>
                  <Skeleton active />
                </Cards>
              }
            >
              <BannerCta />
            </Suspense>
          </Col>
          {/* <Col xxl={8} md={8} xs={24}>
            <Suspense
              fallback={
                <Cards headless>
                  <Skeleton active />
                </Cards>
              }
            >
              <TwitterOverview />
            </Suspense>
          </Col>
          <Col xxl={8} md={8} xs={24}>
            <Suspense
              fallback={
                <Cards headless>
                  <Skeleton active />
                </Cards>
              }
            >
              <InstagramOverview />
            </Suspense>
          </Col>
          <Col xxl={8} md={8} xs={24}>
            <Suspense
              fallback={
                <Cards headless>
                  <Skeleton active />
                </Cards>
              }
            >
              <LinkedinKeyMetrics />
            </Suspense>
          </Col>
          <Col xxl={16} xs={24}>
            <Suspense
              fallback={
                <Cards headless>
                  <Skeleton active />
                </Cards>
              }
            >
              <SocialTrafficMetrics />
            </Suspense>
          </Col> */}
        </Row>
      </Main>
    </>
  );
};

export default Dashboard;
