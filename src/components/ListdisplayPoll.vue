<template>
  <section class="section cards" style="position:relative;">
    <div class="notification is-primary" v-if="isLoadingPage">
  <button class="delete"></button>
  Please Wait for a moment! :)
</div>
    <div class="container" v-if="!isLoadingPage">
      <div class="columns is-multiline">
        <div class="column  toaster is-quarter">
          <div class="card" v-for="(item,index) in poll" :key="index">
            <header class="card-header" v-if="item">
              <p class="card-header-title">
                {{item.title}}              </p>
              <a href="#" class="card-header-icon" aria-label="more options">
                <span class="icon">
                <i class="fas fa-angle-down" aria-hidden="false"></i>
              </span>
              </a>
            </header>
            <div class="card-content">
              <div class="content">
                <ul class="list-unstyled">
                  <li v-for="(item,index) in item.options" :key="index">
                    <span>{{item.options}}&nbsp; 
                    </span>
                  </li>
                </ul>
                <br>
              </div>
            </div>
            <footer class="card-footer">
              <a href="#" class="card-footer-item" @click="update(item)">Edit Title</a>
              <a href="#" class="card-footer-item" @click="deletePoll(item)">Delete</a>
              <a href="#" class="card-footer-item" @click="addoption(item)">Add Option</a>
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
              <input class="input" type="text" placeholder="Title input" v-model="title">
            </b-field>
          </div>
        </section>
        <footer class="modal-card-foot">
          <button class="button is-success" @click="updateSave">Save changes</button>
          <button class="button" @click="close">Cancel</button>
        </footer>
      </div>
    </div>
    <div class="modal" v-bind:class="{ 'is-active': isModalOptionActive }">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Add Poll Options</p>
          <button class="delete" aria-label="close" @click="closeOption"></button>
        </header>
        <section class="modal-card-body">
          <div class="field">
            Title:- {{title}}
          </div>
          <ul v-for="(item,index) in options" :key="index">
            <li>{{index+1}}:- {{ item.options}}</li>
          </ul>
          <br/>
              <b-field label="Option">
                <input class="input" type="text" placeholder="Option" v-model="option1">
              </b-field>
        </section>
        <footer class="modal-card-foot">
          <button class="button is-success" @click="updateSaveOption(pollOption,title )">Save changes</button>
          <button class="button" @click="closeOption">Cancel</button>
        </footer>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { mapFields } from "vuex-map-fields";

export default {
  name: "ListdisplayPoll",
  data: function() {
    return {
      isModalActive: false,
      title: "",
      id: "",
      isModalOptionActive: false,
      options: [],
      item: []
    };
  },
  computed: {
    ...mapFields(["option1"]),
    ...mapGetters({
      poll: "poll",
      progressbar: "progressbar",
      isLoadingPage: "isLoadingPage",
      pollOption: "pollOption"
    })
  },
  methods: {
    ...mapActions([
      "showPollList",
      "delete",
      "updateTitle",
      "optionRowAdd",
      "submitAddOption"
    ]),
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
    updateSave: function() {
      this.updateTitle({
        token: this.$store.state.login.token,
        title: this.title,
        pollid: this.id
      });
      this.isModalActive = false;
      this.$router.push("pollList");
    },
    addoption: function(item) {
      this.item = item;
      this.id = item.id;
      this.title = item.title;
      this.isModalOptionActive = true;
      this.options = item.options;
    },
    closeOption: function() {
      this.isModalOptionActive = false;
    },
    addRow: function() {
      this.optionRowAdd({
        option: this.$store.state.pollList.itemOption
      });
    },
    removeElement: function(index) {
      this.$store.state.pollList.rows.splice(index, 1);
    },
    updateSaveOption: function(itemOption, title) {
      this.title = title;
      this.submitAddOption({
        token: this.$store.state.login.token,
        title: this.title,
        option: this.$store.state.pollList.option1,
        item: this.item
      });
      this.isModalOptionActive = false;
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
