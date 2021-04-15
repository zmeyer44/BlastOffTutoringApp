const actions = {
  FB_LOGIN_BEGIN: 'FB_LOGIN_BEGIN',
  FB_LOGIN_SUCCESS: 'FB_LOGIN_SUCCESS',
  FB_LOGIN_ERR: 'FB_LOGIN_ERR',

  FB_LOGOUT_BEGIN: 'FB_LOGOUT_BEGIN',
  FB_LOGOUT_SUCCESS: 'FB_LOGOUT_SUCCESS',
  FB_LOGOUT_ERR: 'FB_LOGOUT_ERR',

  FB_SIGNUP_BEGIN: 'FB_SIGNUP_BEGIN',
  FB_SIGNUP_SUCCESS: 'FB_SIGNUP_SUCCESS',
  FB_SIGNUP_ERR: 'FB_SIGNUP_ERR',

  FB_SCHOOLAUTH_BEGIN: 'FB_SCHOOLAUTH_BEGIN',
  FB_SCHOOLAUTH_SUCCESS: 'FB_SCHOOLAUTH_SUCCESS',
  FB_SCHOOLAUTH_ERR: 'FB_SCHOOLAUTH_ERR',
  FB_SCHOOLAUTH_WRONG: 'FB_SCHOOLAUTH_WRONG',

  fbLoginBegin: () => {
    return {
      type: actions.FB_LOGIN_BEGIN,
    };
  },

  fbLoginSuccess: data => {
    return {
      type: actions.FB_LOGIN_SUCCESS,
      data,
    };
  },

  fbLoginErr: err => {
    return {
      type: actions.FB_LOGIN_ERR,
      err,
    };
  },

  fbLogOutBegin: () => {
    return {
      type: actions.FB_LOGOUT_BEGIN,
    };
  },

  fbLogOutSuccess: data => {
    return {
      type: actions.FB_LOGOUT_SUCCESS,
      data,
    };
  },

  fbLogOutErr: err => {
    return {
      type: actions.FB_LOGOUT_ERR,
      err,
    };
  },

  fbSignUpBegin: () => {
    return {
      type: actions.FB_SIGNUP_BEGIN,
    };
  },

  fbSignUpSuccess: data => {
    return {
      type: actions.FB_SIGNUP_SUCCESS,
      data,
    };
  },

  fbSignUpErr: err => {
    return {
      type: actions.FB_SIGNUP_ERR,
      err,
    };
  },

  fbSchoolAuthBegin: () => {
    return {
      type: actions.FB_SCHOOLAUTH_BEGIN,
    };
  },

  fbSchoolAuthSuccess: data => {
    return {
      type: actions.FB_SCHOOLAUTH_SUCCESS,
      data,
    };
  },

  fbSchoolAuthErr: err => {
    return {
      type: actions.FB_SCHOOLAUTH_ERR,
      err,
    };
  },

  fbSchoolAuthWrong: err => {
    return {
      type: actions.FB_SCHOOLAUTH_WRONG,
      err,
    };
  },
};

export default actions;
