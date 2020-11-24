<template>
  <div class="video-games-edit">
    <form v-on:submit.prevent="updateVideoGame()">
      <h1>Edit Video Game</h1>

      <ul>
        <li v-for="error in errors">{{ error }}</li>
      </ul>

      <div>
        <label>Edit Title:</label>
        <input type="text" v-model="video_game.title">
      </div>

      <div>
        <label>Edit Game Platform:</label>
        <select v-model="video_game.platform">
          <option v-for="platform_option in platform_options" :value="platform_option.value">
            {{ platform_option.display }}
          </option>
        </select>
      </div>

      <div>
        <label>Edit Rating:</label>
        <select v-model="video_game.rating_category">
          <option v-for="rating_option in rating_options" :value="rating_option.value">
            {{ rating_option.display }}
          </option>
        </select>
      </div>

      <div>
        <label>Edit Online Capabilities:</label>
        <input type="radio" v-model="video_game.online" id="userChoice1" value="true">
        <label for="userChoice1">Yes</label>
        <input type="radio" v-model="video_game.online" id="userChoice2" value="false">
        <label for="userChoice2">No</label>
      </div>

      <div>
        <label>Edit Release Year:</label>
        <input type="number" v-model="video_game.release_year">
      </div>

      <input type="submit" value="Submit Changes">
    </form>
  </div>
</template>

<style>
</style>

<script>
var axios = require("axios");

export default {
  data: function() {
    return {
      video_game: {
        id: "",
        title: "",
        platform: "",
        rating_category: "",
        online: "",
        release_year: "",
        video_game_genres: [],
        formatted: {
          platform: "",
          rating_category: "",
        },
      },
      errors: [],
      platform_options: [
        {value: "nes", display: "Nintendo Entertainment System"},
        {value: "super_nintendo", display: "Super Nintendo Entertainment System"},
        {value: "genesis", display: "Sega Genesis"},
        {value: "n64", display: "Nintendo 64"},
        {value: "ps1", display: "Sony Playstation"},
        {value: "gamecube", display: "Nintendo Gamecube"},
        {value: "ps2", display: "Sony Playstation 2"},
        {value: "xbox", display: "Microsoft XBox"},
        {value: "wii", display: "Nintendo Wii"},
        {value: "ps3", display: "Sony Playstation 3"},
        {value: "xbox_360", display: "Microsoft XBox 360"},
        {value: "switch", display: "Nintendo Switch"},
        {value: "ps4", display: "Sony Playstation 4"},
        {value: "xbox_one", display: "Microsoft XBox One"},
      ],
      rating_options: [
        {value: "e", display: "Everyone"},
        {value: "e10", display: "Everyone 10+"},
        {value: "t", display: "Teen"},
        {value: "m17", display: "Mature 17+"},
        {value: "rp", display: "Rating Pending"},
      ],
    };
  },
  created: function() {
    axios
      .get("/api/video_games/" + this.$route.params.id)
      .then(response => {
        this.video_game = response.data;
      });
  },
  methods: {
    updateVideoGame: function() {
      var clientParams = {
        title: this.video_game.title,
        platform: this.video_game.platform,
        rating_category: this.video_game.rating_category,
        online: this.video_game.online,
        release_year: this.video_game.release_year,
      };
      axios
        .patch("/api/video_games/" + this.$route.params.id, clientParams)
        .then(response => {
          this.$router.push("/video_games/" + this.$route.params.id);
        }).catch(error => {
          this.errors = error.response.data.errors;
        });
    }
  }
};
</script>