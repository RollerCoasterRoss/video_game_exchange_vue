<template>
  <div class="profile">
    <div class="section-container">
      <div class="title-container pixel-border">
        <div class="row">
          <div class="col-2"/>
          <div class="col-8 underline-header">
            <h3 class="text-center">Pro<span style="letter-spacing: 1px">fi</span>le</h3>
          </div>
          <div class="col-2"/>
        </div>
      </div>

      <div class="jumbotron mb-0 bg-v-dark-2 text-break">
        <h1>{{ user.first_name }} {{ user.last_name }}</h1>
        <p>{{ user.email }}</p>
        <hr class="my-2"/>
        <p>{{ user.street }}, {{ user.unit }}</p>
        <p>{{ user.city }},{{ user.state }} {{ user.zip }}</p>
        <hr class="my-2"/>
        <div class="row">
          <div class="btn-v-box-group">
            <span class="btn-v-box col-12-xs col-auto-md my-2">
              <router-link :to="'/users/' + user.id + '/edit'" class="btn-v btn-v-brand">Edit</router-link>
            </span>
            <span class="btn-v-box col-12-xs col-auto-md my-2">
              <router-link to="/video_games" class="btn-v btn-v-brand">Add Video Games To My Collection</router-link>
            </span>
          </div>
        </div>
      </div>
    </div>

    <div class="section-container">
      <div class="title-container pixel-border">
        <div class="row">
          <div class="col-2"/>
          <div class="col-8 underline-header">
            <h3 class="text-center">My Collection</h3>
          </div>
          <div class="col-2"/>
        </div>
      </div>
    </div>

    <div class="section-container">
      <div class="table-responsive">
        <table class="table">
          <thead class="thead-v-dark">
            <tr class="text-center">
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
              class="text-center"
              :class="{'table-v-bg-1': cartridge.owned_and_playable, 'table-v-bg-2': cartridge.borrowed_from_me, 'table-v-bg-3': cartridge.borrowed_by_me}"
            >
              <th scope="row">{{ cartridge.video_game.title }}</th>
              <td>{{ cartridge.video_game.formatted.platform }}</td>
              <td>{{ cartridge.borrowed_from_me ? "No" : "Yes" }}</td>
              <td>{{ cartridge.borrower_name }}</td>
              <td>{{ cartridge.owned_and_playable ? "N/A" : cartridge.lend_date }}</td>
              <td><button v-if="cartridge.borrowed_by_me" class="btn-v btn-v-light-2 btn-sm" @click="returnCartridge(cartridge.id)">Return</button></td>
            </tr>
          </tbody>
        </table>
      </div>
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
        })
        .catch(error => {
          if(error.response.status === 401) {
            this.$router.push("/logout");
          }
        });

      axios
        .get("/api/cartridges/owned")
        .then(response => {
          this.owned_cartridges = response.data;
        })
        .catch(error => {
          if(error.response.status === 401) {
            this.$router.push("/logout");
          }
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
    mixins: [Vue2Filters.mixin],
  };
</script>