import React, { useEffect, useState } from 'react';
import { Row, Col, Form, Input, Select, DatePicker, TimePicker, Radio, Upload, Spin } from 'antd';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import FeatherIcon from 'feather-icons-react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { RecordFormWrapper } from './style';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Button } from '../../components/buttons/buttons';
import { Main, BasicFormWrapper } from '../styled';
import { sessionUpdate, sessionSingle, sessionFileUploder } from '../../redux/firebase/sessions/actionCreator';
import Heading from '../../components/heading/heading';

const { Option } = Select;
const dateFormat = 'MM/DD/YYYY';
const Edit = ({ match }) => {
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
    startTime: '',
    startDate: '',
    message: '',
  });
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
    if (!state.startDate) {
      setState({
        ...state,
        message: 'Please enter a date',
      });
    } else if (!state.startTime) {
      setState({
        ...state,
        message: 'Please enter a time',
      });
    } else {
      let updatedValues = {
        date: state.startDate,
        time: state.startTime,
        subject: values.subject,
        title: values.title,
      };
      dispatch(
        sessionUpdate(match.params.id, {
          ...updatedValues,
        }),
      );
      setState({
        ...state,
        message: '',
      });
      history.push('/home/sessions/view');
    }
  };

  const onChangeStart = (date, dateString) => {
    setState({ ...state, startDate: dateString });
  };

  const onChangeStartTime = (time, timeString) => {
    setState({ ...state, startTime: timeString });
  };

  return (
    <>
      <PageHeader
        buttons={[
          <Button className="btn-add_new" size="default" key="1" type="primary">
            <Link key="1" to="/home/sessions/View">
              View All
            </Link>
          </Button>,
        ]}
        ghost
        title="Update Your Session"
      />
      <Main>
        <Row gutter={15}>
          <Col xs={24}>
            <RecordFormWrapper>
              <Cards headless>
                {singleSession === null ? (
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
                          name="addnew"
                          onFinish={handleSubmit}
                        >
                          <Form.Item
                            name="student"
                            initialValue={singleSession.student.name}
                            label="Student"
                            rules={[{ required: true, message: 'Please select a student' }]}
                          >
                            <Select style={{ width: '100%' }} disabled>
                              <Option value={singleSession.student.name}>{singleSession.student.name}</Option>
                            </Select>
                          </Form.Item>

                          <Form.Item
                            name="title"
                            label="Title"
                            initialValue={singleSession.title}
                            rules={[{ required: true, message: 'Please add a title' }]}
                          >
                            <Input placeholder="e.g. Midterm review session" />
                          </Form.Item>
                          <Form.Item
                            name="subject"
                            label="Subject"
                            initialValue={singleSession.subject}
                            rules={[{ required: true, message: 'Please select a subject' }]}
                          >
                            <Select style={{ width: '100%' }}>
                              <Option value="Math">Math</Option>
                              <Option value="English">English</Option>
                              <Option value="Biology">Biology</Option>
                              <Option value="Chemistry">Chemistry</Option>
                              <Option value="Social Studies">Social Studies</Option>
                              <Option value="Spanish">Spanish</Option>
                              <Option value="French">French</Option>
                              <Option value="italian">Italian</Option>
                              <Option value="Geometry">Geometry</Option>
                              <Option value="Marketing">Marketing</Option>
                              <Option value="Computer Science">Computer Science</Option>
                              <Option value="Physics">Physics</Option>
                              {/* {convos && students.length ? (
                              students.map(student => {
                                return (
                                  <Option key={student.id} value={student.id}>
                                    {student.name}
                                  </Option>
                                );
                              })
                            ) : (
                              <Option>You must first chat with a student!</Option>
                            )} */}
                            </Select>
                          </Form.Item>

                          <Form.Item label="Meeting Date">
                            <DatePicker
                              onChange={onChangeStart}
                              format={dateFormat}
                              defaultValue={moment(singleSession.date, dateFormat)}
                            />
                            <TimePicker
                              onChange={onChangeStartTime}
                              picker="time"
                              format="h:mm a"
                              minuteStep={15}
                              defaultValue={moment(singleSession.time, 'h:mm a')}
                            />
                          </Form.Item>
                          <Form.Item name="status" label="Status">
                            <Radio.Group defaultValue={singleSession.status}>
                              <Radio value="accepted" disabled>
                                Accepted
                              </Radio>
                              <Radio value="pending" disabled>
                                Pending
                              </Radio>
                              <Radio value="rejected" disabled>
                                Rejected
                              </Radio>
                            </Radio.Group>
                          </Form.Item>
                          {state.message ? <p style={{ color: 'red' }}>{state.message}</p> : null}
                          <div className="record-form-actions text-right">
                            <Button size="default" htmlType="Save" type="primary">
                              {isLoading ? 'Loading...' : 'Update'}
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
