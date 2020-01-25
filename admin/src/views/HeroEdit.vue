<!--  -->
<template>
  <div>
    <div>
      <h1>{{id ? '编辑' : '新建'}}英雄</h1>
    </div>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-tabs type="border-card" value="basic">
        <el-tab-pane label="基本信息" name="basic">
          <el-form-item label="名称">
            <el-input v-model="model.name"></el-input>
          </el-form-item>
          <el-form-item label="称号">
            <el-input v-model="model.title"></el-input>
          </el-form-item>
          <el-form-item label="英雄头像">
            <el-upload
              class="avatar-uploader"
              :action="$http.defaults.baseURL + 'upload'"
              :headers="getHeaders()"
              :show-file-list="false"
              :on-success="afterUpload"
            >
              <img v-if="model.avatar" :src="model.avatar" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="英雄背景">
            <el-upload
              class="avatar-uploader"
              :action="$http.defaults.baseURL + 'upload'"
              :headers="getHeaders()"
              :show-file-list="false"
              :on-success="res => $set(model, 'banners', res.url)"
            >
              <img v-if="model.banners" :src="model.banners" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="英雄定位">
            <el-select v-model="model.categories" multiple>
              <el-option
                v-for="item of categories"
                :label="item.name"
                :value="item._id"
                :key="item._id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="难度">
            <el-rate v-model="model.scores.difficult" style="margin-top:0.7rem" :max="9" show-score></el-rate>
          </el-form-item>
          <el-form-item label="技能">
            <el-rate v-model="model.scores.skill" style="margin-top:0.7rem" :max="9" show-score></el-rate>
          </el-form-item>
          <el-form-item label="攻击">
            <el-rate v-model="model.scores.attack" style="margin-top:0.7rem" :max="9" show-score></el-rate>
          </el-form-item>
          <el-form-item label="生存">
            <el-rate v-model="model.scores.survive" style="margin-top:0.7rem" :max="9" show-score></el-rate>
          </el-form-item>
          <el-form-item label="顺风出装">
            <el-select v-model="model.items1" multiple>
              <el-option v-for="item in items" :label="item.name" :value="item._id" :key="item._id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="逆风出装">
            <el-select v-model="model.items2" multiple>
              <el-option v-for="item in items" :label="item.name" :value="item._id" :key="item._id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="使用技巧">
            <el-input type="textarea" v-model="model.useTips"></el-input>
          </el-form-item>
          <el-form-item label="对抗技巧">
            <el-input type="textarea" v-model="model.battleTips"></el-input>
          </el-form-item>
          <el-form-item label="团战思路">
            <el-input type="textarea" v-model="model.teamTips"></el-input>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="技能" name="skills">
          <el-button style="margin-bottom:2rem" @click="addSkills">
            <i class="el-icon-plus"></i> 添加技能
          </el-button>
          <el-row type="flex" style="flex-wrap:wrap">
            <el-col :span="12" v-for="(item, i) in model.skills" :key="i">
              <el-form-item label="名称">
                <el-input v-model="item.name"></el-input>
              </el-form-item>
              <el-form-item label="图标">
                <el-upload
                  class="avatar-uploader"
                  :action="$http.defaults.baseURL + 'upload'"
                  :headers="getHeaders()"
                  :show-file-list="false"
                  :on-success="res => $set(item, 'icon', res.url)"
                >
                  <img v-if="item.icon" :src="item.icon" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
              <el-form-item label="技能描述">
                <el-input type="textarea" v-model="item.desc"></el-input>
              </el-form-item>
              <el-form-item label="冷却值">
                <el-input v-model="item.delay"></el-input>
              </el-form-item>
              <el-form-item label="消耗值">
                <el-input v-model="item.cost"></el-input>
              </el-form-item>
              <el-form-item label="小提示">
                <el-input v-model="item.tip" type="textarea"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="danger" @click="removeSkills(i)">删除</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="团队关系" name="partners">
          <el-button style="margin-bottom:2rem" @click="model.partners.push({})">
            <i class="el-icon-plus"></i> 添加英雄
          </el-button>
          <el-row type="flex" style="flex-wrap:wrap">
            <el-col :span="12" v-for="(item, i) in model.partners" :key="i">
              <el-form-item label="英雄名称">
                <el-select filterable v-model="item.hero">
                  <el-option v-for="item in heroes" :key="item._id" :value="item._id" :label="item.name"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="描述">
                <el-input type="textarea" v-model="item.desc"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="danger" @click="model.partners.splice(i, 1)">删除</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
      <el-form-item style="margin-top: 1rem">
        <el-button type="primary" native-type="submit" style="margin-left: 65rem">保存</el-button>
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
        name: "",
        avatar: "",
        scores: {},
        skills: [],
        partners: []
      },
      heroes:[],
      categories: [],
      items: []
    };
  },
  props: {
    id: { type: String }
  },
  methods: {
    addSkills() {
      this.model.skills.push({});
    },
    removeSkills(i) {
      this.model.skills.splice(i,1)
    },
    afterUpload(res) {
      this.model.avatar = res.url;
    },
    async save() {
      if (this.id) {
        await this.$http.put(`test/heroes/${this.id}`, this.model);
      } else {
        await this.$http.post("test/heroes", this.model);
      }
      this.$router.push("/heroes/list");
      this.$message({
        type: "success",
        message: "保存成功"
      });
    },
    async fetch() {
      const res = await this.$http.get(`test/heroes/${this.id}`);
      this.model = Object.assign({}, this.model, res.data)
      // this.model = res.data;
    },
    async fetchItems() {
      const res = await this.$http.get("test/items");
      this.items = res.data;
    },
    async fetchCategories() {
      const res = await this.$http.get("test/categories");
      this.categories = res.data;
    },
    async fetchHeroes() {
      const res = await this.$http.get("test/heroes");
      this.heroes = res.data;
    }
  },
  created() {
    this.fetchItems();
    this.fetchCategories();
    this.fetchHeroes();
    this.id && this.fetch();
  },
  // watch:{
  //   id() {
  //     if (!this.id) {
  //       this.model = {}
  //     }
  //   }
  // },
  // beforeRouteEnter: (to, from, next) => {
  //   next(vm => {
  //     vm.model = {
  //       scores: {},
  //       skills: []
  //     };
  //   });
  // }
};
</script>

<style>
</style>