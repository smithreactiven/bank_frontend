<template>
  <v-container>
      <v-container>
        <div v-for="temp in task_templates" :key="temp">
        <v-sheet class="bg-transparent" height="20px" elevation="0"></v-sheet>
        <v-card @click="redirectToAddTask(group_id, task_id, temp.type)" color="grey-lighten-4" rounded="lg" variant="outlined">
          <v-card-item>
            <v-row align="center">
              <v-col cols="auto">
                <v-card class="px-2 py-2" color="grey-darken-4" rounded="lg">
                  <v-img width="25px" height="25px" :src="temp.image">
                  </v-img>
                </v-card>
              </v-col>
              <v-col cols="6">
                {{ temp.title }}
              </v-col>
              <v-spacer></v-spacer>
              <v-col cols="auto">
                <v-icon>
                  mdi-chevron-right
                </v-icon>
              </v-col>
            </v-row>
          </v-card-item>
        </v-card>
        </div>
      </v-container>
  </v-container>
</template>

<script>
export default {
  name: "TaskTemplatePage",
  data () {
    return {
      group_id: 0,
      task_id: 0,
      task_templates: [
        {
          title: "Subscribe Telegram",
          type: "subscribe",
          image: "https://em-content.zobj.net/source/apple/391/megaphone_1f4e3.png",
          url: "",
        },
        {
          title: "Open Link",
          type: "open_link",
          image: "https://em-content.zobj.net/source/apple/391/link_1f517.png",
          url: "",
        },
        {
          title: "View Story",
          type: "view_story",
          image: "https://em-content.zobj.net/source/apple/391/eyes_1f440.png",
          url: "",
        },
      ]
    }
  },
  mounted() {
    // this.checkInitData({_auth: window.Telegram.WebApp.initData})
    window.Telegram.WebApp.onEvent('backButtonClicked', () => {
      this.$router.push({ name: 'AddGroupTask'});
    })
    this.group_id = this.$route.query.group_id
    this.task_id = this.$route.query.task_id
    window.Telegram.WebApp.BackButton.show()
    // window.Telegram.WebApp.MainButton.setText("Continue with tasks")
    // window.Telegram.WebApp.MainButton.show()

    // this.checkInitData({_auth: window.Telegram.WebApp.initData})
  },
  unmounted() {
    // window.Telegram.WebApp.MainButton.hide()
    window.Telegram.WebApp.BackButton.hide()
    window.Telegram.WebApp.offEvent('backButtonClicked')
  },
  methods: {
    redirectToAddTask(group_id, task_id, task_type) {
      this.$router.push({name: 'AddTask', query: {group_id: group_id, task_id: task_id, task_type: task_type}});
    },
  }
}
</script>
<style scoped>

</style>