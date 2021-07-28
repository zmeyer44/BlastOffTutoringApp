const actions = {
  
  SUPPORT_TICKET_BEGIN: 'SUPPORT_TICKET_BEGIN',
  SUPPORT_TICKET_SUCCESS: 'SUPPORT_TICKET_SUCCESS',
  SUPPORT_TICKET_ERR: 'SUPPORT_TICKET_ERR',
  

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
  
  };
  
export default actions;
