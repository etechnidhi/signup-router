<template>
    <div id="home">
        <Header/>
        <section class="hero is-fullheight  has-background-primary">
            <div class="hero-body ">
                <div class="container has-text-centered">
                    <h1 class="title">
                        Home Page
                    </h1>
                    <h2 class="subtitle">
                        Let's Begin Here!
                    </h2>
                    <div class="notification is-danger">
                        <button class="delete"></button> Please Login First! :)
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import Header from "./../components/Header";
export default {
  name: "Home",
  components: {
    Header
  }
};
</script>

<style>
/* .hero.is-primary {
  height: 100% !important;
} */
</style>
