<template>
  <div class="container">
    <ButtonsComponent/>
    <div class="calendar__container" style="position:relative;">
		<table class="calendar" style="overflow:hidden;" border='1'>
			<thead>
				<tr>
				<th></th>
				<th v-for="date in weekDates" :key="date">{{ date }}</th>
				</tr>
			</thead>

			<tbody>
				<tr v-for="(room, index) in rooms" :key="index">
					<td class="room__type" >{{ room.type }}</td>
					<td 
						v-for="(date) in weekDates" 
						:key="`${date}-${room.type}`"
					>
							<div 
								v-for="(reservation, i) in filterReservations(room.type, date)" 
								:key="i" 
								:class="{ 'reservation': filterReservations(room.type, date)}" 
								v-on:click="showPopup(room.type, date, i)"
								:style="getReservationStyle(reservation, date)"
							>
								<p class="reservation__text">{{ reservation.client }}</p>
							</div>
					</td>
				</tr>

			</tbody>
			
		</table>
		<PopupMenu :reservationData="activeReservation" v-if="activeReservation" @close="closePopup" />
		
    </div>
	
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import ButtonsComponent from './ButtonsComponent.vue'
import PopupMenu from './PopupMenu.vue';

export default {
	components:{
		ButtonsComponent,
		PopupMenu
	},
	data() {
		return {
		activeReservation: null,

		};
	},
	computed: {
		...mapGetters(['currentWeek','rooms']),
		
		weekDates() {
			const currentDate = this.currentWeek;
			const startOfWeek = new Date(currentDate)
			startOfWeek.setDate(currentDate.getDate() - currentDate.getDay() + 1);
			const dates = [];
			for (let i = 0; i < 7; i++) {
				const date = new Date(startOfWeek);
				date.setDate(startOfWeek.getDate() + i);
				dates.push(date.toISOString().split('T')[0]);
			}
			return dates;
		},
	},
	mounted(){
		this.fetchData();
	},
	methods: {
		...mapActions(['fetchData']),

		filterReservations(roomType, currentDate) {
			const room = this.rooms.find(room => room.type === roomType);
			if (room && room.reservations) {
				const res =  room.reservations.filter(reservation =>
					currentDate >= reservation.start &&
					currentDate <= reservation.end
				);
				return res;
			}
			return [];
		},		
		isBooking(roomType, currentDate) {
			return this.filterReservations(roomType, currentDate).length > 0;
		},
		showPopup(roomType, currentDate, index) {
			const reservation = this.filterReservations(roomType, currentDate)[index];
			this.activeReservation = reservation ? reservation : null;
		},
		closePopup() {
			this.activeReservation = null;
		},
		getReservationStyle(reservation, date) {
			const startDate = new Date(reservation.start);
			const endDate = new Date(reservation.end);
			const currentDate = new Date(date);
			const dayDiffStart = Math.floor((currentDate - startDate) / (1000 * 60 * 60 * 24));
			const dayDiffEnd = Math.floor((endDate - currentDate) / (1000 * 60 * 60 * 24));

			return {
				left: `calc(${dayDiffStart * 100 + 50}%  )`,
				width: `calc(${(dayDiffEnd - dayDiffStart + 1) * 100}% - 130px)`,
			};
		},
	}
};
</script>

<style>
    .calendar{
        text-align:left;
        border-collapse: collapse;
        border:1px;
        margin:0 auto;
    }   
    .calendar__container{
		width:100%;
    }
    .calendar thead th{
        padding:20px;
    }

    .calendar tbody td{
        padding:40px;
        position: relative;
    }

    .room__type{
		color:skyblue;
		font-weight:700;
		font-style:italic;
    }
    .reservation {
		cursor: pointer;
		position:absolute;
		top:50%;
		transform: translateY(-50%);
		background:#ff5e00;
		color:#fff;
		border-radius: 1rem;
		width: 100%;
		height: 70%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 0.8rem;
		overflow: hidden;
		z-index: 1;
    }   
	.reservation__text{
		font-weight: bold;
		font-size: 0.8rem;
	}
</style>
