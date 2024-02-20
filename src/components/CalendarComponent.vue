<template>
  <div class="container">
    <div class="button__container">
      <button class="navigation__button" v-on:click="prevWeek">Попередній тиждень</button>
      <button class="navigation__button" v-on:click="resetToCurrentWeek">Поточний тиждень</button>
      <button class="navigation__button" v-on:click="nextWeek">Наступний тиждень</button>
    </div>
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
          <td class="reservation__container" v-for="date in weekDates" :key="`${date}-${room.type}`">
            <!-- <div class="reservation" :class="{ 'booking-start': isBookingStart(index, date), 'booking-end': isBookingEnd(index, date), 'booking': isBooking(index, date) }">
              {{ getReservationClient(index, date) }}
            </div> -->
            <div class="reservation" :class="{'booking':isBooking(index, date),'booking-start': isBookingStart(index, date), 'booking-end': isBookingEnd(index, date)} ">
              {{getReservationClient(index,date)}}
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  data() {
    return {
      rooms: [
        { type: 'Econom' },
        { type: 'Classic' },
        { type: 'Lux' },
        { type: 'Premium' },
        { type: 'President' }
      ],
      reservations: [
        { roomIndex: 0, startDate: '2024-02-20', endDate: '2024-02-22', clientName: 'John Doe' },
        { roomIndex: 3, startDate: '2024-02-23', endDate: '2024-02-24', clientName: 'Jane Smith' },
        { roomIndex: 1, startDate: '2024-02-21', endDate: '2024-02-22', clientName: 'Oleksandr' },
        { roomIndex: 4, startDate: '2024-02-27', endDate: '2024-02-28', clientName: 'Mykola' },
        { roomIndex: 4, startDate: '2024-02-28', endDate: '2024-02-29', clientName: 'Sasha' },
      ]
    };
  },
  computed: {
    ...mapGetters(['currentWeek']),
    // Генеруємо список дат тижня (від понеділка до неділі)
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
  methods: {
    ...mapActions(['prevWeek', 'nextWeek', 'resetToCurrentWeek']),
    isBooking(roomIndex, currentDate) {
      return this.reservations.some(reservation =>
        reservation.roomIndex === roomIndex &&
        currentDate >= reservation.startDate &&
        currentDate <= reservation.endDate
      );
    },
    isBookingStart(roomIndex, currentDate) {
      return this.reservations.some(reservation =>
        reservation.roomIndex === roomIndex &&
        currentDate === reservation.startDate
      );
    },
    isBookingEnd(roomIndex, currentDate) {
      return this.reservations.some(reservation =>
        reservation.roomIndex === roomIndex &&
        currentDate === reservation.endDate
      );
    },
    getReservationClient(roomIndex, currentDate) {
      const reservation = this.reservations.find(reservation =>
        reservation.roomIndex === roomIndex &&
        currentDate >= reservation.startDate &&
        currentDate <= reservation.endDate
      );
      return reservation ? reservation.clientName : '';
    }
  }
};
</script>

<style>

    .calendar{
        text-align:left;
        border-collapse: collapse;
        margin:0 auto;
    }   
    .calendar thead th{
        padding:10px;
    }

    .calendar tbody td{
        padding:30px;
    }
    .button__container{
      text-align:center;
    }
    .navigation__button{
        border:none;
        background:skyblue;
        color:#fff;
        padding:10px;
        outline:none;
        border-radius:0.5rem;
        margin-right:10px;
        margin-bottom:10px;
        cursor:pointer;
        display:inline-block;
        width:150px;
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
      background:#FFB534;
      width: 100%;
      height: 80%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.8rem;
      overflow: hidden;
    }
    .booking-start,
    .booking-end {
        position: absolute;
        bottom: 0;
        background-color: #5cb85c;
        color: white;
        border-radius: 0.5rem;
    }
    .booking-start{
        width:40%;
        position:absolute;
        right:0;
    }

    .booking-end {
        background-color: #FFB534;
        width:40%;
        left:0;
    }
    .booking{
        
    }



    
</style>
