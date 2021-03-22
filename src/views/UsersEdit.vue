<template>
  <div class="users-edit">
    <div class="section-container">
      <div class="title-container pixel-border">
        <div class="row">
          <div class="col-2"/>
          <div class="col-8 underline-header">
            <h2 class="text-center">Edit My Info</h2>
          </div>
          <div class="col-2"/>
        </div>
      </div>
    </div>

    <div class="section-container">
      <form v-on:submit.prevent="updateUser()">
        <ul>
          <li class="text-danger" v-for="error in errors">{{ error }}</li>
        </ul>

        <div class="form-group">
          <label>E-Mail: </label>
          <input class="form-control" type="text" v-model="user.email">
        </div>

        <div class="form-group">
          <label>Street: </label>
          <input class="form-control" type="text" v-model="user.street">
        </div>

        <div class="form-group">
          <label>Unit: </label>
          <input class="form-control" type="text" v-model="user.unit">
        </div>

        <div class="form-group">
          <label>City: </label>
          <input class="form-control" type="text" v-model="user.city">
        </div>

        <div class="form-group">
          <label>State: </label>
          <input class="form-control" type="text" v-model="user.state">
        </div>

        <div class="form-group">
          <label>Zip: </label>
          <input class="form-control" type="text" v-model="user.zip">
        </div>

        <div class="form-group">
          <div class="btn-v-align-right">
            <span class="btn-v-box">
              <input type="submit" class="btn-v btn-v-brand" value="Update">
            </span>
          </div>
        </div>
      </form>
    </div>

    <div class="section-container">
      <div class="title-container pixel-border">
        <div class="row">
          <div class="col-2"/>
          <div class="col-8 underline-header">
            <h2 class="text-center">My Cartridges</h2>
          </div>
          <div class="col-2"/>
        </div>
      </div>
    </div>

    <div class="section-container">
      <div class="text-center mb-3">
        <span class="btn-v-box">
          <router-link to="/video_games" class="btn-v btn-v-brand">Add Game to Collection</router-link>
        </span>
      </div>
      <table class="table">
        <thead class="thead-dark">
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
            v-for="cartridge in cartridges"
            class="text-center" 
            :class="{'table-v-bg-1': cartridge.owned_and_playable, 'table-v-bg-2': cartridge.borrowed_from_me, 'table-v-bg-3': cartridge.borrowed_by_me}"
          >
            <th scope="row">{{ cartridge.video_game.title }}</th>
            <td>{{ cartridge.video_game.formatted.platform }}</td>
            <td>{{ cartridge.borrowed_from_me ? "No" : "Yes" }}</td>
            <td>{{ cartridge.borrower_name }}</td>
            <td>{{ cartridge.owned_and_playable ? "N/A" : cartridge.lend_date }}</td>
            <td><button v-if="cartridge.owned_and_playable" class="btn-v btn-v-light-2 btn-sm" @click="destroyCartridge(cartridge)">Throw Away</button></td>
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

  export default {
    data: function() {
      return {
        user: {
          id: "",
          email: "",
          street: "",
          unit: "",
          city: "",
          state: "",
          zip: "",
        },
        cartridges: [],
        errors: []
      };
    },
    created: function() {
      axios
        .get("/api/users/" + this.$route.params.id)
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
          this.cartridges = response.data;
        })
        .catch(error => {
          if(error.response.status === 401) {
            this.$router.push("/logout");
          }
        });
    },
    methods: {
      updateUser: function() {
        var clientParams = {
          email: this.user.email,
          street: this.user.street,
          unit: this.user.unit,
          city: this.user.city,
          state: this.user.state,
          zip: this.user.zip,
        };

        axios
          .patch("/api/users/" + this.$route.params.id, clientParams)
          .then(response => {
            this.$router.push("/profile");
          }).catch(error => {
            this.errors = error.response.data.errors;
          });
      },
      destroyCartridge: function(cartridgeObject) {
        axios
          .delete("/api/cartridges/" + cartridgeObject.id)
          .then(response => {
            var index = this.cartridges.indexOf(cartridgeObject);
            this.cartridges.splice(index, 1);
          });
      }
    }
  };
</script>