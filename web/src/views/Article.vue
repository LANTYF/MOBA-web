<!--  -->
<template>
  <div>
    <div class="d-flex ai-center py-3 top">
      <i class="iconfont icon-back text-blue-2" @click="$router.push('/')"></i>
      <strong class="flex-1 text-blue-2">{{model.title}}</strong>
      <span class="mr-2 fs-xs text-gray-3">{{model.createdAt | date}}</span>
    </div>
    <div class="py-2 ql-editor body" v-html="model.content"></div>
    <div class="mt-5 px-3">
      <div class="d-flex ai-center">
        <i class="iconfont icon-ziyuanxhdpi text-gray-2 mr-1"></i>
        <strong class="fs-md-1 text-blue-2">相关资讯</strong>
      </div>
      <div>
        <div class="fs-md-1 my-1 d-flex" v-for="item in model.related" :key="item._id">
          <router-link tag="span" :to="`/articles/${item._id}`" class="flex-1 text-ellipsis">{{item.title}}</router-link>
          <span class="text-gray-3">{{item.createdAt | date}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
export default {
  name:'',
  props: {
      id: {
        required: true
      }
  },
  data() {
    return {
      model: {}
    }
  },
  methods: {
    async fetch() {
      const res = await this.$http.get(`articles/${this.id}`)
      console.log(res.data);
      this.model = res.data
    }
  },
  created() {
    this.fetch()
  },
  filters: {
    date(val) {
      return dayjs(val).format('YYYY-MM-DD')
    }
  },
  watch:{
    id() {
      this.fetch()
    }
  }
}

</script>

<style lang="scss">
.top {
  border-bottom: 1px solid #d4d9de
}
.body {
  box-sizing: border-box;
  img {
    max-width: 100%;
    height: auto;
  }
  iframe {
    max-width: 100% ;
    height: auto
  }
}
</style>