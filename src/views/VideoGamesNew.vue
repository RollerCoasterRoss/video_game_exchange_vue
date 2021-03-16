<template>
  <div class="video-games-new">
    <div class="section-container">
      <div class="title-container pixel-border">
        <div class="row">
          <div class="col-2"/>
          <div class="col-8 underline-header">
            <h2 class="text-center">Create New Video Game</h2>
          </div>
          <div class="col-2"/>
        </div>
      </div>

      <form v-on:submit.prevent="createVideoGame()">
        <ul>
          <li class="text-danger" v-for="error in errors">{{ error }}</li>
        </ul>

        <div class="form-group">
          <label>Title</label>
          <input type="text" class="form-control" v-model="title">
        </div>

        <div class="form-group">
          <label>Game Platform</label>
          <select class="form-control mb-2 mr-sm-3 custom-select standard-select" v-model="platform">
            <option v-for="platform in platforms" :value="platform.value">
              {{ platform.display }}
            </option>
          </select>
        </div>

        <div class="form-group">
          <label>Rating</label>
          <select class="form-control mb-2 mr-sm-3 custom-select standard-select" v-model="rating_category">
            <option v-for="rating in ratings" :value="rating.value">
              {{ rating.display }}
            </option>
          </select>
        </div>

        <div class="form-group">
          <label>Online Capabilities</label>
          <div>
            <div class="form-check form-check-inline">
              <label class="form-check-label mr-sm-2" for="userChoice1">Yes</label>
              <input class="form-check-input" type="radio" v-model="online" id="userChoice1" value="true">
            </div>
            <div class="form-check form-check-inline">
              <label class="form-check-label mr-sm-2" for="userChoice2">No</label>
              <input class="form-check-input" type="radio" v-model="online"  id="userChoice2" value="false">
            </div>
          </div>
        </div>

        <div class="form-group">
          <label>Release Year</label>
          <input type="number" class="form-control" v-model="release_year" placeholder="example: 1986">
        </div>

        <div class="form-group">
          <div class="btn-v-align-right">
            <span class="btn-v-box">
              <input type="submit" class="btn-v btn-v-brand" value="Create">
            </span>
          </div>
        </div>
      </form>
  </div>

  </div>
</template>

<syle>
</syle>

<script>
var axios = require("axios");

export default {
  data: function() {
    return {
      title: "",
      online: "",
      platform: "",
      rating_category: "",
      online: "",
      release_year: "1986",
      platforms: [
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
      ratings: [
        {value: "e", display: "Everyone"},
        {value: "e10", display: "Everyone 10+"},
        {value: "t", display: "Teen"},
        {value: "m17", display: "Mature 17+"},
        {value: "rp", display: "Rating Pending"},
      ],
      errors: [],
    };
  },
  created: function() {},
  methods: {
    createVideoGame: function() {
      var clientParams = {
        title: this.title,
        platform: this.platform,
        rating_category: this.rating_category,
        online: this.online,
        release_year: this.release_year,
      };

      axios
        .post("/api/video_games", clientParams)
        .then(response => {
          this.$router.push("/video_games/" + response.data.id);
        }).catch(error => {
          this.errors = error.response.data.errors;
        });
    }
  }
};
</script>