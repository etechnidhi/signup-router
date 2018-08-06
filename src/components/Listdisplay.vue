<template>
    <table class="table is-striped is-hoverable is-fullwidth" :items="getList">
        <thead>
            <tr>
                <th>Id</th>
                <th>UserName</th>
                <th>Email</th>
                <th>Role</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(item,index) in getList" :key="index ">
                <th>{{item.id}}</th>
                <td>{{item.name}}</td>
                <td>{{item.email}}</td>
                <td>{{item.role}}</td>
            </tr>
        </tbody>
    </table>
</template>

<script>
// import Axios from "axios";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Listdisplay",
  computed: {
    ...mapGetters({
      getList: "getList"
    })
  },
  methods: {
    ...mapActions(["showlist"]),
    showlist1: function() {
      this.showlist({
        token: this.$store.state.login.token
      });
    }
  },
  beforeMount() {
      this.showlist1();
    }
};
</script>

<style>
</style>
