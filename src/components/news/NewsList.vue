<template>
  <div class='app-newslist'>
    <ul class="mui-table-view">
				<li class="mui-table-view-cell mui-media" v-for='item in list' :key='item.id'>
					<router-link :to="'/newsinfo?id='+item.id">
						<img class="mui-media-object mui-pull-left" :src="item.img_url">
						<div class="mui-media-body">
							{{item.title}}
							<p class='mui-ellipsis'>
              <span>{{item.ctime | datatime}} </span>
              <span> 点击:{{item.point}}</span>
              </p>
						</div>
					</router-link>
				</li>
			</ul>
      <mt-button type='primary' size='large' @click='getMore'>加载更多</mt-button>
  </div>
</template>
<script>
 export default{
   data(){
     return{
       list:[],
       pno:0,
       pageSize:7,
       pageCount:1
     }
   },
  methods:{
    getMore(){
      this.pno++;
      var hasMore=this.pno<=this.pageCount
      if(!hasMore){return}
      //发送请求获取分页数据
      var url='newslist?pno='+this.pno+'&pageSize='+this.pageSize;
      this.$http.get(url).then(result=>{
        /* this.list=result.body.data */
        var rows=this.list.concat(result.body.data);
        this.list=rows;
        //保留总页数
        this.pageCount=result.body.pageCount
      })
    },
  },
  created() {
    this.getMore();
  },
 }
</script>
<style>
.mui-media-body p{
  display: flex;
  font-size: 12px;
  color: #226aff;
  justify-content:space-between;
}
</style>
