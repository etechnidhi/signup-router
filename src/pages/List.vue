<template>
    <div id="list">
        <Header/>
        <aside>
            <ul class="menu-list is-primary">
                <li>
                    <a href="#" v-on:click="back">
                        Get Back To Your Profile
                    </a>
                </li>
            </ul>
        </aside>
        <section>
            <div class="columns">
                <div class="column">
                    <Listdisplay/>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
    import Header from "./../components/Header";
    import Listdisplay from "./../components/Listdisplay";
    
    export default {
        name: "List",
        components: {
            Header,
            Listdisplay
        },
        methods:{
            back:function(){
                this.$router.push("profile");
            }
        }
    };
</script>

<style>
    .columns{
        width: 90% !important;
        margin: 0 auto !important;
    }
    .menu-list a{
        color: red !important;
    }
</style>
