import React from 'react';
import FeatherIcon from 'feather-icons-react';
import FontAwesome from 'react-fontawesome';
import { Link } from 'react-router-dom';
import { UserBioBox } from './style';
import { Cards } from '../../../../components/cards/frame/cards-frame';
import { Button } from '../../../../components/buttons/buttons';

const UserBio = (user) => {
  return (
    <UserBioBox>
      <Cards title="Tutor Overview">
        <article className="user-info">
          <h5 className="user-info__title">Tutor Bio</h5>
          <p>{user.bio}</p>
        </article>
        <address className="user-info">
          <h5 className="user-info__title">Additional Info</h5>
          <ul className="user-info__contact">
            <li>
              <FeatherIcon icon="home" size={14} /> <span>{user.school}</span>
            </li>
            <li>
              <FeatherIcon icon="mail" size={14} /> <span>{user.email}</span>
            </li>
          </ul>
        </address>
        <div className="user-info">
          <h5 className="user-info__title">Skills</h5>
          <div className="user-info__skills">
            {user.subjects &&
              user.subjects.map(subject => {
                return (
                  <Button type="light" outlined className="btn-outlined">
                    {subject}
                  </Button>
                );
              })}
          </div>
        </div>
        {/* <div className="user-info">
          <h5 className="user-info__title">Acheivments</h5>
          <div className="card__social">
            <Link className="btn-icon facebook" to="#">
              <FontAwesome name="facebook" />
            </Link>
            <Link className="btn-icon twitter" to="#">
              <FontAwesome name="twitter" />
            </Link>
            <Link className="btn-icon dribble" to="#">
              <FontAwesome name="dribbble" />
            </Link>
            <Link className="btn-icon instagram" to="#">
              <FontAwesome name="instagram" />
            </Link>
          </div>
        </div> */}
      </Cards>
    </UserBioBox>
  );
};

export default UserBio;
