<template>
  <div class="container mx-auto px-4 md:px-8 py-12">
    <div class="text-center mb-16">
      <h1 class="font-serif text-4xl md:text-5xl text-primary mb-4">时间轴</h1>
      <p class="text-gray-500">穿越时光 · 见证变迁</p>
    </div>

    <div class="relative">
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
                  :src="photo.src" 
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
const timelineData = [
  {
    period: '1970s',
    title: '农业文明的尾声',
    description: '记录松江最后的农业风光，古城区的传统生活场景',
    photos: [
      { id: 1, title: '古城余韵', src: 'https://picsum.photos/seed/t1/400/400' },
      { id: 2, title: '老街清晨', src: 'https://picsum.photos/seed/t2/400/400' },
      { id: 3, title: '古桥流水', src: 'https://picsum.photos/seed/t3/400/400' },
      { id: 4, title: '渡口记忆', src: 'https://picsum.photos/seed/t4/400/400' }
    ]
  },
  {
    period: '1990s',
    title: '工业化的浪潮',
    description: '城市扩张，工业区崛起，传统与现代的碰撞',
    photos: [
      { id: 5, title: '工业变迁', src: 'https://picsum.photos/seed/t5/400/400' },
      { id: 6, title: '老城改造', src: 'https://picsum.photos/seed/t6/400/400' },
      { id: 7, title: '新城崛起', src: 'https://picsum.photos/seed/t7/400/400' },
      { id: 8, title: '建设中的松江', src: 'https://picsum.photos/seed/t8/400/400' }
    ]
  },
  {
    period: '2000s',
    title: '新世纪的模样',
    description: '现代化的新城，社区的发展与变迁',
    photos: [
      { id: 9, title: '现代社区', src: 'https://picsum.photos/seed/t9/400/400' },
      { id: 10, title: '城市新貌', src: 'https://picsum.photos/seed/t10/400/400' },
      { id: 11, title: '公园绿地', src: 'https://picsum.photos/seed/t11/400/400' },
      { id: 12, title: '夜幕松江', src: 'https://picsum.photos/seed/t12/400/400' }
    ]
  }
]

useHead({
  title: '时间轴 - 回影无声'
})
</script>
