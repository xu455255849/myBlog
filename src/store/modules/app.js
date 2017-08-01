let state = {
  heightInner: document.documentElement.clientHeight + 'px',
  heightPatient: document.documentElement.clientHeight - 340 + 'px',
  total: 1,
  list: [],
  activeId: 1

};

let getters = {};

let mutations = {
  comInner: state => state.heightInner = document.documentElement.clientHeight + 'px',
  comPatient: state => state.heightPatient = document.documentElement.clientHeight - 340 + 'px',
  totalChange (state, total) {
    state.total = total
  },
  listChange (state, list) {
    state.list = list
  },
  menuChange (state, id) {
    state.activeId = id
  }


};

let actions = {};

export default {
  state,
  getters,
  mutations,
  actions
}
