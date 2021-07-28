import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Upload, message } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';

const CoverSection = (user) => {
 

 

  return (
    <div className="cover-image">
      <img
        style={{ width: '100%', height: '150px', objectFit: 'cover' }}
        src={user.coverImage ? user.coverImage : require('../../../../static/img/profile/cover-img.png')}
        alt="banner"
      />
    </div>
  );
};

CoverSection.propTypes = {
  match: propTypes.object,
};

export default CoverSection;
