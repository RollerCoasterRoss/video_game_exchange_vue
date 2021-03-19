<template>
  <div class="video-games-edit">
    <div class="section-container">
      <div class="title-container pixel-border">
        <div class="row">
          <div class="col-2"/>
          <div class="col-8 underline-header">
            <h2 class="text-center">Edit Video Game</h2>
          </div>
          <div class="col-2"/>
        </div>
      </div>
    </div>

    <div class="section-container">
      <form v-on:submit.prevent="updateVideoGame()">
        <ul>
          <li class="text-danger" v-for="error in errors">{{ error }}</li>
        </ul>

        <div class="form-group">
          <label>Title</label>
          <input type="text" class="form-control" v-model="video_game.title">
        </div>

        <div class="form-group">
          <label>Game Platform</label>
          <select class="form-control custom-select" v-model="video_game.platform">
            <option v-for="platform_option in platform_options" :value="platform_option.value">
              {{ platform_option.display }}
            </option>
          </select>
        </div>

        <div class="form-group">
          <label>Rating</label>
          <select class="form-control custom-select" v-model="video_game.rating_category">
            <option v-for="rating_option in rating_options" :value="rating_option.value">
              {{ rating_option.display }}
            </option>
          </select>
        </div>

        <div class="form-group">
          <label>Online Capabilities</label>
          <div>
            <div class="form-check form-check-inline">
              <label class="form-check-label mr-sm-2" for="userChoice1">Yes</label>
              <input class="form-check-input" type="radio" v-model="video_game.online" id="userChoice1" value="true">
            </div>
            <div class="form-check form-check-inline">
              <label class="form-check-label mr-sm-2" for="userChoice2">No</label>
              <input class="form-check-input" type="radio" v-model="video_game.online"  id="userChoice2" value="false">
            </div>
          </div>
        </div>

        <div class="form-group">
          <label>Release Year</label>
          <input type="number" class="form-control" v-model="video_game.release_year">
        </div>

        <div class="form-group">
          <div class="btn-v-align-right">
            <span class="btn-v-box">
              <input type="submit" class="btn-v btn-v-brand" value="Submit Changes">
            </span>
          </div>
        </div>
      </form>
    </div>

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
        {value: "xbox_og", display: "Microsoft XBox"},
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
      })
      .catch(error => {
        if(error.response.status === 401) {
          this.$router.push("/logout");
        }
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