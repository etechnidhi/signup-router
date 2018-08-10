<template>
    <div id="list">
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
        <section>
            <ListdisplayPoll/>
        </section>
    </div>
</template>

<script>
import Header from "./../components/Header";
import ListdisplayPoll from "./../components/ListdisplayPoll";

export default {
  name: "ListPoll",
  components: {
    Header,
    ListdisplayPoll
  },
  methods: {
    back: function() {
      this.$router.push("profile");
    }
  }
};
</script>

<style>
.columns {
  margin: 0 auto !important;
}

.menu-list a {
  color: red !important;
}
</style>
