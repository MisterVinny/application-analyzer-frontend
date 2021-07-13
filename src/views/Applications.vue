<template>
  <div class="applications">
    <div>
      <h1>Welcome, {{ user }}</h1>
      <h2>Here are your {{ applications.length }} applications:</h2>
    </div>

    <hr />
    <!--FILTERING using dropdowns-->
    <div>
      <div id="inline"><h3>Filter By:</h3></div>
    </div>
    <!--            DISTANCE filtering          -->

    <h1>{{ minDist }}</h1>
    <h1>{{ maxDist }}</h1>
    <hr />

    <hr />
    <!--NEW application - links to ApplicationsNew view.-->
    <div>
      <router-link to="/applications/new">Add Application</router-link>
    </div>

    <!--Test New Page-->
    <div class="container">
      <div class="row g-4">
        <!-- applications -->
        <div class="col-sm-12 col-md-12 col-lg-12">
          <!-- sorting applications as well as direction -->
          <div class="d-flex justify-content-between mb-4">
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
                <option value="1">Ascending</option>
                <option value="-1">Descending</option>
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

                <!-- filter by distance input -->
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
          <div class="row g-1 g-md-3">
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

          <!-- pagination -->
          <div class="mt-6 text-end">
            <nav aria-label="Pagination">
              <ul class="nav nav-pills nav-pills-sm nav-pills-invert">
                <li class="nav-item">
                  <a
                    class="nav-link px-3 px-3 disabled"
                    href="#"
                    tabindex="-1"
                    aria-disabled="true"
                  >
                    <span aria-hidden="true">«</span>
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link px-3" href="#">1</a>
                </li>
                <li class="nav-item" aria-current="page">
                  <a class="nav-link px-3 px-3 active" href="#">2</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link px-3" href="#">3</a>
                </li>
                <li class="nav-item disabled">
                  <a
                    class="nav-link px-3 px-3"
                    href="#"
                    tabindex="-1"
                    aria-disabled="true"
                    >...</a
                  >
                </li>
                <li class="nav-item">
                  <a class="nav-link px-3" href="#">12</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link px-3 px-3" href="#">
                    <span aria-hidden="true">»</span>
                  </a>
                </li>
              </ul>
            </nav>

            <p class="fs-6 text-gray-500 mt-2">157 total items</p>
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
