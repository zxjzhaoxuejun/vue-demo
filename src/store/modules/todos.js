const state = {
  todos: [{
      id: 1,
      title: 'todo item 1',
      completed: true
    },
    {
      id: 2,
      title: 'todo item 2',
      completed: true
    }
  ]
};

const getters = {
  completedTodos: state => {
    return state.todos.filter(todo => todo.completed);
  },
  completedTodosCount: (state, getters) => {
    return getters.completedTodos.length;
  }
};

const mutations = {
  setTodos: (state, todos) => (state.todos = todos)
};

const actions = {
  async fetchTodos({
    commit
  }) {
    commit('setTodos', [{
      id: 3,
      title: 'todo item 3',
      completed: true
    }]);
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};