<template>
  <div class="users-show">

      <div>
        <h2>{{ user.first_name }} {{ user.last_name }}</h2>
        <h2>{{ user.email }}</h2>
          <div>
            <h3>Address:</h3>
            <h3>{{ user.street }}, {{ user.unit }}</h3>
            <h3>{{ user.city }}, {{ user.state }} {{ user.zip }}</h3>
          </div>
      </div>

      <div>
        <h2>Owned:</h2>
        <div v-for="my_cartridge in user.my_cartridges">
          <h4>Connection ID: {{ my_cartridge.id }}</h4>

            <div v-for="video_game in video_games">
              <h4>{{ my_cartridge.video_game_id == video_game.id ? video_game.title : null }}</h4>
            </div>

        </div>
      </div>

      <div>
        <h2>Borrowing:</h2>
        <div v-for="cartridge in user.borrowed_cartridges">
          <h4>Connection ID: {{ cartridge.id }} | Video Game ID: {{ cartridge.video_game_id }}</h4>
        </div>
      </div>

      <div>
        <router-link v-bind:to="'/users/' + user.id + '/edit'">Edit</router-link>
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
        user: {
          id: "",
          first_name: "",
          last_name: "",
          email: "",
          street: "",
          unit: "",
          city: "",
          state: "",
          zip: "",
          my_cartridges: [],
          borrowed_cartridges: [],
        },
        video_games: [],
      };
    },
    created: function() {
      axios
        .get("/api/users/" + this.$route.params.id)
        .then(response => {
          this.user = response.data;
        });
      axios
        .get("/api/video_games")
        .then(response => {
          this.video_games = response.data;
        })      
    },
    methods: {}
  };
</script>