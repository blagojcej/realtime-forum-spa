<template>
    <v-container>
        <v-form
            ref="form"
            lazy-validation
            @submit.prevent="signup"
        >
            <v-text-field
                v-model="form.name"
                type="name"
                label="Name"
                required
            ></v-text-field>
            <span class="red--text" v-if="error.name">{{error.name[0]}}</span>

            <v-text-field
                v-model="form.email"
                type="email"
                label="E-mail"
                required
            ></v-text-field>
            <span class="red--text" v-if="error.email">{{error.email[0]}}</span>

            <v-text-field
                v-model="form.password"
                label="Password"
                type="password"
                required
            ></v-text-field>
            <span class="red--text" v-if="error.password">{{error.password[0]}}</span>

            <v-text-field
                v-model="form.password_confirmation"
                label="Confirm Password"
                type="password"
                required
            ></v-text-field>

            <v-btn
                color="green"
                class="mr-4"
                type="submit"
            >
                Sign Up
            </v-btn>

            <router-link to="/login">
                <v-btn color="blue">Login</v-btn>
            </router-link>

        </v-form>
    </v-container>
</template>


<script>
    export default {
        name: "Signup",
        data() {
            return {
                form: {
                    name: null,
                    email: null,
                    password: null,
                    password_confirmation: null
                },
                error: {}
            }
        },
        created() {
            if(User.loggedIn()) {
                this.$router.push({ name: 'forum'});
            }
        },
        methods: {
            signup() {
                axios.post('/api/auth/signup', this.form)
                .then(res => {
                    User.responseAfterLogin(res);
                    this.$router.push({ name: 'forum'});
                })
                .catch(err => this.error = err.response.data.errors);
            }
        }
    }
</script>

<style scoped>

</style>
