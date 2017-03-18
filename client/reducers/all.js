import { combineReducers } from 'redux';

import auth from './auth';
import container from './container';

export default combineReducers({
  auth,
  container
});
