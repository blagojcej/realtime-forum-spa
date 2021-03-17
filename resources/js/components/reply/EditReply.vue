<template>
    <div>
        <vue-simplemde v-model="reply.reply" ref="markdownEditor" />
        <v-card-actions>
            <v-btn icon small @click.prevent="update">
                <v-icon color="green">save</v-icon>
            </v-btn>
            <v-btn icon small @click.prevent="cancel">
                <v-icon color="black">cancel</v-icon>
            </v-btn>
        </v-card-actions>
    </div>
</template>

<script>
    export default {
        name: "EditReply",
        props: ['reply'],
        methods: {
            cancel(reply) {
                EventBus.$emit('cancel-edit-reply', reply);
            },
            update() {
                axios.patch(`/api/question/${this.reply.question_slug}/reply/${this.reply.id}`, {body: this.reply.reply})
                .then( res => {
                    this.cancel(this.reply.reply);
                });
            }
        }
    }
</script>

<style scoped>

</style>
