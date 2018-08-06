<template>
  <div id="addpoll">
    <section>
      <div class="field">
        <b-field label="Title">
          <input class="input" name="title" type="text" placeholder="Title input" v-model="title">
        </b-field>
      </div>
  
      <div class="field">
        <b-field label="Option 1">
          <input class="input" name="one" type="text" placeholder="Option1" v-model="option1">
        </b-field>
      </div>
      <div class="field">
        <b-field label="Option 2">
          <input class="input" name="two" type="text" placeholder="Option 2" v-model="option2">
        </b-field>
      </div>
      <div class="field">
        <b-field label="Option 3">
          <input class="input" name="three" type="text" placeholder="Option 3" v-model="option3">
        </b-field>
      </div>
      <div class="field">
        <b-field label="Option 4">
          <input class="input" name="four" type="text" placeholder="Option 4" v-model="option4">
        </b-field>
      </div>
      <div class="field">
        <button class="button is-primary" v-on:click="addpollSubmit" :class="{ 'button': true, 'is-full' : true, 'is-loading' : login_progress}">Register</button>
      </div>
    </section>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { mapFields } from "vuex-map-fields";

export default {
  name: "AddPollForm",
  watch: {
    isSuccess: function(val){
      if( val === true){
        this.$router.push("profile");
      }      
    },
    error_message: function(val) {
      if (val) {
        this.$snackbar.open({
          duration: 5000,
          message: "Add Poll is Fail " + val.message,
          type: "is-danger",
          position: "is-botton-left"
        });
      }
    }
  },
  computed: {
    ...mapFields(["option1", "option2", "option3", "option4", "title"]),
    ...mapGetters({
      getOptions: "getOptions",
      isSuccess: "isSuccess"
    }),
    login_progress: function() {
      return this.$store.state.login.login_progress;
    },
    error_message: function() {
      return this.$store.state.login.error;
    }
  },
  methods: {
    ...mapActions(["addpoll"]),
    addpollSubmit: function() {
      this.addpoll({
        token: this.$store.state.login.token,
        title: this.$store.state.addpoll.title,
        options: [
          { option: this.$store.state.addpoll.option1 },
          { option: this.$store.state.addpoll.option2 },
          { option: this.$store.state.addpoll.option3 },
          { option: this.$store.state.addpoll.option4 }
        ]
      });
    }
  }
};
</script>

<style>
</style>
