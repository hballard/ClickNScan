export function getCurrentDateTime() {
  const d = new Date()
  const date = `${d.getMonth()+1}/${d.getDate()}/${d.getFullYear()}`
  const hours = d.getHours() > 9 ? d.getHours() : `0${d.getHours()}`
  const minutes = d.getMinutes() > 9 ? d.getMinutes() : `0${d.getMinutes()}`
  const seconds = d.getSeconds() > 9 ? d.getSeconds() : `0${d.getSeconds()}`
  const time = `${hours}:${minutes}:${seconds}`
  return `${date} ${time}`
}
