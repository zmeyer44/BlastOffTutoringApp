import React, { useEffect, useState } from 'react';
import { Row, Col, Table, Spin, Skeleton } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useFirestoreConnect } from 'react-redux-firebase';
import { Switch, Route, Link } from 'react-router-dom';
import FeatherIcon from 'feather-icons-react';
import Certificate from './invoice';
import { RecordViewWrapper } from './style';
import { Main, TableWrapper } from '../styled';
import { Popover } from '../../components/popup/popup';
import { Button } from '../../components/buttons/buttons';
import { Cards } from '../../components/cards/frame/cards-frame';
import { PageHeader } from '../../components/page-headers/page-headers';
import { studentApprove } from '../../redux/firebase/students/actionCreator';
import Invoice from './invoice';

const StudentsTable = (rowSelection, dataSource, columns) => {
  return (
    <div>
      {dataSource ? (
        <TableWrapper className="table-data-view table-responsive">
          <Table
            rowSelection={rowSelection}
            pagination={{ pageSize: 10, showSizeChanger: true }}
            dataSource={dataSource}
            columns={columns}
          />
        </TableWrapper>
      ) : (
        <div />
      )}
    </div>
  );
};

const ViewPage = ({ match }) => {
  const dispatch = useDispatch();
  const { students, isLoading, school } = useSelector(state => {
    return {
      students: state.fs.ordered.students,
      isLoading: state.fs.status.requesting.schools,
      school: state.fb.profile.school,
    };
  });

  useFirestoreConnect([
    {
      collection: 'users',
      where: ['school', '==', `${school}`],
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

  if (students) {
    students.map((person, key) => {
      const { id, firstName, lastName, email, school, type, approved, profileImage } = person;
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
        type: <span className="status">{type}</span>,

        action:
          type == 'Tutor' ? (
            <div className="table-actions">
              <Popover placement="top" content="View Certificate">
                <Link className="edit" to={`${match.path}/${id}`}>
                  <FeatherIcon icon="eye" size={14} />
                </Link>
              </Popover>
              &nbsp;&nbsp;&nbsp;
            </div>
          ) : (
            <div className="table-actions">
              <span className="status">Not a Tutor</span>
              &nbsp;&nbsp;&nbsp;
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
      title: 'Account Type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'View Certificate',
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
      <PageHeader ghost title="All Students" />
      <Main>
        <Row gutter={15}>
          <Col className="w-100" md={24}>
            <Cards headless>
              {isLoading ? (
                <div className="spin">
                  <Spin />
                </div>
              ) : (
                <Switch>
                  <Route
                    exact
                    path={`${match.path}/:id`}
                    render={() => {
                      return <Invoice />;
                    }}
                  />
                  <Route
                    exact
                    path={`${match.path}`}
                    render={() => {
                      return (
                        <TableWrapper className="table-data-view table-responsive">
                          <Table
                            rowSelection={rowSelection}
                            pagination={{ pageSize: 10, showSizeChanger: true }}
                            dataSource={dataSource}
                            columns={columns}
                          />
                        </TableWrapper>
                      );
                    }}
                  />
                </Switch>
              )}
            </Cards>
          </Col>
        </Row>
      </Main>
    </RecordViewWrapper>
  );
};

export default ViewPage;
