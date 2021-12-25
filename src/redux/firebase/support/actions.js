const actions = {
  SUPPORT_TICKET_BEGIN: 'SUPPORT_TICKET_BEGIN',
  SUPPORT_TICKET_SUCCESS: 'SUPPORT_TICKET_SUCCESS',
  SUPPORT_TICKET_ERR: 'SUPPORT_TICKET_ERR',

  ADD_SCHOOL_BEGIN: 'ADD_SCHOOL_BEGIN',
  ADD_SCHOOL_SUCCESS: 'ADD_SCHOOL_SUCCESS',
  ADD_SCHOOL_ERR: 'ADD_SCHOOL_ERR',

  supportTicketBegin: () => {
    return {
      type: actions.SUPPORT_TICKET_BEGIN,
    };
  },

  supportTicketSuccess: data => {
    return {
      type: actions.SUPPORT_TICKET_SUCCESS,
      data,
    };
  },

  supportTicketErr: err => {
    return {
      type: actions.SUPPORT_TICKET_ERR,
      err,
    };
  },

  addSchoolBegin: () => {
    return {
      type: actions.ADD_SCHOOL_BEGIN,
    };
  },

  addSchoolSuccess: data => {
    return {
      type: actions.ADD_SCHOOL_SUCCESS,
      data,
    };
  },

  addSchoolErr: err => {
    return {
      type: actions.ADD_SCHOOL_ERR,
      err,
    };
  },
};

export default actions;
