import { notification } from 'antd';
import actions from './actions';

const addNotificationSuccess = () => {
  notification.success({
    message: 'School has been added',
  });
};

const addNotificationError = err => {
  notification.error({
    message: err,
  });
};

const deleteNotificationSuccess = () => {
  notification.success({
    message: 'Your Record has been Deleted',
  });
};

const deleteNotificationError = err => {
  notification.error({
    message: err,
  });
};

const updateNotificationSuccess = () => {
  notification.success({
    message: 'School has been updated',
  });
};

const updateNotificationError = err => {
  notification.error({
    message: err,
  });
};

const {
  schoolAddBegin,
  schoolAddSuccess,
  schoolAddErr,

  schoolReadBegin,
  schoolReadSuccess,
  schoolReadErr,

  schoolUpdateBegin,
  schoolUpdateSuccess,
  schoolUpdateErr,

  schoolDeleteBegin,
  schoolDeleteSuccess,
  schoolDeleteErr,

  schoolSingleDataBegin,
  schoolSingleDataSuccess,
  schoolSingleDataErr,

  schoolSearchBegin,
  schoolSearchSuccess,
  schoolSearchErr,
} = actions;

const schoolAdd = data => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const db = getFirestore();
    try {
      await dispatch(schoolAddBegin());
      await db
        .collection('schools')
        .doc(`${data.id}`)
        .get()
        .then(doc => {
          if (doc.exists) {
            addNotificationError('Document with that id already exists');
          } else {
            db.collection('schools')
              .doc(`${data.id}`)
              .set(data);
            dispatch(schoolAddSuccess(data));
            addNotificationSuccess();
          }
        })
        .catch(err => {
          console.error(err);
        });
    } catch (err) {
      await dispatch(schoolAddErr(err));
      await addNotificationError(err);
    }
  };
};

const schoolSearch = value => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const db = getFirestore();
    const data = [];
    try {
      await dispatch(schoolSearchBegin());
      const query = await db.collection('crud').get();
      await query.forEach(doc => {
        data.push(doc.data());
      });
      const searchValue = data.filter(item => item.name.toLowerCase().startsWith(value.toLowerCase()));
      await dispatch(schoolSearchSuccess(searchValue));
    } catch (err) {
      await dispatch(schoolSearchErr(err));
    }
  };
};

const schoolUpdate = (id, data) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const db = getFirestore();
    try {
      await dispatch(schoolUpdateBegin());
      await db
        .collection('schools')
        .doc(`${id}`)
        .update({
          ...data,
        });

      await updateNotificationSuccess();
    } catch (err) {
      await dispatch(schoolUpdateErr(err));
      await updateNotificationError(err);
    }
  };
};

const schoolDelete = id => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const db = getFirestore();
    try {
      await dispatch(schoolDeleteBegin());
      await db
        .collection('school')
        .doc(`${id}`)
        .delete();

      await deleteNotificationSuccess();
    } catch (err) {
      await dispatch(schoolDeleteErr(err));
      await deleteNotificationError(err);
    }
  };
};

const schoolSingle = id => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const db = getFirestore();
    try {
      await dispatch(schoolSingleDataBegin());
      const query = await db
        .collection('schools')
        .doc(`${id}`)
        .get()
        .then(doc => {
          dispatch(schoolSingleDataSuccess(doc.data()));
        });
    } catch (err) {
      await dispatch(schoolSingleDataErr(err));
    }
  };
};

export { schoolAdd, schoolSearch, schoolDelete, schoolSingle, schoolUpdate };
