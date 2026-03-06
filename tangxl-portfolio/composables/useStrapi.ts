const getStrapiUrl = () => {
  const config = useRuntimeConfig()
  return config.public.strapiUrl
}

export const useStrapi = () => {
  const strapiUrl = getStrapiUrl()

  const fetchApi = async (endpoint: string): Promise<any[]> => {
    const response = await $fetch<any[]>(`${strapiUrl}/api${endpoint}`)
    return response || []
  }

  return {
    strapiUrl,
    fetchApi
  }
}

export const useCategories = () => {
  const { fetchApi } = useStrapi()

  const categories = useState<any[]>('categories', () => [])

  const fetchCategories = async () => {
    categories.value = await fetchApi('/categories')
    return categories.value
  }

  return {
    categories,
    fetchCategories
  }
}

export const useWorks = () => {
  const { fetchApi } = useStrapi()
  const strapiUrl = getStrapiUrl()

  const works = useState<any[]>('works', () => [])

  const getImageUrl = (imageData: any): string => {
    if (!imageData) return ''
    const url = imageData.url || imageData.attributes?.url
    if (!url) return ''
    if (url.startsWith('http')) return url
    return `${strapiUrl}${url}`
  }

  const fetchWorks = async () => {
    const data = await fetchApi('/works?populate=category,image')
    works.value = data
    return works.value
  }

  const getWorksByCategory = (categoryValue: string) => {
    return computed(() => {
      if (categoryValue === 'all') return works.value
      return works.value.filter(work => 
        work.category?.value === categoryValue
      )
    })
  }

  return {
    works,
    fetchWorks,
    getWorksByCategory,
    getImageUrl
  }
}

export const usePeriods = () => {
  const { fetchApi } = useStrapi()
  const strapiUrl = getStrapiUrl()

  const periods = useState<any[]>('periods', () => [])

  const getImageUrl = (imageData: any): string => {
    if (!imageData) return ''
    const url = imageData.url || imageData.attributes?.url
    if (!url) return ''
    if (url.startsWith('http')) return url
    return `${strapiUrl}${url}`
  }

  const fetchPeriods = async () => {
    const data = await fetchApi('/periods?populate=works.image')
    periods.value = data
    return periods.value
  }

  return {
    periods,
    fetchPeriods,
    getImageUrl
  }
}

export const useExhibitions = () => {
  const { fetchApi } = useStrapi()

  const exhibitions = useState<any[]>('exhibitions', () => [])

  const fetchExhibitions = async () => {
    const data = await fetchApi('/exhibitions?populate=images')
    exhibitions.value = data
    return exhibitions.value
  }

  return {
    exhibitions,
    fetchExhibitions
  }
}
