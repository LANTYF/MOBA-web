<!--  -->
<template>
  <div>
    <div>
      <h1>{{id ? '编辑' : '新建'}}管理员</h1>
    </div>
    <el-form label-width='120px' @submit.native.prevent='save'>
      <el-form-item label='名称'>
        <el-input v-model="model.username"></el-input>
      </el-form-item>
      <el-form-item label='密码'>
        <el-input v-model="model.password" type="text"></el-input>
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
      model:{}
    }
  },
  props:{
    id:{ type:String }
  },
  methods:{
    async save() {
      if (this.id) {
         await this.$http.put(`test/admin_users/${this.id}`, this.model)
      } else {
         await this.$http.post('test/admin_users', this.model)
      }
      this.$router.push('/admin_users/list')
      this.$message({
        type:'success',
        message:'保存成功'
      })
    },
    async fetch() {
      const res =  await this.$http.get(`test/admin_users/${this.id}`)
      this.model = res.data
    }
  },
  created() {
    this.id && this.fetch()
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