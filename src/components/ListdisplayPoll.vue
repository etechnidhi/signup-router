<template>
  <section class="section cards">
    <div class="container">
      <div class="columns is-multiline">
        <div class="column  toaster is-quarter">
          <div class="card" v-for="(item,index) in poll" :key="index">
            <header class="card-header" v-if="item">
              <p class="card-header-title">
                {{item.title}}, {{item.id}}
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
              <a href="#" class="card-footer-item" @click="update(item)">Edit</a>
              <a href="#" class="card-footer-item" @click="deletePoll(item)" >Delete</a>
              <a href="#" class="card-footer-item">Add Option</a>
            </footer>
          </div>
        </div>
      </div>
    </div>
    <div class="modal" v-bind:class="{ 'is-active': isModalActive }">
  <div class="modal-background"></div>
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">Edit Poll title</p>
      <button class="delete" aria-label="close" @click="close"></button>
    </header>
    <section class="modal-card-body">
      <div class="field">
        <b-field label="Title">
          <input class="input"  type="text" placeholder="Title input" v-model="title">
        </b-field>
      </div>
    </section>
    <footer class="modal-card-foot">
      <button class="button is-success" @click="updateSave">Save changes</button>
      <button class="button" @click="close">Cancel</button>
    </footer>
  </div>
</div>
  </section>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "ListdisplayPoll",
  data: function() {
    return {
      isModalActive: false,
      title: "",
      id:""
    };
  },
  computed: {
    ...mapGetters({
      poll: "poll",
      progressbar: "progressbar"
    })
  },
  methods: {
    ...mapActions(["showPollList", "delete","updateTitle"]),
    displayList: function() {
      this.showPollList({
        token: this.$store.state.login.token
      });
    },
    deletePoll: function(item) {
      var Id = item.id;
      this.delete({
        token: this.$store.state.login.token,
        pollid: Id
      });
    },
    update: function(item) {
      this.title = item.title;
      this.id = item.id;
      this.isModalActive = true;
    },
    close: function() {
      this.isModalActive = false;
    },
    updateSave: function(){
      this.updateTitle ({
        token: this.$store.state.login.token,
        title: this.title,
        pollid: this.id
      });
      this.isModalActive = false;
      this.$router.push("pollList");
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
