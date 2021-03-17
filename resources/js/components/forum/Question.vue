<template>
    <v-card
        class="mt-2"
    >
        <v-card-title>
            <router-link :to="question.path">
                {{question.title}}
            </router-link>
        </v-card-title>

        <v-card-text>
            <v-row
                align="center"
                class="mx-0">
                <div class="grey--text ml-4">
                    {{question.user}} said {{question.created_at}}
                </div>
            </v-row>

            <div class="my-4 subtitle-1">
                {{question.category_name}}
            </div>

            <div>{{question.body}}</div>
        </v-card-text>
    </v-card>
</template>

<script>
    export default {
        name: "Question",
        props: ['question']
    }
</script>

<style scoped>

</style>
