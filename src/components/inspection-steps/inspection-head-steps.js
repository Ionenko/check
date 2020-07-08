import React from 'react';
import PropTypes from 'prop-types';
import Stepper from '../ui/stepper';

const InspectionHeadSteps = ({ step }) => {
  switch (step) {
    case 0:
      return (
        <>
          <p className="text">You will now go through the package contents to ensure each item is as described.</p>
          <Stepper steps={4} active={3} completed={2} />
        </>
      );
    case 1:
      return (
        <>
          <p className="text">You will now go through the package contents to ensure each item is as described.</p>
          <Stepper steps={4} active={4} completed={3} />
        </>
      );
    case 2:
      return (
        <>
          <p className="text">Confirm final inspection</p>
          <Stepper steps={4} active={4} completed={4} />
        </>
      );
    default:
      return null;
  }
};

InspectionHeadSteps.propTypes = {
  step: PropTypes.number.isRequired,
};

export default InspectionHeadSteps;
