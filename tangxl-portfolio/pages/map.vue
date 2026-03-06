<template>
  <div class="container mx-auto px-4 md:px-8 py-12">
    <div class="text-center mb-12">
      <h1 class="font-serif text-4xl md:text-5xl text-primary mb-4">松江记忆</h1>
      <p class="text-gray-500">地图上的时光印记</p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
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
            
            <circle v-for="location in locations" :key="location.id"
              :cx="location.x" 
              :cy="location.y" 
              r="20"
              :fill="selectedLocation?.id === location.id ? '#8b0000' : '#2d2d2d'"
              class="cursor-pointer transition-all duration-300 hover:r-30"
              @click="selectLocation(location)"
            />
            
            <text v-for="location in locations" :key="'label-' + location.id"
              :x="location.x" 
              :y="location.y + 35" 
              text-anchor="middle"
              class="text-xs fill-gray-600"
            >
              {{ location.name }}
            </text>
          </svg>
        </div>
      </div>

      <div class="space-y-4">
        <h3 class="font-medium text-lg">选择地点</h3>
        <div class="space-y-2">
          <button 
            v-for="location in locations" 
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
                v-for="i in 4" 
                :key="i" 
                class="aspect-square bg-gray-200"
              >
                <img 
                  :src="`https://picsum.photos/seed/${selectedLocation.id}${i}/200/200`" 
                  class="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </div>
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

const selectedLocation = ref<Location | null>(null)

const locations: Location[] = [
  { id: 'zuibai', name: '醉白池', x: 350, y: 280, photoCount: 12, description: '松江著名的古典园林' },
  { id: 'zhongshan', name: '中山路', x: 380, y: 320, photoCount: 18, description: '老城区的主要商业街' },
  { id: 'cangcheng', name: '仓城', x: 280, y: 260, photoCount: 8, description: '历史文化保护区' },
  { id: 'dacang', name: '大仓桥', x: 300, y: 240, photoCount: 10, description: '明代古桥' },
  { id: 'songjiang', name: '松江新城', x: 500, y: 200, photoCount: 15, description: '现代化新城区' },
  { id: 'dukou', name: '黄浦江渡口', x: 200, y: 400, photoCount: 6, description: '曾经的过江通道' }
]

const selectLocation = (location: Location) => {
  selectedLocation.value = location
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
