<template>
  <div class="profile">
    <div v-if="editToggle === false">
      <h1>Profile</h1>
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
    <div v-else>
      <h1>Edit Profile</h1>
      <form v-on:submit.prevent="updateUser()">
        <div>
          <h5>Username</h5>
          <input type="text" v-model="editUserParams.username" />
        </div>
        <div>
          <h5>Address</h5>
          <textarea type="text" v-model="editUserParams.address" />
        </div>
        <div>
          <h5>Email</h5>
          <input type="text" v-model="editUserParams.email" />
        </div>
        <div>
          <button v-on:click="toggleEdit()">Cancel</button>
          <button v-on:click="updateUser()">Update User</button>
        </div>
      </form>
      <div>
        <button v-on:click="deleteUser()">Delete User</button>
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
