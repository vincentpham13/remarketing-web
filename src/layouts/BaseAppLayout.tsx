import React, { FC } from 'react';
import PropTypes from 'prop-types';

const BaseAppLayout: FC = (props) => {
  const { children } = props;

  return (
    <div>
      <h1>Base app layout</h1>
      {children}
    </div>
  );
};

BaseAppLayout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default BaseAppLayout;
