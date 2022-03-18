import React, { lazy } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

const NotFound = lazy(() => import('../../container/pages/404'));
const Support = lazy(() => import('../../container/pages/support'));
const Ticket = lazy(() => import('../../container/pages/ticket'));
const MissingHours = lazy(() => import('../../container/pages/missingHours'));
const Settings = lazy(() => import('../../container/profile/settings/Settings'));

const PagesRoute = () => {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route path={`${path}/404`} component={NotFound} />
      <Route path={`${path}/support`} component={Support} />
      <Route path={`${path}/ticket`} component={Ticket} />
      <Route path={`${path}/missing-hours`} component={MissingHours} />
      <Route path={`${path}/settings`} component={Settings} />
    </Switch>
  );
};

export default PagesRoute;
