import actions from './actions';

const {
  EVENT_ADD_BEGIN,
  EVENT_ADD_SUCCESS,
  EVENT_ADD_ERR,

  EVENT_UPDATE_BEGIN,
  EVENT_UPDATE_SUCCESS,
  EVENT_UPDATE_ERR,

  EVENT_DELETE_BEGIN,
  EVENT_DELETE_SUCCESS,
  EVENT_DELETE_ERR,

  EVENT_VISIBLE_BEGIN,
  EVENT_VISIBLE_SUCCESS,
  EVENT_VISIBLE_ERR,
} = actions;

const initialState = {
  data: [],
  url: null,
  loading: false,
  error: null,
  eventVisible: false,
};

const calendarReducer = (state = initialState, action) => {
  const { type, data, err } = action;
  switch (type) {
    case EVENT_ADD_BEGIN:
      return {
        ...state,
        loading: true,
      };

    case EVENT_ADD_SUCCESS:
      return {
        ...state,
        data,
        error: false,
        loading: false,
      };

    case EVENT_ADD_ERR:
      return {
        ...state,
        error: err,
        loading: false,
      };

    case EVENT_DELETE_BEGIN:
      return {
        ...state,
        loading: true,
      };

    case EVENT_DELETE_SUCCESS:
      return {
        ...state,
        error: false,
        data,
        loading: false,
      };

    case EVENT_DELETE_ERR:
      return {
        ...state,
        error: err,
        loading: false,
      };

    case EVENT_UPDATE_BEGIN:
      return {
        ...state,
        loading: true,
      };

    case EVENT_UPDATE_SUCCESS:
      return {
        ...state,
        data,
        error: false,
        loading: false,
      };

    case EVENT_UPDATE_ERR:
      return {
        ...state,
        error: err,
        loading: false,
      };
    case EVENT_VISIBLE_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case EVENT_VISIBLE_SUCCESS:
      return {
        ...state,
        eventVisible: data,
        loading: false,
      };
    case EVENT_VISIBLE_ERR:
      return {
        ...state,
        error: err,
        loading: false,
      };

    default:
      return state;
  }
};

export { calendarReducer };
