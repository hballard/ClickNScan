export function getCurrentDateTime() {
  const d = new Date()
  const date = `${d.getMonth()}/${d.getDate()}/${d.getFullYear()}`
  const hours = d.getHours() > 10 ? d.getHours() : d.getHours() + 10
  const minutes = d.getMinutes() > 10 ? d.getMinutes() : d.getMinutes() + 10
  const seconds = d.getSeconds() > 10 ? d.getSeconds() : d.getSeconds() + 10
  const time = `${hours}:${minutes}:${seconds}`
  return `${date} ${time}`
}
