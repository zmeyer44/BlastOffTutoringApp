import React, { useState } from 'react';
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';
import { Form, Input, Button } from 'antd';
import { AuthWrapper } from './style';
import { useDispatch } from 'react-redux';

import Heading from '../../../../components/heading/heading';
import { addSchool } from '../../../../redux/firebase/support/actionCreator';

const NewSchool = () => {
  const dispatch = useDispatch();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const handleSubmit = async values => {
    dispatch(
      addSchool({
        schoolName: values?.schoolName,
        schoolWebsite: values?.schoolWebsite,
        contactEmail: values?.email || '',
      }),
    );
    setSuccess('Request Sent!');
    setError(false);
  };

  return (
    <AuthWrapper>
      <div className="auth-contents">
        <Form name="forgotPass" onFinish={handleSubmit} layout="vertical">
          <Heading as="h3">Add your school!</Heading>
          <p className="forgot-text">
            Enter your school's name and contact info and we will reach out to sign them up! In order for students to
            use our site, their school must sign up first.
          </p>
          <Form.Item name="schoolName" rules={[{ required: true }]} label="School name">
            <Input placeholder="Jefferson High School" />
          </Form.Item>
          <Form.Item name="schoolWebsite" rules={[{ required: true }]} label="School website">
            <Input placeholder="www.jeffersonhighschool.com" />
          </Form.Item>
          <Form.Item label="Contact Email Address" name="email">
            <Input placeholder="name@example.com" />
          </Form.Item>
          {success && <p style={{ color: '#42ba96' }}>{success}</p>}
          {error && <p style={{ color: '#F5222D' }}>{error}</p>}
          <Form.Item>
            <Button className="btn-reset" htmlType="submit" type="primary" size="large">
              Send School Request
            </Button>
          </Form.Item>
          <p className="return-text">
            Return to <NavLink to="/">Sign In</NavLink>
          </p>
        </Form>
      </div>
    </AuthWrapper>
  );
};

export default NewSchool;
