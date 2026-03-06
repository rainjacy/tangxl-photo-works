<template>
  <footer class="bg-primary text-rice-paper py-12 mt-20">
    <div class="container mx-auto px-4 md:px-8">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
        <div>
          <div class="flex items-center gap-2 mb-4">
            <div class="w-8 h-8 border-2 border-seal-red flex items-center justify-center">
              <span class="text-seal-red font-serif text-sm">回</span>
            </div>
            <span class="font-serif text-lg text-rice-paper">回影无声</span>
          </div>
          <p class="text-gray-400 text-sm leading-relaxed">
            唐西林摄影作品集，记录松江从农业文明向工业文明转型的历史进程。
          </p>
        </div>

        <div>
          <h4 class="font-medium mb-4">快速链接</h4>
          <nav class="flex flex-col gap-2">
            <NuxtLink to="/gallery" class="text-gray-400 hover:text-seal-red transition-colors text-sm">
              作品浏览
            </NuxtLink>
            <NuxtLink to="/timeline" class="text-gray-400 hover:text-seal-red transition-colors text-sm">
              时间轴
            </NuxtLink>
            <NuxtLink to="/map" class="text-gray-400 hover:text-seal-red transition-colors text-sm">
              松江地图
            </NuxtLink>
            <NuxtLink to="/about" class="text-gray-400 hover:text-seal-red transition-colors text-sm">
              关于艺术家
            </NuxtLink>
          </nav>
        </div>

        <div>
          <h4 class="font-medium mb-4">联系方式</h4>
          <div class="flex flex-col gap-2 text-gray-400 text-sm">
            <p>版权咨询与合作</p>
            <a href="mailto:contact@example.com" class="hover:text-seal-red transition-colors">
              contact@example.com
            </a>
          </div>
        </div>
      </div>

      <div class="border-t border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <p class="text-gray-500 text-xs">
          © {{ currentYear }} 回影无声. All rights reserved.
        </p>
        <div class="flex items-center gap-4">
          <span class="text-gray-500 text-xs">沪ICP备xxxxxxxx号</span>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const currentYear = new Date().getFullYear()
</script>
