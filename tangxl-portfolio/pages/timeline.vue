<template>
  <div class="container mx-auto px-4 md:px-8 py-12">
    <div class="text-center mb-16">
      <h1 class="font-serif text-4xl md:text-5xl text-primary mb-4">时间轴</h1>
      <p class="text-gray-500">穿越时光 · 见证变迁</p>
    </div>

    <div v-if="pending" class="text-center py-20">
      <p class="text-gray-400">加载中...</p>
    </div>

    <div v-else-if="error" class="text-center py-20">
      <p class="text-gray-400">加载失败</p>
    </div>

    <div v-else class="relative">
      <div class="absolute left-1/2 -translate-x-1/2 h-full w-px bg-gray-200 hidden md:block"></div>

      <div 
        v-for="(era, index) in timelineData" 
        :key="era.period"
        class="relative mb-16 last:mb-0"
      >
        <div :class="['flex flex-col md:flex-row', index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse']">
          <div class="md:w-1/2 px-4" :class="index % 2 === 0 ? 'md:text-right' : 'md:text-left'">
            <div class="bg-white p-6 shadow-sm">
              <span class="inline-block px-3 py-1 bg-seal-red text-white text-sm mb-3">
                {{ era.period }}
              </span>
              <h3 class="text-lg font-medium text-primary mb-2">{{ era.title }}</h3>
              <p class="text-gray-500 text-sm">{{ era.description }}</p>
            </div>
          </div>
          
          <div class="hidden md:flex items-center justify-center w-8 h-8 bg-seal-red rounded-full absolute left-1/2 -translate-x-1/2 z-10">
            <span class="w-2 h-2 bg-white rounded-full"></span>
          </div>
          
          <div class="md:w-1/2 px-4 mt-4 md:mt-0">
            <div class="grid grid-cols-2 gap-2">
              <div 
                v-for="photo in era.photos" 
                :key="photo.id"
                class="aspect-square bg-gray-100 cursor-pointer overflow-hidden group"
                @click="openLightbox(photo)"
              >
                <img 
                  :src="getPhotoSrc(photo)" 
                  :alt="photo.title"
                  class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <PhotoLightbox 
      v-if="selectedPhoto" 
      :photo="selectedPhoto" 
      :photos="timelineData?.flatMap((era: TimelineEra) => era.photos) || []"
      @close="selectedPhoto = null"
      @navigate="navigatePhoto"
    />
  </div>
</template>

<script setup lang="ts">
interface TimelineEra {
  period: string
  title: string
  description: string
  photos: any[]
}

const getPhotoSrc = (photo: any): string => {
  const strapiUrl = useRuntimeConfig().public.strapiUrl || 'http://localhost:1337'
  // Strapi v4 嵌套格式: image.data.attributes.url
  if (photo.image?.data?.attributes?.url) {
    const url = photo.image.data.attributes.url
    return url.startsWith('http') ? url : `${strapiUrl}${url}`
  }
  // Strapi v4 直接属性格式: image.attributes.url
  if (photo.image?.attributes?.url) {
    const url = photo.image.attributes.url
    return url.startsWith('http') ? url : `${strapiUrl}${url}`
  }
  // 旧格式
  if (photo.image?.url) {
    const url = photo.image.url
    return url.startsWith('http') ? url : `${strapiUrl}${url}`
  }
  return `https://picsum.photos/seed/t${photo.id}/400/400`
}

const selectedPhoto = ref<any>(null)

const openLightbox = (photo: any) => {
  selectedPhoto.value = photo
}

const navigatePhoto = (direction: 'prev' | 'next') => {
  if (!selectedPhoto.value) return
  // 找到当前照片在 timelineData 中的所有照片
  const allPhotos = timelineData.value?.flatMap((era: TimelineEra) => era.photos) || []
  const currentIndex = allPhotos.findIndex((p: any) => p.id === selectedPhoto.value?.id)
  let newIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1
  
  if (newIndex < 0) newIndex = allPhotos.length - 1
  if (newIndex >= allPhotos.length) newIndex = 0
  
  selectedPhoto.value = allPhotos[newIndex]
}

const { periods, fetchPeriods } = usePeriods()

const { data: timelineData, pending, error } = await useAsyncData('periods', async () => {
  await fetchPeriods()
  
  const result: TimelineEra[] = periods.value.map((period: any) => ({
    period: period.period,
    title: period.title,
    description: period.description || '',
    photos: period.works?.data || period.works || []
  }))
  
  return result
})

useHead({
  title: '时间轴 - 回影无声'
})
</script>
