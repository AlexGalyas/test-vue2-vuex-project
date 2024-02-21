<template>
  <div class="button__container">
    <button class="navigation__button" v-on:click="prevWeek">Prev</button>
    <button class="navigation__button" v-on:click="resetToCurrentWeek">Today</button>
    <button class="navigation__button" v-on:click="nextWeek">Next</button>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    methods: {
        ...mapActions(['prevWeek', 'nextWeek', 'resetToCurrentWeek']),
    }
};

</script>
<style >
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
</style>