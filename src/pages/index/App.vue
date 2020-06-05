<template>
  <div id="app">
    <div id="nav">
      <router-link to="/" v-log="{caption:'登录页', paras: '用户点击验证码发送'}">Home</router-link>|
      <router-link to="/vuex">Vuex</router-link>|
      <a href="../../../public/detailsPage.html">About</a>
    </div>
    <router-view />
    <div v-log v-for="item in list" :key="item.id" :data-dot="item.name">{{item.id}}</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      list: [
        { id: 1, name: "123" },
        { id: 2, name: "1234" },
        { id: 3, name: "1243" },
        { id: 4, name: "1423" },
        { id: 5, name: "1423" },
        { id: 6, name: "12453" },
        { id: 7, name: "1523" },
        { id: 8, name: "12533" },
        { id: 9, name: "143423" },
        { id: 11, name: "43433123" },
        { id: 12, name: "12433" },
        { id: 13, name: "13dad423" },
        { id: 14, name: "13ds5323" },
        { id: 15, name: "12d3" },
        { id: 16, name: "12ds3" },
        { id: 17, name: "12ds3" },
        { id: 18, name: "1dq23" },
        { id: 19, name: "12w3" },
        { id: 20, name: "12wq3" },
        { id: 39, name: "143423" },
        { id: 3311, name: "43433123" },
        { id: 312, name: "12433" },
        { id: 313, name: "13dad423" },
        { id: 314, name: "13ds5323" },
        { id: 315, name: "12d3" },
        { id: 316, name: "12ds3" },
        { id: 317, name: "12ds3" },
        { id: 318, name: "1dq23" },
        { id: 319, name: "12w3" },
        { id: 320, name: "12wq3" }
      ]
    };
  }
};
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
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
