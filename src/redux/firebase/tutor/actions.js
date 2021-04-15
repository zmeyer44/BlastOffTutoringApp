const actions = {
  SINGLE_TUTOR_BEGIN: 'SINGLE_TUTOR_BEGIN',
  SINGLE_TUTOR_SUCCESS: 'SINGLE_TUTOR_SUCCESS',
  SINGLE_TUTOR_ERR: 'SINGLE_TUTOR_ERR',

  FILTER_TUTOR_BEGIN: 'FILTER_TUTOR_BEGIN',
  FILTER_TUTOR_SUCCESS: 'FILTER_TUTOR_SUCCESS',
  FILTER_TUTOR_ERR: 'FILTER_TUTOR_ERR',

  SORTING_TUTOR_BEGIN: 'SORTING_TUTOR_BEGIN',
  SORTING_TUTOR_SUCCESS: 'SORTING_TUTOR_SUCCESS',
  SORTING_TUTOR_ERR: 'SORTING_TUTOR_ERR',

  FETCH_TUTOR_BEGIN: 'FETCH_TUTOR_BEGIN',
  FETCH_TUTOR_SUCCESS: 'FETCH_TUTOR_SUCCESS',
  FETCH_TUTOR_ERR: 'FETCH_TUTOR_ERR',

  singleTutorBegin: () => {
    return {
      type: actions.SINGLE_TUTOR_BEGIN,
    };
  },

  singleTutorSuccess: data => {
    return {
      type: actions.SINGLE_TUTOR_SUCCESS,
      data,
    };
  },

  singleTutorErr: err => {
    return {
      type: actions.SINGLE_TUTOR_ERR,
      err,
    };
  },

  filterTutorBegin: () => {
    return {
      type: actions.FILTER_TUTOR_BEGIN,
    };
  },

  filterTutorSuccess: data => {
    return {
      type: actions.FILTER_TUTOR_SUCCESS,
      data,
    };
  },

  filterTutorErr: err => {
    return {
      type: actions.FILTER_TUTOR_ERR,
      err,
    };
  },

  sortingTutorBegin: () => {
    return {
      type: actions.SORTING_TUTOR_BEGIN,
    };
  },

  sortingTutorSuccess: data => {
    return {
      type: actions.SORTING_TUTOR_SUCCESS,
      data,
    };
  },

  sortingTutorErr: err => {
    return {
      type: actions.SORTING_TUTOR_ERR,
      err,
    };
  },

  fetchTutorsBegin: () => {
    return {
      type: actions.FETCH_TUTOR_BEGIN,
    };
  },

  fetchTutorsSuccess: data => {
    return {
      type: actions.FETCH_TUTOR_SUCCESS,
      data,
    };
  },

  fetchTutorsErr: err => {
    return {
      type: actions.FETCH_TUTOR_ERR,
      err,
    };
  },
};

export default actions;
