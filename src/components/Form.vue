<template>
    <div id="submitForm">
        <section>
            <div class="field">
                <b-field label="Username" :type="errors.has('username') ? 'is-danger': ''" :message="errors.has('username') ? errors.first('username') : ''">
                    <input class="input" name="username" type="text" placeholder="Email input" v-validate="'required|alpha|min:3'" v-model="username" value="hello@">
                </b-field>
            </div>
            <div class="field">
                <b-field label="Password" :type="errors.has('password') ? 'is-danger': ''" :message="errors.has('password') ? errors.first('password') : ''">
                    <input class="input" name="password" type="password" v-validate="'required|min:6|max:16'" placeholder="Password" v-model="password">
                </b-field>
            </div>
            <div class="field">
                <button class="button is-success" :disabled="errors.any()" v-on:click="loginClick">Login</button>
            </div>
    
        </section>
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Form",
  watch: {
    user: function(val) {
      if (val.username) {
        this.$router.push("profile");
      }
    }
  },
  computed: {
    ...mapGetters({
      user: "getUser"
    }),
    username: {
      get: function() {
        return this.$store.state.login.username;
      },
      set: function(val) {
        this.$store.commit("updateUsername", val);
      }
    },
    password: {
      get: function() {
        return this.$store.state.login.password;
      },
      set: function(val) {
        this.$store.commit("updatePassword", val);
      }
    }
  },
  methods: {
    ...mapActions(["login"]),
    loginClick: function() {
      this.login({
        username: this.username,
        password: this.password
      });
    }
  }
};
</script>

<style>
</style>
