import React from 'react';

import { TimeAgo } from '@/components/amp';
import { Parent } from '@/components/parent';

export const config = {
  amp: 'hybrid',
};

const Custom = (props) => {
  return (
    <>
      <Parent>
        <h1>This is a custom page</h1>
        <TimeAgo date={new Date('2013-03-01T01:10:00')} />
      </Parent>
    </>
  );
};

export default Custom;
