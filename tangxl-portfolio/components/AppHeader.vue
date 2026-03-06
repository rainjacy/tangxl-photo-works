<template>
  <header class="fixed top-0 left-0 right-0 z-50 bg-rice-paper/95 backdrop-blur-sm border-b border-gray-200/50">
    <div class="container mx-auto px-4 md:px-8">
      <div class="flex items-center justify-between h-16 md:h-20">
        <NuxtLink to="/" class="flex items-center gap-2 group">
          <div class="w-8 h-8 border-2 border-seal-red flex items-center justify-center">
            <span class="text-seal-red font-serif text-sm">回</span>
          </div>
          <span class="font-serif text-lg md:text-xl text-primary group-hover:text-seal-red transition-colors">
            回影无声
          </span>
        </NuxtLink>

        <nav class="hidden md:flex items-center gap-8">
          <NuxtLink 
            v-for="item in navItems" 
            :key="item.path"
            :to="item.path"
            class="text-sm font-medium text-gray-600 hover:text-seal-red transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-seal-red after:transition-all hover:after:w-full"
          >
            {{ item.label }}
          </NuxtLink>
        </nav>

        <div class="flex items-center gap-4">
          <button 
            @click="toggleLanguage"
            class="text-sm font-medium text-gray-600 hover:text-seal-red transition-colors"
          >
            {{ currentLocale === 'zh' ? 'EN' : '中文' }}
          </button>

          <button 
            @click="isMobileMenuOpen = !isMobileMenuOpen"
            class="md:hidden p-2 text-gray-600 hover:text-seal-red transition-colors"
          >
            <svg v-if="!isMobileMenuOpen" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <Transition name="mobile-menu">
      <div v-if="isMobileMenuOpen" class="md:hidden bg-rice-paper border-t border-gray-200">
        <nav class="container mx-auto px-4 py-4 flex flex-col gap-4">
          <NuxtLink 
            v-for="item in navItems" 
            :key="item.path"
            :to="item.path"
            class="text-base font-medium text-gray-600 hover:text-seal-red transition-colors py-2"
            @click="isMobileMenuOpen = false"
          >
            {{ item.label }}
          </NuxtLink>
        </nav>
      </div>
    </Transition>
  </header>
  <div class="h-16 md:h-20"></div>
</template>

<script setup lang="ts">
const isMobileMenuOpen = ref(false)
const { locale, setLocale } = useI18n()

const currentLocale = computed(() => locale.value)

const navItems = [
  { path: '/', label: '首页' },
  { path: '/gallery', label: '作品' },
  { path: '/timeline', label: '时间轴' },
  { path: '/map', label: '地图' },
  { path: '/about', label: '关于' },
  { path: '/contact', label: '联系' }
]

const toggleLanguage = async () => {
  const newLocale = locale.value === 'zh' ? 'en' : 'zh'
  await setLocale(newLocale)
}

watch(() => isMobileMenuOpen, (val) => {
  if (val) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})
</script>

<style scoped>
.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: all 0.3s ease;
}

.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
