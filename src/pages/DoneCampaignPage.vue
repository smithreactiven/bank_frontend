<template>
  <v-container>
    <br>
    <v-card variant="flat" color="#070B14" class="text-center">
      <v-card-item v-if="campaign">
        <v-img cl height="128px" width="128px" :cover="true" class="mx-auto rounded-lg" :src="campaign.reward_image"></v-img>
      </v-card-item>
      <v-card-title style="white-space: pre-line !important">
        Thank you! Your airdrop will arrive during the launch period.
      </v-card-title>
      <v-card-subtitle v-if="campaign">
        Your reward: <label v-if="campaign.reward_amount > 0">{{ campaign.reward_amount }}</label> {{ campaign.reward_currency }}
      </v-card-subtitle>
      <br>
      <br>
<!--      <v-card-item>-->
<!--        <v-btn @click="redirectToCampaign()" class="text-none" rounded="lg" width="60%" variant="flat"-->
<!--               color="var(&#45;&#45;tg-theme-button-color)">-->
<!--&lt;!&ndash;          <template v-slot:prepend>&ndash;&gt;-->
<!--&lt;!&ndash;              <v-icon&ndash;&gt;-->
<!--&lt;!&ndash;                  color="var(&#45;&#45;tg-theme-button-text-color)"&ndash;&gt;-->
<!--&lt;!&ndash;                  icon="mdi-chevron-left"&ndash;&gt;-->
<!--&lt;!&ndash;              ></v-icon>&ndash;&gt;-->
<!--&lt;!&ndash;          </template>&ndash;&gt;-->
<!--          <template v-slot:default>-->
<!--            <label class="tg-button-text-color">-->
<!--              Back-->
<!--            </label>-->
<!--          </template>-->
<!--        </v-btn>-->
<!--      </v-card-item>-->
    </v-card>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  name: "DoneCampaignPage",
  data() {
    return {
      campaign_id: null,
      campaign: null
    }
  },
  mounted() {
    this.campaign_id = this.$route.query.campaign_id
    this.getCampaign(this.$route.query.campaign_id)
    window.Telegram.WebApp.onEvent('backButtonClicked', () => {
      this.$router.push({ path: '/'});
    })
    window.Telegram.WebApp.BackButton.show()
    window.Telegram.WebApp.MainButton.show()
    window.Telegram.WebApp.MainButton.setText("Join the community")
    window.Telegram.WebApp.MainButton.setParams({color: "#4CAF50"})
    window.Telegram.WebApp.MainButton.onClick(() => {
      window.Telegram.WebApp.openTelegramLink(`https://t.me/raiseanon_chat`)
    })
  },
  unmounted() {
    window.Telegram.WebApp.MainButton.offClick()
    window.Telegram.WebApp.MainButton.hide()
    window.Telegram.WebApp.BackButton.hide()
    window.Telegram.WebApp.offEvent('backButtonClicked')
  },
  methods: {
    getCampaign(campaign_id) {
      axios.post('api/getCampaign', {campaign_id: campaign_id})
          .then(response => {
            this.campaign = response.data.campaign
          })
          .catch(error => {
            console.error(error);
          });
    },
    redirectToCampaign() {
      this.$router.push({name: 'Home'});
    }
  }
}

</script>

<style scoped>

</style>