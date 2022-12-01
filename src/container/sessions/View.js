import React, { useEffect, useState } from 'react';
import { Row, Col, Table, Spin } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useFirestoreConnect } from 'react-redux-firebase';
import { Link, useHistory } from 'react-router-dom';
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
  const history = useHistory();

  const { sessions1, sessions2, isLoading, uid, type } = useSelector(state => {
    return {
      sessions1: state.fs.data.sessions1,
      sessions2: state.fs.data.sessions2,
      isLoading: state.fs.status.requesting.sessions2,
      uid: state.fb.auth.uid,
      type: state.fb.profile.type,
    };
  });

  useFirestoreConnect([{ collection: 'sessions', where: ['student.id', '==', `${uid}`], storeAs: 'sessions1' }]);
  useFirestoreConnect([
    {
      collection: 'sessions',
      where: [
        ['tutor.id', '==', `${uid}`],
        ['archived', '==', false],
      ],
      storeAs: 'sessions2',
    },
  ]);

  const [state, setState] = useState({
    selectedRowKeys: [],
  });
  const { selectedRowKeys } = state;
  const [sessions, setSessions] = useState(null);

  useEffect(() => {
    if (sessions1 || sessions2) {
      //case where just a student
      if (!sessions2) {
        let sessions1Array = Object.values(sessions1);
        setSessions(sessions1Array);

        //case where just a tutor
      } else if (!sessions1) {
        let sessions2Array = Object.values(sessions2);
        setSessions(sessions2Array);

        //must contain both
      } else {
        let sessions1Array = Object.values(sessions1);
        let sessions2Array = Object.values(sessions2);

        const totalSessions = sessions2Array.concat(sessions1Array);
        setSessions(totalSessions);
      }
    }
  }, [sessions1, sessions2]);
  const dataSource = [];

  const handleConfirm = id => {
    history.push(`/home/sessions/review/${id}`);

    return;
  };
  const handleAccept = id => {
    dispatch(sessionUpdate(id, { status: 'accepted' }));

    return false;
  };
  const handleReject = id => {
    const confirm = window.confirm('Are you sure reject this Session?');
    if (confirm) {
      dispatch(sessionUpdate(id, { status: 'rejected' }));
      // dispatch(sessionRead(uid));
    }
    return false;
  };
  const handleArchive = id => {
    const confirm = window.confirm('Are you sure archive this?');
    if (confirm) {
      dispatch(sessionUpdate(id, { archived: true }));
    }

    return false;
  };
  const handleDelete = id => {
    const confirm = window.confirm('Are you sure delete this?');
    if (confirm) {
      dispatch(sessionDelete(id));
      // dispatch(sessionRead(uid));
    }
    return false;
  };

  const onHandleSearch = e => {
    dispatch(sessionSearch(e.target.value, sessions));
  };

  if (sessions && sessions.length)
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
        status: <span className={`status ${status}`}>{status}</span>,
        action: (
          <div className="table-actions">
            {uid === student.id && status == 'pending' && (
              <>
                <Popover placement="top" content="Accept Session">
                  <Link className="edit" onClick={() => handleAccept(id)} to="#">
                    <Button className="btn-icon" type="primary" to="#" shape="circle">
                      <FeatherIcon icon="check-circle" size={16} />
                    </Button>
                  </Link>
                </Popover>
                <Popover placement="top" content="Reject Session">
                  <Link className="delete" onClick={() => handleReject(id)} to="#">
                    <Button className="btn-icon" type="danger" to="#" shape="circle">
                      <FeatherIcon icon="trash-2" size={16} />
                    </Button>
                  </Link>
                </Popover>
                &nbsp;&nbsp;&nbsp;
              </>
            )}
            {uid === student.id && status == 'accepted' && (
              <>
                <Popover placement="top" content="Confirm Session / Review Tutor">
                  <Link className="edit" onClick={() => handleConfirm(id)} to="#">
                    <Button className="btn-icon" type="primary" to="#" shape="circle">
                      <FeatherIcon icon="user-check" size={16} />
                    </Button>
                  </Link>
                </Popover>
                &nbsp;&nbsp;&nbsp;
              </>
            )}
            {uid === tutor.id &&
              (status !== 'approved' ? (
                <>
                  {status == 'pending' && (
                    <Popover placement="top" content="Edit Session">
                      <Link className="edit" to={`edit/${id}`}>
                        <Button className="btn-icon" type="primary" to="#" shape="circle">
                          <FeatherIcon icon="edit" size={16} />
                        </Button>
                      </Link>
                    </Popover>
                  )}
                  <Popover placement="top" content="Delete Session">
                    <Link className="delete" onClick={() => handleDelete(id)} to="#">
                      <Button className="btn-icon" type="danger" to="#" shape="circle">
                        <FeatherIcon icon="trash-2" size={16} />
                      </Button>
                    </Link>
                  </Popover>
                  &nbsp;&nbsp;&nbsp;
                </>
              ) : (
                <>
                  <Popover placement="top" content="Archive Session">
                    <Link className="delete" onClick={() => handleArchive(id)} to="#">
                      <Button
                        className="btn-icon"
                        type="primary"
                        to="#"
                        shape="circle"
                        href={`${link}?type=t&name=${tutor.name}`}
                      >
                        <span className={`status`} style={{ minWidth: 0 }}>
                          Archive{' '}
                        </span>
                      </Button>
                    </Link>
                  </Popover>
                </>
              ))}
            {status !== 'approved' &&
              (uid === tutor.id ? (
                <Button
                  className="btn-icon"
                  type="success"
                  to="#"
                  shape="circle"
                  href={`${link}?type=t&name=${tutor.name}`}
                >
                  <span className={`status`} style={{ minWidth: 0 }}>
                    Join Call
                  </span>
                </Button>
              ) : (
                <Button
                  className="btn-icon"
                  type="success"
                  to="#"
                  shape="circle"
                  href={`${link}?type=s&name=${student.name}`}
                >
                  <span className={`status`} style={{ minWidth: 0 }}>
                    Join Call
                  </span>
                </Button>
              ))}
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
          <>
            {type == 'Tutor' && (
              <div>
                <Button className="btn-add_new" size="default" key="1" type="primary">
                  <Link to="/home/sessions/add">
                    <FeatherIcon icon="plus" size={14} /> New Invite
                  </Link>
                </Button>
              </div>
            )}
          </>
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
