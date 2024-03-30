<template>
  <v-container>
    <v-card color="grey-darken-3" variant="tonal" elevation="0">
      <v-img src="" height="200"></v-img>
        <v-btn prepend-icon="mdi-plus" variant="plain" block color="blue" rounded="xl">
          Upload an icon reward
        </v-btn>
      </v-card>
    <v-card color="grey-darken-4" rounded="xl" elevation="0">
      <v-col>
        </v-col>
          <v-card-subtitle>
            Description for the reward
          </v-card-subtitle>
        <v-container><v-text-field
          label=""
          variant="solo"
          bg-color="white"
          rows="1"
          rounded="xl"
          v-model="name"
          :rules="[
          () => !!name || 'This field is required.',
          ]"
          >
        </v-text-field>
      </v-container>
    </v-card>
  </v-container>

</template>


<script>
export default {
  data: () => ({
    user_id: 0,
  }),
  mounted() {
    window.Telegram.WebApp.BackButton.show()
  },
}
</script>

<style scoped>

</style>