import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
  path: '/',
  redirect: "/home",
  component: () => import('../layout/PageLayout.vue'),
  children: [{
    path: '/home',
    name: 'home',
    component: () => import('../views/HomeView/HomeView.vue')
  }, {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue')
  }, {
    path: '/edit',
    name: 'edit',
    component: () => import('../views/EditView/EditView.vue')
  }, {
    path: '/search',
    name: 'search',
    component: () => import('../views/SearchView/SearchView.vue')
  }, {
    path: '/userInfo',
    name: 'userInfo',
    component: () => import('../views/InfoView/InfoView.vue')
  }, {
    path: '/article',
    name: 'article',
    component: () => import('../views/ArticleView/Article.vue')
  }, {
    path: '/article/:articleId', // 使用:articleId来捕获文章ID
    name: 'articleInfo',
    component: () => import('../views/ArticleView/component/ArticleInfo.vue'),
  }, {
    path: '/faq',
    name: 'faq',
    component: () => import('../views/CommentView/FaqView.vue')
  }, {
    path: '/faq/:faqId',
    name: 'faqInfo',
    component: () => import('../views/CommentView/component/AnswerList.vue'),
  }, {
    path: '/faq/question/add',
    name: 'addQuestion',
    component: () => import('../views/CommentView/component/EditQuestion.vue'),
  }, {
    path: '/faq/answer/add/:faqId',
    name: 'addAnswer',
    component: () => import('../views/CommentView/component/EditAnswer.vue'),
  }, ]
}, {
  path: '/login',
  name: 'login',
  component: () => import('../views/LoginView/LoginView.vue')
}, {
  path: '/register',
  name: 'register',
  component: () => import('../views/RegisterView/RegisterView.vue')
}]

const router = new VueRouter({
  routes
})

export default router