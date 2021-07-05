<template>
  <div class="applications">
    <div v-for="application in applications" v-bind:key="application.id">
      <p>{{ application }}</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function () {
    return {
      applications: [],
    };
  },

  created: function () {
    axios.get("/applications").then((response) => {
      console.log("Applications array", response.data);
      this.applications = response.data;
    });
  },

  methods: {},
};
</script>
