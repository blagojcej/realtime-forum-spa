<template>
        <v-toolbar color="indigo" dark>
            <v-toolbar-title>
                <router-link class="white--text" to="/">Forum SPA - (Real Time)</router-link>
            </v-toolbar-title>

            <v-spacer></v-spacer>
            <app-notification v-if="loggedIn"></app-notification>
            <div class="hidden-sm-and-down"></div>

            <router-link v-for="item in items"
                         :key="item.icon_name" :to="item.to"
                         v-if="item.show">
                <v-btn style="margin: 10px;" text>
                    {{item.name}}
                </v-btn>
            </router-link>
        </v-toolbar>
</template>

<script>
    import AppNotification from "./AppNotification";

    export default {
        name: "Toolbar",
        components: {AppNotification},
        data() {
            return {
                loggedIn: User.loggedIn(),
                items: [
                    {name: 'FORUM', to: '/forum', show: true},
                    {name: 'LOGIN', to: '/login', show: !User.loggedIn()},
                    {name: 'CATEGORY', to: '/category', show: User.admin()},
                    {name: 'ASK QUESTION', to: '/ask', show: User.loggedIn()},
                    {name: 'LOGOUT', to: '/logout', show: User.loggedIn()},
                ]
            }
        },
        created() {
            EventBus.$on('logout', () => {
                User.logout();
                window.location = '/forum';
            });
        }
    }
</script>

<style scoped>

</style>
