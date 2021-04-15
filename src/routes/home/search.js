import React, { lazy } from 'react';
import { Switch } from 'react-router-dom/cjs/react-router-dom.min';
import { Route, useRouteMatch } from 'react-router-dom';

const TutorDetails = lazy(() => import('../../container/search/product/TutorDetails'));
const Search = lazy(() => import('../../container/search/product/Search'));

const EcommerceRoute = () => {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route exact path={`${path}/tutorDetails/:id`} component={TutorDetails} />
      <Route path={`${path}`} component={Search} />
    </Switch>
  );
};

export default EcommerceRoute;
