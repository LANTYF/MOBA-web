<!--  -->
<template>
  <card-list title="英雄列表" sprite="sprite-hero" :categories="heroList">
    <template #items="{category}">
      <div class="d-flex flex-wrap pt-2" style="margin: 0 -0.5rem">
        <router-link tag="div" :to="`/heroes/${item._id}`" class="hero p-2" style="width: 20%" v-for="(item, i) in category.heroList" :key="i">
          <img class="w-100" :src="item.avatar" alt />
          <div class="text-center">{{item.name}}</div>
        </router-link>
      </div>
    </template>
  </card-list>
</template>

<script>
import CardList from "../../components/CardList";
export default {
  name: "",
  components: {
    CardList
  },
  data() {
    return {
      heroList: []
    };
  },
  methods: {
    async fetchHeroList() {
      const res = await this.$http.get("heroes/list");
      this.heroList = res.data;
      console.log(res.data);
      
    }
  },
  created() {
    this.fetchHeroList();
  }
};
</script>

<style scoped>
.hero {
  box-sizing: border-box;
}
</style>