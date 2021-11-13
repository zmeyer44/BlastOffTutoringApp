const actions = {
  STUDENT_APPROVE_BEGIN: 'STUDENT_APPROVE_BEGIN',
  STUDENT_APPROVE_SUCCESS: 'STUDENT_APPROVE_SUCCESS',
  STUDENT_APPROVE_ERR: 'STUDENT_APPROVE_ERR',

  studentApproveBegin: () => {
    return {
      type: actions.STUDENT_APPROVE_BEGIN,
    };
  },

  studentApproveSuccess: data => {
    return {
      type: actions.STUDENT_APPROVE_SUCCESS,
      data,
    };
  },

  studentApproveErr: err => {
    return {
      type: actions.STUDENT_APPROVE_ERR,
      err,
    };
  },
};

export default actions;
