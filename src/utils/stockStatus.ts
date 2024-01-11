export function stockStatus(stock: number) {
  if (stock > 5) {
    return 'In Stock'
  } else if (stock < 5 && stock > 0) {
    return 'Stock < 5'
  } else {
    return 'Sold Out'
  }
}
