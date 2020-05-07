import moment from "moment";

/**
 * removeTimezoneField
 * @param datetime 
 * @description 
 *  we keep all timestamps as UTC in order to ensure set time no matter servers' and clients' location.
 */
const removeTimezoneField = (datetime) => moment.utc(datetime).format('YYYY-MM-DD HH:mm:ss')

export { removeTimezoneField }