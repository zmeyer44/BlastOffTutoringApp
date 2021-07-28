import React, { useEffect, useState } from 'react';
import { Row, Col, Form, Input, Select, DatePicker, TimePicker, Radio, Upload, Spin } from 'antd';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useFirestoreConnect } from 'react-redux-firebase';
import FeatherIcon from 'feather-icons-react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { RecordFormWrapper } from './style';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Button } from '../../components/buttons/buttons';
import { Main, BasicFormWrapper } from '../styled';
import { schoolUpdate, schoolSingle } from '../../redux/firebase/schools/actionCreator';
import { fbDataUpdate, fbFileUploder } from '../../redux/firebase/profile/actionCreator';
import ImgCrop from 'antd-img-crop';

const Edit = ({ match }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = match.params.account;

  const { schoolAccount, isLoading } = useSelector(state => {
    return {
      schoolAccount: state.fs.data.schoolAccount,
      isLoading: state.singleSchool.loading,
    };
  });
  useFirestoreConnect([{ collection: 'users', doc: `${user}`, storeAs: 'schoolAccount' }]);

  const [state, setState] = useState({
    join: '',
  });
  const [form] = Form.useForm();

  const handleSubmit = values => {
    dispatch(fbDataUpdate(user, values));
    history.push(`/home/schools/accounts/${schoolAccount.school}`);
  };
  const onPreview = async file => {
    let src = file.url;
    if (!src) {
      src = await new Promise(resolve => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow.document.write(image.outerHTML);
  };

  const props = {
    name: 'file',
    multiple: false,
    showUploadList: false,
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        dispatch(fbFileUploder(user, 'profileImage', info.file.originFileObj));
      }
      if (info.file.status === 'done') {
        // message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        // message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  return (
    <>
      <PageHeader
        buttons={[
          <Button className="btn-add_new" size="default" key="1" type="primary">
            <Link key="1" to={schoolAccount ? `/home/schools/accounts/${schoolAccount.school}` : '/home/schools/view'}>
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
                {!schoolAccount ? (
                  <div className="record-spin">
                    <Spin />
                  </div>
                ) : (
                  <Row justify="center">
                    <Col xl={10} md={16} xs={24}>
                      <figure className="pro-image align-center-v mt-25">
                        <img
                          style={{ width: '120px', height: '120px', objectFit: 'cover' }}
                          src={schoolAccount.profileImage}
                          alt=""
                        />

                        <ImgCrop>
                          <Upload {...props}>
                            <Link className="upload-btn" to="#">
                              <FeatherIcon icon="camera" size={16} />
                            </Link>
                          </Upload>
                        </ImgCrop>
                      </figure>
                      <BasicFormWrapper>
                        <Form
                          className="add-record-form"
                          style={{ width: '100%' }}
                          layout="vertical"
                          form={form}
                          name="edit"
                          onFinish={handleSubmit}
                          initialValues={schoolAccount}
                        >
                          <Form.Item name="firstName" rules={[{ required: true }]} label="First name">
                            <Input placeholder="First name" />
                          </Form.Item>
                          <Form.Item name="lastName" rules={[{ required: true }]} label="Last name">
                            <Input placeholder="Last name" />
                          </Form.Item>
                          <Form.Item name="email" rules={[{ type: 'email' }]} label="Email">
                            <Input disabled />
                          </Form.Item>
                          <Form.Item name="position" label="Position">
                            <Input />
                          </Form.Item>
                          <div className="record-form-actions text-right">
                            <Button htmlType="submit" type="primary">
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
