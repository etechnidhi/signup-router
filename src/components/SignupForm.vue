<template>
    <div id="submitForm">
        <section>
            <div class="field">
                <b-field label="Username" :type="errors.has('username') ? 'is-danger': ''" :message="errors.has('username') ? errors.first('username') : ''">
                    <input class="input" name="username" type="text" placeholder="Email input" v-validate="'required|alpha|min:3'" v-model="username">
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
                <button class="button is-primary" :disabled="errors.any()" v-on:click="submit">Register</button>
            </div>
    
        </section>
    </div>
</template>

<script>
let count = 0;
export default {
  name: "SignupForm",
  computed: {
    id: {
      get: function() {
        return this.$store.state.login.id;
      },
      set: function(val) {
        this.$store.commit("updateId", val);
      }
    },
    username: {
      get: function() {
        return this.$store.state.login.username;
      },
      set: function(val) {
        this.$store.commit("updateUsername", val);
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
    }
  },
  methods: {
    submit: function() {
      this.id = count++;
      this.$store.commit("adduser", {
        id: count,
        username: this.$store.state.login.username,
        email: this.$store.state.login.email,
        password: this.$store.state.login.password
      });
      this.$store.commit("blankform", "");
      this.$router.push("/");
    }
  }
};
</script>

<style>
</style>
