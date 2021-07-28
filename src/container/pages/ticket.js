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
import { supportTicket } from '../../redux/firebase/support/actionCreator';
import Heading from '../../components/heading/heading';
import { visitLexicalEnvironment } from 'typescript';


const { TextArea } = Input;

const Ticket = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { user, singleSession, isLoading } = useSelector(state => {
    return {
      user: state.fb.auth,
      isLoading: state.support.loading,
    };
  });

  const [state, setState] = useState({
    message: '',
    quality: '',
  });

  const { quality } = state;
  const [form] = Form.useForm();


  const handleSubmit = values => {
    if (!quality) {
      setState({
        ...state,
        message: 'Please rate your experience',
      });
    } else {
      values.quality = quality;
      values.user = user.uid;
      values.userEmail = user.email;
      dispatch(
        supportTicket({
          ...values
        }),
      );
      setState({
        ...state,
        message: '',
        quality: '',
      });
      history.push('/home/support');
    }
  };

  const handleClick = val => {
    setState({ ...state, quality: val });
  };

  return (
    <>
      <PageHeader ghost title="What do you need help with?" />
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
                  <Cards title={`We will do everything we can to solve the problem`}>
                    <Form name="support-form" layout="horizontal" form={form} name="support" onFinish={handleSubmit}>
                     
                    
                      <Row align="middle">
                        <Col lg={8} md={9} xs={24}>
                          <label htmlFor="subject">Subject</label>
                        </Col>
                        <Col lg={16} md={15} xs={24}>
                          <Form.Item name="subject" rules={[{ required: true, message: 'Please add a subject' }]}>
                            <Input />
                          </Form.Item>
                        </Col>
                      </Row>
                      <Row align="middle">
                        <Col lg={8} md={9} xs={24}>
                          <label htmlFor="issue">Describe your issue</label>
                        </Col>
                        <Col lg={16} md={15} xs={24}>
                          <Form.Item name="issue" rules={[{ required: true, message: 'Please include your issue' }]}>
                            <TextArea />
                          </Form.Item>
                        </Col>
                      </Row>
                      <Row align="middle">
                        <Col lg={8} md={9} xs={24}>
                          <label htmlFor="quality">How has your overall experience been?</label>
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

export default Ticket;
