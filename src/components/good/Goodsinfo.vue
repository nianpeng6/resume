<template>
  <div class='app-info'>
    <div class="mui-card">
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<mt-swipe></mt-swipe>
					</div>
				</div>
			</div>
       <div class="mui-card" style='margin-top:10px'>
				<div class="mui-card-header">
           <h4>要购买的商品</h4>
        </div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
             <p class='price'>
               市场价:<del>2999.00</del> &nbsp;
             <span class='now'>销售价:2111.00</span>
             </p>
             <h5>购买数量:</h5>
           <div class="mui-numbox">
                <button class="mui-btn mui-btn-numbox-minus" type="button" @click='goodSub' >-</button>
                <input class="mui-input-numbox" type="number" value='1' v-model="val"/>
                <button class="mui-btn mui-btn-numbox-plus" type="button" @click="goodAdd" >+</button>
				   </div>
					</div>
          <div class="mui-card-footer">
             <mt-button type='primary' size='small'>立即购买</mt-button>
            &nbsp; &nbsp;
            <mt-button type='danger' size='small' @click='addCart'>加入购物车</mt-button>
          </div>
				</div>
			</div>
       <div class="mui-card " style='margin-top:10px'>
				<div class="mui-card-header">
           <h4>商品参数</h4>
        </div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
            <p>商品货号: <span>11</span></p>
            <p>商品货号: <span>11</span></p>
            <p>商品货号: <span>11</span></p>
            <p>商品货号: <span>11</span></p>
					</div>
				</div>
				<div class="mui-card-footer">
          <mt-button>图文介绍</mt-button>
          <mt-button>商品评论</mt-button>
        </div>
			</div>
  </div>
</template>
<script>
  import swipe from '../sub/swipe.vue'
  import {Toast} from 'mint-ui'
 //  import mui from '../../lib/mui/js/mui.js'
  export default{
    data(){
      return {
        val:1,
        nid:this.$route.params.id,
      }
    },
    methods:{
      goodAdd(){
      if(this.val<99){this.val++}
    },
    goodSub(){
      if(this.val>1){this.val--}
    },
    addCart(){
      var pid=this.nid;
      var count=this.val;
      var uid=3;
      var url='http://127.0.0.1:3000/addCart';
      var param=`uid=${uid}&pid=${pid}&count=${count}`
      console.log(url+'?'+param);
      this.axios.get(url+'?'+param).then(result=>{
        if(result.data.code==1){
          console.log(result);
          this.$store.commit('increment',count);
          Toast('加入购物车成功')
        }else{
          Toast('加入购物车失败')
        }
      })
    },
    },
    created(){
      console.log(this.$route.params.id);

    },
    components:{
      'mt-swipe':swipe
    },

  }
</script>
<style scoped>

</style>
