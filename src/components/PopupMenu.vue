<template>
    <div class="reservation-popup">
      <div class="reservation-popup-content">
        
        <h2>{{ reservationData.name }}</h2>
        <p><strong>Contact:</strong> {{ reservationData.phone }}</p>
        <p><strong>Email:</strong> {{ reservationData.email }}</p>
        <p>{{ reservationData.typeOfApartments }}</p>
        <hr class="line">
        <p><strong>Start Date:</strong> {{ reservationData.start }}</p>
        <p><strong>End Date:</strong> {{ reservationData.end }}</p>
        <button class="close" v-on:click="closePopup">Close</button>
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
        left:50%;
        transform: translateX(-50%);
        background:#fff;
        max-width: 300px;
        display: flex;
        flex-direction: column;
        padding: 30px;
        border-radius:10px;
        box-shadow: 0px -5px 20px rgba(0, 0, 0, 0.3);
        top:10px;
        right:10px;
        z-index: 999;
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
  