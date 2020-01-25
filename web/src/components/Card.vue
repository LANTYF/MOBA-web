<!--  -->
<template>
  <div class="card bg-white p-3">
    <div class="card-header d-flex ai-center pb-3">
      <i class="sprite mr-2" :class="`${sprite}`"></i>
      <span class="text-black-1 fs-lg flex-1">{{title}}</span>
      <i class="sprite sprite-more"></i>
    </div>
    <div class="card-body mt-3">
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    sprite: {
      type: String,
      required: true
    }
  }
};
</script>

<style lang="scss">
@import "../assets/css/_variables.scss";
.card {
  .card-header {
    border-bottom: 1px solid map-get($map: $colors, $key: border-color);
  }
  .card-body {
    .active {
      color: map-get($map: $colors, $key: primary);
      border-bottom: 3px solid map-get($map: $colors, $key: primary);
    }
  }
}
</style>