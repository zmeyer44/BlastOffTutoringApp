import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Input, Select, DatePicker, TimePicker, Radio, Upload, Spin } from 'antd';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useFirestoreConnect } from 'react-redux-firebase';
import FeatherIcon from 'feather-icons-react';
import { RecordFormWrapper } from './style';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Button } from '../../components/buttons/buttons';
import { Main, BasicFormWrapper } from '../styled';
import { sessionSubmit, sessionFileUploder, sessionFileClear } from '../../redux/firebase/sessions/actionCreator';
import Heading from '../../components/heading/heading';
import ImgCrop from 'antd-img-crop';

const { Option } = Select;
const dateFormat = 'MM/DD/YYYY';

const AddNew = () => {
  const dispatch = useDispatch();
  const { isLoading, url, isFileLoading, convos, uid, profile } = useSelector(state => {
    return {
      isLoading: state.session.loading,
      url: state.session.url,
      isFileLoading: state.session.fileLoading,
      convos: state.fs.data.conversations,
      uid: state.fb.auth.uid,
      profile: state.fb.profile,
    };
  });

  useFirestoreConnect([{ collection: 'conversations', where: ['users', 'array-contains', `${uid}`] }]);

  const [form] = Form.useForm();
  const [state, setState] = useState({
    join: '',
    students: [],
    startTime: '',
    startDate: '',
  });

  const { students } = state;

  useEffect(() => {
    let unmounted = false;

    if (convos) {
      let arrayOfConvos = Object.values(convos);
      console.log(arrayOfConvos);
      let contacts = arrayOfConvos.map(convo => {
        console.log('inside IF');
        if (convo.user1.id !== uid) {
          if (!unmounted) {
            return convo.user1;
          }
        } else {
          if (!unmounted) {
            return convo.user1;
          }
        }
      });
      console.log('CONTACTS:');
      console.log(contacts);
      if (!unmounted) {
        setState({
          ...state,
          students: students.concat(contacts),
        });
      }
    }
    console.log(state);
    return () => {
      unmounted = true;
    };
  }, [convos]);

  const handleSubmit = values => {
    const selected = students.filter(student => student.id == values.student);
    values.student = selected[0];
    let tutorName = `${profile.firstName} ${profile.lastName}`;
    let tutor = { id: uid, name: tutorName, profileImage: profile.profileImage };

    values.tutor = tutor;
    values.date = state.startDate;
    values.time = state.startTime;
    console.log(values);
    dispatch(
      sessionSubmit({
        ...values,
      }),
    );
    form.resetFields();
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
            <Link to="/home/sessions/view">View All</Link>
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
                        name="addnew"
                        onFinish={handleSubmit}
                      >
                        <Form.Item name="student" initialValue="Choose a student" label="Student">
                          <Select style={{ width: '100%' }}>
                            {convos && students.length ? (
                              students.map(student => {
                                return (
                                  <Option key={student.id} value={student.id}>
                                    {student.name}
                                  </Option>
                                );
                              })
                            ) : (
                              <Option>You must first chat with a student!</Option>
                            )}
                          </Select>
                        </Form.Item>

                        <Form.Item name="subject" label="Subject">
                          <Input placeholder="Subject" />
                        </Form.Item>

                        <Form.Item label="Meeting Date">
                          <DatePicker onChange={onChangeStart} format={dateFormat} />
                          <TimePicker onChange={onChangeStartTime} picker="time" format="h:mm a" minuteStep={15} />
                        </Form.Item>
                        <Form.Item name="status" label="Status">
                          <Radio.Group>
                            <Radio value="approved" disabled>
                              Approved
                            </Radio>
                            <Radio value="pending" Checked disabled>
                              Pending
                            </Radio>
                            <Radio value="denied" disabled>
                              Denied
                            </Radio>
                          </Radio.Group>
                        </Form.Item>
                        <div className="record-form-actions text-right">
                          <Button size="default" htmlType="Save" type="primary">
                            {isLoading ? 'Loading...' : 'Submit'}
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
