const state = {
  //要设置的全局访问的state对象
  count: 0,
};
const getters = {
  //实时监听state值的变化
  //getters = 》getters 和 组件的 computed 类似， 方便直接生成一些可以直接用的数据。 
  //当组装的数据要在多个页面使用时， 就可以使用 getters 来做
  getCount(state) { //承载变化的 count 的值
    return state.count
  }
};
const mutations = {
  addCount(state) {
    state.count++
  },

  delCount(state) {
    if (state.count > 0) {
      state.count--;
    } else {
      state.count = 0;
    }
  }
};
const actions = {
  //Action 类似于 mutation，不同在于：
  //Action 提交的是 mutation， 而不是直接变更状态。
  //Action 可以包含任意异步操作。
  getAddCount(context) {
    context.commit('addCount');
  },
  getDelCount(context) {
    context.commit('delCount');
  },
};

export default {
  actions,
  state,
  mutations,
  getters
}