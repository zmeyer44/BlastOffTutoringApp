import React, { lazy } from 'react';
import { Switch } from 'react-router-dom/cjs/react-router-dom.min';
import { Route, useRouteMatch } from 'react-router-dom';
import { useSelector } from 'react-redux';
const ViewAll = lazy(() => import('../../container/schoolMgmt/ViewAll'));
const adminView = lazy(() => import('../../container/schoolMgmt/adminView'));

const AllStudentsRoute = () => {
  const { path } = useRouteMatch();
  const { type } = useSelector(state => {
    return {
      type: state.fb.profile.type,
    };
  });
  return (
    <Switch>
      {type == 'Admin' && <Route path={`${path}`} component={adminView} />}
      {type == 'School' && <Route path={`${path}`} component={ViewAll} />}
    </Switch>
  );
};

export default AllStudentsRoute;
