import React, { lazy, Suspense } from 'react';
import { Spin } from 'antd';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import Dashboard from './dashboard';
import Pages from './pages';
import Users from './users';
import Widgets from './widgets';
import Search from './search';
import Features from './features';
import Gallery from './gallery';
import withAdminLayout from '../../layout/withAdminLayout';

const Projects = lazy(() => import('./projects'));
const Inbox = lazy(() => import('../../container/email/Email'));
const Chat = lazy(() => import('../../container/chat/ChatApp'));
const Myprofile = lazy(() => import('../../container/profile/myProfile/Index'));
const Firebase = lazy(() => import('./firebase'));
const Sessions = lazy(() => import('./sessions'));
const ToDo = lazy(() => import('../../container/toDo/ToDo'));
const Note = lazy(() => import('../../container/note/Note'));
const Contact = lazy(() => import('../../container/contact/Contact'));
const ContactGrid = lazy(() => import('../../container/contact/ContactGrid'));
const ContactAddNew = lazy(() => import('../../container/contact/AddNew'));
const Calendar = lazy(() => import('../../container/calendar/Calendar'));
// const FileManager = lazy(() => import('../../container/fileManager/FileManager'));
const Kanban = lazy(() => import('../../container/kanban/Index'));
const Task = lazy(() => import('../../container/task/Index'));

const Home = () => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Suspense
        fallback={
          <div className="spin">
            <Spin />
          </div>
        }
      >
        <Route path={path} component={Dashboard} />
        <Route path={`${path}/search`} component={Search} />
        <Route path={`${path}`} component={Pages} />
        <Route path={`${path}`} component={Features} />
        <Route path={`${path}/users`} component={Users} />
        <Route path={`${path}/gallery`} component={Gallery} />
        <Route path={`${path}/project`} component={Projects} />
        {/* <Route path={`${path}/app/fileManager`} component={FileManager} /> */}
        <Route path={`${path}/app/kanban`} component={Kanban} />
        <Route path={`${path}/email/:page`} component={Inbox} />
        <Route path={`${path}/firestore`} component={Firebase} />
        <Route path={`${path}/sessions`} component={Sessions} />
        <Route path={`${path}/chat`} component={Chat} />
        <Route path={`${path}/profile/myProfile`} component={Myprofile} />
        <Route path={`${path}/app/to-do`} component={ToDo} />
        <Route path={`${path}/app/note`} component={Note} />
        <Route path={`${path}/app/task`} component={Task} />
        <Route path={`${path}/contact/list`} component={Contact} />
        <Route path={`${path}/contact/grid`} component={ContactGrid} />
        <Route path={`${path}/contact/addNew`} component={ContactAddNew} />
        <Route path={`${path}/calendar`} component={Calendar} />
        <Route path={`${path}/widgets`} component={Widgets} />
      </Suspense>
    </Switch>
  );
};

export default withAdminLayout(Home);
