import React from 'react';
import FeatherIcon from 'feather-icons-react';
import { Link } from 'react-router-dom';
import { Rate } from 'antd';
import PropTypes from 'prop-types';
import { UserCard } from './style';
import Heading from '../../../../components/heading/heading';
import { Cards } from '../../../../components/cards/frame/cards-frame';
import { Button } from '../../../../components/buttons/buttons';

const TutorCards = ({ user }) => {
  const { firstName, lastName, school, profileImage, coverImage, id, reviewCount, rating } = user;
  return (
    <UserCard cover={coverImage} key={id}>
      <div className="card user-card theme-grid-2">
        <Cards headless>
          <figure>
            <div className="user-card__img">
              <img src={profileImage} alt="" />
            </div>

            <figcaption>
              <div
                className="user-card__bg"
                style={{
                  height: '150px',
                  background: `url(${coverImage})`,
                }}
              />
              <div className="card__bottom">
                <div className="card__content">
                  <Heading className="card__name" as="h6">
                    <Link to="#">{`${firstName} ${lastName}`}</Link>
                  </Heading>
                  <p className="card__designation">{school}</p>
                </div>
                <div className="product-single-rating" style={{ marginBottom: '15px', minHeight: '41px' }}>
                  {rating ? (
                    <>
                      <Rate defaultValue={rating} disabled /> {rating}
                      <span className="card__designation"> {` ${reviewCount} Reviews`}</span>
                    </>
                  ) : (
                    <span className="card__designation"> No reviews yet</span>
                  )}
                </div>
                <div className="card__actions">
                  <Button size="default" type="white">
                    <FeatherIcon icon="message-square" size={14} />
                    Chat
                  </Button>
                  <Button size="default" type="primary">
                    <FeatherIcon icon="user" size={14} style={{ color: 'white' }} />
                    View Profile
                  </Button>
                </div>
              </div>
            </figcaption>
          </figure>
        </Cards>
      </div>
    </UserCard>
  );
};

TutorCards.propTypes = {
  user: PropTypes.object,
};

export default TutorCards;
