<template>
  <el-aside :width="isCollapse ? 'auto':'200px'">
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      background-color="#304057"
      text-color="#fff"
      active-text-color="#406794"
      unique-opened
      :collapse='isCollapse'
      :collapse-transition='false'
    >
      <el-submenu
        :index="item.id+''"
        v-for="item in menuList"
        :key="item.id"
      >
        <template slot="title">
          <i :class="iconObj[item.id]"></i>
          <span>{{item.authName}}</span>
        </template>

        <el-menu-item
          :index="subItem.id+''"
          v-for="subItem in item.children"
          :key="subItem.id"
        >
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span>{{subItem.authName}}</span>
          </template>
        </el-menu-item>
      </el-submenu>

    </el-menu>
  </el-aside>
</template>

<script>
export default {
  name: "HomeAside",
  data () {
   return {
     iconObj:{
      '125':'iconfont icon-yonghuguanli',
      '103':'iconfont icon-quanxian',
      '101':'iconfont icon-shangpin1',
      '102':'iconfont icon-fl-dingdan',
      '145':'iconfont icon-shujutongji1'
     },
     isCollapse:false
   }
  },
   methods:{},
   props: {
     menuList:{
       type:Array,
       default(){
         return []
       }
     }
   }
}
</script>

<style scoped>
.el-aside {
  background-color: #304057;
}
.el-menu {
  border-right: 1px solid #304057;
}
.iconfont {
  margin-right: 10px;
  margin-left: 3px;
}
</style>