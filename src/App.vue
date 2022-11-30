<template>
  <NavBar></NavBar>
  <Page></Page>
</template>

<script lang="ts" setup>
import NavBar from './components/TopNavBar/index.vue'
import Page from './components/Page/IndexView.vue'
import { onMounted } from 'vue';
import useNewDate from './hooks/useNewDate'

useNewDate()
</script>

<style>
#app {
  position: absolute;
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB',
  'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
  margin: 0;
  padding: 0;
  left: 0;
  top: 0;
}
</style>
