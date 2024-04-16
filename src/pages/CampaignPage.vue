<template>
  <v-container>

    <div v-if="page_loading">
      <v-skeleton-loader size="x-large" color="grey-darken-4" class="rounded-lg" type="image"></v-skeleton-loader>
    </div>
    <div v-else>
      <v-row>
        <v-col cols="auto">
          <v-btn
              @click="copyLink"
              width="100%"
               size="small"
               rounded="xl"
               variant="tonal"
               color="var(--tg-theme-button-color)"
               class="text-none text-subtitle-4"
          >
            <template v-slot:prepend>
              <v-icon icon="mdi-content-copy">
              </v-icon>
            </template>
            <template v-slot:default>
              <label>Copy link</label>
            </template>
          </v-btn>
        </v-col>
      </v-row>
      <v-sheet class="bg-transparent" height="20px" elevation="0"></v-sheet>
      <v-card class="bg-transparent" rounded="lg">
        <v-img cover="true" :src=campaign.image height="200px" rounded="lg">
          <v-row v-if="campaign.time_left == 0" dense="true" class="time-left">
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
                {{ campaign.time_left }} {{ campaign.time_unit }} left
              </v-chip>
            </v-col>
          </v-row>
        </v-img>
      </v-card>
      <v-sheet class="bg-transparent" height="10px" elevation="0"></v-sheet>
      <v-card rounded="lg" color="grey-darken-4">
        <v-row align="center">
          <v-col cols="auto">
            <v-card-item>
              <b>{{ campaign.reward_amount }} {{ campaign.reward_currency }}</b>
              <v-card-subtitle>
                Rewards
              </v-card-subtitle>
            </v-card-item>
          </v-col>
          <v-spacer></v-spacer>
          <v-col cols="auto">
            <v-card-item>
              <v-img cover="true" :src=campaign.reward_image width="52px" height="52px" class="rounded-lg">
              </v-img>
            </v-card-item>
          </v-col>
        </v-row>
      </v-card>
    </div>

    <v-sheet class="bg-transparent" height="10px" elevation="0"></v-sheet>
    <div v-if="page_loading">
      <v-skeleton-loader size="x-large" color="grey-darken-4" class="rounded-lg" type="article"></v-skeleton-loader>
      <br>
    </div>
    <v-card color="black" v-else>
      <v-card-title class="text-pre-line">
        {{ campaign.title }}
      </v-card-title>
      <v-card-text class="pre-subtitle">
        {{ campaign.desc }}
      </v-card-text>
    </v-card>

    <div v-if="page_loading">
      <div v-for="i in 4" :key="i">
        <v-skeleton-loader size="x-large" color="grey-darken-4" class="rounded-lg" type="list-item-two-line">
        </v-skeleton-loader>
        <br>
      </div>
    </div>
    <div v-else>
      <div v-for="task_group in task_groups" :key="task_group">
        <v-sheet class="bg-transparent" height="10px" elevation="0"></v-sheet>
        <v-card color="black">
          <v-card-item>
            <v-card-title class="text-pre-line">
              {{ task_group.title }}
            </v-card-title>
            <div v-for="task in task_group.tasks" :key="task">
              <v-sheet class="bg-transparent" height="10px" elevation="0"></v-sheet>
                <a v-if="!task.is_blocked && !campaign.time_left == 0" :href="task.url" target="_blank" class="text-decoration-none">
                  <v-card
                      @click="setDoneTask(task_group.id, task.id, task.type, task.story_id)"
                      color="grey-lighten-4"
                      rounded="lg"
                      variant="outlined"
                      :disabled="task.is_done || task.is_blocked || campaign.time_left == 0"
                  >
                    <v-card-item>
                      <v-row align="center">
                        <v-col cols="auto">
                          <v-btn v-if="task.is_loading" size="small" icon="mdi-account-circle" color="grey-darken-4" loading="true" rounded="lg">
                          </v-btn>
                          <v-card v-else class="px-2 py-2" color="grey-darken-4" rounded="lg">
                            <v-icon v-if="task.is_done" color="green" width="25px" height="25px">
                              mdi-check
                            </v-icon>
                            <v-icon v-else-if="task.is_blocked" width="25px" height="25px">
                              mdi-lock
                            </v-icon>
                            <v-img v-else width="25px" height="25px" :src="task.icon">
                            </v-img>
                          </v-card>
                        </v-col>
                        <v-col cols="6">
                          {{ task.title }}
                          <v-card-subtitle>
                            {{ task.desc }}
                          </v-card-subtitle>
                        </v-col>
                        <v-spacer></v-spacer>
                        <!--                  <v-col cols="auto">-->
                        <!--                    <v-chip>{{ task.points }}</v-chip>-->
                        <!--                  </v-col>-->
                      </v-row>
                    </v-card-item>
                  </v-card>
                </a>
                <v-card v-else
                        @click="setDoneTask(task_group.id, task.id, task.type, task.story_id)"
                        color="grey-lighten-4"
                        rounded="lg"
                        variant="outlined"
                        :disabled="task.is_done || task.is_blocked || campaign.time_left == 0"
                >
                  <v-card-item>
                    <v-row align="center">
                      <v-col cols="auto">
                        <v-btn v-if="task.is_loading" size="small" icon="mdi-account-circle" color="grey-darken-4" loading="true" rounded="lg">
                        </v-btn>
                        <v-card v-else class="px-2 py-2" color="grey-darken-4" rounded="lg">
                          <v-icon v-if="task.is_done" color="green" width="25px" height="25px">
                            mdi-check
                          </v-icon>
                          <v-icon v-else-if="task.is_blocked" width="25px" height="25px">
                            mdi-lock
                          </v-icon>
                          <v-img v-else width="25px" height="25px" :src="task.icon">
                          </v-img>
                        </v-card>
                      </v-col>
                      <v-col cols="6">
                        {{ task.title }}
                        <v-card-subtitle>
                          {{ task.desc }}
                        </v-card-subtitle>
                      </v-col>
                      <v-spacer></v-spacer>
                      <!--                  <v-col cols="auto">-->
                      <!--                    <v-chip>{{ task.points }}</v-chip>-->
                      <!--                  </v-col>-->
                    </v-row>
                  </v-card-item>
                </v-card>
              </div>
          </v-card-item>
        </v-card>
      </div>
    </div>
    <v-snackbar
        v-model="snackbar_show"
        :timeout="snackbar_timeout"
        color="success"
        variant="flat"

    >
      <v-icon size="small">mdi-content-copy</v-icon>
      Link copied successfully!
    </v-snackbar>
  </v-container>

