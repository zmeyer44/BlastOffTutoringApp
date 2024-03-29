import actions from './actions';

const {
  singleTutorBegin,
  singleTutorSuccess,
  singleTutorErr,

  filterTutorBegin,
  filterTutorSuccess,
  filterTutorErr,

  sortingTutorBegin,
  sortingTutorSuccess,
  sortingTutorErr,

  fetchTutorsBegin,
  fetchTutorsSuccess,
  fetchTutorsErr,
} = actions;

const fetchTutors = (school, pageSize) => {
  console.log('FETCHING TUTORS');
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const db = getFirestore();
    const data = [];
    const openSchools = [];
    const key = db.collection('users').doc().id;
    try {
      let getSchools = await db
        .collection('schools')
        .where('status', '==', 'active')
        .where('isOpen', '==', true)
        .get();
      await getSchools.forEach(doc => {
        openSchools.push(doc.data().id);
      });
    } catch (err) {
      console.log(err);
      await dispatch(fetchTutorsErr(err));
    }

    if (openSchools.includes(school)) {
      try {
        await dispatch(fetchTutorsBegin());
        const data = await new Promise(outcome => {
          const tutorsRef = db.collection('users');
          let batches = [];
          while (openSchools.length) {
            const batch = openSchools.splice(0, 10);
            batches.push(
              new Promise(response => {
                tutorsRef
                  .where('school', 'in', batch)
                  .where('active', '==', true)
                  .where('approved', '==', true)
                  .where('id', '>=', key)
                  .limit(pageSize)
                  .get()
                  .then(tutors => {
                    var newtutors = [];
                    tutors.forEach(doc => {
                      newtutors.push(doc.data());
                    });

                    if (newtutors.length < pageSize) {
                      tutorsRef
                        .where('school', 'in', batch)
                        .where('active', '==', true)
                        .where('approved', '==', true)
                        .where('id', '>=', key)
                        .limit(pageSize * 2)
                        .get()
                        .then(tutors => {
                          var newtutors = [];
                          tutors.forEach(doc => {
                            newtutors.push(doc.data());
                          });
                        });
                    }
                    response(newtutors);
                  });
              }),
            );
          }
          Promise.all(batches).then(tutors => {
            let formatted = tutors.flat();
            outcome(formatted);
          });
        });
        if (data.length < pageSize) {
          const moreData = await new Promise(outcome => {
            const tutorsRef = db.collection('users');
            let batches = [];
            while (openSchools.length) {
              const batch = openSchools.splice(0, 10);
              batches.push(
                new Promise(response => {
                  tutorsRef
                    .where('school', 'in', batch)
                    .where('active', '==', true)
                    .where('approved', '==', true)
                    .where('id', '<', key)
                    .limit(pageSize - data.length)
                    .get()
                    .then(tutors => {
                      var newtutors = [];
                      tutors.forEach(doc => {
                        newtutors.push(doc.data());
                      });
                      response(newtutors);
                    });
                }),
              );
            }
            Promise.all(batches).then(tutors => {
              let formatted = tutors.flat();
              outcome(formatted);
            });
          });
          const finalData = data.concat(moreData);
          return await dispatch(fetchTutorsSuccess(finalData));
        } else {
          return await dispatch(fetchTutorsSuccess(data));
        }
      } catch (err) {
        console.log(err);
        await dispatch(fetchTutorsErr(err));
      }
    } else {
      try {
        await dispatch(fetchTutorsBegin());
        let query = await db
          .collection('users')
          .where('active', '==', true)
          .where('approved', '==', true)
          .where('school', '==', school)
          .where('id', '>=', key)
          .limit(pageSize)
          .get();
        await query.forEach(doc => {
          data.push(doc.data());
        });
        if (data.length < pageSize) {
          let more = await db
            .collection('users')
            .where('active', '==', true)
            .where('approved', '==', true)
            .where('school', '==', school)
            .where('id', '<', key)
            .limit(pageSize - data.length)
            .get();
          await more.forEach(doc => {
            data.push(doc.data());
          });
        }
        await dispatch(fetchTutorsSuccess(data));
      } catch (err) {
        console.log(err);
        await dispatch(fetchTutorsErr(err));
      }
    }
  };
};
const filterSinglePage = (paramsId, currentState) => {
  return async dispatch => {
    try {
      dispatch(singleTutorBegin());
      const data = currentState.filter(product => {
        return product.id === paramsId;
      });
      dispatch(singleProductSuccess(data));
    } catch (err) {
      dispatch(singleProductErr(err));
    }
  };
};

