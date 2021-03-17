<template>
    <v-container>
        <v-form
            ref="form"
            lazy-validation
            @submit.prevent="login"
        >
            <v-text-field
                v-model="form.email"
                type="email"
                label="E-mail"
                required
            ></v-text-field>

            <v-text-field
                v-model="form.password"
                label="Password"
                type="password"
                required
            ></v-text-field>

            <v-btn
                color="green"
                class="mr-4"
                type="submit"
            >
                Login
            </v-btn>

            <router-link to="/signup">
                <v-btn color="blue">Sign Up</v-btn>
            </router-link>

        </v-form>
    </v-container>
</template>

<script>
    export default {
        name: "Login",
        data() {
            return {
                form: {
                    email: null,
                    password: null
                }
            }
        },
        created() {
          if(User.loggedIn()) {
              this.$router.push({ name: 'forum'});
          }
        },
        methods: {
            login() {
                User.login(this.form);
                //Navigating using User.js model
                //this.$router.push({ name: 'forum'});
            }
        }
    }
</script>

<style scoped>

</style>
