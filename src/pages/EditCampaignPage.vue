<template>
  <div class="text-center">
    <h2>Featured</h2>
  </div>
  <div v-if="page_loading">
    <v-container v-for="index in 4" :key="index">
      <v-skeleton-loader color="grey-darken-4" class="rounded-lg" type="image, article"></v-skeleton-loader>
    </v-container>
  </div>
  <div v-else>
    <v-container  @click="redirectToEditCampaignPage(campaign.id)" v-for="campaign in campaigns" :key="campaign">
      <v-card color="grey-darken-4" rounded="lg">
        <v-img cover="true" :src=campaign.image height="200px" rounded="lg">
          <v-row v-if="campaign.days_left === 0" dense="true" class="time-left">
            <v-spacer></v-spacer>
            <v-col cols="auto">
              <v-chip variant="flat" size="large">
                finished
              </v-chip>
            </v-col>
          </v-row>
          <v-row v-else dense="true" class="time-left">
            <v-spacer></v-spacer>
            <v-col cols="auto">
              <v-chip variant="flat"  size="large">
                {{ campaign.days_left }} days left
              </v-chip>
            </v-col>
          </v-row>
        </v-img>

        <v-card-title>
          {{ campaign.title }}
        </v-card-title>
        <v-card-subtitle class="pre-subtitle">
          {{ campaign.desc }}
        </v-card-subtitle>
        <v-card-item>
          <v-chip size="large">
            {{ campaign.reward_amount }} {{ campaign.reward_currency }}
          </v-chip>
        </v-card-item>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";
// import IosSwitchComponent from "@/components/IosSwitchComponent.vue";
import { VSkeletonLoader } from 'vuetify/labs/VSkeletonLoader';

export default {
  name: "EditCampaignPage",
  components: {VSkeletonLoader},
  data: () => ({
    user_id: null,
    page_loading: true,
    admins: [],
    campaigns: [
      {
        title: "Test1",
        image: "https://vc.ru/cover/fb/c/577599/1673023863/cover.jpg",
        desc: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
        days_left: 1,
        reward: "$100.000 TON"
      },
      {
        title: "Test2",
        image: "https://storage.googleapis.com/ton-strapi/Image_d9cc3b62f5/Image_d9cc3b62f5.png",
        desc: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
        days_left: 0,
        reward: "$87.000 TON"
      },
      {
        title: "Test3",
        image: "https://storage.googleapis.com/ton-strapi/Image_16b0795702/Image_16b0795702.png",
        desc: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
        days_left: 3,
        reward: "$20.000 TON"
      }
    ]
  }),
  mounted() {
    window.Telegram.WebApp.setBackgroundColor("#212121")
    window.Telegram.WebApp.BackButton.hide()
    this.checkInitData({_auth: window.Telegram.WebApp.initData})
    this.getCampaigns()
    this.getAdmins()
    // window.Telegram.WebApp.onEvent('backButtonClicked', () => {
    //   this.$router.push({ name: 'Home'});
    // })
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
    getCampaigns() {
      axios.get('api/getCampaigns', ).then(response => {
        this.campaigns = response.data.events
        this.page_loading = false
      })
          .catch(error => {
            console.error(error);
          });
    },
    getAdmins() {
      axios.get('api/getAdmins', ).then(response => {
        this.admins = response.data.admins
      })
          .catch(error => {
            console.error(error);
          });
    },
    redirectToAdminMode() {
      this.$router.push({name: 'AdminMode', });
    },
    redirectToEditCampaignPage(campaign_id) {
      this.$router.push({ name: 'EditCampaign2', query: {campaign_id: campaign_id, }});
    },
  }
}

</script>

<style>
.time-left {
  position: absolute;
  top: 10px;
  width: 100%;
}

.pre-subtitle {
  white-space: pre-line !important;
}


</style>