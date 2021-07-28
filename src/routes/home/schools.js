import React, { lazy } from 'react';
import { Switch } from 'react-router-dom/cjs/react-router-dom.min';
import { Route, useRouteMatch } from 'react-router-dom';

const View = lazy(() => import('../../container/schools/View'));
const Add = lazy(() => import('../../container/schools/addNew'));
const Update = lazy(() => import('../../container/schools/edit'));
const Accounts = lazy(() => import('../../container/schools/accounts'));
const AccountEdit = lazy(() => import('../../container/schools/accountEdit'));
const AccountAdd = lazy(() => import('../../container/schools/accountAdd'));

const SchoolsRoute = () => {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route path={`${path}/View`} component={View} />
      <Route path={`${path}/Add`} component={Add} />
      <Route exact path={`${path}/edit/:id`} component={Update} />
      <Route exact path={`${path}/accounts/:id`} component={Accounts} />
      <Route exact path={`${path}/accounts/:id/add`} component={AccountAdd} />
      <Route exact path={`${path}/accounts/edit/:account`} component={AccountEdit} />
    </Switch>
  );
};

export default SchoolsRoute;
