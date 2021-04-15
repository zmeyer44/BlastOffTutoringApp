import React from 'react';
import FeatherIcon from 'feather-icons-react';
import { Link, useRouteMatch } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Col, Row } from 'antd';
import { UserCard } from '../style';
import Heading from '../../../components/heading/heading';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { Button } from '../../../components/buttons/buttons';

const UserCards = user => {
  const { path } = useRouteMatch();
  return (
    <UserCard>
      <div className="card user-card">
        <Cards headless>
          <figure>
            <img src={user.profileImage ? user.profileImage : '../../../static/img/avatar/profileImage.png'} alt="" />
          </figure>
          <figcaption>
            <div className="card__content">
              <Heading className="card__name" as="h6">
                <Link to="#">{user.name}</Link>
              </Heading>
              <p className="card__designation">{user.type}</p>
            </div>

            <div className="card__actions">
              <Link to={`${path}/settings`}>
                <Button size="default" type="white">
                  <FeatherIcon icon="settings" size={14} />
                  Settings
                </Button>
              </Link>
            </div>
            <div className="card__info">
              <Row gutter={15}>
                <Col xs={8}>
                  <div className="info-single">
                    <Heading className="info-single__title" as="h2">
                      12
                    </Heading>
                    <p>Sessions</p>
                  </div>
                </Col>
                <Col xs={8}>
                  <div className="info-single">
                    <Heading className="info-single__title" as="h2">
                      9.7
                    </Heading>
                    <p>Hours</p>
                  </div>
                </Col>
                <Col xs={8}>
                  {user.type == 'Tutor' ? (
                    <div className="info-single">
                      <Heading className="info-single__title" as="h2">
                        4.9
                      </Heading>
                      <p>Rating</p>
                    </div>
                  ) : (
                    <div className="info-single">
                      <Heading className="info-single__title" as="h2">
                        3
                      </Heading>
                      <p>Grade</p>
                    </div>
                  )}
                </Col>
              </Row>
            </div>
          </figcaption>
        </Cards>
      </div>
    </UserCard>
  );
};

UserCards.propTypes = {
  user: PropTypes.object,
};

export default UserCards;
