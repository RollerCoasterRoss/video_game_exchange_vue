<template>
  <div class="video-games-show">
    <h1>{{ video_game.title }}</h1>
    <h3>Initial Release Year: {{ video_game.release_year }}</h3>
    <h3>Platform: {{ video_game.formatted.platform}}</h3>
    <h3>Rating(Age): {{ video_game.formatted.rating_category }}</h3>
    <h3>Game Has Online Capabilities: {{ video_game.online ? "Yes" : "No" }}</h3>
    <h3>Genres:</h3>
      <ul>
        <li v-for="video_game_genre in video_game.video_game_genres">{{ video_game_genre.genre.name }} <button v-on:click="destroyVideoGameGenre(video_game_genre)">Delete</button></li>
      </ul>

    <div>
      <form v-on:submit.prevent="createVideoGameGenre()">

        <h2>Enter genre to add:</h2>

        <ul>
          <li v-for="error in errors">{{ error }}</li>
        </ul>

        <div>
          <label>Genre:</label>
          <select v-model="genre_connection_id">
            <option v-for="genre in genres" :value="genre.id">{{ genre.name }}</option>
          </select>
        </div>

        <input type="submit" value="Add Genre">
      </form>
    </div>

    <div>
      <router-link v-bind:to="'/video_games/' + video_game.id + '/edit'">Edit Video Game Info</router-link>
    </div>

    <div>
      <router-link to="/video_games" class="btn btn-primary">Add Cartridges to Collection</router-link>
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
      genres: [],
      genre_connection_id: "",
      errors: [],
    };
  },
  created: function() {
    axios
      .get("/api/video_games/" + this.$route.params.id)
      .then(response => {
        this.video_game = response.data;
      });
    axios
      .get("/api/genres")
      .then(response => {
        this.genres = response.data;
      });
  },
  methods: {
    createVideoGameGenre: function() {
      var clientParams = {
        genre_id: this.genre_connection_id,
        video_game_id: this.video_game.id
      };
      axios
        .post("/api/video_game_genres", clientParams)
        .then(response => {
          this.video_game.video_game_genres.push(response.data);
        }).catch(error => {
          this.errors = error.response.data.errors;
        });
    },
    destroyVideoGameGenre: function(videoGameGenreObject) {
      axios
        .delete("/api/video_game_genres/" + videoGameGenreObject.id)
        .then(response => {
          var index = this.video_game.video_game_genres.indexOf(videoGameGenreObject);
          this.video_game.video_game_genres.splice(index, 1);
        });
    }
  }
};
</script>