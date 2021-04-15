import firebase from 'firebase/app';
import { doc } from 'prettier';
import actions from './actions';

const {
  newMessageBegin,
  newMessageSuccess,
  newMessageErr,

  fetchConvosBegin,
  fetchConvosSuccess,
  fetchConvosErr,

  newConvosBegin,
  newConvosSuccess,
  newConvosErr,

  readMsgBegin,
  readMsgSuccess,
  readMsgErr,

  deleteConvoBegin,
  deleteConvoSuccess,
  deleteConvoErr,
} = actions;

const newMessage = (conversation, messageInfo) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const db = getFirestore();
    try {
      //await dispatch(newMessageBegin());
      const query = db.collection('conversations').doc(`${conversation}`);

      query.update({
        messages: firebase.firestore.FieldValue.arrayUnion(messageInfo),
      });

      //await dispatch(newMessageSuccess(data));
      await addNotificationSuccess();
    } catch (err) {
      //await dispatch(newMessageErr(err));
      //await addNotificationError(err);
    }
  };
};

const fetchConvos = uid => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const db = getFirestore();
    const data = [];
    try {
      await dispatch(fetchConvosBegin());
      const query = await db
        .collection('conversations')
        .where('users', 'array-contains', `${uid}`)
        .orderBy('recentActivity')
        .get();
      await query.forEach(doc => {
        data.push(doc.data());
      });

      await dispatch(fetchConvosSuccess(data));
    } catch (err) {
      await dispatch(fetchConvosErr(err));
    }
  };
};

const newConversation = (userId, targetId) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const db = getFirestore();
    try {
      const user1Doc = db.collection('users').doc(`${userId}`);
      const user2Doc = db.collection('users').doc(`${targetId}`);
      user1Doc.get().then(user => {
        if (user.exists) {
          let userData = user.data();
          user2Doc
            .get()
            .then(doc => {
              if (doc.exists) {
                let { id, firstName, lastName, profileImage } = doc.data();
                const query = db.collection('conversations').doc();
                let user1Name = `${userData.firstName} ${userData.lastName}`;
                let user2Name = `${firstName} ${lastName}`;
                query.set({
                  id: query.id,
                  messages: [],
                  user1: {
                    id: userData.id,
                    name: user1Name,
                    profileImage: userData.profileImage,
                  },
                  user2: {
                    id: id,
                    name: user2Name,
                    profileImage: profileImage,
                  },
                  users: [userId, targetId],
                  recentActivity: new Date().getTime(),
                });
              } else {
                console.log('User Not Found');
              }
            })
            .catch(err => {
              console.error(err);
            });
        } else {
          console.error('User Logged in incorrectly!');
        }
      });

      //await dispatch(newMessageSuccess(data));
    } catch (err) {
      console.log(err);
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

export { fetchConvos, newMessage, newConversation };