<template>
    <div id="addpoll">
        <Header/>
        <aside>
            <ul class="menu-list is-primary">
                <li>
                    <a href="#" v-on:click="back">
                        Get Back To Your Profile
                    </a>
                </li>
            </ul>
        </aside>
        <div class="box">
            <section class="hero is-primary is-medium">
                <div class="heading1 has-text-dark has-text-centered">
                    <h1>Add Your Poll Option</h1>
                </div>
            </section>
            <section>
                <div class="columns">
                    <div class="column">
                        <addPollOption/>
                    </div>
                </div>
            </section>
        </div>
        <br/>
        <br/>
    </div>
</template>

<script>
import Header from "./../components/Header";
import addPollOption from "./../components/addPollOption";
export default {
  name: "AddPollOption",
  components: {
    Header,
    addPollOption
  },
  methods: {
    back: function() {
      this.$router.push("profile");
    }
  }
};
</script>

<style>
</style>
