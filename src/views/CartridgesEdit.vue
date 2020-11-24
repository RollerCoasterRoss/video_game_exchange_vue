<template>
  <div class="cartridges-edit">
    
  </div>
</template>

<style>
</style>

<script>
  var axios = require("axios");

  export default {
    data: function() {
      return {
        cartridge: {
          id: "",
          video_game_id: "",
          owner_id: "",
          borrower_id: "",
          lend_date: "",
        },
        erorrs: []
      };
    },
    created: function() {
      axios
        .get("/api/cartridges/" + this.$route.params.id)
        .then(response => {
          this.cartridge = response.data;
        });
    },
    methods: {
      editCartridge: function() {
        var clientParams = {
          borrower_id: this.borrower_id,
          lend_date: this.lend_date,
        };
        axios
          .patch("/api/cartridges/" + this.$route.params.id, clientParams)
          .then(response => {
            this.$router.push("/cartridges/" + this.$route.params.id);
          }).catch(error => {
            this.errors = error.response.data.errors;
          });
      }
    }
  };
</script>