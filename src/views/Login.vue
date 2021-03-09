<template>
  <div class="login">
    <div class="title-container row my-5">
      <div class="col-2"/>
      <div class="col-8 underline-header">
        <h2 class="text-center">Login</h2>
      </div>
      <div class="col-2"/>
    </div>

    <form v-on:submit.prevent="submit()">
      <ul>
        <li class="text-danger" v-for="error in errors">{{ error }}</li>
      </ul>
      <div class="form-group">
        <label>Email:</label>
        <input type="email" class="form-control" v-model="email">
      </div>
      <div class="form-group">
        <label>Password:</label>
        <input type="password" class="form-control" v-model="password">
      </div>
      <div class="form-group btn-v-button-group">
        <span class="float-right">
          <span class="btn-v-box">
            <input type="submit" class="btn-v btn-v-brand" value="Submit">
          </span>
          <span class="btn-v-box">
            <router-link to="/signup" class="btn-v btn-v-brand">Sign Up</router-link>
          </span>
        </span>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      email: "",
      password: "",
      errors: []
    };
  },
  methods: {
    submit: function() {
      var params = {
        email: this.email,
        password: this.password
      };
      axios
        .post("/api/sessions", params)
        .then(response => {
          axios.defaults.headers.common["Authorization"] =
            "Bearer " + response.data.jwt;
          localStorage.setItem("jwt", response.data.jwt);

          this.$parent.userEmail = response.data.email;
          localStorage.setItem("userEmail", response.data.email);
          
          this.$router.push("/");
        })
        .catch(error => {
          this.errors = ["Invalid email or password."];
          this.email = "";
          this.password = "";
        });
    }
  }
};
</script>