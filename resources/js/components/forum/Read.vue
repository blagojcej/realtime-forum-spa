<template>
    <div>
        <edit-question v-if="editing" :question=question></edit-question>
        <div v-else>
            <show-question v-if="question" :question=question></show-question>
        </div>
        <v-container>
            <template v-if="question">
                <replies :question="question"></replies>
            </template>
            <template v-if="question">
                <new-reply v-if="loggedIn" :questionSlug="question.slug"></new-reply>
                <router-link class="mt-4" v-else to="/login">Log in to reply</router-link>
            </template>
        </v-container>
    </div>
</template>

<script>
    import ShowQuestion from "./ShowQuestion";
    import EditQuestion from "./EditQuestion";
    import Replies from "../reply/Replies";
    import NewReply from "../reply/NewReply";

    export default {
        name: "Read",
        components: {NewReply, Replies, ShowQuestion, EditQuestion},
        data() {
            return {
                question: null,
                editing: false,
                beforeEditQuestionTitle: '',
                beforeEditQuestionBody: ''
            }
        },
        created() {

            this.listen();
            this.getQuestion();
        },
        methods: {
            listen() {
                EventBus.$on('start-editing', () => {
                    this.editing = true;
                });
                EventBus.$on('cancel-editing', (question) => {
                    this.editing = false;
                    if (question !== this.question) {
                        this.question.title = this.beforeEditQuestionTitle;
                        this.question.body = this.beforeEditQuestionBody;
                    }
                });
            },
            getQuestion() {
                axios.get(`/api/question/${this.$route.params.slug}`)
                    .then(res => {
                        this.question = res.data.data;
                        this.beforeEditQuestionTitle = this.question.title;
                        this.beforeEditQuestionBody = this.question.body;
                    })
                    .catch(err => console.log(err.response.data));
            }
        },
        computed: {
            loggedIn() {
                return User.loggedIn();
            }
        }
    }
</script>

<style scoped>

</style>
