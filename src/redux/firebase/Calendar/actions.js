const actions = {
  EVENT_ADD_BEGIN: 'EVENT_ADD_BEGIN',
  EVENT_ADD_SUCCESS: 'EVENT_ADD_SUCCESS',
  EVENT_ADD_ERR: 'EVENT_ADD_ERR',

  EVENT_UPDATE_BEGIN: 'EVENT_UPDATE_BEGIN',
  EVENT_UPDATE_SUCCESS: 'EVENT_UPDATE_SUCCESS',
  EVENT_UPDATE_ERR: 'EVENT_UPDATE_ERR',

  EVENT_DELETE_BEGIN: 'EVENT_DELETE_BEGIN',
  EVENT_DELETE_SUCCESS: 'EVENT_DELETE_SUCCESS',
  EVENT_DELETE_ERR: 'EVENT_DELETE_ERR',

  EVENT_VISIBLE_BEGIN: 'EVENT_VISIBLE_BEGIN',
  EVENT_VISIBLE_SUCCESS: 'EVENT_VISIBLE_SUCCESS',
  EVENT_VISIBLE_ERR: 'EVENT_VISIBLE_ERR',

  CALENDAR_LABEL_UPDATE_BEGIN: 'CALENDAR_LABEL_UPDATE_BEGIN',
  CALENDAR_LABEL_UPDATE_SUCCESS: 'CALENDAR_LABEL_UPDATE_SUCCESS',
  CALENDAR_LABEL_UPDATE_ERR: 'CALENDAR_LABEL_UPDATE_ERR',

  eventVisibleBegin: () => {
    return {
      type: actions.EVENT_VISIBLE_BEGIN,
    };
  },

  eventVisibleSuccess: data => {
    return {
      type: actions.EVENT_VISIBLE_SUCCESS,
      data,
    };
  },

  eventVisibleErr: err => {
    return {
      type: actions.EVENT_VISIBLE_ERR,
      err,
    };
  },

  labelUpdateBegin: () => {
    return {
      type: actions.CALENDAR_LABEL_UPDATE_BEGIN,
    };
  },

  labelUpdateSuccess: data => {
    return {
      type: actions.CALENDAR_LABEL_UPDATE_SUCCESS,
      data,
    };
  },

  labelUpdateErr: err => {
    return {
      type: actions.CALENDAR_LABEL_UPDATE_ERR,
      err,
    };
  },

  eventAddBegin: () => {
    return {
      type: actions.EVENT_ADD_BEGIN,
    };
  },

  eventAddSuccess: data => {
    return {
      type: actions.EVENT_ADD_SUCCESS,
      data,
    };
  },

  eventAddErr: err => {
    return {
      type: actions.EVENT_ADD_ERR,
      err,
    };
  },

  eventUpdateBegin: () => {
    return {
      type: actions.EVENT_UPDATE_BEGIN,
    };
  },

  eventUpdateSuccess: data => {
    return {
      type: actions.EVENT_UPDATE_SUCCESS,
      data,
    };
  },

  eventUpdateErr: err => {
    return {
      type: actions.EVENT_UPDATE_ERR,
      err,
    };
  },

  eventDeleteBegin: () => {
    return {
      type: actions.EVENT_DELETE_BEGIN,
    };
  },

  eventDeleteSuccess: data => {
    return {
      type: actions.EVENT_DELETE_SUCCESS,
      data,
    };
  },

  eventDeleteErr: err => {
    return {
      type: actions.EVENT_DELETE_ERR,
      err,
    };
  },
};

export default actions;