</template>

<script>

import axios from "axios";
import { VSkeletonLoader } from 'vuetify/labs/VSkeletonLoader';
// import lscache from "lscache";

export default {
  name: "CampaignPage",
  components: {VSkeletonLoader},
  data() {
    return {
      selectedEmoji: "https://em-content.zobj.net/source/apple/391/grinning-squinting-face_1f606.png",
      emojies: [
          "https://em-content.zobj.net/source/apple/391/grinning-squinting-face_1f606.png",
          "https://em-content.zobj.net/source/apple/391/love-letter_1f48c.png"
      ],
      page_loading: true,
      campaign_id: null,
      loading_btn: false,
      is_task_disabled: false,
      dones_tasks_groups: [],
      user_id: null,
      username: null,
      campaign: {
        title: "Test1",
        image: "https://storage.googleapis.com/ton-strapi/Image_d9cc3b62f5/Image_d9cc3b62f5.png",
        desc: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
        time_left: 0,
        time_unit: "days",
        reward_currency: "TON",
        reward_amount: "100.00",
      },
      snackbar_show: false,
      snackbar_timeout: 2000,
      task_groups: [],
      task_groups2: [
        {
          title: "Task #1",
          tasks: [
            {
              title: "Subscribe to Entony",
              desc: "Description",
              image: "./img_1.png",
            },
            {
              title: "Subscribe to Anna",
              desc: "",
              image: "https://em-content.zobj.net/source/apple/391/grinning-squinting-face_1f606.png"
            }
          ]
        },
        {
          title: "Task #2",
          tasks: [
            {
              title: "Check story TON",
              desc: "Description",
              image: "https://em-content.zobj.net/source/apple/391/love-letter_1f48c.png"
            },
          ]
        },
      ]
    };

  },
  mounted() {
    if (this.$route.query.campaign_id) {
      this.campaign_id = this.$route.query.campaign_id
    }
    else {
      this.campaign_id = window.Telegram.WebApp.initDataUnsafe.start_param
    }
    this.checkInitData({_auth: window.Telegram.WebApp.initData})
    window.Telegram.WebApp.onEvent('backButtonClicked', () => {
      this.$router.push({ path: '/'});
    })

    window.Telegram.WebApp.BackButton.show()
  },
  unmounted() {
    window.Telegram.WebApp.offEvent('mainButtonClicked')
    window.Telegram.WebApp.MainButton.hide()
    window.Telegram.WebApp.offEvent('backButtonClicked')
    window.Telegram.WebApp.BackButton.hide()
  },
  computed: {
    isTaskDisabled(is_done, is_blocked) {
      return is_done || is_blocked
    }
  },
  methods: {
    redirectToDoneCampaign() {
      this.$router.push({ name: 'DoneCampaign', query: {campaign_id: this.campaign_id}});
    },
    checkInitData(data) {
      axios.post('api/checkInitData ', data)
          .then(response => {
            this.user_id = response.data.user.id
            this.username = response.data.user.username
            this.getCampaign(response.data.user.id)
          })
          .catch(error => {
            console.error(error);
          });
    },
    setDoneCampaign() {
      axios.post('api/setDoneCampaign', {user_id: this.user_id, username: this.username, campaign_id: this.campaign_id})
          .then(response => {
            if (response.data.status === 200) {
              setTimeout(this.redirectToDoneCampaign,2000)
            }
          })
          .catch(error => {
            console.error(error);
          });
    },
    getCampaign(user_id) {
      axios.post('api/getCampaign', {campaign_id: this.campaign_id})
          .then(response => {
            this.campaign = response.data.campaign
            this.getCampaignTaskGroups(user_id, response.data.campaign.one_by_access)
          })
          .catch(error => {
            console.error(error);
          });
    },
    getCampaign2() {
      axios.post('api/getCampaign', {campaign_id: this.campaign_id})
          .then(response => {
            this.campaign = response.data.campaign
            this.getCampaignTaskGroups(this.user_id, response.data.campaign.one_by_access)
          })
          .catch(error => {
            console.error(error);
          });
    },
    getCampaignTaskGroups(user_id, one_by_access) {
      axios.post('api/getCampaignTaskGroups', {
        user_id: user_id, campaign_id: this.campaign_id, one_by_access: one_by_access
      })
          .then(response => {
            this.task_groups = response.data.task_groups
            this.page_loading = false
            if (response.data.not_done_tasks.length == 0) {
              this.setDoneCampaign()
            }
            // else {
            //   // window.Telegram.WebApp.MainButton.show()
            //   window.Telegram.WebApp.MainButton.setText("Continue with tasks")
            //   let next_task = response.data.not_done_tasks[0]
            //   window.Telegram.WebApp.onEvent('mainButtonClicked', () => {
            //
            //     this.continueWithTasks(next_task)
            //   })
            // }
          })
          .catch(error => {
            console.error(error);
          });
    },
    changeLoading() {
      this.loading_btn = !this.loading_btn
      // lscache.set("loading_btn", true, 1)
      // setTimeout(this.changeLoading2, 10000);
    },
    setDoneTask(group_id, task_id, task_type, story_id = 0) {
      this.changeLoading()
      this.task_groups[group_id].tasks[task_id].is_loading = true
      if (["subscribe", "open_link"].includes(task_type)) {
        axios.post('api/setDoneTask', {
          user_id: this.user_id, campaign_id: this.campaign_id, group_id: group_id, task_id: task_id
        }).then(() => {
          setTimeout(this.getCampaign2,3000)
        }).catch(error => {
          console.error(error);
        });
      }
      else {
        axios.post('api/setDoneTask', {
          user_id: this.user_id, campaign_id: this.campaign_id, group_id: group_id, task_id: task_id
        })
        this.openStory(story_id)
      }
    },
    openStory(story_id) {
      this.$router.push({ name: 'Story', query: {story_id: story_id, campaign_id: this.campaign_id}});

      // this.setDoneTask(task_group_id, task_type, task_type)
    },
    copyLink() {
      this.hapticImpactOccurred('medium')
      navigator.clipboard.writeText(this.campaign.url)
          .then(() => {
            this.snackbar_show = true;
          })
          .catch((error) => {
            console.error("Failed to copy text:", error);
          });
    },
    hapticImpactOccurred(style) {
      window.Telegram.WebApp.HapticFeedback.impactOccurred(style);
    },
  }
}

</script>

<style scoped>

.custom-border {
  border: #757575 1px solid;
}

.copy-input {
  color: var(--tg-theme-link-color);
  width: 100%;
  font-size: 12px;
}

.pre-line {
  white-space: pre-line !important;
}



</style>