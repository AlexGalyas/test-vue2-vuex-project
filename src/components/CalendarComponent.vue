<template>
  <div class="container">
    <ButtonsComponent/>
    <div class="calendar__container" style="position:relative;">
		<table class="calendar" border='1'>
			<thead>
				<tr>
				<th></th>
				<th v-for="date in weekDates" :key="date">{{ date }}</th>
				</tr>
			</thead>

			<tbody style="position:relative;">
				<tr style="position:relative;" v-for="(room, index) in rooms" :key="index">
					
					<td class="room__type">{{ room.type }}</td>
					
					<td 
						v-for="(date,dateIndex) in weekDates" 
						:key="`${date}-${room.type}`"
					>
					<div class="reservation__container" @click="showPopup(index, date)" >
						<div
							v-if="isBooking(index, date) && getReservationIndex(index,date) === dateIndex"
							class="reservation"
							:style="{ width: getReservationWidth(index, date) }"
						>
							{{ getReservationClient(index, date) }}
						</div>
					</div>
					</td>
					
				</tr>
				<PopupMenu :reservationData="activeReservation" v-if="activeReservation" @close="closePopup" />
			</tbody>
		</table>
      
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
		...mapGetters(['currentWeek','reservations','rooms']),
		weekDates() {
			const currentDate = this.currentWeek;
			const startOfWeek = new Date(currentDate);
			startOfWeek.setDate(currentDate.getDate() - currentDate.getDay() + 1);
			const dates = [];
			for (let i = 0; i < 7; i++) {
				const date = new Date(startOfWeek);
				date.setDate(startOfWeek.getDate() + i);
				dates.push(date.toISOString().split('T')[0]);
			}
			return dates;
		}
	},
	mounted(){
		this.fetchReservations();
		this.fetchRooms();
	},
	methods: {
		...mapActions(['fetchReservations','fetchRooms']),
		filterReservations(roomIndex, currentDate) {
			return this.reservations.filter(reservation =>
				reservation.roomIndex === roomIndex &&
				currentDate >= reservation.startDate &&
				currentDate <= reservation.endDate
			);
		},		
		isBooking(roomIndex, currentDate) {
			return this.filterReservations(roomIndex, currentDate).length > 0;
		},
		getReservationClient(roomIndex, currentDate) {
			const reservation = this.filterReservations(roomIndex, currentDate)[0];
			return reservation ? reservation.clientName : '';
		},
		getReservationWidth(roomIndex, currentDate) {
			const reservation = this.filterReservations(roomIndex, currentDate)[0];
			if (reservation) {
				const start = new Date(reservation.startDate);
				const end = new Date(reservation.endDate);
				const diffInDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
				return `${diffInDays * 100}%`;
			}
			return '0%';
			},
		showPopup(roomIndex, currentDate) {
			const reservation = this.filterReservations(roomIndex, currentDate)[0];
			this.activeReservation = reservation ? reservation : null;
		},
		closePopup() {
			this.activeReservation = null;
		},
		calculateCellIndex(startDate, reservationDate) {
			const start = new Date(startDate);
			const current = new Date(reservationDate);

			const diffTime = Math.abs(current - start);
			const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

			return diffDays;
		},
		getReservationIndex(roomIndex, currentDate) {
			const reservation = this.filterReservations(roomIndex, currentDate)[0]
			if (reservation) {
				const start = new Date(reservation.startDate);
				const index = this.calculateCellIndex(this.weekDates[0], start.toISOString().split('T')[0]);
				return index
			}
			return 0
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
    .reservation__container{
		position:absolute;
		bottom:0;
		left:0;
		width: 100%;
		height: 100%;
    }
    .reservation {
		position: absolute;
		bottom:0;
		border-radius:1rem;
		background:#F6D776;
		color:#fff;
		width: 100%;
		height: 70%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 0.8rem;
		overflow: hidden;
    }   
</style>
