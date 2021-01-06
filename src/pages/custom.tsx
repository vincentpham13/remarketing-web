import React, { useEffect, MouseEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { TimeAgo } from '@/components/amp';
import { Parent } from '@/components/parent';
import { userSelector } from '@/redux/features/user/slice';
import {
  organizationSelector,
  getStaffsAsyncThunk,
} from '@/redux/features/organization';

export const config = {
  amp: 'hybrid',
};

const Custom = (props) => {
  const dispatch = useDispatch();
  const { name } = useSelector(userSelector);
  const { staffs } = useSelector(organizationSelector);

  const loadStaffList = (e: MouseEvent<HTMLButtonElement>) => {
    dispatch(getStaffsAsyncThunk());
  };

  useEffect(() => {
    console.log(staffs);
  }, [staffs]);

  return (
    <>
      <Parent>
        <h1>User List</h1>
        <TimeAgo date={new Date('2013-03-01T01:10:00')} />
      </Parent>
      <h3>Logined as: Mr {name}</h3>
      <button onClick={loadStaffList}>
        {staffs.status === 'loading' ? 'Loading staff list' : 'Load staff list'}
      </button>
      <ul>
        {staffs.status === 'succeeded' && !staffs.error
          ? Object.entries(staffs.entities).map(([, staff]) => (
              <li key={staff.id}>{staff.firstName}</li>
            ))
          : null}
      </ul>
    </>
  );
};

export default Custom;
