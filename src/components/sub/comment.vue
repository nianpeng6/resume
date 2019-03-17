<template>
   <div class='app-comment'>
     <h4>评论子组件</h4>
     <!-- 发表评论区域 -->
     <textarea maxlength="120"  placeholder="请吐槽最多120个字" v-model="msg"></textarea>
     <mt-button size='large' @click='postComment' >发表评论</mt-button>
     <!-- 显示评论区域 -->
     <div class='cmt-list'>
        <div class='cmt-item' v-for='(item,i) in list' :key='item.id'>
          <div class='cmt-info'>
             第{{i+1}}楼: 用户名:{{item.user_name}}
             发表时间:{{item.ctime | datatime}}
             <div class='cmt-body'>
               {{item.content}}
             </div>
          </div>
        </div>
     </div>
     <mt-button size='large' @click='getMore'>加载更多</mt-button>
   </div>
</template>
<script>
//单独引用   组件Toast其他的不用
import  {Toast} from 'mint-ui';

  export default{
    data(){
        return{
        list:[],
        pno:0,
        pageSize:7,
        pageCount:1,
        msg:''    //评论内容的双向绑定
      }
    },
    created(){
      this.getMore()
    },
    methods:{
      getMore(){
        //发送请求获取评论列表
        var nid=this.id;
        this.pno++;
        var  pno=this.pno;
        var pageSize=this.pageSize;
        var url='getcomment?pno='+pno+'&nid='+nid+'&pageSize='+pageSize;
        this.$http.get(url).then(result=>{
          console.log(result.body);
          //将查询数据追加到list数字
          var rows=this.list.concat(result.body.data);
          this.list=rows;
        })
        //追加list
        //在模板中创建循环显示当前评论
        //楼层
        //在模板中[添加]加载更多按钮
        //点击事件
      },
      postComment(){
        /*1: 获取用户输入的内容,新闻编号,用户名 */
        var msg=this.msg;    //评论内容
        var nid=this.id;      //父元素传递的新闻编号
        //var user_name='匿名';
        //2:判断如果用户输入内容为空   提示不能为空
        var size=msg.trim().length;
        if(size==0){
          Toast('评论内容不能为空');
          return;   //停止函数执行
        }
        //3:  发送post请求
       /*  var url='addComment';
        var obj={nid:nid,user_name:user_name,content:msg};
        this.$http.post(url,obj).then(result=>{
           var obj=result.body;
           //4:   成功提示发表成功
           if(obj.code==1){
              Toast('评论发表成功');
              this.pno=0;
              this.list=[];
              this.getMore();
           }else{
             Toast('评论发表失败')
           }
       }) */
       var url = "http://127.0.0.1:3000/addComment";
       var param=`nid=${nid}&content=${msg}`
       this.axios.post(url,param).then(result=>{
          if(result.data.code==1){
            Toast('评论成功');
            this.pno=0;
            this.list=[];
            this.getMore();
          }else{
            Toast('评论发表失败')
          }
       });
      }
    },
    props:['id']
  }
</script>
<style scoped>
  h4{
    font-size:14px;
  }
  textarea{
    height:80px;
    font-size:14px;
    margin:0;
  }
  .cmt-list{
    margin:5px 0;
  }
  .cmt-item{
    border:solid 1px #aaa;
    margin-top:15px;
  }
  .cmt-info{
    line-height: 40px;
    background:#337799;
  }
</style>
