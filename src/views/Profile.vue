<template>
  <div class="profile">
    <div class="row my-5">
      <div class="col-2"/>
      <div class="col-8 underline-header">
        <h2 class="text-center">Pro<span style="letter-spacing: 1px">fi</span>le</h2>
      </div>
      <div class="col-2"/>
    </div>

    <div class="jumbotron bg-v-dark-2 py-4">
      <h1 class="display-4">{{ user.first_name }} {{ user.last_name }}</h1>
      <p class="lead">{{ user.email }}</p>
      <hr class="my-4"/>
      <p>{{ user.street }}, {{ user.unit }}</p>
      <p>{{ user.city }}, {{ user.state }} {{ user.zip }}</p>
      <hr class="my-2"/>
      <div class="form-group btn-v-button-group">
        <span class="float-right">
          <span class="btn-v-box">
            <router-link :to="'/users/' + user.id + '/edit'" class="btn-v btn-v-brand">Edit</router-link>
          </span>
          <span class="btn-v-box">
            <router-link to="/video_games" class="btn-v btn-v-brand">Add Cartridge to Collection</router-link>
          </span>
        </span>
      </div>
    </div>

    <div>
      <div class="row my-5">
        <div class="col-2"/>
        <div class="col-8 underline-header">
          <h2 class="text-center">My Collection</h2>
        </div>
        <div class="col-2"/>
      </div>

      <table class="table">
        <thead class="thead-v-dark">
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Platform</th>
            <th scope="col">Available</th>
            <th scope="col" class="nowrap">Borrowed By</th>
            <th scope="col" class="nowrap">Borrowed On</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <tr 
            v-for="cartridge in orderBy(cartridges, 'video_game.title')"
            :class="{'bg-v-success-lt': cartridge.owned_and_playable, 'bg-v-danger-lt': cartridge.borrowed_from_me, 'bg-v-info-lt': cartridge.borrowed_by_me}"
          >
            <th scope="row">{{ cartridge.video_game.title }}</th>
            <td>{{ cartridge.video_game.formatted.platform }}</td>
            <td>{{ cartridge.borrowed_from_me ? "No" : "Yes" }}</td>
            <td>{{ cartridge.borrower_name }}</td>
            <td>{{ cartridge.owned_and_playable ? "N/A" : cartridge.lend_date }}</td>
            <td><button v-if="cartridge.borrowed_by_me" class="btn btn-v-dark-1 btn-sm" @click="returnCartridge(cartridge.id)">Return</button></td>
          </tr>
        </tbody>
      </table>
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
        },
        owned_cartridges: [],
        borrowed_cartridges: [],
      };
    },
    created: function() {
      axios
        .get("/api/users/current")
        .then(response => {
          this.user = response.data;
        });
      axios
        .get("/api/cartridges/owned")
        .then(response => {
          this.owned_cartridges = response.data;
        });
      this.retrieveBorrowedCartridges();
    },
    methods: {
      returnCartridge: function(cartridgeId) {
        axios
          .patch(`/api/cartridges/${cartridgeId}`, {borrow: false})
          .then(response => {
            this.retrieveBorrowedCartridges();
          });
      },
      retrieveBorrowedCartridges: function() {
        axios
          .get("/api/cartridges/borrowed")
          .then(response => {
            this.borrowed_cartridges = response.data;
          });
      }
    },
    computed: {
      cartridges: function() {
        return this.borrowed_cartridges.concat(this.owned_cartridges);
      }
    },
    mixins: [Vue2Filters.mixin]
  };
</script>