import { combineReducers } from '@reduxjs/toolkit';

import counterReducer from '@/redux/features/counter/slice';
import userReducer from '@/redux/features/user/slice';
import organizationReducer from '@/redux/features/organization/slice';

export default combineReducers({
  counter: counterReducer,
  user: userReducer,
  organization: organizationReducer,
});
