<template>
  <div id="app">
    <div class="background-image">
      <parallax
        parallax
      >
        <img src="/img/mario_bg_1.png">
      </parallax>
    </div>

    <nav class="navbar navbar-expand-lg navbar-dark bg-v-dark-2">
      <router-link class="navbar-brand" :to="userEmail ? '/' : '/login'">Video Game Exchange</router-link>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <span v-if="userEmail">
              <router-link class="nav-link" to="/cartridges">Borrow</router-link>
            </span>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Menu
            </a>
            <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
              <span v-if="userEmail">
                <router-link class="dropdown-item" to="/profile">My Profile</router-link>
                <router-link class="dropdown-item" to="/cartridges">Borrow Game</router-link>
                <router-link class="dropdown-item" to="/video_games">Add Games to my Collection</router-link>
                <router-link class="dropdown-item" to="/video_games/new">Add Game to Database</router-link>
                <div class="dropdown-divider"></div>
                <router-link class="dropdown-item" to="/logout">Logout</router-link>
              </span>
              <span v-else>
                <router-link class="dropdown-item" to="/signup">Sign Up</router-link>
                <router-link class="dropdown-item" to="/login">Login</router-link>
              </span>
            </div>
          </li>
        </ul>
      </div>
    </nav>

    <div v-if="userEmail" class="container-fluid bg-v-brand text-white vge-logged-in-line">
      <h5 class="text-center">Logged in as:  {{ userEmail }}</h5>
    </div>

    <div class="container">
      <router-view/>
      <div class="spacer"></div>
    </div>

    <footer>
      <h5 class="text-center">This is a test line</h5>
      <h5 class="text-center">This is a test line</h5>
      <h5 class="text-center">This is a test line</h5>
    </footer>

  </div>
</template>

