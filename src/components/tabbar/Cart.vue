<template>
  <div class="app-cart">
    <div class="mui-card">
      <div class="mui-card-header">
        商品列表
      </div>
      <div class="mui-card-content" v-for="item in list" :key='item.iid'>
        <div class="mui-card-content-inner">
          <ul class="mui-table-view">
            <li class="mui-table-view-cell mui-media">
              <a href="javascript:;">
                <img class="mui-media-object mui-pull-left" src="img/3.jpg">
                <div class="mui-media-body">
                  {{item.lname}}
                  <p class='mui-ellipsis'><span class='price'>单价: {{item.price}}</span>
                    <span class='count'>
                       <div class="mui-numbox">
                      <button class="mui-btn mui-btn-numbox-minus" type="button" @click='cartSub' :data-iid='item.iid'>-</button>
                      <input class="mui-input-numbox" type="number" :value='item.count' />
                      <button class="mui-btn mui-btn-numbox-plus" type="button" @click='cartAdd' :data-iid='item.iid' >+</button>
				            </div>
                    </span>
                  </p>
                </div>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div class="mui-card-footer">
        合计:{{getSubTotal}}
      </div>
    </div>
  </div>
</template>
<script>
import {Toast} from 'mint-ui'
export default {
  data() {
    return {
      list:[]
    };
  },
   created(){
    this.getMore()
  },
  methods:{
    updataCart(iid,count){
      var url='http://127.0.0.1:3000/updateCart?count='+count+'&iid='+iid;
      this.axios.get(url).then(result=>{
        if(result.data.code==1){
          Toast(result.data.msg)
        }else{
          Toast(result.data.msg)
        }
      })
    },
    getMore(){
      var url='http://127.0.0.1:3000/getCarts?uid=3'
      this.axios.get(url).then(result=>{
        this.list=result.data.msg;
      });
      },
       cartSub(e){
        var iid=e.target.dataset.iid;
        for(var item of this.list){
          if(item.iid==iid && item.count>1){
            item.count--;
            this.updataCart(iid,item.count)
            break
          }
        }
      },
      cartAdd(e){
        var iid=e.target.dataset.iid;
        for(var item of this.list){
          if(item.iid==iid && item.count<99){
            item.count++;
            this.updataCart(iid,item.count)
            break
          }
        }
      },
  },
  computed:{
    getSubTotal:function(){
      //计算购物车内所有商品的价格和
      var sum=0;
      for(var item of this.list){
        sum+=item.price*item.count
      }
      return sum;
    }
  },
};
</script>
<style scoped>
</style>

