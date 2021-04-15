import React, { useState, useEffect } from 'react';
import FeatherIcon from 'feather-icons-react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { Rate, Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Cards } from '../../../../components/cards/frame/cards-frame';
import Heading from '../../../../components/heading/heading';
import { Slider } from '../../../../components/slider/slider';
import { CheckboxGroup } from '../../../../components/checkbox/checkbox';
import { Sidebar, SidebarSingle } from '../../Style';
import { filterTutors, filterByBrand, filterByCategory } from '../../../../redux/firebase/tutor/actionCreator';

const { Option } = Select;

const Filters = allTutors => {
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

  const onChangeStyle = checkValue => {
    dispatch(filterByBrand([checkValue]));
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
  const schools = ['North County', 'South Central', 'POB JFK HS', 'Bethpage High School', 'north-central'];

  const optionsStyle = [
    {
      label: <>Visual Learner</>,
      value: 'visual',
    },
    {
      label: <>Auditory Learner</>,
      value: 'auditory',
    },
    {
      label: <>Logical Learner</>,
      value: 'logical',
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
            <Option value="science">Science</Option>
            <Option value="english">English</Option>
            <Option value="history">History</Option>
          </Select>
        </SidebarSingle>
        <SidebarSingle style={{ marginBottom: 32 }}>
          <Heading as="h5">School</Heading>
          <Select showArrow mode="multiple" style={{ width: '100%' }} placeholder="All schools" onChange={schoolFilter}>
            {schools.map(value => (
              <Option key={value} value={value}>
                {value}
              </Option>
            ))}
          </Select>
        </SidebarSingle>

        <SidebarSingle style={{ marginBottom: 32 }}>
          <Heading as="h5">Learning Style</Heading>
          <CheckboxGroup options={optionsStyle} onChange={onChangeStyle} />
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