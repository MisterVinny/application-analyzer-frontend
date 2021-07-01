<template>
  <div class="applications-new">
    <div>
      <h1>Add a New Application</h1>
    </div>
    <form v-on:submit="createApplication()">
      <p>
        Employer: <input type="text" v-model="newApplicationParams.employer" />
      </p>
      <p>
        Address: <input type="text" v-model="newApplicationParams.address" />
      </p>
      <p>
        Position: <input type="text" v-model="newApplicationParams.position" />
      </p>
      <p>Date: <input type="text" v-model="newApplicationParams.date" /></p>
      <p>
        Contact: <input type="text" v-model="newApplicationParams.contact" />
      </p>
      <p>Email: <input type="text" v-model="newApplicationParams.email" /></p>
      <p>
        Followup: <input type="text" v-model="newApplicationParams.followup" />
      </p>
      <p>Method: <input type="text" v-model="newApplicationParams.method" /></p>
      <p>
        Interviews:
        <input type="text" v-model="newApplicationParams.interviews" />
      </p>
      <p>Status: <input type="text" v-model="newApplicationParams.status" /></p>
      <p>
        Enthusiasm:
        <input type="text" v-model="newApplicationParams.enthusiasm" />
      </p>
      <p>
        Confidence:
        <input type="text" v-model="newApplicationParams.confidence" />
      </p>
      <p>Notes: <input type="text" v-model="newApplicationParams.notes" /></p>
      <input type="submit" class="btn btn-primary" value="Submit" />
    </form>

    <p>{{ newApplicationParams }}</p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function () {
    return {
      errors: [],
      newApplicationParams: {},
    };
  },

  created: function () {},

  methods: {
    createApplication: function () {
      axios
        .post("/applications", this.newApplicationParams)
        .then((response) => {
          console.log("New Application Object: ", response.data);
          this.$router.push("/applications");
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
          console.log(error.response.data.message);
          this.status = error.response.status;
        });
    },
  },
};
</script>
