import moment from 'moment/moment';
import 'moment-timezone';

// moment.locale('en');

const toDate = (date) => moment(date).format('L')

export {
  toDate
};