const sorting = (sortBy, data) => {
  return async dispatch => {
    try {
      dispatch(sortingTutorBegin());
      setTimeout(() => {
        const newData = data.sort((a, b) => {
          return b[sortBy] - a[sortBy];
        });
        dispatch(sortingTutorSuccess(newData));
      }, 100);
    } catch (err) {
      dispatch(sortingTutorErr(err));
    }
  };
};

const filterTutors = (state, startingData) => {
  return async dispatch => {
    dispatch(filterTutorBegin());
    let data = startingData.tutors;
    try {
      if (state.grade) {
        data = data.filter(tutor => {
          return tutor.grades[0] <= state.grade && tutor.grades[1] >= state.grade;
        });
      }
      if (state.subjects) {
        data = data.filter(tutor => {
          return state.subjects.every(subject => tutor.subjects.includes(subject));
        });
      }
      if (state.style?.length) {
        data = data.filter(tutor => {
          return state.style.some(style => tutor['tutoring-type'] === style);
        });
      }
      if (state.schools?.length) {
        data = data.filter(tutor => {
          return state.schools.includes(tutor.school);
        });
      }
      dispatch(filterTutorSuccess(data));
    } catch (err) {
      console.log(err);
      dispatch(filterTutorErr(err));
    }
  };
};

const filterByRating = range => {
  return async dispatch => {
    try {
      dispatch(filterProductBegin());
      setTimeout(() => {
        const data = initialState.filter(product => {
          if (range[0].length) {
            return range[0].includes(product.rate);
          }
          return initialState;
        });
        dispatch(filterProductSuccess(data));
      }, 100);
    } catch (err) {
      dispatch(filterProductErr(err));
    }
  };
};

const filterByTutoringType = type => {
  console.log('Type', type);
  return async dispatch => {
    try {
      dispatch(filterProductBegin());
      setTimeout(() => {
        const data = initialState.filter(product => {
          console.log('Tutor', product);
          if (type[0].length) {
            return type[0].includes(product.brand);
          }
          return initialState;
        });
        dispatch(filterProductSuccess(data));
      }, 100);
    } catch (err) {
      dispatch(filterProductErr(err));
    }
  };
};

const filterByBrand = brand => {
  return async dispatch => {
    try {
      dispatch(filterProductBegin());
      setTimeout(() => {
        const data = initialState.filter(product => {
          if (brand[0].length) {
            return brand[0].includes(product.brand);
          }
          return initialState;
        });
        dispatch(filterProductSuccess(data));
      }, 100);
    } catch (err) {
      dispatch(filterProductErr(err));
    }
  };
};

const filterByCategory = category => {
  return async dispatch => {
    try {
      dispatch(filterProductBegin());
      setTimeout(() => {
        const data = initialState.filter(product => {
          if (category !== 'all') {
            return product.category === category;
          }
          return initialState;
        });
        dispatch(filterProductSuccess(data));
      }, 100);
    } catch (err) {
      dispatch(filterProductErr(err));
    }
  };
};

const updateWishList = id => {
  return async dispatch => {
    try {
      dispatch(filterProductBegin());

      initialState.map(product => {
        if (product.id === id) {
          return product.popular ? (product.popular = false) : (product.popular = true);
        }
        return dispatch(filterProductSuccess(initialState));
      });
    } catch (err) {
      dispatch(filterProductErr(err));
    }
  };
};

export {
  fetchTutors,
  filterSinglePage,
  sorting,
  filterTutors,
  filterByRating,
  filterByBrand,
  filterByTutoringType,
  filterByCategory,
  updateWishList,
};
