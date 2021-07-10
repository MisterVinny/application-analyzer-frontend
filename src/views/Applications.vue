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
    <!--FILTERING using dropdowns-->
    <div>
      <div id="inline"><h3>Filter By:</h3></div>
      <div id="inline">
        <label>Followup:</label>
        <select v-model="filterFollowup">
          <option value="" selected>None</option>
          <option value="true">True</option>
          <option value="false">False</option>
        </select>
      </div>
      <div id="inline">
        <label>Status:</label>
        <select v-model="filterStatus">
          <option value="" selected>None</option>
          <option value="pending">Pending</option>
          <option value="in-contact">In-contact</option>
          <option value="refused-offer">Refused-offer</option>
          <option value="rejected">Rejected</option>
          <option value="accepted-offer">Accepted-offer</option>
        </select>
      </div>
      <div id="inline">
        <label>Method:</label>
        <select v-model="filterMethod">
          <option value="" selected>None</option>
          <option
            v-for="application in filteredValues"
            v-bind:key="application.id"
          >
            {{ application[filterKey] }}
          </option>
        </select>
      </div>
      <!--            DISTANCE filtering          -->
      <div id="inline">
        <label>Distance Minimum:</label>
        <select v-model="distanceMin">
          <option value="0" selected>Min</option>
          <option value="500">500</option>
          <option value="1000">1000</option>
          <option value="2500">2500</option>
        </select>
      </div>
      <div id="inline">
        <label>Distance Maximum:</label>
        <select v-model="distanceMax">
          <option value="25000" selected>Max</option>
          <option value="10000">10000</option>
          <option value="5000">5000</option>
          <option value="2500">2500</option>
        </select>
      </div>
      <div id="inline">
        <button v-on:click="resetFilter()">Reset Filters</button>
      </div>
    </div>

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
        filterBy(
          filterBy(
            filterBy(
              filterBy(orderBy(applications, sortKey, sortOrder), searchTerm),
              filterFollowup,
              'followup'
            ),
            filterStatus,
            'status'
          ),
          filterMethod,
          'method'
        ),
        (application) =>
          application.distance >= this.distanceMin &&
          application.distance < this.distanceMax
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
      searchTerm: "",
      sortKey: "",
      filterKey: "method",
      filterFollowup: "",
      filterStatus: "",
      filterMethod: "",
      filterDistance: "",
      distanceMin: 0,
      distanceMax: 25000,
      distanceSelected: "",
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
      this.filterFollowup = "";
      this.filterStatus = "";
      this.filterMethod = "";
      this.filterDistance = "";
      this.distanceMin = 0;
      this.distanceMax = 25000;
    },
  },
};
</script>
