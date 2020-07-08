import React from 'react';
import block from 'bem-cn-lite';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Heading from '../../components/typography/heading';
import Stepper from '../../components/ui/stepper';
import Header from '../../components/header';
import { toDate } from '../../helpers/date';

const c = block('content');

const CompleteOrder = ({ order }) => {
  if (!order) return <Redirect to="/" />;

  return (
    <>
      <Header>
        <Heading variant="primary">
          <h3>Order Complete</h3>
        </Heading>
        <p className="text">This order has been succesfully processed.</p>
        <Stepper steps={4} active={4} completed={4} />
      </Header>
      <div className={c('body')}>
        <Heading align="center" variant="secondary">
          <h3>
            Order
            {' '}
            {order.token}
          </h3>
        </Heading>
        <p className="text text_bold text_center">This order has been RECEIVED and INSPECTED</p>
        <div className="notifications notifications_center">
          <div className="notifications__item">
            <span
              className="text text_primary text_italic"
            >
              Received on
              {' '}
              {toDate(order.freightInfo.receivedOn)}
              {' '}
              <br />
              {' '}
              By: Mike Sanchez
            </span>
          </div>
          <div className="notifications__item">
            <span
              className="text text_primary text_italic"
            >
              {' '}
              Inspected on
              {' '}
              {toDate(order.freightInfo.inspectedOn)}
              {' '}
              <br />
              {' '}
              By: Louise Marley
            </span>
          </div>
        </div>
        <div className="actions">
          <Link to="/" className="btn">Inspect Another</Link>
        </div>
      </div>
    </>
  );
};

CompleteOrder.propTypes = {
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
};

const mapStateToProps = ({ order: { item } }) => ({
  order: item,
});

const mapDispatchToProps = null;

export default connect(mapStateToProps, mapDispatchToProps)(CompleteOrder);
