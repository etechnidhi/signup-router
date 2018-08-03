<template>
    <div id="signup">
        <Header/>
        <div class="box">
            <section class="hero is-primary is-medium">
                <div class="heading1 has-text-dark has-text-centered">
                    <h1>SignUp</h1>
                </div>
            </section>
            <section>
                <div class="columns">
                    <div class="column">
                        <SignupForm/>
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>

<script>
    import Header from "./../components/Header";
    import SignupForm from "./../components/SignupForm";
    export default {
        name: "Signup",
        components: {
            Header,
            SignupForm
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
