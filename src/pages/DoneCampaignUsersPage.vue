<template>
  <v-card variant="flat" color="#070B14" class="text-center">
    <v-card-title>
      List of done users
    </v-card-title>
    <v-card-item>
      <v-row justify="center">
        <v-col cols="10">
          <v-btn @click="getFile" class="text-none" rounded="lg" width="100%" variant="flat"
                 color="var(--tg-theme-button-color)">
            <template v-slot:default>
              <label class="tg-button-text-color">
                Get file
              </label>
            </template>
          </v-btn>
        </v-col>
      </v-row>
    </v-card-item>
  </v-card>


</template>

<script>
import axios from "axios";

export default {
  name: "DoneCampaignUsers",
  data: () => ({
    user_id: null,
    campaign_id: null
  }),
  mounted() {
    this.campaign_id = this.$route.query.campaign_id
    this.checkInitData({_auth: window.Telegram.WebApp.initData})
    window.Telegram.WebApp.onEvent('backButtonClicked', () => {
      this.$router.push({ name: 'AdminMode'});
    })
    window.Telegram.WebApp.BackButton.show()
  },
  unmounted() {
    window.Telegram.WebApp.BackButton.hide()
    window.Telegram.WebApp.offEvent('backButtonClicked')
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
    },
    getFile() {
      window.Telegram.WebApp.close()
      axios.post('api/sendDoneCampaignUsers', {campaign_id: this.campaign_id, user_id: this.user_id})
          .then(() => {
            console.log(1)
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