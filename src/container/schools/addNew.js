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
import { schoolAdd } from '../../redux/firebase/schools/actionCreator';
import Heading from '../../components/heading/heading';
import ImgCrop from 'antd-img-crop';

const { Option } = Select;
const dateFormat = 'MM/DD/YYYY';

const AddNew = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [form] = Form.useForm();
  const [state, setState] = useState({
    join: '',
    isLoading: false,
  });

  const handleSubmit = values => {
    setState({
      ...state,
      isLoading: true,
    });
    values.users = 0;
    values.tutors = 0;
    values.schoolAccounts = 0;

    if (state.join) {
      dispatch(
        schoolAdd({
          ...values,
          joinDate: state.join,
        }),
      );
      form.resetFields();
      history.push('/home/schools/view');
    } else {
      setState({
        ...state,
        message: 'Please select a date',
      });
    }
  };

  const onChange = (date, dateString) => {
    setState({ join: dateString });
  };

  return (
    <>
      <PageHeader
        buttons={[
          <Button className="btn-add_new" size="default" key="1" type="primary">
            <Link to="/home/schools/view">View All</Link>
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
                        className="add-record-form"
                        style={{ width: '100%' }}
                        layout="vertical"
                        form={form}
                        name="newSchool"
                        onFinish={handleSubmit}
                      >
                        <Form.Item
                          name="name"
                          label="Name"
                          rules={[{ required: true, message: 'Please enter a name' }]}
                        >
                          <Input placeholder="School Name" />
                        </Form.Item>
                        <Form.Item
                          name="id"
                          label="School ID"
                          rules={[{ required: true, message: 'Please enter a school slug' }]}
                        >
                          <Input placeholder="School ID" />
                        </Form.Item>

                        <Form.Item
                          name="plan"
                          initialValue="Basic"
                          label="Plan"
                          rules={[{ required: true, message: 'Please select a plan' }]}
                        >
                          <Select style={{ width: '100%' }}>
                            <Option value="Basic">Basic</Option>
                            <Option value="Professional">Professional</Option>
                            <Option value="Ultimate">Ultimate</Option>
                            <Option value="Custom">Custom</Option>
                          </Select>
                        </Form.Item>
                        <Form.Item
                          name="code"
                          label="School code"
                          rules={[{ required: true, message: 'Please enter a school code' }]}
                        >
                          <Input placeholder="School code" />
                        </Form.Item>
                        <Form.Item label="Joining Date">
                          <DatePicker onChange={onChange} style={{ width: '100%' }} format={dateFormat} />
                        </Form.Item>
                        <Form.Item
                          name="status"
                          label="Status"
                          rules={[{ required: true, message: 'Please choose a status' }]}
                        >
                          <Radio.Group>
                            <Radio value="active">Active</Radio>
                            <Radio value="trial">Trial</Radio>
                            <Radio value="deactivated">Deactivated</Radio>
                          </Radio.Group>
                        </Form.Item>
                        {state.message}
                        <div className="record-form-actions text-right">
                          <Button size="default" htmlType="Save" type="primary">
                            {state.isLoading ? 'Loading...' : 'Submit'}
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

export default AddNew;
