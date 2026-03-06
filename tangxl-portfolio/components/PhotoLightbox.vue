<template>
  <Teleport to="body">
    <div 
      class="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
      @click.self="$emit('close')"
      @keydown.escape="$emit('close')"
      @keydown.left="$emit('navigate', 'prev')"
      @keydown.right="$emit('navigate', 'next')"
      tabindex="0"
      ref="lightboxRef"
    >
      <button 
        @click="$emit('close')"
        class="absolute top-4 right-4 text-white/70 hover:text-white transition-colors z-10"
      >
        <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <button 
        @click="$emit('navigate', 'prev')"
        class="absolute left-4 text-white/70 hover:text-white transition-colors"
      >
        <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button 
        @click="$emit('navigate', 'next')"
        class="absolute right-4 text-white/70 hover:text-white transition-colors"
      >
        <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      <div class="max-w-5xl max-h-[90vh] px-16">
        <img 
          :src="getPhotoSrc(photo)" 
          :alt="photo.title"
          class="max-w-full max-h-[80vh] object-contain"
        />
        <div class="text-center mt-4">
          <h3 class="text-white text-xl font-medium">{{ photo.title }}</h3>
          <p class="text-white/60 text-sm mt-1">{{ photo.year }} · {{ photo.location }}</p>
        </div>
      </div>

      <div class="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/50 text-xs">
        {{ currentIndex + 1 }} / {{ photos.length }}
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
interface Photo {
  id: number
  title: string
  year: string
  location: string
  src: string
  image?: {
    url: string
  } | null
}

const props = defineProps<{
  photo: Photo
  photos: Photo[]
}>()

defineEmits<{
  close: []
  navigate: [direction: 'prev' | 'next']
}>()

const lightboxRef = ref<HTMLElement | null>(null)

const currentIndex = computed(() => {
  return props.photos.findIndex(p => p.id === props.photo.id)
})

const getPhotoSrc = (photo: Photo) => {
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
  // 旧格式或直接 URL
  if (photo.image?.url) {
    const url = photo.image.url
    return url.startsWith('http') ? url : `${strapiUrl}${url}`
  }
  // 兜底
  return photo.src || `https://picsum.photos/seed/photo${photo.id}/800/1000`
}

onMounted(() => {
  lightboxRef.value?.focus()
  document.body.style.overflow = 'hidden'
})

onUnmounted(() => {
  document.body.style.overflow = ''
})
</script>
