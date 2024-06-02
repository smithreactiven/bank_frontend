<template>
  <v-container>
    <v-row>
      <v-col cols="6">
        <v-card color="black" class="pt-2">
          Кому перевод
        </v-card>
      </v-col>
          <v-col cols="6">
            <v-btn
              variant="tonal"
              style="font-size: 11px"
              rounded="xl"
              @click="showContact == true"
              class="ml-15"
            >
            Выбрать
          </v-btn>
        </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-card color="black">
          Перевод для <b>{{ recipient }}</b>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
          <v-text-field
            label="Введите сумму: ₽"
            variant="solo-filled"
            density="compact"
            color="black"
            :rules="[
              () =>!!replenishment || 'Это поле обязательное!',
              () => /^\d{1,7}$/.test(replenishment) || 'Введите сумму от 1 до 7 цифр',
            ]"
            v-model="replenishment"
            type="number"
            pattern="[09]*"
          >
          </v-text-field>
      </v-col>
    </v-row>
  <v-row>
    <v-col cols="12">
    <v-card color="black" align="center">
      <v-img
        :width="70"
        aspect-ratio="1/1"
        src="./money.png"
    >
    </v-img>
    </v-card>
    </v-col>
  </v-row>

    <v-row>
        <v-col cols="12" class="text-center">
          <v-btn rounded="xl"
                 variant="tonal"
                 style="font-size: 11px"
                 class="mt-15"
          >
            Перевести
          </v-btn>
        </v-col>
    </v-row>

  </v-container>
</template>

<script>
import axios from "axios";

export default {
  data: () => ({
    name: "TransferPage",
    showContact: false,
    recipient: "Мария"
  }),
    mounted() {
    window.Telegram.WebApp.setBackgroundColor("#000000")
    window.Telegram.WebApp.onEvent('backButtonClicked', () => {
      this.$router.push({ path: '/'});
    })
    window.Telegram.WebApp.BackButton.show()
    this.checkInitData({_auth: window.Telegram.WebApp.initData})
  },
    unmounted() {
      window.Telegram.WebApp.BackButton.hide()
  },

  methods: {
    checkInitData(data) {
      axios.post('api/checkInitData', data)
          .then(response => {
            this.user_id = response.data.user.id
          })
          .catch(error => {
            console.error(error);
          });
    },
      showContactUser() {
        window.Telegram.WebApp.openContact({
          // Опциональные параметры
          // start_param: 'ome_start_param',
          // request_write_access: true,
        }).then(result => {
          console.log('Contact selected:', result);
          alert(`Contact selected: ${result.contact.first_name} ${result.contact.last_name}`);
        }).catch(error => {
          console.error('Error selecting contact:', error);
          alert('Error selecting contact');
        });
      }
    }
  }
</script>

<style scoped>

</style>
