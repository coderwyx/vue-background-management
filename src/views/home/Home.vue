<template>

  <el-container class="home_comtainer">
    <HomeAside
      ref="homeAside"
      :menuList='menuList'
    ></HomeAside>
    <el-container class="headerMainContainer">
      <HomeHeader @toggleCollapse='toggleCollapse'></HomeHeader>
      <HomeMain></HomeMain>
    </el-container>
  </el-container>

</template>

<script>
import HomeHeader from "./childComps/HomeHeader.vue";
import HomeAside from "./childComps/HomeAside.vue";
import HomeMain from "./childComps/HomeMain.vue";

import { getMenuList } from "network/home.js";
export default {
  name: "Home",
  data() {
    return {
      menuList: [],
    };
  },
  methods: {
    loginOut() {
      window.sessionStorage.clear("token");
      this.$router.push("/login");
    },
    getMenuList() {
      getMenuList().then((res) => {
        if (res.meta.status != 200) {
          return this.$message.error(res.meta.msg);
        }
        this.menuList = res.data;
        console.log(this.menuList);
      });
    },
    toggleCollapse() {
      console.log(this.$refs.homeAside);
      this.$refs.homeAside.isCollapse = !this.$refs.homeAside.isCollapse;
    },
  },
  components: {
    HomeHeader,
    HomeAside,
    HomeMain,
  },
  created() {
    this.getMenuList();
  },
};
</script>

<style lang='less' scoped>
.home_comtainer {
  height: 100%;
}

.headerMainContainer {
  display: flex;
  flex-direction: column;
}
</style>