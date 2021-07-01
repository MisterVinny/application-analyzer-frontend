<template>
  <div class="profile">
    <div v-if="editToggle === false">
      <div>
        <h5>Username</h5>
        <p>{{ userDetails.username }}</p>
      </div>
      <div>
        <h5>Address</h5>
        <p>{{ userDetails.address }}</p>
      </div>
      <div>
        <h5>Email</h5>
        <p>{{ userDetails.email }}</p>
      </div>
      <button v-on:click="toggleEdit()">Edit User Details</button>
    </div>
    <form v-else v-on:submit.prevent="updateUser()">
      <div>
        <div>
          <h5>Username</h5>
          <input
            type="text"
            :placeholder="userDetails.username"
            v-model="editUserParams.username"
          />
        </div>
        <div>
          <h5>Address</h5>
          <input
            type="text"
            :placeholder="userDetails.address"
            v-model="editUserParams.address"
          />
        </div>
        <div>
          <h5>Email</h5>
          <input
            type="text"
            :placeholder="userDetails.email"
            v-model="editUserParams.email"
          />
        </div>
        <div>
          <button v-on:click="toggleEdit()">Cancel</button>
          <button v-on:click="updateUser()">Update User</button>
        </div>
        <div>
          <button v-on:click="deleteUser()">Delete User</button>
        </div>
      </div>
    </form>
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
      axios.delete("/users/self").then((response) => {
        console.log(response.data);
        localStorage.removeItem("jwt");
        this.$router.push("/");
      });
    },
    toggleEdit: function () {
      this.editToggle = !this.editToggle;
    },
  },
};
</script>
