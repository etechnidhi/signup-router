<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <li class="nav-item active">
                    <a class="button is-link">Link</a>
                </li>
  </div>
</template>

<script>
  export default {
    name: "Hello",
    data(){
      return{
        msg: 'WELCOME TO ROUTER RELATED APP'
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h3 {
    margin: 40px 0 0;
  }
  
  ul {
    list-style-type: none;
    padding: 0;
  }
  
  li {
    display: inline-block;
    margin: 0 10px;
  }
  
  a {
    color: #42b983;
  }
</style>
