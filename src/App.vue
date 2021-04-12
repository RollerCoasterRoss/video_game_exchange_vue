<template>
  <div id="app">
<!--     <div class="background-image">
      <parallax parallax :speedFactor="0.25" containerClass="parallax-img-container">
        <img src="/img/mario_bg_1.png"/>
      </parallax>
    </div> -->

    <nav class="navbar navbar-expand-lg navbar-dark bg-v-dark-2">
      <router-link class="navbar-brand" :to="userEmail ? '/' : '/login'"><h1>Video Game Exchange</h1></router-link>
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
                <router-link class="dropdown-item" to="/video_games">Add Games To My Collection</router-link>
                <router-link class="dropdown-item" to="/video_games/new">Add Game To Database</router-link>
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
      <h5>Logged in as:  {{ userEmail }}</h5>
    </div>

    <div class="container-lg content-container">
      <router-view/>
    </div>

    <footer class="container-fluid">
      <div class="row">
        <div class="col-xs-12 col-md-4 footer-container">
          <p>
            <a href="https://github.com/RollerCoasterRoss" class="link-v-no-style" target="_blank" rel="noopener noreferrer">
              Github
            </a>
          </p>
          <p>
            <a href="https://www.linkedin.com/in/rosswhitehead86/" class="link-v-no-style" target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
          </p>
        </div>
        <div class="col-xs-12 col-md-4"></div>
        <div class="col-xs-12 col-md-4 footer-container">
          <p>Contact:</p>
          <p>Name: Ross Whitehead</p>
          <p>Phone: 847-436-1169</p>
          <p>E-Mail: rsw3020@gmail.com</p>
        </div>
      </div>
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
    height: 100%;
    font-family: 'Press Start 2P', sans-serif;
    color: var(--vge-light-1);
    background: url(/img/mario_bg_1.png);
    background-position: center;
  }

  #app {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

/*  .background-image {
    position: fixed;
    width: 100%;
    z-index: -1000;
  }

  .background-image img {
    min-width: 100%;
    height: 100%;
  }*/

/*  .parallax-img-container {
    min-width: 100%;
    overflow: hidden;
    height: 250%;
  }*/

  @media screen and (max-width: 575px) {
    .navbar h1 {
      font-size: 12px;
      margin: 6px 0;
    }
  }

  @media screen and (min-width: 576px) {
    .navbar h1 {
      font-size: 16px;
      margin: 8px 0;
    }
  }

  @media screen and (min-width: 768px) {
    .navbar h1 {
      font-size: 24px;
      margin: 10px 0;
    }
  }

  @media screen and (min-width: 992px) {
    .navbar h1 {
      font-size: 28px;
      margin: 18px 0;
    }
  }

  @media screen and (min-width: 1200px) {
    .navbar h1 {
      font-size: 36px;
      margin: 24px 0;
    }
  }

  a.nav-link {
    text-align: center;
  }

  @media screen and (max-width: 991px) {
    .dropdown-menu {
      text-align: center;
    }
  }

  @media screen and (min-width: 992px) {
    .dropdown-menu {
      text-align: right;
    }
  }

  .content-container {
    flex-grow: 1;
  }

  footer {
    background-color: var(--vge-dark-2);
  }

  .footer-container {
    text-align: center;
    padding: 2% 0;
  }

  .footer-container p {
    font-size: 12px;
  }

  @media screen and (max-width: 575px) {
    table {
      font-size: 8px;
    }
  }

  @media screen and (min-width: 576px) {
    table {
      font-size: 8px;
    }
  }

  @media screen and (min-width: 768px) {
    table {
      font-size: 10px;
    }
  }

  @media screen and (min-width: 992px) {
    table {
      font-size: 12px;
    }
  }

  @media screen and (min-width: 1200px) {
    table {
      font-size: 16px;
    }
  }

  input {
    border: none;
  }

  input[type='radio'] {
    margin: 3px;
    transform: scale(1.5);
  }

  button {
    border: none;
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
    border-bottom: 2px solid var(--vge-brand);
  }

  .section-container {
    margin: 40px 0;
    padding: 20px;
    background-color: var(--vge-dark-2);
    border-radius: 25px;
  }

  @media screen and (max-width: 575px) {
    .section-container label {
      font-size: 8px;
    }
  }

  @media screen and (min-width: 576px) {
    .section-container label {
      font-size: 10px;
    }
  }

  @media screen and (min-width: 768px) {
    .section-container label {
      font-size: 12px;
    }
  }

  @media screen and (min-width: 992px) {
    .section-container label {
      font-size: 16px;
    }
  }

  @media screen and (min-width: 1200px) {
    .section-container label {
      font-size: 20px;
    }
  }

  .title-container {
    color: black;
    margin: 20px 0;
    background-color: var(--vge-light-1);
  }

  @media screen and (max-width: 575px) {
    .jumbotron h1, .title-container h3 {
      font-size: 20px;
    }
  }

  @media screen and (min-width: 576px) {
    .jumbotron h1, .title-container h3 {
      font-size: 20px;
    }
  }

  @media screen and (min-width: 768px) {
    .jumbotron h1, .title-container h3 {
      font-size: 24px;
    }
  }

  @media screen and (min-width: 992px) {
    .jumbotron h1, .title-container h3 {
      font-size: 28px;
    }
  }

  @media screen and (min-width: 1200px) {
    .jumbotron h1, .title-container h3 {
      font-size: 32px;
    }
  }

  @media screen and (max-width: 575px) {
    .jumbotron p {
      font-size: 10px;
    }
  }

  @media screen and (min-width: 576px) {
    .jumbotron p {
      font-size: 10px;
    }
  }

  @media screen and (min-width: 768px) {
    .jumbotron p {
      font-size: 12px;
    }
  }

  @media screen and (min-width: 992px) {
    .jumbotron p {
      font-size: 16px;
    }
  }

  @media screen and (min-width: 1200px) {
    .jumbotron p {
      font-size: 20px;
    }
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
      padding: .375rem .79rem;
      font-size: 1rem;
      line-height: 1.5;
      border-radius: 1.2rem;
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
    font-size: 1rem;
    line-height: 1.5;

    background-color: var(--vge-light-2);
    border-radius: .4rem;
    padding: 2px;
  }

  @media screen and (max-width: 767px) {
    .btn-v-box-group {
      width: 100%;
      text-align: center;
    }
  }

  @media screen and (min-width: 768px) {
    .btn-v-box-group {
      width: 100%;
      text-align: right;
    }

    .btn-v-box-group span {
      margin-left: 10px;
    }
  }

  .btn-sm {
    font-size: .5rem;
  }

  .form-inline {
    font-size: 0.75rem;
    width: 100%;
  }

  .custom-input {
    font-size: 0.5rem;
  }

  select.custom-select.standard-select {
    font-size: 0.5rem;
  }

  .videoGamesSearchContainer {
    width: 100%;
  }

  #inlineFormInputSearch {
    width: 100%;
  }

  #inlineFormDropdownPlatform {
    width: 100%;
  }

  #inlineFormDropdownGenre {
    width: 100%;
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

  .bg-v-light-2 {
    background-color: var(--vge-light-2);
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

  .btn-v-light-2 {
    color: black;
    background-color: var(--vge-light-2);
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
    font-size: 1rem;
    text-align: center;
    margin: 6px 0;
  }

  .nowrap {
    white-space: nowrap;
  }

  .underline-header {
    border-bottom: 2px solid black;
  }

/*  .spacer {
    height: 60px;
  }*/

  .spacer-2 {
    height: 100px;
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