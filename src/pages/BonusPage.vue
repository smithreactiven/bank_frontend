<template>
<v-container>
  <v-img src="./friend.jpg">
  </v-img>
  <v-row>
    <v-col cols="12">
      <v-card class="text-center mt-16" color="black">
        <label style="font-size: 20px; "> Приведи друга, и получи 1000 рублей на счет </label>
      </v-card>
    </v-col>
  </v-row>
        <v-row>
          <v-col cols="12">
            <v-card class="text-center" color="black">
              <label style="font-size: 14px; "> Вот твоя реферальная ссылка. </label>
            </v-card>
          </v-col>
        </v-row>
          <v-card color="black" class="pt-5">
           <v-row align="center" class="pt-3 px-3">
              <v-col cols="auto">
                <div class="campaign-link" @click="copyLink()">
                  {{link}}
                </div>
              </v-col>
              <v-spacer></v-spacer>
              <v-col cols="3">
                <v-btn rounded="xl" size="small" width="100%" variant="tonal" @click="copyLink()" color='blue'>
                  Copy
                </v-btn>
              </v-col>
            </v-row>
          </v-card>
</v-container>

</template>


<script>
import axios from "axios";

export default {
  data: () => ({
    name: "BonusPage",
    link: 'https'
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