import React, { ReactElement } from 'react';
import PropTypes, { InferProps } from 'prop-types';

import styles from './Parent.module.scss';

export function Parent(
  props: InferProps<typeof Parent.propTypes>,
): ReactElement {
  const { children } = props;
  return <div className={styles['parent-wrapper']}>{children}</div>;
}

Parent.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
