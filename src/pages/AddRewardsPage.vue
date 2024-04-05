<template>
  <v-container>
    <v-card color="grey-darken-3" variant="tonal" elevation="0">
      <v-img src="" height="200"></v-img>
        <v-btn prepend-icon="mdi-plus" variant="plain" block color="blue" rounded="lg">
          Upload an icon reward
        </v-btn>
      </v-card>
    <v-card color="black" rounded="lg" elevation="0">
      <v-col>
        </v-col>
          <v-card-subtitle>
            Description for the reward
          </v-card-subtitle>
        <v-container>
          <v-text-field ref="field_2" @keyup.enter="hideMobileKeyboard1()" density="compact" rounded="lg" label="Description" variant="outlined" class="" rows="1" v-model="description" :rules="[
            () => !!description || 'This field is required.',
            () => !!description && description.length <= 100 || 'No more than 100 characters.',
            ]">
          </v-text-field>
      </v-container>
    </v-card>
  </v-container>

</template>


<script>
export default {
  description: null,
  data: () => ({
    user_id: 0,
  }),
  mounted() {
    window.Telegram.WebApp.onEvent('backButtonClicked', () => {
      this.$router.push({ name: 'AddCampaign'});
    })
    window.Telegram.WebApp.BackButton.show()
  },
  unmounted() {
    window.Telegram.WebApp.BackButton.hide()
    window.Telegram.WebApp.offEvent('backButtonClicked')
  },
  methods: {
    hideMobileKeyboard1() {
      this.$refs.field_1.blur()
    },
}
}
</script>

<style scoped>

</style>