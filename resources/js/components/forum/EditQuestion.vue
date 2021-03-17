<template>
    <v-container fluid>
        <v-card>
            <v-form @submit.prevent="update">
                <v-text-field
                    v-model="form.title"
                    type="text"
                    label="Question Title"
                    required
                ></v-text-field>

                <vue-simplemde v-model="form.body" ref="markdownEditor" />

                <v-card-actions>
                    <v-btn icon small type="submit">
                        <v-icon color="teal">save</v-icon>
                    </v-btn>
                    <v-btn icon small @click="cancel">
                        <v-icon color="black">cancel</v-icon>
                    </v-btn>
                </v-card-actions>
            </v-form>
        </v-card>
    </v-container>
</template>

<script>
    export default {
        name: "EditQuestion",
        props: ['question'],
        data() {
            return {
                form: {
                    title: null,
                    body: null
                }
            }
        },
        mounted() {
            this.form = this.question;
        },
        methods: {
            cancel(question) {
                EventBus.$emit('cancel-editing', question);
            },
            update() {
                axios.patch(`/api/question/${this.form.slug}`, this.form)
                    .then(res => this.cancel(this.question))
                    .catch(err => this.errors = err.response.data);
            }
        }
    }
</script>

<style scoped>

</style>
