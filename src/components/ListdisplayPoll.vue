<template>
  <section class="section cards">
    <div class="container">
      <div class="columns is-multiline">
        <div class="column  toaster is-quarter">
          <div class="card" v-for="(item,index) in poll" :key="index">
            <header class="card-header" v-if="item">
              <p class="card-header-title">
                {{item.title}}
              </p>
              <a href="#" class="card-header-icon" aria-label="more options">
                <span class="icon">
          <i class="fas fa-angle-down" aria-hidden="true"></i>
        </span>
              </a>
            </header>
            <div class="card-content">
              <div class="content">
                <ul class="list-unstyled">
                  <li v-for="(item,index) in item.options" :key="index">
                    <span class=" float-right ">{{item.options}}&nbsp;</span>
                  </li>
                </ul>
                <br>
              </div>
            </div>
            <footer class="card-footer">
              <a href="#" class="card-footer-item">Edit</a>
              <a href="#" class="card-footer-item">Delte</a>
              <a href="#" class="card-footer-item">Add Option</a>
            </footer>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "ListdisplayPoll",
  computed: {
    ...mapGetters({
      poll: "poll"
    })
  },
  methods: {
    ...mapActions(["showPollList"]),
    displayList: function() {
      this.showPollList({
        token: this.$store.state.login.token
      });
    }
  },
  beforeMount() {
    this.displayList();
  }
};
</script>

<style>
a {
  margin-left: 25px;
}
</style>
