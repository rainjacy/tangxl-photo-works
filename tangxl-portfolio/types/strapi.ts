export interface StrapiImage {
  id: number
  url: string
  alternativeText: string | null
}

export interface Category {
  id: number
  name: string
  value: string
  createdAt: string
  updatedAt: string
}

export interface Work {
  id: number
  title: string
  year: string
  location: string
  width: number | null
  height: number | null
  image: StrapiImage | null
  category: Category | null
  createdAt: string
  updatedAt: string
}

export interface Period {
  id: number
  period: string
  title: string
  description: string
  works: Work[]
  createdAt: string
  updatedAt: string
}

export interface Exhibition {
  id: number
  name: string
  description: string
  date: string | null
  location: string
  images: StrapiImage[]
  createdAt: string
  updatedAt: string
}

export interface StrapiResponse<T> {
  data: T[]
  meta?: {
    pagination?: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}