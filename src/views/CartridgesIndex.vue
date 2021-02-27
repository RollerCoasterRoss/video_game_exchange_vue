<template>
  <div class="cartridges-index">
    <div>
      Search: <input v-model="searchTerm"/>
      Platform: <select v-model="platformFilter">
        <option v-for="platformOption in platformOptions" :value="platformOption.value">
          {{ platformOption.display }}
        </option>
      </select>
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
        <tr v-for="cartridge in filterBy(filterBy(cartridges, platformFilter, 'video_game.platform'), searchTerm, 'video_game.title')">
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
        platformFilter: "",
        searchTerm: "",
        platformOptions: [
          {value: "", display: "Unspecified"},
          {value: "xbox", display: "All Xbox Games"},
          {value: "ps", display: "All Playstation Games"},
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