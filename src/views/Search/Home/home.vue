<template>
  <!--list-content-->
  <div class="main">
    <div class="py-container">
      <!--bread-->
      <div class="bread">
        <ul class="fl sui-breadcrumb">
          <li>
            <a href="#">全部结果</a>
          </li>
        </ul>
        <ul class="fl sui-tag">
          <li class="with-x" v-if="searchData.categoryName">{{ searchData.categoryName }}
            <i @click="removeCategoryName">×</i>
          </li>
          <li class="with-x" v-if="searchData.keydata">{{ searchData.keydata }}
            <i @click="removeKeydata">×</i>
          </li>
          <li class="with-x" v-if="searchData.trademark">{{ searchData.trademark.split(':')[1] }}
            <i @click="removeTrademark">×</i>
          </li>
          <li class="with-x" v-for="(labelValue, index) in searchData.props" :key="index">{{ labelValue.split(':')[1] }}
            <i @click="removeProps(index)">×</i>
          </li>
        </ul>
      </div>
      <!--selector 商品详细属性-->
      <SelectorVue @trandClick="trandClick" @labelClick="labelClick"/>
      <!--商品展示-->
      <div class="details clearfix">
        <div class="sui-navbar">
          <!-- 排序 -->
          <div class="navbar-inner filter">
            <ul class="sui-nav">
              <li :class="{active:isOne}" @click="changeClick('1')">
                <!-- <a >综合<span v-show="isTwo" :class="{'↑':isAsc,'↓':isDesc}"></span></a> -->
                <a >综合<span v-show="isOne&&isAsc">↑</span><span v-show="isOne&&isDesc">↓</span></a>
              </li>
              <li :class="{active:isTwo}" @click="changeClick('2')">
                <!-- <a >价格<span v-show="isTwo" :class="{'↑':isAsc,'↓':isDesc}"></span></a> -->
                <a >价格<span v-show="isTwo&&isAsc">↑</span><span v-show="isTwo&&isDesc">↓</span></a>
              </li>
            </ul>
          </div>
        </div>
        <!-- 商品列表 -->
        <div class="goods-list">
          <ul class="yui3-g">
            <li class="yui3-u-1-5" v-for="(goods, index) in goodsList " :key="goods.id">
              <div class="list-wrap">
                <div class="p-img">
                  <a href="item.html" target="_blank">
                    <router-link :to="`/detail/${goods.id}`">
                      <img :src="goods.defaultImg" />
                    </router-link>
                  </a>
                </div>
                <div class="price">
                  <strong>
                    <em>¥</em>
                    <i>{{ " " + goods.price }}</i>
                  </strong>
                </div>
                <div class="attr">
                  <a target="_blank" href="item.html" :title="goods.title">
                    {{ goods.title }}
                  </a>
                </div>
                <div class="commit">
                  <i class="command">已有<span>2000</span>人评价</i>
                </div>
                <div class="operate">
                  <a href="success-cart.html" target="_blank" class="sui-btn btn-bordered btn-danger">加入购物车</a>
                  <a href="javascript:void(0);" class="sui-btn btn-bordered">收藏</a>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <!-- 分页器 -->
        <PageVue :pageNo="searchData.pageNo" :pageSize="searchData.pageSize" :total="99" :continues="5" @pageClick="pageClick"/>
      </div>
      <!--热卖商品-->
      <div class="clearfix hot-sale">
        <h4 class="title">热卖商品</h4>
        <div class="hot-list">
          <ul class="yui3-g">
            <li class="yui3-u-1-4">
              <div class="list-wrap">
                <div class="p-img">
                  <img src="@/assets/images/search/like_01.png" />
                </div>
                <div class="attr">
                  <em>Apple苹果iPhone 6s (A1699)</em>
                </div>
                <div class="price">
                  <strong>
                    <em>¥</em>
                    <i> 4088.00</i>
                  </strong>
                </div>
                <div class="commit">
                  <i class="command">已有700人评价</i>
                </div>
              </div>
            </li>
            <li class="yui3-u-1-4">
              <div class="list-wrap">
                <div class="p-img">
                  <img src="@/assets/images/search/like_03.png" />
                </div>
                <div class="attr">
                  <em>金属A面，360°翻转，APP下单省300！</em>
                </div>
                <div class="price">
                  <strong>
                    <em>¥</em>
                    <i> 4088.00</i>
                  </strong>
                </div>
                <div class="commit">
                  <i class="command">已有700人评价</i>
                </div>
              </div>
            </li>
            <li class="yui3-u-1-4">
              <div class="list-wrap">
                <div class="p-img">
                  <img src="@/assets/images/search/like_04.png" />
                </div>
                <div class="attr">
                  <em>256SSD商务大咖，完爆职场，APP下单立减200</em>
                </div>
                <div class="price">
                  <strong>
                    <em>¥</em>
                    <i> 4068.00</i>
                  </strong>
                </div>
                <div class="commit">
                  <i class="command">已有20人评价</i>
                </div>
              </div>
            </li>
            <li class="yui3-u-1-4">
              <div class="list-wrap">
                <div class="p-img">
                  <img src="@/assets/images/search/like_02.png" />
                </div>
                <div class="attr">
                  <em>Apple苹果iPhone 6s (A1699)</em>
                </div>
                <div class="price">
                  <strong>
                    <em>¥</em>
                    <i> 4088.00</i>
                  </strong>
                </div>
                <div class="commit">
                  <i class="command">已有700人评价</i>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import SelectorVue from '../child/selector.vue';
