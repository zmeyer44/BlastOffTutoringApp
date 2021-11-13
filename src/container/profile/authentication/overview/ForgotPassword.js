import React, { useState } from 'react';
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';
import { Form, Input, Button } from 'antd';
import { AuthWrapper } from './style';
import firebase from 'firebase/app';
import Heading from '../../../../components/heading/heading';

const ForgotPassword = () => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const handleSubmit = values => {
    return resetPassword(values).then(r => {
      if (r.error) {
        setError(r.error.message);
        setSuccess(false);
      } else {
        setSuccess('Email Sent!');
        setError(false);
      }
    });
  };

  const resetPassword = async values => {
    try {
      const message = await firebase.auth().sendPasswordResetEmail(values.email);
      return { message };
    } catch (error) {
      console.error('Error writing document: ', error);
      return { error };
    }
  };

  return (
    <AuthWrapper>
      <div className="auth-contents">
        <Form name="forgotPass" onFinish={handleSubmit} layout="vertical">
          <Heading as="h3">Forgot Password?</Heading>
          <p className="forgot-text">
            Enter the email address you used when you joined and we’ll send you instructions to reset your password.
          </p>
          <Form.Item
            label="Email Address"
            name="email"
            rules={[{ required: true, message: 'Please input your email!', type: 'email' }]}
          >
            <Input placeholder="name@example.com" />
          </Form.Item>
          {success && <p style={{ color: '#42ba96' }}>{success}</p>}
          {error && <p style={{ color: '#F5222D' }}>{error}</p>}
          <Form.Item>
            <Button className="btn-reset" htmlType="submit" type="primary" size="large">
              Send Reset Instructions
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

export default ForgotPassword;
