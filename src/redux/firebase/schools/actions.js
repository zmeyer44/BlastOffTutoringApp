const actions = {
  SCHOOL_ADD_BEGIN: 'SCHOOL_ADD_BEGIN',
  SCHOOL_ADD_SUCCESS: 'SCHOOL_ADD_SUCCESS',
  SCHOOL_ADD_ERR: 'SCHOOL_ADD_ERR',

  SCHOOL_READ_BEGIN: 'SCHOOL_READ_BEGIN',
  SCHOOL_READ_SUCCESS: 'SCHOOL_READ_SUCCESS',
  SCHOOL_READ_ERR: 'SCHOOL_READ_ERR',

  SCHOOL_UPDATE_BEGIN: 'SCHOOL_UPDATE_BEGIN',
  SCHOOL_UPDATE_SUCCESS: 'SCHOOL_UPDATE_SUCCESS',
  SCHOOL_UPDATE_ERR: 'SCHOOL_UPDATE_ERR',

  SCHOOL_DELETE_BEGIN: 'SCHOOL_DELETE_BEGIN',
  SCHOOL_DELETE_SUCCESS: 'SCHOOL_DELETE_SUCCESS',
  SCHOOL_DELETE_ERR: 'SCHOOL_DELETE_ERR',

  SCHOOL_SINGLE_DATA_BEGIN: 'SCHOOL_SINGLE_DATA_BEGIN',
  SCHOOL_SINGLE_DATA_SUCCESS: 'SCHOOL_SINGLE_DATA_SUCCESS',
  SCHOOL_SINGLE_DATA_ERR: 'SCHOOL_SINGLE_DATA_ERR',

  SCHOOL_UPLOAD_BEGIN: 'SCHOOL_UPLOAD_BEGIN',
  SCHOOL_UPLOAD_SUCCESS: 'SCHOOL_UPLOAD_SUCCESS',
  SCHOOL_UPLOAD_ERR: 'SCHOOL_UPLOAD_ERR',

  SCHOOL_SEARCH_BEGIN: 'SCHOOL_SEARCH_BEGIN',
  SCHOOL_SEARCH_SUCCESS: 'SCHOOL_SEARCH_SUCCESS',
  SCHOOL_SEARCH_ERR: 'SCHOOL_SEARCH_ERR',

  schoolSearchBegin: () => {
    return {
      type: actions.SCHOOL_SEARCH_BEGIN,
    };
  },

  schoolSearchSuccess: data => {
    return {
      type: actions.SCHOOL_SEARCH_SUCCESS,
      data,
    };
  },

  schoolSearchErr: err => {
    return {
      type: actions.SCHOOL_SEARCH_ERR,
      err,
    };
  },

  schoolAddBegin: () => {
    return {
      type: actions.SCHOOL_ADD_BEGIN,
    };
  },

  schoolAddSuccess: data => {
    return {
      type: actions.SCHOOL_ADD_SUCCESS,
      data,
    };
  },

  schoolAddErr: err => {
    return {
      type: actions.SCHOOL_ADD_ERR,
      err,
    };
  },

  schoolReadBegin: () => {
    return {
      type: actions.SCHOOL_READ_BEGIN,
    };
  },

  schoolReadSuccess: data => {
    return {
      type: actions.SCHOOL_READ_SUCCESS,
      data,
    };
  },

  schoolReadErr: err => {
    return {
      type: actions.SCHOOL_READ_ERR,
      err,
    };
  },

  schoolUpdateBegin: () => {
    return {
      type: actions.SCHOOL_UPDATE_BEGIN,
    };
  },

  schoolUpdateSuccess: data => {
    return {
      type: actions.SCHOOL_UPDATE_SUCCESS,
      data,
    };
  },

  schoolUpdateErr: err => {
    return {
      type: actions.SCHOOL_UPDATE_ERR,
      err,
    };
  },

  schoolDeleteBegin: () => {
    return {
      type: actions.SCHOOL_DELETE_BEGIN,
    };
  },

  schoolDeleteSuccess: data => {
    return {
      type: actions.SCHOOL_DELETE_SUCCESS,
      data,
    };
  },

  schoolDeleteErr: err => {
    return {
      type: actions.SCHOOL_DELETE_ERR,
      err,
    };
  },

  schoolSingleDataBegin: () => {
    return {
      type: actions.SCHOOL_SINGLE_DATA_BEGIN,
    };
  },

  schoolSingleDataSuccess: data => {
    return {
      type: actions.SCHOOL_SINGLE_DATA_SUCCESS,
      data,
    };
  },

  schoolSingleDataErr: err => {
    return {
      type: actions.SCHOOL_SINGLE_DATA_ERR,
      err,
    };
  },
};

export default actions;
