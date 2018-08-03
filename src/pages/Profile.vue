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
                    <div id="buttons">
    
                        <div class="field is-grouped">
                            <p class="control">
                                <a @click="list" v-if="isLoggedIn" class="button is-info is-focused is-dark">List</a>
                            </p>
                            <p class="control">
                                <a @click="add" v-if="isLoggedIn" class="button is-warning is-focused">Add Poll</a>
                            </p>
                        </div>
                    </div>
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
  methods:{
      list: function(){
          this.$router.push("list");
      },
            add: function(){
          this.$router.push("addpoll");
      }
  }
};
</script>

<style>
#buttons {
  /* margin: 0 auto; */
  margin-left: 450px;
  width: 60%;
}

.control {
  margin: 0 auto;
  margin-left: 25px;
}
</style>
