<template>
  <section>
    <div class="notification is-primary" v-if="successPage">
      <button class="delete"></button> Please Wait for a moment! :)
    </div>
    <table class="table is-striped is-hoverable is-fullwidth" :items="getList" v-if="!successPage">
      <thead>
        <tr>
          <!-- <th>Id</th> -->
          <th>UserName</th>
          <th>Email</th>
          <th>Role</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item,index) in getList" :key="index ">
          <!-- <th>{{index+1}}</th> -->
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
      successPage: "successPage"
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
    this.showlistDisplay();
  }
};
</script>

<style>
</style>
