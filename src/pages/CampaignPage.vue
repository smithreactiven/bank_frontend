<template>
  <v-container>
    <v-card class="bg-transparent" rounded="lg">
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
            <v-chip size="large">
              {{ campaign.days_left }} days left
            </v-chip>
          </v-col>
        </v-row>
      </v-img>
    </v-card>

    <v-sheet class="bg-transparent" height="10px" elevation="0"></v-sheet>

    <v-card rounded="lg" color="grey-darken-4">
      <v-card-item>
        <b>$87.000 TON</b>
        <v-card-subtitle>
          Rewards
        </v-card-subtitle>
      </v-card-item>
    </v-card>

    <v-sheet class="bg-transparent" height="10px" elevation="0"></v-sheet>

    <v-card color="black">
      <v-card-title>
        {{ campaign.title }}
      </v-card-title>
      <v-card-text class="pre-subtitle">
        {{ campaign.desc }}
      </v-card-text>
    </v-card>
    <div v-for="task_group in task_groups" :key="task_group">
      <v-sheet class="bg-transparent" height="10px" elevation="0"></v-sheet>
      <v-card color="black">
        <v-card-item>
          <v-card-title>
            {{ task_group.title }}
          </v-card-title>
          <div v-for="task in task_group.tasks" :key="task">
            <v-sheet class="bg-transparent" height="10px" elevation="0"></v-sheet>
            <v-card color="grey-lighten-4" rounded="lg" variant="outlined">
              <v-card-item>
                <v-row align="center">
                  <v-col cols="auto">
                    <v-card class="px-2 py-2" color="grey-darken-4" rounded="lg">
                      <v-img width="25px" height="25px" :src="task.image">
                      </v-img>
                    </v-card>
                  </v-col>
                  <v-col cols="7">
                    {{ task.title }}
                    <v-card-subtitle>
                      {{ task.desc }}
                    </v-card-subtitle>
                  </v-col>
                  <v-spacer></v-spacer>
                  <v-col cols="auto">
                    <v-chip>{{ task.points }}</v-chip>
                  </v-col>
                </v-row>
              </v-card-item>
            </v-card>
          </div>
        </v-card-item>

      </v-card>
    </div>


  </v-container>

</template>

<script>

export default {
  name: "CampaignPage",
  data() {
    return {
      campaign: {
        title: "Test1",
        image: "https://storage.googleapis.com/ton-strapi/Image_d9cc3b62f5/Image_d9cc3b62f5.png",
        desc: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
        days_left: 0,
      },
      task_groups: [
        {
          title: "Task #1",
          tasks: [
            {
              title: "Subscribe to Entony",
              desc: "Description",
              points: 10,
              image: "./img_1.png"
            },
            {
              title: "Subscribe to Anna",
              desc: "",
              points: 20,
              image: "https://em-content.zobj.net/source/apple/391/gem-stone_1f48e.png"
            }
          ]
        },
        {
          title: "Task #2",
          tasks: [
            {
              title: "Check story TON",
              desc: "Description",
              points: 50,
              image: "https://em-content.zobj.net/source/apple/391/love-letter_1f48c.png"
            },
          ]
        },
      ]
    };

  },
  mounted() {
    window.Telegram.WebApp.onEvent('backButtonClicked', () => {
      this.$router.push({ path: '/'});
    })
    window.Telegram.WebApp.BackButton.show()
    window.Telegram.WebApp.MainButton.setText("Continue with tasks")
    window.Telegram.WebApp.MainButton.show()

    // this.checkInitData({_auth: window.Telegram.WebApp.initData})
  },
  unmounted() {
    window.Telegram.WebApp.MainButton.hide()
    window.Telegram.WebApp.BackButton.hide()
    window.Telegram.WebApp.offEvent('backButtonClicked')
  },
}

</script>

<style scoped>

.custom-border {
  border: #757575 1px solid;
}

</style>