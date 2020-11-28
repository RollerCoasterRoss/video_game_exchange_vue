<template>
  <div class="profile">

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
        <h2>Cartridges:</h2>
        <table class="table">
          <thead class="thead-dark">
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Platform</th>
              <th scope="col">Available</th>
              <th scope="col">Borrowed By</th>
              <th scope="col">Borrowed On</th>
            </tr>
          </thead>
          <tbody>
            <tr class="table-warning" v-for="borrowed_cartridge in borrowed_cartridges">
              <th scope="row">{{ borrowed_cartridge.video_game.title }}</th>
              <td>{{ borrowed_cartridge.video_game.formatted.platform }}</td>
              <td>Yes</td>
              <td>Me</td>
              <td>{{ borrowed_cartridge.lend_date }}</td>
            </tr>
            <tr v-for="owned_cartridge in owned_cartridges" v-bind:class="{'table-success': !owned_cartridge.borrower_id, 'table-danger': owned_cartridge.borrower_id}">
              <th scope="row">{{ owned_cartridge.video_game.title }}</th>
              <td>{{ owned_cartridge.video_game.formatted.platform }}</td>
              <td>{{ owned_cartridge.borrower_id ? "No" : "Yes" }}</td>
              <td>{{ owned_cartridge.borrower_id ? owned_cartridge.borrower_name : "N/A" }}</td>
              <td>{{ owned_cartridge.borrower_id ? owned_cartridge.lend_date : "N/A" }}</td>
            </tr>
          </tbody>
        </table>
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
      axios
        .get("/api/cartridges/borrowed")
        .then(response => {
          this.borrowed_cartridges = response.data;
        });   
    },
    methods: {}
  };
</script>