<template>
  <v-container>
    <v-container>

      <v-img v-if="campaign_image" width="100%" height="200px" :cover="true"  :src="campaign_image">
      </v-img>

<!--      <div v-if="reward_image_file">-->
<!--        <v-img width="64px" height="64px" :cover="true"  :src="getFileURL(reward_image_file)">-->
<!--        </v-img>-->
<!--      </div>-->

<!--      <div v-if="reward_image">-->

<!--        {{reward_image.readAsDataURL()}}-->
<!--&lt;!&ndash;        <v-img width="64px" height="64px" :cover="true"  :src="reward_image">&ndash;&gt;-->
<!--&lt;!&ndash;        </v-img>&ndash;&gt;-->
<!--      </div>-->

      <br>
      <br>
      <v-file-input
          @change="uploadCampaignImage"
          :rules="upload_rules"
          accept="image/png, image/jpeg, image/bmp"
          label="Upload an image"
          placeholder="Pick an avatar"
          chips
          variant="outlined"
          v-model="upload_images"
      >
      </v-file-input>

    <v-card color="black" rounded="lg" elevation="0">
      <v-card-subtitle>
        Title and description
      </v-card-subtitle>
      <v-sheet height="4px" color="black"></v-sheet>
      <v-card class="px-3 pt-3" color="grey-darken-4" rounded="lg">
        <v-text-field
            ref="field_1"
            v-model="campaign.title"
            @change="saveCache()"
            @keyup.enter="hideMobileKeyboard1()"
            density="compact"
            color="white"
            base-color="white"
            label="Title"
            variant="outlined"
            rows="1"
            rounded="lg"
            :rules="[
                () => !!campaign.title || 'This field is required.',
                () => !!campaign.title && campaign.title.length <= 50 || 'No more than 50 characters.',
            ]">
        </v-text-field>
      </v-card>
      <v-sheet height="10px" color="black"></v-sheet>
      <v-card class="px-3 pt-3" color="grey-darken-4" rounded="lg">
        <v-textarea
            ref="field_2"
            v-model="campaign.desc"
            @change="saveCache()"
            density="compact"
            rounded="lg"
            label="Description"
            variant="outlined"
            :rules="[
            () => !!campaign.desc || 'This field is required.',
            () => !!campaign.desc && campaign.desc.length <= 2000 || 'No more than 100 characters.',
            ]">
        </v-textarea>
      </v-card>
    </v-card>
    <br>
    <v-card color="black" rounded="lg" elevation="0">
      <v-card-subtitle>
        Campaign settings
      </v-card-subtitle>
      <v-sheet height="4px" color="black"></v-sheet>
      <v-card color="grey-darken-4" rounded="lg">
        <v-row align="start" class="px-3">
            <v-card-item class="align-self-center">
              One by one access
            </v-card-item>
            <v-spacer></v-spacer>
            <v-switch
                @change="saveCache()"
                v-model="one_by_access"
                color="green"
                class="ml-11 pt-5"
                inset
                @click="hapticImpactOccurred('soft')"
            >
            </v-switch>
        </v-row>
          <v-divider></v-divider>
<!--            <v-row align="center" class="pt-3 px-3">-->
<!--              <v-col cols="auto">-->
<!--                Finish date-->
<!--              </v-col>-->
<!--              <v-spacer></v-spacer>-->
<!--&lt;!&ndash;              <v-col cols="4">&ndash;&gt;-->
<!--                <v-text-field hide-details density="compact"></v-text-field>-->
<!--              </v-col>-->
<!--              <v-col cols="auto">-->
<!--                <v-icon class="pr-2" color="grey-darken-1">mdi-chevron-down</v-icon>-->
<!--              </v-col>-->

