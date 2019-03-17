<template>
  <div>
    <h1>显示data中用户列表</h1>
    <ul>
      <li v-for='item in list' :key='item.uid'>
        {{item.uid}}{{item.name}}
      </li>
    </ul>
  </div>
</template>
<script>
  export default{

    data(){
       return{
          list:[
          {uid:1,name:'tom'},
          {uid:2,name:'jerry'},
          {uid:3,name:'james'}
          ]
  }
 }
}
</script>
<style>

</style>