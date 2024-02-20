import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentWeek: new Date(),
  },
  mutations: {
    setCurrentWeek(state, newDate) {
      state.currentWeek = newDate;
    },
  },
  actions: {
    prevWeek({ commit, state }) {
      const newDate = new Date(state.currentWeek);
      newDate.setDate(newDate.getDate() - 7);
      commit('setCurrentWeek', newDate);
    },
    nextWeek({ commit, state }) {
      const newDate = new Date(state.currentWeek);
      newDate.setDate(newDate.getDate() + 7);
      commit('setCurrentWeek', newDate);
    },
    resetToCurrentWeek({ commit }) {
      commit('setCurrentWeek', new Date());
    }
  },
  getters: {
    currentWeek: state => state.currentWeek,
  },
});
