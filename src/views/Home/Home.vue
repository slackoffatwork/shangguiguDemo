<template>
<div class='home'>
  <TypeNav/>
  <List></List>
  <Today></Today>
  <Rank></Rank>
  <Like></Like>
  <Floor></Floor>
  <Floor></Floor>
  <Brand></Brand>
</div>
</template>

<script>
import List from './List/list.vue';
import Today from './Today/today.vue';
import Rank from './Rank/rank.vue';
import Like from './Like/like.vue';
import Floor from './Floor/floor.vue';
import Brand from './Brand/brand.vue';

export default {
  name: 'Home',
  components: { List, Today, Rank, Like, Floor, Brand },
  methods: {
    
  },
  mounted(){
    // 获取用户信息 存在问题其他页面无法获取  登录后还可以到登录页
    this.$store.dispatch('getUserInfo')
  }
}

</script>

<style>

</style>