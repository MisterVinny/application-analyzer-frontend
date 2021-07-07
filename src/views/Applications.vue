<template>
  <div class="applications">
    <div>
      <h1>Welcome, {{ user }}</h1>
      <h2>Here are your {{ applications.length }} applications:</h2>

      <!--SORT functionality goes here - for the dropdown and order choices.-->
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

    <!--FILTER field and value functionality goes here as well as reset filter.-->
    <div>
      <div id="inline">
        <label>Filter By Field:</label>
        <select v-model="filterKey">
          <option value="employer" selected disabled hidden>Field</option>
          <option value="followup">Followup</option>
          <option value="status">Status</option>
          <option value="method">Method</option>
        </select>
      </div>
      <div id="inline">
        <label for="">Filter Value:</label>
        <select v-if="filterKey != employer" v-model="filterValue">
          <option
            v-for="application in filteredValues"
            v-bind:key="application.id"
            v-bind:selected="index === 0"
          >
            {{ application[filterKey] }}
          </option>
        </select>
      </div>
      <button v-on:click="resetFilter()">Reset Filter</button>
    </div>

    <!--SEARCH field, filter is the innermost base filter.-->
    <div>
      <h3>Search:</h3>
      <input v-model="searchTerm" type="text" />
      <br />
    </div>

    <!--NEW application - links to ApplicationsNew view.-->
    <div>
      <router-link to="/applications/new">Add Application</router-link>
    </div>

    <!--INDEX of all applications taking into account sort and filter actions.-->
    <div
      v-for="application in filterBy(
        filterBy(orderBy(applications, sortKey, sortOrder), searchTerm),
        filterValue,
        filterKey
      )"
      v-bind:key="application.id"
    >
      <!--List used here for formatting with bootstrap, or similar, for dynamic page sizing of application data-->
      <ul class="no-bullets">
        <li id="inline"><b>Employer: </b>{{ application.employer }}</li>
        <li id="inline"><b>Address: </b>{{ application.address }}</li>
        <li id="inline"><b>Position: </b>{{ application.position }}</li>
        <li id="inline"><b>Date Applied: </b>{{ application.date }}</li>
        <li id="inline"><b>Contact: </b>{{ application.contact }}</li>
        <li id="inline"><b>Contact Email: </b>{{ application.email }}</li>
        <li id="inline"><b>Followup: </b>{{ application.followup }}</li>
        <li id="inline"><b>Interviews: </b>{{ application.interviews }}</li>
        <li id="inline"><b>Status: </b>{{ application.status }}</li>
        <li id="inline"><b>Method: </b>{{ application.method }}</li>
        <li id="inline"><b>Enthusiasm: </b>{{ application.enthusiasm }}</li>
        <li id="inline"><b>Confidence: </b>{{ application.confidence }}</li>
        <li id="inline"><b>Notes: </b>{{ application.notes }}</li>
      </ul>
      <router-link :to="`/applications/${application.id}/edit`"
        >Edit</router-link
      >
    </div>
    <div>
      <!--If no results found for search, lets user know.-->
      <span v-if="filterBy(applications, searchTerm).length == 0">
        <p>No Results Found</p>
      </span>
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
      searchTerm: "",
      sortKey: "",
      filterKey: "id",
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
