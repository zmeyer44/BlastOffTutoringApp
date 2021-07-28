import actions from './actions';

const {
  SESSION_ADD_BEGIN,
  SESSION_ADD_SUCCESS,
  SESSION_ADD_ERR,

  SESSION_REVIEW_BEGIN,
  SESSION_REVIEW_SUCCESS,
  SESSION_REVIEW_ERR,

  SESSION_UPLOAD_BEGIN,
  SESSION_UPLOAD_SUCCESS,
  SESSION_UPLOAD_ERR,

  SESSION_READ_BEGIN,
  SESSION_READ_SUCCESS,
  SESSION_READ_ERR,

  SESSION_UPDATE_BEGIN,
  SESSION_UPDATE_SUCCESS,
  SESSION_UPDATE_ERR,

  SESSION_DELETE_BEGIN,
  SESSION_DELETE_SUCCESS,
  SESSION_DELETE_ERR,

  SESSION_SINGLE_DATA_BEGIN,
  SESSION_SINGLE_DATA_SUCCESS,
  SESSION_SINGLE_DATA_ERR,

  SESSION_SEARCH_BEGIN,
  SESSION_SEARCH_SUCCESS,
  SESSION_SEARCH_ERR,
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

const sessionReducer = (state = initialState, action) => {
  const { type, data, err } = action;
  switch (type) {
    case SESSION_UPLOAD_BEGIN:
      return {
        ...state,
        fileLoading: true,
      };

    case SESSION_UPLOAD_SUCCESS:
      return {
        ...state,
        url: data,
        error: false,
        fileLoading: false,
      };

    case SESSION_UPLOAD_ERR:
      return {
        ...state,
        error: err,
        fileLoading: false,
      };

    case SESSION_ADD_BEGIN:
      return {
        ...state,
        loading: true,
      };

    case SESSION_ADD_SUCCESS:
      return {
        ...state,
        data,
        error: false,
        loading: false,
      };

    case SESSION_ADD_ERR:
      return {
        ...state,
        error: err,
        loading: false,
      };

    case SESSION_REVIEW_BEGIN:
      return {
        ...state,
        loading: true,
      };

    case SESSION_REVIEW_SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
      };

    case SESSION_REVIEW_ERR:
      return {
        ...state,
        error: err,
        loading: false,
      };

    case SESSION_SEARCH_BEGIN:
      return {
        ...state,
      };

    case SESSION_SEARCH_SUCCESS:
      return {
        ...state,
        data,
        error: false,
      };

    case SESSION_SEARCH_ERR:
      return {
        ...state,
        error: err,
      };

    case SESSION_READ_BEGIN:
      return {
        ...state,
        loading: true,
      };

    case SESSION_READ_SUCCESS:
      return {
        ...state,
        data,
        error: false,
        loading: false,
      };

    case SESSION_READ_ERR:
      return {
        ...state,
        error: err,
        loading: false,
      };

    case SESSION_DELETE_BEGIN:
      return {
        ...state,
        loading: true,
      };

    case SESSION_DELETE_SUCCESS:
      return {
        ...state,
        error: false,
        data,
        loading: false,
      };

    case SESSION_DELETE_ERR:
      return {
        ...state,
        error: err,
        loading: false,
      };

    case SESSION_UPDATE_BEGIN:
      return {
        ...state,
        loading: true,
      };

    case SESSION_UPDATE_SUCCESS:
      return {
        ...state,
        data,
        error: false,
        loading: false,
      };

    case SESSION_UPDATE_ERR:
      return {
        ...state,
        error: err,
        loading: false,
      };

    default:
      return state;
  }
};

const sessionSingleReducer = (state = initialStateSingle, action) => {
  const { type, data, err } = action;
  switch (type) {
    case SESSION_SINGLE_DATA_BEGIN:
      return {
        ...initialStateSingle,
        loading: true,
      };

    case SESSION_SINGLE_DATA_SUCCESS:
      return {
        ...initialStateSingle,
        data,
        error: false,
        loading: false,
      };

    case SESSION_SINGLE_DATA_ERR:
      return {
        ...initialStateSingle,
        error: err,
        loading: false,
      };

    default:
      return state;
  }
};

export { sessionReducer, sessionSingleReducer };
