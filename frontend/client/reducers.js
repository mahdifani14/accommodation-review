import { combineReducers } from 'redux-immutable';
import { fromJS } from 'immutable';
import app from './modules/App/AppReducer';
import reviews from './modules/Reviews/ReviewsReducer';
import { reducer as formReducer } from 'redux-form';

export default combineReducers({
  app,
  reviews,
  form: (state = fromJS({}), action) => fromJS(formReducer(state.toJS(), action)),
});
