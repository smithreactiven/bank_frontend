<template>
  <v-app class="bg-transparent">
  <v-container>


    <div v-if="page_loading">
      <v-skeleton-loader size="x-large" color="#16142C" class="rounded-lg" type="image"></v-skeleton-loader>
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
               color="deep-purple-accent-1"
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
      <v-card elevation="0" class="bg-transparent" rounded="lg">
        <v-img cover="true" :src=campaign.image height="200px" rounded="lg">
          <v-row v-if="campaign.time_left == 0" dense="true" class="time-left">
            <v-spacer></v-spacer>
            <v-col cols="auto">
              <v-chip variant="flat" size="large">
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
              <v-chip size="large">
                {{ campaign.time_left }} {{ campaign.time_unit }} left
              </v-chip>
            </v-col>
          </v-row>
        </v-img>
      </v-card >
      <v-sheet class="bg-transparent" height="10px" elevation="0"></v-sheet>
      <v-card elevation="0" rounded="lg" color="#16142C">
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
      <v-skeleton-loader size="x-large" color="#16142C" class="rounded-lg" type="article"></v-skeleton-loader>
      <br>
    </div>
    <v-card elevation="0" color="#070B14" v-else>
      <v-card-title class="text-pre-line">
        {{ campaign.title }}
      </v-card-title>
      <v-card-text class="pre-subtitle">
        {{ campaign.desc }}
      </v-card-text>
    </v-card>

    <div v-if="page_loading">
      <div v-for="i in 4" :key="i">
        <v-skeleton-loader size="x-large" color="#16142C" class="rounded-lg" type="list-item-two-line">
        </v-skeleton-loader>
        <br>
      </div>
    </div>
    <div v-else>
      <div v-for="task_group in task_groups" :key="task_group">
        <v-sheet @click="this.hideKeyboard" class="bg-transparent" height="10px" elevation="0"></v-sheet>
        <v-card elevation="0" color="#070B14">
          <v-card-item>
            <v-card-title @click="this.hideKeyboard" class="text-pre-line">
              {{ task_group.title }}
            </v-card-title>
            <div v-for="task in task_group.tasks" :key="task">
              <v-sheet class="bg-transparent" height="10px" elevation="0"></v-sheet>
                <a v-if="!task.is_blocked && !campaign.time_left == 0 && !task.is_done && task.type != 'add_wallet'" :href="task.url" target="_blank" class="text-decoration-none">
                  <v-card
                      elevation="0"
                      @click="setDoneTask(task_group.id, task.id, task.type, task.story_id)"
                      color="deep-purple-accent-1"
                      rounded="lg"
                      variant="tonal"
                  >
                    <v-card-item>
                      <v-row align="center">
                        <v-col cols="auto">
                          <v-btn v-if="task.is_loading" size="small" icon="mdi-account-circle" color="#16142C" loading="true" rounded="lg">
                          </v-btn>
                          <v-card elevation="0" v-else class="px-2 py-2" color="#16142C" rounded="lg">
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
                        <v-col cols="6" class="text-white">
                          {{ task.title }}
                          <v-card-subtitle class="text-white">
                            {{ task.desc }}
                          </v-card-subtitle>
                        </v-col>
                        <v-spacer></v-spacer>
                      </v-row>
                    </v-card-item>
                  </v-card>
                </a>
                <div v-else-if="!task.is_blocked && !campaign.time_left == 0 && !task.is_done">
                  <v-card
                      elevation="0"
                      color="deep-purple-accent-1"
                      rounded="lg"
                      variant="tonal"
                      class="rounded-b-0"
                  >
                    <v-card-item @click="this.hideKeyboard">
                      <v-row align="center">
                        <v-col cols="auto">
                          <v-btn v-if="task.is_loading" size="small" icon="mdi-account-circle" color="#16142C" loading="true" rounded="lg">
                          </v-btn>
                          <v-card elevation="0" v-else class="px-2 py-2" color="#16142C" rounded="lg">
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
                        <v-col cols="6" class="text-white">
                          {{ task.title }}
                          <v-card-subtitle class="text-white">
                            {{ task.desc }}
                          </v-card-subtitle>
                        </v-col>
                        <v-spacer></v-spacer>
                      </v-row>

                    </v-card-item>
                  </v-card>
                  <v-card
                      class="rounded-t-0"
                      elevation="0"
                      color="deep-purple-accent-1"
                      rounded="lg"
                      variant="tonal"
                  >
                    <v-card-item>
                      <v-text-field
                          @click="isKeyboardVisible=true"
                          :label="user_wallet_label"
                          @keyup.enter="this.hideKeyboard"
                          v-model="user_wallet"
                          rounded="lg"
                          color="black"
                          density="compact"
                          bg-color="white"
                          base-color="black"
                          variant="solo"
                          clearable
                          single-line
                          hide-details
                      ></v-text-field>
                    </v-card-item>
                  </v-card>
                  <v-btn
                      v-if="show_save_wallet_btn"
                      @click="setDoneTask(task_group.id, task.id, task.type, task.story_id)"
                      class="mt-2" rounded="lg" width="100%" variant="tonal" color="deep-purple-accent-1"
                  >
                    Save
                  </v-btn>
                  <v-sheet v-if="isKeyboardVisible && isMobile()" class="bg-transparent" height="300px"></v-sheet>
                </div>
                <v-card
                    v-else
                    elevation="0"
                    @click="setDoneTask(task_group.id, task.id, task.type, task.story_id)"
                    color="#16142C"
                    rounded="lg"
                    variant="outlined"
                    :disabled="task.is_done || task.is_blocked || campaign.time_left == 0"
                >
                  <v-card-item>
                    <v-row align="center">
                      <v-col cols="auto">
                        <v-btn v-if="task.is_loading" size="small" icon="mdi-account-circle" color="#16142C" loading="true" rounded="lg">
                        </v-btn>
                        <v-card elevation="0" v-else class="px-2 py-2" color="#16142C" rounded="lg">
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
                      <v-col cols="6" class="text-white">
                        {{ task.title }}
                        <v-card-subtitle class="text-white">
                          {{ task.desc }}
                        </v-card-subtitle>
                      </v-col>
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
<!--    <v-bottom-navigation height="100px" grow="true" bg-color="var(&#45;&#45;tg-theme-secondary-bg-color)">-->
<!--      <v-row justify="center" align="start" class="py-3 px-1">-->
<!--        <v-col cols="11">-->
<!--          <v-card density="compact" color="deep-purple-accent-3" variant="flat" rounded="lg">-->
<!--            <v-btn  density="compact" rounded="lg" width="100%">-->
<!--              <span>Continue with tasks</span>-->
<!--            </v-btn>-->
<!--          </v-card>-->
<!--        </v-col>-->
<!--      </v-row>-->
<!--    </v-bottom-navigation>-->
  </v-container>
  </v-app>
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
      isKeyboardVisible: false,
      user_wallet_label: "QA_n9oI...",
      show_save_wallet_btn: true,
      campaign_id: null,
      loading_btn: false,
      user_wallet: null,
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
    window.Telegram.WebApp.setBackgroundColor("#16142C")


    window.Telegram.WebApp.onEvent('backButtonClicked', () => {
      this.$router.push({ path: '/'});
    })
    window.Telegram.WebApp.BackButton.show()
  },
  unmounted() {
    window.Telegram.WebApp.MainButton.offClick()
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
    isMobile() {
      if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        return true
      } else {
        return false
      }
    },
    redirectToDoneCampaign() {
      this.$router.push({ name: 'DoneCampaign', query: {campaign_id: this.campaign_id}});
    },
    hideKeyboard(event) {
      event.preventDefault();
      event.target.blur();
      this.isKeyboardVisible = false
    },
    checkInitData(data) {
      axios.post('api/checkInitData', data)
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
              window.Telegram.WebApp.MainButton.show()
              window.Telegram.WebApp.MainButton.setText("Join the community")
              window.Telegram.WebApp.MainButton.setParams({color: "#4CAF50"})
                window.Telegram.WebApp.MainButton.onClick(() => {
                  window.Telegram.WebApp.openTelegramLink(`https://t.me/RaiseAnon`)
                })
            }
            // else {
            //   window.Telegram.WebApp.MainButton.setText("Continue with tasks")
            //   let next_task = response.data.not_done_tasks[0]
            //   window.Telegram.WebApp.MainButton.onClick((callback) => {
            //     const
            //     this.setDoneTask(next_task.group_id, next_task.id, next_task.type, next_task.story_id)
            //   })
            //   window.Telegram.WebApp.MainButton.show()
            // }
          })
          .catch(error => {
            console.error(error);
          });
    },
    changeLoading() {
      this.loading_btn = !this.loading_btn
    },
    setUserWallet() {
      axios.post('api/setUserWallet', {
        user_id: this.user_id, campaign_id: this.campaign_id, wallet: this.user_wallet
      }).then(() => {

      }).catch(error => {
        console.error(error);
      });
    },
    setDoneTask(group_id, task_id, task_type, story_id = 0) {
      if (["subscribe", "open_link"].includes(task_type)) {
        this.changeLoading()
        this.task_groups[group_id].tasks[task_id].is_loading = true
        axios.post('api/setDoneTask', {
          user_id: this.user_id, campaign_id: this.campaign_id, group_id: group_id, task_id: task_id
        }).then(() => {
          setTimeout(this.getCampaign2,3000)
        }).catch(error => {
          console.error(error);
        });
      }
      else if (task_type == "add_wallet") {
        if (this.user_wallet) {
          this.changeLoading()
          this.task_groups[group_id].tasks[task_id].is_loading = true
          this.show_save_wallet_btn = false
          axios.post('api/setDoneTask', {
            user_id: this.user_id, campaign_id: this.campaign_id, group_id: group_id, task_id: task_id
          }).then(() => {
            setTimeout(this.getCampaign2,3000)
          }).catch(error => {
            console.error(error);
          });
          this.setUserWallet()
        }
        else {
          window.Telegram.WebApp.showAlert("Set wallet address")
        }
      }
      else if (["invite_friend"].includes(task_type)) {
        this.changeLoading()
        this.task_groups[group_id].tasks[task_id].is_loading = true

        window.Telegram.WebApp.openTelegramLink(`https://t.me/share/url?url=${this.campaign.url}`)
        axios.post('api/setDoneTask', {
          user_id: this.user_id, campaign_id: this.campaign_id, group_id: group_id, task_id: task_id
        }).then(() => {
          setTimeout(this.getCampaign2,10000)
        }).catch(error => {
          console.error(error);
        });
      }
      else if (task_type == "view_story") {
        this.changeLoading()
        this.task_groups[group_id].tasks[task_id].is_loading = true
        axios.post('api/setDoneTask', {
          user_id: this.user_id, campaign_id: this.campaign_id, group_id: group_id, task_id: task_id
        })
        this.openStory(story_id)
      }
    },
    openStory(story_id) {
      this.$router.push({ name: 'Story', query: {story_id: story_id, campaign_id: this.campaign_id}});
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