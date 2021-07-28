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
import { accountDelete, sessionRead, sessionSearch, sessionUpdate } from '../../redux/firebase/sessions/actionCreator';

const ViewPage = ({ match }) => {
  const dispatch = useDispatch();
  const { accounts } = useSelector(state => {
    return {
      accounts: state.fs.ordered.schoolAccounts,
    };
  });
  useFirestoreConnect([
    {
      collection: 'users',
      where: [
        ['school', '==', `${match.params.id}`],
        ['type', '==', 'School'],
      ],
      storeAs: 'schoolAccounts',
    },
  ]);

  const [state, setState] = useState({
    selectedRowKeys: [],
  });
  const { selectedRowKeys } = state;

  const dataSource = [];

  const handleDelete = id => {
    const confirm = window.confirm('Are you sure delete this account?');
    if (confirm) {
      //   dispatch(fbDataDelete(parseInt(id, 10)));
    }
    return false;
  };

  const onHandleSearch = e => {
    // dispatch(fbDataSearch(e.target.value, crud));
  };

  if (accounts)
    accounts.map((person, key) => {
      const { id, firstName, lastName, email, school, position, profileImage } = person;
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
        position,
        action: (
          <div className="table-actions">
            <Link className="edit" to={`/home/schools/accounts/edit/${id}`}>
              <FeatherIcon icon="edit" size={14} />
            </Link>
            &nbsp;&nbsp;&nbsp;
            {/* <Link className="delete" onClick={() => handleDelete(id)} to="#">
              <FeatherIcon icon="trash-2" size={14} />
            </Link> */}
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
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Position',
      dataIndex: 'position',
      key: 'position',
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
              <Link to={`/home/schools/accounts/${match.params.id}/add`}>
                <FeatherIcon icon="plus" size={14} /> Add New
              </Link>
            </Button>
          </div>
        }
        buttons={[
          <Button className="btn-add_new" size="default" key="1" type="primary">
            <Link key={1} to="/home/schools/view">
              All Schools
            </Link>
          </Button>,
          //   <div key={2} className="search-box">
          //     <span className="search-icon">
          //       <FeatherIcon icon="search" size={14} />
          //     </span>
          //     <input onChange={onHandleSearch} type="text" name="recored-search" placeholder="Search Here" />
          //   </div>,
        ]}
        ghost
        title="Account List"
      />
      <Main>
        <Row gutter={15}>
          <Col className="w-100" md={24}>
            <Cards headless>
              {!accounts ? (
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
