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
  const strapiUrl = useRuntimeConfig().public.strapiUrl
  if (photo.image?.url) {
    const url = photo.image.url
    return url.startsWith('http') ? url : `${strapiUrl}${url}`
  }
  if (photo.image?.attributes?.url) {
    const url = photo.image.attributes.url
    return url.startsWith('http') ? url : `${strapiUrl}${url}`
  }
  return `https://picsum.photos/seed/t${photo.id}/400/400`
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
