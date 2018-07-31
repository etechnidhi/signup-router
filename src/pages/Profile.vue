<template>
    <div id="login">
        <Header/>
        <section class="hero is-fullheight is-primary">
            <div class="hero-body">
                <div class="container has-text-centered">
                    <h1 class="title">
                        Hello {{this.$store.state.login.user.username}}
                    </h1>
                    <h2>Welcome :)</h2>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
    import Header from "./../components/Header";
    export default {
        name: "Profile",
        components: {
            Header
        }
    };
</script>

<style>
    
</style>
