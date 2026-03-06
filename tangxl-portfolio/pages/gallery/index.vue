<template>
  <div class="container mx-auto px-4 md:px-8 py-12">
    <div class="text-center mb-12">
      <h1 class="font-serif text-4xl md:text-5xl text-primary mb-4">作品浏览</h1>
      <p class="text-gray-500">记录 · 见证 · 传承</p>
    </div>

    <div class="flex flex-wrap gap-4 justify-center mb-12">
      <button 
        v-for="category in categories" 
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

    <div class="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
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
              backgroundImage: `url(${photo.src})`,
              paddingBottom: `${(photo.height / photo.width) * 100}%`
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

    <div v-if="filteredPhotos.length === 0" class="text-center py-20">
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
  category: string
}

const activeCategory = ref('all')
const selectedPhoto = ref<Photo | null>(null)

const categories = [
  { value: 'all', label: '全部' },
  { value: '1970s', label: '70年代' },
  { value: '1990s', label: '90年代' },
  { value: 'newCentury', label: '新世纪' }
]

const photos: Photo[] = [
  { id: 1, title: '古城余韵', year: '1978', location: '醉白池', src: 'https://picsum.photos/seed/photo1/800/1000', width: 800, height: 1000, category: '1970s' },
  { id: 2, title: '老街清晨', year: '1985', location: '中山路', src: 'https://picsum.photos/seed/photo2/800/600', width: 800, height: 600, category: '1970s' },
  { id: 3, title: '工业变迁', year: '1992', location: '松江工业区', src: 'https://picsum.photos/seed/photo3/800/800', width: 800, height: 800, category: '1990s' },
  { id: 4, title: '老宅门楼', year: '1988', location: '仓城', src: 'https://picsum.photos/seed/photo4/800/1200', width: 800, height: 1200, category: '1970s' },
  { id: 5, title: '新城崛起', year: '2005', location: '松江新城', src: 'https://picsum.photos/seed/photo5/800/600', width: 800, height: 600, category: 'newCentury' },
  { id: 6, title: '渡口记忆', year: '1995', location: '黄浦江渡口', src: 'https://picsum.photos/seed/photo6/800/900', width: 800, height: 900, category: '1990s' },
  { id: 7, title: '老城改造', year: '2010', location: '老城区', src: 'https://picsum.photos/seed/photo7/800/700', width: 800, height: 700, category: 'newCentury' },
  { id: 8, title: '古桥流水', year: '1982', location: '大仓桥', src: 'https://picsum.photos/seed/photo8/800/1100', width: 800, height: 1100, category: '1970s' },
  { id: 9, title: '现代社区', year: '2018', location: '松江', src: 'https://picsum.photos/seed/photo9/800/650', width: 800, height: 650, category: 'newCentury' }
]

const filteredPhotos = computed(() => {
  if (activeCategory.value === 'all') return photos
  return photos.filter(p => p.category === activeCategory.value)
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
