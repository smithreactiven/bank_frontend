<template>
  <v-card height="50px" @click="redirectToAdminMode" color="grey-darken-4" class="text-center pt-3" v-if="admins.includes(user_id)">
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

<!--  <v-switch :inset=true flat="true" :inline=true>-->
<!--  </v-switch>-->
<!--  <ios-switch-component></ios-switch-component>-->


  <div class="text-center">
    <h2>Featured</h2>
  </div>

  <v-container @click="redirectToCampaign" v-for="campaign in campaigns" :key="campaign">
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
          {{ campaign.reward }}
        </v-chip>
      </v-card-item>
    </v-card>
  </v-container>
</template>

<script>
import axios from "axios";
// import IosSwitchComponent from "@/components/IosSwitchComponent.vue";

export default {
  components: {},
  name: "HomePage",
  data: () => ({
    user_id: null,
    admins: [
      615311497,
    ],
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
    // window.Telegram.WebApp.onEvent('backButtonClicked', () => {
    //   this.$router.push({ name: 'Home'});
    // })
  },
  methods: {
    checkInitData(data) {
      axios.post('api/checkInitData ', data)
          .then(response => {
            this.user_id = response.data.user.id
          })
          .catch(error => {
            console.error(error);
          });
    },
    redirectToCampaign() {
      this.$router.push({name: 'Campaign', });
    },
    redirectToAdminMode() {
      this.$router.push({name: 'AdminMode', });
    }
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