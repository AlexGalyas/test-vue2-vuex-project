import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		currentWeek: new Date(),
		bookings:[],
		rooms:[]
	},
	mutations: {
		setCurrentWeek(state, newDate) {
			state.currentWeek = newDate;
		},
		setData(state, data) {
			state.bookings = data;
		},
		setRooms(state, data) {
			state.rooms = data;
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
		async fetchData({ commit }) {
		try {
			const response = await axios.get('http://localhost:3000/bookings'); 
			// console.log(response)
			commit('setData', response.data);
		} catch (error) {
			console.error('Error fetching reservations:', error);
		}
		},
		async fetchRooms({ commit }) {
		try {
			const response = await axios.get('http://localhost:3000/rooms'); 
			// console.log(response)
			commit('setRooms', response.data);
		} catch (error) {
			console.error('Error fetching reservations:', error);
		}
		},
	},
	getters: {
		currentWeek: state => state.currentWeek,
		bookings:state => state.bookings,
		rooms:state => state.rooms

	},
});
