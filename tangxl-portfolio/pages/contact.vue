<template>
  <div class="container mx-auto px-4 md:px-8 py-12">
    <div class="max-w-xl mx-auto">
      <div class="text-center mb-12">
        <h1 class="font-serif text-4xl md:text-5xl text-primary mb-4">联系方式</h1>
        <p class="text-gray-500">版权咨询 · 收藏意向 · 合作邀请</p>
      </div>

      <form @submit.prevent="handleSubmit" class="space-y-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">姓名</label>
          <input 
            v-model="form.name"
            type="text" 
            required
            class="w-full px-4 py-3 border border-gray-300 focus:border-seal-red focus:ring-1 focus:ring-seal-red outline-none transition-colors"
            placeholder="请输入您的姓名"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">邮箱</label>
          <input 
            v-model="form.email"
            type="email" 
            required
            class="w-full px-4 py-3 border border-gray-300 focus:border-seal-red focus:ring-1 focus:ring-seal-red outline-none transition-colors"
            placeholder="your@email.com"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">意向类型</label>
          <select 
            v-model="form.type"
            class="w-full px-4 py-3 border border-gray-300 focus:border-seal-red focus:ring-1 focus:ring-seal-red outline-none transition-colors"
          >
            <option value="copyright">版权咨询</option>
            <option value="collection">收藏意向</option>
            <option value="cooperation">合作邀请</option>
            <option value="other">其他</option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">留言</label>
          <textarea 
            v-model="form.message"
            rows="5"
            required
            class="w-full px-4 py-3 border border-gray-300 focus:border-seal-red focus:ring-1 focus:ring-seal-red outline-none transition-colors resize-none"
            placeholder="请详细描述您的需求..."
          ></textarea>
        </div>

        <button 
          type="submit"
          :disabled="isSubmitting"
          class="w-full py-3 bg-seal-red text-white font-medium hover:bg-seal-red-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {{ isSubmitting ? '提交中...' : '提交' }}
        </button>

        <Transition name="fade">
          <div v-if="showSuccess" class="p-4 bg-green-50 text-green-700 text-center">
            提交成功！我们会尽快与您联系。
          </div>
        </Transition>
      </form>

      <div class="mt-12 pt-12 border-t border-gray-200">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 text-center">
          <div>
            <h4 class="font-medium mb-2">邮箱</h4>
            <a href="mailto:contact@example.com" class="text-seal-red hover:underline">
              contact@example.com
            </a>
          </div>
          <div>
            <h4 class="font-medium mb-2">电话</h4>
            <a href="tel:13800000000" class="text-seal-red hover:underline">
              138-0000-0000
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const form = reactive({
  name: '',
  email: '',
  type: 'copyright',
  message: ''
})

const isSubmitting = ref(false)
const showSuccess = ref(false)

const handleSubmit = async () => {
  isSubmitting.value = true
  
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  isSubmitting.value = false
  showSuccess.value = true
  
  form.name = ''
  form.email = ''
  form.type = 'copyright'
  form.message = ''
  
  setTimeout(() => {
    showSuccess.value = false
  }, 5000)
}

useHead({
  title: '联系 - 回影无声'
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
