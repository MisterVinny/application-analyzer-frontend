<template>
  <div class="applications-new">
    <div id="wrapper" class="d-flex flex-fill">
      <!--

        Main

      -->
      <main class="flex-fill p-4 bg-white">
        <!-- edit application form -->
        <div class="doc-container mb-6">
          <div class="bg-gray-200 rounded p-3">
            <div class="doc-container mb-6">
              <h2
                class="h3 mb-2 text-gray-800 doc-anchor anchor-js"
                id="forms-basic"
              >
                <span class="text-gray-600 fw-light">Update</span> Application
              </h2>

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
                  <input
                    type="text"
                    class="form-control"
                    v-model="updateApplicationParams.address"
                  />
                </div>
                <div class="form-group">
                  <label>Position : </label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="updateApplicationParams.position"
                  />
                </div>
                <div class="form-group pt-2 my-2">
                  <label>Applied On : </label>
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
                <!-- followup switch -->
                <div class="form-check form-switch mb-2">
                  <label class="d-flex align-items-center mb-3 pt-4">
                    <input
                      class="d-none-cloaked"
                      type="checkbox"
                      v-model="updateApplicationParams.followup"
                      true-value="true"
                      false-value="false"
                    />
                    <i class="switch-icon"></i>
                    <span class="px-3 user-select-none">Follow-up Sent</span>
                  </label>
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
                    <option
                      v-for="choice in statusChoices"
                      v-bind:key="choice.id"
                    >
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

                <div class="d-inline-grid gap-auto-4 pt-4">
                  <router-link
                    class="btn-sm btn-secondary"
                    :to="`/applications/`"
                    >Cancel</router-link
                  >
                  <input
                    type="submit"
                    class="btn-sm btn-secondary"
                    value="Update"
                  />
                  <button
                    v-on:click="deleteApplication()"
                    class="btn-sm btn-secondary"
                  >
                    Delete Application
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
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
      statusChoices: [
        "pending",
        "in-contact",
        "accepted-offer",
        "refused-offer",
        "rejected",
      ],
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
      // this.updateApplicationParams.address =
      //   this.city + " , " + this.state + " , " + this.zip + ", United States";
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
