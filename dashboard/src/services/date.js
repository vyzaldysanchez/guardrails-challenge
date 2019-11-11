export function toDateString(dateString) {
  if (dateString) {
    const date  = new Date(dateString)
    return `${date.toDateString()} at ${date.toLocaleTimeString()}`;
  }

  return null;
}
