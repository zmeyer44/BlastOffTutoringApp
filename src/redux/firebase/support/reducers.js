import actions from './actions';

const {
  SUPPORT_TICKET_BEGIN,
  SUPPORT_TICKET_SUCCESS,
  SUPPORT_TICKET_ERR,
  ADD_SCHOOL_BEGIN,
  ADD_SCHOOL_SUCCESS,
  ADD_SCHOOL_ERR,
} = actions;

const initialState = {
  data: [],
  fileLoading: false,
  loading: false,
  error: null,
};

const initialStateSingle = {
  data: null,
  loading: false,
  error: null,
};

const supportReducer = (state = initialState, action) => {
  const { type, data, err } = action;
  switch (type) {
    case SUPPORT_TICKET_BEGIN:
      return {
        ...state,
        loading: true,
      };

    case SUPPORT_TICKET_SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
      };

    case SUPPORT_TICKET_ERR:
      return {
        ...state,
        error: err,
        loading: false,
      };
    case ADD_SCHOOL_BEGIN:
      return {
        ...state,
        loading: true,
      };

    case ADD_SCHOOL_SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
      };

    case ADD_SCHOOL_ERR:
      return {
        ...state,
        error: err,
        loading: false,
      };

    default:
      return state;
  }
};

export { supportReducer };
