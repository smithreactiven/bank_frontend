<template>
  <v-container>
    <br>
    <v-card color="black" class="text-center">
      <v-card-item v-if="campaign">
        <v-img cl height="128px" width="128px" :cover="true" class="mx-auto rounded-lg" :src="campaign.reward_image"></v-img>
      </v-card-item>
      <v-card-title style="white-space: pre-line !important">
        Congratulations you have completed the campaign!
      </v-card-title>
      <v-card-subtitle v-if="campaign">
        Your reward: {{ campaign.reward_amount }} {{ campaign.reward_currency }}
      </v-card-subtitle>
      <br>
      <br>
      <v-card-item>
        <v-btn @click="redirectToCampaign()" class="text-none" rounded="lg" width="60%" variant="flat"
               color="var(--tg-theme-button-color)">
<!--          <template v-slot:prepend>-->
<!--              <v-icon-->
<!--                  color="var(&#45;&#45;tg-theme-button-text-color)"-->
<!--                  icon="mdi-chevron-left"-->
<!--              ></v-icon>-->
<!--          </template>-->
          <template v-slot:default>
            <label class="tg-button-text-color">
              Back
            </label>
          </template>
        </v-btn>
      </v-card-item>
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
      this.$router.push({name: 'Campaign', query: {campaign_id: this.campaign_id}});
    }
  }
}

</script>

<style scoped>

</style>