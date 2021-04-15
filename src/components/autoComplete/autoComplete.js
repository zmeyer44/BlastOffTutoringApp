import React from 'react';
import { Input, Button } from 'antd';
import PropTypes from 'prop-types';
import { SearchOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { AutoCompleteStyled } from './style';

const onSelect = () => {
  // console.log('onSelect', value);
};

const renderItem = name => {
  return {
    value: name,
    label: (
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        {name}
      </div>
    ),
  };
};

const AutoComplete = props => {
  const { rtl } = useSelector(state => {
    return {
      rtl: state.ChangeLayoutMode.rtlData,
    };
  });
  const { customComponent, patterns, patternButtons, width, onSearch, options, placeholder } = props;

  const onSearching = searchText => {
    onSearch(searchText);
  };

  return customComponent ? (
    <AutoCompleteStyled style={{ width }} onSearch={onSearching}>
      {customComponent}
    </AutoCompleteStyled>
  ) : patterns ? (
    <AutoCompleteStyled
      className="certain-category-search"
      dropdownClassName="certain-category-search-dropdown"
      dropdownMatchSelectWidth={false}
      dropdownStyle={{ width: 300 }}
      style={{ width }}
      placeholder={placeholder}
      onSearch={onSearching}
    >
      <Input
        suffix={
          patternButtons ? (
            <Button className="search-btn" style={{ [rtl ? 'marginLeft' : 'marginRight']: -20 }} type="primary">
              <SearchOutlined />
            </Button>
          ) : (
            <SearchOutlined />
          )
        }
      />
    </AutoCompleteStyled>
  ) : (
    <AutoCompleteStyled style={{ width }} onSearch={onSearching} placeholder={placeholder} />
  );
};

AutoComplete.defaultProps = {
  width: '350px',
  placeholder: 'Input here',
};

AutoComplete.propTypes = {
  customComponent: PropTypes.node,
  patterns: PropTypes.bool,
  patternButtons: PropTypes.bool,
  width: PropTypes.string,
  onSearch: PropTypes.func,
  options: PropTypes.arrayOf(PropTypes.object),
  placeholder: PropTypes.string,
};

export { AutoComplete };
