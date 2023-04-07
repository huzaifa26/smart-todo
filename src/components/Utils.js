export function formatDate() {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = ('0' + (currentDate.getMonth() + 1)).slice(-2);
  const day = ('0' + currentDate.getDate()).slice(-2);
  const hours = ('0' + currentDate.getHours()).slice(-2);
  const minutes = ('0' + currentDate.getMinutes()).slice(-2);
  const seconds = ('0' + currentDate.getSeconds()).slice(-2);
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

export function transformDate(date) {
  date = date.split("T")
  date = date.join(" ")
  date = date.replace("Z", "");
  return date
}

export function timeConvert(n) {
  console.log(n);
  var num = n;
  var hours = (num / 60);
  var rhours = Math.floor(hours);
  var minutes = (hours - rhours) * 60;
  var rminutes = Math.round(minutes);
  return rhours + " hours and " + rminutes + " minutes";
}

export function transformLabelDate(originalDate) {
  const parts = originalDate.split("-");
  const rearrangedDate = parts[1] + "-" + parts[2] + "-" + parts[0];
  return rearrangedDate;
}

export function formatDateTime(originalDate) {
  if (!originalDate){
    return
  }
  const [date, time] = originalDate.split("T");
  const [year, month, day] = date.split("-");
  let [hours, minutes, seconds] = time.split(":");
  let amOrPm = hours < 12 ? "AM" : "PM";
  hours = hours % 12 || 12;

  let formattedDate = `${month}-${day}-${year} ${hours}:${minutes}:${seconds} ${amOrPm}`;
  formattedDate=formattedDate.replace("Z","")
  return formattedDate;
}
export function formatWeatherDate(originalDate) {
  if (!originalDate){
    return
  }
  let [date, time] = originalDate.split("T");
  time=time.split("-")[0];
  const [year, month, day] = date.split("-");

  let formattedDate = `${month}-${day}-${year}`;
  console.log(formattedDate)
  return formattedDate;
}
export function formatWeatherTime(originalDate) {
  if (!originalDate){
    return
  }
  let [date, time] = originalDate.split("T");
  time=time.split("-")[0];
  const [year, month, day] = date.split("-");
  let [hours, minutes, seconds] = time.split(":");
  let amOrPm = hours < 12 ? "AM" : "PM";
  hours = hours % 12 || 12;

  let formattedDate = `${hours}:${minutes} ${amOrPm}`;
  formattedDate=formattedDate.replace("Z","")
  return formattedDate;
}