<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container">
      <div @mouseleave="changLeave" @mouseenter="changShow">
        <h2 class="all">全部商品分类</h2>
        <div class="sort" v-show="show">
          <div class="all-sort-list2" @click="goSearch">
            <div class="item" v-for="(t1, index) in categoryListdata" :key="t1.categoryId"
              :class="{cur:curIndex==index}">
              <h3 @mouseenter="changEnter(index)">
                <a :data-categoryName="t1.categoryName" :data-category1Id="t1.categoryId">{{t1.categoryName}}</a>
              </h3>
              <div class="item-list clearfix">
                <div class="subitem">
                  <dl class="fore" v-for="(t2, index) in t1.categoryChild" :key="t2.categoryId">
                    <dt>
                      <a :data-categoryName="t2.categoryName" :data-category2Id="t2.categoryId">{{t2.categoryName}}</a>
                    </dt>
                    <dd>
                      <em v-for="(t3, index) in t2.categoryChild" :key="t3.categoryId">
                        <a :data-categoryName="t3.categoryName"
                          :data-category3Id="t3.categoryId">{{t3.categoryName}}</a>
                      </em>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>

import { mapState } from 'vuex';

export default {
  name: 'TypeNav',
  data() {
    return {
      curIndex: -1,
      show: true
    }
  },
  methods: {
    // 鼠标移进触发事件
    changEnter(index) {
      this.curIndex = index
    },
    // 鼠标移出触发事件
    changLeave() {
      this.curIndex = -1
      if (this.$route.path != '/home') {
        this.show = false
      }
    },
    // 设置商品分类导航显示与否
    changShow() {
      this.show = true
    },
    // 路由带参跳转search
    goSearch(event) {
      // 路由跳转传参 通过自定义data事件获取具体的点击标签
      let node = event.target
      // 通过自定义标签获取商品名称和商品价格
      let { categoryname, category1id, category2id, category3id } = node.dataset
      // 判断是否有商品名称 有就拼接转跳地址
      if (categoryname) {
        let location = { name: "search" }
        let query = { categoryName: categoryname }
        if (category1id) {
          query.category1Id = category1id
        } else if (category2id) {
          query.category2Id = category2id
        } else {
          query.category3Id = category3id
        }
        location.query = query

        if (this.$route.params) {
          location.params = this.$route.params;
          this.$router.push(location)
        }
      }
    },

  },
  // 从vuex仓库中获取数据
  mounted() {
    // 1.派发action 组件挂载完成后从仓库加载数据
    this.$store.dispatch('categoryList')
    // 判断是否显示头部模块
    if (this.$route.path != '/home') {
      this.show = false
    }
  },
  computed: {
    // 通过计算属性 获取vuex仓库中的数据
    ...mapState({
      categoryListdata: state => state.home.categoryListdata
    })
  },


}

</script>

<style scoped>
@import url('@/assets/css/home.css');
</style>