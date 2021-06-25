<template>
  <div class="user">
    <div>{{ userDetails }}</div>
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
  methods: {
    submit: function () {
      axios.get(`/users/${this.$route.params.userid}`).then((response) => {
        console.log("User: ", response.data);
        this.userDetails = response.data;
      });
    },
  },
};
</script>
