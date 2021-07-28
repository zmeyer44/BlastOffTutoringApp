import { notification } from 'antd';
import actions from './actions';

const addReviewNotificationSuccess = () => {
  notification.success({
    message: 'Your Review has been Submited',
  });
};
const addNotificationSuccess = () => {
  notification.success({
    message: 'Your Session has been Submited',
  });
};

const addNotificationError = err => {
  notification.error({
    message: err,
  });
};

const deleteNotificationSuccess = () => {
  notification.success({
    message: 'Your Session has been Deleted',
  });
};

const deleteNotificationError = err => {
  notification.error({
    message: err,
  });
};

const updateNotificationSuccess = () => {
  notification.success({
    message: 'Your Session has been updated',
  });
};

const updateNotificationError = err => {
  notification.error({
    message: err,
  });
};

const {
  sessionAddBegin,
  sessionAddSuccess,
  sessionAddErr,

  sessionReadBegin,
  sessionReadSuccess,
  sessionReadErr,

  sessionUpdateBegin,
  sessionUpdateSuccess,
  sessionUpdateErr,

  sessionDeleteBegin,
  sessionDeleteSuccess,
  sessionDeleteErr,

  sessionSingleDataBegin,
  sessionSingleDataSuccess,
  sessionSingleDataErr,

  sessionUploadBegin,
  sessionUploadSuccess,
  sessionUploadErr,

  sessionSearchBegin,
  sessionSearchSuccess,
  sessionSearchErr,

  sessionReviewBegin,
  sessionReviewSuccess,
  sessionReviewErr,
} = actions;

const sessionSubmit = data => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const db = getFirestore();
    try {
      await dispatch(sessionAddBegin());
      const query = await db.collection('sessions').doc();
      data.link = `https://blastofftutoring.herokuapp.com/${query.id}`;
      data.status = 'pending';
      data.archived = false;
      query.set({
        ...data,
        id: query.id,
      });
      await dispatch(sessionAddSuccess(data));
      await addNotificationSuccess();
    } catch (err) {
      await dispatch(sessionAddErr(err));
      await addNotificationError(err);
    }
  };
};

const sessionReview = (id, data) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const db = getFirestore();
    try {
      await dispatch(sessionReviewBegin());
      await db
        .collection('reviews')
        .doc(`${id}`)
        .set({
          ...data,
        });
      await db
        .collection('sessions')
        .doc(`${id}`)
        .update({
          status: 'approved',
          duration: data.duration,
        });
      await dispatch(sessionReviewSuccess());
      await addReviewNotificationSuccess();
    } catch (err) {
      await dispatch(sessionReviewErr(err));
      await addNotificationError(err);
    }
  };
};

const sessionRead = uid => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const db = getFirestore();
    const data = [];
    try {
      await dispatch(sessionReadBegin());
      const query = await db
        .collection('sessions')
        .where('student.id', '==', uid)
        .get();
      await query.forEach(doc => {
        data.push(doc.data());
      });
      const query2 = await db
        .collection('sessions')
        .where('tutor.id', '==', uid)
        .get();
      await query2.forEach(doc => {
        data.push(doc.data());
      });
      await dispatch(sessionReadSuccess(data));
    } catch (err) {
      await dispatch(sessionReadErr(err));
    }
  };
};

const sessionSearch = value => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const db = getFirestore();
    const data = [];
    try {
      await dispatch(sessionSearchBegin());
      const query = await db.collection('sessions').get();
      await query.forEach(doc => {
        data.push(doc.data());
      });
      const searchValue = data.filter(item => item.name.toLowerCase().startsWith(value.toLowerCase()));
      await dispatch(sessionSearchSuccess(searchValue));
    } catch (err) {
      await dispatch(sessionSearchErr(err));
    }
  };
};

const sessionUpdate = (id, data) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const db = getFirestore();
    try {
      await dispatch(sessionUpdateBegin());
      await db
        .collection('sessions')
        .doc(`${id}`)
        .update({
          ...data,
        });

      // await dispatch(sessionRead(uid));
      await updateNotificationSuccess();
    } catch (err) {
      await dispatch(sessionUpdateErr(err));
      await updateNotificationError(err);
    }
  };
};

const sessionDelete = id => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const db = getFirestore();
    const data = [];
    try {
      await dispatch(sessionDeleteBegin());
      await db
        .collection('sessions')
        .doc(`${id}`)
        .delete();

      await deleteNotificationSuccess();
      await sessionRead();
    } catch (err) {
      await dispatch(sessionDeleteErr(err));
      await deleteNotificationError(err);
    }
  };
};

const sessionSingle = id => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const db = getFirestore();
    try {
      await dispatch(sessionSingleDataBegin());
      const query = await db
        .collection('sessions')
        .where('id', '==', id)
        .get();
      await query.forEach(doc => {
        dispatch(sessionSingleDataSuccess(doc.data()));
      });
    } catch (err) {
      await dispatch(sessionSingleDataErr(err));
    }
  };
};

const sessionFileUploder = imageAsFile => {
  return async (dispatch, getState, { getFirebase, getFirestore, storage }) => {
    try {
      await dispatch(sessionUploadBegin());
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
              dispatch(sessionUploadSuccess(fireBaseUrl));
            });
        },
      );
    } catch (err) {
      await dispatch(sessionUploadErr(err));
    }
  };
};

const sessionFileClear = () => {
  return async dispatch => {
    try {
      await dispatch(sessionUploadBegin());
      dispatch(sessionUploadSuccess(null));
    } catch (err) {
      await dispatch(sessionUploadErr(err));
    }
  };
};

export {
  sessionSubmit,
  sessionSearch,
  sessionDelete,
  sessionSingle,
  sessionUpdate,
  sessionReview,
  sessionRead,
  sessionFileUploder,
  sessionFileClear,
};
