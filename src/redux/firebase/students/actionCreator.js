import { notification } from 'antd';
import actions from './actions';

const addNotificationSuccess = () => {
  notification.success({
    message: 'Student has been approved',
  });
};

const addNotificationError = err => {
  notification.error({
    message: err,
  });
};

const { studentApproveBegin, studentApproveSuccess, studentApproveErr } = actions;

const studentApprove = id => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const db = getFirestore();
    try {
      await dispatch(studentApproveBegin());
      const query = await db.collection('users').doc(id);

      query.update({
        approved: true,
      });
      await dispatch(studentApproveSuccess(id));
      await addNotificationSuccess();
    } catch (err) {
      await dispatch(studentApproveErr(err));
      await addNotificationError(err);
    }
  };
};
export { studentApprove };
