<template>
  <div id="app">
<!--     <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/signup">Signup</router-link> |
      <router-link to="/login">Login</router-link> |
      <router-link to="/logout">Logout</router-link> |
      <router-link to="/users">All Users</router-link> |
      <router-link to="/video_games">All Video Games</router-link> |
      <router-link to="/video_games/new">Add a New Game</router-link> |
      <router-link to="/cartridges">Cartridges</router-link> | 
      <router-link to="/profile">My Profile</router-link>
    </div> -->

    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" href="/">Video Game Exchange</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <a class="nav-link" href="/signup">Sign Up</a>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Features
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
              <a class="dropdown-item" href="/video_games">Video Game Index</a>
              <a class="dropdown-item" href="/video_games/new">Add Game</a>
            </div>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              User Features
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
              <a class="dropdown-item" href="/login">Login</a>
              <a class="dropdown-item" href="/logout">Logout</a>
              <a class="dropdown-item" href="/profile">My Profile</a>
              <a class="dropdown-item" href="/cartridges">Borrow Game</a>
            </div>
          </li>
        </ul>
<!--      <form class="form-inline my-2 my-lg-0">
          <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
          <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
          </form> -->
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
      var email = localStorage.getItem("userEmail");
      if(email) {
        this.userEmail = email;
      }
    }
  }
</script>