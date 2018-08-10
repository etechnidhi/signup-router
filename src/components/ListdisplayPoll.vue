<template>
  <section class="section cards" style="position:relative;">
    <div class="notification is-primary" v-if="isLoadingPage">
      <button class="delete"></button> Please Wait for a moment! :)
    </div>
    <!-- start of list of Polls -->
    <div class="container" v-if="!isLoadingPage">
      <div class="columns is-multiline">
  
        <div class="column  toaster">
          <div class="card" v-for="(item,index) in poll" :key="index">
            <header class="card-header" v-if="item">
              <p class="card-header-title">
                {{item.title}} </p>
            </header>
            <div class="card-content ">
              <div class="content">
                <ul class="list-unstyled">
                  <li v-for="(optionitem,index) in item.options" :key="index">
                    <div class="list-find">
                      <div class="span">
                        <span>{{optionitem.options}}&nbsp; </span>
                      </div>
                      <div class="control">
                        <label class="radio" v-if="item.id == id ? isButtonActive: true">
                            <input type="radio" v-on:click="enableButton(optionitem)">
                        </label>Vote {{optionitem.vote}}
                        <a href="#" id="deleteOption" class="button is-danger is-small" @click="deletePollOption(item,optionitem)" aria-label="more options">Delete Poll Option</a>
                      </div>
                    </div>
                  </li>
                  <br/>
                  <section class="hero body" v-if="item.id == id ? !isButtonActive: false">
                    <h1 class="title has-text-danger">Voted SuccessFully</h1>
                  </section>
                </ul><br/>
                <a class="button is-primary" :disabled="buttonShow == false" @click="submitPollVote(item)">Submit</a>
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
    <!-- end of list of Polls -->
  
    <!-- start of edit poll title modal -->
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
    <!-- end of Edit title modal -->
  
    <!-- start of Add Poll Option Modal -->
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
          <table class="table">
            <div>
              <button class="button is-danger" @click="addRow">Add row</button>
            </div>
            <tbody>
              <tr v-for="(itemOption,index) in pollOption" :key="index">
                <td>
                  <b-field label="Option">
                    <input class="input" type="text" placeholder="Option" v-model="itemOption.option">
                  </b-field>
                </td>
                <td>
                  <a v-on:click="removeElement(index);" style="cursor: pointer">Remove</a>
                </td>
              </tr>
            </tbody>
          </table>
        </section>
        <footer class="modal-card-foot">
          <button class="button is-success" @click="updateSaveOption(pollOption,title )">Save changes</button>
          <button class="button" @click="closeOption">Cancel</button>
        </footer>
      </div>
    </div>
    <!-- End of Add Poll Option Modal -->
  
    <!-- Alert Modal  -->
    <div class="modal" v-bind:class="{ 'is-active': isResponseError }">
      <div class="modal-background"></div>
      <div class="modal-card ">
        <header class="modal-card-head">
          <p class="modal-card-title">Alert!</p>
          <button class="delete" aria-label="close" @click="closeOption"></button>
        </header>
        <section class="modal-card-body has-background-primary">
          {{this.$store.state.pollList.response}}
        </section>
        <footer class="modal-card-foot">
          <button class="button" @click="closeOption">OK</button>
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
      item: [],
      optionid: "",
      buttonShow: false,
      optionItemId: "",
      message: "",
      arrayToCheck: []
    };
  },
  computed: {
    ...mapFields(["option1"]),
    ...mapGetters({
      poll: "poll",
      progressbar: "progressbar",
      isLoadingPage: "isLoadingPage",
      pollOption: "pollOption",
      voteCount: "voteCount",
      isResponseError: "isResponseError",
      isButtonActive: "isButtonActive",
      getResponse: "getResponse"
    })
  },
  methods: {
    ...mapActions([
      "showPollList",
      "delete",
      "updateTitle",
      "optionRowAdd",
      "submitAddOption",
      "deletePollOptionLink",
      "submitVote",
      "responseDataPoll",
      "disableButton"
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
      this.$store.state.pollList.responseError = false;
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
        options: this.$store.state.pollList.rows,
        item: this.item
      });
      this.isModalOptionActive = false;
    },
    deletePollOption: function(item, deletePollOption) {
      (this.optionid = deletePollOption.opt_id),
        (this.id = item.id),
        this.deletePollOptionLink({
          token: this.$store.state.login.token,
          title: this.title,
          id: this.id,
          opt_id: this.optionid
        });
    },
    enableButton: function(optionitem) {
      this.optionItemId = optionitem.opt_id;
      this.buttonShow = true;
    },
    submitPollVote: function(item) {
      this.arrayToCheck = this.$store.state.pollList.pollArray;
      if (this.arrayToCheck.indexOf(item.id) != -1) {
        this.buttonShow = false;
        this.disableButton({
          isButtonActive: false
        });
      } else {
        this.id = item.id;
        this.submitVote({
          poll_id: this.id,
          opt_id: this.optionItemId,
          token: this.$store.state.login.token
        });
      }
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

li {
  padding: 12px;
}

.button.is-small {
  float: right !important;
}

.list-find {
  display: flex !important;
}

.container {
  width: 90% !important;
}

.card {
  display: flex !important;
  flex-direction: column !important;
}

.span {
  width: 60%;
}
</style>
