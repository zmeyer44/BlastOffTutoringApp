import React, { useEffect, useState } from 'react';
import { Row, Col, Form, Input, Select, DatePicker, TimePicker, Radio, Upload, Spin } from 'antd';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useFirestoreConnect } from 'react-redux-firebase';
import FeatherIcon from 'feather-icons-react';
import moment from 'moment';
import PropTypes from 'prop-types';
import firebase from 'firebase/app';
import { RecordFormWrapper } from './style';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Button } from '../../components/buttons/buttons';
import { Main, BasicFormWrapper } from '../styled';
import { schoolUpdate, schoolSingle } from '../../redux/firebase/schools/actionCreator';
import Heading from '../../components/heading/heading';

const { Option } = Select;
const dateFormat = 'MM/DD/YYYY';
const Edit = ({ match }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const slug = match.params.id;

  const [selectedSchool, setSelectedSchool] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // const { selectedSchool, isLoading } = useSelector(state => {
  //   return {
  //     selectedSchool: state.fs.data.school,
  //     isLoading: state.singleSchool.loading,
  //   };
  // });
  // useFirestoreConnect([{ collection: 'schools', doc: `${slug}`, storeAs: 'school' }]);
  const getSchoolInfo = async () => {
    try {
      const result = await firebase
        .firestore()
        .collection('schools')
        .doc(slug)
        .get();
      console.log(result.data());
      return result.data();
    } catch (error) {
      console.error('Error writing document: ', error);
    }
  };

  useEffect(() => {
    getSchoolInfo()
      .then(r => setSelectedSchool(r))
      .then(() => setIsLoading(false))
      .catch(err => console.error(err));
  }, [slug]);

  // useFirestoreConnect([{ collection: 'schools', doc: `${slug}`, storeAs: 'school' }]);
  // const { selectedSchool, isLoading } = useSelector(state => {
  //   return {
  //     selectedSchool: state.fs.data.school,
  //     isLoading: state.singleSchool.loading,
  //   };
  // });

  const [state, setState] = useState({
    join: '',
  });
  const [form] = Form.useForm();

  useEffect(() => {
    if (selectedSchool) {
      setState({
        ...state,
        join: selectedSchool.joinDate,
      });
    }
  }, [match, selectedSchool]);

  const handleSubmit = values => {
    if (!state.join) {
      setState({
        ...state,
        message: 'Please enter a date',
      });
    } else {
      dispatch(
        schoolUpdate(match.params.id, {
          ...values,
          joinDate: state.join,
        }),
      );
      history.push('/home/schools/view');
    }
  };

  const onChange = (date, dateString) => {
    setState({ ...state, join: dateString });
  };

  return (
    <>
      <PageHeader
        buttons={[
          <Button className="btn-add_new" size="default" key="1" type="primary">
            <Link key="1" to="/home/schools/View">
              View All
            </Link>
          </Button>,
        ]}
        ghost
        title="Update School"
      />
      <Main>
        <Row gutter={15}>
          <Col xs={24}>
            <RecordFormWrapper>
              <Cards headless>
                {!selectedSchool ? (
                  <div className="record-spin">
                    <Spin />
                  </div>
                ) : (
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
                          initialValues={selectedSchool}
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
                            <Input placeholder="School ID" disabled />
                          </Form.Item>

                          <Form.Item
                            name="plan"
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
                            <DatePicker
                              onChange={onChange}
                              style={{ width: '100%' }}
                              format={dateFormat}
                              defaultValue={moment(selectedSchool.joinDate, dateFormat)}
                            />
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
                              {isLoading ? 'Loading...' : 'Submit'}
                            </Button>
                          </div>
                        </Form>
                      </BasicFormWrapper>
                    </Col>
                  </Row>
                )}
              </Cards>
            </RecordFormWrapper>
          </Col>
        </Row>
      </Main>
    </>
  );
};

export default Edit;