<style>
  :root {
    --vge-dark-1: #474747;
    --vge-brand: #AC0000;
    --vge-dark-2: #606060;
    --vge-dark-3: #919191;
    --vge-light-1: #FFFFFF;
    --vge-light-2: #CECDD3;
    --vge-success: #6BA100;
    --vge-success-lt: #D6F698;
    --vge-info: #006767;
    --vge-info-lt: #7BC6C6;
    --vge-danger: #890000;
    --vge-danger-lt: #FF9E9E;
    --vge-table-1: #73A3D7;
    --vge-table-2: #E93636;
    --vge-table-3: #6CA858;
  }

  body {
    font-family: 'Press Start 2P', sans-serif;
    color: var(--vge-light-1);
  }

  .background-image {
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: -1000;
  }

  footer {
    min-height: 200px;
    background-color: var(--vge-dark-2);
  }

  table {
    font-size: 12px;
  }

  input[type='radio'] {
    margin: 3px;
    transform: scale(1.5);
  }

  a.btn-v, a:link.btn-v, a:visited.btn-v, a:hover.btn-v {
    color: inherit;
    text-decoration: none;
  }

  a.link-v-no-style, a:link.link-v-no-style, a:visited.link-v-no-style {
    color: inherit;
    text-decoration: none;
    font-weight: normal;
  }

  a:hover.link-v-no-style {
    color: var(--vge-brand);
    text-decoration: none;
    font-weight: normal;
  }

  .title-container {
    color: black;
    margin: 30px auto;
    padding: 5px 0;
    background-color: var(--vge-light-1);
  }

  .pixel-border {
    background: var(--vge-light-1);
    box-shadow:
      /* Inner Background Color -- Same as inner */
        0   -6px 0  -2px var(--vge-light-1),
        0    6px 0  -2px var(--vge-light-1),
        0  -12px 0  -4px var(--vge-light-1),
        0   12px 0  -4px var(--vge-light-1),
        0  -18px 0  -8px var(--vge-light-1),
        0   18px 0  -8px var(--vge-light-1),
        0  -24px 0 -12px var(--vge-light-1),
        0   24px 0 -12px var(--vge-light-1),
      
      /* Inner Border */
       -2px  0   0   0   black,
        2px  0   0   0   black,
        0   -4px 0   0   black,
        0    4px 0   0   black,
        0  -10px 0  -2px black,
        0   10px 0  -2px black,
        0  -14px 0  -4px black,
        0   14px 0  -4px black,
        0  -20px 0  -8px black,
        0   20px 0  -8px black,
        0  -26px 0 -12px black,
        0   26px 0 -12px black,
      
      /* Middle Border -- Accent */
       -4px  0   0   0   black,
        4px  0   0   0   black,
        0   -2px 0   2px black,
        0    2px 0   2px black,
        0   -8px 0   0px black,
        0    8px 0   0px black,
        0  -12px 0  -2px black,
        0   12px 0  -2px black,
        0  -16px 0  -4px black,
        0   16px 0  -4px black,
        0  -22px 0  -8px black,
        0   22px 0  -8px black,
        0  -28px 0 -12px black,
        0   28px 0 -12px black,
      
      /* Outer Border */
       -6px  0   0   0   var(--vge-dark-1),
        6px  0   0   0   var(--vge-dark-1),
        0    0   0   4px var(--vge-dark-1),
        0   -6px 0   2px var(--vge-dark-1),
        0    6px 0   2px var(--vge-dark-1),
        0  -10px 0   0   var(--vge-dark-1),
        0   10px 0   0   var(--vge-dark-1),
        0  -14px 0  -2px var(--vge-dark-1),
        0   14px 0  -2px var(--vge-dark-1),
        0  -18px 0  -4px var(--vge-dark-1),
        0   18px 0  -4px var(--vge-dark-1),
        0  -24px 0  -8px var(--vge-dark-1),
        0   24px 0  -8px var(--vge-dark-1),
        0  -30px 0 -12px var(--vge-dark-1),
        0   30px 0 -12px var(--vge-dark-1);
  }

  .section-container {
    margin: 20px 0;
    padding: 20px;
    background-color: var(--vge-dark-2);
    border-radius: 25px;
  }

  .btn-v {
      display: inline-block;
      font-weight: 400;
      color: #212529;
      text-align: center;
      vertical-align: middle;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
      user-select: none;
      background-color: transparent;
      border: 1px solid transparent;
      padding: .375rem .79rem;
      font-size: 1rem;
      line-height: 1.5;
      border-radius: 1.2rem;
      transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
  }

  .btn-v-box {
    display: inline-block;
    font-weight: 400;
    text-align: center;
    vertical-align: middle;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
    user-select: none;
    border: 1px solid transparent;
    /*padding: .375rem .75rem;*/
    font-size: 1rem;
    line-height: 1.5;

    background-color: var(--vge-light-2);
    border-radius: .4rem;
    padding: 2px;
  }

  .btn-v-box + .btn-v-box {
    margin-left: 10px;
  }

  .btn-v-button-group {
    height: 46px;
  }

  .btn-sm {
    font-size: .5rem;
  }

  .form-inline, .custom-input {
    font-size: .65rem;
  }

  select.custom-select.standard-select {
    font-size: 1rem;
  }

  .bg-v-dark-1 {
    background-color: var(--vge-dark-1);
  }

  .bg-v-dark-2 {
    background-color: var(--vge-dark-2);
  }

  .bg-v-dark-3 {
    background-color: var(--vge-dark-3);
  }

  .bg-v-brand {
    background-color: var(--vge-brand);
  }

  .bg-v-light-1 {
    background-color: var(--vge-light-1);
  }

  .bg-v-black {
    background-color: black;
  }

  .btn-v-success {
    color: white;
    background-color: var(--vge-success);
  }

  .btn-v-success-lt {
    color: black;
    background-color: var(--vge-success-lt);
  }

  .btn-v-info {
    color: white;
    background-color: var(--vge-info);
  }

  .btn-v-info-lt {
    color: black;
    background-color: var(--vge-info-lt);
  }

  .btn-v-danger {
    color: white;
    background-color: var(--vge-danger);
  }

  .btn-v-danger-lt {
    color: black;
    background-color: var(--vge-danger-lt);
  }

  .btn-v-brand {
    color: white;
    background-color: var(--vge-danger);
  }

  .btn-v-dark-1 {
    color: white;
    background-color: var(--vge-dark-1);
  }

  .bg-v-success {
    background-color: var(--vge-success);
  }

  .bg-v-success-lt {
    background-color: var(--vge-success-lt);
  }

  .bg-v-info {
    background-color: var(--vge-info);
  }

  .bg-v-info-lt {
    background-color: var(--vge-info-lt);
  }

  .bg-v-danger {
    background-color: var(--vge-danger);
  }

  .bg-v-danger-lt {
    background-color: var(--vge-danger-lt);
  }

  .table .thead-v-dark th {
    color: white;
    background-color: black;
    border-color: var(--vge-dark-2);
  }

  .table-v-dark-3 {
    background-color: var(--vge-dark-3);
  }

  .table-v-light-2 {
    color: black;
    background-color: var(--vge-light-2);
  }

  .table-v-bg-1 {
    background-color: var(--vge-table-1);
  }

  .table-v-bg-2 {
    background-color: var(--vge-table-2);
  }

  .table-v-bg-3 {
    background-color: var(--vge-table-3);
  }

  .vge-logged-in-line h5 {
    padding-top: 3px;
    padding-bottom: 3px;
  }

  .nowrap {
    white-space: nowrap;
  }

  .underline-header {
    border-bottom: 2px solid black;
  }

  .spacer {
    min-height: 20px;
  }

  .login-spacer {
    min-height: 75px;
  }

  .parallax-banner {
    height: 100px;
    overflow: hidden;
  }
</style>

<script>
  var axios = require("axios");

  import Parallax from 'vue-parallaxy'

  export default {
    data: function() {
      return {
        userEmail: "",
      }
    },
    components: {
      Parallax
    },
    created: function() {
      var notLoggedIn = !localStorage.getItem("jwt");
      
      if(notLoggedIn) {
        localStorage.removeItem("userEmail");

        if (!["/login", "/signup"].includes(this.$route.path)) {
          this.$router.push("/login");
        }
      }

      var email = localStorage.getItem("userEmail");
      if(email) {
        this.userEmail = email;
      }
    },
  }
</script>