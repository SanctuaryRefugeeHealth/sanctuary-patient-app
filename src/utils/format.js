import moment from "moment";

export function formatDatetime(datetime) {
  return moment(moment(datetime).format("YYYY-MM-DD HH:mm:ss")).format(
    "llll"
  );
}

export function formatDate(date) {
  return moment(date).format("YYYY-MM-DD");
}

export function formatTime(time) {
  return moment(time).format("HH:mm");
}

export function formatPhoneNumber(pn) {
  return `+1 (${pn.substring(0, 3)}) ${pn.substring(3, 6)}-${pn.substring(6)}`;
}
