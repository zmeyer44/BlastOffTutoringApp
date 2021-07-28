import firebase from 'firebase/app';
import actions from './actions';

const {
  fbLoginBegin,
  fbLoginSuccess,
  fbLoginErr,
  fbLogOutBegin,
  fbLogOutSuccess,
  fbLogOutErr,
  fbSignUpBegin,
  fbSignUpSuccess,
  fbSignUpErr,
  fbSchoolAuthBegin,
  fbSchoolAuthSuccess,
  fbSchoolAuthErr,
  fbSchoolAuthWrong,
} = actions;

const fbAuthLogin = data => {
  return async (dispatch, getState, { getFirebase }) => {
    const fb = getFirebase();
    try {
      await dispatch(fbLoginBegin());
      await fb.auth().signInWithEmailAndPassword(data.email, data.password);
      await dispatch(fbLoginSuccess(data));
    } catch (err) {
      await dispatch(fbLoginErr(err));
    }
  };
};

const fbAuthLogout = () => {
  return async (dispatch, getState, { getFirebase }) => {
    const fb = getFirebase();
    try {
      await dispatch(fbLogOutBegin());
      await fb.auth().signOut();
      await dispatch(fbLogOutSuccess());
    } catch (err) {
      await dispatch(fbLogOutErr(err));
    }
  };
};

// const fbFetchSchools = () => {
//   return async (dispatch, getState, { getFirebase, getFirestore }) => {
//     const db = getFirestore();
//     const data = [];
//     try {
//       await dispatch(schoolReadBegin());
//       const query = await db.collection('schools').get();
//       await query.forEach(doc => {
//         data.push(doc.data().name);
//       });
//       await dispatch(schoolReadSuccess(data));
//     } catch (err) {
//       await dispatch(schoolReadErr(err));
//     }
//   };
// };

const fbSchoolAuth = (school, code) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const db = getFirestore();
    const fb = getFirebase();
    try {
      await dispatch(fbSchoolAuthBegin());
      const query = await db
        .collection('schools')
        .doc(`${school}`)
        .get();
      if (query.data().code == code) {
        await dispatch(fbSchoolAuthSuccess(query.data()));
      } else {
        await dispatch(fbSchoolAuthWrong('Code is incorrect'));
      }
    } catch (err) {
      console.log(err);
      await dispatch(fbSchoolAuthErr(err));
    }
  };
};

const fbAuthSignUp = newUser => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const db = getFirestore();
    const fb = getFirebase();
    try {
      await dispatch(fbSignUpBegin());
      const resp = await fb.auth().createUserWithEmailAndPassword(newUser.email, newUser.password);
      const cover = Math.floor(Math.random() * 8) + 1;
      delete newUser.password;
      await db
        .collection('users')
        .doc(resp.user.uid)
        .set({
          ...newUser,
          profileImage:
            'https://firebasestorage.googleapis.com/v0/b/blast-off-tutoring.appspot.com/o/images%2Fdefault_profile_image.jpg?alt=media',
          coverImage: `https://firebasestorage.googleapis.com/v0/b/blast-off-tutoring.appspot.com/o/images%2Fcover_${cover}.png?alt=media`,
          approved: false,
          id: resp.user.uid,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        });
      await dispatch(fbSignUpSuccess());
    } catch (err) {
      await dispatch(fbSignUpErr(err));
    }
  };
};

const fbAuthLoginWithGoogle = () => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const db = getFirestore();
    const fb = getFirebase();
    const provider = new fb.auth.GoogleAuthProvider();
    try {
      await dispatch(fbLoginBegin());
      const result = await fb.auth().signInWithPopup(provider);
      console.log(result);
      try {
        const usersRef = db.collection('users').doc(`${result.user.uid}`);

        usersRef.get().then(docSnapshot => {
          if (docSnapshot.exists) {
            console.log('Known User');
            // usersRef.onSnapshot((doc) => {
            //   // do stuff with the data
            // });
          } else {
            console.log('New User');
          }
        });
      } catch (err) {
        console.error(err);
      }

      await dispatch(fbLoginSuccess(result));
    } catch (err) {
      await dispatch(fbLoginErr(err));
    }
  };
};

const fbAuthLoginWithFacebook = () => {
  return async (dispatch, getState, { getFirebase }) => {
    const fb = getFirebase();
    const provider = new fb.auth.FacebookAuthProvider();
    try {
      await dispatch(fbLoginBegin());
      const result = await fb.auth().signInWithPopup(provider);
      await dispatch(fbLoginSuccess(result));
    } catch (err) {
      await dispatch(fbLoginErr(err));
    }
  };
};

export { fbAuthLogin, fbAuthLogout, fbAuthSignUp, fbAuthLoginWithGoogle, fbAuthLoginWithFacebook, fbSchoolAuth };
