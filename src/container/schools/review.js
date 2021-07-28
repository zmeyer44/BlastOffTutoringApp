import React, { useEffect, useState } from 'react';
import { Row, Col, Form, Input, Select, DatePicker, TimePicker, Radio, Rate, Spin } from 'antd';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import FeatherIcon from 'feather-icons-react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { RecordFormWrapper, HorizontalFormStyleWrap } from './style';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Button } from '../../components/buttons/buttons';
import { Main, BasicFormWrapper } from '../styled';
import { sessionReview, sessionSingle, sessionFileUploder } from '../../redux/firebase/sessions/actionCreator';
import Heading from '../../components/heading/heading';
import { visitLexicalEnvironment } from 'typescript';

const { Option } = Select;
const { TextArea } = Input;
const dateFormat = 'MM/DD/YYYY';
const Review = ({ match }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { rtl, singleSession, isLoading } = useSelector(state => {
    return {
      rtl: state.ChangeLayoutMode.rtlData,
      singleSession: state.singleSession.data,
      isLoading: state.singleSession.loading,
    };
  });

  const [state, setState] = useState({
    message: '',
    quality: '',
  });

  const { quality } = state;
  const [form] = Form.useForm();

  useEffect(() => {
    if (sessionSingle) {
      dispatch(sessionSingle(match.params.id));
    }
  }, [dispatch, match.params.id]);

  useEffect(() => {
    if (singleSession) {
      setState({ ...state, startDate: singleSession.date, startTime: singleSession.time });
    }
  }, [singleSession, dispatch]);

  const handleSubmit = values => {
    if (!quality) {
      setState({
        ...state,
        message: 'Please rate the audio and video quality',
      });
    } else {
      values.quality = quality;
      values.tutor = singleSession.tutor;
      dispatch(
        sessionReview(match.params.id, {
          ...values,
        }),
      );
      setState({
        ...state,
        message: '',
        quality: '',
      });
      history.push('/home/sessions/view');
    }
  };

  const handleClick = val => {
    setState({ ...state, quality: val });
  };

  return (
    <>
      <PageHeader ghost title="Welcome back from your session!" />
      <Main>
        <Row gutter={15} justify="center">
          <Col xl={12} md={16} sm={20} xs={24}>
            {singleSession === null ? (
              <Cards title="Loading...">
                <div className="record-spin">
                  <Spin />
                </div>
              </Cards>
            ) : (
              <BasicFormWrapper>
                <HorizontalFormStyleWrap>
                  <Cards title={`How was ${singleSession.tutor.name}?`}>
                    <Form name="review-form" layout="horizontal" form={form} name="review" onFinish={handleSubmit}>
                      <Row align="middle">
                        <Col lg={8} md={9} xs={24}>
                          <label htmlFor="rating">Tutor Rating</label>
                        </Col>
                        <Col lg={16} md={15} xs={24}>
                          <Form.Item name="rating" rules={[{ required: true, message: 'Please rate the tutor' }]}>
                            <Rate allowHalf defaultValue={0} style={{ fontSize: '1.3rem' }} />
                          </Form.Item>
                        </Col>
                      </Row>
                      <Row align="middle">
                        <Col lg={8} md={9} xs={24}>
                          <label htmlFor="duration">Duration</label>
                        </Col>
                        <Col lg={16} md={15} xs={24}>
                          <Form.Item name="duration" rules={[{ required: true, message: 'Please select a duration' }]}>
                            <Select size="large" className="sDash_fullwidth-select">
                              <Option value={30}>30 mins</Option>
                              <Option value={45}>45 mins</Option>
                              <Option value={60}>1 hour</Option>
                              <Option value={75}>1 hour 15 mins</Option>
                              <Option value={90}>1 hour 30 mins</Option>
                              <Option value={120}>2 hours</Option>
                            </Select>
                          </Form.Item>
                        </Col>
                      </Row>
                      <Row align="middle">
                        <Col lg={8} md={9} xs={24}>
                          <label htmlFor="comments">Additional Comments</label>
                        </Col>
                        <Col lg={16} md={15} xs={24}>
                          <Form.Item name="comments">
                            <TextArea />
                          </Form.Item>
                        </Col>
                      </Row>
                      <Row align="middle">
                        <Col lg={8} md={9} xs={24}>
                          <label htmlFor="quality">How was the audio and video quality?</label>
                        </Col>
                        <Col lg={16} md={15} xs={24}>
                          <Button
                            outlined
                            type="success"
                            onClick={() => handleClick('good')}
                            style={{ marginRight: '10px', background: quality === 'good' && '#20C9972b' }}
                          >
                            <FeatherIcon size={14} icon="smile" />
                            Good
                          </Button>
                          <Button
                            outlined
                            type="warning"
                            onClick={() => handleClick('poor')}
                            style={{ background: quality === 'poor' && '#FA8B0C2b' }}
                          >
                            <FeatherIcon size={14} icon="frown" />
                            Poor
                          </Button>
                        </Col>
                      </Row>
                      <Row>
                        {state.message ? <p style={{ color: 'red' }}>{state.message}</p> : null}
                        <Col lg={{ span: 16, offset: 8 }} md={{ span: 15, offset: 9 }} xs={{ span: 24, offset: 0 }}>
                          <div className="sDash_form-action">
                            <Button className="btn-signin" type="primary" htmlType="Save" size="large">
                              Submit
                            </Button>
                          </div>
                        </Col>
                      </Row>
                    </Form>
                  </Cards>
                </HorizontalFormStyleWrap>
              </BasicFormWrapper>
            )}
          </Col>
        </Row>
      </Main>
    </>
  );
};

export default Review;
