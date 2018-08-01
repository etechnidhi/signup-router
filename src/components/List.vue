<template>
    <div>
          <Form />

          <br/>
          <table>
            <tr>
              <th>Task</th>
              <th>Action</th>
            </tr>
            <tr v-for="(item,index) in todos" :key="index">
<td >{{item.text}}</td>  
<td >
  <b-tag  @click="completeTodo(item)" :type="item.isCompleted ? 'is-dark' : 'is-info'" closable class="a"></b-tag>
  </td>
            </tr>
          </table>        
    </div> 
</template>


<script>
import Form from "./Form";
import { mapGetters } from "vuex";
export default {
  name: "List",
  components: {
    Form
  },
  updated: function() {
    // eslint-disable-next-line
    console.log(this.$store.state.todo);
  },
  computed: {
    ...mapGetters({
      todos: "allTodos"
    })
  },
  methods: {
    completeTodo: function(item) {
      // eslint-disable-next-line
    console.log(item);
      this.$store.commit("completeTodo", item.id);
    }
  }
};
</script>
<style>
a{
  color: black;
}
</style>
