<template>
  <!--今日推荐-->
  <div class="today-recommend">
    <div class="py-container">
      <ul class="recommend">
        <li class="clock">
          <div class="time">
            <img src="@/assets/images/home/clock.png" />
            <h3>今日推荐</h3>
          </div>
        </li>
        <li class="banner">
          <img src="@/assets/images/home/today01.png" />
        </li>
        <li class="banner">
          <img src="@/assets/images/home/today02.png" />
        </li>
        <li class="banner">
          <img src="@/assets/images/home/today03.png" />
        </li>
        <li class="banner">
          <img src="@/assets/images/home/today04.png" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>

export default {
 name: 'Today'
}

</script>

<style>
@import url('@/assets/css/home.css')
</style>