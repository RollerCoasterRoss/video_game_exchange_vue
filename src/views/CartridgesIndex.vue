<template>
  <div class="cartridges-index">
    <h3>Owned:</h3>

    <div>
      <ul>
        <li v-for="owned_cartridge in owned_cartridges">
          {{ owned_cartridge.id }}
        </li>
      </ul>
    </div>

    <h3>Borrowing:</h3>

    <div>
      <ul>
        <li v-for="borrowed_cartridge in borrowed_cartridges">
          {{ borrowed_cartridge.id }}
        </li>
      </ul>
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
        owned_cartridges: [],
        borrowed_cartridges: [],
      };
    },
    created: function() {
      axios
        .get("/api/cartridges/owned")
        .then(response => {
          this.owned_cartridges = response.data;
        });
      axios
        .get("/api/cartridges/borrowed")
        .then(response => {
          this.borrowed_cartridges = response.data;
        });
    },
    methods: {}
  };
</script>