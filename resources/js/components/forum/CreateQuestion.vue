<template>
    <v-container>
        <v-form
            ref="form"
            lazy-validation
            @submit.prevent="ask"
        >
            <span class="red--text" v-if="errors.title">{{errors.title[0]}}</span>
            <v-text-field
                v-model="form.title"
                type="text"
                label="Question Title"
                required
            ></v-text-field>

            <span class="red--text" v-if="errors.category_id">{{errors.category_id[0]}}</span>
            <v-select
                :items="categories"
                autocomplete
                v-model="form.category_id"
                item-text="name"
                item-value="id"
            ></v-select>

            <span class="red--text" v-if="errors.body">{{errors.body[0]}}</span>
            <vue-simplemde v-model="form.body" ref="markdownEditor"/>

            <v-btn
                color="green"
                class="mr-4"
                type="submit"
                :disabled="btnDisabled"
            >
                Ask Question
            </v-btn>
        </v-form>
    </v-container>
</template>

<script>
    import VueSimplemde from 'vue-simplemde';

    export default {
        name: "CreateQuestion",
        components: {
            VueSimplemde
        },
        data() {
            return {
                form: {
                    title: null,
                    body: null,
                    category_id: null
                },
                categories: [],
                errors: {}
            }
        },
        created() {
            axios.get('/api/category')
                .then(res => this.categories = res.data.data)
                .catch(err => console.log(err.response.data.errors));
        },
        methods: {
            ask() {
                axios.post('/api/question', this.form)
                    .then(res => this.$router.push(res.data.path))
                    .catch(err => this.errors = err.response.data.errors);
            }
        },
        computed: {
            btnDisabled() {
                return !(this.form.title || this.form.body || this.form.category_id);
            }
        }
    }
</script>

<style scoped>
    @import '~simplemde/dist/simplemde.min.css';
</style>
