<template>
  <div class="applications">
    <div>
      <p>{{ sortKey }}</p>
      <!-- <div id="inline">
        <p>Sort By:</p>
      </div> -->

      <div id="inline">
        <label for="cars">Sort By:</label>
        <select v-model="sortKey">
          <option value="employer">Employer</option>
          <option value="address">Address</option>
          <option value="position">Position</option>
          <option value="date">Date</option>
          <option value="contact">Contact</option>
          <option value="email">Email</option>
          <option value="followup">Followup</option>
          <option value="interviews">Interviews</option>
          <option value="status">Status</option>
          <option value="status">Status</option>
          <option value="method">Method</option>
          <option value="enthusiasm">Enthusiasm</option>
          <option value="confidence">Confidence</option>
          <option value="updated_at">Updated_at</option>
          <option value="audi">Audi</option>
          <option value="audi">Audi</option>
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

    <!-- <div>
      <input v-model="sortKey" type="text" list="methods" />
      <br />

      <datalist id="methods">
        <option v-for="application in applications" v-bind:key="application.id">
          {{ application.method }}
        </option>
      </datalist>
    </div> -->
    <div>
      <router-link to="/applications/new">Add Application</router-link>
    </div>
    <div
      v-for="application in orderBy(applications, sortKey, sortOrder)"
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
      filterTerm: "",
      sortOrder: 1,
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
