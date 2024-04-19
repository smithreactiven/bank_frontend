<template>
  <v-row>
    <v-col v-for="i in 1" :key="i" cols="12">
    </v-col>
  </v-row>
  <v-container>
    <v-container>
      <h2>Admin Mode</h2>
      <br>
      <v-card elevation="0" rounded="lg" color="#16142C" variant="flat">
      <v-card @click="redirectToAddCampaign" elevation="0" rounded="lg" class="rounded-b-0" variant="flat" color="#16142C">
        <v-row class="pt-3 pb-3" align="center">
          <v-col cols="1">
          </v-col>
          <v-col cols="auto">
            <v-card width="30px" variant="tonal" height="30px" color="green" rounded="lg">
              <v-icon class="icon-pending">
                mdi-plus
              </v-icon>
            </v-card>
          </v-col>
          <v-col cols="auto">
            Add campaign
          </v-col>
          <v-spacer></v-spacer>
          <v-col cols="auto">
            <v-icon color="grey-darken-1">mdi-chevron-right</v-icon>
          </v-col>
          <v-col cols="1">
          </v-col>
        </v-row>
      </v-card>
        <v-row class="bg-transparent" :no-gutters=true>
          <v-spacer></v-spacer>
          <v-col class="bg-transparent" cols="11">
            <v-sheet height="1px" color="grey-darken-2"></v-sheet>
          </v-col>
        </v-row>
      <v-card @click="redirectToEditCampaign" rounded="lg" class="rounded-t-0" variant="flat" color="#16142C">
        <v-row class="pt-3 pb-3" align="center">
          <v-col cols="1">
          </v-col>
          <v-col cols="auto">
            <v-card variant="tonal" width="30px" height="30px" color="blue" rounded="lg">
              <v-icon class="icon-pending">
                mdi-pencil
              </v-icon>
            </v-card>
          </v-col>
          <v-col cols="auto">
            Edit campaign
          </v-col>
          <v-spacer></v-spacer>
          <v-col cols="auto">
            <v-icon color="grey-darken-1">mdi-chevron-right</v-icon>
          </v-col>
          <v-col cols="1">
          </v-col>
        </v-row>
      </v-card>
      </v-card>

      <br>

      <v-card @click="redirectListDoneCampaign" rounded="lg" variant="flat" color="#16142C">
        <v-row class="pt-2 pb-2" align="center">
          <v-col cols="1">
          </v-col>
          <v-col cols="auto">
            <v-card variant="tonal" color="orange" width="30px" height="30px" rounded="lg">
              <v-icon class="icon-pending">
                mdi-format-list-bulleted
              </v-icon>
            </v-card>
          </v-col>
          <v-col cols="auto">
            List done tasks
          </v-col>
          <v-spacer></v-spacer>
          <v-col cols="auto">
            <v-icon color="grey-darken-1">mdi-chevron-right</v-icon>
          </v-col>
          <v-col cols="1">
          </v-col>
        </v-row>
      </v-card>
    </v-container>
<!--    <v-container>-->
<!--      <v-btn prepend-icon="mdi-list-box-outline" class="text-none text-subtitle-1"-->
<!--             :block=true size="large"-->
<!--             rounded="lg"-->
<!--             variant="flat"-->
<!--             color="#16142C"-->
<!--      >-->
<!--        <template v-slot:default>-->
<!--          <b>List campaign</b>-->
<!--        </template>-->
<!--      </v-btn>-->
<!--    </v-container>-->
<!--    <v-container>-->
<!--      <v-btn prepend-icon="mdi-format-list-bulleted" class="text-none text-subtitle-1"-->
<!--             :block=true size="large"-->
<!--             rounded="lg"-->
<!--             variant="flat"-->
<!--             color="#16142C"-->
<!--      >-->
<!--        <template v-slot:default>-->
<!--          <b>List campaign</b>-->
<!--        </template>-->
<!--      </v-btn>-->
<!--    </v-container>-->
  </v-container>
</template>

<script>
export default {
  name: "AdminModePage",
  mounted() {
    window.Telegram.WebApp.onEvent('backButtonClicked', () => {
      this.$router.push({ path: '/'});
    })
    window.Telegram.WebApp.BackButton.show()
    // window.Telegram.WebApp.MainButton.setText("Continue with tasks")
    // window.Telegram.WebApp.MainButton.show()
  },
  unmounted() {
    window.Telegram.WebApp.MainButton.hide()
    window.Telegram.WebApp.BackButton.hide()
    window.Telegram.WebApp.offEvent('backButtonClicked')
  },
  methods: {
    redirectToAddCampaign() {
      this.$router.push({name: 'AddCampaign', });
    },
    redirectToEditCampaign() {
      this.$router.push({name: 'ListEditCampaign', });
    },
    redirectListDoneCampaign() {
      this.$router.push({name: 'ListDoneCampaign', });
    },
  }
}
</script>

<style scoped>
@import url('https://fonts.cdnfonts.com/css/sf-pro-display');

.my-font {
  font-family: 'SF Pro Display', sans-serif !important;
}

.icon-pending {
  padding-left: 7px;
  padding-top: 3px;
}

</style>