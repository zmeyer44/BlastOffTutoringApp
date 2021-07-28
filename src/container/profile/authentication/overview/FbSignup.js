import React, { useState, useEffect, useCallback, useLayoutEffect } from 'react';
import { Link, NavLink, useHistory } from 'react-router-dom';
import { FacebookOutlined, TwitterOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { Row, Col, Form, Input, Button, Select, Radio, Table, Tooltip, InputNumber } from 'antd';
import { useFirestoreConnect } from 'react-redux-firebase';
import { useDispatch, useSelector } from 'react-redux';
import FeatherIcon from 'feather-icons-react';
import { AuthWrapper } from './style';
import { Checkbox } from '../../../../components/checkbox/checkbox';
import Heading from '../../../../components/heading/heading';
import { fbAuthSignUp, fbSchoolAuth } from '../../../../redux/firebase/auth/actionCreator';
import { login } from '../../../../redux/authentication/actionCreator';
import { FigureWizards, WizardWrapper, ProductTable, OrderSummary } from '../Style';
import { Steps } from '../../../../components/steps/steps';
import { Cards } from '../../../../components/cards/frame/cards-frame';
//import { Button } from '../../../../components/buttons/buttons';
import { BasicFormWrapper } from '../../../styled';

const SignUp = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const {
    isSignUpError,
    isSignUpLoading,
    isFbAuthenticate,
    isSchoolCorrect,
    isSchoolChecking,
    isSchoolErr,
    isSchoolWrong,
    schools,
  } = useSelector(state => {
    return {
      isSignUpError: state.firebaseAuth.isSignUpError,
      isSignUpLoading: state.firebaseAuth.isSignUpLoading,
      isFbAuthenticate: state.fb.auth.uid,
      isSchoolCorrect: state.firebaseAuth.isSCHOOLAUTH,
      isSchoolChecking: state.firebaseAuth.isSchoolAuthLoading,
      isSchoolErr: state.firebaseAuth.isSchoolAuthError,
      isSchoolWrong: state.firebaseAuth.isSchoolAuthWrong,
      schools: state.fs.ordered.schools,
    };
  });
  useFirestoreConnect([{ collection: 'schools' }]);

  const [form] = Form.useForm();

  const [state, setState] = useState({
    current: 0,
  });

  useLayoutEffect(() => {
    const activeElement = document.querySelectorAll('.ant-steps-item-active');
    const successElement = document.querySelectorAll('.ant-steps-item-finish');

    activeElement.forEach(element => {
      if (element.previousSibling) {
        const bgImage = element.previousSibling;
        if (bgImage.classList.contains('success-step-item')) {
          bgImage.classList.remove('success-step-item');
        } else {
          bgImage.classList.remove('wizard-step-item');
        }
        bgImage.classList.add('wizard-steps-item-active');
      }
    });

    successElement.forEach(element => {
      if (element.previousSibling) {
        const bgImage = element.previousSibling;
        bgImage.classList.remove('wizard-steps-item-active');
        bgImage.classList.add('success-step-item');
      }
    });
  });

  const findSchool = () => {
    schoolAuth(state.school, state.code);
  };
  const createAccount = () => {
    dispatch(
      fbAuthSignUp({
        password: state.password,
        firstName: state.firstName,
        lastName: state.lastName,
        email: state.email,
        school: state.school,
        type: state.type,
      }),
    );
  };

  useEffect(() => {
    if (isSchoolCorrect) {
      setState({
        ...state,
        status: 'process',
        current: 1,
      });
    }
  }, [isSchoolCorrect]);

  const schoolAuth = (school, code) => {
    dispatch(fbSchoolAuth(school, code));
  };

  const { Option } = Select;
  const handleFbLogin = useCallback(() => {
    dispatch(login());
    history.push('/home');
  }, [dispatch, history]);

  useEffect(() => {
    if (isFbAuthenticate) {
      handleFbLogin();
    }
  }, [isFbAuthenticate, handleFbLogin]);

  const handleChange = values => {
    console.log(values);
    setState({
      ...state,
      ...values,
    });
  };

  const forms = [
    <Form
      name="schoolForm"
      form={form}
      onValuesChange={handleChange}
      onFinish={() => findSchool()}
      layout="vertical"
      style={{ width: '420px' }}
    >
      <Heading as="h3" style={{ marginBottom: '40px', marginTop: '25px' }}>
        1. Find your <span className="color-secondary">School</span>
      </Heading>
      <Form.Item
        name="school"
        initialValue="Find your school"
        label="School"
        rules={[{ required: true, message: 'Please select a school' }]}
      >
        <Select style={{ width: '100%' }}>
          {schools &&
            schools.map(school => {
              return (
                <Option key={school.id} value={school.id}>
                  {school.name}
                </Option>
              );
            })}
        </Select>
      </Form.Item>
      <Form.Item
        name="code"
        label="School Code"
        style={{ width: '50%' }}
        rules={[{ required: true, message: 'Please input your School Code!' }]}
      >
        <Input
          placeholder="School Code"
          suffix={
            <Tooltip title="Ask a school administrator">
              <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
            </Tooltip>
          }
        />
      </Form.Item>
      <div className="auth-form-action">
        <span className="input-message">Enter a valid code. Min 6 characters long</span>
      </div>

      {isSchoolWrong ? <p>{isSchoolWrong}</p> : null}
      {isSchoolErr ? <p>An error has occured</p> : null}

      <Form.Item>
        <Button className="btn-signin" htmlType="submit" type="primary" size="large">
          {isSchoolChecking ? 'Loading...' : 'Save & Next'}
        </Button>
      </Form.Item>
    </Form>,
    <Form
      name="register"
      form={form}
      onValuesChange={handleChange}
      onFinish={() => createAccount()}
      layout="vertical"
      style={{ width: '420px' }}
    >
      <Heading as="h3" style={{ marginBottom: '40px', marginTop: '25px' }}>
        2. Create Your <span className="color-secondary">Account</span>
      </Heading>
      <Form.Item name="firstName" rules={[{ required: true }]} label="First name">
        <Input placeholder="First name" />
      </Form.Item>
      <Form.Item name="lastName" rules={[{ required: true }]} label="Last name">
        <Input placeholder="Last name" />
      </Form.Item>
      <Form.Item name="email" rules={[{ type: 'email', required: true }]} label="Email Address">
        <Input placeholder="name@gmail.com" />
      </Form.Item>
      <Form.Item name="type" label="Account Type" rules={[{ required: true }]}>
        <Select style={{ width: '100%' }} placeholder="Please select">
          <Option value="Student">Student</Option>
          <Option value="Tutor">Tutor</Option>
          <Option value="Parent">Parent</Option>
        </Select>
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
      <div className="auth-form-action">
        <span className="input-message">Enter a valid password. Min 6 characters long</span>
      </div>

      {isSignUpError ? <p>{isSignUpError.message}</p> : null}
      <Form.Item>
        <Button className="btn-signin" htmlType="submit" type="primary" size="large">
          {isSignUpLoading ? 'Loading...' : 'Register'}
        </Button>
      </Form.Item>
    </Form>,
  ];
  return (
    <AuthWrapper style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
      <p className="auth-notice">
        Already have an account? <NavLink to="/">Sign In</NavLink>
      </p>
      <div className="auth-contents">{forms[state.current]}</div>
    </AuthWrapper>
  );
};

export default SignUp;
