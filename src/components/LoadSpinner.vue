<template>
  <div class="position-relative" :style="{ minHeight: height }">
    <div 
      v-if="loading" 
      class="position-absolute top-50 start-50 translate-middle" 
      style="z-index: 10;"
    >
      <div 
        :class="`spinner-grow text-${color} spinner-grow-custom`" 
        role="status"
      >
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
    <slot v-if="!loading"></slot>
  </div>
</template>

<script setup>
defineProps({
  loading: {
    type: Boolean,
    default: false
  },
  color: {
    type: String,
    default: 'success'
  },
  height: {
    type: String,
    default: '200px'
  }
})
</script>

<style scoped>
.spinner-grow-custom {
  width: 3rem;
  height: 3rem;
}
</style>