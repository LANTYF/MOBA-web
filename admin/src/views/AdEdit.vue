<!--  -->
<template>
  <div>
    <div>
      <h1>{{id ? '编辑' : '新建'}}广告</h1>
    </div>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="广告">
        <el-button @click="model.items.push({})">
          <i class="el-icon-plus"></i> 添加广告
        </el-button>
        <el-row type="flex" style="flex-wrap:wrap">
          <el-col :span="24" v-for="(item, i) in model.items" :key="i">
            <el-form-item label="跳转链接" style="margin-top:1rem">
              <el-input v-model="item.url"></el-input>
            </el-form-item>
            <el-form-item label="图片" style="margin-top:1rem">
              <el-upload
                class="avatar-uploader"
                :action="$http.defaults.baseURL + 'upload'"
                :headers="getHeaders()"
                :show-file-list="false"
                :on-success="res => $set(item, 'image', res.url)"
              >
                <img v-if="item.image" :src="item.image" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>

            <el-form-item>
              <el-button type="danger" @click="model.items.splice(i, 1)">删除</el-button>
            </el-form-item>
          </el-col>
        </el-row>
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
        items: []
      }
    };
  },
  props: {
    id: { type: String }
  },
  methods: {
    async save() {
      if (this.id) {
        await this.$http.put(`test/ads/${this.id}`, this.model);
      } else {
        await this.$http.post("test/ads", this.model);
      }
      this.$router.push("/ads/list");
      this.$message({
        type: "success",
        message: "保存成功"
      });
    },
    async fetch() {
      const res = await this.$http.get(`test/ads/${this.id}`);
      this.model = res.data;
    }
  },
  created() {
    this.id && this.fetch();
  },
  // beforeRouteEnter: (to, from, next) => {
  //   next(vm => {
  //     vm.model = {
  //       items: []
  //     };
  //   });
  // }
};
</script>

<style scoped>
</style>