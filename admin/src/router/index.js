import Vue from 'vue'
import VueRouter from 'vue-router'
const Main = () => import('../views/main.vue')
const CategoryEdit = () => import('../views/CategoryEdit.vue')
const CategoryList = () => import('../views/CategoryList.vue')

const ItemEdit = () => import('../views/ItemEdit.vue')
const ItemList = () => import('../views/ItemList.vue')

const HeroEdit = () => import('../views/HeroEdit.vue')
const HeroList = () => import('../views/HeroList.vue')

const ArticleEdit = () => import('../views/ArticleEdit.vue')
const ArticleList = () => import('../views/ArticleList.vue')

const AdEdit = () => import('../views/AdEdit.vue')
const AdList = () => import('../views/AdList.vue')

const AdminUserEdit = () => import('../views/AdminUserEdit.vue')
const AdminUserList = () => import('../views/AdminUserList.vue')

const Login = () => import('../views/Login.vue')



Vue.use(VueRouter)

const routes = [
  {
    path:'/login',
    name:'login',
    component: Login,
    meta:{isPublic:true}
  },
  {
    path:'/',
    name:'main',
    component:Main,
    children:[
      { path:'categories/create', component:CategoryEdit },
      { path:'categories/list', component:CategoryList },
      { path:`categories/:id`, component:CategoryEdit, props:true },

      { path:'items/create', component:ItemEdit },
      { path:'items/list', component:ItemList },
      { path:`items/:id`, component:ItemEdit, props:true },

      { path:'heroes/create', component:HeroEdit },
      { path:'heroes/list', component:HeroList },
      { path:`heroes/:id`, component:HeroEdit, props:true },

      { path:'articles/create', component:ArticleEdit },
      { path:'articles/list', component:ArticleList },
      { path:`articles/:id`, component:ArticleEdit, props:true },

      { path:'ads/create', component:AdEdit },
      { path:'ads/list', component:AdList },
      { path:`ads/:id`, component:AdEdit, props:true },

      { path:'admin_users/create', component:AdminUserEdit },
      { path:'admin_users/list', component:AdminUserList },
      { path:`admin_users/:id`, component:AdminUserEdit, props:true },
    ]
  },
  
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (!to.meta.isPublic && !localStorage.token) {
    return next('/login')
  }
  next()
})

export default router
