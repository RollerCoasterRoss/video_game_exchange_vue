<template>
  <div class="cartridges-index">
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
          <th scope="col">Owner</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="cartridge in filterBy(cartridges, searchTerm, 'video_game.title')">
          <th scope="row">{{ cartridge.video_game.title }}</th>
          <td>{{ cartridge.video_game.formatted.platform }}</td>
          <td>{{ cartridge.video_game.formatted.rating_category }}</td>
          <td>{{ cartridge.video_game.formatted.online }}</td>
          <td>{{ cartridge.video_game.release_year }}</td>
          <td>{{ cartridge.owner_name }}</td>
          <td>
            <button class="btn btn-info btn-sm" @click="borrowCartridge(cartridge)">
              Borrow
            </button>
          </td>
        </tr>
      </tbody>
    </table>
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
        cartridges: [],
        searchTerm: "",
      };
    },
    created: function() {
      axios
        .get("/api/cartridges")
        .then(response => {
          this.cartridges = response.data;
        });
    },
    methods: {
      borrowCartridge: function(cartridgeObject) {
        var clientParams = {
          borrow: "true"
        };

        axios
          .patch("/api/cartridges/" + cartridgeObject.id, clientParams)
          .then(response => {
            this.$router.push("/profile");
          });
      }
    },
    mixins: [Vue2Filters.mixin]
  };
</script>