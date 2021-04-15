import React, { lazy } from 'react';
import { Switch } from 'react-router-dom/cjs/react-router-dom.min';
import { Route, useRouteMatch } from 'react-router-dom';

const View = lazy(() => import('../../container/sessions/View'));
const Add = lazy(() => import('../../container/sessions/addNew'));
const Update = lazy(() => import('../../container/sessions/edit'));

const SessionsRoute = () => {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route path={`${path}/View`} component={View} />
      <Route path={`${path}/Add`} component={Add} />
      <Route exact path={`${path}/edit/:id`} component={Update} />
    </Switch>
  );
};

export default SessionsRoute;
