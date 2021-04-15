import React, { useEffect, useState } from 'react';
import { Row, Col, Table, Spin } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import FeatherIcon from 'feather-icons-react';
import { RecordViewWrapper } from './style';
import { Main, TableWrapper } from '../styled';
import { Button } from '../../components/buttons/buttons';
import { Cards } from '../../components/cards/frame/cards-frame';
import { PageHeader } from '../../components/page-headers/page-headers';
import { sessionDelete, sessionRead, sessionSearch } from '../../redux/firebase/sessions/actionCreator';

const ViewPage = () => {
  const dispatch = useDispatch();
  const { sessions, isLoading } = useSelector(state => {
    return {
      sessions: state.session.data,
      isLoading: state.session.loading,
    };
  });

  const [state, setState] = useState({
    selectedRowKeys: [],
  });
  const { selectedRowKeys } = state;

  useEffect(() => {
    if (sessionRead) {
      dispatch(sessionRead());
    }
  }, [dispatch]);
  const dataSource = [];

  const handleDelete = id => {
    const confirm = window.confirm('Are you sure delete this?');
    if (confirm) {
      dispatch(sessionDelete(parseInt(id, 10)));
    }
    return false;
  };

  const onHandleSearch = e => {
    dispatch(sessionSearch(e.target.value, sessions));
  };

  if (sessions.length)
    sessions.map((session, key) => {
      const { id, tutor, student, date, time, subject, status, link } = session;
      return dataSource.push({
        key: key + 1,
        tutor: (
          <div className="record-img align-center-v">
            <img
              src={
                tutor.profileImage !== null ? tutor.profileImage : require('../../static/img/avatar/profileImage.png')
              }
              alt={tutor.name}
            />
            <span>
              <span>{tutor.name}</span>
              <span className="record-location">Tutor</span>
            </span>
          </div>
        ),
        student: (
          <div className="record-img align-center-v">
            <img
              src={
                student.profileImage !== null
                  ? student.profileImage
                  : require('../../static/img/avatar/profileImage.png')
              }
              alt={student.name}
            />
            <span>
              <span>{student.name}</span>
              <span className="record-location">Student</span>
            </span>
          </div>
        ),
        date,
        time,
        subject,
        status: <span className={`status deactivated`}>{status}</span>,
        action: (
          <div className="table-actions">
            {/* <Link className="edit" to={`/admin/firestore/edit/${id}`}>
              <FeatherIcon icon="edit" size={14} />
            </Link>
            &nbsp;&nbsp;&nbsp;
            <Link className="delete" onClick={() => handleDelete(id)} to="#">
              <FeatherIcon icon="trash-2" size={14} />
            </Link> */}
            <a href={link} target="_blank">
              <span className={`status active`}>Join Call</span>
            </a>
          </div>
        ),
      });
    });

  const columns = [
    {
      title: 'Tutor',
      dataIndex: 'tutor',
      key: 'tutor',
    },
    {
      title: 'Student',
      dataIndex: 'student',
      key: 'student',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Time',
      dataIndex: 'time',
      key: 'time',
    },
    {
      title: 'Subject',
      dataIndex: 'subject',
      key: 'subject',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
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
      <PageHeader
        subTitle={
          <div>
            <Button className="btn-add_new" size="default" key="1" type="primary">
              <Link to="/home/sessions/add">
                <FeatherIcon icon="plus" size={14} /> New Invite
              </Link>
            </Button>
          </div>
        }
        buttons={[
          <div key={1} className="search-box">
            <span className="search-icon">
              <FeatherIcon icon="search" size={14} />
            </span>
            <input onChange={onHandleSearch} type="text" name="recored-search" placeholder="Search Here" />
          </div>,
        ]}
        ghost
        title="Sessions"
      />
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
