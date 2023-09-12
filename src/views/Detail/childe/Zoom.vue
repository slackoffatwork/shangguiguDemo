<template>
    <div class="preview">
      <div class="jqzoom">
        <img :src="imgObj.imgUrl" />
      </div>
    </div>
</template>

<script>

export default {
  name: 'Zoom',
  props:['skuImageList'],
  computed:{
    imgObj(){
      return this.skuImageList[0] || {}
    }

  }
}

</script>

<style>

</style>