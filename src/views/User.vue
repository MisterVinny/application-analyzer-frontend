<template>
  <div class="profile">
    <div>{{ userDetails }}</div>
    <div>
      <button v-on:click="deleteUser()">Delete User</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function () {
    return {
      userDetails: {},
      errors: [],
    };
  },

  created: function () {
    axios.get("/users/self").then((response) => {
      console.log("User: ", response.data);
      this.userDetails = response.data;
    });
  },
  methods: {
    deleteUser: function () {
      axios.delete("/users/self").then((response) => {
        console.log(response.data);
        localStorage.removeItem("jwt");
        this.$router.push("/");
      });
    },
  },
};
</script>
