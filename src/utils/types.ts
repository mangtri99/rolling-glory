export interface ProductList {
  meta: Meta
  data: Data[]
  links: Links
}

export interface ProductDetail {
  data: Data
}

export interface Data {
  id: string
  type: string
  attributes: Attributes
}

export interface Attributes {
  id: number
  name: string
  info: string
  description: string
  points: number
  slug: string
  stock: number
  images: string[]
  isNew: number
  rating: number
  numOfReviews: number
  isWishlist: number
}

export interface Links {
  self: string
  next: string
  last: string
}

export interface Meta {
  totalItems: number
  currentPage: number
  itemPerPage: number
  totalPages: number
}
