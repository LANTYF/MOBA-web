<!--  -->
<template>
  <div class="hero" v-if="model">
    <div class="topbar bg-black py-2 d-flex pl-3 ai-center">
      <div class="sprite sprite-logo mr-2"></div>
      <div class="flex-1 d-flex">
        <div class="text-white mb-1 mr-3">王者荣耀</div>
        <div class="text-white mb-1">攻略站</div>
      </div>
      <router-link tag="div" to="/" class="mr-3 text-white d-flex ai-center">
        <span class="fs-xs-1 mr-2">更多英雄</span>
        <span class="fs-lg">&gt;</span>
      </router-link>
    </div>
    <div class="top" :style="{'background-image': `url('${model.banners}')`}">
      <div class="info h-100 pb-3 d-flex flex-column jc-end px-3">
        <div class="fs-xs-1 text-white">{{model.title}}</div>
        <strong class="fs-lg-1 my-1 text-white" style="display: block">{{model.name}}</strong>
        <div class="fs-xs-1 text-white">{{model.categories.map(i => i.name).join('/')}}</div>
        <div class="d-flex ai-center">
          <div class="mt-1 text-gray scores flex-1">
            <span class="fs-sm text-gray-1">难度</span>
            <span class="circle bg-primary-1 fs-xs text-center">{{model.scores.difficult}}</span>
            <span class="fs-sm text-gray-1">技能</span>
            <span class="circle bg-blue-4 fs-xs text-center">{{model.scores.skill}}</span>
            <span class="fs-sm text-gray-1">攻击</span>
            <span class="circle bg-danger fs-xs text-center">{{model.scores.attack}}</span>
            <span class="fs-sm text-gray-1">生存</span>
            <span class="circle bg-black-4 fs-xs text-center">{{model.scores.survive}}</span>
          </div>
          <router-link class="text-gray-3 fs-xs-1" to="/" tag="span">皮肤: 7 &gt;</router-link>
        </div>
      </div>
    </div>
    <div class="body pt-4 bg-white">
      <div class="d-flex jc-around router pb-2 mx-3">
        <router-link tag="div" class="active" :to="`/heroes/${id}`">英雄初识</router-link>
        <router-link tag="div" to="/">进阶攻略</router-link>
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  props: {
    id: null
  },
  data() {
    return {
      model: {
        categories: [],
        scores: []
      }
    };
  },
  methods: {
    async fetch() {
      const res = await this.$http.get(`heroes/${this.id}`);
      this.model = res.data;
    }
  },
  created() {
    this.fetch();
  }
};
</script>

<style lang="scss">
@import "../assets/css/_variables.scss";
.hero {
  .top {
    height: 50vw;
    background: #fff no-repeat top center;
    background-size: auto 100%;
    .circle {
      display: inline-block;
      line-height: 1.2;
      height: 1rem;
      width: 1rem;
      border-radius: 50%;
    }
    .scores {
      span {
        margin-right: 0.4615rem;
      }
    }
    .info {
      background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1));
      box-sizing: border-box;
    }
  }

  .router {
    border-bottom: 1px solid map-get($map: $colors, $key: border-color);
    .active {
      color: map-get($map: $colors, $key: primary);
      border-bottom: 3px solid map-get($map: $colors, $key: primary);
    }
  }
  .button {
    div {
      border: 1px solid map-get($map: $colors, $key: border-color);
      background-color: map-get($map: $colors, $key: gray-6);
      border-radius: 0.3846rem;
      i {
        color: map-get($map: $colors, $key: primary);
      }
    }
  }
}
</style>