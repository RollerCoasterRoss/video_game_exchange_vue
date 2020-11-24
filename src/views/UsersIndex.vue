<template>
  <div class="users-index">
    <h1>Users</h1>

    <div>
      <div v-for="user in users">
        <router-link v-bind:to="'/users/' + user.id">
          <h2>{{ user.first_name }} {{ user.last_name }}</h2>
        </router-link>
      </div>
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
      users: []
    };
  },
  created: function() {
    axios
      .get("/api/users")
      .then(response => {
        this.users = response.data;
      });
  },
  methods: {}
};
</script>