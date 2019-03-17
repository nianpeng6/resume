<template>
  <div class='app-goodslist'>
    <div class='goods-item' v-for='item in list' :key='item.id'>
      <img :src="item.img_url" alt="" @click='jumpDetail' :data-id='item.id'/>
      <h3 class='title'>{{item.title}}</h3>
      <div class='info'>
        <div class='price'>
          <span class='now'>{{item.now}}</span>
          <span class='old'>{{item.old}}</span>
        </div>
      </div>
      <div class='sell'>
        <span>热卖中</span>
        <span>剩 1 件</span>
      </div>
    </div>
  </div>
</template>
<script>
   export default{
     data(){
       return{
        list:[]
       }
     },
     created(){
       this.getMore()
     },
     methods:{
       getMore(){
         var url='goodsList';
         this.$http.get(url).then(result=>{
           this.list=result.body;
           console.log(this.list);
         })
       },
    jumpDetail(even){
      //获取商品编号
      var id=even.target.dataset.id;
      this.$router.push('/goodsinfo/'+id);
    }
     }
   }
</script>
<style scoped>
.app-goodslist{
  display: flex;
  flex-wrap:wrap;
  justify-content: space-between;
  padding:7px;
}
.app-goodslist .goods-item{
  width:49%;
  border:solid 1px #ccc;
  box-shadow:0 0 8px #ccc;
  margin:4px 0;
  padding:2px;
  display: flex;
  flex-direction: column;
  min-height:210px;
  justify-content: space-between;
}
.app-goodslist .goods-item h3{
  font-size:18px;
}
.app-goodslist .goods-item img{
  width:100%;
}
.app-goodslist .goods-item .now{
  color:red;
  font-weight: bold;
  font-size: 16px;
}
.app-goodslist .goods-item .old{
  font-size:12px;
  text-decoration: line-through;
}
</style>
