<template>
  <div class="signup">
    <div class="section-container">
      <div class="title-container pixel-border">
        <div class="row">
          <div class="col-2"/>
          <div class="col-8 underline-header">
            <h2 class="text-center">Sign Up</h2>
          </div>
          <div class="col-2"/>
        </div>
      </div>
    </div>

    <div class="section-container">
      <form v-on:submit.prevent="submit()">
        <ul>
          <li class="text-danger" v-for="error in errors">{{ error }}</li>
        </ul>

        <div class="form-group">
          <label>First Name:</label> 
          <input type="text" class="form-control" v-model="firstName">
        </div>

        <div class="form-group">
          <label>Last Name:</label> 
          <input type="text" class="form-control" v-model="lastName">
        </div>

        <div class="form-group">
          <label>Email:</label>
          <input type="email" class="form-control" v-model="email">
        </div>

        <div class="form-group">
          <label>Password:</label>
          <input type="password" class="form-control" v-model="password">
        </div>

        <div class="form-group">
          <label>Password confirmation:</label>
          <input type="password" class="form-control" v-model="passwordConfirmation">
        </div>

        <div class="form-group">
          <label>Street:</label>
          <input type="text" class="form-control" v-model="streetAddress">
        </div>

        <div class="form-group">
          <label>Unit:</label>
          <input type="text" class="form-control" v-model="unitAddress">
        </div>

        <div class="form-group">
          <label>City:</label>
          <input type="text" class="form-control" v-model="cityAddress">
        </div>

        <div class="form-group">
          <label>State:</label>
          <input type="text" class="form-control" v-model="stateAddress">
        </div>

        <div class="form-group">
          <label>Zip:</label>
          <input type="text" class="form-control" v-model="zipAddress">
        </div>

        <div class="form-group">
          <div class="btn-v-align-right">
            <span class="btn-v-box">
              <input type="submit" class="btn-v btn-v-brand" value="Submit">
            </span>
          </div>
        </div>
      </form>
    </div>

  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      passwordConfirmation: "",
      streetAddress: "",
      unitAddress: "",
      cityAddress: "",
      stateAddress: "",
      zipAddress: "",
      errors: [],
    };
  },
  methods: {
    submit: function() {
      var params = {
        first_name: this.firstName,
        last_name: this.lastName,
        email: this.email,
        password: this.password,
        password_confirmation: this.passwordConfirmation,
        street: this.streetAddress,
        unit: this.unitAddress,
        city: this.cityAddress,
        state: this.stateAddress,
        zip: this.zipAddress,
      };
      axios
        .post("/api/users", params)
        .then(response => {
          this.$router.push("/login");
        })
        .catch(error => {
          this.errors = error.response.data.errors;
        });
    }
  }
};
</script>