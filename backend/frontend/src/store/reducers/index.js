import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import modelReducer from './modelReducer';

export default combineReducers({
  form: formReducer,
  models: modelReducer
});
