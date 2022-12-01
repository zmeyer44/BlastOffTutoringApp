import React, { useState, useEffect } from 'react';
import FeatherIcon from 'feather-icons-react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { Rate, Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useFirestoreConnect } from 'react-redux-firebase';

import { Cards } from '../../../../components/cards/frame/cards-frame';
import Heading from '../../../../components/heading/heading';
import { Slider } from '../../../../components/slider/slider';
import { CheckboxGroup } from '../../../../components/checkbox/checkbox';
import { Sidebar, SidebarSingle } from '../../Style';
import {
  filterTutors,
  filterByBrand,
  filterByCategory,
  filterByTutoringType,
} from '../../../../redux/firebase/tutor/actionCreator';

const { Option } = Select;

const Filters = allTutors => {
  const { schools } = useSelector(state => {
    return {
      schools: state.fs.ordered.schools,
    };
  });
  useFirestoreConnect([{ collection: 'schools' }]);

  const [state, setState] = useState({
    subjects: [],
    schools: [],
  });

  const dispatch = useDispatch();

  const { grade } = state;

  const onChangeGrade = value => {
    setState({
      ...state,
      grade: value,
    });
  };

  const onChangeRating = checkValue => {
    dispatch(filterByRating([checkValue]));
  };

  useEffect(() => {
    console.log('state triggered:' + allTutors.tutors);
    dispatch(filterTutors(state, allTutors));
  }, [state]);

  const options = [
    {
      label: (
        <>
          <span className="rating-left">
            <Rate allowHalf defaultValue={5} disabled />
          </span>
        </>
      ),
      value: 5,
    },
    {
      label: (
        <>
          <span className="rating-left">
            <Rate allowHalf defaultValue={4} disabled />
            and up
          </span>
        </>
      ),
      value: 4,
    },
    {
      label: (
        <>
          <span className="rating-left">
            <Rate allowHalf defaultValue={3} disabled />
            and up
          </span>
        </>
      ),
      value: 3,
    },
    {
      label: (
        <>
          <span className="rating-left">
            <Rate allowHalf defaultValue={2} disabled />
            and up
          </span>
        </>
      ),
      value: 2,
    },
    {
      label: (
        <>
          <span className="rating-left">
            <Rate allowHalf defaultValue={1} disabled />
            and up
          </span>
        </>
      ),
      value: 1,
    },
  ];

  const optionsStyle = [
    {
      label: <>In person</>,
      value: 'in-person',
    },
    {
      label: <>Virtual</>,
      value: 'virtual',
    },
    {
      label: <>Both</>,
      value: 'both',
    },
  ];

  const subjectFilter = value => {
    setState({
      ...state,
      subjects: value,
    });
  };
  const schoolFilter = value => {
    setState({
      ...state,
      schools: value,
    });
  };
  const styleFilter = value => {
    setState({
      ...state,
      style: value,
    });
  };
  const ratingFilter = value => {
    setState({
      ...state,
      rating: value,
    });
  };

  return (
    <Sidebar>
      <Cards
        title={
          <span>
            <FeatherIcon icon="sliders" size={14} />
            Filters
          </span>
        }
      >
        <SidebarSingle style={{ marginBottom: 32 }}>
          <Heading as="h5">{`Grade :  ${grade ? grade : ''}`}</Heading>
          <Slider max={12} onChange={onChangeGrade} defaultValue={grade} />
        </SidebarSingle>
        <SidebarSingle style={{ marginBottom: 32 }}>
          <Heading as="h5">Subject</Heading>
          <Select
            showArrow
            mode="multiple"
            style={{ width: '100%' }}
            placeholder="All subjects"
            onChange={subjectFilter}
          >
            <Option value="math">Math</Option>
            <Option value="english">English</Option>
            <Option value="biology">Biology</Option>
            <Option value="chemistry">Chemistry</Option>
            <Option value="social-studies">Social Studies</Option>
            <Option value="spanish">Spanish</Option>
            <Option value="french">French</Option>
            <Option value="italian">Italian</Option>
            <Option value="geometry">Geometry</Option>
            <Option value="marketing">Marketing</Option>
            <Option value="computer-science">Computer Science</Option>
            <Option value="physics">Physics</Option>
          </Select>
        </SidebarSingle>
        {/* <SidebarSingle style={{ marginBottom: 32 }}>
          <Heading as="h5">School</Heading>
          <Select showArrow mode="multiple" style={{ width: '100%' }} placeholder="All schools" onChange={schoolFilter}>
            {schools &&
              schools.map(school => {
                return (
                  <Option key={school.id} value={school.id}>
                    {school.name}
                  </Option>
                );
              })}
          </Select>
        </SidebarSingle> */}

        <SidebarSingle style={{ marginBottom: 32 }}>
          <Heading as="h5">Tutoring Style</Heading>
          <CheckboxGroup options={optionsStyle} onChange={styleFilter} />
        </SidebarSingle>

        <SidebarSingle>
          <Heading as="h5">Ratings</Heading>
          <CheckboxGroup options={options} onChange={ratingFilter} />
        </SidebarSingle>
      </Cards>
    </Sidebar>
  );
};

export default Filters;
