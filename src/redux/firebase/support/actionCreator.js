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
  addSchoolBegin,
  addSchoolSuccess,
  addSchoolErr,
} = actions;

const supportTicket = data => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const db = getFirestore();
    try {
      await dispatch(supportTicketBegin());
      await db.collection('support').add({
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

const addSchool = data => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const db = getFirestore();
    try {
      await dispatch(addSchoolBegin());
      await db.collection('support').add({
        type: 'newSchool',
        ...data,
      });
      await dispatch(addSchoolSuccess());
    } catch (err) {
      console.log(err);
      await dispatch(addSchoolErr(err));
    }
  };
};

export { supportTicket, addSchool };
