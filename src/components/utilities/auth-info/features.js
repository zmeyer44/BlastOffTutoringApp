import React from 'react';
import FeatherIcon from 'feather-icons-react';
import { Link } from 'react-router-dom';
import { Row, Col } from 'antd';
import { SettingDropdwon } from './auth-info-style';
import { Popover } from '../../popup/popup';
import Heading from '../../heading/heading';

const Features = () => {
  const content = (
    <SettingDropdwon>
      <div className="setting-dropdwon">
        <Row gutter="10">
          <Col sm={12}>
            <figure className="setting-dropdwon__single d-flex">
              <img src={require('../../../static/img/icon/014-document.png')} alt="" />
              <figcaption>
                <Heading as="h5">Send Messages</Heading>
                <p>Chat with tutors</p>
              </figcaption>
            </figure>
          </Col>
          <Col sm={12}>
            <figure className="setting-dropdwon__single d-flex">
              <img src={require('../../../static/img/icon/015-color-palette.png')} alt="" />
              <figcaption>
                <Heading as="h5">Find Tutors</Heading>
                <p>View our large library of tutors </p>
              </figcaption>
            </figure>
          </Col>
          <Col sm={12}>
            <figure className="setting-dropdwon__single d-flex">
              <img src={require('../../../static/img/icon/010-home.png')} alt="" />
              <figcaption>
                <Heading as="h5">Local</Heading>
                <p>Filter tutors by school </p>
              </figcaption>
            </figure>
          </Col>
          <Col sm={12}>
            <figure className="setting-dropdwon__single d-flex">
              <img src={require('../../../static/img/icon/017-video-camera.png')} alt="" />
              <figcaption>
                <Heading as="h5">Video Chat</Heading>
                <p>Video chat with tutors in our learning space </p>
              </figcaption>
            </figure>
          </Col>
          <Col sm={12}>
            <figure className="setting-dropdwon__single d-flex">
              <img src={require('../../../static/img/icon/013-document-1.png')} alt="" />
              <figcaption>
                <Heading as="h5">Print Certificate</Heading>
                <p>Download your tutoring certificate</p>
              </figcaption>
            </figure>
          </Col>
          <Col sm={12}>
            <figure className="setting-dropdwon__single d-flex">
              <img src={require('../../../static/img/icon/007-microphone-1.png')} alt="" />
              <figcaption>
                <Heading as="h5">Quality Audio</Heading>
                <p>High quality audio and video</p>
              </figcaption>
            </figure>
          </Col>
        </Row>
      </div>
    </SettingDropdwon>
  );

  return (
    <div className="settings">
      <Popover placement="bottomRight" content={content} action="click">
        <Link to="#" className="head-example">
          <FeatherIcon icon="map" size={20} />
        </Link>
      </Popover>
    </div>
  );
};

export default Features;
