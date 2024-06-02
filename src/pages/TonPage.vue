<template>
  <v-container>
    <v-card color="black" align="center">
      <v-img
        :width="70"
        aspect-ratio="1/1"
        src="./ton.png"
    >
    </v-img>
    </v-card>
    <v-row>
      <v-col>
        <v-card class="mt-15" color="black" align="center">
          Курс Toncoin - 321,03 $
        </v-card>
      </v-col>
    </v-row>
      <v-sparkline
        :auto-line-width="autoLineWidth"
        :fill="fill"
        :gradient="gradient"
        :gradient-direction="gradientDirection"
        :line-width="width"
        :model-value="value"
        :padding="padding"
        :smooth="radius || false"
        :stroke-linecap="lineCap"
        :type="type"
        auto-draw
      >
      </v-sparkline>
    <v-row>
        <v-col cols="12" class="text-center">
          <v-btn rounded="xl"
                 variant="tonal"
                 style="font-size: 11px"
                 class="mt-15"
                 href="https://t.me/wallet"
                 append-icon="mdi-open-in-new"
          >
            Открыть кошелек
          </v-btn>
        </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  data: () => ({
    name: "TonPage"
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