import React from 'react';
import { Carousel } from 'antd';
import { Link } from 'react-router-dom';
import {
  Figure2,
  Figure3,
  Figure6,
  Figure7,
  BannerWrapper,
  BannerNormal,
  BannerCarouselWrap,
  BannerLongWrap,
  BannerCardWrap,
  BannerCtaWrap,
} from './Style';
import { Button } from '../buttons/buttons';
import { Cards } from '../cards/frame/cards-frame';
import { Children } from 'react';

const Banner1 = () => {
  return (
    <BannerNormal>
      <Cards headless bodyStyle={{ minHeight: '270px' }}>
        <h2>15 Days Free Trail</h2>
        <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut</p>
        <Button className="btn-outlined" size="small" outlined type="primary">
          Start
        </Button>
      </Cards>
    </BannerNormal>
  );
};

const Banner2 = () => {
  return (
    <BannerWrapper>
      <Cards className="mb-70" bodyStyle={{ background: '#0f63f2', borderRadius: '10px', minHeight: '270px' }} headless>
        <Figure2>
          <img src={require('../../static/img/banner/1.png')} alt="" />
          <figcaption>
            <h2>View your Calendar</h2>
            <p>Keep track of exams, assignments, and all scheduled meetings.</p>
            <Link to="/home/calendar/week">
              <Button size="large" type="white" style={{ marginTop: '7px' }}>
                View Calendar
              </Button>
            </Link>
          </figcaption>
        </Figure2>
      </Cards>
    </BannerWrapper>
  );
};

const BannerEvent = () => {
  return (
    <BannerWrapper>
      <Cards className="mb-70" bodyStyle={{ background: '#F24F28', borderRadius: '10px', minHeight: '270px' }} headless>
        <Figure2>
          <img src={require('../../static/img/banner/1.png')} alt="" />
          <figcaption>
            <h2>Schedule a Meeting</h2>
            <p>Schedule a meeting with a student you have been chatting with.</p>
            <Link to="/home/sessions/add">
              <Button size="large" type="white" style={{ marginTop: '7px' }}>
                Create Meeting
              </Button>
            </Link>
          </figcaption>
        </Figure2>
      </Cards>
    </BannerWrapper>
  );
};

const Banner3 = () => {
  return (
    <BannerWrapper>
      <Cards bodyStyle={{ borderRadius: '10px', minHeight: '270px', background: '#0f63f2' }} headless>
        <Figure3>
          <img src={require('../../static/img/banner/2.png')} alt="" />
          <figcaption>
            <h2>Earn More Money</h2>
            <Button size="large" type="white">
              Learn More
            </Button>
          </figcaption>
        </Figure3>
      </Cards>
    </BannerWrapper>
  );
};

const Banner4 = () => {
  return (
    <BannerWrapper>
      <Cards bodyStyle={{ background: '#272B41', borderRadius: '10px', minHeight: '270px' }} headless>
        <Figure3 className="theme-3">
          <img src={require('../../static/img/banner/3.png')} alt="" />
          <figcaption>
            <h2>Win Your Bonus</h2>
            <p>Weekly performance bonus</p>
            <Button size="large" type="white">
              Learn More
            </Button>
          </figcaption>
        </Figure3>
      </Cards>
    </BannerWrapper>
  );
};

const BannerFinishProfile = () => {
  return (
    <BannerWrapper>
      <Cards className="mb-70" bodyStyle={{ background: '#0F63F2', borderRadius: '10px', minHeight: '270px' }} headless>
        <Figure2>
          <img src={require('../../static/img/banner/8.png')} alt="" />
          <figcaption>
            <h2>Complete your profile</h2>
            <p>Finish your profile to start getting messages from students looking for help.</p>
            <Link to="/home/settings">
              <Button size="large" type="white">
                Finish Profile
              </Button>
            </Link>
          </figcaption>
        </Figure2>
      </Cards>
    </BannerWrapper>
  );
};

const Banner5 = () => {
  return (
    <BannerWrapper>
      <Cards
        bodyStyle={{
          background: '#0f63f2',
          borderRadius: '10px',
          minHeight: '265px',
          display: 'flex',
          alignItems: 'center',
        }}
        headless
      >
        <Figure3 className="theme-wide">
          <img src={require('../../static/img/banner/4.png')} alt="" />
          <figcaption>
            <h2>Congratulations Jhon!</h2>
            <p>Best Seller on the last month.</p>
            <Button size="large" type="white">
              Learn More
            </Button>
          </figcaption>
        </Figure3>
      </Cards>
    </BannerWrapper>
  );
};

