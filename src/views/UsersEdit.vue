<template>
  <div class="users-edit">

    <form v-on:submit.prevent="updateUser()">
      <h1>Update User Information</h1>

      <ul>
        <li v-for="error in errors">{{ error }}</li>
      </ul>

      <div>
        <label>E-Mail: </label>
        <input type="text" v-model="user.email">
      </div>

      <div>
        <label>Street: </label>
        <input type="text" v-model="user.street">
      </div>

      <div>
        <label>Unit: </label>
        <input type="text" v-model="user.unit">
      </div>

      <div>
        <label>City: </label>
        <input type="text" v-model="user.city">
      </div>

      <div>
        <label>State: </label>
        <input type="text" v-model="user.state">
      </div>

      <div>
        <label>Zip: </label>
        <input type="text" v-model="user.zip">
      </div>

      <input type="submit" value="Update">
    </form>

    <div>
      <h2>My Cartridges</h2>
      <table class="table">
        <thead class="thead-dark">
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Platform</th>
            <th scope="col">Available</th>
            <th scope="col">Borrowed By</th>
            <th scope="col">Borrowed On</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="cartridge in cartridges" :class="{'table-success': !cartridge.borrower_id, 'table-danger': cartridge.borrower_id}">
            <th scope="row">{{ cartridge.video_game.title }}</th>
            <td>{{ cartridge.video_game.formatted.platform }}</td>
            <td>{{ cartridge.borrower_id ? "No" : "Yes" }}</td>
            <td>{{ cartridge.borrower_id ? cartridge.borrower_name : "N/A" }}</td>
            <td>{{ cartridge.borrower_id ? cartridge.lend_date : "N/A" }}</td>
            <td><button v-if="!cartridge.borrower_id" class="btn btn-secondary" @click="destroyCartridge(cartridge)">Throw Away</button></td>
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
        });

      axios
        .get("/api/cartridges/owned")
        .then(response => {
          this.cartridges = response.data;
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