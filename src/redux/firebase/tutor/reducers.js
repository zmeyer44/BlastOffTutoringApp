import actions from './actions';

const {
  SINGLE_TUTOR_BEGIN,
  SINGLE_TUTOR_SUCCESS,
  SINGLE_TUTOR_ERR,

  FILTER_TUTOR_BEGIN,
  FILTER_TUTOR_SUCCESS,
  FILTER_TUTOR_ERR,

  SORTING_TUTOR_BEGIN,
  SORTING_TUTOR_SUCCESS,
  SORTING_TUTOR_ERR,

  FETCH_TUTOR_BEGIN,
  FETCH_TUTOR_SUCCESS,
  FETCH_TUTOR_ERR,
} = actions;

const initialStateFilter = {
  data: [],
  filteredData: [],
  loading: false,
  error: null,
};

const initialState = {
  data: [],
  filteredData: [],

  loading: false,
  error: null,
};

const fsTutorReducer = (state = initialStateFilter, action) => {
  const { type, data, err } = action;
  switch (type) {
    case FILTER_TUTOR_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case FILTER_TUTOR_SUCCESS:
      return {
        ...state,
        filteredData: data,
        loading: false,
      };
    case FILTER_TUTOR_ERR:
      return {
        ...initialState,
        error: err,
        loading: false,
      };
    case SORTING_TUTOR_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case SORTING_TUTOR_SUCCESS:
      return {
        ...state,
        filteredData: data,
        loading: false,
      };
    case SORTING_TUTOR_ERR:
      return {
        ...state,
        error: err,
        loading: false,
      };
    case FETCH_TUTOR_BEGIN:
      return {
        ...initialState,
        loading: true,
      };
    case FETCH_TUTOR_SUCCESS:
      return {
        ...initialState,
        filteredData: data,
        data,
        loading: false,
      };
    case FETCH_TUTOR_ERR:
      return {
        ...initialState,
        error: err,
        loading: false,
      };
    default:
      return state;
  }
};

const fsSingleTutorReducer = (state = initialState, action) => {
  const { type, data, err } = action;
  switch (type) {
    case SINGLE_TUTOR_BEGIN:
      return {
        ...initialState,
        loading: true,
      };
    case SINGLE_TUTOR_SUCCESS:
      return {
        ...initialState,
        data,
        loading: false,
      };
    case SINGLE_TUTOR_ERR:
      return {
        ...initialState,
        error: err,
        loading: false,
      };
    default:
      return state;
  }
};

export { fsSingleTutorReducer, fsTutorReducer };
