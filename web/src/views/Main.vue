<!--  -->
<template>
  <div id="main">
    <div class="topbar bg-black py-2 d-flex pl-3 ai-center">
      <div class="sprite sprite-logo mr-2"></div>
      <div class="flex-1">
        <div class="text-white mb-1">王者荣耀</div>
        <div class="text-gray-1 fs-xs">团战成就更多</div>
      </div>
      <div class="sprite sprite-load mr-3"></div>
    </div>
    <div class="nav bg-primary py-3 d-flex jc-around text-white ai-center">
      <router-link to="/" tag="div" class="active pb-1">首页</router-link>
      <router-link to="/1" tag="div" class="pb-1">攻略中心</router-link>
      <router-link to="/2" tag="div" class="pb-1">赛事中心</router-link>
    </div>
    <router-view :key="$route.path"></router-view>
  </div>
</template>

<script>
export default {
  computed: {
    isActive() {
      return this.$route.path === this.path;
    }
  }
};
</script>

<style lang="scss">
.nav {
  .active {
    border-bottom: 3px solid white;
  }
}
.topbar {
  position: sticky;
  top: 0;
  z-index: 9;
}
</style>