<template>
  <div class="container">
    <ButtonsComponent/>
    <table class="calendar" border='1'>
		<thead>
			<tr>
			<th></th>
			<th v-for="date in weekDates" :key="date">{{ date }}</th>
			</tr>
		</thead>
		<tbody>
			<tr v-for="(room, index) in rooms" :key="index">
				<td class="room__type">{{ room.type }}</td>
				<td class="reservation__container" v-for="(date) in weekDates" :key="`${date}-${room.type}`" :colspan="getSpan(index, date)" >
					<template v-if="isBooking(index, date)">
					<div
						class="reservation"
					>
						{{ getReservationClient(index, date) }}
					</div>
					</template>
				</td>
			</tr>
		</tbody>
    </table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import ButtonsComponent from './ButtonsComponent.vue'

export default {
  components:{
    ButtonsComponent
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
    isBooking(roomIndex, currentDate) {
      return this.reservations.some(reservation =>
        reservation.roomIndex === roomIndex &&
        currentDate >= reservation.startDate &&
        currentDate <= reservation.endDate
      )
    },
    getReservationClient(roomIndex, currentDate) {
      const reservation = this.reservations.find(reservation =>
        reservation.roomIndex === roomIndex &&
        currentDate >= reservation.startDate &&
        currentDate <= reservation.endDate
      );
      return reservation ? reservation.clientName : '';
    },
	getSpan(roomIndex, startDate) {
		const booking = this.reservations.find(
			reservation =>
			reservation.roomIndex === roomIndex &&
			startDate >= reservation.startDate &&
			startDate <= reservation.endDate
		);
		if (booking) {
			const start = new Date(booking.startDate);
			const end = new Date(booking.endDate);
			const diffTime = Math.abs(end - start);
			const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
			// Повертаємо кількість днів, на які триває бронювання
			return diffDays;
		}
		return 1; // Якщо бронювання не знайдено, повертаємо 1
	}
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
    .calendar thead th{
        padding:10px;
    }

    .calendar tbody td{
        padding:30px;
    }
    .room__type{
      color:skyblue;
      font-weight:700;
      font-style:italic;
    }
    .reservation__container{
      position:relative;
    }
    .reservation {
      background:#5cb85c;
      position:absolute;
      bottom:0;
      left:0;
      color:#fff;
      width: 100%;
      height: 80%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.8rem;
      overflow: hidden;
    }

    
</style>
