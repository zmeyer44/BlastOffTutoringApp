import React from 'react';
import { Menu } from 'antd';
import { useSelector } from 'react-redux';

import { NavLink, useRouteMatch } from 'react-router-dom';
import { ReactSVG } from 'react-svg';
import FeatherIcon from 'feather-icons-react';
import propTypes from 'prop-types';

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

  const { modeChangeDark, modeChangeLight } = events;
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
      <Menu.Item
        icon={
          !topMenu && (
            <NavLink className="menuItem-iocn" to={`${path}/`}>
              <FeatherIcon icon="home" />
            </NavLink>
          )
        }
        key="home"
      >
        <NavLink onClick={toggleCollapsed} to={`${path}/`}>
          Dashboard
        </NavLink>
      </Menu.Item>

      {userType !== 'School' && (
        <>
          <Menu.Item
            icon={
              !topMenu && (
                <NavLink className="menuItem-iocn" to={`${path}/search`}>
                  <FeatherIcon icon="search" />
                </NavLink>
              )
            }
            key="search"
          >
            <NavLink onClick={toggleCollapsed} to={`${path}/search`}>
              Find a Tutor
            </NavLink>
          </Menu.Item>
          <Menu.Item
            icon={
              !topMenu && (
                <NavLink className="menuItem-iocn" to={`${path}/sessions/view`}>
                  <FeatherIcon icon="send" />
                </NavLink>
              )
            }
            key="sessions"
          >
            <NavLink onClick={toggleCollapsed} to={`${path}/sessions/view`}>
              View Sessions
            </NavLink>
          </Menu.Item>
          <Menu.Item
            icon={
              !topMenu && (
                <NavLink className="menuItem-iocn" to={`${path}/chat`}>
                  <FeatherIcon icon="message-square" />
                </NavLink>
              )
            }
            key="chat"
          >
            <NavLink onClick={toggleCollapsed} to={`${path}/chat`}>
              Chat
            </NavLink>
          </Menu.Item>
        </>
      )}
      <Menu.Item
        icon={
          !topMenu && (
            <NavLink className="menuItem-iocn" to={`${path}/calendar/week`}>
              <FeatherIcon icon="calendar" />
            </NavLink>
          )
        }
        key="calendar"
      >
        <NavLink onClick={toggleCollapsed} to={`${path}/calendar/week`}>
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

      {userType == 'Tutor' && (
        <>
          {!topMenu && <p className="sidebar-nav-title">My Account</p>}
          <Menu.Item
            icon={
              !topMenu && (
                <NavLink className="menuItem-iocn" to={`${path}/settings`}>
                  <FeatherIcon icon="user" />
                </NavLink>
              )
            }
            key="profile"
          >
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
            <Menu.Item key="sessions2">
              <NavLink onClick={toggleCollapsed} to={`${path}/sessions/view`}>
                Sessions
              </NavLink>
            </Menu.Item>
            <Menu.Item key="invites">
              <NavLink onClick={toggleCollapsed} to={`${path}/sessions/add`}>
                Send Invite
              </NavLink>
            </Menu.Item>
          </SubMenu>

          <SubMenu key="records" icon={!topMenu && <FeatherIcon icon="layers" />} title="Records">
            <Menu.Item key="allRecords">
              <NavLink onClick={toggleCollapsed} to={`${path}/sessions/view`}>
                All Records
              </NavLink>
            </Menu.Item>
            <Menu.Item key="completedRecords">
              <NavLink onClick={toggleCollapsed} to={`${path}/sessions/view`}>
                Completed Records
              </NavLink>
            </Menu.Item>

            <Menu.Item key="pendingRecords">
              <NavLink onClick={toggleCollapsed} to={`${path}/sessions/view`}>
                Pending Records
              </NavLink>
            </Menu.Item>
          </SubMenu>
          <Menu.Item
            icon={
              !topMenu && (
                <NavLink className="menuItem-iocn" to={`${path}/sessions/certificate`}>
                  <FeatherIcon icon="award" />
                </NavLink>
              )
            }
            key="certificate"
          >
            <NavLink onClick={toggleCollapsed} to={`${path}/sessions/certificate`}>
              Certificate
            </NavLink>
          </Menu.Item>
        </>
      )}
      {userType == 'School' && (
        <>
          {!topMenu && <p className="sidebar-nav-title">My School</p>}
          <Menu.Item
            icon={
              !topMenu && (
                <NavLink className="menuItem-iocn" to={`${path}/students`}>
                  <FeatherIcon icon="users" />
                </NavLink>
              )
            }
            key="students"
          >
            <NavLink onClick={toggleCollapsed} to={`${path}/students`}>
              Approve Students
            </NavLink>
          </Menu.Item>
          {/* <Menu.Item
            icon={
              !topMenu && (
                <NavLink className="menuItem-iocn" to={`${path}/students/view/pending`}>
                  <FeatherIcon icon="user-plus" />
                </NavLink>
              )
            }
            key="pendingAccounts"
          >
            <NavLink onClick={toggleCollapsed} to={`${path}/students/view/pending`}>
              Pending Accounts
            </NavLink>
          </Menu.Item>
          <Menu.Item
            icon={
              !topMenu && (
                <NavLink className="menuItem-iocn" to={`${path}/students/view/approved`}>
                  <FeatherIcon icon="user-check" />
                </NavLink>
              )
            }
            key="approvedAccounts"
          >
            <NavLink onClick={toggleCollapsed} to={`${path}/students/view/approved`}>
              Approved Accounts
            </NavLink>
          </Menu.Item> */}
        </>
      )}
      {userType == 'Admin' && (
        <>
          {!topMenu && <p className="sidebar-nav-title">Admin Controls</p>}
          <SubMenu key="accounts" icon={!topMenu && <FeatherIcon icon="users" />} title="Accounts">
            <Menu.Item key="allAccounts">
              <NavLink onClick={toggleCollapsed} to={`${path}/students`}>
                All Pending Students
              </NavLink>
            </Menu.Item>
          </SubMenu>
          <SubMenu key="schools" icon={!topMenu && <FeatherIcon icon="briefcase" />} title="Schools">
            <Menu.Item key="allSchools">
              <NavLink onClick={toggleCollapsed} to={`${path}/schools/view`}>
                All Schools
              </NavLink>
            </Menu.Item>
            <Menu.Item key="addSchool">
              <NavLink onClick={toggleCollapsed} to={`${path}/schools/add`}>
                Add School
              </NavLink>
            </Menu.Item>
          </SubMenu>
          <Menu.Item
            icon={
              !topMenu && (
                <NavLink className="menuItem-iocn" to={`${path}/edituser`}>
                  <FeatherIcon icon="tool" />
                </NavLink>
              )
            }
            key="editUser"
          >
            <NavLink onClick={toggleCollapsed} to={`${path}/edituser`}>
              Edit User
            </NavLink>
          </Menu.Item>
        </>
      )}

      {!topMenu && <p className="sidebar-nav-title">Utilities</p>}
      {!userType == 'School' && (
        <Menu.Item
          icon={
            !topMenu && (
              <NavLink className="menuItem-iocn" to={`${path}/settings`}>
                <FeatherIcon icon="settings" />
              </NavLink>
            )
          }
          key="settings"
        >
          <NavLink onClick={toggleCollapsed} to={`${path}/settings`}>
            Account Settings
          </NavLink>
        </Menu.Item>
      )}

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
          !topMenu && (
            <NavLink className="menuItem-iocn" to={`${path}/support`}>
              <ReactSVG className="sDash_menu-item-icon" src={require('../static/img/icon/headphone.svg')} />
            </NavLink>
          )
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