<!--            </v-row>-->
        <v-expansion-panels color="black">
          <v-expansion-panel color="black" bg-color="grey-darken-4" elevation="0">
            <v-expansion-panel-title>
              <template v-slot:default>
                <v-row no-gutters>
                  <v-col class="d-flex justify-start" cols="4">
                    Finish date
                  </v-col>
                  <v-col
                      class="text-grey"
                      cols="8"
                  >
                    <div v-if="finish_time && finish_date">
                      {{ finish_date }} - {{ finish_time }}
                    </div>
                  </v-col>
                </v-row>
              </template>
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <v-row no-gutters align="center" class="pt-3" >
                <v-col cols="6">
                  <v-text-field
                      @keyup.enter="hideMobileKeyboardFinishDate"
                      @keyup.delete="clearFinishDate"
                      ref="finish_date_ref"
                      v-model="finish_date"
                      :rules="finish_date_rules"
                      label="Date"
                      placeholder="20/02/2024"
                      density="compact"
                      variant="outlined"
                  >
                  </v-text-field>
                </v-col>
                <v-spacer></v-spacer>
                <v-col cols="5">
                  <v-text-field
                      @keyup.enter="hideMobileKeyboardFinishTime"
                      @keyup.delete="clearFinishTime"
                      ref="finish_time_ref"
                      v-model="finish_time"
                      :rules="finish_time_rules"
                      label="Time"
                      placeholder="10:00"
                      density="compact"
                      variant="outlined"
                  >
                  </v-text-field>
                </v-col>
              </v-row>

            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>

        <v-divider></v-divider>
            <v-row align="center" class="pt-3 px-3">
              <v-col cols="auto">
                <div class="campaign-link" @click="copyLink()">
                  {{ campaign.url }}
                </div>
              </v-col>
              <v-spacer></v-spacer>
<!--              <v-col cols="3">-->
<!--                <v-btn rounded="lg" size="small" width="100%" variant="tonal" @click="copyLink()">-->
<!--                  Copy-->
<!--                </v-btn>-->
<!--              </v-col>-->
            </v-row>
        <v-divider class="mt-3"></v-divider>
      </v-card>
    </v-card>
    <br>
    <v-card @click="redirectToAddGroupTask" rounded="lg" color="grey-darken-4">
        <v-card-item class="height-60">
          <v-row align="center">
            <v-col cols="auto">
              <v-card color="green" width="30px" height="30px" rounded="lg">
                <v-icon class="icon-pending" color="white">
                  mdi-plus
                </v-icon>
              </v-card>
            </v-col>
            <v-col cols="7">
              All your tasks
              <v-card-subtitle>
                {{ tasks_count }} tasks, {{ task_groups_count }} groups
              </v-card-subtitle>
            </v-col>
            <v-spacer></v-spacer>
            <v-col cols="auto">
              <v-icon color="grey-darken-1">mdi-chevron-right</v-icon>
            </v-col>
          </v-row>
        </v-card-item>
      </v-card>
      <br>
      <v-card @click="redirectToRewards" rounded="lg" variant="flat" color="grey-darken-4">
        <v-card-item class="height-60">
          <v-row align="center">
            <v-col v-if="reward_image" cols="auto">
              <v-img class="rounded-lg" :cover=true width="32px" height="32px" :src="reward_image">
              </v-img>
            </v-col>
            <v-col cols="auto" v-else>
              <v-card color="orange" width="30px" height="30px" rounded="lg">
                <v-icon class="icon-pending" color="white">
                  mdi-star
                </v-icon>
              </v-card>
            </v-col>
            <v-col cols="auto">
              Rewards
              <v-card-subtitle>
                {{ reward_amount }} {{ reward_currency }}
              </v-card-subtitle>
            </v-col>

            <v-spacer></v-spacer>
            <v-col cols="auto">
              <v-icon color="grey-darken-1">mdi-chevron-right</v-icon>
            </v-col>
            <v-snackbar
              v-model="alert"
              :timeout="timeout"
              color="success"
              >
              <v-icon size="small">mdi-content-copy</v-icon>
              Link copied successfully
            </v-snackbar>
          </v-row>
        </v-card-item>
      </v-card>
      <br>
      <v-row justify="center">
        <v-col cols="10">
          <v-btn @click="createCampaign" class="text-none" rounded="lg" width="100%" variant="flat"
                 color="var(--tg-theme-button-color)">
            <template v-slot:default>
              <label class="tg-button-text-color">
                Create
              </label>
            </template>
          </v-btn>
        </v-col>
      </v-row>

    </v-container>
  </v-container>
</template>

