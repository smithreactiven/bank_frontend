<template>
  <v-container>
    <v-row>
      <v-col cols="6">
        <v-card class="pt-1" v-for="item in items" :key="item.name" color="black">
          <div class="text-h6 white--text">{{item.name}} ></div>
        </v-card>
      </v-col>
      <v-col cols="6">
        <v-btn rounded="xl" color="#6c5ce7" prepend-icon="mdi-check-circle" @click="redirectToBonusPage()">
          <div class="font-weight-bold text-white" style="font-size: 10px;">
            Бонус за друга
          </div>
        </v-btn>
      </v-col>
    </v-row>
    <v-container>

    </v-container>

    <v-row>
      <v-col cols="6">
        <v-card class="pt-5 spending" elevation="0" @click="redirectToSpendingPage()" style="z-index: 1" variant="tonal" rounded="xl" height="130" width="160" color="white">
          <v-card-text class="bg-transparent text-center py-0 px-0" v-for="item in items" :key="item.name">
            <label class="theme-label-hint-color" style="font-size: 16px">
              Все операции
              <br>
            </label>
            <label style="font-size: 10px">
              Траты за все время: {{item.spending}} ₽
            </label>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="6">
        <v-card class="pt-5 ton" elevation="0" @click="redirectToInviteFriendPage()" style="z-index: 1" variant="tonal" rounded="xl" height="130" width="160" color="white">
          <v-card-text class="bg-transparent text-center py-0 px-0">
            <label style="font-size: 16px">
              Посмотреть
              <br> Ton
            </label>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-card
            class="account"
            v-for="item in items"
            :key="item.name"
            height="100"
            width="350"
            rounded="xl"
            v-model="balance"
        >
          <v-card-text style="font-size: 18px; color: white;">
            {{balance}} ₽
          </v-card-text>
          <label class="ml-4" style="color: white"> Bank account </label>
        </v-card>
      </v-col>
    </v-row>
    <v-row class="d-flex justify-center">
      <v-col cols="6">
        <v-btn variant="tonal" style="font-size: 11px" rounded="xl" @click="TopUpBalance = true">
          Пополнить баланс
        </v-btn>
      </v-col>
      <v-col cols="6">
        <v-btn variant="tonal" style="font-size: 11px" rounded="xl">
          Перевести деньги
        </v-btn>
      </v-col>
    </v-row>
    <v-row align="center" v-if="TopUpBalance">
      <v-col cols="12">
        <v-card color="black" class="mt-5" v-for="item in items" :key="item.name">
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
          <v-btn
              variant="tonal"
              style="font-size: 11px"
              rounded="xl"
              color="yellow"
              @click="topUpBalanceToServer(replenishment)"
          >
            Подтвердить
          </v-btn>
        </v-card>
      </v-col>
    </v-row>

    <v-dialog v-model="isDialogVisible" :timeout="timeout" width="auto">
      <v-card width="300" height="150" text="Средства зачисляются на ваш счет..." title="Update in progress" color="black">
        <v-progress-circular color="purple" indeterminate size="25" width="3"></v-progress-circular>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script>
import axios from "axios";

export default {
  name: "HomePage",
  components: {},
  data: () => ({
    TopUpBalance: false,
    isDialogVisible: false,
    timeout: 1000,
    replenishment: null,
    user_id: null,
    balance: null,
    items: [{
      name: 'Vadim',
      spending: 123,
      alert: false,
    }]
  }),
  mounted() {
    window.Telegram.WebApp.setBackgroundColor("#000000")
    window.Telegram.WebApp.BackButton.hide()
    window.Telegram.WebApp.MainButton.hide()
    this.checkInitData({_auth: window.Telegram.WebApp.initData})
  },
  methods: {
    checkInitData(data) {
      axios.post('api/checkInitData', data)
          .then(response => {
            this.user_id = response.data.user.id;
            this.viewBalance(response.data.user.id)
          })
          .catch(error => {
            console.error(error);
          });
    },
    topUpBalanceToServer(replenishment) {
      axios.post('api/topUpBalance', {replenishment, user_id: this.user_id})
          .then(response => {
            this.balance = response.data.balance;
            this.user_id = response.data.user_id
          })
          .catch(error => {
            console.error(error);
          });
      this.isDialogVisible = true;
      setTimeout(() => {
        this.isDialogVisible = false;
      }, this.timeout);
    },
    viewBalance() {
      axios.post('api/viewBalance', {user_id: this.user_id})
          .then(response => {
            this.balance = response.data.balance
          })
          .catch(error => {
            console.error(error);
          });
    },
    redirectToSpendingPage() {
      this.$router.push('/spending')
    },
    redirectToBonusPage() {
      this.$router.push('/bonus')
    }
  }
}

</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@800&family=Roboto&display=swap');
.account {
  background: linear-gradient(45deg, #000000 60%, #FFFF00 120%);
}
.spending {
  background: linear-gradient(45deg, #000000 50%, #FFFF00 120%);
}
.ton {
background: linear-gradient(45deg, #FFFF00 -20%, #000000 50%);
}

.overflow-auto {
  overflow-x: scroll;
  overflow-y: hidden;
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.overflow-auto::-webkit-scrollbar {
  display: none;
}
</style>