const Banner6 = () => {
  return (
    <BannerWrapper>
      <Cards
        bodyStyle={{
          background: `url(${require('../../static/img/banner/5.png')})`,
          backgroundSize: 'cover',
          borderRadius: '10px',
          minHeight: '265px',
          display: 'flex',
          direction: 'ltr',
          alignItems: 'center',
        }}
        headless
      >
        <Figure6>
          <img src={require('../../static/img/banner/badge.svg')} alt="" />
          <figcaption>
            <h2>Up to 50 OFF</h2>
            <Button className="btn-outlined" size="small" outlined type="danger">
              Buy Now
            </Button>
          </figcaption>
        </Figure6>
      </Cards>
    </BannerWrapper>
  );
};

const Banner7 = () => {
  return (
    <BannerNormal className="theme-wide">
      <Cards bodyStyle={{ minHeight: '270px' }} headless>
        <Figure7>
          <img src={require('../../static/img/banner/6.png')} alt="" />
          <figcaption>
            <h2>Check your inbox</h2>
            <p>See if you have received any new messages or meeting invites.</p>
            <Link to="/home/chat">
              <Button className="btn-outlined" size="large" outlined type="primary">
                View Messages
              </Button>
            </Link>
          </figcaption>
        </Figure7>
      </Cards>
    </BannerNormal>
  );
};

const BannerRecords = () => {
  return (
    <BannerNormal className="theme-wide">
      <Cards bodyStyle={{ background: '#51B3A7', borderRadius: '10px', minHeight: '270px' }} headless>
        <Figure7>
          <img src={require('../../static/img/banner/6.png')} alt="" />
          <figcaption>
            <h2>View Records</h2>
            <p>See if you have received any new records in your inbox.</p>
            <Link to="/home/sessions/view">
              <Button className="btn-outlined" size="large" type="primary">
                View Records
              </Button>
            </Link>
          </figcaption>
        </Figure7>
      </Cards>
    </BannerNormal>
  );
};

const BannerCarousel = () => {
  return (
    <BannerCarouselWrap>
      <Carousel autoplay>
        <div className="banner-signle">
          <div className="banner-single__img">
            <img src={require('../../static/img/banner/8.png')} alt="" />
          </div>
          <div className="banner-single__content">
            <h3>Achievements</h3>
            <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr.</p>
          </div>
        </div>
        {/* End of /.banner-signle */}
        <div className="banner-signle">
          <div className="banner-single__img">
            <img src={require('../../static/img/banner/8.png')} alt="" />
          </div>
          <div className="banner-single__content">
            <h3>Achievements</h3>
            <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr.</p>
          </div>
        </div>
        {/* End of /.banner-signle */}
        <div className="banner-signle">
          <div className="banner-single__img">
            <img src={require('../../static/img/banner/8.png')} alt="" />
          </div>
          <div className="banner-single__content">
            <h3>Achievements</h3>
            <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr.</p>
          </div>
        </div>
        {/* End of /.banner-signle */}
      </Carousel>
    </BannerCarouselWrap>
  );
};

const BannerLong = () => {
  return (
    <BannerLongWrap>
      <div className="banner-long-inner">
        <h2>Up To Date </h2>
        <img src={require('../../static/img/banner/9.png')} alt="" />
      </div>
    </BannerLongWrap>
  );
};

const BannerCard = () => {
  return (
    <BannerCardWrap>
      <div
        className="banner-card-inner"
        style={{ backgroundImage: `url("${require('../../static/img/banner/card-banner-1.png')}")` }}
      >
        <h2>Need More Space?</h2>
        <Button size="small" type="white">
          Buy Storage
        </Button>
      </div>
    </BannerCardWrap>
  );
};

const BannerCard2 = () => {
  return (
    <BannerCardWrap>
      <div
        className="banner-card-inner theme-2"
        style={{ backgroundImage: `url("${require('../../static/img/banner/card-banner-2.png')}")` }}
      >
        <h2>Create Sale Report</h2>
        <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy</p>
        <Button size="small" type="white">
          Learn More
        </Button>
      </div>
    </BannerCardWrap>
  );
};

const BannerCta = () => {
  return (
    <BannerCtaWrap>
      <div
        className="banner-cta align-center-v"
        style={{ backgroundImage: `url("${require('../../static/img/banner/cta-banner-1.png')}")` }}
      >
        <div className="banner-cta__content">
          <h2>Dedicated Support</h2>
          <Link to="/home/support">
          <Button size="small" type="primary">
            Learn More
          </Button>
          </Link>
        </div>
      </div>
    </BannerCtaWrap>
  );
};

const BannerCta2 = props => {
  return (
    <BannerCtaWrap>
      <div
        className="banner-cta align-center-v theme-2"
        style={{ backgroundImage: `url("${require('../../static/img/banner/cta-banner-2.png')}")` }}
      >
        <div className="banner-cta__content">
          <h2>Welcome Back {props.name}!</h2>
          <p>Glad to see you here. If you're looking for help try speaking with some of our tutors! </p>
          <Link to="/home/search">
            <Button size="small" type="white">
              Find Tutors
            </Button>
          </Link>
        </div>
      </div>
    </BannerCtaWrap>
  );
};

export {
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
};
