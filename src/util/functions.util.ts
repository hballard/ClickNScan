export function getCurrentDateTime() {
  const d = new Date()
  const date = `${d.getMonth()}/${d.getDate()}/${d.getFullYear()}`
  const hours = d.getHours() > 10 ? d.getHours() : `0${d.getHours()}`
  const minutes = d.getMinutes() > 10 ? d.getMinutes() : `0${d.getMinutes()}`
  const seconds = d.getSeconds() > 10 ? d.getSeconds() : `0${d.getSeconds()}`
  const time = `${hours}:${minutes}:${seconds}`
  return `${date} ${time}`
}
