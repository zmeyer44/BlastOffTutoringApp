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
import { sessionDelete, sessionRead, sessionSearch, sessionUpdate } from '../../redux/firebase/sessions/actionCreator';

const ViewPage = () => {
  const dispatch = useDispatch();
  const { students, isLoading, uid } = useSelector(state => {
    return {
      students: state.fs.ordered.schools,
      isLoading: state.fs.status.requesting.schools,
      uid: state.fb.auth.uid,
    };
  });

  useFirestoreConnect([{ collection: 'schools' }]);

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

  const onHandleSearch = e => {
    console.log(e);
  };

  if (schools)
    schools.map((school, key) => {
      const { id, name, plan, users, tutors, schoolAccounts, joinDate, status } = school;
      return dataSource.push({
        key: key + 1,
        name,
        plan,
        users,
        tutors,
        schoolAccounts,
        jdate: joinDate,
        status: <span className={`status ${status}`}>{status}</span>,
        action: (
          <div className="table-actions">
            <Link className="edit" to={`/home/schools/accounts/${id}`}>
              <FeatherIcon icon="users" size={14} />
            </Link>
            &nbsp;&nbsp;&nbsp;
            <Link className="edit" to={`/home/schools/edit/${id}`}>
              <FeatherIcon icon="edit" size={14} />
            </Link>
          </div>
        ),
      });
    });

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Plan',
      dataIndex: 'plan',
      key: 'plan',
    },
    {
      title: 'User count',
      dataIndex: 'users',
      key: 'users',
    },
    {
      title: 'Tutor count',
      dataIndex: 'tutors',
      key: 'tutors',
    },
    {
      title: 'Administrators',
      dataIndex: 'schoolAccounts',
      key: 'schoolAccounts',
    },
    {
      title: 'Joining Date',
      dataIndex: 'jdate',
      key: 'jdate',
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
              <Link to="/home/schools/add">
                <FeatherIcon icon="plus" size={14} /> Add New
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
        title="School List"
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
