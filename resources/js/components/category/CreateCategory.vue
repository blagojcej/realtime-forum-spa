<template>
    <v-container>
        <v-alert v-if="errors" type="error">
            Please give category name
        </v-alert>
        <v-form @submit.prevent="submit()">
            <v-text-field
                v-model="form.name"
                type="text"
                label="Category Title"
                required
            ></v-text-field>
            <v-btn type="submit" color="pink" v-if="editSlug" :disabled="btnDisabled">Update</v-btn>
            <v-btn type="submit" color="teal" v-else :disabled="btnDisabled">Create</v-btn>
        </v-form>

        <v-card>
            <v-toolbar color="indigo" dark dense class="mt-2">
                <v-toolbar-title>Categories</v-toolbar-title>
            </v-toolbar>
            <v-list>
                <div v-for="(category, index) in categories" :key="category.id">
                    <v-list-item>
                        <v-list-item-action>
                            <v-btn icon small @click="edit(index)">
                                <v-icon color="orange">edit</v-icon>
                            </v-btn>
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title>{{category.name}}</v-list-item-title>
                        </v-list-item-content>
                        <v-list-item-action>
                            <v-btn icon small @click="destroy(category.slug, index)">
                                <v-icon color="red">delete</v-icon>
                            </v-btn>
                        </v-list-item-action>
                    </v-list-item>
                    <v-divider></v-divider>
                </div>
            </v-list>
        </v-card>
    </v-container>
</template>

<script>
    export default {
        name: "CreateCategory",
        data() {
            return {
                form: {
                    name: null,
                },
                categories: [],
                editSlug: null,
                errors: null
            }
        },
        created() {
            if (!User.admin()) {
                this.$router.push('/forum');
            }
            this.getCategories();
        },
        methods: {
            submit() {
                this.editSlug ? this.update() : this.create();
            },
            getCategories() {
                axios.get(`/api/category`)
                    .then(res => this.categories = res.data.data)
                    .catch(err => this.errors = err.response.data);
            },
            destroy(slug, index) {
                axios.delete(`/api/category/${slug}`)
                    .then(res => {
                        this.categories.splice(index, 1)
                    })
                    .catch(err => this.errors = err.response.data);
            },
            edit(index) {
                this.form.name = this.categories[index].name;
                this.editSlug = this.categories[index].slug;
                this.categories.splice(index, 1)
            },
            create() {
                axios.post(`/api/category`, this.form)
                    .then(res => {
                        this.categories.unshift(res.data);
                        this.form.name = null;
                    })
                    .catch(err => this.errors = err.response.data);
            },
            update() {
                axios.patch(`/api/category/${this.editSlug}`, this.form)
                    .then(res => {
                        this.categories.unshift(res.data);
                        this.form.name = null;
                    })
                    .catch(err => this.errors = err.response.data.errors);
            }
        },
        computed: {
            btnDisabled() {
                return !this.form.name;
            }
        }
    }
</script>

<style scoped>

</style>
