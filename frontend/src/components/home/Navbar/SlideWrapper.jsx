import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';

const SlideWrapper = ({ index, hoveringElement, children }) => {
  return (
    <div className={clsx(
      'absolute',
      hoveringElement === index ? 'opacity-100' : 'opacity-0 pointer-events-none',
      /*hoveringElement === index || hoveringElement === null
        ? 'transform-none'
        : hoveringElement > index
        ? '-translate-x-24'
        : 'translate-x-24'*/
    )}
    >
      {children}
    </div>
  )
}

SlideWrapper.propTypes = {
  index: PropTypes.number,
  hoveringElement: PropTypes.number,
  children: PropTypes.node,
};

export default SlideWrapper