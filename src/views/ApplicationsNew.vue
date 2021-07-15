<template>
  <div class="applications-new">
    <div id="wrapper" class="d-flex flex-fill">
      <!-- Main -->
      <main class="flex-fill p-4 bg-gray-300">
        <!-- new application form -->
        <div class="doc-container mb-6">
          <div class="bg-gray-200 rounded p-3">
            <div class="doc-container mb-6">
              <h2
                class="h3 mb-2 text-gray-800 doc-anchor anchor-js"
                id="forms-basic"
              >
                <span class="text-gray-600 fw-light">New</span> Application
              </h2>

              <form v-on:submit.prevent="createApplication()">
                <div class="form-group">
                  <label>Employer : </label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="newApplicationParams.employer"
                  />
                </div>
                <div class="form-group">
                  <label>Address (City, State Zip)</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="newApplicationParams.address"
                  />
                </div>
                <div class="form-group">
                  <label>Position : </label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="newApplicationParams.position"
                  />
                </div>
                <div class="form-group pt-2 my-2">
                  <label>Applied On : </label>
                  <!-- Date picker in form - pay attention to styling later-->
                  <date-picker
                    v-model="newApplicationParams.date"
                    class="form-control"
                    valueType="format"
                  ></date-picker>
                </div>
                <div class="form-group">
                  <label>Contact : </label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="newApplicationParams.contact"
                  />
                </div>
                <div class="form-group">
                  <label>Email : </label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="newApplicationParams.email"
                  />
                </div>
                <!-- followup switch -->
                <div class="form-check form-switch mb-2">
                  <label class="d-flex align-items-center mb-3 pt-4">
                    <input
                      class="d-none-cloaked"
                      type="checkbox"
                      v-model="newApplicationParams.followup"
                      true-value="true"
                      false-value="false"
                    />
                    <i class="switch-icon"></i>
                    <span class="px-3 user-select-none">Follow-up Sent</span>
                  </label>
                </div>

                <div class="form-group">
                  <label>Method : </label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="newApplicationParams.method"
                  />
                </div>
                <div class="form-group">
                  <label>Enthusiasm : </label>
                  <input
                    type="number"
                    class="form-control"
                    v-model="newApplicationParams.enthusiasm"
                  />
                </div>
                <div class="form-group">
                  <label>Confidence : </label>
                  <input
                    type="number"
                    class="form-control"
                    v-model="newApplicationParams.confidence"
                  />
                </div>
                <div class="form-group">
                  <label>Notes : </label>
                  <textarea
                    rows="4"
                    cols="30"
                    type="text"
                    class="form-control"
                    v-model="newApplicationParams.notes"
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
                    value="Submit"
                  />
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
