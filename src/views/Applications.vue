<template>
  <div class="applications">
    <!-- main applications area-->
    <div class="container px-0 pt-4">
      <div class="row g-4">
        <!-- applications -->
        <div class="col-sm-12 col-md-12 col-lg-12">
          <!-- sorting applications as well as direction -->
          <div class="container">
            <div class="justify-content-center">
              <h2 class="text-left pb-2">
                Welcome, {{ user }}, you have
                {{ applications.length }} applications
              </h2>
            </div>
            <div class="d-flex justify-content-between mb-4">
              <div class="position-relative">
                <router-link
                  class="btn btn-secondary btn-sm"
                  to="/applications/new"
                  >Add Application</router-link
                >
              </div>
              <div class="position-relative">
                <select v-model="sortKey" class="form-select form-select-sm">
                  <option value="" selected hidden>Sort By</option>
                  <option value="employer">Employer</option>
                  <option value="distance">Distance</option>
                  <option value="date">Date</option>
                  <option value="updated_at">Last Updated</option>
                  <option value="interviews">Interviews</option>
                  <option value="enthusiasm">Enthusiasm</option>
                  <option value="confidence">Confidence</option>
                </select>
              </div>
              <div class="position-relative">
                <select v-model="sortOrder" class="form-select form-select-sm">
                  <option :value="1">Ascending</option>
                  <option :value="-1">Descending</option>
                </select>
              </div>
              <!--SEARCH field, filter is the innermost base filter.-->
              <div>
                <input
                  class="form-control"
                  type="text"
                  placeholder="Search"
                  aria-label="deafult input example"
                  v-model="searchTerm"
                />
                <br />
              </div>
              <!-- filtering dropdown menu-->
              <form method="get" class="dropdown">
                <input
                  type="text"
                  class="dropdown-toggle form-control"
                  data-bs-toggle="dropdown"
                  placeholder="Filters"
                />

                <div
                  class="
                    dropdown-menu dropdown-clickable
                    animate-fadein
                    shadow-lg
                    p-4
                  "
                >
                  <h6 class="mb-4">Filter applications</h6>

                  <!-- filter by followup internal dropwdown -->
                  <div class="row g-3">
                    <div class="col-md-12">
                      <div class="form-floating mb-3">
                        <select
                          class="form-select"
                          id="filter-followup"
                          aria-label="Followup"
                          v-model="filterFollowup"
                        >
                          <option value="" selected>None</option>
                          <option value="true">True</option>
                          <option value="false">False</option>
                        </select>
                        <label for="filter-followup">Followup</label>
                      </div>
                    </div>
                  </div>

                  <!-- filter by status internal dropdown -->
                  <div class="row g-3">
                    <div class="col-md-12">
                      <div class="form-floating mb-3">
                        <select
                          class="form-select"
                          id="filter-status"
                          aria-label="Status"
                          v-model="filterStatus"
                        >
                          <option value="" selected>None</option>
                          <option value="pending">Pending</option>
                          <option value="in-contact">In-contact</option>
                          <option value="refused-offer">Refused-offer</option>
                          <option value="rejected">Rejected</option>
                          <option value="accepted-offer">Accepted-offer</option>
                        </select>
                        <label for="filter-status">Status</label>
                      </div>
                    </div>
                  </div>

                  <!-- filter by method internal dropdown -->
                  <div class="row g-3">
                    <div class="col-md-12">
                      <div class="form-floating mb-3">
                        <select
                          class="form-select"
                          id="filter-method"
                          aria-label="Method"
                          v-model="filterMethod"
                        >
                          <option value="" selected>None</option>
                          <option
                            v-for="application in filteredValues"
                            v-bind:key="application.id"
                          >
                            {{ application[filterKey] }}
                          </option>
                        </select>
                        <label for="filter-method">Method</label>
                      </div>
                    </div>
                  </div>

                  <div class="d-flex justify-content-between pt-2">
                    <div id="inline">
                      <button
                        v-on:click.prevent="resetFilter()"
                        class="btn btn-sm btn-danger btn-soft float-end"
                      >
                        Reset Filters
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <!-- end of sorting tools -->

          <!-- display INDEX of all applications taking into account sort and filter actions.-->
          <!-- application list main div-->
          <div
            class="container px-1 mx-1"
            v-for="application in filterBy(
              filterBy(
                filterBy(
                  filterBy(
                    filterBy(
                      orderBy(applications, sortKey, sortOrder),
                      searchTerm
                    ),
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
                application.distance >= minDist &&
                application.distance < maxDist
            )"
            v-bind:key="application.id"
          >
            <div class="row">
              <div class="col-lg-12 mb-2">
                <!-- cart item -->
                <div
                  class="
                    position-relative
                    overflow-hidden
                    border border-light
                    rounded
                    shadow-xs-secondary
                    p-2
                    mb-4
                    transition-top-hover transition-reveal-hover
                  "
                >
                  <!-- edit application -->
                  <router-link
                    class="
                      btn btn-warning btn-soft
                      p-2
                      rounded-0
                      position-absolute
                      top-0
                      end-0
                    "
                    :to="`/applications/${application.id}/edit`"
                  >
                    <svg
                      height="18px"
                      viewBox="0 0 16 16"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"
                      ></path></svg
                  ></router-link>

                  <div class="row py-2 px-2 align-items-center">
                    <!-- employer and position left tab -->
                    <div class="col-md-2">
                      <div class="ratio ratio-1x1">
                        <span
                          class="d-flex justify-content-left align-items-center"
                        >
                          <div class="d-block">
                            <span class="text-dark fw-medium"
                              ><h3>{{ application.employer }}</h3>
                              <h6 class="text-gray-600">
                                {{ application.position }}
                              </h6></span
                            >
                          </div>
                        </span>
                      </div>
                    </div>

                    <!-- first pair of top-bottom rows in a col -->
                    <div class="col-md-10">
                      <div class="row">
                        <div class="col-md-2">
                          <small class="d-block text-muted"
                            >Date Applied
                          </small>
                          <p>{{ application.date }}</p>
                        </div>
                        <div class="col-md-2">
                          <small class="d-block text-muted">Method </small>
                          <p>{{ application.method }}</p>
                        </div>
                        <div class="col-md-2">
                          <small class="d-block text-muted">Followup </small>
                          <p>{{ application.followup }}</p>
                        </div>
                        <div class="col-md-2">
                          <small class="d-block text-muted">Enthusiasm </small>
                          <p>{{ application.enthusiasm }}</p>
                        </div>
                        <div class="col-md-3">
                          <small class="d-block text-muted">Contact </small>
                          <p>{{ application.contact }}</p>
                        </div>
                      </div>

                      <!-- lower pair of informational rows, should match top for col size -->
                      <div class="row">
                        <div class="col-md-2">
                          <small class="d-block text-muted">Distance </small>
                          <p>{{ Math.round(application.distance) }} miles</p>
                        </div>
                        <div class="col-md-2">
                          <small class="d-block text-muted">Status </small>
                          <p>{{ application.status }}</p>
                        </div>
                        <div class="col-md-2">
                          <small class="d-block text-muted">Interviews </small>
                          <p>{{ application.interviews }}</p>
                        </div>
                        <div class="col-md-2">
                          <small class="d-block text-muted">Confidence </small>
                          <p>{{ application.confidence }}</p>
                        </div>
                        <div class="col-md-3">
                          <small class="d-block text-muted"
                            >Contact Email
                          </small>
                          <p>{{ application.email }}</p>
                        </div>

                        <!-- card fooder for notes, spans entire info area -->
                        <div class="row">
                          <div class="col-10">
                            <small class="d-block text-muted">Notes</small>
                            <p>{{ application.notes }}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
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
      distanceValues: [0, 25000],
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
  mounted: function () {},

  computed: {
    filteredValues: function () {
      return [
        ...new Map(
          this.applications.map((item) => [item[this.filterKey], item])
        ).values(),
      ];
    },
    minDist() {
      return this.distanceValues[0];
    },
    maxDist() {
      return this.distanceValues[1];
    },
  },

  methods: {
    resetFilter: function () {
      this.filterFollowup = "";
      this.filterStatus = "";
      this.filterMethod = "";
      this.filterDistance = "";
      this.distanceValues[0] = 0;
      this.distanceValues[1] = 25000;
    },
  },
};
</script>
