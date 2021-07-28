import actions from './actions';

const {
  SCHOOL_ADD_BEGIN,
  SCHOOL_ADD_SUCCESS,
  SCHOOL_ADD_ERR,

  SCHOOL_UPLOAD_BEGIN,
  SCHOOL_UPLOAD_SUCCESS,
  SCHOOL_UPLOAD_ERR,

  SCHOOL_READ_BEGIN,
  SCHOOL_READ_SUCCESS,
  SCHOOL_READ_ERR,

  SCHOOL_UPDATE_BEGIN,
  SCHOOL_UPDATE_SUCCESS,
  SCHOOL_UPDATE_ERR,

  SCHOOL_DELETE_BEGIN,
  SCHOOL_DELETE_SUCCESS,
  SCHOOL_DELETE_ERR,

  SCHOOL_SINGLE_DATA_BEGIN,
  SCHOOL_SINGLE_DATA_SUCCESS,
  SCHOOL_SINGLE_DATA_ERR,

  SCHOOL_SEARCH_BEGIN,
  SCHOOL_SEARCH_SUCCESS,
  SCHOOL_SEARCH_ERR,
} = actions;

const initialState = {
  data: [],
  url: null,
  fileLoading: false,
  loading: false,
  error: null,
};

const initialStateSingle = {
  data: null,
  loading: false,
  error: null,
};

const schoolReducer = (state = initialState, action) => {
  const { type, data, err } = action;
  switch (type) {
    case SCHOOL_ADD_BEGIN:
      return {
        ...state,
        loading: true,
      };

    case SCHOOL_ADD_SUCCESS:
      return {
        ...state,
        data,
        error: false,
        loading: false,
      };

    case SCHOOL_ADD_ERR:
      return {
        ...state,
        error: err,
        loading: false,
      };

    case SCHOOL_SEARCH_BEGIN:
      return {
        ...state,
      };

    case SCHOOL_SEARCH_SUCCESS:
      return {
        ...state,
        data,
        error: false,
      };

    case SCHOOL_SEARCH_ERR:
      return {
        ...state,
        error: err,
      };

    case SCHOOL_READ_BEGIN:
      return {
        ...state,
        loading: true,
      };

    case SCHOOL_READ_SUCCESS:
      return {
        ...state,
        data,
        error: false,
        loading: false,
      };

    case SCHOOL_READ_ERR:
      return {
        ...state,
        error: err,
        loading: false,
      };

    case SCHOOL_DELETE_BEGIN:
      return {
        ...state,
        loading: true,
      };

    case SCHOOL_DELETE_SUCCESS:
      return {
        ...state,
        error: false,
        data,
        loading: false,
      };

    case SCHOOL_DELETE_ERR:
      return {
        ...state,
        error: err,
        loading: false,
      };

    case SCHOOL_UPDATE_BEGIN:
      return {
        ...state,
        loading: true,
      };

    case SCHOOL_UPDATE_SUCCESS:
      return {
        ...state,
        data,
        error: false,
        loading: false,
      };

    case SCHOOL_UPDATE_ERR:
      return {
        ...state,
        error: err,
        loading: false,
      };

    default:
      return state;
  }
};

const schoolSingleReducer = (state = initialStateSingle, action) => {
  const { type, data, err } = action;
  switch (type) {
    case SCHOOL_SINGLE_DATA_BEGIN:
      return {
        ...initialStateSingle,
        loading: true,
      };

    case SCHOOL_SINGLE_DATA_SUCCESS:
      return {
        ...initialStateSingle,
        data,
        error: false,
        loading: false,
      };

    case SCHOOL_SINGLE_DATA_ERR:
      return {
        ...initialStateSingle,
        error: err,
        loading: false,
      };

    default:
      return state;
  }
};

export { schoolReducer, schoolSingleReducer };
