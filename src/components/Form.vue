<template>
  <div id="submitForm">
    <section>
      <div class="field">
        <b-field label="Email" :type="errors.has('email') ? 'is-danger': ''" :message="errors.has('email') ? errors.first('email') : ''">
          <input class="input" name="email" type="text" placeholder="Email input" v-validate="'required|email'" v-model="email">
        </b-field>
      </div>
      <div class="field">
        <b-field label="Password" :type="errors.has('password') ? 'is-danger': ''" :message="errors.has('password') ? errors.first('password') : ''">
          <input class="input" name="password" type="password" v-validate="'required|min:6|max:16'" placeholder="Password" v-model="password" password-reveal>
        </b-field>
      </div>
      <div class="field">
        <button class="button is-success" :disabled="errors.any()" v-on:click="loginClick" :class="{ 'button': true, 'is-full' : true, 'is-loading' : login_progress}">Login</button>
      </div>
    </section>
  </div>
  
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { mapFields } from "vuex-map-fields";

export default {
  name: "Form",
  watch: {
    user: function(val) {
      if (val.email) {
        this.$router.push("profile");
      }
    },
    error_message: function(val) {
      if (val) {
        this.$snackbar.open({
          duration: 5000,
          message: "Login Failed " + val.message,
          type: "is-danger",
          position: "is-botton-left"
        });
      }
    }
  },
  computed: {
     ...mapFields([ "email", "password"]),
    ...mapGetters({
      user: "getUser",
      isLoggedIn: "isLoggedIn"
    }),
    login_progress: function() {
      return this.$store.state.login.login_progress;
    },
    error_message: function() {
      return this.$store.state.login.error;
    },
  },
  methods: {
    ...mapActions(["login"]),
    loginClick: function() {
      this.login({
        email: this.email,
        password: this.password
      });
    }
  }
};
</script>

<style>
</style>
