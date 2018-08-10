<template>
  <div id="submitForm">
    <section>
      <div class="field">
        <b-field label="Name" :type="errors.has('name') ? 'is-danger': ''" :message="errors.has('name') ? errors.first('name') : ''">
          <input class="input" name="name" type="text" placeholder="Name input" v-validate="'required|min:3'" v-model="name">
        </b-field>
      </div>
      <div class="field">
        <b-field label="Email" :type="errors.has('email') ? 'is-danger': ''" :message="errors.has('email') ? errors.first('email') : ''">
          <input class="input" name="email" type="text" placeholder="Email" v-validate="'required'" v-model="email">
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
      <div class="col-md-8">
        <b-field label="Role">
          <select v-model="role" class="form-control">
                <option value="Admin">Admin</option>
                <option value="Guest">Guest</option>
              </select>
        </b-field>
      </div>
      <br/>
      <div class="field">
        <button class="button is-primary" :disabled="errors.any()" v-on:click="submit" :class="{ 'button': true, 'is-full' : true, 'is-loading' : login_progress}">Register</button>
      </div>
      <!-- Alert Modal  -->
      <div class="modal" v-bind:class="{ 'is-active': responseError }">
        <div class="modal-background"></div>
        <div class="modal-card ">
          <header class="modal-card-head">
            <p class="modal-card-title">Alert!</p>
            <button class="delete" aria-label="close" @click="closeOption"></button>
          </header>
          <section class="modal-card-body has-background-danger has-text-white-bis">
            {{this.$store.state.login.responseError}}
          </section>
          <footer class="modal-card-foot">
            <button class="button" @click="closeOption">OK</button>
          </footer>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { mapFields } from "vuex-map-fields";

let count = 0;
export default {
  name: "SignupForm",
  data: function() {
    return {
      isMenuActive: false
    };
  },
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
    ...mapFields(["id", "name", "email", "password", "role"]),
    ...mapGetters({
      user: "getUser",
      responseError: "responseError"
    }),
    login_progress: function() {
      return this.$store.state.login.login_progress;
    },
    error_message: function() {
      return this.$store.state.login.error;
    }
  },
  methods: {
    ...mapActions(["addusers", "errorFalse"]),
    submit: function() {
      this.id = count++;
      this.addusers({
        id: count,
        name: this.$store.state.login.name,
        email: this.$store.state.login.email,
        password: this.$store.state.login.password,
        role: this.$store.state.login.role
      });
    },
    openMenu: function() {
      this.isMenuActive = true;
    },
    closeError: function() {
      this.$store.state.login.error = false;
    },
    closeOption: function() {
      this.errorFalse({
        error: false
      });
    }
  }
};
</script>

<style>
</style>
