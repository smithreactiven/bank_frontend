<template>
  <v-container>
    <v-container>
      <v-row>
        <v-col cols="6">
          <v-card class="pt-1" v-for="item in items" :key="item.name" color="black">
            <div class="text-h6 white--text">{{item.name}} ></div>
          </v-card>
        </v-col>
        <v-col cols="6">
          <v-btn rounded="xl" color="purple" prepend-icon="mdi-check-circle">
            <div class="font-weight-bold text-white" style="font-size: 10px;">
              Бонус за друга
            </div>
          </v-btn>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="3">
      <v-card class="pt-5"
              elevation="0"
              @click="redirectToInviteFriendPage()"
              style="z-index: 1"
              variant="tonal"
              rounded="xl"
              height="100"
              width="100"
              color="white">
              <v-card-text class="bg-transparent text-center py-0 px-0">
                <label class="theme-label-hint-color" style="font-size: 12px">
                  Траты в ресторанах
                </label>
              </v-card-text>
      </v-card>
        </v-col>

        <v-col cols="3">
          <v-card class="pt-5 ml-8"
              elevation="0"
              @click="redirectToInviteFriendPage()"
              style="z-index: 1"
              variant="tonal"
              rounded="xl"
              height="100"
              width="100"
              color="white">
              <v-card-text class="bg-transparent text-center py-0 px-0">
                <label class="theme-label-hint-color" style="font-size: 12px">
                  На что потратить
                </label>
              </v-card-text>
          </v-card>
        </v-col>
                <v-col cols="3">
          <v-card class="pt-5 ml-16"
              elevation="0"
              @click="redirectToInviteFriendPage()"
              style="z-index: 1"
              variant="tonal"
              rounded="xl"
              height="100"
              width="100"
              color="white">
              <v-card-text class="bg-transparent text-center py-0 px-0">
                <label class="theme-label-hint-color" style="font-size: 12px">
                  Как <br> сэкономить деньги
                </label>
              </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="6">
          <v-card class="pt-5"
              elevation="0"
              @click="redirectToInviteFriendPage()"
              style="z-index: 1"
              variant="tonal"
              rounded="xl"
              height="130"
              width="160"
              color="white">
              <v-card-text class="bg-transparent text-center py-0 px-0">
                <label class="theme-label-hint-color" style="font-size: 16px">
                  Все операции <br>
                </label>
                <label class="theme-label-hint-color" style="font-size: 10px">
                  Трат в мае: 100 ₽
                </label>
              </v-card-text>
          </v-card>
          </v-col>

        <v-col cols="6">
          <v-card class="pt-5"
              elevation="0"
              @click="redirectToInviteFriendPage()"
              style="z-index: 1"
              variant="tonal"
              rounded="xl"
              height="130"
              width="160"
              color="white">
              <v-card-text class="bg-transparent text-center py-0 px-0">
                <label class="theme-label-hint-color" style="font-size: 16px">
                  Cashback и бонусы
                </label>
              </v-card-text>
            </v-card>
          </v-col>
      </v-row>


    </v-container>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  name: "HomePage",
  components: {
  },
  data: () => ({
    tg_platform: null,
    user_id: null,
    page_loading: true,
    items: [{
      name: 'Vadim',
    }]
  }),
  mounted() {
    window.Telegram.WebApp.setBackgroundColor("#000000")
    window.Telegram.WebApp.BackButton.hide()
    window.Telegram.WebApp.MainButton.hide()
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
  }
}
</script>

<style>

</style>