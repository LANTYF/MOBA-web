<!--  -->
<template>
   <card-list title='新闻资讯' sprite='sprite-news' :categories="newsCats">
        <template #items="{category}">
        <router-link tag="div" :to='`/articles/${item._id}`' class="d-flex mt-3" v-for="(item, i) in category.newsList" :key="i">
          <span class="fs-md-1 text-blue-1">[{{item.categoryName}}]</span>
          <span class="mt-1">|</span>
          <span class="flex-1 fs-md-1 text-black-1 text-ellipsis">{{item.title}}</span>
          <span class="fs-sm text-gray-2">{{item.updatedAt | date}}</span>
        </router-link>
      </template>
    </card-list>
</template>

<script>
import CardList from '../../components/CardList'
import dayjs from 'dayjs'
export default {
  name:'',
  components: {
    CardList
  },
  data() {
    return {
      newsCats: []
    }
  },
  methods: {
    async getList() {
      const res = await this.$http.get('news/list')
      this.newsCats = res.data
    }
  },
  created() {
    this.getList()
  },
  filters: {
    date(val) {
      return dayjs(val).format('MM-DD')
    }
  }
}

</script>

<style>

</style>