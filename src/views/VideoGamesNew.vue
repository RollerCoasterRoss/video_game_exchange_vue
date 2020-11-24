<template>
  <div class="video-games-new">
    <form v-on:submit.prevent="createVideoGame()">
      <h1>Create New Video Game</h1>

      <ul>
        <li v-for="error in errors">{{ error }}</li>
      </ul>

      <div>
        <label>Title: </label>
        <input type="text" v-model="title">
      </div>

      <div>
        <label>Game Platform: </label>
        <select v-model="platform">
          <option v-for="platform in platforms" :value="platform.value">
            {{ platform.display }}
          </option>
        </select>
      </div>

      <div>
        <label>Rating: </label>
        <select v-model="rating_category">
          <option v-for="rating in ratings" :value="rating.value">
            {{ rating.display }}
          </option>
        </select>
      </div>

      <div>
        <label>Online Capabilities?: </label>
        <input type="radio" v-model="online" id="userChoice1" value="true">
        <label for="userChoice1">Yes</label>
        <input type="radio" v-model="online" id="userChoice2" value="false">
        <label for="userChoice2">No</label>
      </div>

      <div>
        <label>Release Year: </label>
        <input type="number" v-model="release_year">
      </div>

      <input type="submit" value="Create">
    </form>
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
      release_year: "",
      platforms: [
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