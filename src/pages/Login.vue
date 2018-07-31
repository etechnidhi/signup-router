<template>
    <div id="login">
        <Header/>
        <div class="box">
            <section class="hero is-primary is-medium">
                <div class="heading1 has-text-dark has-text-centered">
                    <h1>Login</h1>
                </div>
            </section>
            <section>
                <div class="columns">
                    <div class="column"></div>
                    <div class="column">
                        <Form/>
                    </div>
                    <div class="column"></div>
                </div>
            </section>
        </div>
    </div>
</template>

<script>
import Header from "./../components/Header";
import Form from "./../components/Form";
export default {
  name: "Login",
  components: {
    Header,
    Form
  }
};
</script>

<style>
.box {
  margin: 0 auto;
  width: 70% !important;
  margin-top: 50px !important;
  border: 2px solid grey;
}

.heading1 {
  padding-top: 15px;
  padding-bottom: 15px;
  font-size: 25px;
}

.columns {
  margin-top: 15px !important;
  margin-bottom: 15px !important;
}
</style>
