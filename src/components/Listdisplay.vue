<template>
  <section>
    <div class="modal" v-bind:class="{ 'is-active': successPage && isLoggedIn}">
      <div class="modal-background has-text-center"> </div>
      <Spinner name="cube-grid" v-bind:class="{ 'is-active': true }" color="	#ff3399" />
    </div>
    <div class="notification is-danger" v-if="!isLoggedIn">
      <button class="delete"></button> {{this.$store.state.pollList.invalid}} Please login first
    </div>
    <table class="table is-striped is-hoverable is-fullwidth" :items="getList" v-if="!successPage">
      <thead>
        <tr>
          <th>UserName</th>
          <th>Email</th>
          <th>Role</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item,index) in getList" :key="index ">
          <td>{{item.name}}</td>
          <td>{{item.email}}</td>
          <td>{{item.role}}</td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script>
// import Axios from "axios";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Listdisplay",
  computed: {
    ...mapGetters({
      getList: "getList",
      successPage: "successPage",
      isLoggedIn: "isLoggedIn"
    })
  },
  methods: {
    ...mapActions(["showlist"]),
    showlistDisplay: function() {
      this.showlist({
        token: this.$store.state.login.token
      });
    }
  },
  beforeMount() {
    if (this.$store.state.login.token) {
      this.showlistDisplay();
    } else {
      this.$router.push("login");
    }
  }
};
</script>

<style>
</style>
