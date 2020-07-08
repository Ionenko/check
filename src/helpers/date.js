import moment from 'moment/moment';
import 'moment-timezone';

export const toDate = (date) => moment.utc(date).tz('America/New_York').format('DD/MM/YYYY hh:mm z');
