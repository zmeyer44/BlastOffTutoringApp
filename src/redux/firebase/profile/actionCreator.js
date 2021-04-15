import { notification } from 'antd';
import actions from './actions';

const addNotificationSuccess = () => {
  notification.success({
    message: 'User has been created!',
  });
};

const addNotificationError = err => {
  notification.error({
    message: err,
  });
};

const deleteNotificationSuccess = () => {
  notification.success({
    message: 'User has been Deleted',
  });
};

const deleteNotificationError = err => {
  notification.error({
    message: err,
  });
};

const updateNotificationSuccess = () => {
  notification.success({
    message: 'The changes have been added',
  });
};

const updateNotificationError = err => {
  notification.error({
    message: err,
  });
};

const {
  fbAddBegin,
  fbAddSuccess,
  fbAddErr,

  fbReadBegin,
  fbReadSuccess,
  fbReadErr,

  fbUpdateBegin,
  fbUpdateSuccess,
  fbUpdateErr,

  fbDeleteBegin,
  fbDeleteSuccess,
  fbDeleteErr,

  fbSingleDataBegin,
  fbSingleDataSuccess,
  fbSingleDataErr,

  fbUploadBegin,
  fbUploadSuccess,
  fbUploadErr,

  fbUploadCoverBegin,
  fbUploadCoverSuccess,
  fbUploadCoverErr,

  fbSearchBegin,
  fbSearchSuccess,
  fbSearchErr,
} = actions;

const fbDataSubmit = data => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const db = getFirestore();
    try {
      await dispatch(fbAddBegin());
      await db
        .collection('users')
        .doc(`${data.id}`)
        .set(data);
      await dispatch(fbAddSuccess(data));
      await addNotificationSuccess();
    } catch (err) {
      await dispatch(fbAddErr(err));
      await addNotificationError(err);
    }
  };
};

const fbDataRead = () => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const db = getFirestore();
    const data = [];
    try {
      await dispatch(fbReadBegin());
      const query = await db.collection('users').get();
      await query.forEach(doc => {
        data.push(doc.data());
      });
      await dispatch(fbReadSuccess(data));
    } catch (err) {
      await dispatch(fbReadErr(err));
    }
  };
};

const fbDataSearch = value => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const db = getFirestore();
    const data = [];
    try {
      await dispatch(fbSearchBegin());
      const query = await db.collection('users').get();
      await query.forEach(doc => {
        data.push(doc.data());
      });
      const searchValue = data.filter(item => item.name.toLowerCase().startsWith(value.toLowerCase()));
      await dispatch(fbSearchSuccess(searchValue));
    } catch (err) {
      await dispatch(fbSearchErr(err));
    }
  };
};

const fbDataUpdate = (id, data) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const db = getFirestore();
    console.log(data);
    try {
      await dispatch(fbUpdateBegin());
      await db
        .collection('users')
        .doc(`${id}`)
        .set(
          {
            ...data,
          },
          { merge: true },
        );
      const query = await db
        .collection('users')
        .doc(`${id}`)
        .get();
      await dispatch(fbUpdateSuccess(query.data()));
      await updateNotificationSuccess();
    } catch (err) {
      await dispatch(fbUpdateErr(err));
      await updateNotificationError(err);
    }
  };
};

const fbDataDelete = id => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const db = getFirestore();
    const data = [];
    try {
      await dispatch(fbDeleteBegin());
      await db
        .collection('users')
        .doc(`${id}`)
        .delete();
      const query = await db.collection('users').get();
      await query.forEach(doc => {
        data.push(doc.data());
      });
      await dispatch(fbDeleteSuccess(data));
      await deleteNotificationSuccess();
      await fbDataRead();
    } catch (err) {
      await dispatch(fbDeleteErr(err));
      await deleteNotificationError(err);
    }
  };
};

const fbDataSingle = id => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const db = getFirestore();
    try {
      await dispatch(fbSingleDataBegin());
      const query = await db
        .collection('users')
        .doc(`${id}`)
        .get();
      await dispatch(fbSingleDataSuccess(query.data()));
    } catch (err) {
      console.log(err);
      await dispatch(fbSingleDataErr(err));
    }
  };
};

const fbFileUploder = (userId, type, imageAsFile) => {
  return async (dispatch, getState, { getFirebase, getFirestore, storage }) => {
    try {
      await dispatch(fbUploadBegin());
      const uploadTask = storage()
        .ref(`/images/${imageAsFile.uid}`)
        .put(imageAsFile);

      await uploadTask.on(
        'state_changed',
        snapShot => {
          // takes a snap shot of the process as it is happening
          console.log(snapShot);
        },
        err => {
          // catches the errors
          console.log(err);
        },
        () => {
          storage()
            .ref('images')
            .child(imageAsFile.uid)
            .getDownloadURL()
            .then(fireBaseUrl => {
              const coverImage = `${fireBaseUrl}`;
              const profileImage = `${fireBaseUrl}`;
              dispatch(fbUploadSuccess(fireBaseUrl));
              if (type == 'coverImage') {
                dispatch(fbDataUpdate(userId, { coverImage }));
              } else {
                dispatch(fbDataUpdate(userId, { profileImage }));
              }
            });
        },
      );
    } catch (err) {
      await dispatch(fbUploadErr(err));
    }
  };
};

const fbFileClear = () => {
  return async dispatch => {
    try {
      await dispatch(fbUploadBegin());
      dispatch(fbUploadSuccess(null));
    } catch (err) {
      await dispatch(fbUploadErr(err));
    }
  };
};

export { fbDataSubmit, fbDataSearch, fbDataDelete, fbDataSingle, fbDataUpdate, fbDataRead, fbFileUploder, fbFileClear };
