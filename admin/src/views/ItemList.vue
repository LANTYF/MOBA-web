<!--  -->
<template>
  <div>
    <h1>物品列表</h1>
    <el-table :data="items" style="width: 100%">
      <el-table-column prop="_id" label="ID" width="220"></el-table-column>
      <el-table-column prop="name" label="物品名称" width="220"></el-table-column>
      <el-table-column label="图标" width="180">
        <template slot-scope="scope">
          <img :src="scope.row.icon" alt="" style="height:3rem">
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" > 
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
      const res = await this.$http.get("test/items");
      this.items = res.data;
    },
    edit(id) {
      this.$router.push(`/items/${id}`);
    },
    async remove(row) {
      this.$confirm(`是否确定删除该物品 '${row.name}'`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async () => {
        await this.$http.delete(`test/items/${row._id}`);
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