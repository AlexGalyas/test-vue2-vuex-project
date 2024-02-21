<template>
    <div class="reservation-popup">
      <div class="reservation-popup-content">
        
        <h2>{{ reservationData.clientName }}</h2>
        <p><strong>Contact:</strong> {{ reservationData.telephone }}</p>
        <p><strong>Email:</strong> {{ reservationData.email }}</p>
        <hr class="line">
        <p><strong>Start Date:</strong> {{ reservationData.startDate }}</p>
        <p><strong>End Date:</strong> {{ reservationData.endDate }}</p>
        <button class="close" @click="closePopup">Close</button>
        <!-- Add other reservation data you want to display -->
      </div>
    </div>
  </template>
  
<script>
export default {
    props: {
        reservationData: {
        type: Object,
        required: true,
        },
    },
    methods: {
        closePopup() {
        this.$emit('close');
        },
    },
};
</script>

<style>
    .reservation-popup{
        position: absolute;
        background:#fff;
        max-width: 300px;
        display: flex;
        flex-direction: column;
        padding: 30px;
        border-radius:10px;
        box-shadow: 0px -5px 20px rgba(0, 0, 0, 0.3);
        top:10px;
        right:10px;
    }
    .close{
        border:1px solid skyblue;
        outline:none;
        background:skyblue;
        color:#fff;
        font-weight: bold;
        font-size: 1rem;
        padding:10px 30px;
        border-radius:10px;
        transition: 0.2s all;
        cursor:pointer;
    }
    .close:hover{
        background:transparent;
        color:skyblue;
    }
    .line{
        border:1px solid skyblue;
    }
</style>
  