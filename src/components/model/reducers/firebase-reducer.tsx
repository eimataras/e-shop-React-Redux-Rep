import { cloneDeep } from 'lodash';
import initialState from '../initial-state';


const firebaseReducer = (state = cloneDeep(initialState.firebase), action) => {
  switch (action.type) {
    // -------------- ----------

    default:
      return state;
  }
};

export default firebaseReducer;
