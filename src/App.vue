<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/signup">Signup</router-link> |
      <router-link to="/login">Login</router-link> |
      <router-link to="/logout">Logout</router-link> |
      <router-link to="/users">All Users</router-link> |
      <router-link to="/video_games">All Video Games</router-link> |
      <router-link to="/video_games/new">Add a New Game</router-link> |
      <router-link to="/cartridges">Cartridges</router-link> | 
      <router-link to="/profile">My Profile</router-link>
    </div>
    <div class="container">
      <router-view/>
    </div>
  </div>
</template>

<style>
</style>
