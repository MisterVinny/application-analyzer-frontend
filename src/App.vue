<template>
  <div id="app">
    <div id="nav">
      <span v-if="isLoggedIn()">
        <router-link to="/profile">Profile</router-link> ||
        <router-link to="/applications">Applications</router-link> ||
        <router-link to="/analysis">Analysis</router-link> ||
        <router-link to="/logout">Logout</router-link>
      </span>
    </div>
    <router-view />
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

li.text-danger {
  color: red;
}

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
