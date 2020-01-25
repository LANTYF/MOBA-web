<!--  -->
<template>
  <div id="home">
    <swiper :options="swiperOption">
      <swiper-slide>
        <img class="w-100" src="../assets/img/8887023cd8137a968bc1b3ac23093573.jpeg" alt />
      </swiper-slide>
      <swiper-slide>
        <img class="w-100" src="../assets/img/d03393c4e1238f7bf16fd344e13205d8.jpeg" alt />
      </swiper-slide>
      <swiper-slide>
        <img class="w-100" src="../assets/img/d45578a314a044fd6d90d50fa1026465.jpeg" alt />
      </swiper-slide>
      <div class="swiper-pagination pagination-home text-right pr-3 pb-1" slot="pagination"></div>
    </swiper>
    <div class="box d-flex flex-wrap text-center mt-3 pt-4 bg-white" ref="box">
      <div class="boxitem mb-4 text-black-1" v-for="i of 13" :key="i">
        <i class="sprite sprite-1 py-1"></i>
        <div>爆料站</div>
      </div>
    </div>
    <div class="bg-gray-5 text-center py-2" @click="pulldownClick">
      <i class="sprite sprite-arrow mr-1"></i>
      <span class="fs-sm text-black-4">收起</span>
    </div>
    <news-card class="mt-3"></news-card>
    <hero-card class="mt-3"></hero-card>
    <div v-for="n in 30" :key="n">{{n}}</div>
  </div>
</template>

<script>
import NewsCard from './home/NewsCard'
import HeroCard from './home/HeroCard'
export default {
  name: "",
  components: {
    NewsCard,
    HeroCard
  },
  data() {
    return {
      swiperOption: {
        pagination: {
          el: ".pagination-home",
          type: "bullets"
        },
        autoplay: {
          delay: 3000,
          // stopOnLastSlide: false, //当切换到最后一个slide时停止自动切换
          // stopOnLastSlide: true, //如果设置为true，当切换到最后一个slide时停止自动切换。
          disableOnInteraction: false, //用户操作swiper之后，是否禁止autoplay。
          // reverseDirection: true, //开启反向自动轮播。
          waitForTransition: true //等待过渡完毕。自动切换会在slide过渡完毕后才开始计时。
        },
        loop: true
      },
    };
  },
  methods: {
    pulldownClick() {
    }
  }
};
</script>

<style lang="scss">
@import "../assets/css/variables.scss";

.pagination-home {
  box-sizing: border-box;
  .swiper-pagination-bullet {
    opacity: 1;
    background: map-get($colors, white);
    width: 0.6538rem;
    height: 0.6538rem;
    border-radius: 2px;
    &.swiper-pagination-bullet-active {
      background: map-get($colors, blue);
    }
  }
}
.boxitem {
  width: 25%;
  box-sizing: border-box;
  border-right: 1px solid map-get($map: $colors, $key: border-color);
  &:nth-child(4n) {
    border-right: none;
  }
}

</style>