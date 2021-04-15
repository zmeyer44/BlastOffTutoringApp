import { notification } from 'antd';
import actions from './actions';

const addNotificationSuccess = () => {
  notification.success({
    message: 'Event has been added!',
  });
};

const addNotificationError = err => {
  notification.error({
    message: err,
  });
};

const deleteNotificationSuccess = () => {
  notification.success({
    message: 'Event has been Deleted',
  });
};

const deleteNotificationError = err => {
  notification.error({
    message: err,
  });
};

const updateNotificationSuccess = () => {
  notification.success({
    message: 'Event has been updated',
  });
};

const updateNotificationError = err => {
  notification.error({
    message: err,
  });
};

const {
  eventAddBegin,
  eventAddSuccess,
  eventAddErr,

  eventUpdateBegin,
  eventUpdateSuccess,
  eventUpdateErr,

  eventDeleteBegin,
  eventDeleteSuccess,
  eventDeleteErr,

  eventVisibleBegin,
  eventVisibleSuccess,
  eventVisibleErr,
} = actions;

const eventAdd = (uid, data) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const db = getFirestore();
    try {
      await dispatch(eventAddBegin());
      const query = await db
        .collection('users')
        .doc(`${uid}`)
        .collection('events')
        .doc();
      // await db
      //   .collection('users')
      //   .doc(`${uid}`)
      //   .collection('events')
      //   .add(data);
      if (data.type == 'meeting') {
        console.log('Meeting found');
        data.link = `https://blastofftutoring.herokuapp.com/${query.id}`;
        console.log(data);
      }
      query.set({
        ...data,
        id: query.id,
      });

      await dispatch(eventAddSuccess(data));
      await addNotificationSuccess();
    } catch (err) {
      await dispatch(eventAddErr(err));
      await addNotificationError(err);
    }
  };
};

const eventUpdate = (id, data) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const db = getFirestore();
    try {
      await dispatch(eventUpdateBegin());
      await db
        .collection('crud')
        .doc(`${id}`)
        .update({
          ...data,
        });

      const query = await db
        .collection('crud')
        .where('id', '==', id)
        .get();
      await query.forEach(doc => {
        dispatch(eventUpdateSuccess(doc.data()));
      });

      await updateNotificationSuccess();
    } catch (err) {
      await dispatch(eventUpdateErr(err));
      await updateNotificationError(err);
    }
  };
};

const eventDelete = (uid, id) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const db = getFirestore();
    try {
      await dispatch(eventDeleteBegin());
      await db
        .collection('users')
        .doc(`${uid}`)
        .collection('events')
        .doc(`${id}`)
        .delete();

      await dispatch(eventDeleteSuccess(data));
      await deleteNotificationSuccess();
    } catch (err) {
      await dispatch(eventDeleteErr(err));
      await deleteNotificationError(err);
    }
  };
};

const eventVisible = data => {
  return async dispatch => {
    try {
      dispatch(eventVisibleBegin());
      dispatch(eventVisibleSuccess(data));
    } catch (err) {
      dispatch(eventVisibleErr(err));
    }
  };
};

export { eventAdd, eventUpdate, eventDelete, eventVisible };
