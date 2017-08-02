let state = {
  height: document.documentElement.scrollHeight + 'px',
  total: 1,
  list: [],

};

let getters = {};

let mutations = {
  height: state => state.height = document.documentElement.scrollHeight + 'px',
  totalChange (state, total) {
    state.total = total
  },
  listChange (state, list) {
    state.list = list
  },


};

let actions = {};

export default {
  state,
  getters,
  mutations,
  actions
}
