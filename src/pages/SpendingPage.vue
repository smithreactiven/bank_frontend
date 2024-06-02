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
  <v-row>
    <v-col cols="12">
      <v-card color="black">
        <label class="text-h6"> История переводов </label>
      </v-card>
    </v-col>
  </v-row>
    <v-card elevation="0" rounded="lg" color="#474747" variant="flat" class="mt-3">
      <v-card  elevation="0" rounded="lg" class="rounded-b-0" variant="flat" color="#474747">
        <v-row class="pt-3 pb-3" align="center">
          <v-col cols="1">
          </v-col>
          <v-col cols="auto">
            <v-card width="25px" variant="tonal" height="25px" color="green" rounded="lg">
              <v-icon class="icon-pending" color="yellow">
                mdi-message-text
              </v-icon>
            </v-card>
          </v-col>
          <v-col cols="auto">
            Перевод + 100 ₽
          </v-col>
          <v-spacer></v-spacer>
          <v-col cols="auto">
            <v-icon color="grey-darken-1">mdi-plus</v-icon>
          </v-col>
          <v-col cols="1">
          </v-col>
        </v-row>
      </v-card>
    </v-card>
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