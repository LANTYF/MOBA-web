<!--  -->
<template>
  <div class="bg-gray">
    <div class="button px-2 bg-white d-flex jc-between mt-2">
      <div class="px-5 py-3">
        <i class="iconfont icon-bofang mr-2"></i>
        <span>英雄介绍视频</span>
      </div>
      <div class="px-5 py-3">
        <i class="iconfont icon-tupian mr-2"></i>
        <span>一图识英雄</span>
      </div>
    </div>
    <div class="skills bg-white d-flex">
      <div
        class="image p-3"
        v-for="(item, index) in model.skills"
        :key="item._id"
        @click="active = index"
        :class="{active: active === index}"
      >
        <img :src="item.icon" alt />
      </div>
    </div>
    <div class="pb-1 px-3 bg-white" v-for="(item, i) in model.skills" :key="i">
      <div v-if="active === i">
        <strong class="fs-md-2 mr-5">{{item.name}}</strong>
        <span class="fs-sm text-gray-4">(冷却值: {{item.delay}}</span>
        <span class="fs-sm text-gray-4">消耗: {{item.cost}})</span>
        <div class="mt-4 text-black-3">{{item.desc}}</div>
      </div>
    </div>
    <div class="mt-3 bg-white p-3">
      <i class="iconfont icon-iconfontqq mr-2"></i>
      <strong class="fs-lg">出装推荐</strong>
      <div class="my-2 fs-md-2">顺风出装</div>
      <div class="d-flex jc-around text-center" style="border-bottom: 1px solid #ededed">
        <div class="p-2 items" v-for="item in model.items1" :key="item._id">
          <img :src="item.icon" alt />
          <div class="fs-xs text-black-3">{{item.name}}</div>
        </div>
      </div>
      <div class="my-2 fs-md-2">逆风出装</div>
      <div class="d-flex jc-around text-center" style="border-bottom: 1px solid #ededed">
        <div class="p-2 items" v-for="item in model.items2" :key="item._id">
          <img :src="item.icon" alt />
          <div class="fs-xs text-black-3">{{item.name}}</div>
        </div>
      </div>
    </div>
    <div class="mt-3 bg-white p-3">
      <i class="iconfont icon-iconfontqq mr-2"></i>
      <strong class="fs-lg">使用技巧</strong>
      <div class="text-black-3">{{model.useTips}}</div>
    </div>
    <div class="mt-3 bg-white p-3">
      <i class="iconfont icon-iconfontqq mr-2"></i>
      <strong class="fs-lg">对抗技巧</strong>
      <div class="text-black-3">{{model.battleTips}}</div>
    </div>
    <div class="mt-3 bg-white p-3">
      <i class="iconfont icon-iconfontqq mr-2"></i>
      <strong class="fs-lg">团战思路</strong>
      <div class="text-black-3">{{model.teamTips}}</div>
    </div>
    <div class="partners mt-3 bg-white p-3">
      <i class="iconfont icon-iconfontqq mr-2"></i>
      <strong class="fs-lg">英雄关系</strong>
      <div class="my-2 fs-md-2">最佳搭档</div>
      <div v-for="(item, i) in model.partners" :key="i" class="d-flex mb-4">
        <img class="mr-2" :src="item.hero.avatar" alt="">
        <div class="text-black-3">{{item.desc}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      model: [],
      active: 0
    };
  },
  methods: {
    async fetch() {
      const res = await this.$http.get(`heroes/${this.$route.params.id}`);
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
.image {
  box-sizing: border-box;
}
.skills {
  .active {
    img {
      border: 3px solid map-get($map: $colors, $key: primary);
      border-radius: 50%;
    }
  }
}
.items {
  img {
    border-radius: 50%;
  }
}
.partners {
  img {
    height: 50px
  }
}
</style>