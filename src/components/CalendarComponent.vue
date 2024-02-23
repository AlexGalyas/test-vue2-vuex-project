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
						<td class="room__type">{{ room.name }}</td>
						<td 
							v-for="(date) in weekDates" 
							:key="`${date}-${room.id}`"
						>
								<div 
									v-for="(reservation, i) in filterReservations(room.id, date)" 
									:key="i" 
									:class="{ 'reservation': filterReservations(room.id, date)}" 
									v-on:click="showPopup(room.id, date, i)"
									:style="getReservationStyle(reservation, date)"
								>
									<p class="reservation__text">{{ reservation.name }}</p>
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
		activeReservation: null, // active element for popup feature

		};
	},
	computed: {
		...mapGetters(['currentWeek','rooms','bookings']),
		
		weekDates() {
			const currentDate = this.currentWeek;
			const startOfWeek = new Date(currentDate)
			startOfWeek.setDate(currentDate.getDate() - currentDate.getDay() + 1);// setting the start of the week to monday
			const dates = [];
			for (let i = 0; i < 7; i++) {
				const date = new Date(startOfWeek);
				date.setDate(startOfWeek.getDate() + i);// generating dates for the current week
				dates.push(date.toISOString().split('T')[0]);// pushing dates to the array in YYYY-MM-DD format
			}
			return dates;
		},
	},
	mounted(){
		this.fetchData();
		this.fetchRooms();
	},
	methods: {
		...mapActions(['fetchData','fetchRooms']),
		// filtering reservations for a specific room and date
		filterReservations(roomId, currentDate) {
			const bookings = this.bookings.filter(booking => booking.roomDetails.id === roomId);
			return bookings.filter(booking =>
				currentDate >= booking.start && currentDate <= booking.end
			);
		},
		showPopup(roomType, currentDate, index) {
			const reservation = this.filterReservations(roomType, currentDate)[index];
			this.activeReservation = reservation ? reservation : null;
		},
		closePopup() {
			this.activeReservation = null;
		},
		getReservationStyle(reservation, date) {
			// getting reservation dates
			const startDate = new Date(reservation.start);
			const endDate = new Date(reservation.end);

			const currentDate = new Date(date); // current date for comparison

			const dayDiffStart = Math.floor((currentDate - startDate) / (1000 * 60 * 60 * 24));// сalculating days difference from start date
			const dayDiffEnd = Math.floor((endDate - currentDate) / (1000 * 60 * 60 * 24));// same but to end date

			const startWeek = new Date(currentDate);
			startWeek.setDate(currentDate.getDate() - currentDate.getDay() + 1);
			const endWeek = new Date(startWeek);
			endWeek.setDate(startWeek.getDate() + 6);

			// calculating width based on reservation duration
			if(startDate <= startWeek && endDate <= endWeek){
				return {
					right:`calc(${dayDiffEnd * 100 + 60}%  )`,
					width: `calc(${(dayDiffStart - dayDiffEnd + 1) * 100}% - 130px)`,
				};
			}else {
				return {
					left: `calc(${dayDiffStart * 100 + 50}%  )`,
					width: `calc(${(dayDiffEnd - dayDiffStart + 1) * 100}% - 130px)`,
				};
			}
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
		background:#fff;
		z-index: 2;
    }
    .reservation {
		cursor: pointer;
		position:absolute;
		top:50%;
		transform: translateY(-50%);
		background:#ff0088;
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
