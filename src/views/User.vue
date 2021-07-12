<template>
  <div class="profile">
    <!-- New Profile-->
    <div class="container position-relative mt-n5 mt-sm-n6 pt-8">
      <div class="bg-white rounded shadow-xs-secondary p-4 py-sm-5">
        <!--shows as default user profile view-->
        <div class="row g-4 align-items-center" v-if="editToggle === false">
          <div class="col-md-4">
            <div class="d-inline-grid gap-auto-3 text-gray-500">
              <div class="my-2">
                <h2 class="h5 fw-medium mb-0 text-gray-800">Username</h2>
                <p class="m-0">{{ userDetails.username }}</p>
              </div>
            </div>
          </div>

          <div class="col-md-4">
            <div class="d-inline-grid gap-auto-3 text-gray-500">
              <div class="my-2">
                <h2 class="h5 fw-medium mb-0 text-gray-800">Address</h2>
                <p class="m-0">{{ userDetails.address }}</p>
              </div>
            </div>
          </div>

          <div class="col-md-4">
            <div class="d-inline-grid gap-auto-3 text-gray-500">
              <div class="my-2">
                <h2 class="h5 fw-medium mb-0 text-gray-800">Email</h2>
                <p class="m-0">{{ userDetails.email }}</p>
              </div>
            </div>
          </div>
        </div>

        <!--Shows for editing user details-->
        <div class="row g-4 align-items-center" v-else>
          <!--user name field-->
          <div class="col-md-4">
            <div class="d-inline-grid gap-auto-3 text-gray-500">
              <div class="my-2">
                <div class="form-floating mb-4">
                  <input
                    type="text"
                    class="form-control"
                    id="account_username"
                    placeholder="Username"
                    v-model="editUserParams.username"
                  />
                  <label for="account_username">Username</label>
                </div>
              </div>
            </div>
          </div>

          <!--user address field-->
          <div class="col-md-4">
            <div class="d-inline-grid gap-auto-3 text-gray-500">
              <div class="my-2">
                <div class="form-floating mb-4">
                  <input
                    type="text"
                    class="form-control"
                    id="account_address"
                    placeholder="Address (City, State, Zip)"
                    v-model="editUserParams.address"
                  />
                  <label for="account_address"
                    >Address (City, State, Zip)</label
                  >
                </div>
              </div>
            </div>
          </div>

          <!--user email field-->
          <div class="col-md-4">
            <div class="d-inline-grid gap-auto-3 text-gray-500">
              <div class="my-2">
                <div class="form-floating mb-4">
                  <input
                    type="text"
                    class="form-control"
                    id="account_email"
                    placeholder="Email"
                    v-model="editUserParams.email"
                  />
                  <label for="account_email">Email</label>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!--buttons for edit update and cancel-->
        <div class="row g-4 justify-content-left">
          <!--single button to edit user-->
          <div class="col-md-8 pt-5" v-if="editToggle === false">
            <button
              type="button"
              class="btn btn-outline-secondary btn-sm"
              v-on:click="toggleEdit()"
            >
              Edit User
            </button>
          </div>
          <!--buttons to cancel edit, update user, and delete user-->
          <div class="col-md-8 d-inline-grid gap-auto-3 pt-5" v-else>
            <button
              type="button"
              class="btn btn-outline-secondary btn-sm"
              v-on:click="toggleEdit()"
            >
              Cancel
            </button>
            <button
              type="button"
              class="btn btn-outline-secondary btn-sm"
              v-on:click="updateUser()"
            >
              Update User
            </button>
            <button
              type="button"
              class="btn btn-outline-secondary btn-sm"
              v-on:click="deleteUser()"
            >
              Delete User
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function () {
    return {
      userDetails: {},
      editUserParams: {},
      errors: [],
      editToggle: false,
    };
  },

  created: function () {
    axios.get("/users/self").then((response) => {
      console.log("User: ", response.data);
      this.userDetails = response.data;
    });
  },
  methods: {
    updateUser: function () {
      axios.patch("/users/self", this.editUserParams).then((response) => {
        console.log("Updated User Object: ", response.data);
        this.userDetails = response.data;
        this.editUserParams = {};
        this.editToggle = false;
      });
    },
    deleteUser: function () {
      if (confirm("Do you really want to delete this user?")) {
        axios.delete("/users/self").then((response) => {
          console.log(response.data);
          localStorage.removeItem("jwt");
          this.$router.push("/");
        });
      }
    },
    toggleEdit: function () {
      if (this.editToggle === false) {
        Object.assign(this.editUserParams, this.userDetails);
      }
      this.editToggle = !this.editToggle;
    },
  },
};
</script>
