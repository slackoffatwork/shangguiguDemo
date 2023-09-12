<template>
<div class=''>
  <div class="clearfix selector">
        <div class="type-wrap logo">
          <div class="fl key brand">品牌</div>
          <div class="value logos">
            <ul class="logo-list">
              <li v-for="(brand, index) in trademarkList" :key="brand.tmId" @click="trandClick(brand)">{{ brand.tmName }}</li>
            </ul>
          </div>
          <div class="ext">
            <a href="javascript:void(0);" class="sui-btn">多选</a>
            <a href="javascript:void(0);">更多</a>
          </div>
        </div>
        <div class="type-wrap" v-for="(label, index) in attrsList" :key="label.attrId" >
          <div class="fl key">{{ label.attrName }}</div>
          <div class="fl value">
            <ul class="type-list">
              <li v-for="(label2, index) in label.attrValueList" :key="index" @click="labelClick(label,label2)">
                <a>{{ label2 }}</a>
              </li>
            </ul>
          </div>
          <div class="fl ext"></div>
        </div>
        <div class="type-wrap">
          <div class="fl key">显示屏尺寸</div>
          <div class="fl value">
            <ul class="type-list">
              <li>
                <a>4.0-4.9英寸</a>
              </li>
              <li>
                <a>4.0-4.9英寸</a>
              </li>
            </ul>
          </div>
          <div class="fl ext"></div>
        </div>
        <div class="type-wrap">
          <div class="fl key">摄像头像素</div>
          <div class="fl value">
            <ul class="type-list">
              <li>
                <a>1200万以上</a>
              </li>
              <li>
                <a>800-1199万</a>
              </li>
              <li>
                <a>1200-1599万</a>
              </li>
              <li>
                <a>1600万以上</a>
              </li>
              <li>
                <a>无摄像头</a>
              </li>
            </ul>
          </div>
          <div class="fl ext"></div>
        </div>
        <div class="type-wrap">
          <div class="fl key">价格</div>
          <div class="fl value">
            <ul class="type-list">
              <li>
                <a>0-500元</a>
              </li>
              <li>
                <a>500-1000元</a>
              </li>
              <li>
                <a>1000-1500元</a>
              </li>
              <li>
                <a>1500-2000元</a>
              </li>
              <li>
                <a>2000-3000元 </a>
              </li>
              <li>
                <a>3000元以上</a>
              </li>
            </ul>
          </div>
          <div class="fl ext">
          </div>
        </div>
        <div class="type-wrap">
          <div class="fl key">更多筛选项</div>
          <div class="fl value">
            <ul class="type-list">
              <li>
                <a>特点</a>
              </li>
              <li>
                <a>系统</a>
              </li>
              <li>
                <a>手机内存 </a>
              </li>
              <li>
                <a>单卡双卡</a>
              </li>
              <li>
                <a>其他</a>
              </li>
            </ul>
          </div>
          <div class="fl ext">
          </div>
        </div>
      </div>
</div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Selector',
  computed: {
    ...mapGetters(['attrsList', 'trademarkList'])
  },
  methods:{
    trandClick(brand){
      // 自定义事件
      this.$emit('trandClick',brand)
    },
    labelClick(label,label2){
      this.$emit('labelClick',label,label2)
    }
  }
}

</script>

<style>

</style>