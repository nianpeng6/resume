<template>
 <div class="app-container">
   <!-- 1:加载学子商城顶导航栏 -->
    <mt-header fixed title='学子商城'></mt-header>
   <!-- 2:router-view -->
   <router-view></router-view>
   <!-- 3:tabbar -->
    <nav class="mui-bar mui-bar-tab">
			<a class="mui-tab-item mui-active" href="#tabbar">
				<span class="mui-icon mui-icon-home"></span>
				<router-link to='/' class="mui-tab-label">首页</router-link >
			</a>
			<a class="mui-tab-item" href="#tabbar-with-chat">
				<span class="mui-icon mui-icon-contact"></span>
				<span class="mui-tab-label">会员</span>
			</a>
			<router-link class="mui-tab-item" to='/cart'>
				<span class="mui-icon mui-icon-extra mui-icon-extra-cart">
          <span class='mui-badge'>{{$store.getters.optCartCount}}</span></span>
			  	<span  class="mui-tab-label">购物车 </span>
			</router-link>
			<router-link class="mui-tab-item" to="/search">
				<span class="mui-icon mui-icon-search"></span>
				<span class="mui-tab-label">搜索</span>
			</router-link>
    </nav>
 </div>
</template>

<style>
   .app-container{
     padding-top:40px;
     padding-bottom:50px;
     overflow-x:hidden;
   }

</style>
