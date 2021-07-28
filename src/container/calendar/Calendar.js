import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Row, Col, Skeleton } from 'antd';
import FeatherIcon from 'feather-icons-react';
import CalenDar from 'react-calendar';
import { useFirestoreConnect } from 'react-redux-firebase';
import { Link, Switch, Route, useRouteMatch } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Aside, CalendarWrapper } from './Style';
import { ShareButtonPageHeader } from '../../components/buttons/share-button/share-button';
import { ExportButtonPageHeader } from '../../components/buttons/export-button/export-button';
import { CalendarButtonPageHeader } from '../../components/buttons/calendar-button/calendar-button';
import { Main } from '../styled';
import { Button } from '../../components/buttons/buttons';
import { Cards } from '../../components/cards/frame/cards-frame';
import { PageHeader } from '../../components/page-headers/page-headers';
import 'react-calendar/dist/Calendar.css';
import { eventVisible } from '../../redux/firebase/Calendar/actionCreator';

const YearCalendar = lazy(() => import('./overview/Year'));
const MonthCalendar = lazy(() => import('./overview/Month'));
const WeekCalendar = lazy(() => import('./overview/Week'));
const DayCalendar = lazy(() => import('./overview/Day'));
const TodayCalendar = lazy(() => import('./overview/Today'));
const ScheduleCalendar = lazy(() => import('./overview/Schedule'));

const Calendars = () => {
  const dispatch = useDispatch();
  const { isVisible, uid, events } = useSelector(state => {
    return {
      isVisible: state.calendar.eventVisible,
      uid: state.fb.auth.uid,
      events: state.fs.data.events,
    };
  });

  useFirestoreConnect([
    { collection: 'users', doc: `${uid}`, subcollections: [{ collection: 'events' }], storeAs: 'events' },
  ]);

  const { path } = useRouteMatch();
  const [state, setState] = useState({
    date: new Date(),
    visible: false,
    eventsList: [],
  });

  useEffect(() => {
    if (events) {
      console.log('Here');
      console.log(events);
      let arrayOfEvents = Object.values(events);
      setState({
        ...state,
        eventsList: arrayOfEvents,
      });
    }
  }, [events]);

  const { eventsList } = state;

  const onChange = date => setState({ date });

  const onHandleVisible = () => {
    dispatch(eventVisible(!isVisible));
  };

  return (
    <>
      <PageHeader
        ghost
        title="Calendar"
        
      />

      <Main>
        <CalendarWrapper>
          <Row gutter={25}>
            <Col xxl={6} xl={9} xs={24}>
              <Aside>
                <Button onClick={onHandleVisible} className="btn-create" size="large" type="secondary">
                  <FeatherIcon icon="plus" size={14} /> Create New Event
                </Button>
                <div className="calendar-display" style={{ maxWidth: '370px' }}>
                  <CalenDar next2Label={null} prev2Label={null} value={state.date} style={{ maxWidth: '370px' }} />
                </div>
                <br />
                {/* <Cards headless>
                  <h3 className="listHeader">
                    My Events
                    <Link onClick={onHandleVisible} className="add-label" to="#">
                      <FeatherIcon icon="plus" size={14} />
                    </Link>
                  </h3>
                  <ul className="event-list">
                    {eventsList
                      ? eventsList.map(event => {
                          const { title, label } = event;
                          return (
                            <li key={event.id}>
                              <Link to="#">
                                <span className={`bullet ${label}`} />
                                {title}
                              </Link>
                            </li>
                          );
                        })
                      : null}
                  </ul>
                </Cards> */}
              </Aside>
            </Col>
            <Col xxl={18} xl={15} xs={24}>
              <Switch>
                <Suspense
                  fallback={
                    <Cards headless>
                      <Skeleton paragraph={{ rows: 15 }} active />
                    </Cards>
                  }
                >
                  <Route path={`${path}/year`} render={() => <YearCalendar events={eventsList} />} />
                  <Route path={`${path}/month`} render={() => <MonthCalendar events={eventsList} />} />
                  <Route path={`${path}/week`} render={() => <WeekCalendar events={eventsList} />} />
                  <Route path={`${path}/day`} render={() => <DayCalendar events={eventsList} />} />
                  <Route path={`${path}/today`} render={() => <TodayCalendar events={eventsList} />} />
                  <Route path={`${path}/schedule`} render={() => <ScheduleCalendar events={eventsList} />} />
                </Suspense>
              </Switch>
            </Col>
          </Row>
        </CalendarWrapper>
      </Main>
    </>
  );
};

export default Calendars;
