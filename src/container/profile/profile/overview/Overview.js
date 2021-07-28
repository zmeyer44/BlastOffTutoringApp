import React, { useEffect, Suspense } from 'react';
import { Row, Col, Table, Skeleton } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ProductOverviewTable } from './style';
import { Cards } from '../../../../components/cards/frame/cards-frame';
import Heading from '../../../../components/heading/heading';
import UserBio from './UserBio'

const Overview = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => {
    return {
       user: state.fs.data.selectedUser,
    };
  });


  return (
    <Row gutter={25}>
      <Col xs={24}>
        <Suspense
          fallback={
            <Cards headless>
              <Skeleton active paragraph={{ rows: 10 }} />
            </Cards>
          }
        >
          <UserBio {...user} />
        </Suspense>
      </Col>
    </Row>
  );
};

export default Overview;
