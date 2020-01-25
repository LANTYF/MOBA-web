<!--  -->
<template>
  <div>
    <div>
      <h1>{{id ? '编辑' : '新建'}}物品</h1>
    </div>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="图标">
        <el-upload
          class="avatar-uploader"
          :action="$http.defaults.baseURL + 'upload'"
          :headers="getHeaders()"
          :show-file-list="false"
          :on-success="afterUpload"
        >
          <img v-if="model.icon" :src="model.icon" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      model: {
        icon:''
      }
    };
  },
  props: {
    id: { type: String }
  },
  methods: {
    afterUpload(res) {
      // this.model.icon = res.url
      this.$set(this.model, 'icon', res.url)
    },
    async save() {
      if (this.id) {
        await this.$http.put(`test/items/${this.id}`, this.model);
      } else {
        await this.$http.post("test/items", this.model);
      }
      this.$router.push("/items/list");
      this.$message({
        type: "success",
        message: "保存成功"
      });
    },
    async fetch() {
      const res = await this.$http.get(`test/items/${this.id}`);
      this.model = res.data;
    }
  },
  created() {
    this.id && this.fetch();
  },
  // beforeRouteEnter: (to, from, next) => {
  //   next(vm => {
  //     vm.model = {};
  //   });
  // }
};
</script>

<style>
 
</style>