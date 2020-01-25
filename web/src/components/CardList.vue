<!--  -->
<template>
  <card :title="title" :sprite="sprite">
    <div class="nav d-flex jc-between">
      <div class="nav-item" :class="{active: active === i}" v-for="(category, i) in categories" :key="i" @click="$refs.newsList.swiper.slideTo(i)">{{category.name}}</div>
    </div>
    <swiper :options='{autoHeight: true}' ref="newsList" @slide-change="() => active = $refs.newsList.swiper.realIndex">
      <swiper-slide v-for="(category, i) in categories" :key="i">
        <slot name="items" :category="category"></slot>
      </swiper-slide>
    </swiper>
  </card>
</template>

<script>
import Card from "./Card";
export default {
  name: "",
  components: {
    Card
  },
  data() {
    return {
      active: 0
    }
  },
  props: {
    title: { type: String, required: true },
    sprite: { type: String, required: true },
    categories:{ type: Array, required: true}
  }
};
</script>

<style lang='scss'>
</style>