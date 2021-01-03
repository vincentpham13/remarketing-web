import React from 'react';

import {TimeAgo} from '@/components/amp';

export const config = {
  amp: true
}

const Custom = (props) => {

  return (
    <>
      <h1>This is a custom page</h1>
      <TimeAgo date={new Date('2013-03-01T01:10:00')} />
    </>
  )
}


export default Custom;
