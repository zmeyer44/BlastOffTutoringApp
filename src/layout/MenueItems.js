import React from 'react';
import { Menu } from 'antd';
import { useSelector } from 'react-redux';

import { NavLink, useRouteMatch } from 'react-router-dom';
import { ReactSVG } from 'react-svg';
import FeatherIcon from 'feather-icons-react';
import propTypes from 'prop-types';
import versions from '../demoData/changelog.json';

const { SubMenu } = Menu;

const MenueItems = ({ darkMode, toggleCollapsed, topMenu, events }) => {
  const { userType } = useSelector(state => {
    return {
      userType: state.fb.profile.type,
    };
  });
  const { path } = useRouteMatch();

  const pathName = window.location.pathname;
  const pathArray = pathName.split(path);
  const mainPath = pathArray[1];
  const mainPathSplit = mainPath.split('/');

  const { onRtlChange, onLtrChange, modeChangeDark, modeChangeLight, modeChangeTopNav, modeChangeSideNav } = events;
  const [openKeys, setOpenKeys] = React.useState(
    !topMenu ? [`${mainPathSplit.length > 2 ? mainPathSplit[1] : 'dashboard'}`] : [],
  );

  const onOpenChange = keys => {
    setOpenKeys(keys[keys.length - 1] !== 'recharts' ? [keys.length && keys[keys.length - 1]] : keys);
  };

  const onClick = item => {
    if (item.keyPath.length === 1) setOpenKeys([]);
  };

  return (
    <Menu
      onOpenChange={onOpenChange}
      onClick={onClick}
      mode={!topMenu || window.innerWidth <= 991 ? 'inline' : 'horizontal'}
      theme={darkMode && 'dark'}
      // // eslint-disable-next-line no-nested-ternary
      defaultSelectedKeys={
        !topMenu
          ? [
              `${
                mainPathSplit.length === 1 ? 'home' : mainPathSplit.length === 2 ? mainPathSplit[1] : mainPathSplit[2]
              }`,
            ]
          : []
      }
      defaultOpenKeys={!topMenu ? [`${mainPathSplit.length > 2 ? mainPathSplit[1] : 'dashboard'}`] : []}
      overflowedIndicator={<FeatherIcon icon="more-vertical" />}
      openKeys={openKeys}
    >
      <Menu.Item key="home" icon={!topMenu && <FeatherIcon icon="home" />} title="Dashboard">
        <NavLink onClick={toggleCollapsed} to={`${path}`}>
          Dashboard
        </NavLink>
      </Menu.Item>
      <Menu.Item key="tutors" icon={!topMenu && <FeatherIcon icon="search" />} title="Find a Tutor">
        <NavLink onClick={toggleCollapsed} to={`${path}/search`}>
          Find a Tutor
        </NavLink>
      </Menu.Item>
      {(userType == 'Tutor' || userType == 'Admin') && (
        <Menu.Item key="invite" icon={!topMenu && <FeatherIcon icon="send" />} title="Send an Invite">
          <NavLink onClick={toggleCollapsed} to={`${path}/sessions/view`}>
            Send Invite
          </NavLink>
        </Menu.Item>
      )}

      <Menu.Item key="chat" icon={!topMenu && <FeatherIcon icon="message-square" />} title="Chat">
        <NavLink onClick={toggleCollapsed} to={`${path}/chat`}>
          Chat
        </NavLink>
      </Menu.Item>
      <Menu.Item key="calendar" icon={!topMenu && <FeatherIcon icon="calendar" />} title="Calendar">
        <NavLink onClick={toggleCollapsed} to={`${path}/calendar/month`}>
          Calendar
          <span className="badge badge-success">New</span>
        </NavLink>
      </Menu.Item>
      {/* <Menu.Item key="todo" icon={!topMenu && <FeatherIcon icon="check-square" />}>
        <NavLink onClick={toggleCollapsed} to={`${path}/todo`}>
          To Do
          <span className="badge badge-success">New</span>
        </NavLink>
      </Menu.Item> */}

      {userType !== 'School' && (
        <>
          {!topMenu && <p className="sidebar-nav-title">My Account</p>}
          <Menu.Item key="profile" icon={!topMenu && <FeatherIcon icon="user" />} title="Find a Tutor">
            <NavLink onClick={toggleCollapsed} to={`${path}/settings`}>
              Profile
            </NavLink>
          </Menu.Item>
          <SubMenu key="inbox" icon={!topMenu && <FeatherIcon icon="inbox" />} title="Inbox">
            <Menu.Item key="messages">
              <NavLink onClick={toggleCollapsed} to={`${path}/chat`}>
                Messages
              </NavLink>
            </Menu.Item>
            <Menu.Item key="invites">
              <NavLink onClick={toggleCollapsed} to={`${path}/invites`}>
                Invites
              </NavLink>
            </Menu.Item>
            <Menu.Item key="requests">
              <NavLink onClick={toggleCollapsed} to={`${path}/records/requests`}>
                Confirmation Requests
              </NavLink>
            </Menu.Item>
          </SubMenu>

          <SubMenu key="records" icon={!topMenu && <FeatherIcon icon="layers" />} title="Records">
            <Menu.Item key="allRecords">
              <NavLink onClick={toggleCollapsed} to={`${path}/records`}>
                All Records
              </NavLink>
            </Menu.Item>
            <Menu.Item key="completedRecords">
              <NavLink onClick={toggleCollapsed} to={`${path}/records/completed`}>
                Completed Records
              </NavLink>
            </Menu.Item>

            <Menu.Item key="pendingRecords">
              <NavLink onClick={toggleCollapsed} to={`${path}/records/pending`}>
                Pending Records
              </NavLink>
            </Menu.Item>
          </SubMenu>
          {userType !== 'Tutor' && (
            <Menu.Item key="bookmarks" icon={!topMenu && <FeatherIcon icon="users" />}>
              <NavLink onClick={toggleCollapsed} to={`${path}/bookmarks`}>
                Saved Tutors
              </NavLink>
            </Menu.Item>
          )}
        </>
      )}
      {userType == 'School' && (
        <>
          {!topMenu && <p className="sidebar-nav-title">My School</p>}
          <Menu.Item key="students" icon={!topMenu && <FeatherIcon icon="users" />} title="All Students">
            <NavLink onClick={toggleCollapsed} to={`${path}/students`}>
              All Students
            </NavLink>
          </Menu.Item>
          <Menu.Item key="pendingAccounts" icon={!topMenu && <FeatherIcon icon="user-plus" />} title="Pending Accounts">
            <NavLink onClick={toggleCollapsed} to={`${path}/pendingaccounts`}>
              Pending Accounts
            </NavLink>
          </Menu.Item>
          <Menu.Item
            key="approvedAccounts"
            icon={!topMenu && <FeatherIcon icon="user-check" />}
            title="Approved Accounts"
          >
            <NavLink onClick={toggleCollapsed} to={`${path}/approvedaccounts`}>
              Approved Accounts
            </NavLink>
          </Menu.Item>
        </>
      )}
      {userType == 'Admin' && (
        <>
          {!topMenu && <p className="sidebar-nav-title">Admin Controls</p>}
          <SubMenu key="accounts" icon={!topMenu && <FeatherIcon icon="users" />} title="Accounts">
            <Menu.Item key="allAccounts">
              <NavLink onClick={toggleCollapsed} to={`${path}/accounts`}>
                Messages
              </NavLink>
            </Menu.Item>
            <Menu.Item key="pendingAccounts">
              <NavLink onClick={toggleCollapsed} to={`${path}/pendingAccounts`}>
                Pending Accounts
              </NavLink>
            </Menu.Item>
            <Menu.Item key="requests">
              <NavLink onClick={toggleCollapsed} to={`${path}/approvedAccounts`}>
                Approved Accounts
              </NavLink>
            </Menu.Item>
          </SubMenu>
          <SubMenu key="schools" icon={!topMenu && <FeatherIcon icon="briefcase" />} title="Schools">
            <Menu.Item key="allSchools">
              <NavLink onClick={toggleCollapsed} to={`${path}/schools`}>
                All Schools
              </NavLink>
            </Menu.Item>
            <Menu.Item key="addSchool">
              <NavLink onClick={toggleCollapsed} to={`${path}/addschool`}>
                Add School
              </NavLink>
            </Menu.Item>
          </SubMenu>

          <Menu.Item key="editUser" icon={!topMenu && <FeatherIcon icon="tool" />} title="Edit User">
            <NavLink onClick={toggleCollapsed} to={`${path}/edituser`}>
              Edit User
            </NavLink>
          </Menu.Item>
        </>
      )}

      {!topMenu && <p className="sidebar-nav-title">Utilities</p>}
      <Menu.Item key="settings" icon={!topMenu && <FeatherIcon icon="settings" />}>
        <NavLink onClick={toggleCollapsed} to={`${path}/settings`}>
          Account Settings
        </NavLink>
      </Menu.Item>

      <SubMenu
        key="appearance"
        icon={!topMenu && <FeatherIcon icon="sunset" />}
        title={
          <>
            <span className="pl-0">
              Appearance<span className="badge badge-success">New</span>
            </span>
          </>
        }
      >
        <Menu.Item key="light">
          <NavLink
            onClick={() => {
              toggleCollapsed();
              modeChangeLight();
            }}
            to="#"
          >
            Light Mode
          </NavLink>
        </Menu.Item>
        <Menu.Item key="dark">
          <NavLink
            onClick={() => {
              toggleCollapsed();
              modeChangeDark();
            }}
            to="#"
          >
            Dark Mode
          </NavLink>
        </Menu.Item>
      </SubMenu>
      <Menu.Item
        icon={
          !topMenu && <ReactSVG className="sDash_menu-item-icon" src={require('../static/img/icon/headphone.svg')} />
        }
        key="support"
      >
        <NavLink onClick={toggleCollapsed} to={`${path}/support`}>
          Support Center
        </NavLink>
      </Menu.Item>
    </Menu>
  );
};

MenueItems.propTypes = {
  darkMode: propTypes.bool,
  topMenu: propTypes.bool,
  toggleCollapsed: propTypes.func,
  events: propTypes.object,
};

export default MenueItems;
