<template>
  <div id="app">
    <Header/>
    <router-view></router-view>
    <!-- 根据route中meta属性判断是否显示footer主键 -->
    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default {
  name: 'App',
  components: {
    Header, Footer
  }
  
}
</script>

<style>
@import url('../public/reset.css');
</style>
