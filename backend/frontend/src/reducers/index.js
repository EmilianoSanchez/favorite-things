import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import favoriteThingReducer from './favoriteThingReducer';

export default combineReducers({
  form: formReducer,
  favoriteThings: favoriteThingReducer
});
