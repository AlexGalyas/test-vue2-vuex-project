<template>
  <div id="app">
    <CalendarComponent/>
  </div>
</template>

<script>
import CalendarComponent from './components/CalendarComponent.vue'

export default {
  name: 'App',
  components: {
    CalendarComponent
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
