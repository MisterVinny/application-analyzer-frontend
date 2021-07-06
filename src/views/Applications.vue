<template>
  <div class="applications">
    <div>
      <h1>Welcome, {{ user }}</h1>
      <h2>Here are your applications so far:</h2>
      <div id="inline">
        <label>Sort By:</label>
        <select v-model="sortKey">
          <option value="employer">Employer</option>
          <option value="position">Position</option>
          <option value="date">Date</option>
          <option value="interviews">Interviews</option>
          <option value="enthusiasm">Enthusiasm</option>
          <option value="confidence">Confidence</option>
          <option value="updated_at">Last Updated</option>
        </select>
      </div>

      <div id="inline">
        <label>Sort Order : </label>
        <input type="radio" v-model="sortOrder" v-bind:value="1" />
        <label></label>Ascending
        <input type="radio" v-model="sortOrder" v-bind:value="-1" />
        <label>Descending</label>
      </div>
    </div>

    <div>
      <div id="inline">
        <label>Filter By Field:</label>
        <select v-model="filterKey">
          <option value="" selectetd hidden>Field</option>
          <option value="followup">Followup</option>
          <option value="status">Status</option>
          <option value="method">Method</option>
        </select>
      </div>
      <div id="inline">
        <select v-if="filterKey != employer" v-model="filterValue">
          <option value="" disabled hidden>Value</option>
          <option
            v-for="application in filteredValues"
            v-bind:key="application.id"
          >
            {{ application[filterKey] }}
          </option>
        </select>
      </div>
      <button v-on:click="resetFilter()">Reset Filter</button>
    </div>

    <!-- refactor this to fit and have a v-if for each of the filter Keys based on what is selected -->
    <!-- <input v-model="searchTerm" type="text" list="titles" />
    <br />

    <datalist id="followup">
      <option v-for="application in applications" v-bind:key="application.id">
        {{ application.title }}
      </option>
    </datalist>

    <span v-if="filterBy(applications, searchTerm, 'title').length == 0">
      <p>No Results Found</p>
    </span> 
    
    -->

    <div>
      <router-link to="/applications/new">Add Application</router-link>
    </div>
    <div
      v-for="application in filterBy(
        orderBy(applications, sortKey, sortOrder),
        filterValue,
        filterKey
      )"
      v-bind:key="application.id"
    >
      <!--List used here for formatting with bootstrap, or similar, for dynamic page sizing of application data-->
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
import Vue2Filters from "vue2-filters";

export default {
  mixins: [Vue2Filters.mixin],

  data: function () {
    return {
      applications: [],
      sortKey: "",
      filterKey: "employer",
      filterValue: "",
      sortOrder: 1,
      user: "",
    };
  },

  created: function () {
    axios.get("/applications").then((response) => {
      console.log("Applications array", response.data);
      this.applications = response.data;
    });
    axios.get("/users/self").then((response) => {
      console.log("User: ", response.data.username);
      this.user = response.data.username;
    });
  },

  computed: {
    filteredValues: function () {
      return [
        ...new Map(
          this.applications.map((item) => [item[this.filterKey], item])
        ).values(),
      ];
    },
  },

  methods: {
    resetFilter: function () {
      this.filterKey = "employer";
      this.filterValue = "";
    },
  },
};
</script>
