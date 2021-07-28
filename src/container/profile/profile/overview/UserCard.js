import React from 'react';
import FeatherIcon from 'feather-icons-react';
import { Link, useRouteMatch } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Col, Row } from 'antd';
import { UserCard } from './style';
import Heading from '../../../../components/heading/heading';
import { Cards } from '../../../../components/cards/frame/cards-frame';
import { Button } from '../../../../components/buttons/buttons';

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
                {user.firstName} {user.lastName}
              </Heading>
              <p className="card__designation">{user.school}</p>
            </div>

            <div className="card__actions">
              <Link to={`/home/chat/${user.id}`}>
                <Button size="default" type="white">
                  <FeatherIcon icon="mail" size={14} />
                  Message
                </Button>
              </Link>
            </div>
            <div className="card__info">
              <Row gutter={15}>
                <Col xs={8}>
                  <div className="info-single">
                    <Heading className="info-single__title" as="h2">
                      {user.reviewCount ? user.reviewCount : 0}
                    </Heading>
                    <p>Sessions</p>
                  </div>
                </Col>
                <Col xs={8}>
                  <div className="info-single">
                    <Heading className="info-single__title" as="h2">
                      {user.rating ? `${user.rating}/5` : `None yet`}
                    </Heading>
                    <p>Rating</p>
                  </div>
                </Col>
                <Col xs={8}>
                  <div className="info-single">
                    <Heading className="info-single__title" as="h2">
                      {user.grades && `${user.grades[0]} - ${user.grades[1]}`}
                    </Heading>
                    <p>Grade Range</p>
                  </div>
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
