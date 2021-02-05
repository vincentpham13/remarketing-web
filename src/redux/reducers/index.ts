import { combineReducers } from '@reduxjs/toolkit';

import counterReducer from '@/redux/features/counter/slice';
import userReducer from '@/redux/features/user/user.slice';
import organizationReducer from '@/redux/features/organization/organization.slice';
import authReducer from '@/redux/features/auth/auth.slice';
import fanpageSlice from '@/redux/features/fanpage/fanpage.slice';
import campaignSlice from '@/redux/features/campaign/campaign.slice';
import adminSlice from '@/redux/features/admin/admin.slice';
import packageSlice from '@/redux/features/package/package.slice';
import orderSlice from '@/redux/features/order/order.slice';

export default combineReducers({
  counter: counterReducer,
  user: userReducer,
  organization: organizationReducer,
  auth: authReducer,
  fanpage: fanpageSlice,
  campaign: campaignSlice,
  package: packageSlice,
  order: orderSlice,
  admin: adminSlice,
});
