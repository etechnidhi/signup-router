<template>
  <div id="addpoll">
    <section>
      <div class="field">
        <b-field label="Title">
          
        </b-field>
      </div>
      <table class="table">
        <div>
          <button class="button is-danger" @click="addRow">Add row</button>
        </div>
        <tbody>
          <tr v-for="(item,index) in getRows" :key="index">
            <td>
              <b-field label="Option">
                <input class="input" type="text" placeholder="Option" v-model="item.option">
              </b-field>
            </td>
            <td>
              <a v-on:click="removeElement(index);" style="cursor: pointer">Remove</a>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="field">
        <button class="button is-primary" v-on:click="addPollSubmit" :class="{ 'button': true, 'is-full' : true, 'is-loading' : login_progress}">Register</button>
      </div>
    </section>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { mapFields } from "vuex-map-fields";

export default {
  name: "addPollOption",
  watch: {
    isSuccess: function(val) {
      if (val === true) {
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
    ...mapFields(["title"]),
    ...mapGetters({
      getOptions: "getOptions",
      isSuccess: "isSuccess",
      getRows: "getRows"
    }),
    login_progress: function() {
      return this.$store.state.login.login_progress;
    },
    error_message: function() {
      return this.$store.state.login.error;
    }
  },
  methods: {
    ...mapActions(["addpoll", "rowAdd"]),
    addPollSubmit: function() {
      this.addpoll({
        token: this.$store.state.login.token,
        title: this.$store.state.addpoll.title,
        options: this.$store.state.addpoll.rows
      });
    },
    addRow: function() {
      this.rowAdd({
        option: this.$store.state.addpoll.item
      });
    },
    removeElement: function(index) {
      this.$store.state.addpoll.rows.splice(index, 1);
    }
  }
};
</script>

<style>
</style>
