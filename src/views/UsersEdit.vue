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
        errors: []
      };
    },
    created: function() {
      axios
      .get("/api/users/" + this.$route.params.id)
      .then(response => {
        this.user = response.data;
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
            this.$router.push("/users/" + this.$route.params.id);
          }).catch(error => {
            this.errors = error.response.data.errors;
          });
      }
    }
  };
</script>