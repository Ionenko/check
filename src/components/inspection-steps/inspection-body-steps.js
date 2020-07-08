import pluralize from 'pluralize';
import React from 'react';
import PropTypes from 'prop-types';
import { getTotalItems } from '../../helpers/orderUtils';
import { toDate } from '../../helpers/date';

const InspectionBodySteps = (props) => {
  const {
    step,
    order,
    backStep,
    currentLine,
  } = props;

  const { orderLines } = order;

  const detailsCount = (
    <div className="details__row">
      <div className="details__col">
        <p className="text text_bold">{pluralize('Item', getTotalItems(order.orderLines), true)}</p>
      </div>
      <div className="details__col">
        <p className="text text_bold">{pluralize('Box', order.orderLines.length, true)}</p>
      </div>
    </div>
  );

  const detailsDelivery = (
    <div className="details__outside">
      <div className="details__items">
        <div className="details__item">
          <p className="text text_sm text_info">Delivered From</p>
          <p className="text text_bold">order.delivered.from</p>
        </div>
        <div className="details__item">
          <p className="text text_sm text_info">Delivered To</p>
          <p className="text text_bold">order.delivered.to</p>
        </div>
      </div>
    </div>
  );

  switch (step) {
    case 0:
      return (
        <>
          <div className="notifications notifications_center">
            <div className="notifications__item">
              <span className="text text_primary text_italic">
                Received on
                {' '}
                {toDate(order.freightInfo.receivedOn)}
                {' '}
                <br />
                {' '}
                By:
                {' '}
                No-name
              </span>
            </div>
          </div>
          <div className="details">
            {detailsCount}
            {
              0 ? detailsDelivery : null
            }
          </div>
        </>
      );
    case 1:
      return (
        <>
          <span onClick={backStep} className="link link_inverse text text_sm">&lt; back</span>
          <div className="details">
            <div className="details__row">
              <div className="details__col">
                <p className="text text_bold">
                  Item
                  {currentLine + 1}
                  {' '}
                  of
                  {orderLines.length}
                </p>
              </div>
            </div>
            <h2 className="text text_bold text_center">
              {`${orderLines[currentLine].quantity} ${orderLines[currentLine].productVariant.title}`}
            </h2>
          </div>
        </>
      );
    case 2:
      return (
        <>
          <div className="details">
            {detailsCount}
            {detailsDelivery}
          </div>
          <div className="notifications">
            <div className="notifications__item">
              <span
                className="text text_primary text_italic"
              >
                Received on 6/2/2020 17:36PM EST
                {' '}
                <br />
                {' '}
                By: Mike Sanchez
              </span>
            </div>
          </div>
        </>
      );
    default:
      return null;
  }
};

InspectionBodySteps.propTypes = {
  step: PropTypes.number.isRequired,
  order: PropTypes.shape({
    id: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    state: PropTypes.string,
    createdAt: PropTypes.number,
    updatedAt: PropTypes.number,
    token: PropTypes.string,
    freightInfo: PropTypes.object,
  }).isRequired,
  backStep: PropTypes.func.isRequired,
  currentLine: PropTypes.number.isRequired,
};

export default InspectionBodySteps;
