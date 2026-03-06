<template>
  <div class="container mx-auto px-4 md:px-8 py-12">
    <div class="text-center mb-12">
      <h1 class="font-serif text-4xl md:text-5xl text-primary mb-4">松江记忆</h1>
      <p class="text-gray-500">地图上的时光印记</p>
    </div>

    <div v-if="pending" class="text-center py-20">
      <p class="text-gray-400">加载中...</p>
    </div>

    <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div class="lg:col-span-2">
        <div class="relative bg-gray-100 aspect-[4/3] overflow-hidden">
          <svg class="w-full h-full" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid meet">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#e5e5e5" stroke-width="0.5"/>
              </pattern>
            </defs>
            <rect width="800" height="600" fill="#f5f5f5"/>
            <rect width="800" height="600" fill="url(#grid)"/>
            
            <path d="M 100 500 Q 200 450 300 480 T 500 400 T 700 350" 
                  fill="none" stroke="#8b0000" stroke-width="2" opacity="0.3"/>
            
            <circle v-for="location in locationsWithCount" :key="location.id"
              :cx="location.x" 
              :cy="location.y" 
              r="20"
              :fill="selectedLocation?.id === location.id ? '#8b0000' : '#2d2d2d'"
              class="cursor-pointer transition-all duration-300 hover:r-30"
              @click="selectLocation(location)"
            />
            
            <text v-for="location in locationsWithCount" :key="'label-' + location.id"
              :x="location.x" 
              :y="location.y + 35" 
              text-anchor="middle"
              class="text-xs fill-gray-600"
            >
              {{ location.name }} ({{ location.photoCount }})
            </text>
          </svg>
        </div>
      </div>

      <div class="space-y-4">
        <h3 class="font-medium text-lg">选择地点</h3>
        <div class="space-y-2">
          <button 
            v-for="location in locationsWithCount" 
            :key="location.id"
            @click="selectLocation(location)"
            :class="[
              'w-full text-left px-4 py-3 transition-all duration-300',
              selectedLocation?.id === location.id
                ? 'bg-seal-red text-white'
                : 'bg-gray-50 hover:bg-gray-100'
            ]"
          >
            <span class="font-medium">{{ location.name }}</span>
            <span class="block text-xs" :class="selectedLocation?.id === location.id ? 'text-white/70' : 'text-gray-500'">
              {{ location.photoCount }} 张照片
            </span>
          </button>
        </div>

        <Transition name="fade">
          <div v-if="selectedLocation" class="mt-6 p-4 bg-gray-50">
            <h4 class="font-medium mb-2">{{ selectedLocation.name }}</h4>
            <p class="text-sm text-gray-500">{{ selectedLocation.description }}</p>
            <div class="grid grid-cols-2 gap-2 mt-4">
              <div 
                v-for="(photo, index) in getLocationPhotos(selectedLocation.id)" 
                :key="photo.id" 
                class="aspect-square bg-gray-200 cursor-pointer overflow-hidden"
                @click="openLightbox(photo)"
              >
                <img 
                  :src="getPhotoSrc(photo)" 
                  :alt="photo.title"
                  class="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </div>

    <PhotoLightbox 
      v-if="selectedPhoto" 
      :photo="selectedPhoto" 
      :photos="allPhotos"
      @close="selectedPhoto = null"
      @navigate="navigatePhoto"
    />
  </div>
</template>

<script setup lang="ts">
interface Location {
  id: string
  name: string
  x: number
  y: number
  photoCount: number
  description: string
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
  return ''
}

const selectedLocation = ref<Location | null>(null)
const selectedPhoto = ref<any>(null)

// 从 Strapi 获取作品数据
const { works, fetchWorks } = useWorks()

const { data: allWorks, pending } = await useAsyncData('works-map', async () => {
  return await fetchWorks()
})

// 根据作品统计数量各地点的照片数量
const locationStats = computed(() => {
  const stats: Record<string, number> = {}
  if (!allWorks.value || !Array.isArray(allWorks.value)) return stats
  
  allWorks.value.forEach((work: any) => {
    // 将中文 location 名称映射到 ID
    const locationName = work.location || '其他'
    const locationId = locationNameToId[locationName] || 'other'
    stats[locationId] = (stats[locationId] || 0) + 1
  })
  return stats
})

// 中文名称到 ID 的映射
const locationNameToId: Record<string, string> = {
  '醉白池': 'zuibai',
  '中山路': 'zhongshan',
  '仓城': 'cangcheng',
  '大仓桥': 'danggang',
  '松江新城': 'songjiang',
  '黄浦江渡口': 'dukou',
  '松江工业区': 'songjiang-industry',
  '松江大学城': 'songjiang-university',
  '老城区': 'old-town'
}

const locations: Location[] = [
  { id: 'zuibai', name: '醉白池', x: 350, y: 280, photoCount: 0, description: '松江著名的古典园林' },
  { id: 'zhongshan', name: '中山路', x: 380, y: 320, photoCount: 0, description: '老城区的主要商业街' },
  { id: 'cangcheng', name: '仓城', x: 280, y: 260, photoCount: 0, description: '历史文化保护区' },
  { id: 'danggang', name: '大仓桥', x: 300, y: 240, photoCount: 0, description: '明代古桥' },
  { id: 'songjiang', name: '松江新城', x: 500, y: 200, photoCount: 0, description: '现代化新城区' },
  { id: 'dukou', name: '黄浦江渡口', x: 200, y: 400, photoCount: 0, description: '曾经的过江通道' },
  { id: 'songjiang-industry', name: '松江工业区', x: 450, y: 300, photoCount: 0, description: '松江工业园区' },
  { id: 'songjiang-university', name: '松江大学城', x: 550, y: 280, photoCount: 0, description: '大学城区域' },
  { id: 'old-town', name: '老城区', x: 360, y: 340, photoCount: 0, description: '老城区域' },
  { id: 'other', name: '其他', x: 600, y: 350, photoCount: 0, description: '其他地点' }
]

// 使用 computed 自动更新照片数量
const locationsWithCount = computed(() => {
  return locations.map(loc => ({
    ...loc,
    photoCount: locationStats.value[loc.id] || 0
  }))
})

const getLocationPhotos = (locationId: string) => {
  if (!allWorks.value) return []
  return (allWorks.value as any[])
    .filter(work => {
      const locationName = work.location || '其他'
      const mappedId = locationNameToId[locationName] || 'other'
      return mappedId === locationId
    })
    .slice(0, 4) // 最多显示4张
}

const allPhotos = computed(() => {
  return allWorks.value || []
})

const selectLocation = (location: Location) => {
  selectedLocation.value = location
}

const openLightbox = (photo: any) => {
  selectedPhoto.value = photo
}

const navigatePhoto = (direction: 'prev' | 'next') => {
  if (!selectedPhoto.value) return
  const currentIndex = allPhotos.value.findIndex((p: any) => p.id === selectedPhoto.value?.id)
  let newIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1
  
  if (newIndex < 0) newIndex = allPhotos.value.length - 1
  if (newIndex >= allPhotos.value.length) newIndex = 0
  
  selectedPhoto.value = allPhotos.value[newIndex]
}

useHead({
  title: '地图 - 回影无声'
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
