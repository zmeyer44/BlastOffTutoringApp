import React, { lazy, useState, Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Radio, Spin, Skeleton } from 'antd';
import { Switch, NavLink, Route, useRouteMatch } from 'react-router-dom';
import FeatherIcon from 'feather-icons-react';
import { PageHeader } from '../../../components/page-headers/page-headers';
import { Main } from '../../styled';
import { AutoComplete } from '../../../components/autoComplete/autoComplete';
import { TopToolBox } from '../Style';
import { sorting } from '../../../redux/firebase/tutor/actionCreator';
import { Button } from '../../../components/buttons/buttons';
import { ShareButtonPageHeader } from '../../../components/buttons/share-button/share-button';
import { ExportButtonPageHeader } from '../../../components/buttons/export-button/export-button';
import { CalendarButtonPageHeader } from '../../../components/buttons/calendar-button/calendar-button';
import { Cards } from '../../../components/cards/frame/cards-frame';

const Filters = lazy(() => import('./overview/Filters'));
const Grid = lazy(() => import('./overview/Grid'));
const List = lazy(() => import('./overview/List'));

const Search = () => {
  const { path } = useRouteMatch();
  const dispatch = useDispatch();
  const searchData = useSelector(state => state.tutor.data);
  const { tutorsAll, filteredData, isLoader } = useSelector(state => {
    return {
      tutorsAll: state.tutor.data,
      filteredData: state.tutor.filteredData,
      isLoader: state.tutor.loading,
    };
  });

  const [state, setState] = useState({
    notData: searchData,
    options: searchData,
    active: 'active',
  });

  const { notData, options } = state;

  const handleSearch = searchText => {
    console.log(searchData);
    const data = searchData.filter(item => item.firstName.toUpperCase().startsWith(searchText.toUpperCase()));
    setState({
      ...state,
      notData: data,
    });
  };

  const onSorting = e => {
    dispatch(sorting(e.target.value, filteredData));
  };

  return (
    <>
      <PageHeader ghost title="Find a Tutor" buttons={[<div key="1" className="page-header-actions"></div>]} />
      <Main>
        <Row gutter={30}>
          <Col className="product-sidebar-col" xxl={5} xl={6} lg={7} md={10} sm={10} xs={24}>
            <Suspense
              fallback={
                <Cards headless>
                  <Skeleton paragraph={{ rows: 22 }} active />
                </Cards>
              }
            >
              <Filters tutors={tutorsAll} />
            </Suspense>
          </Col>
          <Col className="product-content-col" xxl={19} xl={18} lg={17} md={14} sm={14} xs={24}>
            <TopToolBox>
              <Row gutter={0}>
                <Col xxl={10} xs={24}>
                  <div className="product-list-action d-flex justify-content-between align-items-center">
                    <div className="product-list-action__tab">
                      <span className="toolbox-menu-title"> Sort:</span>
                      <Radio.Group onChange={onSorting} defaultValue="">
                        <Radio.Button value="rating">Top Rated</Radio.Button>
                        <Radio.Button value="reviewCount">Popular</Radio.Button>
                        <Radio.Button value="createdAt">Newest</Radio.Button>
                      </Radio.Group>
                    </div>
                  </div>
                </Col>
              </Row>
            </TopToolBox>

            <Switch>
              <Suspense
                fallback={
                  <div className="spin d-flex align-center-v">
                    <Spin />
                  </div>
                }
              >
                <Route exact path={path} component={Grid} />
                <Route exact path={`${path}/grid`} component={Grid} />
                <Route exact path={`${path}/list`} component={List} />
              </Suspense>
            </Switch>
          </Col>
        </Row>
      </Main>
    </>
  );
};

export default Search;
