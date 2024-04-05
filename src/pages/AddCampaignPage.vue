<template>
  <v-container>
    <v-card @click="alert('test')" rounded="lg" color="grey-darken-4" variant="tonal" elevation="0">
      <v-img class="rounded-lg" cover="true" src="https://cdn.pixabay.com/photo/2017/11/10/05/24/select-2935439_1280.png" height="250"></v-img>
      <v-btn prepend-icon="mdi-plus" variant="plain" block color="blue" rounded="lg">
        Upload an image
      </v-btn>
    </v-card>
    <br>
    <br>
    <v-card color="black" rounded="lg" elevation="0">
      <v-card-subtitle>
        Name and description
      </v-card-subtitle>
      <v-sheet height="4px" color="black"></v-sheet>
      <v-card class="px-3 pt-3" color="grey-darken-4" rounded="lg">
        <v-text-field ref="field_1" @keyup.enter="hideMobileKeyboard1()" density="compact" v-model:counter-value="counter_1" color="white" base-color="white" label="Name" :counter=true variant="outlined" rows="1" rounded="lg" v-model="name" :rules="[
                () => !!name || 'This field is required.',
                () => !!name && name.length <= 50 || 'No more than 50 characters.',
            ]">
          <template v-slot:counter>
            {{ counter_1 }}
          </template>
        </v-text-field>
        <v-text-field ref="field_2" @keyup.enter="hideMobileKeyboard2()" density="compact" rounded="lg" label="Description" variant="outlined" class="" rows="1" v-model="description" :rules="[
            () => !!description || 'This field is required.',
            () => !!description && description.length <= 100 || 'No more than 100 characters.',
            ]">
        </v-text-field>
      </v-card>
    </v-card>
    <br>
    <v-card color="black" rounded="lg" elevation="0">
      <v-card-subtitle>
        Campaign settings
      </v-card-subtitle>
      <v-sheet height="4px" color="black"></v-sheet>
      <v-card color="grey-darken-4" rounded="lg">
        <v-row align="start">
            <v-card-item class="ml-3 align-self-center">
              One by one access
            </v-card-item>
            <v-spacer></v-spacer>
            <v-switch color="green" class="ml-11 pt-5" inset @click="hapticImpactOccurred('soft')">
            </v-switch>
        </v-row>
          <v-divider></v-divider>
            <v-row align="start" class="pt-3">
              <v-card-item class="ml-3 align-self-center">
                Finish date
              </v-card-item>
              <v-spacer></v-spacer>
              <v-text-field ref="field_3" @keyup.enter="hideMobileKeyboard3()" density="compact" rounded="lg" label="DD/MM/YEAR" variant="underlined" :rules="[
            () => !!description || 'This field is required.',
            () => !!description && description.length <= 100 || 'No more than 100 characters.',
            ]">
              </v-text-field>

              <v-text-field ref="field_4" @keyup.enter="hideMobileKeyboard4()" density="compact" rounded="lg" label="00:00" variant="underlined" :rules="[
            () => !!description || 'This field is required.',
            () => !!description && description.length <= 100 || 'No more than 100 characters.',
            ]">
              </v-text-field>
            </v-row>

          <v-text-field v-model="currentDate" label="New date" type="date" v-if="showDateField"></v-text-field>

        <v-divider class="mt-3"></v-divider>
            <v-row align="start" class="pt-3">
              <v-card-item class="ml-3 align-self-center">
                  {{ campaigns_info[0].link }}
              </v-card-item>
              <v-spacer></v-spacer>
                <v-btn rounded="lg" size="small" variant="tonal" class="mt-2 mr-12" @click="copyLink()">
                  Copy
                </v-btn>
            </v-row>
        <v-divider class="mt-3"></v-divider>
      </v-card>
    </v-card>
    <br>
    <v-container>
      <v-card rounded="lg" color="grey-darken-4">
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
                1 tasks, 1 groups
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
            <v-col cols="auto">
              <v-card color="orange" width="30px" height="30px" rounded="lg">
                <v-icon class="icon-pending" color="white">
                  mdi-star
                </v-icon>
              </v-card>
            </v-col>
            <v-col cols="7">
              Rewards
              <v-card-subtitle>
                100,000 Notcoin
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
                  Link copied successfully
                </v-snackbar>
          </v-row>
        </v-card-item>
      </v-card>
    </v-container>
  </v-container>
</template>

<script>
  export default {
    data: () => ({
      description: null,
      name: null,
      counter_1: null,
      user_id: null,
      btndate: 'Not specified',
      alert: false,
      timeout: 2000,
      admins: [
        615311497, 293037127
      ],
      campaigns_info: [{
        name: 'Game',
        description: 'The new campaign',
        link: 'https//:t:me/campaing_1'
      }]
    }),
    mounted() {
      window.Telegram.WebApp.onEvent('backButtonClicked', () => {
        this.$router.push({
          name: 'AdminMode'
        });
      })
      window.Telegram.WebApp.BackButton.show()
    },
    unmounted() {
      window.Telegram.WebApp.BackButton.hide()
      window.Telegram.WebApp.offEvent('backButtonClicked')
    },
    methods: {
      hideMobileKeyboard1() {
        this.$refs.field_1.blur();
      },
      hideMobileKeyboard2() {
        this.$refs.field_2.blur();
      },
      hideMobileKeyboard3() {
        this.$refs.field_3.blur();
      },
      hideMobileKeyboard4() {
        this.$refs.field_4.blur();
      },
      hapticImpactOccurred(style) {
        window.Telegram.WebApp.HapticFeedback.impactOccurred(style);
      },
      redirectToRewards() {
        this.$router.push({
          name: 'AddRewards'
        });
      },
      copyLink() {
        const link = this.campaigns_info[0].link;
        navigator.clipboard.writeText(link)
          .then(() => {
            this.alert = true;
          })
          .catch((error) => {
            console.error("Failed to copy text:", error);
          });
      },
      changeDate() {
        if (!this.showDateField) {
        this.showDateField = true;
        this.btndate = "specified";
      } else {
        this.showDateField = false;
        this.btndate = "not specified";
      }
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
</style>