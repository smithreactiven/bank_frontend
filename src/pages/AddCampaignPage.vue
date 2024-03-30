<template>
  <v-container>
    <v-card color="grey-darken-3" variant="tonal" elevation="0">
      <v-img src="" height="250"></v-img>
      <v-btn prepend-icon="mdi-plus" variant="plain" block color="blue" rounded="xl">
        Upload an image
      </v-btn>
    </v-card>
    <v-card color="grey-darken-4" rounded="xl" elevation="0">
      <v-col>
      </v-col>
      <v-card-subtitle>
        Name and description
      </v-card-subtitle>
      <v-container>
          <v-text-field
          variant="solo"
          bg-color="white"
          rows="1"
          rounded="xl"
          v-model="name"
          :rules="[
          () => !!name || 'This field is required.',
          () => !!name && name.length <= 50 || 'No more than 50 characters.',
          ]"
          > </v-text-field>

          <v-text-field
          label=""
          variant="solo"
          class=""
          rows="1"
          bg-color="white"
          rounded="xl"
          v-model="description"
          :rules="[
          () => !!description || 'This field is required.',
          () => !!description && description.length <= 100 || 'No more than 100 characters.',
          ]"
          ></v-text-field>
      </v-container>
    </v-card>
    <v-card color="grey-darken-4" rounded="xl" elevation="0" height="300">
      <v-row align="center">
        <v-col cols="auto">
          <v-card-subtitle>
        Campaign settings
      </v-card-subtitle>
        </v-col>
        <v-col cols="auto" class="ml-4 ">
          One by one task access
        </v-col>
        <v-spacer></v-spacer>
        <v-col cols="2">
          <v-switch
              label=""
              color="green"
              class="pt-5"
              inset
              @click="hapticImpactOccurred('soft')">
          </v-switch>
        </v-col>
        <v-col cols="1"></v-col>
      </v-row>
        <v-row align="center">
          <v-col cols="auto" class="ml-4" rounded="xl">
            Finish date
            </v-col>
              <v-spacer></v-spacer>
                <v-btn variant="tonal" rounded="xl">
                  Not specified
                </v-btn>
              <v-col cols="auto"></v-col>
            </v-row>
          <v-row align="center">
        <v-col cols="auto"
               class="ml-4"
               rounded="xl">
          https//:t:me/campaing_1
        </v-col>
      <v-spacer></v-spacer>
    <v-btn variant="tonal" rounded="xl">
      Copy
    </v-btn>
  <v-col cols="auto"></v-col>
</v-row>
</v-card>
<v-container>

<v-card rounded="xl">
  <v-card-item>
    <v-row align="center">
      <v-col cols="auto">
        <v-btn variant="tonal" elevation="0" rounded="xl" size="x-small" icon="mdi-plus">
        </v-btn>
      </v-col>
      <v-col cols="7">
        All your tasks
          <v-card-subtitle>
            1 tasks, 1 groups
        </v-card-subtitle>
      </v-col>
    <v-spacer></v-spacer>
  </v-row>
</v-card-item>
</v-card>

<v-col cols="1" divider></v-col>

<v-card
  rounded="xl"
  @click="redirectToRewards(); hapticImpactOccurred('light')">
    <v-card-item>
      <v-row align="center">
        <v-col cols="auto">
          <v-btn variant="tonal" elevation="0" rounded="xl" size="x-small" icon="mdi-star">
          </v-btn>
        </v-col>
      <v-col cols="7">
        Rewards
          <v-card-subtitle>
            100,000 Notcoin
          </v-card-subtitle>
        </v-col>
      <v-spacer></v-spacer>
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
    user_id: null,
    admins: [
      615311497, 293037127
    ],
    campaigns_info: [
      {
        name: 'Game',
        description: 'The new campaign',
        link: 'https//:t:me/campaing_1'
      }
    ]
  }),
  mounted() {
  },
  methods: {
    hapticImpactOccurred(style) {
      window.Telegram.WebApp.HapticFeedback.impactOccurred(style)
    },
    redirectToRewards() {
      this.$router.push('/addRewards')
    }
  }
}

</script>

<style scoped>
.back {
    background: linear-gradient(to right, #1a1a1a 78%, #0d0d0d 100%);
}
</style>