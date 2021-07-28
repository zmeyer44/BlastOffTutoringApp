import { notification } from 'antd';
import actions from './actions';

const addTicketNotificationSuccess = () => {
  notification.success({
    message: 'Your Ticket has been Submited',
  });
};

const addTicketNotificationError = err => {
  notification.error({
    message: err,
  });
};




const {
  supportTicketBegin,
  supportTicketSuccess,
  supportTicketErr,
} = actions;



const supportTicket = (data) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const db = getFirestore();
    try {
      await dispatch(supportTicketBegin());
      await db
        .collection('support')
        .add({
          ...data,
        });
      
      await dispatch(supportTicketSuccess());
      await addTicketNotificationSuccess();
    } catch (err) {
      await dispatch(supportTicketErr(err));
      await addTicketNotificationError(err);
    }
  };
};



export {
  supportTicket
};
