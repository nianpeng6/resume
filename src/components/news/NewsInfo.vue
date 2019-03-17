<template>
  <div class="app-newsinfo">
    <h3>{{info.title}}</h3>
    <textarea>{{info.content}}</textarea>
    <h3>{{info.ctime | datatime}}</h3>
    <h3>点击：{{info.point}}次</h3>
   <!-- 新闻评论子组件 -->
   <comment-box :id='id'></comment-box>
  </div>
</template>
<script>
 //1  引入子组件
 import comment from '../sub/comment.vue'

  export default{
    created() {
      //console.log(this.$route.query.id);
      this.getNewsInfo();
    },
    data(){
      return {
        id:this.$route.query.id,
        info:{}
      }
    },
    methods:{
      getNewsInfo(){
        var id=this.$route.query.id;
        this.$http.get("NewsInfo?id="+id).then(result=>{
          //console.log(result.body.data[0]);
          this.info=result.body.data[0];
        })
      }
    },
    //2 注册子组件
    components:{
      'comment-box':comment
    }
  }
</script>
<style scoped>
textarea{
  height:200px;
}
h3~h3{
  color:#226aff;
  font-size:12px;
}
</style>