<script>
  import axios from "axios";
  import lscache from "lscache";
  const allowedUploadTypes = ["image/png", "image/jpeg", "image/jpg"]
  const maxUploadSize = 2000000
  export default {
    data: () => ({
      campaign: {
        id: null,
        title: null,
        image: "https://storage.googleapis.com/ton-strapi/Image_d9cc3b62f5/Image_d9cc3b62f5.png",
        desc: null,
        days_left: 0,
        one_by_access: false,
        finish_date: "",
        finish_time: "",
        url: null,
      },
      campaign_image: null,
      one_by_access: false,
      reward_currency: "TON",
      reward_amount: "100.00",
      reward_image: null,
      reward_image_file: null,
      finish_date: "",
      finish_time: "",
      task_groups: [],
      tasks_count: 0,
      task_groups_count: 0,
      upload_images: null,
      snackbar_alert: false,
      snackbar_timeout: 2000,
      upload_rules: [
        value => {
          return !value || !value.length || value[0].size < maxUploadSize || 'Image size should be less than 2 MB!' || allowedUploadTypes.includes(value[0].type) || "Only jpg, png"
        },
        value => {
          return !value || !value.length || allowedUploadTypes.includes(value[0].type) || "Allowed types: jpg, png!"
        },
      ],
      finish_date_rules: [
        value => {
          return /^\d{2}\/\d{2}\/\d{4}$/.test(value) || 'Wrong format! day/month/year'
        },
      ],
      finish_time_rules: [
        value => {
          return /^\d{2}:\d{2}$/.test(value) || 'Wrong format! hours:minutes'
        },
      ],
    }),
    mounted() {
      window.Telegram.WebApp.onEvent('backButtonClicked', () => {
        this.$router.push({
          name: 'AdminMode'
        });
      })
      window.Telegram.WebApp.BackButton.show()

      if (lscache.get("campaign")) {
        this.campaign = lscache.get("campaign")
      }
      else {
        this.getCampaignHash()
      }

      if (lscache.get("reward_amount")) {
        this.reward_amount = lscache.get("reward_amount")
      }
      if (lscache.get("reward_currency")) {
        this.reward_currency = lscache.get("reward_currency")
      }
      if (lscache.get("reward_image")) {
        this.reward_image = lscache.get("reward_image");
        // this.fromUrlToFile(this.reward_image)
      }
      if (lscache.get("finish_time")) {
        this.finish_time = lscache.get("finish_time");
      }
      if (lscache.get("finish_date")) {
        this.finish_date = lscache.get("finish_date");
      }
      if (lscache.get("campaign_image")) {
        this.campaign_image = lscache.get("campaign_image")
      }

      if (lscache.get("task_groups")) {
        this.task_groups = lscache.get("task_groups")
        this.task_groups_count = lscache.get("task_groups").length
        this.countTotalTasks()
      }
      if (lscache.get("one_by_access")) {
        this.one_by_access = lscache.get("one_by_access")
      }
      // window.Telegram.WebApp.MainButton.setText("Create")
      // window.Telegram.WebApp.MainButton.show()

      // window.Telegram.WebApp.onEvent('mainButtonClicked', () => {
      //   window.Telegram.WebApp.MainButton.showProgress()
      //   this.createCampaign()
      // })
      // this.checkInitData({_auth: window.Telegram.WebApp.initData})
    },
    unmounted() {
      window.Telegram.WebApp.BackButton.hide()
      window.Telegram.WebApp.offEvent('backButtonClicked')
      window.Telegram.WebApp.MainButton.hide()
      window.Telegram.WebApp.offEvent('mainButtonClicked')
    },
    methods: {
      countTotalTasks() {
        for (let i = 0; i < this.task_groups.length; i++) {
          let group = this.task_groups[i];

          // Получаем количество задач в текущей группе
          let tasksCount = group.tasks.length;

          // Добавляем количество задач текущей группы к общему количеству задач
          this.tasks_count += tasksCount;
        }
      },
      saveCache() {
        lscache.set('campaign', this.campaign)
      },
      hideMobileKeyboard1() {
        this.$refs.field_1.blur();
      },
      hideMobileKeyboardFinishDate() {
        this.$refs.finish_date_ref.blur();
      },
      hideMobileKeyboardFinishTime() {
        this.$refs.finish_time_ref.blur();
      },
      hapticImpactOccurred(style) {
        window.Telegram.WebApp.HapticFeedback.impactOccurred(style);
      },
      redirectToRewards() {
        this.$router.push({name: 'AddReward', query: {campaign_id: this.campaign.id}});
      },
      redirectToAddGroupTask() {
        this.$router.push({name: 'AddGroupTask', });
      },
      createCampaign() {
        if (!this.campaign_image) {
          window.Telegram.WebApp.showAlert("Upload an image")
        }
        else if (!this.campaign.title) {
          window.Telegram.WebApp.showAlert("Title is is required field")
        }
        else if (!this.campaign.desc) {
          window.Telegram.WebApp.showAlert("Description is is required field")
        }
        else {
          let data = new FormData();

          data.append('id', this.campaign.id);
          data.append('title', this.campaign.title);
          data.append('desc', this.campaign.desc);
          data.append('reward_amount', this.reward_amount);
          data.append('reward_currency', this.reward_currency);
          data.append('one_by_access', this.one_by_access)
          // data.append('media', this.upload_images[0]);
          data.append("finish_date", this.finish_date)
          data.append("finish_time", this.finish_time)

          this.addCampaignTaskGroups()
          axios.post('api/createCampaign', data).then(() => {
                window.Telegram.WebApp.showAlert("Campaign successfully created!")
                lscache.remove("task_groups")
                lscache.remove("campaign")
                lscache.remove("reward_currency")
                lscache.remove("reward_amount")
                lscache.remove("campaign_image")
                lscache.remove("reward_image")
                lscache.remove("finish_date")
                lscache.remove("finish_time")
                this.$router.push({name: 'Home'});
              })
              .catch(error => {
                console.error(error);
              });
        }
      },
      getCampaignHash() {
        axios.get('api/getRandomHash', )
            .then(response => {
              this.campaign.id = response.data.data
              this.campaign.url = `https://t.me/TestWACom_bot/campaign?startapp=${response.data.data}`
              this.saveCache()
            })
            .catch(error => {
              console.error(error);
            });
      },
      copyLink() {
        this.hapticImpactOccurred('medium')
        navigator.clipboard.writeText(this.campaign.url)
          .then(() => {
            this.alert = true;
          })
          .catch((error) => {
            console.error("Failed to copy text:", error);
          });
      },
      uploadCampaignImage(event) {
        let selectedImage = event.target.files[0]
        if (selectedImage.size > maxUploadSize) {
          event.target.files = null
          this.upload_images = null
          window.Telegram.WebApp.showAlert("Image size should be less than 2 MB")
        }
        else if (!allowedUploadTypes.includes(selectedImage.type)) {
          event.target.files = null
          this.upload_images = null
          window.Telegram.WebApp.showAlert("Allowed types: jpg, png")
        }
        else {
          let data = new FormData();
          data.append('id', this.campaign.id);
          data.append('media', selectedImage);
          axios.post('api/uploadCampaignImage', data)
              .then(() => {
                this.upload_images = null
                this.campaign_image = null
                setTimeout(this.changeImage, 1000)

              })
              .catch(error => {
                console.error(error);
              });
        }

      },
      changeImage() {
        this.campaign_image = `/api/static/uploads/campaign_media_${this.campaign.id}.jpg`
        lscache.set("campaign_image", this.campaign_image)
      },
      clearFinishDate() {
          this.finish_date = ""
      },
      clearFinishTime() {
        this.finish_time = ""
      },
      addCampaignTaskGroups() {
        axios.post('api/addCampaignTaskGroups', {campaign_id: this.campaign.id, task_groups: this.task_groups})
            .then(() => {
              console.log("200")
            })
            .catch(error => {
              console.error(error);
            });
      },
    },
    watch: {
      finish_date:function (val) {
        if (val.length >= 10) {
          this.finish_date = this.finish_date.slice(0, 10)
        }
        if (val.length === 2) {
          this.finish_date = `${this.finish_date}/`
        }
        if (val.length === 5) {
          this.finish_date = `${this.finish_date}/`
        }
        lscache.set("finish_date", this.finish_date)
      },
      finish_time:function (val) {
        if (val.length === 2) {
          this.finish_time = `${this.finish_time}:`
        }
        if (val.length >= 5) {
          this.finish_time = this.finish_time.slice(0, 5)
        }
        lscache.set("finish_time", this.finish_time)
      },
      one_by_access:function (val) {
        lscache.set("one_by_access", val)
      }
    }
}

</script>

<style scoped>
  .back {
    background: linear-gradient(to right, #1a1a1a 78%, #0d0d0d 100%);
  }

  .icon-pending {
    padding-left: 7px;
    padding-top: 3px;
  }

  .height-60 {
    height: 60px;
  }

  .padding-0 {
    padding: 0 !important;
    margin: 0 !important;
  }

  .campaign-link {
    color: var(--tg-theme-link-color);
    white-space: pre-line !important;
  }
</style>