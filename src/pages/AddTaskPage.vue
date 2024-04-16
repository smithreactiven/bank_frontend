<template>
  <v-container>
    <v-card color="black" rounded="lg" elevation="0">
      <v-card-subtitle>
        Title
      </v-card-subtitle>
      <v-sheet height="4px" color="black"></v-sheet>
      <v-card class="px-3 py-3" color="grey-darken-4" rounded="lg">
        <v-text-field
            hide-details="true"
            ref="task_title"
            density="compact"
            color="white"
            base-color="white"
            variant="outlined"
            rounded="lg"
            v-model="title"
            @keyup.enter="hideMobileKeyboardTitle()"
            :rules="[
                () => !!title || 'This field is required.',
                () => !!title && title.length <= 50 || 'No more than 50 characters.',
            ]">
        </v-text-field>
      </v-card>

      <v-sheet height="20px" color="black"></v-sheet>

      <v-card-subtitle>
        What this task about
      </v-card-subtitle>
      <v-card class="px-3 py-3" color="grey-darken-4" rounded="lg">
        <v-text-field
            label="description"
            hide-details="true"
            density="compact"
            color="white"
            base-color="white"
            variant="outlined"
            rounded="lg"
            ref="task_desc"
            @keyup.enter="hideMobileKeyboardDesc()"
            v-model="desc"
            :rules="[
                () => !!title || 'This field is required.',
                () => !!title && title.length <= 50 || 'No more than 50 characters.',
            ]">
        </v-text-field>
      </v-card>

      <v-sheet height="20px" color="black"></v-sheet>

      <div v-if="task_types_1.includes(task_type)" >
        <v-card-subtitle>
          Link to visit
        </v-card-subtitle>
        <v-card class="px-3 py-3" color="grey-darken-4" rounded="lg">
          <v-text-field
              label="https://"
              hide-details="true"
              density="compact"
              color="white"
              base-color="white"
              variant="outlined"
              rounded="lg"
              ref="task_url"
              @keyup.enter="hideMobileKeyboardUrl()"
              v-model="url"
              :rules="[
                () => !!title || 'This field is required.',
                () => !!title && title.length <= 50 || 'No more than 50 characters.',
            ]">
          </v-text-field>
        </v-card>
      </div>
      <div v-else>
        <v-card-subtitle>
          Stories
        </v-card-subtitle>
        <v-card class="pt-3" color="grey-darken-4" rounded="lg">
          <v-card-item>
            <v-file-input
                class="mt-3"
                accept="image/png, image/jpeg, image/bmp"
                label="Upload an image"
                placeholder="Pick an avatar"
                chips
                multiple=""
                variant="outlined"
                v-model="uploads_stories"
                @change="uploadStories"

            >
            </v-file-input>
          </v-card-item>
        </v-card>
        <br>
        <v-row justify="center">
          <v-col cols="auto" v-for="i in uploads_stories" :key="i">
            <v-card color="grey-darken-4" rounded="lg">
              <v-card-item>
                <v-img cover="true" class="rounded-lg" width="64px"  height="64px" :src="getFileURL(i)"></v-img>
              </v-card-item>
            </v-card>
          </v-col>
        </v-row>
      </div>
      <v-sheet height="20px" color="black"></v-sheet>

      <v-card-subtitle>
        Icon
      </v-card-subtitle>
      <v-card class="px-3 py-3" color="grey-darken-4" rounded="lg">
        <v-row align="center" justify="center" dense="true">
          <v-col cols="auto" v-for="i in emojies" :key="i">
            <v-card
                v-if="i.id === selectedEmoji"
                variant="tonal"
                @click="onSelectEmoji(i.id)"
                color="white"
                class="px-2 py-2"
                rounded="lg"
                elevation="0"
            >
              <v-img width="25px" height="25px" :src="i.url">
              </v-img>
            </v-card>
            <v-card
                v-else
                variant="tonal"
                @click="onSelectEmoji(i.id)"
                color="black"
                class="px-2 py-2"
                rounded="lg"
                elevation="0"
            >
              <v-img width="25px" height="25px" :src="i.url">
              </v-img>
            </v-card>
          </v-col>
        </v-row>
      </v-card>
    </v-card>
    <v-sheet height="20px" color="black"></v-sheet>
    <v-row justify="center">
      <v-col cols="8">
        <v-btn @click="addTask" class="text-none" rounded="lg" width="100%" variant="flat"
             color="var(--tg-theme-button-color)">
        <template v-slot:default>
          <label class="tg-button-text-color">
            Save
          </label>
        </template>
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import lscache from "lscache";
import axios from "axios";
// const allowedUploadTypes = ["image/png", "image/jpeg", "image/jpg"]
// const maxUploadSize = 2000000

