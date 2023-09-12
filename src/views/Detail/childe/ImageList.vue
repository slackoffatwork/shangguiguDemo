<template>
  <div class="specScroll">
    <!--左按钮-->
    <a class="prev">&lt;</a>
    <!-- 中间可滑动区域 -->
    <div class="items">
      <div class="itemsCon" v-for="(img,index) in skuImageList" :key="img.id">
          <img :src="img.imgUrl" >
      </div>
    </div>
    <!--右按钮-->
    <a class="next">&gt;</a>
  </div>
</template>
 
<script>

export default {
  name: "ImageList",
  props:['skuImageList']
}
</script>
 
