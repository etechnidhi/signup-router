<template>
  <section class="section cards" style="position:relative;">
    <div class="modal" v-bind:class="{ 'is-active': isLoadingPage && isLoggedIn}">
      <div class="modal-background has-text-center"> </div>
      <Spinner name="cube-grid" v-bind:class="{ 'is-active': true }" color="	#ff3399" />
    </div>
    <div class="notification is-danger" v-if="!isLoggedIn">
      <button class="delete"></button> {{this.$store.state.pollList.invalid}} Please login first
    </div>
    <!-- start of list of Polls -->
    <div class="container" v-if="!isLoadingPage && isLoggedIn">
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
                        <label class="radio" v-if="item.id == Votedid ? isButtonActive: true">
                            <input  type="radio" name="radio" :id="optionitem.opt_id" v-on:click="enableButton(optionitem)">
                        </label>Vote {{optionitem.vote}}
                        <a href="#" id="deleteOption" class="button is-danger is-small" @click="deletePollOption(item,optionitem)" aria-label="more options">Delete Poll Option</a>
                      </div>
                    </div>
                  </li>
                  <br/>
                  <section class="hero body" v-if="item.id == Votedid ? !isButtonActive: false">
                    <h1 class="title has-text-danger">Voted SuccessFully</h1>
                  </section>
                  <section class="hero body" v-if=" item.id == buttonDisable? showVoted :false">
                    <h1 class="title has-text-danger">You have already voted on this Poll</h1>
                  </section>
                </ul><br/>
                <a class="button is-primary" :disabled="item.id == buttonShow? false: true || item.id == buttonDisable? true:false" @click="submitPollVote(item)">Submit</a>
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
          <button class="button is-success" @click="updateSave(title)">Save changes</button>
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
      buttonShow: "",
      radioSelected: false,
      buttonDisable: true,
      optionItemId: "",
      parentId: "",
      message: "",
      arrayToCheck: [],
      showVoted: false,
      Votedid:""
    };
  },
  computed: {
    ...mapFields(["option1"]),
    ...mapGetters({
      poll: "pollList/poll",
      progressbar: "pollList/progressbar",
      isLoadingPage: "pollList/isLoadingPage",
      pollOption: "pollList/pollOption",
      voteCount: "voteCount",
      isResponseError: "pollList/isResponseError",
      isButtonActive: "pollList/isButtonActive",
      getResponse: "getResponse",
      isLoggedIn: "isLoggedIn"
    })
  },
  methods: {
    ...mapActions('pollList',[
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
        // (this.id = item.id),
        this.deletePollOptionLink({
          token: this.$store.state.login.token,
          title: this.title,
          id: item.id,
          opt_id: this.optionid
        });
    },
    enableButton: function(optionitem) {
      this.arrayToCheck = this.$store.state.pollList.pollArray;
      for (let i = 0; i < this.$store.state.pollList.pollList.length; i++) {
        for (
          let j = 0;
          j < this.$store.state.pollList.pollList[i].options.length;
          j++
        ) {
          if (
            optionitem.opt_id ==
            this.$store.state.pollList.pollList[i].options[j].opt_id
          ) {
            this.parentId = this.$store.state.pollList.pollList[i].id;
            if (this.arrayToCheck.indexOf(this.parentId) != -1) {
              this.buttonDisable = this.$store.state.pollList.pollList[i].id;
              this.radioSelected = false;
              this.showVoted = true;
            } else {
              this.radioSelected = true;
              this.buttonShow = this.$store.state.pollList.pollList[i].id;
            }
          }
        }
      }
      this.optionItemId = optionitem.opt_id;
    },
    submitPollVote: function(item) {

      this.arrayToCheck = this.$store.state.pollList.pollArray;
      if (this.arrayToCheck.indexOf(item.id) != -1) {
        this.Votedid = item.id;
        this.disableButton({
          isButtonActive: false
        });
      } else {
        this.Votedid = item.id;
        this.submitVote({
          poll_id: this.Votedid,
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
