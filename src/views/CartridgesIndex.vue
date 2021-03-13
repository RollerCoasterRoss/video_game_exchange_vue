<template>
  <div class="cartridges-index">
    <div class="title-container row my-5">
      <div class="col-2"/>
      <div class="col-8 underline-header">
        <h2 class="text-center">Borrow Cartridges</h2>
      </div>
      <div class="col-2"/>
    </div>

    <div class="row">
      <div class="col-auto"></div>
      <form class="form-inline col-auto">
        <label class="mr-sm-3" for="inlineFormInputSearch">Search</label>
        <input type="text" class="form-control mb-2 mr-sm-3 custom-input" id="inlineFormInputSearch" v-model="searchTerm">

        <label class="mr-sm-3" for="inlineFormDropdownPlatform">Platform</label>
        <select class="form-control mb-2 mr-sm-3 custom-select custom-input" id="inlineFormDropdownPlatform" v-model="platformFilter">
          <option v-for="platformOption in platformOptions" :value="platformOption.value">
            {{ platformOption.display }}
          </option>
        </select>

        <label class="mr-sm-3" for="inlineFormDropdownGenre">Genre</label>
        <select class="form-control mb-2 mr-sm-2 custom-select custom-input" id="inlineFormDropdownGenre" v-model="genreFilter">
          <option value="">Unspecified</option>
          <option v-for="genre in genres">
            {{ genre.name }}
          </option>
        </select>
      </form>
      <div class="col-auto"></div>
    </div>

    <table class="table mb-5">
      <thead class="thead-dark">
        <tr class="text-center">
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
        <tr class="table-v-light-2 text-center" v-for="cartridge in filterBy(filterBy(cartridges, platformFilter, 'video_game.platform'), searchTerm, 'video_game.title')">
          <th class="font-weight-normal" scope="row">{{ cartridge.video_game.title }}</th>
          <td>{{ cartridge.video_game.formatted.platform }}</td>
          <td>{{ cartridge.video_game.formatted.rating_category }}</td>
          <td>{{ cartridge.video_game.formatted.online }}</td>
          <td>{{ cartridge.video_game.release_year }}</td>
          <td>{{ cartridge.owner_name }}</td>
          <td>
            <button class="btn-v btn-v-brand btn-sm" @click="borrowCartridge(cartridge)">
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
        genreFilter: "",
        genres: []
      };
    },
    created: function() {
      axios
        .get("/api/cartridges")
        .then(response => {
          this.cartridges = response.data;
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
    mixins: [Vue2Filters.mixin],
    watch: {
      genreFilter: function(newGenreName) {
        var url = "/api/cartridges";

        if (newGenreName) {
          url += `?genre=${newGenreName}`
        }

        axios
          .get(url)
          .then(response => {
            this.cartridges = response.data;
          });
      }
    }
  };
</script>