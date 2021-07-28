import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Input, Select, DatePicker, TimePicker, Radio, Upload, Spin } from 'antd';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useFirestoreConnect } from 'react-redux-firebase';
import FeatherIcon from 'feather-icons-react';
import { RecordFormWrapper } from './style';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Button } from '../../components/buttons/buttons';
import { Main, BasicFormWrapper } from '../styled';
import { fbAuthSignUp } from '../../redux/firebase/auth/actionCreator';

const AddNewAccount = ({ match }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { isSignUpError, isSignUpLoading } = useSelector(state => {
    return {
      isSignUpError: state.firebaseAuth.isSignUpError,
      isSignUpLoading: state.firebaseAuth.isSignUpLoading,
    };
  });

  const [form] = Form.useForm();

  const handleSubmit = values => {
    values.school = match.params.id;
    values.type = 'School';

    dispatch(fbAuthSignUp(values));
    form.resetFields();
    history.push(`/home/schools/accounts/${match.params.id}`);
  };

  return (
    <>
      <PageHeader
        buttons={[
          <Button className="btn-add_new" size="default" key="1" type="primary">
            <Link to={`/home/schools/accounts/${match.params.id}`}>View All</Link>
          </Button>,
        ]}
        ghost
        title="Add New"
      />
      <Main>
        <Row gutter={15}>
          <Col xs={24}>
            <RecordFormWrapper>
              <Cards headless>
                <Row justify="center">
                  <Col xl={10} md={16} xs={24}>
                    <BasicFormWrapper>
                      <Form
                        name="register"
                        form={form}
                        style={{ width: '100%' }}
                        layout="vertical"
                        onFinish={handleSubmit}
                      >
                        <Form.Item name="firstName" rules={[{ required: true }]} label="First name">
                          <Input placeholder="First name" />
                        </Form.Item>
                        <Form.Item name="lastName" rules={[{ required: true }]} label="Last name">
                          <Input placeholder="Last name" />
                        </Form.Item>
                        <Form.Item name="email" rules={[{ type: 'email', required: true }]} label="Email Address">
                          <Input placeholder="name@gmail.com" />
                        </Form.Item>
                        <Form.Item name="position" rules={[{ required: true }]} label="Position">
                          <Input placeholder="Position" />
                        </Form.Item>
                        <Form.Item
                          name="password"
                          rules={[
                            {
                              min: 6,
                              message: 'Enter a valid password. Min 6 characters long.',
                              required: true,
                            },
                          ]}
                          label="Password"
                        >
                          <Input.Password placeholder="Password" />
                        </Form.Item>
                        {isSignUpError ? <p>{isSignUpError.message}</p> : null}

                        <div className="record-form-actions text-right">
                          <Button size="default" htmlType="Save" type="primary">
                            {isSignUpLoading ? 'Loading...' : 'Register'}
                          </Button>
                        </div>
                      </Form>
                    </BasicFormWrapper>
                  </Col>
                </Row>
              </Cards>
            </RecordFormWrapper>
          </Col>
        </Row>
      </Main>
    </>
  );
};

export default AddNewAccount;
