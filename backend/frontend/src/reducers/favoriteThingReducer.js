import _ from 'lodash';
import {
  FETCH_FAVORITETHING,
  FETCH_FAVORITETHINGS,
  CREATE_FAVORITETHING,
  EDIT_FAVORITETHING,
  DELETE_FAVORITETHING
} from '../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_FAVORITETHINGS:
      console.log(action.payload);
      return { ...state, ..._.mapKeys(action.payload, 'id') };
    case FETCH_FAVORITETHING:
      return { ...state, [action.payload.id]: action.payload };
    case CREATE_FAVORITETHING:
      return { ...state, [action.payload.id]: action.payload };
    case EDIT_FAVORITETHING:
      return { ...state, [action.payload.id]: action.payload };
    case DELETE_FAVORITETHING:
      return _.omit(state, action.payload);
    default:
      return state;
  }
};
