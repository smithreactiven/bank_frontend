<template>
<v-container>
  <v-row>
    <v-col cols="12">
    <v-card color="black">
      <v-card-text class="pt-15" style="text-align: center">
        <label class="text-h5"> Траты за все время </label>
      </v-card-text>
    </v-card>
    </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-card class="text-center" color="black">
          <v-progress-circular
            color="lime"
            model-value="60"
            :size="128"
            :width="12">
           <label class="text-h6"> ₽ </label>
           </v-progress-circular>
        <v-card-text class="mt-5">
            Всего потрачено: 420 ₽
        </v-card-text>
      </v-card>
        </v-col>
      </v-row>
</v-container>

</template>


<script>
import axios from "axios";

export default {
  data: () => ({
    name: "SpendingPage"
  }),
    mounted() {
    window.Telegram.WebApp.setBackgroundColor("#000000")
    window.Telegram.WebApp.onEvent('backButtonClicked', () => {
      this.$router.push({ path: '/'});
    })
    window.Telegram.WebApp.BackButton.show()
    this.checkInitData({_auth: window.Telegram.WebApp.initData})
  },
    unmounted() {
      window.Telegram.WebApp.BackButton.hide()
  },

  methods: {
    checkInitData(data) {
      axios.post('api/checkInitData', data)
          .then(response => {
            this.user_id = response.data.user.id
          })
          .catch(error => {
            console.error(error);
          });
    }
  }
}

</script>

<style scoped>

</style>