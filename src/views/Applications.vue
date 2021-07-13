<template>
  <div class="applications">
    <section>
      <div class="container">
        <div class="row">
          <div class="col-lg-12 mb-5">
            <!-- cart item -->
            <div
              class="
                position-relative
                overflow-hidden
                border border-light
                rounded
                shadow-xs
                p-2
                mb-4
              "
            >
              <!-- remove from cart -->
              <a
                href="#!"
                class="
                  btn btn-warning btn-soft
                  p-2
                  rounded-0
                  position-absolute
                  top-0
                  end-0
                "
              >
                <svg
                  height="16px"
                  viewBox="0 0 16 16"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                >
                  <path
                    d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"
                  ></path>
                  <path
                    fill-rule="evenodd"
                    d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                  ></path>
                </svg>
              </a>

              <div class="row g-3 py-2 align-items-center">
                <div class="col-4 col-md-2">
                  <div class="ratio ratio-1x1">
                    <span
                      class="d-flex justify-content-center align-items-center"
                    >
                      <!-- <img
                        class="h-100"
                        src="/images/products/speakers/thumb/7-min.jpg"
                        alt="..."
                      /> -->
                      <div class="d-block">
                        <span class="text-dark fw-medium"
                          ><h3>Apple</h3>
                          <h6 class="text-gray-600">Rails Developer</h6></span
                        >
                      </div>
                    </span>
                  </div>
                </div>
                <div class="col-8 col-md-6">
                  <a
                    href="#!"
                    class="link-secondary text-decoration-none fw-medium"
                    >Sport Jabra Elite 75T</a
                  >
                  <small class="d-block text-muted">Unit Price: $32.99 </small>
                </div>
                <div class="col-12 col-md-4">
                  <div class="row g-3">
                    <div class="col-4 col-sm-6 col-lg-5 text-center">
                      <input
                        type="number"
                        class="form-control form-control-sm text-center px-2"
                        min="0"
                        max="9999"
                        value="1"
                      />
                      <small class="d-block text-muted mt-1">16 in stock</small>
                    </div>
                    <div class="col-8 col-sm-6 col-lg-7 text-md-end">
                      <p class="text-weight-muted mb-0">
                        <span class="fw-medium">$32.99</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!--FILTERING testing using dropdowns-->
    <!-- <div>
      <div id="inline"><h3>(testing)Filter By:</h3></div>
    </div> -->
    <!--            DISTANCE filtering          -->
    <!-- 
    <h1>{{ minDist }}</h1>
    <h1>{{ maxDist }}</h1>
 
    <hr />

    <hr /> -->
    <!-- main applications area-->
    <div class="container pt-4">
      <div class="row g-4">
        <!-- applications -->
        <div class="col-sm-12 col-md-12 col-lg-12">
          <div class="justify-content-center">
            <h1 class="text-center pb-2">
              Welcome, {{ user }}, you have
              {{ applications.length }} applications
            </h1>
          </div>
          <!-- sorting applications as well as direction -->
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
          <!-- end of sorting tools -->

          <!-- display INDEX of all applications taking into account sort and filter actions.-->
          <!-- application list main div-->
          <div class="row g-1 g-md-3 pb-6">
            <!-- application list div to be repeated with v-for -->
            <div
              class="col-12 col-lg-4"
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
              <div
                class="
                  card
                  h-100
                  shadow-xs-secondary
                  transition-top-hover transition-reveal-hover
                "
              >
                <div class="card-body py-4">
                  <div class="d-block">
                    <span class="text-dark fw-medium"
                      ><h3>{{ application.employer }}</h3>
                      <h6 class="text-gray-600">
                        {{ application.position }}
                      </h6></span
                    >
                  </div>
                  <ul>
                    <div>
                      <p class="my-0 py-1">
                        <b>Date Applied: </b>{{ application.date }}
                      </p>
                      <p class="my-0 py-1">
                        <b>Distance: </b
                        >{{ Math.round(application.distance) }} miles
                      </p>
                      <p class="my-0 py-1">
                        <b>Method: </b>{{ application.method }}
                      </p>
                      <p class="my-0 py-1">
                        <b>Status: </b>{{ application.status }}
                      </p>
                      <p class="my-0 py-1">
                        <b>Contact: </b>{{ application.contact }}
                      </p>
                      <p class="my-0 py-1">
                        <b>Contact Email: </b>{{ application.email }}
                      </p>
                      <p class="my-0 py-1">
                        <b>Followup: </b>{{ application.followup }}
                      </p>
                      <p class="my-0 py-1">
                        <b>Interviews: </b>{{ application.interviews }}
                      </p>
                      <p class="my-0 py-1">
                        <b>Enthusiasm: </b>{{ application.enthusiasm }}
                      </p>
                      <p class="my-0 py-1">
                        <b>Confidence: </b>{{ application.confidence }}
                      </p>
                      <p class="my-0 py-1">
                        <b>Notes: </b>{{ application.notes }}
                      </p>
                    </div>
                  </ul>
                  <router-link
                    class="text-dark fw-medium"
                    :to="`/applications/${application.id}/edit`"
                    >Edit</router-link
                  >
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
