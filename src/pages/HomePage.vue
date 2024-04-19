<template>
  <v-sheet class="bg-transparent" height="10px"></v-sheet>
  <v-card elevation="0" height="50px" @click="redirectToAdminMode" color="#16142C" class="text-center pt-3" v-if="admins.includes(user_id)">
    <v-row align="end">
      <v-col cols="1">
      </v-col>
      <v-col cols="auto">
        <b>Admin Mode</b>
      </v-col>
      <v-spacer></v-spacer>
      <v-col cols="auto">
<!--        <v-btn  variant="flat" size="small" rounded="xl" color="blue" >-->
<!--          Open-->
<!--        </v-btn>-->
        <v-icon color="grey-darken-1">mdi-chevron-right</v-icon>
      </v-col>
      <v-col cols="1">
      </v-col>
    </v-row>
  </v-card>

  <br>

  <div class="text-center">
    <h2>Featured</h2>
  </div>
  <div v-if="page_loading">
    <v-container v-for="index in 4" :key="index">
      <v-skeleton-loader color="#16142C" class="rounded-lg" type="image, article"></v-skeleton-loader>
    </v-container>
  </div>
  <div v-else>
  <v-container  @click="redirectToCampaignPage(campaign.id)" v-for="campaign in campaigns" :key="campaign">
    <v-card elevation="0" color="#16142C" rounded="lg">
      <v-img cover="true" :src=campaign.image height="200px" rounded="lg">
        <v-row v-if="campaign.time_left == 0" dense="true" class="time-left">
          <v-spacer></v-spacer>
          <v-col cols="auto">
            <v-chip color="white" variant="tonal" size="large">
              finished
            </v-chip>
          </v-col>
        </v-row>
        <v-row v-else-if="campaign.time_left >= 999" dense="true" class="time-left">
          <v-spacer></v-spacer>
          <v-col cols="auto">
            <v-chip color="white" variant="tonal" size="large">
              active
            </v-chip>
          </v-col>
        </v-row>
        <v-row v-else dense="true" class="time-left">
          <v-spacer></v-spacer>
          <v-col cols="auto">
            <v-chip  color="white" variant="tonal"  size="large">
              {{ campaign.time_left }} {{ campaign.time_unit }} left
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
        <v-row align="center">
          <v-col cols="auto">
              <v-chip size="large">
                <v-img v-if="campaign.reward_image" cover="true" :src=campaign.reward_image width="24" height="24" class="rounded-lg">
                </v-img>
                <div class="pl-2">{{ campaign.reward_amount }} {{ campaign.reward_currency }}</div>
              </v-chip>
          </v-col>
        </v-row>
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
  name: "HomePage",
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
        time_left: 0,
        reward: "$100.000 TON"
      },
      {
        title: "Test2",
        image: "https://storage.googleapis.com/ton-strapi/Image_d9cc3b62f5/Image_d9cc3b62f5.png",
        desc: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
        time_left: 0,
        reward: "$87.000 TON"
      },
      {
        title: "Test3",
        image: "https://storage.googleapis.com/ton-strapi/Image_16b0795702/Image_16b0795702.png",
        desc: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
        time_left: 0,
        reward: "$20.000 TON"
      }
    ]
  }),
  mounted() {
    window.Telegram.WebApp.setBackgroundColor("#16142C")
    window.Telegram.WebApp.BackButton.hide()
    this.checkInitData({_auth: window.Telegram.WebApp.initData})
    this.getCampaigns()
    this.getAdmins()
    window.Telegram.WebApp.expand()
    window.Telegram.WebApp.ready()
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
    redirectToCampaignPage(campaign_id) {
      this.$router.push({ name: 'Campaign', query: {campaign_id: campaign_id, }});
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