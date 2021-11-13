import actions from './actions';

const { STUDENT_APPROVE_BEGIN, STUDENT_APPROVE_SUCCESS, STUDENT_APPROVE_ERR } = actions;

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

const studentReducer = (state = initialState, action) => {
  const { type, data, err } = action;
  switch (type) {
    case STUDENT_APPROVE_BEGIN:
      return {
        ...state,
        loading: true,
      };

    case STUDENT_APPROVE_SUCCESS:
      return {
        ...state,
        url: data,
        error: false,
        loading: false,
      };

    case STUDENT_APPROVE_ERR:
      return {
        ...state,
        error: err,
        loading: false,
      };

    default:
      return state;
  }
};

export { studentReducer };
