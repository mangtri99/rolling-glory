export function numberFormat(value: number) {
  // format number to with dot separator
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}
