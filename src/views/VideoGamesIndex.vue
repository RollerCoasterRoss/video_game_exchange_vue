<template>
  <div class="video-games-index">
    <div class="section-container">
      <div class="title-container pixel-border">
        <div class="row">
          <div class="col-2"/>
          <div class="col-8 underline-header">
            <h2 class="text-center">Add Video Game to Collection</h2>
          </div>
          <div class="col-2"/>
        </div>
      </div>
    
      <div class="row">
        <form class="form-inline col">
          <label class="mr-sm-3" for="inlineFormInputSearch">Search</label>
          <input type="text" class="form-control mb-2 mr-sm-3 custom-input" id="inlineFormInputSearch" v-model="searchTerm">
        </form>
        <div class="col">
          <div class="form-group btn-v-button-group">
            <span class="float-right">
              <span class="btn-v-box">
                <router-link to="/video_games/new" class="btn-v btn-v-brand">Add Video Game</router-link>
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>

    <div class="section-container">
      <table class="table">
        <thead class="thead-dark">
          <tr class="text-center">
            <th scope="col">Title</th>
            <th scope="col">Platform</th>
            <th scope="col">Rating</th>
            <th scope="col">Online</th>
            <th scope="col">Released</th>
            <th scope="col">My Collection</th>
          </tr>
        </thead>
        <tbody>
          <tr class="table-v-light-2 text-center" v-for="videoGame in filterBy(videoGames, searchTerm, 'title')">
            <th scope="row"><router-link class="link-v-no-style" :to="'/video_games/' + videoGame.id">{{ videoGame.title }}</router-link></th>
            <td>{{ videoGame.formatted.platform }}</td>
            <td>{{ videoGame.formatted.rating_category }}</td>
            <td>{{ videoGame.formatted.online }}</td>
            <td>{{ videoGame.release_year }}</td>
            <td>
              <button class="btn-v btn-v-brand btn-sm" @click="createCartridge(videoGame)">
                Add
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="spacer-2">
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
        })
        .catch(error => {
          if(error.response.status === 401) {
            this.$router.push("/logout");
          }
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