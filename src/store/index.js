import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentWeek: new Date(),
    reservations: [],
    rooms:[]
  },
  mutations: {
    setCurrentWeek(state, newDate) {
      state.currentWeek = newDate;
    },
    setReservations(state, reservations) {
      state.reservations = reservations;
    },
    setRooms(state, rooms) {
      state.rooms = rooms;
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
    },
    async fetchReservations({ commit }) {
      try {
        const response = await axios.get('http://localhost:3000/reservations'); 
        commit('setReservations', response.data);
      } catch (error) {
        console.error('Error fetching reservations:', error);
      }
    },
    async fetchRooms({ commit }) {
      try {
        const response = await axios.get('http://localhost:3000/rooms'); 
        commit('setRooms', response.data);
      } catch (error) {
        console.error('Error fetching rooms:', error);
      }
    },
  },
  getters: {
    currentWeek: state => state.currentWeek,
    reservations: state => state.reservations,
    rooms:state => state.rooms
  },
});
