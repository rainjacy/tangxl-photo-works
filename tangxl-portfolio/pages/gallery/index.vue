<template>
  <div class="container mx-auto px-4 md:px-8 py-12">
    <div class="text-center mb-12">
      <h1 class="font-serif text-4xl md:text-5xl text-primary mb-4">作品浏览</h1>
      <p class="text-gray-500">记录 · 见证 · 传承</p>
    </div>

    <div class="flex flex-wrap gap-4 justify-center mb-12">
      <button 
        v-for="category in categoryOptions" 
        :key="category.value"
        @click="activeCategory = category.value"
        :class="[
          'px-4 py-2 text-sm transition-all duration-300',
          activeCategory === category.value 
            ? 'bg-seal-red text-white' 
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
        ]"
      >
        {{ category.label }}
      </button>
    </div>

    <div v-if="pending" class="text-center py-20">
      <p class="text-gray-400">加载中...</p>
    </div>

    <div v-else-if="error" class="text-center py-20">
      <p class="text-gray-400">加载失败</p>
    </div>

    <div v-else class="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
      <div 
        v-for="photo in filteredPhotos" 
        :key="photo.id"
        class="break-inside-avoid cursor-pointer group relative overflow-hidden"
        @click="openLightbox(photo)"
      >
        <div class="relative overflow-hidden bg-gray-100">
          <div 
            class="w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
            :style="{ 
              backgroundImage: `url(${getPhotoSrc(photo)})`,
              paddingBottom: `${((photo.height || photo.width || 800) / (photo.width || 800)) * 100}%`
            }"
          ></div>
          <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
        </div>
        <div class="mt-2">
          <h3 class="text-sm font-medium text-primary">{{ photo.title }}</h3>
          <p class="text-xs text-gray-500">{{ photo.year }} · {{ photo.location }}</p>
        </div>
      </div>
    </div>

    <div v-if="!pending && !error && filteredPhotos.length === 0" class="text-center py-20">
      <p class="text-gray-400">暂无作品</p>
    </div>

    <PhotoLightbox 
      v-if="selectedPhoto" 
      :photo="selectedPhoto" 
      :photos="filteredPhotos"
      @close="selectedPhoto = null"
      @navigate="navigatePhoto"
    />
  </div>
</template>

<script setup lang="ts">
interface Photo {
  id: number
  title: string
  year: string
  location: string
  src: string
  width: number
  height: number
  category: any
  image: any
}

const activeCategory = ref('all')
const selectedPhoto = ref<Photo | null>(null)

const getPhotoSrc = (photo: any): string => {
  const strapiUrl = useRuntimeConfig().public.strapiUrl
  if (photo.image?.url) {
    const url = photo.image.url
    return url.startsWith('http') ? url : `${strapiUrl}${url}`
  }
  if (photo.image?.attributes?.url) {
    const url = photo.image.attributes.url
    return url.startsWith('http') ? url : `${strapiUrl}${url}`
  }
  return `https://picsum.photos/seed/photo${photo.id}/800/1000`
}

const categoryOptions = [
  { value: 'all', label: '全部' },
  { value: '1970s', label: '70年代' },
  { value: '1990s', label: '90年代' },
  { value: 'newCentury', label: '新世纪' }
]

const { works, fetchWorks } = useWorks()

const { data: photos, pending, error } = await useAsyncData('works', async () => {
  return await fetchWorks()
})

const filteredPhotos = computed(() => {
  if (!photos.value) return []
  if (activeCategory.value === 'all') return photos.value as any[]
  return (photos.value as any[]).filter(p => p.category?.value === activeCategory.value)
})

const openLightbox = (photo: Photo) => {
  selectedPhoto.value = photo
}

const navigatePhoto = (direction: 'prev' | 'next') => {
  if (!selectedPhoto.value) return
  const currentIndex = filteredPhotos.value.findIndex(p => p.id === selectedPhoto.value?.id)
  let newIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1
  
  if (newIndex < 0) newIndex = filteredPhotos.value.length - 1
  if (newIndex >= filteredPhotos.value.length) newIndex = 0
  
  selectedPhoto.value = filteredPhotos.value[newIndex]
}

useHead({
  title: '作品浏览 - 回影无声'
})
</script>
