import React, { useEffect, useState } from 'react';
import { Row, Col, Form, Input, Select, Radio, Upload, Spin } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { Cards } from '../../../../components/cards/frame/cards-frame';
import { Button } from '../../../../components/buttons/buttons';
import { Slider } from '../../../../components/slider/slider';
import { BasicFormWrapper } from '../../../styled';
import Heading from '../../../../components/heading/heading';
import { fbDataUpdate } from '../../../../redux/firebase/profile/actionCreator';

const { Option } = Select;

const Profile = () => {
  const dispatch = useDispatch();

  const { user, userId, isLoading } = useSelector(state => {
    return {
      user: state.fb.profile,
      userId: state.fb.auth.uid,
      isLoading: state.profile.loading,
    };
  });
  const [state, setState] = useState({
    join: null,
  });
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(user);
  }, [form, user]);

  const handleSubmit = values => {
    dispatch(
      fbDataUpdate(userId, {
        ...values,
      }),
    );
  };

  const handleCancel = e => {
    e.preventDefault();
    form.resetFields();
  };

  return (
    <Cards
      title={
        <div className="setting-card-title">
          <Heading as="h4">Edit Profile</Heading>
          <span>Set Up Your Personal Information</span>
        </div>
      }
    >
      <Row justify="center">
        <Col xl={12} lg={16} xs={24}>
          <BasicFormWrapper>
            {user ? (
              <Form
                className="add-record-form"
                style={{ width: '100%' }}
                layout="vertical"
                form={form}
                name="edit"
                onFinish={handleSubmit}
                initialValues={user}
              >
                <Form.Item name="firstName" rules={[{ required: true }]} label="First name">
                  <Input disabled />
                </Form.Item>
                <Form.Item name="lastName" rules={[{ required: true }]} label="Last name">
                  <Input disabled />
                </Form.Item>
                <Form.Item name="email" rules={[{ required: true, type: 'email' }]} label="Email">
                  <Input disabled />
                </Form.Item>
                <Form.Item name="school" rules={[{ required: true }]} label="School">
                  <Input disabled />
                </Form.Item>
                <Form.Item name="bio" rules={[{ required: true, message: 'Please input your bio!' }]} label="User bio">
                  <Input.TextArea rows={3} />
                </Form.Item>
                {user.type == 'Tutor' ? (
                  <>
                    <Form.Item
                      name="grades"
                      rules={[{ required: true }]}
                      label={`Grade Range: ${user.grades && user.grades[0]} - ${user.grades && user.grades[1]}`}
                    >
                      <Slider range defaultValues={user.grades ? user.grades : [1, 5]} min={1} max={12} />
                    </Form.Item>
                    <Form.Item name="subjects" label="Subjects" rules={[{ required: true }]}>
                      <Select mode="multiple" allowClear style={{ width: '100%' }} placeholder="Please select">
                        <Option value="math">Math</Option>
                        <Option value="english">English</Option>
                        <Option value="biology">Biology</Option>
                        <Option value="chemistry">Chemistry</Option>
                        <Option value="social-studies">Social Studies</Option>
                        <Option value="spanish">Spanish</Option>
                        <Option value="french">French</Option>
                        <Option value="italian">Italian</Option>
                        <Option value="geometry">Geometry</Option>
                        <Option value="marketing">Marketing</Option>
                        <Option value="computer-science">Computer Science</Option>
                        <Option value="physics">Physics</Option>
                      </Select>
                    </Form.Item>
                    <Form.Item name="tutoring-type" label="Tutoring Preference" rules={[{ required: true }]}>
                      <Radio.Group>
                        <Radio id="in-person" value="in-person">
                          In-person
                        </Radio>
                        <Radio id="virtual" value="virtual">
                          Virtual
                        </Radio>
                        <Radio id="both" value="both">
                          Both
                        </Radio>
                      </Radio.Group>
                    </Form.Item>
                    <Form.Item name="active" label="Status" rules={[{ required: true }]}>
                      <Radio.Group>
                        <Radio value={true}>Active</Radio>
                        <Radio value={false}>Deactivated</Radio>
                      </Radio.Group>
                    </Form.Item>
                  </>
                ) : (
                  <Form.Item name="grade" rules={[{ required: true }]} label={`Grade: ${user.grade && user.grade}`}>
                    <Slider defaultValues={user.grade ? user.grade : 5} min={1} max={12} />
                  </Form.Item>
                )}

                <div className="setting-form-actions">
                  <Button size="default" htmlType="submit" type="primary">
                    {isLoading ? 'Loading...' : 'Update Profile'}
                  </Button>
                  &nbsp; &nbsp;
                  <Button size="default" onClick={handleCancel} type="light">
                    Cancel
                  </Button>
                </div>
              </Form>
            ) : null}
          </BasicFormWrapper>
        </Col>
      </Row>
    </Cards>
  );
};

export default Profile;
