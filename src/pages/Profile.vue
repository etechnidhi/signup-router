<template>
    <div id="login">
        <Header/>
        <section class="hero is-fullheight is-primary">
            <div class="hero-body">
                <div class="container has-text-centered">
                    <h1 class="title">
                        Hello {{this.$store.state.login.user.email}}
                    </h1>
                    <h2>Welcome :)</h2>
                    <br/>
                    <aside class="menu">
  <p >
                            <a @click="list" v-if="isLoggedIn" class="button is-info is-focused is-dark"> User List</a>
                        </p>
                        <br/>
                        <p >
                            <a @click="add" v-if="isLoggedIn" class="button is-warning is-focused">Add Poll</a>
                        </p>
                        <br/>
                        <p >
                            <a @click="listpoll" v-if="isLoggedIn" class="button is-info is-focused">Poll List</a>
                        </p> 
</aside>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import Header from "./../components/Header";

export default {
  name: "Profile",
  components: {
    Header
  },
  computed: {
    ...mapGetters({
      user: "getUser",
      isLoggedIn: "isLoggedIn"
    })
  },
  methods: {
    list: function() {
      this.$router.push("list");
    },
    add: function() {
      this.$router.push("addpoll");
    },
    listpoll: function() {
      this.$router.push("pollList");
    }
  }
};
</script>

<style>
</style>