import PageVue from '@/components/Page/page.vue';


export default {
  name: 'home',
  components: {
    SelectorVue,
    PageVue
  },
  data() {
    return {
      searchData: {
        // 三级分类1 2 3 ID
        "category1Id": "",
        "category2Id": "",
        "category3Id": "",
        // 分类名称
        "categoryName": "",
        // 搜索关键字
        "keyword": "",
        // 排序方式
        "order": "1:desc",
        // 页码
        "pageNo": 1,
        // 每页数量
        "pageSize": 10,
        // 商品属性数组
        "props": [],
        // id+品牌名称
        "trademark": ""

      }
    }
  },
  // 钩子函数 组件渲染完成之前调用
  beforeMount() {
    // assign  es6语法 合并数据
    Object.assign(this.searchData, this.$route.query, this.$route.params)
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      this.$store.dispatch('getSearchList', this.searchData);
    },
    // 三级联动面包屑删除操作
    removeCategoryName() {
      this.searchData.category1Id = undefined
      this.searchData.category2Id = undefined
      this.searchData.category3Id = undefined
      this.searchData.categoryName = undefined
      // 判断地址栏参数是否需要改变
      if (this.$route.params) {
        this.$router.push({ name: 'search', params: this.$route.params })
      }
    },
    // 关键字面包屑删除操作
    removeKeydata() {
      this.searchData.keydata = undefined
      this.getData()
      // 全局事件总线
      this.$bus.$emit('clear')
      // 判断地址栏参数是否需要改变
      if (this.$route.query) {
        this.$router.push({ name: 'search', query: this.$route.query })
      }
    },
    // 品牌面包屑删除操作
    removeTrademark() {
      this.searchData.trademark = undefined
      this.getData()
    },
    // 商品详情面包屑删除操作
    removeProps(index){
      // 根据索引删除面包屑
      this.searchData.props.splice(index,1);
      this.getData()
    },
    // 回调child/selector子组件中的品牌 --trademarkList
    trandClick(brand) {
      // 整理参数
      this.searchData.trademark = `${brand.tmId}:${brand.tmName}`
      // 重新获取服务器数据
      this.getData()
    },
    // 回调child/selector子组件中的详细属性 --attrsList
    labelClick(label,label2){
      // 整理数据
      let props = `${label.attrId}:${label2}:${label.attrName}`
      if(this.searchData.props.indexOf(props)==-1){
        this.searchData.props.push(props)
      }
      // 发请求
      this.getData()

    },
    // 排序
    changeClick(falg){
      if(this.isAsc){
        this.searchData.order = `${falg}:desc`
      }else{
        this.searchData.order = `${falg}:asc`
      }
      this.getData()
    },
    // 获取分页器的数据
    pageClick(page){
      this.searchData.pageNo = page
      this.getData();
    }
  },
  computed: {
    // 获取vuex数据
    ...mapGetters(['goodsList']),
    ...mapState({total:start=> start.search.searchList.total}),
    // 判断order中是否有1
    isOne(){
      return this.searchData.order.indexOf('1') != -1
    },
    // 判断order中是否有2
    isTwo(){
      return this.searchData.order.indexOf('2') != -1
    },
    // 判断order中是否有asc
    isAsc(){
      return this.searchData.order.indexOf('asc') != -1
    },
    // 判断order中是否有desc
    isDesc(){
      return this.searchData.order.indexOf('desc') != -1
    }
  },
  watch: {
    // 监听路由的变化 重新发送请求
    $route(newvalue, oldvalue) {
      // 路由变化后 重新合并数据
      Object.assign(this.searchData, this.$route.query, this.$route.params)
      // 发送请求
      this.getData()
      // 清空不必要的三级菜单
      this.searchData.category1Id = undefined
      this.searchData.category2Id = undefined
      this.searchData.category3Id = undefined

    }
  }

}

</script>

<style scoped>
@import url('@/assets/css/search.css');
</style>