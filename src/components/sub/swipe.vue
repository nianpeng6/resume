<template>
  <div class="app-swipe">
      <!--2: 轮播 -->
    <mt-swipe :auto='3000'>
      <mt-swipe-item v-for='item in list' :key='item.id'>
        <img :src="item.img_url" />
      </mt-swipe-item>
    </mt-swipe>
  </div>
</template>
<script>
  export default{
    created() {
      this.getImages();
    },
    methods:{
      getImages(){
        var url='http://127.0.0.1:3000/imagelist'
        this.$http.get(url).then(result=>{
         /*  console.log(result.body); */
          this.list=result.body;
        })
      }
    },
    data(){
      return{
         list:[]
      }
    },
    /*  props:['list'] */
  }
</script>
<style scoped>
.mint-swipe {
  height: 200px;
}
.mint-swipe img {
  width: 100%;
  height: 200px;
}
</style>
