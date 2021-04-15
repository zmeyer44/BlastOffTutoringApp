const actions = {
  SESSION_ADD_BEGIN: 'SESSION_ADD_BEGIN',
  SESSION_ADD_SUCCESS: 'SESSION_ADD_SUCCESS',
  SESSION_ADD_ERR: 'SESSION_ADD_ERR',

  SESSION_READ_BEGIN: 'SESSION_READ_BEGIN',
  SESSION_READ_SUCCESS: 'SESSION_READ_SUCCESS',
  SESSION_READ_ERR: 'SESSION_READ_ERR',

  SESSION_UPDATE_BEGIN: 'SESSION_UPDATE_BEGIN',
  SESSION_UPDATE_SUCCESS: 'SESSION_UPDATE_SUCCESS',
  SESSION_UPDATE_ERR: 'SESSION_UPDATE_ERR',

  SESSION_DELETE_BEGIN: 'SESSION_DELETE_BEGIN',
  SESSION_DELETE_SUCCESS: 'SESSION_DELETE_SUCCESS',
  SESSION_DELETE_ERR: 'SESSION_DELETE_ERR',

  SESSION_SINGLE_DATA_BEGIN: 'SESSION_SINGLE_DATA_BEGIN',
  SESSION_SINGLE_DATA_SUCCESS: 'SESSION_SINGLE_DATA_SUCCESS',
  SESSION_SINGLE_DATA_ERR: 'SESSION_SINGLE_DATA_ERR',

  SESSION_UPLOAD_BEGIN: 'SESSION_UPLOAD_BEGIN',
  SESSION_UPLOAD_SUCCESS: 'SESSION_UPLOAD_SUCCESS',
  SESSION_UPLOAD_ERR: 'SESSION_UPLOAD_ERR',

  SESSION_SEARCH_BEGIN: 'SESSION_SEARCH_BEGIN',
  SESSION_SEARCH_SUCCESS: 'SESSION_SEARCH_SUCCESS',
  SESSION_SEARCH_ERR: 'SESSION_SEARCH_ERR',

  sessionSearchBegin: () => {
    return {
      type: actions.SESSION_SEARCH_BEGIN,
    };
  },

  sessionSearchSuccess: data => {
    return {
      type: actions.SESSION_SEARCH_SUCCESS,
      data,
    };
  },

  sessionSearchErr: err => {
    return {
      type: actions.SESSION_SEARCH_ERR,
      err,
    };
  },

  sessionUploadBegin: () => {
    return {
      type: actions.SESSION_UPLOAD_BEGIN,
    };
  },

  sessionUploadSuccess: data => {
    return {
      type: actions.SESSION_UPLOAD_SUCCESS,
      data,
    };
  },

  sessionUploadErr: err => {
    return {
      type: actions.SESSION_UPLOAD_ERR,
      err,
    };
  },

  sessionAddBegin: () => {
    return {
      type: actions.SESSION_ADD_BEGIN,
    };
  },

  sessionAddSuccess: data => {
    return {
      type: actions.SESSION_ADD_SUCCESS,
      data,
    };
  },

  sessionAddErr: err => {
    return {
      type: actions.SESSION_ADD_ERR,
      err,
    };
  },

  sessionReadBegin: () => {
    return {
      type: actions.SESSION_READ_BEGIN,
    };
  },

  sessionReadSuccess: data => {
    return {
      type: actions.SESSION_READ_SUCCESS,
      data,
    };
  },

  sessionReadErr: err => {
    return {
      type: actions.SESSION_READ_ERR,
      err,
    };
  },

  sessionUpdateBegin: () => {
    return {
      type: actions.SESSION_UPDATE_BEGIN,
    };
  },

  sessionUpdateSuccess: data => {
    return {
      type: actions.SESSION_UPDATE_SUCCESS,
      data,
    };
  },

  sessionUpdateErr: err => {
    return {
      type: actions.SESSION_UPDATE_ERR,
      err,
    };
  },

  sessionDeleteBegin: () => {
    return {
      type: actions.SESSION_DELETE_BEGIN,
    };
  },

  sessionDeleteSuccess: data => {
    return {
      type: actions.SESSION_DELETE_SUCCESS,
      data,
    };
  },

  sessionDeleteErr: err => {
    return {
      type: actions.SESSION_DELETE_ERR,
      err,
    };
  },

  sessionSingleDataBegin: () => {
    return {
      type: actions.SESSION_SINGLE_DATA_BEGIN,
    };
  },

  sessionSingleDataSuccess: data => {
    return {
      type: actions.SESSION_SINGLE_DATA_SUCCESS,
      data,
    };
  },

  sessionSingleDataErr: err => {
    return {
      type: actions.SESSION_SINGLE_DATA_ERR,
      err,
    };
  },
};

export default actions;
