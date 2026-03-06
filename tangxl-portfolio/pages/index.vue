<template>
  <div class="relative min-h-[calc(100vh-5rem)] overflow-hidden">
    <canvas ref="canvasRef" class="absolute inset-0 w-full h-full"></canvas>
    
    <div class="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-5rem)] px-4">
      <div class="text-center">
        <h1 class="font-serif text-5xl md:text-7xl lg:text-8xl text-primary mb-4 tracking-wider">
          回影无声
        </h1>
        <p class="text-lg md:text-xl text-gray-500 mb-2 font-light">
          Echoes of Silence
        </p>
        <p class="text-sm md:text-base text-gray-400 max-w-md mx-auto mb-12">
          唐西林摄影作品集 · 记录松江的历史变迁
        </p>
        
        <NuxtLink 
          to="/gallery"
          class="inline-block px-8 py-3 border-2 border-seal-red text-seal-red hover:bg-seal-red hover:text-white transition-all duration-300 font-medium"
        >
          进入作品集
        </NuxtLink>
      </div>
    </div>

    <div class="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
      <svg class="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
      </svg>
    </div>
  </div>
</template>

<script setup lang="ts">
const canvasRef = ref<HTMLCanvasElement | null>(null)
const isMounted = ref(false)

onMounted(() => {
  isMounted.value = true
  initCanvas()
})

const initCanvas = () => {
  const canvas = canvasRef.value
  if (!canvas) return

  const ctx = canvas.getContext('2d')
  if (!ctx) return

  const resizeCanvas = () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  }
  
  resizeCanvas()
  window.addEventListener('resize', resizeCanvas)

  class Particle {
    x: number
    y: number
    size: number
    speedX: number
    speedY: number
    opacity: number

    constructor() {
      this.x = Math.random() * canvas.width
      this.y = Math.random() * canvas.height
      this.size = Math.random() * 100 + 20
      this.speedX = (Math.random() - 0.5) * 0.5
      this.speedY = (Math.random() - 0.5) * 0.5
      this.opacity = Math.random() * 0.1 + 0.02
    }

    update() {
      this.x += this.speedX
      this.y += this.speedY

      if (this.x < 0 || this.x > canvas.width) this.speedX *= -1
      if (this.y < 0 || this.y > canvas.height) this.speedY *= -1
    }

    draw() {
      if (!ctx) return
      ctx.fillStyle = `rgba(45, 45, 45, ${this.opacity})`
      ctx.beginPath()
      ctx.ellipse(this.x, this.y, this.size, this.size * 0.6, 0, 0, Math.PI * 2)
      ctx.fill()
    }
  }

  const particles: Particle[] = []
  const particleCount = window.innerWidth < 768 ? 15 : 30

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle())
  }

  const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    
    particles.forEach(particle => {
      particle.update()
      particle.draw()
    })

    requestAnimationFrame(animate)
  }

  animate()
}

onUnmounted(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('resize', () => {})
  }
})
</script>
