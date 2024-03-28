<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  data: () => ({
  }),
  mounted() {
    // window.Telegram.WebApp.onEvent('backButtonClicked', () => {
    //   this.$router.push({ name: 'Home'});
    // })
  }
}

</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500&display=swap');

html, body {
  font-family: 'Inter', sans-serif;
  color: white;
  background-color: #212121;
  touch-action: manipulation;
}

.div {
  background-color: #3867A7;
}


</style>