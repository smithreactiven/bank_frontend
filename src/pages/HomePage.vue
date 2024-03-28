<template>
  <div v-if="user_id in admins">
    Admin Mode
  </div>

  {{admins}}
  <br>
  {{typeof user_id}}
  <div class="text-center">
    <h2>Featured</h2>
  </div>


  <v-container v-for="campaign in campaigns" :key="campaign">
    <v-card color="grey-darken-3" >
      <v-card-item>
        <v-sheet color="red" height="100px" rounded="lg">

        </v-sheet>
      </v-card-item>
      <v-card-title>
        {{ campaign.title }}
      </v-card-title>
      <v-card-text>
        {{ campaign.desc }}
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import axios from "axios";


export default {
  data: () => ({
    user_id: null,
    admins: [
      615311497,
    ],
    campaigns: [
      {
        title: "Test1",
        desc: "fasdfasfdas"
      },
      {
        title: "Test2",
        desc: "fasdfasfdas"
      },
      {
        title: "Test3",
        desc: "fasdfasfdas"
      }
    ]
  }),
  mounted() {
    window.Telegram.WebApp.setBackgroundColor("#212121")
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
  }
}

</script>

<style>



</style>