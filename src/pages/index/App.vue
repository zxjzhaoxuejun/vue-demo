<template>
  <div id="app">
    <div id="nav">
      <router-link to="/" v-log="{caption:'登录页', paras: '用户点击验证码发送'}">Home</router-link>|
      <router-link to="/vuex">Vuex</router-link>|
      <a href="../../../public/detailsPage.html">About</a>
    </div>
    <router-view />
    <!-- <div v-log v-for="item in list" :key="item.id" :data-dot="item.id" :name="item.name">{{item.id}}</div>
    <div v-log data-dot="第二个点" name="测试">测试</div>-->
  </div>
</template>
<script>
export default {
  data() {
    return {};
  }
};
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
