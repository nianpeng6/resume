<template>
  <div class='app-home'>
    <!--2: 轮播 -->
    <mt-swipe :auto='4000'>
      <mt-swipe-item v-for='item in list' :key='item.id'>
        <img :src="item.img_url" />
      </mt-swipe-item>
    </mt-swipe>
    <!--3: 九宫格 -->
    <ul class="mui-table-view mui-grid-view mui-grid-9">
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link  to='/newslist'>
          <img src="../../img/menu1.png" alt="">
          <div class="mui-media-body">新闻资讯</div>
        </router-link></li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
          <img src="../../img/menu2.png" alt="">
          <div class="mui-media-body">点餐</div>
        </a></li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/goodslist">
          <img src="../../img/menu3.png" alt="">
          <div class="mui-media-body">商品</div>
        </router-link></li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
          <img src="../../img/menu4.png" alt="">
          <div class="mui-media-body">location</div>
        </a></li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
          <img src="../../img/menu5.png" alt="">
          <div class="mui-media-body">Search</div>
        </a></li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
          <img src="../../img/menu6.png" alt="">
          <div class="mui-media-body">Phone</div>
        </a></li>
    </ul>

    <!--4: tabbar -->

  </div>
</template>
<script>
  export default{
    created() {
      this.getImages();
    },
    methods:{
      getImages(){
        this.$http.get('imagelist').then(result=>{
         /*  console.log(result.body); */
          this.list=result.body;
        })
      }
    },
    data(){
      return{
         list:[]
      }

    }
  }
</script>
<style>
.app-home .mint-swipe {
  height: 200px;
}
.app-home .mint-swipe img {
  width: 100%;
  height: 200px;
}
ul{
  background:#fff !important;
}
li img{
    width:50%;
  }
ul li{
  border:0px !important;
}
</style>