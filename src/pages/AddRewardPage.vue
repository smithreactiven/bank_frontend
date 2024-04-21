<template>
  <v-container>
<!--    <v-card color="grey-darken-3" variant="tonal" elevation="0">-->
<!--      <v-img src="" height="200"></v-img>-->
<!--        <v-btn prepend-icon="mdi-plus" variant="plain" block color="blue" rounded="lg">-->
<!--          Upload an icon reward-->
<!--        </v-btn>-->
<!--      </v-card>-->
    <v-card color="#070B14" rounded="lg" elevation="0">
        <v-card-subtitle>
          Reward Amount
        </v-card-subtitle>
        <v-container>
          <v-text-field @keyup.enter="hideKeyboard" density="compact" rounded="lg" label="Amount" variant="outlined" class="" rows="1" v-model="amount" :rules="[
            () => !!amount || 'Reward field is required.',
            () => !!amount && amount.length <= 100 || 'No more than 100 characters.',
            ]">
        </v-text-field>

        <v-combobox
            variant="outlined"
            v-model="currency"
            label="Currency"
            :items="['Notcoin', 'USDT', 'TON', 'BTC',]"
        ></v-combobox>
          <v-card-subtitle>
            Icon 36x36px
          </v-card-subtitle>
          <v-sheet height="4px" color="#070B14"></v-sheet>
          <v-file-input
              variant="outlined"
              @change="onUploadImage"
              :rules="upload_rules"
              color="red"
              accept="image/png, image/jpeg, image/bmp"
              label="Upload an image"
              placeholder="Pick an avatar"
              v-model="upload_images"
          >
          </v-file-input>
          <div v-if="upload_images">
            <v-img width="64px" height="64px" :cover="true"  :src="getFileURL(upload_images[0])">
            </v-img>
          </div>
          <br>
          <v-row>
            <v-spacer></v-spacer>
            <v-col cols="8">
              <v-btn @click="setReward" class="text-none" rounded="lg" width="100%" variant="flat"
                     color="var(--tg-theme-button-color)">
                <template v-slot:default>
                  <label class="tg-button-text-color">
                    Save
                  </label>
                </template>
              </v-btn>
            </v-col>
            <v-spacer></v-spacer>
          </v-row>
        </v-container>
    </v-card>
  </v-container>

</template>


<script>
import lscache from "lscache";
import axios from "axios";
const allowedUploadTypes = ["image/png", "image/jpeg", "image/jpg"]
const maxUploadSize = 2000000

export default {
  name: "AddTaskPage",
  data: () => ({
    campaign_id: null,
    amount: '100.00',
    currency: 'TON',
    user_id: 0,
    upload_images: null,
    upload_rules: [
      value => {
        return !value || !value.length || value[0].size < maxUploadSize || 'Image size should be less than 2 MB!' || allowedUploadTypes.includes(value[0].type) || "Only jpg, png"
      },
      value => {
        return !value || !value.length || allowedUploadTypes.includes(value[0].type) || "Allowed types: jpg, png!"
      },
    ],
  }),
  mounted() {
    window.Telegram.WebApp.onEvent('backButtonClicked', () => {
      this.$router.push({ name: 'AddCampaign'});
    })
    window.Telegram.WebApp.BackButton.show()

    this.campaign_id = this.$route.query.campaign_id
  },
  unmounted() {
    window.Telegram.WebApp.BackButton.hide()
    window.Telegram.WebApp.offEvent('backButtonClicked')
  },
  methods: {
    hideKeyboard(event) {
      event.preventDefault();
      event.target.blur();
    },
    setReward() {
      if (!this.amount) {
        window.Telegram.WebApp.showAlert("Amount is is required field")
      }
      if (this.upload_images) {
        lscache.set("reward_image", `/api/static/uploads/reward_media_${this.campaign_id}.jpg`)
        this.uploadRewardImage()
        lscache.set("reward_amount", this.amount)
        lscache.set("reward_currency", this.currency)
        this.$router.push({ name: 'AddCampaign'});
      }
      else {
        lscache.set("reward_amount", this.amount)
        lscache.set("reward_currency", this.currency)
        this.$router.push({ name: 'AddCampaign'});
      }
    },
    onUploadImage(event) {
      let selectedImage = event.target.files[0]
      if (selectedImage.size > maxUploadSize) {
        event.target.files = null
        this.upload_images = null
      }
    },
    uploadRewardImage() {
      let data = new FormData();
      data.append('id', this.campaign_id);
      data.append('media', this.upload_images[0]);
      axios.post('api/uploadRewardImage', data)
          .then(() => {
            console.log(200)
          })
          .catch(error => {
            console.error(error);
          });
    },
    getFileURL(file) {
      return URL.createObjectURL(file);
    },
  }
}
</script>

<style scoped>

</style>