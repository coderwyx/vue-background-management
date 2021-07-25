<template>
    <el-aside :width="isCollapse ? '64px':'200px'">

      <el-menu
        background-color="#304057"
        text-color="#fff"
        active-text-color="#406794"
        unique-opened
        :collapse='isCollapse'
        :collapse-transition='false'
        router
        :default-active='$route.path'
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
            :index="'/'+subItem.path"
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
  data() {
    return {
      iconObj: {
        125: "iconfont icon-yonghuguanli",
        103: "iconfont icon-quanxian",
        101: "iconfont icon-shangpin1",
        102: "iconfont icon-fl-dingdan",
        145: "iconfont icon-shujutongji1",
      },
      isCollapse: false,
    };
  },
  methods: {
    changes(){

    }
  },
  props: {
    menuList: {
      type: Array,
      default() {
        return [];
      },
    },
  },
 
};
</script>

<style scoped>
.test1{
  width: 64px;
  background-color: red;
}
.test2{
  width: 200px;
}
.el-aside {
  background-color: #304057;
  transition: all 1s ease;
}
.el-menu {
  border-right: 1px solid #304057;
}
.iconfont {
  margin-right: 10px;
  margin-left: 3px;
}
</style>