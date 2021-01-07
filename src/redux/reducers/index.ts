import { combineReducers } from '@reduxjs/toolkit';

import counterReducer from '@/redux/features/counter/slice';
import userReducer from '@/redux/features/user/user.slice';
import organizationReducer from '@/redux/features/organization/organization.slice';
import authReducer from '@/redux/features/auth/auth.slice';

export default combineReducers({
  counter: counterReducer,
  user: userReducer,
  organization: organizationReducer,
  auth: authReducer,
});
