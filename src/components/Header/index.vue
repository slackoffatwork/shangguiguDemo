<template>
  <!-- 头部 -->
    <header class="header">
      <!-- 头部的第一行 -->
      <div class="top">
        <div class="container">
          <div class="loginList" >
            <p>尚品汇欢迎您！</p>
            <p v-if="!userName">
              <span>请</span>
              <router-link to="/login">登录</router-link>
              <router-link to="register" class="register" >免费注册</router-link>
            </p>
            <p v-else>
              <a >{{userName}}</a>
              <a class="register" @click="outlogin">退出登录</a>
            </p>
          </div>


          
          <div class="typeList">
            <!-- <a href="###">我的订单</a>  /center-->
            <router-link to="/center">我的订单</router-link>
            <!-- <a href="###">我的购物车</a> -->
            <router-link to="/shopCart">我的购物车</router-link>
            <!-- <a href="###">我的尚品汇</a> -->
            <router-link to="/home">我的尚品汇</router-link>
            <a href="###">尚品汇会员</a>
            <a href="###">企业采购</a>
            <a href="###">关注尚品汇</a>
            <a href="###">合作招商</a>
            <a href="###">商家后台</a>
          </div>
        </div>
      </div>
      <!--头部第二行 搜索区域-->
      <div class="bottom">
        <h1 class="logoArea">
          <router-link class="logo" to="/home">
            <img src="./images/logo.png" alt="">
          </router-link>
        </h1>
        <div class="searchArea">
          <form action="###" class="searchForm">
            <input type="text" id="autocomplete" class="input-error input-xxlarge" v-model="keydata"/>
            <button class="sui-btn btn-xlarge btn-danger" type="button" @click="goSearch">搜索</button>
          </form>
        </div>
      </div>
    </header>
</template>

<script>


export default {
  name: 'Header',
  data() {
    return {
      keydata: ''
    }
  },
  methods: {
    // 合并路由传递参数
    goSearch() {
      // 路由传参
      if(this.$route.query) {
        let location = {name:'search',params:{keydata:this.keydata}}
        location.query = this.$route.query;
        this.$router.push(location)
      }
    },
    // 退出登录
    outlogin(){
      try {
        this.$store.dispatch('outlogin')
        this.$router.push('/home')
      } catch (error) {
        alert(error.message)
      }

    }
  },
  mounted(){
    // 监听事件 清空关键字的值
    this.$bus.$on("clear",()=>{this.keydata = ''})
  },
  computed:{
    // 简化用户名的获取路径
    userName(){
      return this.$store.state.loginHregister.user.name
    }
  }
}

</script>

<style>
@import url('@/assets/css/home.css');
</style>