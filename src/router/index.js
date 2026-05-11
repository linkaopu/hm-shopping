import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../views/layout/Index.vue'
import store from '@/store'
import Home from '../views/layout/Home.vue'
import { Toast } from 'vant'

Vue.use(VueRouter)

const authPath = ['/pay', '/myorder']

const router = new VueRouter({
  routes: [
    {
      path: '/',
      component: Layout,
      redirect: '/home',
      children: [
        {
          path: '/home',
          component: Home
        },
        {
          path: '/category',
          component: () => import('../views/layout/Category.vue')
        },
        {
          path: '/cart',
          component: () => import('../views/layout/Cart.vue')
        },
        {
          path: '/user',
          component: () => import('../views/layout/User.vue')
        }
      ]
    },
    {
      path: '/search',
      component: () => import('../views/search/Index.vue')
    },
    {
      path: '/searchlist',
      component: () => import('../views/search/List.vue')
    },
    {
      path: '/myorder',
      component: () => import('../views/myOrder/Index.vue')
    },
    {
      path: '/pay',
      component: () => import('../views/pay/Index.vue')
    },
    {
      path: '/prodetail/:id',
      component: () => import('../views/prodetail/Index.vue')
    },
    {
      path: '/login',
      component: () => import('../views/login/Index.vue')
    }
  ]
})

// 解决重复点击路由报错问题
const originalPush = router.push
router.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

const originalReplace = router.replace
router.replace = function replace (location) {
  return originalReplace.call(this, location).catch(err => err)
}

router.beforeEach((to, from, next) => {
  if (!authPath.includes(to.path)) {
    next()
    return
  }
  const token = store.getters.token

  if (token) {
    next()
  } else {
    Toast('请先登录')
    router.replace('/login')
  }
})

export default router
