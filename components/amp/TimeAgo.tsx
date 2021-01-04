import React, { PropsWithChildren } from 'react'

const TimeAgo = (props: PropsWithChildren<{
  date: Date,
}>) => {
  const { date } = props;

  return (
    <div>
      <amp-timeago
        width="0"
        height="85"
        datetime={date.toJSON()}
        layout="responsive"
      >
        .
    </amp-timeago>
    </div>
  )
}

export default TimeAgo;
