<template>
  <div class="container mx-auto px-4 md:px-8 py-12">
    <div class="max-w-3xl mx-auto">
      <div class="text-center mb-16">
        <h1 class="font-serif text-4xl md:text-5xl text-primary mb-4">关于艺术家</h1>
        <p class="text-gray-500">镜头记录历史 · 光影书写记忆</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-start mb-16">
        <div class="aspect-[3/4] bg-gray-100">
          <img 
            src="https://picsum.photos/seed/artist/600/800" 
            alt="唐西林"
            class="w-full h-full object-cover grayscale"
          />
        </div>
        
        <div>
          <h2 class="font-serif text-2xl text-primary mb-6">唐西林</h2>
          <p class="text-gray-600 leading-relaxed mb-6">
            从事摄影四十余年，用镜头记录了松江从农业文明向工业文明转型的历史进程。
            他的作品不仅是对 past 的记录，更是对这片土地深沉情感的见证。
          </p>
          <p class="text-gray-600 leading-relaxed mb-6">
            1970年代起，唐西林开始系统性地拍摄松江的城市变迁。他的镜头下，
            有古城的青砖黛瓦，有老街的市井烟火，也有工业化浪潮中的推土机和脚手架。
          </p>
          <p class="text-gray-600 leading-relaxed">
            四十年的坚持，三千余张照片，构成了这部关于松江的视觉史诗。
          </p>
        </div>
      </div>

      <div class="mb-16">
        <h3 class="font-medium text-xl mb-6">展览经历</h3>
        <ul class="space-y-3">
          <li class="flex items-start gap-3">
            <span class="w-2 h-2 bg-seal-red rounded-full mt-2"></span>
            <span class="text-gray-600">2019 「回影无声」个人作品展，上海美术馆</span>
          </li>
          <li class="flex items-start gap-3">
            <span class="w-2 h-2 bg-seal-red rounded-full mt-2"></span>
            <span class="text-gray-600">2015 「松江记忆」群展，松江美术馆</span>
          </li>
          <li class="flex items-start gap-3">
            <span class="w-2 h-2 bg-seal-red rounded-full mt-2"></span>
            <span class="text-gray-600">2010 「城市影像」邀请展，北京</span>
          </li>
        </ul>
      </div>

      <div>
        <h3 class="font-medium text-xl mb-6">媒体报道</h3>
        <ul class="space-y-3">
          <li>
            <a href="#" class="text-seal-red hover:underline">
              澎湃新闻 - 「回影无声」：一位摄影师镜头下的松江四十年
            </a>
          </li>
          <li>
            <a href="#" class="text-seal-red hover:underline">
              解放日报 - 用镜头记录城市变迁
            </a>
          </li>
          <li>
            <a href="#" class="text-seal-red hover:underline">
              新民周刊 - 唐西林：最后的松江
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: '关于 - 回影无声'
})
</script>
