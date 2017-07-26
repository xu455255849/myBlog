let state = {
  heightInner: document.documentElement.clientHeight + 'px',
  heightPatient: document.documentElement.clientHeight - 340 + 'px',
  patientOneSum: '',
  patientTwoSum: '',
  patientThreeSum: '',
  patientFourSum: '',
  patientFiveSum: '',
  count: '',

}

let getters = {}

let mutations = {
  comInner: state => state.heightInner = document.documentElement.clientHeight + 'px',
  comPatient: state => state.heightPatient = document.documentElement.clientHeight - 340 + 'px',
  patientOneSum (state, sum) {
    state.patientOneSum = sum
  },
  patientTwoSum (state, sum) {
    state.patientTwoSum = sum
  },
  patientThreeSum (state, sum) {
    state.patientThreeSum = sum
  },
  patientFourSum (state, sum) {
    state.patientFourSum = sum
  },
  patientFiveSum (state, sum) {
    state.patientFiveSum = sum
  },
  count (state, sum) {
    state.count = sum
  }

}

let actions = {}

export default {
  state,
  getters,
  mutations,
  actions
}
