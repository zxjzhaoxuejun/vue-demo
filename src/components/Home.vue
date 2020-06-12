<template>
  <div>
    <div @click="btn">GET</div>
    <br />
    <div @click="postbtn">POST</div>

    <div v-log v-for="item in list" :key="item.id" :data-dot="item.id" :name="item.name">{{item.id}}</div>
    <div v-log data-dot="第二个点" name="测试">测试</div>
  </div>
</template>

<script>
import apiAxios from "./../network/axios";
import "./../../public/mock";
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
  },
  mounted() {
    // console.log(xxx);
  },
  methods: {
    btn() {
      apiAxios({
        type: "GET",
        url: "/v2/movie/coming_soon",
        data: {
          start: 1,
          count: 2
        },
        loading: true
      })
        .then(res => {
          console.log(res);
        })
        .catch(e => {
          console.log(e);
        });
    },
    postbtn() {
      apiAxios({
        type: "POST",
        url: "/user/list"
        // data: {
        //   start: 1,
        //   count: 2
        // }
      }).then(res => {
        console.log(res);
      });
    }
  }
};
</script>

<style scoped>
</style>
