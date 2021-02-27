<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <router-link class="navbar-brand" to="/">Video Game Exchange</router-link>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <router-link class="nav-link" to="/cartridges">Borrow</router-link>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Menu
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
              <router-link class="dropdown-item" to="/profile">My Profile</router-link>
              <router-link class="dropdown-item" to="/cartridges">Borrow Game</router-link>
              <router-link class="dropdown-item" to="/video_games">Add Games to my Collection</router-link>
              <router-link class="dropdown-item" to="/video_games/new">Add Game to Database</router-link>
              <div class="dropdown-divider"></div>
              <router-link v-if="userEmail" class="dropdown-item" to="/logout">Logout</router-link>
              <span v-else>
                <router-link class="dropdown-item" to="/signup">Sign Up</router-link>
                <router-link class="dropdown-item" to="/login">Login</router-link>
              </span>
            </div>
          </li>
        </ul>
      </div>
    </nav>

    <div v-if="userEmail" class="container-fluid bg-primary text-white">
      <h5 class="text-center">Logged in as:  {{ userEmail }}</h5>
    </div>

    <div class="container-fluid">
      <router-view/>
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
        userEmail: "",
      };
    },
    created: function() {
      var notLoggedIn = !localStorage.getItem("jwt");
      if(notLoggedIn) {
        localStorage.removeItem("userEmail");
        this.$router.push("/login");
      }

      var email = localStorage.getItem("userEmail");
      if(email) {
        this.userEmail = email;
      }
    }
  }
</script>