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
          <option value="distance">Distance</option>
          <option value="date">Date</option>
          <option value="updated_at">Last Updated</option>
          <option value="interviews">Interviews</option>
          <option value="enthusiasm">Enthusiasm</option>
          <option value="confidence">Confidence</option>
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

    <hr />
    <!--FILTER field and value functionality goes here as well as reset filter.-->
    <div>
      <div id="inline">
        <label>Filter By Field:</label>
        <select v-model="filterKey">
          <option value="" selected disabled hidden>Field</option>
          <option value="followup">Followup</option>
          <option value="status">Status</option>
          <option value="method">Method</option>
        </select>
      </div>
      <div id="inline">
        <label for="">Filter Value:</label>
        <select v-model="filterValue">
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

    <hr />
    <!--NEW FILTERING-->
    <!-- <label>Followup: </label>
    <input type="checkbox" id="checkbox" v-model="checked" />
    <label for="checkbox">{{ checked }}</label> -->
    <label>Followup: </label>
    <input type="radio" value="true" v-model="filterFollowup" />
    <label for="true">True</label>
    <br />
    <input type="radio" value="false" v-model="filterFollowup" />
    <label for="two">False</label>
    <br />
    <input type="radio" value="" v-model="filterFollowup" />
    <label for="none">None</label>
    <br />
    <span>Picked: {{ filterFollowup }}</span>

    <hr />
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
        filterFollowup,
        'followup'
      )"
      v-bind:key="application.id"
    >
      <!--List used here for formatting with bootstrap, or similar, for dynamic page sizing of application data-->
      <ul class="no-bullets">
        <div>
          <p id="inline"><b>Employer: </b>{{ application.employer }}</p>
          <p id="inline"><b>Position: </b>{{ application.position }}</p>
          <p id="inline"><b>Date Applied: </b>{{ application.date }}</p>
          <p id="inline">
            <b>Distance: </b>{{ Math.round(application.distance) }} miles
          </p>
        </div>
        <div>
          <p id="inline"><b>Method: </b>{{ application.method }}</p>
          <p id="inline"><b>Status: </b>{{ application.status }}</p>
          <p id="inline"><b>Contact: </b>{{ application.contact }}</p>
          <p id="inline"><b>Contact Email: </b>{{ application.email }}</p>
        </div>
        <p id="inline"><b>Followup: </b>{{ application.followup }}</p>
        <p id="inline"><b>Interviews: </b>{{ application.interviews }}</p>
        <p id="inline"><b>Enthusiasm: </b>{{ application.enthusiasm }}</p>
        <p id="inline"><b>Confidence: </b>{{ application.confidence }}</p>
        <p id="inline"><b>Notes: </b>{{ application.notes }}</p>
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

    <!--Test Tables-->
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
      checked: false,
      searchTerm: "",
      sortKey: "",
      filterValue: "",
      filterFollowup: "",
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
