<!--  -->
<template>
  <div>
    <div>
      <h1>{{id ? '编辑' : '新建'}}文章</h1>
    </div>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="标题">
        <el-input v-model="model.title"></el-input>
      </el-form-item>
      <el-form-item label="分类">
        <el-select v-model="model.categories" multiple>
          <el-option
            v-for="item of categories"
            :label="item.name"
            :value="item._id"
            :key="item._id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="内容">
        <VueEditor v-model="model.content" useCustomImageHandler @image-added="handleImageAdded"></VueEditor>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";
export default {
  name: "",
  data() {
    return {
      model: {},
      categories: []
    };
  },
  components: {
    VueEditor
  },
  props: {
    id: { type: String }
  },
  methods: {
     async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      var formData = new FormData();
      formData.append("file", file);
      const res = await this.$http.post('upload', formData)
      console.log(res.data);
      Editor.insertEmbed(cursorLocation, "image", res.data.url);
      resetUploader();
     },
    async save() {
      if (this.id) {
        await this.$http.put(`test/articles/${this.id}`, this.model);
      } else {
        await this.$http.post("test/articles", this.model);
      }
      this.$router.push("/articles/list");
      this.$message({
        type: "success",
        message: "保存成功"
      });
    },
    async fetch() {
      const res = await this.$http.get(`test/articles/${this.id}`);
      this.model = res.data;
    },
    async fetchCategories() {
      const res = await this.$http.get("test/categories");
      this.categories = res.data;
    }
  },
  created() {
    this.id && this.fetch();
    this.fetchCategories();
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