<template>
  <div class="applications-new">
    <div>
      <h1>Add a New Application</h1>
    </div>
    <form v-on:submit.prevent="createApplication()">
      <div class="form-group">
        <label>Employer:</label>
        <input
          type="text"
          class="form-control"
          v-model="newApplicationParams.employer"
        />
      </div>
      <div class="form-group">
        <label>Address:</label>
        <input
          type="text"
          class="form-control"
          v-model="newApplicationParams.address"
        />
      </div>
      <div class="form-group">
        <label>Position:</label>
        <input
          type="text"
          class="form-control"
          v-model="newApplicationParams.position"
        />
      </div>
      <div class="form-group">
        <label>Date:</label>
        <date-picker
          v-model="newApplicationParams.date"
          class="form-control"
          valueType="format"
        ></date-picker>
        <!-- <input
          type="text"
          class="form-control"
          v-model="newApplicationParams.date"
        /> -->
      </div>
      <div class="form-group">
        <label>Contact:</label>
        <input
          type="text"
          class="form-control"
          v-model="newApplicationParams.contact"
        />
      </div>
      <div class="form-group">
        <label>Email:</label>
        <input
          type="text"
          class="form-control"
          v-model="newApplicationParams.email"
        />
      </div>
      <div class="form-group">
        <label>Method:</label>
        <input
          type="text"
          class="form-control"
          v-model="newApplicationParams.method"
        />
      </div>
      <div class="form-group">
        <label>Enthusiasm:</label>
        <input
          type="number"
          class="form-control"
          v-model="newApplicationParams.enthusiasm"
        />
      </div>
      <div class="form-group">
        <label>Confidence:</label>
        <input
          type="number"
          class="form-control"
          v-model="newApplicationParams.confidence"
        />
      </div>
      <div class="form-group">
        <label>Notes:</label>
        <input
          type="text"
          class="form-control"
          v-model="newApplicationParams.notes"
        />
      </div>
      <input type="submit" class="btn btn-primary" value="Submit" />
    </form>

    <ul class="no-bullets">
      <li class="text-danger" v-for="error in errors" v-bind:key="error.id">
        {{ error }}
      </li>
    </ul>
    <p>{{ newApplicationParams }}</p>
  </div>
</template>

<script>
import axios from "axios";
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";

export default {
  components: {
    DatePicker,
  },
  data: function () {
    return {
      time1: null,
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
