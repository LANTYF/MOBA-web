import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'
import Home from '../views/Home.vue'
import Article from '../views/Article.vue'
import Hero from '../views/Hero.vue'
import HeroDetail from '../views/HeroDetail.vue'
// const Home = () => import('../views/Home.vue')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'main',
    component: Main,
    children: [
      {
        path: '/',
        name: 'home',
        component: Home
      },
      {
        path: '/articles/:id',
        name: 'articles',
        component: Article,
        props: true
      }
    ]
  },
  {
    path: '/heroes/:id',
    name: 'heroes',
    component: Hero,
    props: true,
    children: [
      {
        path: '/heroes/:id',
        name: 'herodetail',
        component: HeroDetail
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
