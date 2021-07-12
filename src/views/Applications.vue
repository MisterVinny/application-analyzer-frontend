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
      <br />
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

    <!--Test New Page-->
    <div class="container">
      <div class="row g-4">
        <!-- sidebar -->
        <div class="col-sm-12 col-md-12 col-lg-2">
          <!-- Categories -->
          <div class="mb-5 px-3 py-4 bg-gray-200 rounded">
            <ul class="nav-deep p-0 m-0">
              <li class="nav-deep-item">
                <a
                  class="nav-deep-link"
                  href="#nav-sidebar-components"
                  data-bs-toggle="collapse"
                  aria-expanded="true"
                >
                  <span class="fw-medium">Speakers</span>
                </a>

                <ul id="nav-sidebar-components" class="nav-deep collapse show">
                  <li class="nav-deep-item">
                    <a class="nav-deep-link active" href="#!">Portable</a>
                  </li>
                  <li class="nav-deep-item">
                    <a class="nav-deep-link" href="#!">Sport</a>
                  </li>
                  <li class="nav-deep-item">
                    <a class="nav-deep-link" href="#!">Gifts</a>
                  </li>
                  <li class="nav-deep-item">
                    <a class="nav-deep-link" href="#!">Accessories</a>
                  </li>
                </ul>
              </li>
              <li class="nav-deep-item">
                <a class="nav-deep-link" href="#!">Home Amplifiers</a>
              </li>
              <li class="nav-deep-item">
                <a class="nav-deep-link" href="#!">Car Speakers</a>
              </li>
              <li class="nav-deep-item">
                <a class="nav-deep-link" href="#!">Car Speakers</a>
              </li>
            </ul>
          </div>

          <div class="mb-5">
            <h3 class="h6">Availability</h3>
            <div class="form-check user-select-none mb-2">
              <input
                class="form-check-input form-check-input-default"
                type="checkbox"
                value=""
                id="filter-stock"
              />
              <label class="form-check-label" for="filter-stock">
                In Stock
              </label>
            </div>
            <div class="form-check user-select-none mb-2">
              <input
                class="form-check-input form-check-input-default"
                type="checkbox"
                value=""
                id="filter-promotions"
              />
              <label class="form-check-label" for="filter-promotions">
                Promotions
              </label>
            </div>
          </div>

          <div class="mb-5">
            <h3 class="h6">Price</h3>
            <div class="form-check user-select-none mb-2">
              <input
                class="form-check-input form-check-input-default"
                type="checkbox"
                value=""
                id="filter-price-25"
              />
              <label class="form-check-label" for="filter-price-25">
                Under $25
              </label>
            </div>
            <div class="form-check user-select-none mb-2">
              <input
                class="form-check-input form-check-input-default"
                type="checkbox"
                value=""
                id="filter-price-25-50"
              />
              <label class="form-check-label" for="filter-price-25-50">
                25 - 50
              </label>
            </div>
            <div class="form-check user-select-none mb-2">
              <input
                class="form-check-input form-check-input-default"
                type="checkbox"
                value=""
                id="filter-price-50-100"
              />
              <label class="form-check-label" for="filter-price-50-100">
                50 - 100
              </label>
            </div>
            <div class="form-check user-select-none mb-2">
              <input
                class="form-check-input form-check-input-default"
                type="checkbox"
                value=""
                id="filter-price-100-500"
              />
              <label class="form-check-label" for="filter-price-100-500">
                100 - 500
              </label>
            </div>
            <div class="form-check user-select-none mb-2">
              <input
                class="form-check-input form-check-input-default"
                type="checkbox"
                value=""
                id="filter-price-500"
              />
              <label class="form-check-label" for="filter-price-500">
                500 &amp; Above
              </label>
            </div>
          </div>

          <div class="mb-5">
            <h3 class="h6">Size</h3>
            <div class="form-check user-select-none mb-2">
              <input
                class="form-check-input form-check-input-default"
                type="checkbox"
                value=""
                id="filter-size-xs"
              />
              <label class="form-check-label" for="filter-size-xs"> XS </label>
            </div>
            <div class="form-check user-select-none mb-2">
              <input
                class="form-check-input form-check-input-default"
                type="checkbox"
                value=""
                id="filter-size-xl"
                checked=""
              />
              <label class="form-check-label" for="filter-size-xl"> XL </label>
            </div>
            <div class="form-check user-select-none mb-2">
              <input
                class="form-check-input form-check-input-default"
                type="checkbox"
                value=""
                id="filter-size-xxs"
              />
              <label class="form-check-label" for="filter-size-xxs">
                XXS
              </label>
            </div>
          </div>

          <div class="mb-5">
            <h3 class="h6">Brand</h3>
            <div class="form-check user-select-none mb-2">
              <input
                class="form-check-input form-check-input-default"
                type="checkbox"
                value=""
                id="filter-brand-1"
              />
              <label class="form-check-label" for="filter-brand-1">
                Denon
              </label>
            </div>
            <div class="form-check user-select-none mb-2">
              <input
                class="form-check-input form-check-input-default"
                type="checkbox"
                value=""
                id="filter-brand-2"
              />
              <label class="form-check-label" for="filter-brand-2">
                Panasonic
              </label>
            </div>
            <div class="form-check user-select-none mb-2">
              <input
                class="form-check-input form-check-input-default"
                type="checkbox"
                value=""
                id="filter-brand-3"
              />
              <label class="form-check-label" for="filter-brand-3">
                Tetechnics
              </label>
            </div>
            <div class="form-check user-select-none mb-2">
              <input
                class="form-check-input form-check-input-default"
                type="checkbox"
                value=""
                id="filter-brand-4"
              />
              <label class="form-check-label" for="filter-brand-4">
                Sony
              </label>
            </div>
            <div class="form-check user-select-none mb-2">
              <input
                class="form-check-input form-check-input-default"
                type="checkbox"
                value=""
                id="filter-brand-5"
              />
              <label class="form-check-label" for="filter-brand-5">
                Pioneer
              </label>
            </div>

            <div id="brands-more" class="collapse">
              <div class="form-check user-select-none mb-2">
                <input
                  class="form-check-input form-check-input-default"
                  type="checkbox"
                  value=""
                  id="filter-brand-6"
                />
                <label class="form-check-label" for="filter-brand-6">
                  Teac
                </label>
              </div>
              <div class="form-check user-select-none mb-2">
                <input
                  class="form-check-input form-check-input-default"
                  type="checkbox"
                  value=""
                  id="filter-brand-7"
                />
                <label class="form-check-label" for="filter-brand-7">
                  Yamaha
                </label>
              </div>
            </div>

            <a
              href="#brands-more"
              data-bs-toggle="collapse"
              class="text-decoration-none text-muted"
            >
              <span class="group-switch">
                <span>view more (2)</span>
                <span>view less (2)</span>
              </span>
            </a>
          </div>
        </div>

        <!-- applications -->

        <div class="col-sm-12 col-md-12 col-lg-10">
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

            <div class="d-inline-grid gap-auto-2">
              <label>Sort Order : </label>
              <input type="radio" v-model="sortOrder" v-bind:value="1" />
              <label></label>Ascending
              <input type="radio" v-model="sortOrder" v-bind:value="-1" />
              <label>Descending</label>
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

                <div class="row g-3">
                  <div class="col-md-6">
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
                  <div class="col-md-6">
                    <div class="form-floating mb-3">
                      <select
                        class="form-select"
                        id="filter-brand"
                        aria-label="Brand"
                      >
                        <option value="" selected>Any</option>
                        <option value="1">Nike</option>
                        <option value="2">Adidas</option>
                        <option value="3">Loreal</option>
                      </select>
                      <label for="filter-brand">Brand</label>
                    </div>
                  </div>
                </div>

                <div class="form-check d-block d-sm-inline-block me-2 mb-2">
                  <input
                    class="form-check-input form-check-input-primary"
                    type="checkbox"
                    value="1"
                    id="filter-saleprice"
                  />
                  <label
                    class="form-check-label user-select-none"
                    for="filter-saleprice"
                  >
                    Sale price
                  </label>
                </div>

                <div class="form-check d-block d-sm-inline-block me-2 mb-2">
                  <input
                    class="form-check-input form-check-input-primary"
                    type="checkbox"
                    value="1"
                    id="filter-preorder"
                  />
                  <label
                    class="form-check-label user-select-none"
                    for="filter-preorder"
                  >
                    Allow preorders
                  </label>
                </div>

                <div class="d-flex justify-content-between pt-2">
                  <button type="submit" class="btn btn-sm btn-primary">
                    Apply filter
                  </button>
                  <a href="#!" class="btn btn-sm btn-danger btn-soft float-end"
                    >Reset</a
                  >
                </div>
              </div>
            </form>
          </div>
          <!-- end of sorting tools -->

          <!-- display INDEX of all applications taking into account sort and filter actions.-->
          <!-- application list main div-->
          <div class="row g-1 g-md-4">
            <!-- application list div to be repeated with v-for -->
            <div
              class="col-12 col-lg-6"
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
                  application.distance >= this.distanceMin &&
                  application.distance < this.distanceMax
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
                    </div>
                    <div>
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
                    </div>
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
                  </ul>
                  <router-link :to="`/applications/${application.id}/edit`"
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
