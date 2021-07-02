<template>
  <div class="applications">
    <div>
      <router-link to="/applications/new">Add Application</router-link>
    </div>
    <div v-for="application in applications" v-bind:key="application.id">
      <ul class="no-bullets">
        <li><b>Employer: </b>{{ application.employer }}</li>
        <li><b>Address: </b>{{ application.address }}</li>
        <li><b>Position: </b>{{ application.position }}</li>
        <li><b>Date Applied: </b>{{ application.date }}</li>
        <li><b>Contact: </b>{{ application.contact }}</li>
        <li><b>Contact Email: </b>{{ application.email }}</li>
        <li><b>Followup: </b>{{ application.followup }}</li>
        <li><b>Interviews: </b>{{ application.interviews }}</li>
        <li><b>Status: </b>{{ application.status }}</li>
        <li><b>Method: </b>{{ application.method }}</li>
        <li><b>Enthusiasm: </b>{{ application.enthusiasm }}</li>
        <li><b>Confidence: </b>{{ application.confidence }}</li>
        <li><b>Notes: </b>{{ application.notes }}</li>
      </ul>
      <router-link :to="`/applications/${application.id}/edit`"
        >Edit</router-link
      >
    </div>
  </div>
</template>

<script>
import axios from "axios";
// import Vue from "vue";
import Vue2Filters from "vue2-filters";

export default {
  mixins: [Vue2Filters.mixin],
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
