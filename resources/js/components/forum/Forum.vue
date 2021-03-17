<template>
    <v-container fluid grid-list-md>
        <v-layout row wrap>
            <v-flex xs8>
                <question v-for="question in questions"
                          :key="question.path"
                          :question=question></question>
                <div class="text-center">
                    <v-pagination
                        v-model="meta.current_page"
                        :length="meta.last_page"
                        @input="changePage"
                    ></v-pagination>
                </div>
            </v-flex>
            <v-flex xs4>
                <app-sidebar></app-sidebar>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import Question from "./Question";
    import AppSidebar from "../AppSidebar";

    export default {
        name: "Forum",
        components: {AppSidebar, Question},
        data() {
            return {
                questions: {},
                meta: {}
            }
        },
        created() {
           this.fetchQuestions();
        },
        methods: {
            fetchQuestions(page) {
                let url = page ? `/api/question?page=${page}` : '/api/question';
                axios.get(url)
                    .then(response => {
                        this.questions = response.data.data;
                        this.meta = response.data.meta;
                    })
                    .catch(err => console.log(err.response.data));
            },
            changePage(page) {
                this.fetchQuestions(page);
            }
        }
    }
</script>

<style scoped>

</style>
