import React, { useState } from 'react';
import { Row, Col, Form, Select, Input, Spin } from 'antd';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import FeatherIcon from 'feather-icons-react';
import { HorizontalFormStyleWrap } from './style';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Button } from '../../components/buttons/buttons';
import { Main, BasicFormWrapper } from '../styled';
import { supportTicket } from '../../redux/firebase/support/actionCreator';

const { TextArea } = Input;

const MissingHours = () => {
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

  const [form] = Form.useForm();

  const handleSubmit = values => {
    values.user = user.uid;
    values.userEmail = user.email;
    dispatch(
      supportTicket({
        ...values,
        type: 'missingHours',
      }),
    );
    setState({
      ...state,
      message: '',
      quality: '',
    });
    history.push('/home/support');
  };

  return (
    <>
      <PageHeader ghost title="Does something not appear quite right?" />
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
                  <Cards title={`Let us know what hours you are missing`}>
                    <Form name="support-form" layout="horizontal" form={form} name="support" onFinish={handleSubmit}>
                      <Row align="middle">
                        <Col lg={8} md={9} xs={24}>
                          <label htmlFor="subject">Subject</label>
                        </Col>
                        <Col lg={16} md={15} xs={24}>
                          <Form.Item
                            name="subject"
                            initialValue="Missing Hours"
                            rules={[{ required: true, message: 'Please add a subject' }]}
                          >
                            <Input value="Missing Hours" />
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
                          <label htmlFor="issue">Tell us about the session that is missing</label>
                        </Col>
                        <Col lg={16} md={15} xs={24}>
                          <Form.Item name="issue" rules={[{ required: true, message: 'Please include your issue' }]}>
                            <TextArea />
                          </Form.Item>
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

export default MissingHours;
