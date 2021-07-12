<template>
  <div id="app">
    <div id="nav">
      <!-- Navbar -->
      <nav
        class="
          py-3
          navbar navbar-expand-lg navbar-light
          bg-white
          shadow
          navbar-autohide
        "
      >
        <div class="container">
          <!-- brand / logo -->
          <img src="https://img.icons8.com/clouds/100/000000/code.png" />
          <h1>Application Hub</h1>

          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarMainContent"
            aria-controls="navbarMainContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse" id="navbarMainContent">
            <!-- mobile close -->
            <div
              class="
                d-flex d-lg-none
                pb-3
                justify-content-between
                align-items-center
              "
            >
              <img src="https://img.icons8.com/clouds/100/000000/code.png" />
              <h1>Application Hub</h1>
              <button
                class="navbar-toggler"
                type="dropdown"
                data-bs-toggle="collapse"
                data-bs-target="#navbarMainContent"
                aria-controls="navbarMainContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <svg
                  height="28px"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>

            <!--######################### NEW DROPDOWN ##############################-->
            <ul class="navbar-nav ms-auto">
              <li v-if="isLoggedIn()">
                <router-link class="dropdown-item" to="/applications"
                  >Applications</router-link
                >
              </li>
              <li v-if="isLoggedIn()">
                <router-link class="dropdown-item" to="/analysis"
                  >Analysis</router-link
                >
              </li>
              <li v-if="isLoggedIn()">
                <router-link class="dropdown-item" to="/profile"
                  >Profile</router-link
                >
              </li>
              <li v-if="isLoggedIn()">
                <router-link class="dropdown-item" to="/logout"
                  >Logout</router-link
                >
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <!-- /Navbar -->
      <router-view />
    </div>
  </div>
</template>

<style>
ul.no-bullets {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

#inline {
  display: inline-block;
}
</style>

<script>
export default {
  data: function () {
    return {
      flashMessage: "Testme",
    };
  },

  created: function () {},

  methods: {
    isLoggedIn: function () {
      return localStorage.getItem("jwt");
    },
  },
};
</script>
