<template>
  <div id="test-ka">
    <h3>国际化翻译</h3>
    <el-menu
      default-active="1"
      class="el-menu-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      mode="horizontal"
    >
      <el-menu-item index="1">{{$t("music")}}</el-menu-item>
      <el-menu-item index="2">{{$t("findMusic")}}</el-menu-item>
      <el-menu-item index="3">{{$t("myMusic")}}</el-menu-item>
      <el-menu-item index="4">{{$t("friend")}}</el-menu-item>
      <el-menu-item index="5">{{$t("musician")}}</el-menu-item>
      <el-menu-item index="6">{{$t("download")}}</el-menu-item>
    </el-menu>
    <p>
      <el-button @click="changeType('zh')">切换中文</el-button>
      <el-button @click="changeType('en')">切换英文</el-button>
    </p>
  </div>
</template>
<script>
import Vue from "vue";
import { Menu, MenuItem, Button } from "element-ui";
Vue.use(Menu);
Vue.use(MenuItem);
Vue.use(Button);

export default {
  date() {
    return {};
  },
  methods: {
    changeType(type) {
      console.log(type);
      // 此处做了语言选择记录
      localStorage.setItem("locale", type);
      // 修改显示语言
      this.$i18n.locale = type;
    }
  }
};
</script>