export default {
  name: "AddTaskPage",
  data () {
    return {
      task_types_1: ["subscribe", "open_link"],
      uploads_stories: [],
      selectedEmoji: 0,
      emojies: [
        {
          id: 0,
          url: "https://em-content.zobj.net/source/apple/391/gem-stone_1f48e.png",
        },
        {
          id: 1,
          url: "https://em-content.zobj.net/source/apple/391/grapes_1f347.png",
        },
        {
          id: 2,
          url: "https://em-content.zobj.net/source/apple/391/cheese-wedge_1f9c0.png",
        },
        {
          id: 3,
          url: "https://em-content.zobj.net/source/apple/391/hourglass-done_231b.png",
        },
        {
          id: 4,
          url: "https://em-content.zobj.net/source/apple/391/shopping-bags_1f6cd-fe0f.png",
        },
        {
          id: 5,
          url: "https://em-content.zobj.net/source/apple/391/megaphone_1f4e3.png",
        },
        {
          id: 6,
          url: "https://em-content.zobj.net/source/apple/391/chains_26d3-fe0f.png",
        }
      ],
      task_groups: [],
      group_id: null,
      task_id: null,
      task_type: null,
      desc: null,
      url: null,
      title: null,
      story_id: null
    }
  },
  mounted() {
    if (lscache.get("task_groups")) {
      this.task_groups = lscache.get("task_groups")
    }
    if (lscache.get("story_id")) {
      this.story_id = lscache.get("story_id")
    }
    // window.Telegram.WebApp.onEvent('mainButtonClicked', () => {
    //   window.Telegram.WebApp.MainButton.showProgress()
    //   this.addTask()
    // })
    // window.Telegram.WebApp.MainButton.setText("Add")
    // window.Telegram.WebApp.MainButton.show()
    window.Telegram.WebApp.onEvent('backButtonClicked', () => {
      this.$router.push({ name: 'AddGroupTask'});
    })
    this.group_id = this.$route.query.group_id
    this.task_id = this.$route.query.task_id
    this.task_type = this.$route.query.task_type
    this.getCampaignHash()
    window.Telegram.WebApp.BackButton.show()
    // window.Telegram.WebApp.MainButton.setText("Continue with tasks")
    // window.Telegram.WebApp.MainButton.show()

    // this.checkInitData({_auth: window.Telegram.WebApp.initData})
  },
  unmounted() {
    window.Telegram.WebApp.MainButton.hide()
    window.Telegram.WebApp.MainButton.hideProgress()
    window.Telegram.WebApp.offEvent('mainButtonClicked')
    window.Telegram.WebApp.BackButton.hide()
    window.Telegram.WebApp.offEvent('backButtonClicked')
  },
  methods: {
    getCampaignHash() {
      axios.get('api/getRandomHash', )
          .then(response => {
            this.story_id = response.data.data
            lscache.set("story_id", this.story_id)
          })
          .catch(error => {
            console.error(error);
          });
    },
    addTask() {
      // window.Telegram.WebApp.MainButton.hide()
      // window.Telegram.WebApp.MainButton.hideProgress()
      // window.Telegram.WebApp.offEvent('mainButtonClicked')
      lscache.remove("story_id")
      if (!this.task_id) {
        let new_task = {
          id: this.task_groups[this.group_id].tasks.length,
          type: this.task_type,
          is_done: false,
          is_loading: false,
          is_blocked: false,
          title: this.title,
          desc: this.desc,
          url: this.url,
          story_id: this.story_id,
          icon: this.emojies[this.selectedEmoji].url
        }
        this.task_groups[this.group_id].tasks.push(new_task)
      }
      else {
        this.task_groups[this.group_id].tasks[this.task_id] = {
          id: this.task_id,
          type: this.task_type,
          is_done: false,
          is_loading: false,
          is_blocked: false,
          title: this.title,
          desc: this.desc,
          url: this.url,
          story_id: this.story_id,
          icon: this.emojies[this.selectedEmoji].url
        };
      }

      lscache.set("task_groups", this.task_groups)
      this.$router.push({ name: 'AddGroupTask'});
    },
    hideMobileKeyboardTitle() {
      this.$refs.task_title.blur();
    },
    hideMobileKeyboardDesc() {
      this.$refs.task_desc.blur();
    },
    hideMobileKeyboardUrl() {
      this.$refs.task_url.blur();
    },
    onSelectEmoji(id) {
      this.selectedEmoji = id
    },
    getFileURL(file) {
      return URL.createObjectURL(file);
    },
    uploadStories(event) {
      let data = new FormData();
      let i = 1;
      for (let selectedImage of event.target.files) {
        data.append(`media_${i}`, selectedImage);
        i+=1
      }
        // if (selectedImage.size > maxUploadSize) {
        //   event.target.files = null
        //   this.uploads_stories = null
        //   window.Telegram.WebApp.showAlert("Image size should be less than 2 MB")
        // }
        // else if (!allowedUploadTypes.includes(selectedImage.type)) {
        //   event.target.files = null
        //   this.uploads_stories = null
        //   window.Telegram.WebApp.showAlert("Allowed types: jpg, png")
        // }
        // data.append('campaign_id', this.campaign.id);
      data.append('story_id', this.story_id);

        axios.post('api/uploadTaskStories', data)
            .then(() => {
              console.log("1")
            })
            .catch(error => {
              console.error(error);
            });

      }
  }
}

</script>

<style scoped>

</style>