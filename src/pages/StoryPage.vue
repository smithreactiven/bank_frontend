<template>
  <v-carousel
      color="var(--tg-theme-button-color)"
      progress="var(--tg-theme-button-color)"
      height="var(--tg-viewport-height)"
      :interval="3000"
      hide-delimiters
      cycle
      :show-arrows="false"
  >
    <v-carousel-item

        v-for="(item, i) in stories"
        :key="i"
        :src="item"
        :cover="true"
    >
    </v-carousel-item>
  </v-carousel>
</template>

<script>
import axios from "axios";
// import lscache from "lscache";

export default {
  name: "StoryPage",
  data() {
    return {
      story_id: "124525fasffas",
      stories: ["/api/static/uploads/story_bbe3b6f48ad1329b_media_1.jpg",]
    }
  },
  mounted() {
    this.story_id = this.$route.query.story_id
    this.getStories(this.story_id)
    window.Telegram.WebApp.onEvent('backButtonClicked', () => {
      this.$router.push({ name: "Campaign", query: {campaign_id: this.$route.query.campaign_id}});
    })

    window.Telegram.WebApp.BackButton.show()
  },
  unmounted() {
    window.Telegram.WebApp.offEvent('backButtonClicked')
    window.Telegram.WebApp.BackButton.hide()
  },
  methods: {
    // getCampaignHash() {
    //   axios.get('api/getRandomHash', )
    //       .then(response => {
    //         this.story_id = response.data.data
    //         lscache.set("story_id", this.story_id)
    //       })
    //       .catch(error => {
    //         console.error(error);
    //       });
    // },
    getStories(story_id) {
      axios.post('api/getStories', {
        story_id: story_id
      }).then(response => {
        this.stories = response.data.stories
      })
          .catch(error => {
            console.error(error);
          });
    }
  }
}
</script>

<style scoped>

</style>