<template>
  <div class="video-games-show">
    <div class="section-container">
      <div class="title-container pixel-border">
        <div class="row">
          <div class="col-2"/>
          <div class="col-8 underline-header">
            <h2 class="text-center">Video Game Info</h2>
          </div>
          <div class="col-2"/>
        </div>
      </div>

      <div class="jumbotron bg-v-dark-2">
        <h1 class="display-4">{{ video_game.title }}</h1>
        <p class="lead">Initial Release Year: {{ video_game.release_year }}</p>
        <hr class="my-4"/>
        <p>Platform: {{ video_game.formatted.platform}}</p>
        <p>Rating(Age): {{ video_game.formatted.rating_category }}</p>
        <p>Game Has Online Capabilities: {{ video_game.online ? "Yes" : "No" }}</p>
        <hr class="my-4"/>
        <span class="float-right">
          <span class="btn-v-box">
            <router-link :to="'/video_games/' + video_game.id + '/edit'" class="btn-v btn-v-brand">Edit</router-link>
          </span>
        </span>
      </div>
    
      <div class="text-center">
        <span class="btn-v-box">
          <router-link to="/video_games" class="btn-v btn-v-brand">Add Cartridges to Collection</router-link>
        </span>
      </div>
    </div>

    <div class="section-container">
      <div class="title-container pixel-border">
        <div class="row">
          <div class="col-2"/>
          <div class="col-8 underline-header">
            <h2 class="text-center">Genres</h2>
          </div>
          <div class="col-2"/>
        </div>
      </div>
    </div>

    <div class="section-container">
      <div class="row">
        <div class="col-2">
        </div>

        <div class="col">
          <ul>
            <li class="my-2" v-for="video_game_genre in video_game.video_game_genres">{{ video_game_genre.genre.name }} <button class="btn-v btn-v-brand btn-sm" v-on:click="destroyVideoGameGenre(video_game_genre)">Delete</button></li>
          </ul>
        </div>

        <div class="col">
          <form v-on:submit.prevent="createVideoGameGenre()">
            <ul>
              <li class="text-danger" v-for="error in errors">{{ error }}</li>
            </ul>

            <div class="form-group">
              <label>Select Genre to Add</label>
              <select class="form-control custom-select" v-model="genre_connection_id">
                <option v-for="genre in genres" :value="genre.id">{{ genre.name }}</option>
              </select>
            </div>

            <div class="form-group">
              <span class="float-right">
                <span class="btn-v-box">
                  <input type="submit" class="btn-v btn-v-brand" value="Add Genre">
                </span>
              </span>
            </div>
          </form>
        </div>

        <div class="col-2">
        </div>
      </div>
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
      })
      .catch(error => {
        if(error.response.status === 401) {
          this.$router.push("/logout");
        }
      });

    axios
      .get("/api/genres")
      .then(response => {
        this.genres = response.data;
      })
      .catch(error => {
        if(error.response.status === 401) {
          this.$router.push("/logout");
        }
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
          this.genre_connection_id = "";
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