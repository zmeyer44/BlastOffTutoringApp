import actions from './actions';

const {
  NEW_MSG_BEGIN,
  NEW_MSG_SUCCESS,
  NEW_MSG_ERR,

  FETCH_CONVOS_BEGIN,
  FETCH_CONVOS_SUCCESS,
  FETCH_CONVOS_ERR,

  NEW_CONVOS_BEGIN,
  NEW_CONVOS_SUCCESS,
  NEW_CONVOS_ERR,

  READ_MSG_BEGIN,
  READ_MSG_SUCCESS,
  READ_MSG_ERR,

  DELETE_CONVO_BEGIN,
  DELETE_CONVO_SUCCESS,
  DELETE_CONVO_ERR,
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

const fsConvosReducer = (state = initialState, action) => {
  const { type, data, err } = action;
  switch (type) {
    // case FB_UPLOAD_BEGIN:
    //   return {
    //     ...state,
    //     fileLoading: true,
    //   };

    // case FB_UPLOAD_SUCCESS:
    //   return {
    //     ...state,
    //     profileImage: data,
    //     error: false,
    //     fileLoading: false,
    //   };

    // case FB_UPLOAD_ERR:
    //   return {
    //     ...state,
    //     error: err,
    //     fileLoading: false,
    //   };

    // case FB_ADD_BEGIN:
    //   return {
    //     ...state,
    //     loading: true,
    //   };

    // case FB_ADD_SUCCESS:
    //   return {
    //     ...state,
    //     data,
    //     error: false,
    //     loading: false,
    //   };

    // case FB_ADD_ERR:
    //   return {
    //     ...state,
    //     error: err,
    //     loading: false,
    //   };

    // case FB_SEARCH_BEGIN:
    //   return {
    //     ...state,
    //   };

    // case FB_SEARCH_SUCCESS:
    //   return {
    //     ...state,
    //     data,
    //     error: false,
    //   };

    // case FB_SEARCH_ERR:
    //   return {
    //     ...state,
    //     error: err,
    //   };

    case FETCH_CONVOS_BEGIN:
      return {
        ...state,
        loading: true,
      };

    case FETCH_CONVOS_SUCCESS:
      return {
        ...state,
        data,
        error: false,
        loading: false,
      };

    case FETCH_CONVOS_ERR:
      return {
        ...state,
        error: err,
        loading: false,
      };

    case NEW_CONVOS_BEGIN:
      return {
        ...state,
        loading: true,
      };

    case NEW_CONVOS_SUCCESS:
      return {
        ...state,
        data,
        error: false,
        loading: false,
      };

    case NEW_CONVOS_ERR:
      return {
        ...state,
        error: err,
        loading: false,
      };

    // case FB_DELETE_BEGIN:
    //   return {
    //     ...state,
    //     loading: true,
    //   };

    // case FB_DELETE_SUCCESS:
    //   return {
    //     ...state,
    //     error: false,
    //     data,
    //     loading: false,
    //   };

    // case FB_DELETE_ERR:
    //   return {
    //     ...state,
    //     error: err,
    //     loading: false,
    //   };

    // case FB_UPDATE_BEGIN:
    //   return {
    //     ...state,
    //     loading: true,
    //   };

    // case FB_UPDATE_SUCCESS:
    //   return {
    //     ...state,
    //     data,
    //     error: false,
    //     loading: false,
    //   };

    // case FB_UPDATE_ERR:
    //   return {
    //     ...state,
    //     error: err,
    //     loading: false,
    //   };

    default:
      return state;
  }
};

const fsMessagesReducer = (state = initialStateSingle, action) => {
  const { type, data, err } = action;
  switch (type) {
    case FB_SINGLE_DATA_BEGIN:
      return {
        ...initialStateSingle,
        loading: true,
      };

    case FB_SINGLE_DATA_SUCCESS:
      return {
        ...initialStateSingle,
        data,
        error: false,
        loading: false,
      };

    case FB_SINGLE_DATA_ERR:
      return {
        ...initialStateSingle,
        error: err,
        loading: false,
      };

    default:
      return state;
  }
};

export { fsConvosReducer, fsMessagesReducer };
