<template>
  <div class="fr page">
    <div class="sui-pagination clearfix">
      <ul>
        <li class="prev disabled">
          <button :disabled="pageNo == 1" @click="$emit('pageClick', pageNo - 1)">«上一页</button>
        </li>
        <li>
          <button @click="$emit('pageClick', pageNo = 1)" v-if="startANDend.start >=3">1</button>
        </li>
        <li class="dotted" v-if="startANDend.start >= 2"><span>...</span></li>
        <li v-for="(page, index) in startANDend.end" :key="index" v-if="page >= startANDend.start"
          :class="page == pageNo ? 'active' : ''" @click="$emit('pageClick', page)">
          <button>{{ page }}</button>
        </li>
        <li class="dotted" v-if="startANDend.end <= totalpage - 1"><span>...</span></li>
        <li>
          <button @click="$emit('pageClick', pageNo = totalpage)" v-if="startANDend.end <= totalpage - 2">{{ totalpage }}</button>
        </li>
        <li class="next">
          <button :disabled="pageNo == totalpage" @click="$emit('pageClick', pageNo + 1)">下一页»</button>
        </li>
        <li>
          <button>共{{ total }}条</button>
        </li>
      </ul>
    </div>

  </div>
</template>

<script>

export default {
  name: 'Page',
  props: ['pageNo', 'pageSize', 'total', 'continues'],
  computed: {
    // 总页数
    totalpage() {
      return Math.ceil(this.total / this.pageSize)
    },
    startANDend() {
      let start = 1, end = 1
      const { pageNo, pageSize, total, continues, totalpage } = this
      // 当总页数小于展示页数时
      if (continues > totalpage) {
        start = 1
        end = totalpage
        // 正常情况
      } else {
        start = pageNo - parseInt(continues / 2)
        end = pageNo + parseInt(continues / 2)
        // 当开始页数小于1
        if (start < 1) {
          start = 1
          end = continues
        }
        // 当结束页面大于总页数
        if (end > totalpage) {
          start = totalpage - continues + 1
          end = totalpage
        }

      }

      return { start, end }
    }
  }

}

</script>

<style>
.active {
  background-color: aqua;
}
</style>