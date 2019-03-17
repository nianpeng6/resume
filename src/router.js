import Vue from 'vue'
import Router from 'vue-router'
import HelloContainer from "./components/HelloWorld.vue"
import Test from './components/Test'
import list from './components/listContainer.vue'
import home from './components/tabbar/Home.vue'
import newslist from './components/news/NewsList.vue'
import newsinfo from './components/news/NewsInfo.vue'
import goodslist from './components/good/GoodsList.vue'
import goodsinfo from './components/good/Goodsinfo.vue'
import login from './components/login/Login.vue'
import cart from './components/tabbar/Cart.vue'
import search from './components/tabbar/Search.vue'
Vue.use(Router)


export default new Router({
  routes: [
    { path: '/', redirect: '/home' },
    { path: '/test', component: Test },
    { path: '/list', component: list },
    { path: '/home', component:home },
    { path: '/newslist', component: newslist },
    { path: '/newsinfo', component: newsinfo },
    { path: '/goodslist', component: goodslist },
    { path: '/goodsinfo/:id', component: goodsinfo },
    { path: '/login', component: login },
    { path: '/cart', component: cart },
    { path: '/search', component: search },

  ]
})
