<template>
  <div class="video-games-index">
    <h1>Video Games</h1>

    <div>
      <div v-for="video_game in video_games">
        <ul>
          <router-link v-bind:to="'/video_games/' + video_game.id">
            <li>
              {{ video_game.title }} ({{ video_game.formatted.platform }}, {{ video_game.release_year }})
            </li>
          </router-link>
        </ul>
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
        video_games: []
      };
    },
    created: function() {
      axios
        .get("/api/video_games")
        .then(response => {
          this.video_games = response.data;
        });
    },
    methods: {}
  };
</script>