<template>
  <div class="login">
    <!-- Page title -->
    <section class="py-6 bg-gray-200 text-center">
      <div class="container">
        <span class="d-inline-grid gap-auto-2 text-primary">
          <span>Account</span>
          <svg
            class="transform-flip-x-rtl"
            height="18px"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            ></path>
          </svg>
        </span>

        <h1 class="display-4 fw-bold">Sign up</h1>
      </div>
    </section>

    <!-- svg : divier -->
    <div class="divider-point-b bg-gray-200 mt-n4"></div>

    <!-- account -->
    <section>
      <div class="container">
        <div class="row">
          <div class="col-sm-8 col-md-6 col-lg-5 mx-auto">
            <form v-on:submit.prevent="submit()" class="form-validate">
              <!-- first name -->
              <div class="form-floating mb-4">
                <input
                  required
                  type="text"
                  class="form-control"
                  id="account_username"
                  placeholder="Username"
                  v-model="newUserParams.username"
                />
                <label for="account_username">Username</label>
              </div>

              <!-- last name -->
              <div class="form-floating mb-4">
                <input
                  required
                  type="text"
                  class="form-control"
                  id="account_address"
                  placeholder="Address (City, State, Zip)"
                  v-model="newUserParams.address"
                />
                <label for="account_address">Address (City, State, Zip)</label>
              </div>

              <!-- email address -->
              <div class="form-floating mb-4">
                <input
                  required
                  type="email"
                  class="form-control"
                  id="account_email"
                  placeholder="Email address"
                  v-model="newUserParams.email"
                />
                <label for="account_email">Email address</label>
              </div>

              <!-- password -->
              <div class="form-floating mb-4">
                <input
                  required
                  type="password"
                  class="form-control"
                  id="account_passwd"
                  placeholder="Password"
                  autocomplete="new-password"
                  v-model="newUserParams.password"
                />
                <label for="account_passwd">Password</label>
              </div>
              <div class="form-floating mb-4">
                <input
                  required
                  type="password"
                  class="form-control"
                  id="account_passwd_confirm"
                  placeholder="Confirm Password"
                  autocomplete="confirm-password"
                  v-model="newUserParams.password_confirmation"
                />
                <label for="account_passwd_confirm">Confirm Password</label>
              </div>

              <!-- submit button -->
              <div class="d-grid mb-4">
                <button type="submit" class="btn btn-primary" value="Submit">
                  <span>Sign up</span>
                  <svg
                    class="transform-flip-x-rtl"
                    height="18px"
                    viewBox="0 0 16 16"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"
                    ></path>
                  </svg>
                </button>
              </div>

              <div class="text-center">
                <router-link class="link-muted" to="/">Cancel</router-link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function () {
    return {
      newUserParams: {},
      errors: [],
    };
  },
  methods: {
    submit: function () {
      axios
        .post("/users", this.newUserParams)
        .then((response) => {
          console.log(response.data);
          this.$router.push("/");
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    },
  },
};
</script>
