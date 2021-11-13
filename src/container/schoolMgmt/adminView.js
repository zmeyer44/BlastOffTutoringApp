import React, { useEffect, useState } from 'react';
import { Row, Col, Table, Spin } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useFirestoreConnect } from 'react-redux-firebase';
import { Link } from 'react-router-dom';
import FeatherIcon from 'feather-icons-react';
import { RecordViewWrapper } from './style';
import { Main, TableWrapper } from '../styled';
import { Popover } from '../../components/popup/popup';
import { Button } from '../../components/buttons/buttons';
import { Cards } from '../../components/cards/frame/cards-frame';
import { PageHeader } from '../../components/page-headers/page-headers';
import { studentApprove } from '../../redux/firebase/students/actionCreator';

const ViewPage = () => {
  const dispatch = useDispatch();
  const { students, isLoading } = useSelector(state => {
    return {
      students: state.fs.ordered.students,
      isLoading: state.fs.status.requesting.schools,
    };
  });

  useFirestoreConnect([
    {
      collection: 'users',
      where: [
        ['type', '==', 'Tutor'],
        ['approved', '==', false],
      ],
      storeAs: 'students',
    },
  ]);

  const [state, setState] = useState({
    selectedRowKeys: [],
  });
  const { selectedRowKeys } = state;

  const dataSource = [];

  const handleDelete = id => {
    const confirm = window.confirm('Are you sure delete this?');
    if (confirm) {
      dispatch(schoolDelete(id));
    }
    return false;
  };
  const handleApprove = id => {
    const confirm = window.confirm('Are you sure you want to approve this student?');
    if (confirm) {
      dispatch(studentApprove(id));
    }
    return false;
  };

  const onHandleSearch = e => {
    console.log(e);
  };

  if (students) {
    console.log(students);
    students.map((person, key) => {
      const { id, firstName, lastName, email, school, approved, profileImage } = person;
      return dataSource.push({
        key: key + 1,
        name: (
          <div className="record-img align-center-v">
            <img
              src={profileImage !== null ? profileImage : require('../../static/img/avatar/profileImage.png')}
              alt={id}
            />
            <span>
              <span>{firstName + ' ' + lastName}</span>
              <span className="record-location">{school}</span>
            </span>
          </div>
        ),
        email,
        approved: <span className="status pending">Pending</span>,
        action: (
          <div className="table-actions">
            <Popover placement="top" content="Approve Student">
              <Link className="edit" to="#" onClick={() => handleApprove(id)}>
                <FeatherIcon icon="edit" size={14} />
              </Link>
            </Popover>
            &nbsp;&nbsp;&nbsp;
            {/* <Link className="delete" onClick={() => handleDelete(id)} to="#">
              <FeatherIcon icon="trash-2" size={14} />
            </Link> */}
          </div>
        ),
      });
    });
  }

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Status',
      dataIndex: 'approved',
      key: 'approved',
    },
    {
      title: 'Actions',
      dataIndex: 'action',
      key: 'action',
      width: '90px',
    },
  ];
  const onSelectChange = selectedRowKey => {
    setState({ ...state, selectedRowKeys: selectedRowKey });
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  return (
    <RecordViewWrapper>
      <PageHeader ghost title="All Pending Students" />
      <Main>
        <Row gutter={15}>
          <Col className="w-100" md={24}>
            <Cards headless>
              {isLoading ? (
                <div className="spin">
                  <Spin />
                </div>
              ) : (
                <div>
                  <TableWrapper className="table-data-view table-responsive">
                    <Table
                      rowSelection={rowSelection}
                      pagination={{ pageSize: 10, showSizeChanger: true }}
                      dataSource={dataSource}
                      columns={columns}
                    />
                  </TableWrapper>
                </div>
              )}
            </Cards>
          </Col>
        </Row>
      </Main>
    </RecordViewWrapper>
  );
};

export default ViewPage;
