<template>
  <div class="applications-new">
    <div>
      <h1>Update Application</h1>
    </div>
    <form v-on:submit.prevent="updateApplication()">
      <div class="form-group">
        <label>Employer : </label>
        <input
          type="text"
          class="form-control"
          v-model="updateApplicationParams.employer"
        />
      </div>
      <div class="form-group">
        <label>Address</label>
        <div>
          <label>City : </label>
          <input type="text" class="form-control" v-model="city" />
          <label>State : </label>
          <input type="text" class="form-control" v-model="state" />
          <label>Zip : </label>
          <input type="text" class="form-control" v-model="zip" />
        </div>
      </div>
      <div class="form-group">
        <label>Position : </label>
        <input
          type="text"
          class="form-control"
          v-model="updateApplicationParams.position"
        />
      </div>
      <div class="form-group">
        <label>Date : </label>
        <!-- Date picker in form - pay attention to styling later-->
        <date-picker
          v-model="updateApplicationParams.date"
          class="form-control"
          valueType="format"
        ></date-picker>
      </div>
      <div class="form-group">
        <label>Contact : </label>
        <input
          type="text"
          class="form-control"
          v-model="updateApplicationParams.contact"
        />
      </div>
      <div class="form-group">
        <label>Email : </label>
        <input
          type="text"
          class="form-control"
          v-model="updateApplicationParams.email"
        />
      </div>
      <div class="form-group">
        <label>Followup Sent? : </label>
        <input
          type="radio"
          v-model="updateApplicationParams.followup"
          v-bind:value="true"
        />
        <label for=""></label>True
        <input
          type="radio"
          v-model="updateApplicationParams.followup"
          v-bind:value="false"
        />
        <label for="">False</label>
      </div>
      <div class="form-group">
        <label>Interviews : </label>
        <input
          type="text"
          class="form-control"
          v-model="updateApplicationParams.interviews"
        />
      </div>
      <div class="form-group">
        <label>Status : </label>
        <select
          type="text"
          class="form-control"
          v-model="updateApplicationParams.status"
        >
          <option v-for="choice in statusChoices" v-bind:key="choice.id">
            {{ choice }}
          </option>
        </select>
      </div>
      <div class="form-group">
        <label>Method : </label>
        <input
          type="text"
          class="form-control"
          v-model="updateApplicationParams.method"
        />
      </div>
      <div class="form-group">
        <label>Enthusiasm : </label>
        <input
          type="number"
          class="form-control"
          v-model="updateApplicationParams.enthusiasm"
        />
      </div>
      <div class="form-group">
        <label>Confidence : </label>
        <input
          type="number"
          class="form-control"
          v-model="updateApplicationParams.confidence"
        />
      </div>
      <div class="form-group">
        <label>Notes : </label>
        <textarea
          rows="4"
          cols="30"
          type="text"
          class="form-control"
          v-model="updateApplicationParams.notes"
        />
      </div>
      <input type="submit" class="btn btn-primary" value="Submit" />
    </form>

    <ul class="no-bullets">
      <li class="text-danger" v-for="error in errors" v-bind:key="error.id">
        {{ error }}
      </li>
    </ul>
    <p>{{ updateApplicationParams }}</p>
    <button v-on:click="deleteApplication()">Delete Application</button>
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
      errors: [],
      updateApplicationParams: {},
      statusChoices: ["pending", "accepted-offer", "refused-offer", "rejected"],
      city: "",
      state: "",
      zip: "",
    };
  },

  created: function () {
    axios.get(`/applications/${this.$route.params.id}`).then((response) => {
      console.log("Edit Application Object: ", response.data);
      this.updateApplicationParams = response.data;
    });
  },

  methods: {
    updateApplication: function () {
      this.updateApplicationParams.address =
        this.city + " , " + this.state + " , " + this.zip + ", United States";
      axios
        .patch(
          `/applications/${this.$route.params.id}`,
          this.updateApplicationParams
        )
        .then((response) => {
          console.log("Updated Application Object: ", response.data);
          this.$router.push("/applications");
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
          console.log(error.response.data.message);
          this.status = error.response.status;
        });
    },
    deleteApplication: function () {
      if (confirm("Do you really want to delete this application?")) {
        axios
          .delete(`/applications/${this.$route.params.id}`)
          .then((response) => {
            console.log(response.data);
            this.$router.push("/applications");
          });
      }
    },
  },
};
</script>
