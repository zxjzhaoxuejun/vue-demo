<template>
  <div>
    <h2>我是从state上获得的{{this.$store.state.count.count}}</h2>
    <h2>我是从getters上获得的{{this.$store.getters.getCount}}</h2>
    <h2>我是从...mapState拓展上获得的{{count1}}</h2>
    <h2>我是从...mapGetter上获得的{{getCount}}</h2>

    <button @click="add">+</button>
    <button @click="del">-</button>

    <!-- fetchTodos -->
    <br />
    <br />
    <div v-for="item in completedTodos" :key="item.id">
      <p>{{item.id}}--{{item.title}}</p>
    </div>
    <p>总数据：{{completedTodosCount}}</p>
    <button @click="fetchTodos">更新数据</button>
  </div>
</template>

<script>
//如果我们不喜欢这种在页面上使用“this.$stroe.state.count”和“this.$store.dispatch('funName')”这种很长的写法
//辅助函数 mapState、mapGetters、mapActions
import { mapState, mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      msg: ""
    };
  },
  computed: {
    //通过配合...拓展符号
    ...mapState({
      count1: state => state.count.count
    }),
    ...mapGetters(["getCount", "completedTodos", "completedTodosCount"])
  },
  methods: {
    ...mapActions(["getAddCount"]),
    add() {
      // this.$store.commit("addCount");
      //把commit提交mutations修改为使用dispatch来提交actions
      // this.$store.dispatch("getAddCount");
      this.getAddCount();
    },

    del() {
      // this.$store.commit("delCount");
      //把commit提交mutations修改为使用dispatch来提交actions
      this.$store.dispatch("getDelCount");
    },
    fetchTodos() {
      this.$store.dispatch("fetchTodos");
    }
  }
};
</script>

<style scoped>
</style>
