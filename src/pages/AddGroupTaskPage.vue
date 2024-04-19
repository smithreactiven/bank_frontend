<template>
  <v-container>
    <v-btn @click="allClear()" variant="tonal" color="red">
      Clear
    </v-btn>
    <div v-for="task_group in task_groups" :key="task_group">
      <v-sheet class="bg-transparent" height="10px" elevation="0"></v-sheet>
      <v-card color="#070B14">
        <v-card-item>
          <v-row align="center" justify="end" dense="">
            <v-col cols="9">
              <v-text-field
                  v-model="task_group.title"
                  @change="saveCache()"
                  @keyup.enter="hideKeyboard"
                  density="compact"
                  rounded="lg"
                  variant="outlined"
              >
              </v-text-field>
            </v-col>
            <v-col cols="1">
            </v-col>
            <v-col cols="2">
              <v-btn @click="deleteGroupTask(task_group.id)" variant="tonal" color="red" size="small" class=" rounded-lg" icon="mdi-minus"></v-btn>
            </v-col>
            <v-spacer></v-spacer>
            <v-col cols="12">
              <v-text-field
                  v-model="task_group.desc"
                  @change="saveCache()"
                  @keyup.enter="hideKeyboard"
                  bg-color="#16142C"
                  rounded="lg"
                  hide-details
                  style="width: 100%;"
                  density="compact"
                  variant="solo-filled"
              >
              </v-text-field>
            </v-col>
          </v-row>

          <div v-for="task in task_group.tasks" :key="task">
            <v-sheet class="bg-transparent" height="10px" elevation="0"></v-sheet>
            <v-card @click="redirectToTaskTemplate(task_group.id, task.id)" color="grey-lighten-4" rounded="lg" variant="outlined">
              <v-card-item>
                <v-row align="center">
                  <v-col cols="auto">
                    <v-card class="px-2 py-2" color="#16142C" rounded="lg">
                      <v-img width="25px" height="25px" :src="task.icon">
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
                </v-row>
              </v-card-item>
            </v-card>
          </div>
          <v-sheet class="bg-transparent" height="10px" elevation="0"></v-sheet>
          <v-card @click="redirectToTaskTemplate(task_group.id, null)" color="grey-lighten-4" rounded="lg" variant="outlined">
            <v-card-item>
              <v-row align="center">
                <v-col cols="auto">
                  <v-card class="px-2 py-2" color="#16142C" rounded="lg">
                    <v-icon width="25px" height="25px">
                      mdi-plus
                    </v-icon>
                  </v-card>
                </v-col>
                <v-col cols="6">
                  Add task
                </v-col>
                <v-spacer></v-spacer>
              </v-row>
            </v-card-item>
          </v-card>
        </v-card-item>
      </v-card>
    </div>

    <div>
      <v-container>
        <v-sheet class="bg-transparent" height="10px" elevation="0"></v-sheet>
        <v-card @click="addGroupTask" color="grey-lighten-4" rounded="lg" variant="outlined">
          <v-card-item>
            <v-row align="center">
              <v-col cols="auto">
                <v-card class="px-2 py-2" color="#16142C" rounded="lg">
                  <v-icon width="25px" height="25px">
                    mdi-plus
                  </v-icon>
                </v-card>
              </v-col>
              <v-col cols="6">
                Add group
              </v-col>
              <v-spacer></v-spacer>
            </v-row>
          </v-card-item>
        </v-card>
      </v-container>
    </div>
  </v-container>
</template>

<script>
import lscache from "lscache";
import {h} from "vue";
export default {
  name: "AddGroupTaskPage",
  data () {
    return {
      task_groups: [],
      task_groups1: [
        {
          title: "Task #1",
          id: 0,
          tasks: [
            {
              id: 0,
              title: "Subscribe to Entony",
              desc: "Description",
              points: 10,
              image: "./img_1.png",
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
    }
  },
  mounted() {
    // this.checkInitData({_auth: window.Telegram.WebApp.initData})
    window.Telegram.WebApp.onEvent('backButtonClicked', () => {
      this.$router.push({ name: 'AddCampaign'});
    })
    if (lscache.get("task_groups")) {
      this.task_groups = lscache.get("task_groups")
    }

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
    h,
    allClear() {
      this.task_groups = []
      lscache.set("task_groups", this.task_groups)
    },
    redirectToTaskTemplate(group_id, task_id) {
      this.$router.push({ name: 'TaskTemplate', query: {group_id: group_id, task_id: task_id}});
    },
    addGroupTask() {
      let task_group = {
        id: this.task_groups.length,
        title: `Group #${this.task_groups.length+1}`,
        desc: "desc",
        tasks: []
      }
      this.task_groups.push(task_group)
      lscache.set("task_groups", this.task_groups)
    },
    deleteGroupTask(group_id) {
      this.task_groups.splice(group_id, 1)
      for (let i = 0; i < this.task_groups.length; i++) {
        this.task_groups[i].id = i
      }
    },
    saveCache() {
      lscache.set("task_groups", this.task_groups)
    },
    hideKeyboard(event) {
      event.preventDefault();
      event.target.blur();
    }
  }
}
</script>
<style scoped>

</style>