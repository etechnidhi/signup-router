<template>
  <div id="submitForm">
    <section>
      <div class="field">
        <b-field label="name" :type="errors.has('name') ? 'is-danger': ''" :message="errors.has('name') ? errors.first('name') : ''">
          <input class="input" name="name" type="text" placeholder="Email input" v-validate="'required|alpha|min:3'" v-model="name">
        </b-field>
      </div>
      <div class="field">
        <b-field label="Email" :type="errors.has('email') ? 'is-danger': ''" :message="errors.has('email') ? errors.first('email') : ''">
          <input class="input" name="email" type="text" placeholder="Email" v-validate="'required|email'" v-model="email">
        </b-field>
      </div>
      <div class="field">
        <b-field label="Password" :type="errors.has('password') ? 'is-danger': ''" :message="errors.has('password') ? errors.first('password') : ''">
          <input class="input" name="password" type="password" v-validate="'required|min:6|max:16'" placeholder="Password" v-model="password">
        </b-field>
      </div>
      <div class="field">
        <b-field label="Confirm Password" :type="errors.has('conf-password') ? 'is-danger': ''" :message="errors.has('conf-password') ? errors.first('conf-password') : ''">
          <input class="input" name="conf-password" type="password" v-validate="'required|min:6|max:16'" placeholder="Confirm Password">
        </b-field>
      </div>
      <div class="field">
        <b-field label="Role" :type="errors.has('role') ? 'is-danger': ''" :message="errors.has('role') ? errors.first('role') : ''">
          <input class="input" name="role" type="text" v-validate="'required|alpha'" placeholder="Enter Role" v-model="role">
        </b-field>
      </div>
      <div class="field">
        <button class="button is-primary" :disabled="errors.any()" v-on:click="submit" :class="{ 'button': true, 'is-full' : true, 'is-loading' : login_progress}">Register</button>
      </div>
  
    </section>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
// eslint-disable-next-line
let count = 0;
export default {
  name: "SignupForm",
  watch: {
    user: function(val) {      
      if (val) {
        this.$router.push("login");
      }
    },
    error_message: function(val) {
      if (val) {
        this.$snackbar.open({
          duration: 5000,
          message: "Signup Failed " + val.message,
          type: "is-danger",
          position: "is-top-left"
        });
      }
    }
  },
  computed: {
    ...mapGetters({
      user: "getUser"
    }),
    login_progress: function() {
      return this.$store.state.login.login_progress;
    },
    error_message: function() {
      return this.$store.state.login.error;
    },
    id: {
      get: function() {
        return this.$store.state.login.id;
      },
      set: function(val) {
        this.$store.commit("updateId", val);
      }
    },
    name: {
      get: function() {
        return this.$store.state.login.name;
      },
      set: function(val) {
        this.$store.commit("updatename", val);
      }
    },
    email: {
      get: function() {
        return this.$store.state.login.email;
      },
      set: function(val) {
        this.$store.commit("updateEmail", val);
      }
    },
    password: {
      get: function() {
        return this.$store.state.login.password;
      },
      set: function(val) {
        this.$store.commit("updatePassword", val);
      }
    },
    role:{
      get:function() {
        return this.$store.state.login.role;
      },
      set: function(val){
        this.$store.commit("updateRole",val);
      }
    }
  },
  methods: {
    ...mapActions(["addusers"]),
    submit: function() {
      this.id = count++;
      this.addusers({
        id: count,
        name: this.$store.state.login.name,
        email: this.$store.state.login.email,
        password: this.$store.state.login.password,
        role:this.$store.state.login.role
      });
    }
  }
};
</script>

<style>
</style>
