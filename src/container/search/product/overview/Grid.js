import React, { useState, useEffect } from 'react';
import { Row, Col, Pagination, Spin } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import TutorCards from './TutorCards';
import Heading from '../../../../components/heading/heading';
import { PaginationWrapper, NotFoundWrapper } from '../../Style';
import { fetchTutors } from '../../../../redux/firebase/tutor/actionCreator';
import { Button } from '../../../../components/buttons/buttons';

const Grid = () => {
  const dispatch = useDispatch();

  const { school, showTutors, isLoader } = useSelector(state => {
    return {
      school: state.fb.profile.school,
      showTutors: state.tutor.filteredData,
      isLoader: state.tutor.loading,
    };
  });

  const [state, setState] = useState({
    tutors: showTutors,
    current: 0,
    pageSize: 20,
  });
  const { tutors, pageSize } = state;

  useEffect(() => {
    if (fetchTutors && school) {
      if (pageSize) {
        dispatch(fetchTutors(school, pageSize));
      } else {
        dispatch(fetchTutors(school, 20));
      }
    }
  }, [dispatch, pageSize, school]);

  useEffect(() => {
    if (showTutors) {
      setState({
        ...state,
        tutors: showTutors,
      });
    }
  }, [showTutors]);

  const onLoadMore = () => {
    let newSize = pageSize + 20;
    setState({ ...state, pageSize: newSize });
  };

  return (
    <Row gutter={30}>
      {isLoader ? (
        <Col xs={24}>
          <div className="spin">
            <Spin />
          </div>
        </Col>
      ) : tutors ? (
        tutors
          .slice(0, pageSize)
          .map(
            ({
              id,
              firstName,
              lastName,
              grades,
              email,
              coverImage,
              profileImage,
              school,
              subjects,
              reviewCount,
              rating,
            }) => {
              return (
                <Col xxl={8} xl={8} lg={12} xs={24} key={id}>
                  <TutorCards
                    user={{
                      id,
                      firstName,
                      lastName,
                      grades,
                      email,
                      coverImage,
                      profileImage,
                      school,
                      subjects,
                      reviewCount,
                      rating,
                    }}
                  />
                </Col>
              );
            },
          )
      ) : (
        <Col md={24}>
          <NotFoundWrapper>
            <Heading as="h1">Data Not Found</Heading>
          </NotFoundWrapper>
        </Col>
      )}
      <Col xs={24} className="pb-30">
        <PaginationWrapper style={{ marginTop: 10 }}>
          {tutors.length >= pageSize ? (
            <Button size="default" type="white" onClick={onLoadMore}>
              Load More
            </Button>
          ) : null}
        </PaginationWrapper>
      </Col>
    </Row>
  );
};

export default Grid;
