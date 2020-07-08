import React, { Fragment } from 'react';
import { FieldArray, getIn } from 'formik';
import block from 'bem-cn-lite';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useOrderItemInspectionResult } from '../../hooks/order';
import { objMatches } from '../../helpers/orderUtils';
import Field from '../ui/field';
import InputNumeric from '../ui/numeric';
import RadioGroup from '../ui/radio-group';
import File from '../ui/file';
import iconPlus from '../../img/plus.svg';
import {
  updateError,
  updateLoaded,
  updateRequested,
} from '../../redux/actions/order';

const f = block('form');

const InspectionFormSteps = (props) => {
  const {
    handleChange,
    values,
    errors,
    touched,
    step,
    setFieldValue,
    validateForm,
    isValid,
    currentLine,
    nextItem,
    initialValues,
    updateRequested,
    updateLoaded,
    updateError,
    order: {
      token,
      orderLines,
    },
    nextStep,
  } = props;

  const orderItemInspectionConfirm = useOrderItemInspectionResult();

  async function handleConfirmItem(push) {
    if (orderLines[currentLine]) {
      const notValidate = objMatches(
        initialValues.orderLines[0],
        values.orderLines[currentLine],
      );
      if (notValidate || !isValid) {
        validateForm();
      } else {
        try {
          updateRequested();
          const res = await orderItemInspectionConfirm({
            token,
            orderLineId: orderLines[currentLine].id,
            ...values.orderLines[currentLine],
          });
          updateLoaded(res.data.orderItemInspectionResult);
          if (currentLine < orderLines.length - 1) {
            push(initialValues.orderLines[0]);
            nextItem();
          } else {
            nextStep();
          }
        } catch (err) {
          updateError(err);
        }
      }
    }
  }

  switch (step) {
    case 0:
      return (
        <>
          <Field
            id="name"
            type="text"
            name="name"
            label="Your Name"
            error={touched.name ? errors.name : ''}
            value={values.name}
            onChange={handleChange}
          />
          <div className="actions">
            <button type="submit" className="btn">Begin Inspection</button>
          </div>
        </>
      );
    case 1:
      return (
        <>
          <FieldArray name="orderLines">
            {({ push }) => (
              <>
                {
                  values.orderLines.length > 0
                  && values.orderLines.map((item, index) => (index === currentLine ? (
                    <Fragment key={index}>
                      <div className={f('row')}>
                        <div className={f('col', { center: true })}>
                          <span className="text text_secondary text_sm">Quantity Received</span>
                        </div>
                        <div className={f('col', { center: true })}>
                          <InputNumeric
                            onChange={(value) => setFieldValue(`orderLines[${index}].quantityReceived`, value)}
                            name={`orderLines[${index}].quantityReceived`}
                            min={0}
                            max={orderLines[currentLine].quantity}
                            value={item.quantityReceived}
                            type="text"
                          />
                        </div>
                      </div>
                      <div className={f('group')}>
                        <RadioGroup
                          className={f('radio-buttons')}
                          items={[
                            { value: false, label: 'No Damage' },
                            { value: true, label: 'Package Damaged' },
                          ]}
                          name={`orderLines[${index}].packageDamaged`}
                          value={item.packageDamaged}
                          error={getIn(errors, `orderLines[${index}].packageDamaged`)}
                          touched={getIn(touched, `orderLines[${index}].packageDamaged`)}
                          setFieldValue={setFieldValue}
                        />
                        <RadioGroup
                          className={f('radio-buttons')}
                          items={[
                            { value: false, label: 'Matches BOL' },
                            { value: true, label: 'Product Mismatch' },
                          ]}
                          name={`orderLines[${index}].bolMismatch`}
                          value={item.bolMismatch}
                          error={getIn(errors, `orderLines[${index}].bolMismatch`)}
                          touched={getIn(touched, `orderLines[${index}].bolMismatch`)}
                          setFieldValue={setFieldValue}
                        />
                        <div className={f('buttons')}>
                          <File
                            className="btn btn-file"
                            onChange={(file) => setFieldValue(`orderLines.${index}.packageImages`, file)}
                            accepts={['image/*']}
                            multiple={false}
                            maxFileSize={10000000}
                            minFileSize={0}
                            value={item.packageImages}
                            error={getIn(errors, `orderLines[${index}].packageImages`)}
                            clickable
                            name={`orderLines[${index}].packageImages`}
                          >
                            <img src={iconPlus} alt="icon check" />
                            <span>Add packageImages of product</span>
                          </File>
                        </div>
                      </div>
                      <Field
                        id={`notes-${index}`}
                        name={`orderLines[${index}].notes`}
                        multi
                        label="Notes"
                        error={getIn(errors, `orderLines[${index}].notes`)}
                        value={item.notes}
                        onChange={handleChange}
                      />
                    </Fragment>
                  ) : null))
                }
                <div className="actions">
                  <button type="button" onClick={() => handleConfirmItem(push)} className="btn">Confirm Item</button>
                </div>
              </>
            )}
          </FieldArray>
        </>
      );
    case 2:
      return (
        <>
          <Field
            id="finalNotes"
            name="finalNotes"
            multi
            label="Final Notes"
            error={touched.finalNotes ? errors.finalNotes : ''}
            value={values.finalNotes}
            onChange={handleChange}
          />
          <div className="actions">
            <button type="submit" className="btn">Confirm Inspection</button>
          </div>
        </>
      );
    default:
      return null;
  }
};

InspectionFormSteps.defaultProps = {
  order: null,
};

InspectionFormSteps.propTypes = {
  handleChange: PropTypes.func.isRequired,
  values: PropTypes.objectOf(PropTypes.any).isRequired,
  errors: PropTypes.objectOf(PropTypes.any).isRequired,
  touched: PropTypes.objectOf(PropTypes.any).isRequired,
  step: PropTypes.number.isRequired,
  setFieldValue: PropTypes.func.isRequired,
  validateForm: PropTypes.func.isRequired,
  isValid: PropTypes.bool.isRequired,
  currentLine: PropTypes.number.isRequired,
  nextItem: PropTypes.func.isRequired,
  initialValues: PropTypes.objectOf(PropTypes.any).isRequired,
  updateRequested: PropTypes.func.isRequired,
  updateLoaded: PropTypes.func.isRequired,
  updateError: PropTypes.func.isRequired,
  order: PropTypes.objectOf(PropTypes.any),
  nextStep: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  updateRequested,
  updateLoaded,
  updateError,
};

export default connect(null, mapDispatchToProps)(InspectionFormSteps);
