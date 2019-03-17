<template>
 <div class='app-search'>
   <div class="mui-card">
				<div class="mui-card-header">
          <input type="text" name='keyword' value='' placeholder='关键字' v-model="keyword">
				</div>
        <div class="mui-card-header">
          <input type="number" name='low' placeholder='下限' v-model="low">
        </div>
        <div class="mui-card-header">
          <input type="number" name='high' placeholder='上限' v-model="high">
        </div>
        <div class="mui-card-header">
          <mt-button type='danger' size='small' @click="handleSearch">搜索</mt-button>
        </div>
				<div class="mui-card-content"  v-for="(item,i) in list" :key='item.lid'>
					<div class="mui-card-content-inner">
            <p>商品编号: {{i+1}}</p>
            <p>商品名称: {{item.lname}}</p>
            <p>商品价格: {{item.price}}</p>
					</div>
				</div>
				<div class="mui-card-footer">页脚</div>
		</div>
 </div>
</template>
<script>
export default {
  data(){
    return{
      keyword:'',
      low:0,
      high:0,
      list:[]
    }
  },
  methods:{
    handleSearch(){
      var keyword=this.keyword;
      var low=this.low;
      var high=this.high
      if(high==''){
        high=210000000
      }
      if(low==''){
        low=0;
      }
      var url='http://127.0.0.1:3000/Search?keyword='+keyword+'&low='+low+'&high='+high;
      console.log(url);
      this.axios.get(url).then(result=>{
        this.list=result.data.data;
      })
    }
  }
}
</script>
<style scoped>

</style>
