import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'antd';

import { TimeAgo } from '@/components/amp';
import { Parent } from '@/components/parent';
import { userSelector } from '@/redux/features/user/user.slice';
import {
  organizationSelector,
  getStaffsAsyncThunk,
} from '@/redux/features/organization';
import AuthenticatedAppLayout from '@/layouts/AuthenticatedAppLayout';

export const config = {
  amp: 'hybrid',
};

const Custom = () => {
  const dispatch = useDispatch();
  const { name } = useSelector(userSelector);
  const { staffs } = useSelector(organizationSelector);
  const [staffsPromise, setStaffsPromise] = useState<any>();

  const loadStaffList = () => {
    setStaffsPromise(dispatch(getStaffsAsyncThunk()));
    // console.log("🚀 ~ file: custom.tsx ~ line 26 ~ loadStaffList ~ getStaffsPromise", getStaffsPromise)
  };

  const cancelLoad = () => {
    staffsPromise.abort();
  };

  useEffect(() => {}, [staffs]);

  return (
    <>
      <Parent>
        <h1>User List</h1>
        <TimeAgo date={new Date('2013-03-01T01:10:00')} />
      </Parent>
      <h3>Logined as: Mr {name}</h3>
      <Button
        type="primary"
        onClick={loadStaffList}
        loading={staffs.status === 'loading'}>
        Loading staff list
      </Button>
      <Button type="ghost" onClick={cancelLoad}>
        Cancel Loading
      </Button>
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

Custom.getLayout = (page) => (
  <AuthenticatedAppLayout>{page}</AuthenticatedAppLayout>
);

export default Custom;
