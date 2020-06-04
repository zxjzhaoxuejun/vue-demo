<template>
  <div>
    <div @click="btn">GET</div>
    <br />
    <div @click="postbtn">POST</div>
  </div>
</template>

<script>
import apiAxios from "./../network/axios";
export default {
  data() {
    return {
      msg: ""
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
        url: "/v2/movie/coming_soon",
        data: {
          start: 1,
          count: 2
        }
      }).then(res => {
        console.log(res);
      });
    }
  }
};
</script>

<style scoped>
</style>
