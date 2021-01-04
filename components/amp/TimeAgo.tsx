import React, { PropsWithChildren } from 'react';
import PropTypes, { InferProps } from 'prop-types';

export function TimeAgo(props: InferProps<typeof TimeAgo.propTypes>) {
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
  );
}

TimeAgo.propTypes = {
  date: PropTypes.object.isRequired,
  hello: PropTypes.string,
};

TimeAgo.defaultProps = {
  hello: 'Greeting',
};

