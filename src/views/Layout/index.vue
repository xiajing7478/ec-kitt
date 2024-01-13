<script setup>
import LayoutNav from '@/views/Layout/Components/LayoutNav.vue'
import LayoutHeader from '@/views/Layout/Components/LayoutHeader.vue'
import LayoutFooter from '@/views/Layout/Components/LayoutFooter.vue'
</script>
<template>
  <layout-nav />
  <layout-header />
  <router-view />
  <layout-footer />
</template>
