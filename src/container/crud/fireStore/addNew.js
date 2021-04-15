import React, { useState } from 'react';
import { Row, Col, Form, Input, Select, DatePicker, Radio, Upload, Spin } from 'antd';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import FeatherIcon from 'feather-icons-react';
import { RecordFormWrapper } from './style';
import { PageHeader } from '../../../components/page-headers/page-headers';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { Button } from '../../../components/buttons/buttons';
import { Main, BasicFormWrapper } from '../../styled';
import { fbDataSubmit, fbFileUploder, fbFileClear } from '../../../redux/firebase/firestore/actionCreator';
import Heading from '../../../components/heading/heading';
import ImgCrop from 'antd-img-crop';

const { Option } = Select;
const dateFormat = 'YYYY/MM/DD';

const AddNew = () => {
  const dispatch = useDispatch();
  const { isLoading, url, isFileLoading } = useSelector(state => {
    return {
      isLoading: state.crud.loading,
      url: state.crud.url,
      isFileLoading: state.crud.fileLoading,
    };
  });

  const [form] = Form.useForm();
  const [state, setState] = useState({
    join: '',
  });

  const handleSubmit = values => {
    dispatch(
      fbDataSubmit({
        ...values,
        url,
        join: state.join,
        id: new Date().getTime(),
      }),
    );
    form.resetFields();
    dispatch(fbFileClear());
  };

  const onChange = (date, dateString) => {
    setState({ join: dateString });
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
      console.log(info);
      if (info.file.status !== 'uploading') {
        dispatch(fbFileUploder(info.file.originFileObj));
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
            <Link to="/admin/firestore/fbView">View All</Link>
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
                        <figure className="pro-image align-center-v">
                          <img
                            src={url === null ? require('../../../static/img/avatar/profileImage.png') : url}
                            alt=""
                          />
                          <figcaption>
                            <ImgCrop>
                              <Upload {...props}>
                                <Link className="upload-btn" to="#">
                                  <FeatherIcon icon="camera" size={16} />
                                </Link>
                              </Upload>
                            </ImgCrop>

                            <div className="info">
                              <Heading as="h4">Profile Photo</Heading>
                            </div>
                            {isFileLoading && (
                              <div className="isUploadSpain">
                                <Spin />
                              </div>
                            )}
                          </figcaption>
                        </figure>
                        <Form.Item name="name" label="Name">
                          <Input placeholder="Input Name" />
                        </Form.Item>
                        <Form.Item name="email" rules={[{ type: 'email' }]} label="Email">
                          <Input placeholder="example@gmail.com" />
                        </Form.Item>
                        <Form.Item name="country" initialValue="" label="Country">
                          <Select style={{ width: '100%' }}>
                            <Option value="">Please Select</Option>
                            <Option value="bangladesh">Bangladesh</Option>
                            <Option value="india">India</Option>
                            <Option value="pakistan">Pakistan</Option>
                            <Option value="srilanka">Srilanka</Option>
                          </Select>
                        </Form.Item>
                        <Form.Item name="city" initialValue="" label="City">
                          <Select style={{ width: '100%' }}>
                            <Option value="">Please Select</Option>
                            <Option value="dhaka">Dhaka</Option>
                            <Option value="mymensingh">Mymensingh</Option>
                            <Option value="khulna">Khulna</Option>
                            <Option value="barisal">Barisal</Option>
                          </Select>
                        </Form.Item>
                        <Form.Item name="company" label="Company">
                          <Input placeholder="Company Name" />
                        </Form.Item>
                        <Form.Item name="position" label="Position">
                          <Input placeholder="Position" />
                        </Form.Item>
                        <Form.Item label="Joining Date">
                          <DatePicker onChange={onChange} style={{ width: '100%' }} format={dateFormat} />
                        </Form.Item>
                        <Form.Item name="status" label="Status">
                          <Radio.Group>
                            <Radio value="active">Active</Radio>
                            <Radio value="deactivated">Deactivated</Radio>
                            <Radio value="blocked">Blocked</Radio>
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
