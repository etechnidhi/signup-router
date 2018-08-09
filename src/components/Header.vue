<template>
  <nav class="navbar is-dark" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <div class="navbar-item is-size-3">
        Polling App
      </div>
      <div class="navbar-menu">
        <div class="navbar-end">
          <div class="navbar-item">
            <div id="item">
              <a @click="signup" v-if="!isLoggedIn" class="button is-primary">Signup</a> &nbsp; &nbsp; &nbsp;
              <a @click="login" v-if="!isLoggedIn" class="button is white">Login</a>
              <a @click="logout" v-if="isLoggedIn" class="button is white">Logout</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Header",
  computed: {
    ...mapGetters({
      isLoggedIn: "isLoggedIn"
    })
  },
  methods: {
    ...mapActions({
      dologout: "logout"
    }),
    login: function() {
      this.$router.push("login");
    },
    logout: function() {
      this.dologout();
      this.$router.push("/");
    },
    signup: function() {
      this.$router.push("signup");
    }
  }
};
</script>

<style>
@media only screen and (max-width: 1087px){
  .navbar-menu{
    display: block !important;
    background-color: transparent !important;
  }
}
</style>
