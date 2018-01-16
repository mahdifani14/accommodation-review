
import { OPEN_SNACKBAR, CLOSE_SNACKBAR, OPEN_ERROR_MESSAGE } from './AppActions';
import { fromJS } from 'immutable';
import { combineReducers } from 'redux-immutable';

const snackBarinitialState = fromJS({
  isOpen: false,
  data: {
    message: '',
  },
});

const snackBarReducer = (state = snackBarinitialState, action) => {
  switch (action.type) {
    case OPEN_ERROR_MESSAGE:
    case OPEN_SNACKBAR:
      return state.merge({
        isOpen: true,
        data: fromJS(action.data),
      });

    case CLOSE_SNACKBAR:
      return snackBarinitialState;

    default:
      return state;
  }
};

export default combineReducers({
  snackbar: snackBarReducer,
});

export const isOpen = state => state.getIn(['app', 'snackbar', 'isOpen'], false);

export const getMessage = state => state.getIn(['app', 'snackbar', 'data', 'message'], '');
