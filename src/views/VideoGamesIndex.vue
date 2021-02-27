<template>
  <div class="video-games-index">
    <div>
      <input v-model="searchTerm"/>
    </div>
    <table class="table">
      <thead class="thead-dark">
        <tr>
          <th scope="col">Title</th>
          <th scope="col">Platform</th>
          <th scope="col">Rating</th>
          <th scope="col">Online</th>
          <th scope="col">Released</th>
          <th scope="col">My Collection</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="videoGame in filterBy(videoGames, searchTerm, 'title')">
          <router-link :to="'/video_games/' + videoGame.id"><th scope="row">{{ videoGame.title }}</th></router-link>
          <td>{{ videoGame.formatted.platform }}</td>
          <td>{{ videoGame.formatted.rating_category }}</td>
          <td>{{ videoGame.formatted.online }}</td>
          <td>{{ videoGame.release_year }}</td>
          <td>
            <button class="btn btn-info btn-sm" @click="createCartridge(videoGame)">
              Add
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <div>
      <router-link to="/video_games/new" class="btn btn-primary">Add Video Game</router-link>
    </div>
  </div>
</template>

<style>
</style>

<script>
  var axios = require("axios");

  import Vue2Filters from 'vue2-filters';

  export default {
    data: function() {
      return {
        videoGames: [],
        searchTerm: "",
      };
    },
    created: function() {
      axios
        .get("/api/video_games")
        .then(response => {
          this.videoGames = response.data;
        });
    },
    methods: {
      createCartridge: function(videoGameObject) {
        var clientParams = {
          video_game_id: videoGameObject.id,
        };

        axios
          .post("/api/cartridges", clientParams)
          .then(response => {
            this.$router.push("/profile");
          }).catch(error => {
            this.errors = error.response.data.errors;
          });
      }
    },
    mixins: [Vue2Filters.mixin]
  };
</script>