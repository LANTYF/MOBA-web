<!--  -->
<template>
  <div>
    <div>
      <h1>{{id ? '编辑' : '新建'}}分类</h1>
    </div>
    <el-form label-width='120px' @submit.native.prevent='save'>
      <el-form-item label='上级分类'>
        <el-select v-model="model.parents">
          <el-option v-for="item in parents" :key="item._id" :label="item.name" :value="item._id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label='名称'>
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type='primary' native-type='submit'>保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name:'',
  data() {
    return {
      model:{},
      parents:[]
    }
  },
  props:{
    id:{ type:String }
  },
  methods:{
    async save() {
      if (this.id) {
         await this.$http.put(`test/categories/${this.id}`, this.model)
      } else {
         await this.$http.post('test/categories', this.model)
      }
      this.$router.push('/categories/list')
      this.$message({
        type:'success',
        message:'保存成功'
      })
    },
    async fetch() {
      const res =  await this.$http.get(`test/categories/${this.id}`)
      this.model = res.data
    },
    async fetchParents() {
      const res = await this.$http.get('test/categories')
      this.parents = res.data
    }
  },
  created() {
    this.id && this.fetch()
    this.fetchParents()
  },
  // watch:{
  //   id() {
  //     if (!this.id) {
  //       this.model = []
  //     }
  //   }
  // }
  // beforeRouteEnter: (to, from, next) => {
  //   next(vm => {
  //     vm.model = {}
  //   })
  // }
}

</script>

<style scoped>
</style>