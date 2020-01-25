<!--  -->
<template>
  <div>
    <h1>文章列表</h1>
    <el-table :data="items" style="width: 100%">
      <el-table-column prop="_id" label="ID" width="220"></el-table-column>
      <el-table-column prop="title" label="文章标题" width="220"></el-table-column>
      <el-table-column label="文章分类" width="220">
        <template scope="scope">
          <el-divider direction="vertical"></el-divider>
          <span v-for="item in scope.row.categories" :key="item._id">
            {{item.name}}
            <el-divider direction="vertical"></el-divider>
          </span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="edit(scope.row._id)">编辑</el-button>
          <el-button type="text" size="small" @click="remove(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      items: []
    };
  },
  created() {
    this.fetch();
  },
  methods: {
    async fetch() {
      const res = await this.$http.get("test/articles");
      this.items = res.data;
    },
    edit(id) {
      this.$router.push(`/articles/${id}`);
    },
    async remove(row) {
      this.$confirm(`是否确定删除该文章 '${row.title}'`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async () => {
        await this.$http.delete(`test/articles/${row._id}`);
        this.$message({
          type: "success",
          message: "删除成功!"
        });
        this.fetch();
      });
    }
  }
};
</script>

<style scoped>
</style>